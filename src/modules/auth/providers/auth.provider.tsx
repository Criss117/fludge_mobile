import { authMutationsOptions } from "@/integrations/query/quey-container";
import { CommonResponse } from "@/shared/api-utils/http/common-response";
import { SessionSummary } from "@/shared/entities/session.entity";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { createContext, use } from "react";

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
}

const AuthContext = createContext<null | Context>(null);

export function useAuth() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const signUp = useMutation(authMutationsOptions.signUp());
  const signIn = useMutation(authMutationsOptions.signIn());
  const signOut = useMutation(authMutationsOptions.signOut());
  const closeAllSessions = useMutation(authMutationsOptions.closeAllSessions());

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        closeAllSessions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
