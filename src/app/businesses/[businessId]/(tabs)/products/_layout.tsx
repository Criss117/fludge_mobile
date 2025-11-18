import { useTheme } from "@/integrations/theme";
import { MaterialTopTabs } from "@/modules/shared/lib/material-top-tabs";
import { NAV_THEME } from "@/modules/shared/lib/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductsLayout() {
  const { theme } = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <MaterialTopTabs
      style={{
        marginTop: top,
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: NAV_THEME[theme].colors.background,
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: "Productos",
        }}
      />
      <MaterialTopTabs.Screen
        name="categories"
        options={{
          title: "Categorias",
        }}
      />
      <MaterialTopTabs.Screen
        name="providers"
        options={{
          title: "Proveedores",
        }}
      />
    </MaterialTopTabs>
  );
}
