import { Card } from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { Trash2Icon } from "lucide-react-native";
import { useMemo } from "react";
import { PanResponder, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

export default function Providers() {
  const translateX = useSharedValue(0);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.set(gestureState.dx);
        }
      },
      onPanResponderRelease(e, gestureState) {
        if (gestureState.dx < -50) {
          translateX.set(withSpring(-100));
        } else {
          translateX.set(withSpring(0));
        }
      },
    });
  }, [translateX]);

  return (
    <View className="px-2 my-5">
      <Animated.View
        style={{
          transform: [
            {
              translateX: translateX,
            },
          ],
        }}
        className="flex flex-row relative"
      >
        <Card className="bg-gray-700 p-5 flex-1" {...panResponder.panHandlers}>
          <Text>Providers</Text>
        </Card>
        <View className="absolute h-full  w-20 -right-24 rounded-md bg-destructive">
          <TouchableOpacity className="flex-1 flex items-center justify-center">
            <Icon as={Trash2Icon} size={24} className="text-white" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
