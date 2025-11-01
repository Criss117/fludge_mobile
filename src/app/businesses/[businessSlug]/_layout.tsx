import { Stack } from "expo-router";

export default function BusinessesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="groups/[groupId]/index"
        options={{
          title: "Grupo ...",
        }}
      />
      <Stack.Screen
        name="groups/create"
        options={{
          title: "Nuevo grupo",
        }}
      />
    </Stack>
  );
}
