import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const resetPassword = async (variables: IResetPasswordRequest, headers: IResetPasswordHeader) => {
  try {
    const data = await responseHandler<IResetPasswordMutation, IResetPasswordRequest, IResetPasswordHeader>(
      GQL_MUTATIONS.resetPassword,
      variables,
      headers,
      undefined,
      undefined,
      false,
    );

    if (data === undefined || "resetPassword" in data === false) {
      throw data;
    }

    return data.resetPassword;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in resetPassword at ResetPassword.ts", error);
    return error;
  }
};
