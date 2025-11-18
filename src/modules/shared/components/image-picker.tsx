import { Camera, Image, ImageUp } from "lucide-react-native";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

import { useAuth } from "@/modules/auth/providers/auth.provider";
import { ENDPOINTS } from "@/shared/api-utils/endpoints";
import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { fetch } from "expo/fetch";
import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { env } from "../lib/config";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Text } from "./ui/text";

interface Props {
  businessId: string;
  productId: string;
}

export function ImagePickerButton({ businessId, productId }: Props) {
  const { sessionToken } = useAuth();
  const [open, setOpen] = useState(false);
  const { width } = useSafeAreaFrame();

  if (!sessionToken) return null;

  const pickImage = async (type: "camera" | "gallery") => {
    // No permissions request is necessary for launching the image library
    let result: ImagePicker.ImagePickerResult | null = null;

    if (type === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    if (type === "gallery") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        selectionLimit: 1,
      });
    }

    if (result === null || result.canceled) return;

    const file = new File(result.assets[0].uri);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        env.EXPO_PUBLIC_API_URL +
          ENDPOINTS.BUSINESSES.PRODUCTS.UPLOAD(businessId, productId),
        {
          body: formData,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      setOpen(false);
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Icon as={ImageUp} size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent style={{ width: width - 32 }}>
        <DialogHeader>
          <DialogTitle>Sube una imagen</DialogTitle>
        </DialogHeader>
        <View className="flex gap-y-2">
          <Button
            variant="outline"
            onPress={() => pickImage("gallery")}
            className="flex justify-between"
          >
            <Icon as={Image} size={20} />
            <Text className="flex-1 text-center">
              Seleccionar de la galeria
            </Text>
          </Button>
          <Button
            variant="outline"
            className="flex justify-between"
            onPress={() => pickImage("camera")}
          >
            <Icon as={Camera} size={20} />
            <Text className="flex-1 text-center">Tomar una foto</Text>
          </Button>
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">
              <Text>Cancelar</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
