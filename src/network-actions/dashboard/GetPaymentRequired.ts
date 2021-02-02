import { GQL_QUERIES } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const getPaymentRequired = async (variables: IGetPaymentRequiredRequest, handleError?: ResponseErrorType) => {
  try {
    const data: IGetPaymentRequiredQuery = await gqlOperation<IGetPaymentRequiredQuery, IGetPaymentRequiredRequest>(
      GQL_QUERIES.listPaymentRequired,
      variables,
      undefined,
      handleError,
    );
    return data.listPaymentRequired;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getPaymentRequired at GetPaymentRequired.ts", error);
    return error;
  }
};
