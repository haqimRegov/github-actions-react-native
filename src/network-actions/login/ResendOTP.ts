import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql";

export const resendLockOtp = async (variables: IResendLockOTPRequest) => {
  try {
    const data = await gqlOperation<IResendLockOTPMutation, IResendLockOTPRequest>(GQL_MUTATIONS.resendLockOtp, variables);
    return data?.resendLockOtp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in resendLockOtp line 10 at ResendOTP.ts", error);
    return error;
  }
};
