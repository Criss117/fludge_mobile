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
import { Icon } from "@/modules/shared/components/ui/icon";
import { Separator } from "@/modules/shared/components/ui/separator";
import { Text } from "@/modules/shared/components/ui/text";
import { firstLetterToUpperCase } from "@/modules/shared/lib/utils";
import type { EmployeeSummary } from "@/shared/entities/employee.entity";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { useRouter } from "expo-router";
import { Calendar } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { EmployeeActions } from "./employee-actions";

interface Props {
  employee: EmployeeSummary;
  businessSlug: string;
}

export function EmployeeCard({ employee, businessSlug }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() =>
        router.push({
          pathname: "/businesses/[businessSlug]/employees/[employeeId]",
          params: {
            businessSlug,
            employeeId: employee.id,
          },
        })
      }
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-x-4">
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
          <EmployeeActions businessSlug={businessSlug} employee={employee} />
        </CardHeader>
        <Separator />
        <CardContent>
          <View className="flex flex-row gap-x-2 items-center">
            <Icon as={Calendar} size={24} />
            <Text>
              Ingresado{" "}
              {formatDistanceToNow(employee.createdAt, {
                addSuffix: true,
                locale: es,
              })}
            </Text>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}
