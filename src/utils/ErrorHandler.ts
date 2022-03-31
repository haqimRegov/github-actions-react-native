import { CommonActions } from "@react-navigation/native";

import { ERROR_CODE, ERRORS } from "../data/dictionary";
import { AlertDialog } from "./Alert";

export const ErrorHandler = (error: ErrorType, navigation?: IStackNavigationProp, handleLoading?: (loading: boolean) => void) => {
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
  if (err.errorCode === ERROR_CODE.unauthenticated && navigation !== undefined) {
    AlertDialog(err.message, handleNavigate, "Session Expired");
  }

  const handleDialog = () => {
    if (handleLoading !== undefined) {
      handleLoading(false);
    }
  };

  setTimeout(() => {
    AlertDialog(err.message, handleDialog);
  }, 100);
};
