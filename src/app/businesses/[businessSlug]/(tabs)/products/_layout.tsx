import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationEventMap,
  type MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import type {
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function ProductsLayout() {
  const { top } = useSafeAreaInsets();

  return (
    <MaterialTopTabs style={{ marginTop: top }}>
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
    </MaterialTopTabs>
  );
}
