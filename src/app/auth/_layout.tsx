import { useAuth } from "@/modules/auth/providers/auth.provider";
import type { UserDetail } from "@/shared/entities/user.entity";
import { Redirect, Stack } from "expo-router";

interface Props {
  user: UserDetail;
}

export default function AuthLayout() {
  const { user } = useAuth();

  // Si hay usuario autenticado, redirigir según su rol
  if (user) {
    return <AuthenticatedRedirect user={user} />;
  }

  // Si no hay usuario, mostrar pantallas de autenticación
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="sign-in" />
    </Stack>
  );
}

function AuthenticatedRedirect({ user }: Props) {
  // Usuario empleado (no root)
  if (!user.isRoot) {
    return <EmployeeRedirect user={user} />;
  }

  // Usuario root
  return <RootUserRedirect user={user} />;
}

function EmployeeRedirect({ user }: Props) {
  const { signOut } = useAuth();

  // Si no está asociado a ningún negocio, cerrar sesión
  if (!user.isEmployeeIn) {
    signOut.mutate();
    return null;
  }

  // Redirigir al negocio del empleado
  return (
    <Redirect
      href={{
        pathname: "/businesses/[businessSlug]/(tabs)",
        params: {
          businessSlug: user.isEmployeeIn.slug,
        },
      }}
    />
  );
}

function RootUserRedirect({ user }: Props) {
  const businesses = user.isRootIn;

  // Sin negocios: redirigir a registro
  if (businesses?.length === 0) {
    return <Redirect href="/businesses/register" />;
  }

  // Un solo negocio: redirigir directamente
  if (businesses?.length === 1) {
    return (
      <Redirect
        href={{
          pathname: "/businesses/[businessSlug]/(tabs)",
          params: {
            businessSlug: businesses[0].slug,
          },
        }}
      />
    );
  }

  // Múltiples negocios: mostrar selector
  return <Redirect href="/businesses/select" />;
}
