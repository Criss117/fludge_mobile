import { CreateGroupScreen } from "@/modules/groups/screens/create-group.screen";
import { useGlobalSearchParams } from "expo-router";

export default function CreateGroup() {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug: string;
  }>();

  return <CreateGroupScreen businessSlug={businessSlug} />;
}
