import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const register = async (variables: IVerifyAgentRequest) => {
  try {
    const data = await responseHandler<IVerifyAgentMutation, IVerifyAgentRequest>(
      GQL_MUTATIONS.firstTimeSignUp,
      variables,
      undefined,
      undefined,
      undefined,
      false,
    );

    if (data === undefined || "firstTimeSignUp" in data === false) {
      throw data;
    }

    return data.firstTimeSignUp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in register at Register.ts", error);
    return error;
  }
};
