import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const updateStorageData = async (key: string, value: string | number | boolean | object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    Alert.alert("Error", error);
  }
};

export const getStorageData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    Alert.alert("Error", error);
  }

  return false;
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    Alert.alert("Error", error);
  }
};
