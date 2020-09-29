import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql";

export const verifySignUp = async (variables: IVerifySignUpRequest) => {
  try {
    const data = await gqlOperation<IVerifySignUpMutation, IVerifySignUpRequest>(GQL_MUTATIONS.verifySignUp, variables);
    return data?.verifySignUp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in verifySignUp line 10 at VerifyOTP.ts", error);
    return error;
  }
};
