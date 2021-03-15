import { CommonActions } from "@react-navigation/native";
import { Alert } from "react-native";

import { ERROR_CODE, ERRORS } from "../data/dictionary";
import { AlertDialog } from "./Alert";

export const ErrorHandler = (error: ErrorType, navigation?: IStackNavigationProp) => {
  const handleNavigate = () => {
    if (navigation !== undefined) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Logout" }],
        }),
      );
    }
  };
  if (error !== undefined && navigation !== undefined) {
    const title = error !== undefined && error.errorCode === ERROR_CODE.unauthenticated ? "Session Expired" : undefined;
    return AlertDialog(error.message, handleNavigate, title);
  }

  Alert.alert(ERRORS.internal.message);
  // TODO proper return type
  return error as any;
};
