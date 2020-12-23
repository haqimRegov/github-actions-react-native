import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const setupClientAccount = async (variables: ISetupClientAccountRequest, handleError?: ResponseErrorType) => {
  try {
    const data = await gqlOperation<ISetupClientAccountMutation, ISetupClientAccountRequest>(
      GQL_MUTATIONS.setupClientAccount,
      variables,
      undefined,
      handleError,
    );
    return data?.setupClientAccount;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in setupClientAccount line 15 at ClientRegister.ts", error);
    return error;
  }
};
