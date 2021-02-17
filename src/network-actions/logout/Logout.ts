import { Auth } from "aws-amplify";

import { ERRORS } from "../../data/dictionary";

export const logout = () => {
  // try {
  return Auth.currentAuthenticatedUser()
    .then((user) => {
      user.signOut({ global: true });
      return undefined;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log("Auth Sign Out Error", error);
      return ERRORS.unauthenticated;
    });
  // } catch (error) {
  //   // eslint-disable-next-line no-console
  //   console.log("Error in logout at Logout.ts", error);
  //   return ERRORS.internal;
  // }
};
