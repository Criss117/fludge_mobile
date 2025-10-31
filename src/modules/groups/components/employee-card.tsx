import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/modules/shared/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";
import { Text } from "@/modules/shared/components/ui/text";
import { cn, firstLetterToUpperCase } from "@/modules/shared/lib/utils";
import { EmployeeSummary } from "@/shared/entities/employee.entity";
import { TouchableOpacity, View } from "react-native";

interface Props {
  employee: EmployeeSummary;
  onPress: (employee: EmployeeSummary) => void;
  isSelected: boolean;
}

export function EmployeeCard({ onPress, employee, isSelected }: Props) {
  return (
    <TouchableOpacity key={employee.id} onPress={() => onPress(employee)}>
      <Card className={cn(isSelected && "bg-primary/10 border-primary")}>
        <CardHeader className="flex flex-row  gap-x-2">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onPress(employee)}
            className="size-5 mt-1"
          />
          <View className="flex flex-row items-center gap-x-2">
            <Avatar
              alt={`Imagen del empleado ${employee.user.firstName} ${employee.user.lastName}`}
              className="size-14"
            >
              <AvatarImage source={require("@/assets/user_placeholder.jpg")} />
              <AvatarFallback className="size-14">
                <Text className="text-2xl">
                  {firstLetterToUpperCase(
                    employee.user.firstName,
                    employee.user.lastName
                  )}
                </Text>
              </AvatarFallback>
            </Avatar>
            <View>
              <CardTitle className="text-xl">
                {employee.user.firstName} {employee.user.lastName}
              </CardTitle>
              <CardDescription>{employee.user.email}</CardDescription>
            </View>
          </View>
        </CardHeader>
      </Card>
    </TouchableOpacity>
  );
}
