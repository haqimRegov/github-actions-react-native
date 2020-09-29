import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql";

export const forgotPassword = async (variables: IForgotPasswordRequest) => {
  try {
    const data = await gqlOperation<IForgotPasswordMutation, IForgotPasswordRequest>(GQL_MUTATIONS.forgotPassword, variables);
    return data?.forgotPassword;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in forgotPassword line 10 at ForgotPassword.ts", error);
    return error;
  }
};
