import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql";

export const login = async (variables: ILoginRequest, headers: ILoginHeader) => {
  try {
    const data: ILoginMutation = await gqlOperation<ILoginMutation, ILoginRequest>(GQL_MUTATIONS.userLogin, variables, headers);
    return data.userLogin;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in login line 10 at Login.ts", error);
    return error;
  }
};
