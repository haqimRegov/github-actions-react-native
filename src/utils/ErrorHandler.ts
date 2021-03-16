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
  // eslint-disable-next-line no-console
  console.log("ErrorHandler", error);
  if (error !== undefined && error.errorCode === ERROR_CODE.unauthenticated && navigation !== undefined) {
    return AlertDialog(error.message, handleNavigate, "Session Expired");
  }

  Alert.alert(ERRORS.internal.message);
  // TODO proper return type
  return undefined as any;
};
