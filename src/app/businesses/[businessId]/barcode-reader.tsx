import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  type RelativePathString,
  useGlobalSearchParams,
  useRouter,
} from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function BarcodeReader() {
  const { from } = useGlobalSearchParams<{
    from: RelativePathString;
  }>();
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  function onBarcodeScanned(code: string) {
    if (isScanning) return;
    setIsScanning(true);
    router.replace({
      pathname: from,
      params: {
        barcode: code,
      },
    });
  }

  useEffect(() => {
    return () => {
      setIsScanning(false);
    };
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View>
        <Text>Sin Permisos...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>Necesitas conceder permisos para usar la cámara</Text>
        <Button onPress={requestPermission}>
          <Text>Conceder Permisos</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex flex-1 justify-center">
      <CameraView
        style={{ flex: 1 }}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13"],
        }}
        onBarcodeScanned={(code) => onBarcodeScanned(code.data)}
      />
    </View>
  );
}
