import { Alert } from "react-native";

export const AlertDialog = (message: string, onPress: () => void) => {
  Alert.alert("Error", message, [{ text: "OK", onPress: onPress }], { cancelable: false });
};
