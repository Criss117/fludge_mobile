import { Permission } from "@/shared/entities/permissions";
import { UserDetail } from "@/shared/entities/user.entity";
import { createContext, use, useCallback, useMemo } from "react";

interface Context {
  user: UserDetail;
  userPermissions: Permission[];
  hasPermission: (...permissions: Permission[]) => boolean;
}

interface RootProps {
  children: React.ReactNode;
  user: UserDetail;
}

const PermissionsProviderContext = createContext<Context | null>(null);

export function usePermissions() {
  const context = use(PermissionsProviderContext);

  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }

  return context;
}

export function PermissionsProvider({ children, user }: RootProps) {
  const userPermissions = useMemo(() => {
    return Array.from(
      new Set(user.employeeDetail?.groups.flatMap((g) => g.permissions) ?? [])
    );
  }, [user.employeeDetail]);

  const hasPermission = useCallback(
    (...permissions: Permission[]) => {
      if (user.isRoot) return true;

      if (user.isEmployeeIn && userPermissions.length > 0) {
        return permissions.every((p) => userPermissions.includes(p));
      }

      return false;
    },
    [user.isEmployeeIn, user.isRoot, userPermissions]
  );

  return (
    <PermissionsProviderContext.Provider
      value={{
        user,
        userPermissions,
        hasPermission,
      }}
    >
      {children}
    </PermissionsProviderContext.Provider>
  );
}
