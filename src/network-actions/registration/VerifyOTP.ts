import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const verifySignUp = async (variables: IVerifySignUpRequest) => {
  try {
    const data = await responseHandler<IVerifySignUpMutation, IVerifySignUpRequest>(
      GQL_MUTATIONS.verifySignUp,
      variables,
      undefined,
      undefined,
      undefined,
      false,
    );

    if (data === undefined || "verifySignUp" in data === false) {
      throw data;
    }

    return data.verifySignUp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in verifySignUp line 10 at VerifyOTP.ts", error);
    return error;
  }
};
