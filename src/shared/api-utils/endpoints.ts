export const ENDPOINTS = {
  AUTH: {
    SIGN_UP: "/auth/sign-up",
    SIGN_IN: "/auth/sign-in",
    ME: "/auth/me",
    SIGN_OUT: "/auth/sign-out",
    CLOSE_ALL_SESSIONS: "/auth/close-all-sessions",
  },
  BUSINESSES: {
    CREATE: "/businesses",
    FIND_ONE: (businessSlug: string) =>
      `/businesses/${businessSlug}` as `/businesses/${string}`,
  },
} as const;
