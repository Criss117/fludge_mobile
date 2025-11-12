import { SearchIcon } from "lucide-react-native";
import { View } from "react-native";
import { cn } from "../lib/utils";
import { Icon } from "./ui/icon";
import { Input } from "./ui/input";

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
}

export function SearchInput({
  placeholder,
  value,
  onChangeText,
  className,
}: Props) {
  return (
    <View className={cn("relative", className)}>
      <Input
        className="pl-8"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <Icon
        as={SearchIcon}
        size={18}
        className="text-muted-foreground"
        style={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: [{ translateY: "-50%" }],
        }}
      />
    </View>
  );
}
