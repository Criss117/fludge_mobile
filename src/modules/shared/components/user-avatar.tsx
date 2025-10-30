import { cn, firstLetterToUpperCase } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Text } from "./ui/text";

interface Props {
  firstName: string;
  lastName: string;
  alt: string;
  imageUrl?: string;
  size?:
    | "size-10"
    | "size-11"
    | "size-12"
    | "size-14"
    | "size-16"
    | "size-20"
    | "size-24"
    | "size-28"
    | "size-32";
}

export function UserAvatar({
  firstName,
  lastName,
  alt,
  imageUrl,
  size,
}: Props) {
  return (
    <Avatar alt={alt} className={cn(size, "size-")}>
      {imageUrl ? (
        <AvatarImage source={{ uri: imageUrl }} />
      ) : (
        <AvatarImage source={require("@/assets/user_placeholder.jpg")} />
      )}
      <AvatarFallback className={cn(size)}>
        <Text className="text-2xl">
          {firstLetterToUpperCase(firstName, lastName)}
        </Text>
      </AvatarFallback>
    </Avatar>
  );
}
