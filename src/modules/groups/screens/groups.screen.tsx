import { Icon } from "@/modules/shared/components/ui/icon";
import { Input } from "@/modules/shared/components/ui/input";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupSummary } from "@/shared/entities/group.entity";
import { SearchIcon } from "lucide-react-native";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { GroupCard } from "../components/group-card";

interface Props {
  businessSlug: string;
  groups: GroupSummary[];
}

export function GroupsScreen({ businessSlug, groups }: Props) {
  const [filteredGroups, setFilteredGroups] = useState(groups);

  const onTextChange = (text: string) => {
    const textToSearch = text.trim().toLowerCase();

    const filtered = groups.filter((group) => {
      return group.name.toLowerCase().includes(textToSearch);
    });

    setFilteredGroups(filtered);
  };

  return (
    <View className="mt-4 px-4 flex gap-y-4">
      <View className="relative">
        <Input placeholder="buscar grupos" onChangeText={onTextChange} />
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
        data={filteredGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupCard group={item} businessSlug={businessSlug} />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={() => (
          <View>
            <Text>No hay grupos</Text>
          </View>
        )}
      />
    </View>
  );
}
