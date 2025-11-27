import { CameraView } from "expo-camera";
import * as Haptics from "expo-haptics";
import { CameraIcon } from "lucide-react-native";
import { useState } from "react";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";

interface Props {
  setBarcode: (barcode: string) => void;
}

export function ScanBarcodeDialog({ setBarcode }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useSafeAreaFrame();

  function onBarcodeScanned(code: string) {
    if (!isOpen) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setBarcode(code);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon as={CameraIcon} size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent
        style={{
          width: width - 32,
          height: width - 32,
        }}
      >
        <DialogHeader>
          <DialogTitle>Escanear código de barras</DialogTitle>
        </DialogHeader>
        <CameraView
          style={{ flex: 1, borderRadius: 8 }}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13"],
          }}
          onBarcodeScanned={(code) => onBarcodeScanned(code.data)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <Text>Cancelar</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
