export const ENDPOINTS = {
  IMAGES: {
    PRODUCTS: (imageName: string) =>
      `/images/products/${imageName}` as `/images/products/${string}`,
  },
  AUTH: {
    SIGN_UP: "/auth/sign-up",
    SIGN_IN: "/auth/sign-in",
    SIGN_IN_EMPLOYEE: "/auth/sign-in-employee",
    ME: "/auth/me",
    SIGN_OUT: "/auth/sign-out",
    CLOSE_ALL_SESSIONS: "/auth/close-all-sessions",
  },
  BUSINESSES: {
    CREATE: "/businesses",
    FIND_ONE: (businessId: string) =>
      `/businesses/${businessId}` as `/businesses/${string}`,
    UPDATE: (businessId: string) =>
      `/businesses/${businessId}` as `/businesses/${string}`,
    GROUPS: {
      CREATE: (businessSlig: string) =>
        `/businesses/${businessSlig}/groups` as `/businesses/${string}/groups`,
      DELETE: (businessId: string, groupId: string) =>
        `/businesses/${businessId}/groups/${groupId}` as `/businesses/${string}/groups/${string}`,
      FIND_ONE: (businessId: string, groupId: string) =>
        `/businesses/${businessId}/groups/${groupId}` as `/businesses/${string}/groups/${string}`,
      UPDATE: (businessId: string, groupId: string) =>
        `/businesses/${businessId}/groups/${groupId}` as `/businesses/${string}/groups/${string}`,
      ADD_PERMISSION: (businessId: string, groupId: string) =>
        `/businesses/${businessId}/groups/${groupId}/permissions` as `/businesses/${string}/groups/${string}/permissions`,
      REMOVE_PERMISSION: (businessId: string, groupId: string) =>
        `/businesses/${businessId}/groups/${groupId}/permissions` as `/businesses/${string}/groups/${string}/permissions`,
      ASSING_EMPLOYEES: (businessId: string, groupId: string) =>
        `/businesses/${businessId}/groups/${groupId}/employees` as `/businesses/${string}/groups/${string}/employees`,
      REMOVE_EMPLOYEES: (businessId: string, groupId: string) =>
        `/businesses/${businessId}/groups/${groupId}/employees` as `/businesses/${string}/groups/${string}/employees`,
    },
    EMPLOYEES: {
      CREATE: (businessId: string) =>
        `/businesses/${businessId}/employees` as `/businesses/${string}/employees`,
      DELETE: (businessId: string, employeeId: string) =>
        `/businesses/${businessId}/employees/${employeeId}` as `/businesses/${string}/employees/${string}`,
      FIND_ONE: (businessId: string, employeeId: string) =>
        `/businesses/${businessId}/employees/${employeeId}` as `/businesses/${string}/employees/${string}`,
      ASSIGN_GROUP: (businessId: string, employeeId: string) =>
        `/businesses/${businessId}/employees/${employeeId}/groups` as `/businesses/${string}/employees/${string}/groups`,
      REMOVE_GROUP: (businessId: string, employeeId: string) =>
        `/businesses/${businessId}/employees/${employeeId}/groups` as `/businesses/${string}/employees/${string}/groups`,
    },
    CATEGORIES: {
      CREATE: (businessId: string) =>
        `/businesses/${businessId}/categories` as `/businesses/${string}/categories`,
      DELETE: (businessId: string, categoryId: string) =>
        `/businesses/${businessId}/categories/${categoryId}` as `/businesses/${string}/categories/${string}`,
      UPDATE: (businessId: string, categoryId: string) =>
        `/businesses/${businessId}/categories/${categoryId}` as `/businesses/${string}/categories/${string}`,
    },
    PRODUCTS: {
      CREATE: (businessId: string) =>
        `/businesses/${businessId}/products` as `/businesses/${string}/products`,
      DELETE_MANY: (businessId: string) =>
        `/businesses/${businessId}/products` as `/businesses/${string}/products`,
      FIND_MANY: (businessId: string) =>
        `/businesses/${businessId}/products` as `/businesses/${string}/products`,
      UPLOAD: (businessId: string, productId: string) =>
        `/businesses/${businessId}/products/${productId}/upload` as `/businesses/${string}/products/${string}/upload`,
      FIND_ONE: (businessId: string, productId: string) =>
        `/businesses/${businessId}/products/${productId}` as `/businesses/${string}/products/${string}`,
      UPDATE: (businessId: string, productId: string) =>
        `/businesses/${businessId}/products/${productId}` as `/businesses/${string}/products/${string}`,
    },
    TICKETS: {
      CREATE: (businessId: string) =>
        `/businesses/${businessId}/tickets` as `/businesses/${string}/tickets`,
      DELETE_MANY: (businessId: string) =>
        `/businesses/${businessId}/tickets` as `/businesses/${string}/tickets`,
      FIND_MANY: (businessId: string) =>
        `/businesses/${businessId}/tickets` as `/businesses/${string}/tickets`,
      FIND_ONE: (businessId: string, ticketId: string) =>
        `/businesses/${businessId}/tickets/${ticketId}` as `/businesses/${string}/tickets/${string}`,
      UPDATE: (businessId: string, ticketId: string) =>
        `/businesses/${businessId}/tickets/${ticketId}` as `/businesses/${string}/tickets/${string}`,
    },
  },
} as const;
