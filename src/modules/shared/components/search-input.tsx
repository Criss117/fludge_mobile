import { SearchIcon } from "lucide-react-native";
import { View } from "react-native";
import { Icon } from "./ui/icon";
import { Input } from "./ui/input";

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
}

export function SearchInput({ placeholder, onChangeText }: Props) {
  return (
    <View className="relative">
      <Input placeholder={placeholder} onChangeText={onChangeText} />
      <Icon
        as={SearchIcon}
        size={24}
        style={{
          position: "absolute",
          top: "20%",
          right: 16,
          transform: [
            {
              translateX: "50%",
            },
          ],
        }}
      />
    </View>
  );
}
