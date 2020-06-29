import { Alert } from "react-native";

export const AlertDialog = (message: string, onPress: () => void, title?: string) => {
  const defaultTitle = title !== undefined ? title : "Error";
  Alert.alert(defaultTitle, message, [{ text: "OK", onPress: onPress }], { cancelable: false });
};
