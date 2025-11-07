import { useAuth } from "@/modules/auth/providers/auth.provider";
import { Button } from "@/modules/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Input } from "@/modules/shared/components/ui/input";
import { Separator } from "@/modules/shared/components/ui/separator";
import { Text } from "@/modules/shared/components/ui/text";
import { Link, Redirect, useRouter } from "expo-router";
import { ChevronRight, MapPin } from "lucide-react-native";
import React from "react";
import { FlatList, Pressable, View } from "react-native";

export default function Select() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) return <Redirect href="/auth/sign-in" />;

  return (
    <FlatList
      className="px-4"
      data={user.isRootIn}
      ListHeaderComponent={() => (
        <View className="py-4">
          <Input placeholder="Buscar por nombre o nit" />
        </View>
      )}
      ListFooterComponent={() => (
        <View>
          <Link
            href={{
              pathname: "/businesses/register",
            }}
          >
            <Button>
              <Text>registrar</Text>
            </Button>
          </Link>
        </View>
      )}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            router.replace({
              pathname: "/businesses/[businessSlug]",
              params: {
                businessSlug: item.slug,
              },
            });
          }}
        >
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <View>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>NIT: {item.nit}</CardDescription>
              </View>
              <Icon as={ChevronRight} size={20} />
            </CardHeader>
            <View className="px-6">
              <Separator />
            </View>
            <CardContent>
              <View className="flex flex-row gap-x-2 items-center">
                <Icon as={MapPin} size={18} className="text-muted-foreground" />
                <Text className="text-muted-foreground">
                  Dirección: {item.address ?? "No se ha indicado"}
                </Text>
              </View>
            </CardContent>
          </Card>
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="h-2" />}
    />
  );
}
