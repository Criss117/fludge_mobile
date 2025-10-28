import { useAuth } from "@/modules/auth/providers/auth.provider";
import { Avatar, AvatarFallback } from "@/modules/shared/components/ui/avatar";
import { Button } from "@/modules/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/shared/components/ui/dropdown-menu";
import { Text } from "@/modules/shared/components/ui/text";
import { firstLetterToUpperCase } from "@/modules/shared/lib/utils";
import { View } from "react-native";

export function UserButton() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            className="border-background web:border-0 web:ring-2 web:ring-background rounded-lg border-2"
          >
            <AvatarFallback>
              <Text>
                {firstLetterToUpperCase(user.firstName, user.lastName)}
              </Text>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-row items-center gap-x-4">
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            className="border-2 border-background"
          >
            <AvatarFallback>
              <Text>
                {firstLetterToUpperCase(user.firstName, user.lastName)}
              </Text>
            </AvatarFallback>
          </Avatar>
          <View>
            <Text>
              {user.firstName} {user.lastName}
            </Text>
            <Text className="text-sm text-muted-foreground">{user.email} </Text>
          </View>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuItem onPress={() => signOut.mutate()}>
          <Text>Cerrar Sesión</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
