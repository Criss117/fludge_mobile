import * as SecureStore from "expo-secure-store";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

function getValueFor(key: string) {
  return SecureStore.getItemAsync(key);
}

export const secureStorage = {
  save,
  getValueFor,
};
