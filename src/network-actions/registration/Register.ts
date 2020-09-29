import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql";

export const register = async (variables: IVerifyAgentRequest) => {
  try {
    const data = await gqlOperation<IVerifyAgentMutation, IVerifyAgentRequest>(GQL_MUTATIONS.firstTimeSignUp, variables);
    return data?.firstTimeSignUp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in register line 10 at Register.ts", error);
    return error;
  }
};
