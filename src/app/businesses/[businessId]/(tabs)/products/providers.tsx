import { Button } from "@/modules/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/shared/components/ui/dialog";
import { Text } from "@/modules/shared/components/ui/text";
import { CameraView } from "expo-camera";
import { useState } from "react";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function Providers() {
  const { width } = useSafeAreaFrame();
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  function onBarcodeScanned(code: string) {
    if (isScanning) return;
    setIsScanning(true);
    setCode(code);
    setIsOpen(false);
    setIsScanning(false);
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Text>Open dialog {code}</Text>
          </Button>
        </DialogTrigger>

        <DialogContent
          style={{
            width: width - 32,
            height: width - 32,
          }}
        >
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
          </DialogHeader>
          <CameraView
            style={{ flex: 1 }}
            barcodeScannerSettings={{
              barcodeTypes: ["ean13"],
            }}
            onBarcodeScanned={(code) => onBarcodeScanned(code.data)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <Text>Close</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
