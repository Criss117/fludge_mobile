import {
  api,
  authActions,
  authMutationsOptions,
} from "@/integrations/query/query-container";
import { LoadingScreen } from "@/modules/shared/components/loading-screen";
import { secureStorage } from "@/modules/shared/lib/secure-storage";
import type { CommonResponse } from "@/shared/api-utils/http/common-response";
import type { SessionSummary } from "@/shared/entities/session.entity";
import { UserDetail } from "@/shared/entities/user.entity";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { createContext, use, useCallback, useEffect, useState } from "react";

interface Context {
  signUp: UseMutationResult<
    CommonResponse<null>,
    Error,
    {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phone?: string | null | undefined;
    },
    unknown
  >;
  signIn: UseMutationResult<
    CommonResponse<SessionSummary>,
    Error,
    {
      email: string;
      password: string;
    },
    unknown
  >;
  signInEmployee: UseMutationResult<
    CommonResponse<SessionSummary>,
    Error,
    {
      username: string;
      password: string;
    },
    unknown
  >;
  signOut: UseMutationResult<CommonResponse<null>, Error, void, unknown>;
  closeAllSessions: UseMutationResult<
    CommonResponse<null>,
    Error,
    void,
    unknown
  >;
  user: UserDetail | null;
  isFetchingSession: boolean;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<null | Context>(null);

export const AuthTokenKey = "authtoken" as const;

export function useAuth() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [isFetchingSession, setIsFetchingSession] = useState(false);

  // mutations
  const signUp = useMutation(authMutationsOptions.signUp());
  const closeAllSessions = useMutation(authMutationsOptions.closeAllSessions());

  const refetch = async () => {
    const res = await authActions.me();
    setUser(res.data);
  };

  const signOut = useMutation({
    ...authMutationsOptions.signOut(),
    onSuccess: async () => {
      await secureStorage.remove(AuthTokenKey);
      setUser(null);
    },
  });

  const onSignIn = useCallback(async (data: SessionSummary | null) => {
    try {
      if (!data?.token) return;

      api.applyAuthInterceptor(data.token);

      setIsFetchingSession(true);
      const userResponse = await authActions.me();

      if (userResponse.error || !userResponse.data) {
        throw new Error("Failed to fetch user data");
      }

      await secureStorage.save(AuthTokenKey, data.token);
      setUser(userResponse.data);
    } catch (error) {
      console.error("Error during sign in:", error);
      // Opcional: puedes limpiar el token si falla
      await secureStorage.remove(AuthTokenKey);
    } finally {
      setIsFetchingSession(false);
    }
  }, []);

  const signIn = useMutation({
    ...authMutationsOptions.signIn(),
    onSuccess: async ({ data }) => {
      onSignIn(data);
    },
    onError: async () => {
      await secureStorage.remove(AuthTokenKey);
    },
  });

  const signInEmployee = useMutation({
    ...authMutationsOptions.signInEmployee(),
    onSuccess: async ({ data }) => {
      onSignIn(data);
    },
    onError: async () => {
      await secureStorage.remove(AuthTokenKey);
    },
  });

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const token = await secureStorage.getValueFor(AuthTokenKey);

        if (!token) {
          // No hay sesión que restaurar
          setIsRestoringSession(false);
          return;
        }

        // Verificar si el componente sigue montado
        if (!isMounted) return;

        api.applyAuthInterceptor(token);
        const userResponse = await authActions.me();

        if (!isMounted) return;

        if (userResponse?.error || !userResponse.data) {
          // Token inválido o expirado, limpiar
          await secureStorage.remove(AuthTokenKey);
          console.warn("Invalid or expired token");
        } else {
          setUser(userResponse.data);
        }
      } catch (error) {
        console.error("Error restoring session:", error);
        // Limpiar token corrupto
        await secureStorage.remove(AuthTokenKey);
      } finally {
        if (isMounted) {
          setIsRestoringSession(false);
        }
      }
    };

    restoreSession();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  if (isRestoringSession) return <LoadingScreen message="Obteniendo sesión" />;

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signInEmployee,
        signOut,
        closeAllSessions,
        user,
        isFetchingSession,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
