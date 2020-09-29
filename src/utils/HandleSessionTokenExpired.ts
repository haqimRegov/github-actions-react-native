import { CommonActions } from "@react-navigation/native";

import { AlertDialog } from "./Alert";

export const HandleSessionTokenExpired = (resetGlobal: Function, navigation?: IStackNavigationProp, withDialog?: boolean) => {
  resetGlobal();
  const handleNavigate = () => {
    if (navigation !== undefined) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        }),
      );
    }
  };
  if (withDialog === true) {
    AlertDialog("Session Expired", handleNavigate);
  } else {
    handleNavigate();
  }
};
