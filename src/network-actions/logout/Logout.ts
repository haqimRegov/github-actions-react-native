import { CommonActions } from "@react-navigation/native";
import { Auth } from "aws-amplify";

import { ERRORS } from "../../data/dictionary";
import { ErrorHandler } from "../../utils";

export const logout = async (navigation?: IStackNavigationProp) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    user.signOut({ global: true });
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
    return undefined;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in logout", error);
    const err = error === "No current user" || error === "The user is not authenticated" ? ERRORS.unauthenticated : error;
    if (navigation !== undefined) {
      return ErrorHandler(err, navigation);
    }

    return err;
  }
};
