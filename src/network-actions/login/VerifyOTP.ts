import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const verifyLockOtp = async (variables: IVerifyLockOTPRequest) => {
  try {
    const data = await responseHandler<IVerifyLockOTPMutation, IVerifyLockOTPRequest>(
      GQL_MUTATIONS.verifyLockOtp,
      variables,
      undefined,
      undefined,
      undefined,
      false,
    );

    if (data === undefined || "verifyOtpAgent" in data === false) {
      throw data;
    }

    return data.verifyOtpAgent;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in verifyLockOtp at VerifyOTP.ts", error);
    return error;
  }
};
