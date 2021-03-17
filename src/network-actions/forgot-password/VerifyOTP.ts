import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const verifyOtp = async (variables: IVerifyOTPRequest) => {
  try {
    const data = await responseHandler<IVerifyOTPMutation, IVerifyOTPRequest>(
      GQL_MUTATIONS.verifyOtp,
      variables,
      undefined,
      undefined,
      undefined,
      false,
    );

    if (data === undefined || "verifyOtp" in data === false) {
      throw data;
    }

    return data.verifyOtp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in verifyOtp at VerifyOTP.ts", error);
    return error;
  }
};
