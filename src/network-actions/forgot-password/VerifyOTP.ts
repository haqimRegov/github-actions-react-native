import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const verifyOtp = async (variables: IVerifyOTPRequest, handleLoading?: (loading: boolean) => void) => {
  try {
    const data = await responseHandler<IVerifyOTPMutation, IVerifyOTPRequest>(
      GQL_MUTATIONS.verifyOtp,
      variables,
      undefined,
      undefined,
      undefined,
      handleLoading,
      false,
    );

    if (data === undefined || "verifyOtp" in data === false) {
      throw data;
    }

    return data.verifyOtp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in verifyOtp at VerifyOTP.ts", error);
    return error;
  }
};
