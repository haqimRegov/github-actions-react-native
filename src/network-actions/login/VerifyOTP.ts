import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const verifyLockOtp = async (variables: IVerifyLockOTPRequest, handleLoading?: (loading: boolean) => void) => {
  try {
    const data = await responseHandler<IVerifyLockOTPMutation, IVerifyLockOTPRequest>(
      GQL_MUTATIONS.verifyLockOtp,
      variables,
      undefined,
      undefined,
      undefined,
      handleLoading,
      false,
    );

    if (data === undefined || "verifyOtpAgent" in data === false) {
      throw data;
    }

    return data.verifyOtpAgent;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in verifyLockOtp at VerifyOTP.ts", error);
    return error;
  }
};
