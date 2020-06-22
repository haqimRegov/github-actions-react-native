import { ActionSheetIOS, Alert, Platform } from "react-native";

export interface RequestActionButton {
  text: string;
  onPress: () => void;
}

export interface RequestActionProps {
  buttons: RequestActionButton[];
  message?: string;
  title: string;
}

export const RequestActionUtil = ({ buttons, message, title }: RequestActionProps) => {
  let fullButtons: RequestActionButton[] = [...buttons];
  if (Platform.OS === "android") {
    Alert.alert(title, message, [...fullButtons].reverse(), { cancelable: true });
  } else if (Platform.OS === "ios") {
    fullButtons = [
      ...fullButtons,
      {
        onPress: () => {},
        text: "Cancel",
      },
    ];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: fullButtons.map((button) => button.text),
        cancelButtonIndex: fullButtons.length - 1,
      },
      (buttonIndex: number) => {
        fullButtons[buttonIndex].onPress();
      },
    );
  }
};
