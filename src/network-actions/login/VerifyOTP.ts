import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql";

export const verifyLockOtp = async (variables: IVerifyLockOTPRequest) => {
  try {
    const data = await gqlOperation<IVerifyLockOTPMutation, IVerifyLockOTPRequest>(GQL_MUTATIONS.verifyLockOtp, variables);
    return data?.verifyOtpAgent;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in verifyLockOtp line 10 at VerifyOTP.ts", error);
    return error;
  }
};
