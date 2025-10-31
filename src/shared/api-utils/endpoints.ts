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
    GROUPS: {
      CREATE: (businessSlig: string) =>
        `/businesses/${businessSlig}/groups` as `/businesses/${string}/groups`,
      FIND_ONE: (businessSlug: string, groupId: string) =>
        `/businesses/${businessSlug}/groups/${groupId}` as `/businesses/${string}/groups/${string}`,
      ADD_PERMISSION: (businessSlug: string, groupId: string) =>
        `/businesses/${businessSlug}/groups/${groupId}/permissions` as `/businesses/${string}/groups/${string}/permissions`,
      REMOVE_PERMISSION: (businessSlug: string, groupId: string) =>
        `/businesses/${businessSlug}/groups/${groupId}/permissions` as `/businesses/${string}/groups/${string}/permissions`,
      ASSING_EMPLOYEES: (businessSlug: string, groupId: string) =>
        `/businesses/${businessSlug}/groups/${groupId}/employees` as `/businesses/${string}/groups/${string}/employees`,
      REMOVE_EMPLOYEES: (businessSlug: string, groupId: string) =>
        `/businesses/${businessSlug}/groups/${groupId}/employees` as `/businesses/${string}/groups/${string}/employees`,
    },
    EMPLOYEES: {
      CREATE: (businessSlug: string) =>
        `/businesses/${businessSlug}/employees` as `/businesses/${string}/employees`,
      FIND_ONE: (businessSlug: string, employeeId: string) =>
        `/businesses/${businessSlug}/employees/${employeeId}` as `/businesses/${string}/employees/${string}`,
    },
  },
} as const;
