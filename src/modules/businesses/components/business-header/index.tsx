import { businessQueriesOptions } from "@/integrations/query/query-container";
import { Button } from "@/modules/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/modules/shared/components/ui/dropdown-menu";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { ChevronDownIcon } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserButton } from "./user-button";

export function BusinessHeader({ options }: BottomTabHeaderProps) {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug: string;
  }>();
  const { data: businesses } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessSlug)
  );
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{ top: top }}
      className="flex flex-row items-center justify-between pr-4 h-14"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="flex items-center justify-center"
          >
            <Text className="text-base">{businesses.name}</Text>
            <Icon as={ChevronDownIcon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Text>Profile</Text>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserButton />
    </View>
  );
}
