import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Skeleton } from "@/modules/shared/components/ui/skeleton";
import { Text } from "@/modules/shared/components/ui/text";
import { formatCurrency } from "@/modules/shared/lib/utils";
import type { EmployeeDetail } from "@/shared/entities/employee.entity";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { Calendar, DollarSign } from "lucide-react-native";
import { View } from "react-native";

interface Props {
  employee: EmployeeDetail;
}

export function LaboralInformationSection({ employee }: Props) {
  return (
    <View className="flex gap-y-2">
      <Text variant="h4">Información Laboral</Text>
      <Card>
        <CardHeader className="flex flex-row items-center gap-x-2">
          <View className="bg-primary/10 p-2 rounded-md">
            <Icon as={Calendar} size={28} />
          </View>
          <View>
            <CardTitle>Fecha de contratación</CardTitle>
            <CardDescription>
              {format(employee.hireDate, "dd 'de' MMMM 'de' yyyy", {
                locale: es,
              })}
            </CardDescription>
          </View>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row gap-x-2 items-start">
          <View className="bg-primary/10 p-2 rounded-md">
            <Icon as={DollarSign} size={28} />
          </View>
          <View>
            <CardTitle>Salario</CardTitle>
            <CardDescription>{formatCurrency(employee.salary)}</CardDescription>
            <CardDescription>mensuales</CardDescription>
          </View>
        </CardHeader>
      </Card>
    </View>
  );
}

export function LaboralInformationSectionSkeleton() {
  return (
    <View className="flex gap-y-2">
      <Text variant="h4">Información Laboral</Text>
      <Card>
        <CardHeader className="flex flex-row items-center gap-x-2">
          <View className="bg-primary/10 p-2 rounded-md">
            <Icon as={Calendar} size={28} />
          </View>
          <View>
            <CardTitle>Fecha de contratación</CardTitle>
            <CardDescription>
              <Skeleton className="w-2/3 h-4 bg-muted-foreground" />
            </CardDescription>
          </View>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row gap-x-2 items-start">
          <View className="bg-primary/10 p-2 rounded-md">
            <Icon as={DollarSign} size={28} />
          </View>
          <View>
            <CardTitle>Salario</CardTitle>
            <CardDescription>
              <Skeleton className="w-2/3 h-4 bg-muted-foreground" />
            </CardDescription>
            <CardDescription>mensuales</CardDescription>
          </View>
        </CardHeader>
      </Card>
    </View>
  );
}
