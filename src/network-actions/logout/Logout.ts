import { Auth } from "aws-amplify";

import { HandleSessionTokenExpired } from "../../utils";

type TypeResetGlobal = () => void;

export const logout = async (resetGlobal: TypeResetGlobal, navigation?: IStackNavigationProp) => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    await currentUser.signOut({ global: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in logout line 13 at Logout.ts", error);
  } finally {
    HandleSessionTokenExpired(resetGlobal, navigation);
  }
};
