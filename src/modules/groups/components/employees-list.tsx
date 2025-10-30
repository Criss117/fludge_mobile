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
import { Text } from "@/modules/shared/components/ui/text";
import { cn, firstLetterToUpperCase } from "@/modules/shared/lib/utils";
import { EmployeeSummary } from "@/shared/entities/employee.entity";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface Props {
  employees: EmployeeSummary[];
}

export function EmployeesList({ employees }: Props) {
  const [seletectedEmployee, setSelectedEmployee] = useState<string[]>([]);

  const handleEmployeeSelect = (employeeId: string) => {
    if (seletectedEmployee.includes(employeeId)) {
      setSelectedEmployee((prev) => prev.filter((e) => e !== employeeId));
    } else {
      setSelectedEmployee((prev) => [...prev, employeeId]);
    }
  };

  return (
    <>
      {employees.map((employee) => (
        <TouchableOpacity
          key={employee.id}
          onPress={() => handleEmployeeSelect(employee.id)}
        >
          <Card
            className={cn(
              seletectedEmployee.includes(employee.id) && "bg-primary"
            )}
          >
            <CardHeader className="flex flex-row items-center gap-x-2">
              <Avatar
                alt={`Imagen del empleado ${employee.user.firstName} ${employee.user.lastName}`}
                className="size-14"
              >
                <AvatarImage
                  source={require("@/assets/user_placeholder.jpg")}
                />
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
            </CardHeader>
          </Card>
        </TouchableOpacity>
      ))}
    </>
  );
}
