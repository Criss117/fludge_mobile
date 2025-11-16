import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { fetch } from "expo/fetch";
import { useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function ImagePickerExample() {
  const { width } = useSafeAreaFrame();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // console.log(JSON.stringify(result.assets, null, 2));

    if (result.canceled) return;
    setImage(result.assets[0]);

    const file = new File(result.assets[0].uri);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://192.168.101.14:8080/api/images/upload",
        {
          body: formData,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{
            width: width - 32,
            height: 200,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 500,
    height: 500,
  },
});
