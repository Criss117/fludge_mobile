import { Avatar, AvatarFallback } from "@/modules/shared/components/ui/avatar";
import { Button } from "@/modules/shared/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Separator } from "@/modules/shared/components/ui/separator";
import { Text } from "@/modules/shared/components/ui/text";
import { firstLetterToUpperCase } from "@/modules/shared/lib/utils";
import type { EmployeeSummary } from "@/shared/entities/employee.entity";
import { MoreVerticalIcon } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

interface Props {
  employee: EmployeeSummary;
}

export function EmployeeCard({ employee }: Props) {
  return (
    <TouchableOpacity>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-x-4">
            <Avatar
              alt={`Imagen del empleado ${employee.user.firstName} ${employee.user.lastName}`}
              className="size-14"
            >
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
          <View>
            <Button variant="outline" size="icon" className="rounded-full">
              <Icon
                as={MoreVerticalIcon}
                size={24}
                onPress={() => console.log("Press Icon")}
              />
            </Button>
          </View>
        </CardHeader>
        <Separator />
      </Card>
    </TouchableOpacity>
  );
}
