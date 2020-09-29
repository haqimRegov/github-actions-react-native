import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql";

export const registerPassword = async (variables: ISignUpRequest) => {
  try {
    const data = await gqlOperation<ISignUpMutation, ISignUpRequest>(GQL_MUTATIONS.registerPassword, variables);
    return data?.signUp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in registerPassword line 10 at Password.ts", error);
    return error;
  }
};
