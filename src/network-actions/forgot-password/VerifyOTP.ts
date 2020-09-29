import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql";

export const verifyOtp = async (variables: IVerifyOTPRequest) => {
  try {
    const data = await gqlOperation<IVerifyOTPMutation, IVerifyOTPRequest>(GQL_MUTATIONS.verifyOtp, variables);
    return data?.verifyOtp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in verifyOtp line 10 at VerifyOTP.ts", error);
    return error;
  }
};
