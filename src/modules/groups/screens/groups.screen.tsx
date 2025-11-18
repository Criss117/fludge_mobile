import { SearchInput } from "@/modules/shared/components/search-input";
import { Button } from "@/modules/shared/components/ui/button";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupSummary } from "@/shared/entities/group.entity";
import { Link } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { GroupCard } from "../components/group-card";

interface Props {
  businessId: string;
  groups: GroupSummary[];
  isPending: boolean;
  refetch: () => void;
}

export function GroupsScreen({
  businessId,
  groups,
  isPending,
  refetch,
}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredGroups, setFilteredGroups] = useState(groups);

  const onChanfeText = (text: string) => {
    const textToSearch = text.trim().toLowerCase();
    setSearchTerm(textToSearch);

    const filtered = groups.filter((group) => {
      return group.name.toLowerCase().includes(textToSearch);
    });

    setFilteredGroups(filtered);
  };

  return (
    <View className="px-2 flex gap-y-2 flex-1">
      <View className="py-2">
        <SearchInput
          placeholder="Buscar grupos"
          onChangeText={onChanfeText}
          value={searchTerm}
        />
      </View>
      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupCard group={item} businessId={businessId} />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={() => (
          <View>
            <Text>No hay grupos</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={refetch} />
        }
      />
      <View className="absolute bottom-4 right-4">
        <Link
          href={{
            pathname: "/businesses/[businessId]/groups/create",
            params: {
              businessId,
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
