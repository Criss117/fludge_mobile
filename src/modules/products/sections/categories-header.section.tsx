import { Input } from "@/modules/shared/components/ui/input";
import { View } from "react-native";

export function CategoriesHeaderSection() {
  return (
    <View className="py-2">
      <Input placeholder="Buscar categorias" />
    </View>
  );
}
