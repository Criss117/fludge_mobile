import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { UserAvatar } from "@/modules/shared/components/user-avatar";
import type { EmployeeDetail } from "@/shared/entities/employee.entity";
import { View } from "react-native";

interface Props {
  employee: EmployeeDetail;
}

export function EmployeeHeaderSection({ employee }: Props) {
  return (
    <Card>
      <CardHeader className="flex items-center gap-y-2">
        <UserAvatar
          alt={`${employee.user.firstName} ${employee.user.lastName}`}
          firstName={employee.user.firstName}
          lastName={employee.user.lastName}
          size="size-20"
        />
        <View>
          <CardTitle className="text-2xl text-center">
            {employee.user.firstName} {employee.user.lastName}
          </CardTitle>
          <CardDescription className="text-center">
            {employee.user.email}
          </CardDescription>
        </View>
      </CardHeader>
    </Card>
  );
}
