import { CommonActions } from "@react-navigation/native";
import { Auth } from "aws-amplify";

import { ERRORS } from "../../data/dictionary";
import { ErrorHandler } from "../../utils";

export const logout = async (navigation?: IStackNavigationProp, global?: boolean) => {
  try {
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
    if (navigation !== undefined) {
      handleNavigate();
    }
    await Auth.signOut({ global: global !== undefined ? global : true });
    return undefined;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in Logout", error);
    const err =
      error === "No current user" ||
      error === "The user is not authenticated" ||
      error.message === "Access Token has been revoked" ||
      error.message === "Refresh Token has been revoked"
        ? ERRORS.unauthenticated
        : error;
    if (navigation !== undefined) {
      return ErrorHandler(err, navigation);
    }

    return err;
  }
};
