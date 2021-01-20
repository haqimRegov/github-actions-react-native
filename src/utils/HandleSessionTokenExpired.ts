import { CommonActions } from "@react-navigation/native";

import { ERRORS } from "../data/dictionary";
import { AlertDialog } from "./Alert";

export const HandleSessionTokenExpired = (navigation: IStackNavigationProp, error: ErrorType, noDialog?: boolean) => {
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
  if (error !== undefined || noDialog === true) {
    AlertDialog(ERRORS.unauthenticated.message, handleNavigate);
  } else {
    handleNavigate();
  }
};
