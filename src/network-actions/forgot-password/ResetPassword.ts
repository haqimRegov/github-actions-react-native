import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql";

export const resetPassword = async (variables: IResetPasswordRequest) => {
  try {
    const data = await gqlOperation<IResetPasswordMutation, IResetPasswordRequest>(GQL_MUTATIONS.resetPassword, variables);
    return data?.resetPassword;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in resetPassword line 10 at ResetPassword.ts", error);
    return error;
  }
};
