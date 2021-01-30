import { GQL_QUERIES } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const getOrderSummary = async (variables: IGetOrderSummaryRequest, handleError?: ResponseErrorType) => {
  try {
    const data: IGetOrderSummaryQuery = await gqlOperation<IGetOrderSummaryQuery, IGetOrderSummaryRequest>(
      GQL_QUERIES.getOrderSummary,
      variables,
      undefined,
      handleError,
    );
    return data.getOrderSummary;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getGetOrderSummary at GetOrderSummary.ts", error);
    return error;
  }
};
