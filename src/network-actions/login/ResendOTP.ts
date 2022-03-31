import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const resendLockOtp = async (variables: IResendLockOTPRequest, handleLoading?: (loading: boolean) => void) => {
  try {
    const data = await responseHandler<IResendLockOTPMutation, IResendLockOTPRequest>(
      GQL_MUTATIONS.resendLockOtp,
      variables,
      undefined,
      undefined,
      undefined,
      handleLoading,
      false,
    );

    if (data === undefined || "resendLockOtp" in data === false) {
      throw data;
    }

    return data.resendLockOtp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in resendLockOtp at ResendOTP.ts", error);
    return error;
  }
};
