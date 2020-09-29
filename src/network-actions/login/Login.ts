import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql";

export const login = async (variables: ILoginRequest) => {
  try {
    const data = await gqlOperation<ILoginMutation, ILoginRequest>(GQL_MUTATIONS.userLogin, variables);
    return data?.userLogin;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in login line 10 at Login.ts", error);
    return error;
  }
};
