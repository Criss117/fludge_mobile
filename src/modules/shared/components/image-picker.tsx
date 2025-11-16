import { Camera } from "lucide-react-native";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

import { useAuth } from "@/modules/auth/providers/auth.provider";
import { ENDPOINTS } from "@/shared/api-utils/endpoints";
import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { fetch } from "expo/fetch";
import { env } from "../lib/config";

interface Props {
  businessSlug: string;
  productSlug: string;
}

export function ImagePickerButton({ businessSlug, productSlug }: Props) {
  const { sessionToken } = useAuth();

  if (!sessionToken) return null;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    const file = new File(result.assets[0].uri);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        env.EXPO_PUBLIC_API_URL +
          ENDPOINTS.BUSINESSES.PRODUCTS.UPLOAD(businessSlug, productSlug),
        {
          body: formData,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onPress={pickImage}
    >
      <Icon as={Camera} size={20} />
    </Button>
  );
}
