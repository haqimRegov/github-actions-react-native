import { GQL_QUERIES } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const checkClient = async (variables: IEtbCheckRequest, handleError?: ResponseErrorType) => {
  try {
    const data: IEtbCheckQuery = await gqlOperation<IEtbCheckQuery, IEtbCheckRequest>(
      GQL_QUERIES.etbCheck,
      variables,
      undefined,
      handleError,
    );
    return data.etbCheck;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in checkClient line 15 at ETBCheck.ts", error);
    return error;
  }
};
