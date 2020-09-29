import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const verifyClient = async (variables: IVerifyClientRequest, handleError?: TypeIntegrationError) => {
  try {
    const data = await gqlOperation<IVerifyClientMutation, IVerifyClientRequest>(
      GQL_MUTATIONS.clientRegister,
      variables,
      undefined,
      handleError,
    );
    return data?.clientRegister;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in verifyClient line 15 at VerifyClient.ts", error);
    return error;
  }
};
