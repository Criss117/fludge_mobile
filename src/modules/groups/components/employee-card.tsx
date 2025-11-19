import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/modules/shared/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";
import { Text } from "@/modules/shared/components/ui/text";
import { cn, firstLetterToUpperCase } from "@/modules/shared/lib/utils";
import { EmployeeSummary } from "@/shared/entities/employee.entity";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { TouchableOpacity, View } from "react-native";

interface Props {
  employee: EmployeeSummary;
  onPress: (employee: EmployeeSummary) => void;
  isSelected: boolean;
}

export function EmployeeCard({ onPress, employee, isSelected }: Props) {
  return (
    <TouchableOpacity
      key={employee.id}
      onPress={() => onPress(employee)}
      activeOpacity={0.6}
    >
      <Card
        className={cn(
          "flex flex-row justify-between py-2",
          isSelected && "bg-primary/10 border-primary"
        )}
      >
        <CardHeader className="flex flex-row items-center flex-1 px-3">
          <Avatar
            alt={`Imagen del empleado ${employee.user.firstName} ${employee.user.lastName}`}
            className="size-12"
          >
            <AvatarImage source={require("@/assets/user_placeholder.jpg")} />
            <AvatarFallback className="size-12">
              <Text className="text-2xl">
                {firstLetterToUpperCase(
                  employee.user.firstName,
                  employee.user.lastName
                )}
              </Text>
            </AvatarFallback>
          </Avatar>
          <View>
            <CardTitle className="text-xl line-clamp-1">
              {employee.user.firstName} {employee.user.lastName}
            </CardTitle>
            <CardDescription>
              Ingresado{" "}
              {formatDistanceToNow(employee.createdAt, {
                addSuffix: true,
                locale: es,
              })}
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Checkbox
            className="size-5"
            checked={isSelected}
            onCheckedChange={() => onPress(employee)}
          />
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}
