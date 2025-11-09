import { SearchInput } from "@/modules/shared/components/search-input";
import { Button } from "@/modules/shared/components/ui/button";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import type { EmployeeSummary } from "@/shared/entities/employee.entity";
import { Link } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { EmployeeCard } from "../components/employee-card";

interface Props {
  businessSlug: string;
  employees: EmployeeSummary[];
  refetch: () => void;
  isPending: boolean;
}

export function EmployeesScreen({
  businessSlug,
  employees,
  isPending,
  refetch,
}: Props) {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const onChangeText = (text: string) => {
    const textToSearch = text.trim().toLowerCase();

    const filtered = employees.filter((employee) => {
      return (
        employee.user.firstName.toLowerCase().includes(textToSearch) ||
        employee.user.lastName.toLowerCase().includes(textToSearch) ||
        employee.user.email?.toLowerCase().includes(textToSearch)
      );
    });

    setFilteredEmployees(filtered);
  };

  return (
    <View className="px-2 flex gap-y-2 flex-1">
      <View className="py-2">
        <SearchInput
          placeholder="Buscar empleados"
          onChangeText={onChangeText}
        />
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={refetch} />
        }
        data={filteredEmployees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EmployeeCard employee={item} businessSlug={businessSlug} />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={() => (
          <View>
            <Text>No hay empleados</Text>
          </View>
        )}
      />
      <View className="absolute bottom-4 right-4">
        <Link
          href={{
            pathname: "/businesses/[businessSlug]/employees/create",
            params: {
              businessSlug,
            },
          }}
          asChild
          push
        >
          <Button size="icon" className="rounded-full">
            <Icon as={PlusIcon} size={24} />
          </Button>
        </Link>
      </View>
    </View>
  );
}
