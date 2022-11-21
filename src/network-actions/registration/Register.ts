import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const register = async (variables: IVerifyAgentRequest, handleLoading?: (loading: boolean) => void) => {
  try {
    const data = await responseHandler<IVerifyAgentMutation, IVerifyAgentRequest>(
      GQL_MUTATIONS.firstTimeSignUp,
      variables,
      undefined,
      undefined,
      undefined,
      handleLoading,
      false,
    );

    if (data === undefined || "firstTimeSignUp" in data === false) {
      throw data;
    }

    return data.firstTimeSignUp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in register at Register.ts", error);
    return error;
  }
};
