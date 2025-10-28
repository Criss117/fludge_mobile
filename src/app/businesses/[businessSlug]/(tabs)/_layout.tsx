import { useTheme } from "@/integrations/theme";
import { BusinessHeader } from "@/modules/businesses/components/business-header";
import { Icon } from "@/modules/shared/components/ui/icon";
import { NAV_THEME } from "@/modules/shared/lib/theme";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  HomeIcon,
  PackageSearchIcon,
  ShoppingCart,
  UserCog,
  Users2,
} from "lucide-react-native";

export default function BusinessLayout() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar backgroundColor={NAV_THEME[theme].colors.card} />
      <Tabs
        screenOptions={{
          headerShown: true,
          header: (props) => <BusinessHeader {...props} />,
          animation: "shift",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <Icon as={HomeIcon} color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Productos",
            tabBarIcon: ({ color, size }) => (
              <Icon as={PackageSearchIcon} color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="clients"
          options={{
            title: "Clientes",
            tabBarIcon: ({ color, size }) => (
              <Icon as={Users2} color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="sales"
          options={{
            title: "Ventas",
            tabBarIcon: ({ color, size }) => (
              <Icon as={ShoppingCart} color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="management"
          options={{
            title: "Gestión",
            tabBarIcon: ({ color, size }) => (
              <Icon as={UserCog} color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
