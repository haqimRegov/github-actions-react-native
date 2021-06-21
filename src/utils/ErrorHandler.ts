import { CommonActions } from "@react-navigation/native";
import { Alert } from "react-native";

import { ERROR_CODE, ERRORS } from "../data/dictionary";
import { AlertDialog } from "./Alert";

export const ErrorHandler = (error: ErrorType, navigation?: IStackNavigationProp) => {
  const err = error !== undefined ? error : ERRORS.internal;

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
  if (err.errorCode === ERROR_CODE.unauthenticated && navigation !== undefined) {
    return AlertDialog(err.message, handleNavigate, "Session Expired");
  }
  setTimeout(() => {
    Alert.alert(err.message);
  }, 100);
  // TODO proper return type
  return undefined as any;
};
