import { Auth } from "aws-amplify";

import { ERRORS } from "../../data/dictionary";

export const logout = async () => {
  // try {
  try {
    const user = await Auth.currentAuthenticatedUser();
    user.signOut({ global: true });
    return undefined;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Auth Sign Out Error", error);
    return ERRORS.unauthenticated;
  }
  // } catch (error) {
  //   // eslint-disable-next-line no-console
  //   console.log("Error in logout at Logout.ts", error);
  //   return ERRORS.internal;
  // }
};
