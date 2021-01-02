import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const submitClientAccount = async (variables: ISubmitClientAccountRequest, handleError?: ResponseErrorType) => {
  try {
    const data = await gqlOperation<ISubmitClientAccountMutation, ISubmitClientAccountRequest>(
      GQL_MUTATIONS.submitClientAccount,
      variables,
      undefined,
      handleError,
    );
    return data?.submitClientAccount;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in submitClientAccount line 15 at SubmitClientAccount.ts", error);
    return error;
  }
};
