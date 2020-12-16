import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const clientRegister = async (variables: IClientRegisterRequest, handleError?: ResponseErrorType) => {
  try {
    const data = await gqlOperation<IClientRegisterMutation, IClientRegisterRequest>(
      GQL_MUTATIONS.clientRegister,
      variables,
      undefined,
      handleError,
    );
    return data?.clientRegister;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in clientRegister line 15 at ClientRegister.ts", error);
    return error;
  }
};
