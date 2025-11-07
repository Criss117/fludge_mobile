import { BusinessHeader } from "@/modules/businesses/components/business-header";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Tabs, useLocalSearchParams } from "expo-router";
import {
  HomeIcon,
  PackageSearchIcon,
  ShoppingCart,
  UserCog,
  Users2,
} from "lucide-react-native";

export default function BusinessLayout() {
  const { businessSlug } = useLocalSearchParams<{
    businessSlug?: string;
  }>();

  if (!businessSlug) return null;

  return (
    <Tabs
      screenOptions={{
        header: (props) => (
          <BusinessHeader
            businessSlug={businessSlug}
            bottomTabHeaderProps={props}
          />
        ),
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
          headerShown: false,
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
          headerShown: false,
          title: "Gestión",
          tabBarIcon: ({ color, size }) => (
            <Icon as={UserCog} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
