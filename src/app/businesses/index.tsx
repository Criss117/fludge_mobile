import { useAuth } from "@/modules/auth/providers/auth.provider";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import { Redirect } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BusinessPage() {
  const { signOut, user } = useAuth();

  if (!user) return <Redirect href="/auth/sign-in" />;

  const onSignOut = () => {
    signOut.mutate();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Button onPress={onSignOut}>
          <Text>Cerrar sesión</Text>
        </Button>
        <Text>{JSON.stringify(user, null, 2)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
