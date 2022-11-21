import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const forgotPassword = async (variables: IForgotPasswordRequest, handleLoading?: (loading: boolean) => void) => {
  try {
    const data = await responseHandler<IForgotPasswordMutation, IForgotPasswordRequest>(
      GQL_MUTATIONS.forgotPassword,
      variables,
      undefined,
      undefined,
      undefined,
      handleLoading,
      false,
    );

    if (data === undefined || "forgotPassword" in data === false) {
      throw data;
    }

    return data.forgotPassword;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in forgotPassword at ForgotPassword.ts", error);
    return error;
  }
};
