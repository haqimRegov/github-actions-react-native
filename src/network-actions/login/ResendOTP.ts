import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const resendLockOtp = async (variables: IResendLockOTPRequest) => {
  try {
    const data = await responseHandler<IResendLockOTPMutation, IResendLockOTPRequest>(
      GQL_MUTATIONS.resendLockOtp,
      variables,
      undefined,
      undefined,
      undefined,
      false,
    );

    if (data === undefined || "resendLockOtp" in data === false) {
      throw data;
    }

    return data.resendLockOtp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in resendLockOtp at ResendOTP.ts", error);
    return error;
  }
};
