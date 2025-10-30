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
import { Text } from "@/modules/shared/components/ui/text";
import { firstLetterToUpperCase } from "@/modules/shared/lib/utils";
import type { EmployeeSummary } from "@/shared/entities/employee.entity";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { TouchableOpacity, View } from "react-native";

interface Props {
  employees: EmployeeSummary[];
  businessSlug: string;
}

export function RecentEmployeesList({ employees, businessSlug }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Empleados recientes</CardTitle>
        <CardDescription>
          Lista de empleados agregados recientemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-y-2">
        {employees.map((employee) => (
          <TouchableOpacity key={employee.id}>
            <Card className="flex flex-row">
              <CardHeader className="flex flex-row items-center">
                <Avatar
                  alt={`Imagen del empleado ${employee.user.firstName} ${employee.user.lastName}`}
                  className="size-12"
                >
                  <AvatarImage
                    source={require("@/assets/user_placeholder.jpg")}
                  />
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
                  <CardTitle className="text-xl">
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
            </Card>
          </TouchableOpacity>
        ))}
      </CardContent>
    </Card>
  );
}
