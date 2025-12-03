import { env } from "@/modules/shared/lib/config";
import { ENDPOINTS } from "@/shared/api-utils/endpoints";
import { Image } from "react-native";

interface Props {
  productImage?: string | null;
}

export function ProductImage({ productImage }: Props) {
  return (
    <>
      {!productImage && (
        <Image
          source={require("@/assets/placeholder.png")}
          className="aspect-[20/21] rounded-lg"
          style={{
            width: "auto",
            height: "auto",
          }}
          fadeDuration={100}
        />
      )}
      {productImage && (
        <Image
          source={{
            uri: productImage.includes("http")
              ? productImage
              : `${env.EXPO_PUBLIC_API_URL}${ENDPOINTS.IMAGES.PRODUCTS(productImage)}`,
          }}
          loadingIndicatorSource={require("@/assets/placeholder.png")}
          fadeDuration={100}
          className="aspect-[20/21] rounded-lg"
          style={{
            width: "auto",
            height: "auto",
          }}
        />
      )}
    </>
  );
}
