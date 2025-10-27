import {
  api,
  authMutationsOptions,
  authQueriesOptions,
} from "@/integrations/query/query-container";
import { LoadingScreen } from "@/modules/shared/components/loading-screen";
import { secureStorage } from "@/modules/shared/lib/secure-storage";
import type { CommonResponse } from "@/shared/api-utils/http/common-response";
import type { SessionSummary } from "@/shared/entities/session.entity";
import type { UserDetail } from "@/shared/entities/user.entity";
import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { createContext, use, useEffect, useState } from "react";

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
  signOut: UseMutationResult<CommonResponse<null>, Error, void, unknown>;
  closeAllSessions: UseMutationResult<
    CommonResponse<null>,
    Error,
    void,
    unknown
  >;
  user: UseQueryResult<UserDetail | null, Error>;
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
  const [loadingToken, setLoadingToken] = useState(true);
  const [authToken, setAuthToken] = useState<string | undefined>();
  const user = useQuery({ ...authQueriesOptions.me(), enabled: !!authToken });
  const signUp = useMutation(authMutationsOptions.signUp());
  const signOut = useMutation(authMutationsOptions.signOut());
  const closeAllSessions = useMutation(authMutationsOptions.closeAllSessions());
  const signIn = useMutation({
    ...authMutationsOptions.signIn(),
    onSuccess: (data) => {
      if (data.data?.token) {
        const token = data.data?.token;

        api.applyAuthInterceptor(token).then(() => {
          setAuthToken(token);
        });
        secureStorage.save(AuthTokenKey, token);
      }
    },
  });

  useEffect(() => {
    secureStorage
      .getValueFor(AuthTokenKey)
      .then((token) => {
        if (!token) return;
        api.applyAuthInterceptor(token).then(() => {
          setAuthToken(token);
        });
      })
      .finally(() => setLoadingToken(false));
  }, []);

  if (loadingToken)
    return <LoadingScreen message="Obteniendo datos del usuario..." />;

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        closeAllSessions,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
