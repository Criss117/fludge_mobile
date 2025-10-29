import { Icon } from "@/modules/shared/components/ui/icon";
import { Input } from "@/modules/shared/components/ui/input";
import { Text } from "@/modules/shared/components/ui/text";
import type { EmployeeSummary } from "@/shared/entities/employee.entity";
import { SearchIcon } from "lucide-react-native";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { EmployeeCard } from "../components/employee-card";

interface Props {
  businessSlug: string;
  employees: EmployeeSummary[];
}

export function EmployeesScreen({ businessSlug, employees }: Props) {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const onTextChange = (text: string) => {
    const textToSearch = text.trim().toLowerCase();

    const filtered = employees.filter((employee) => {
      return (
        employee.user.firstName.toLowerCase().includes(textToSearch) ||
        employee.user.lastName.toLowerCase().includes(textToSearch) ||
        employee.user.email.toLowerCase().includes(textToSearch)
      );
    });

    setFilteredEmployees(filtered);
  };

  return (
    <View className="mt-4 px-4 flex gap-y-4">
      <View className="relative">
        <Input placeholder="buscar empleados" onChangeText={onTextChange} />
        <Icon
          as={SearchIcon}
          size={24}
          className="absolute bottom-1/2 right-3"
          style={{
            transform: [
              {
                translateY: "50%",
              },
            ],
          }}
        />
      </View>
      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EmployeeCard employee={item} />}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={() => (
          <View>
            <Text>No hay empleados</Text>
          </View>
        )}
      />
    </View>
  );
}
