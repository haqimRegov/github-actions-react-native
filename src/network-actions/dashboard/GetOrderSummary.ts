import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getOrderSummary = async (
  variables: IGetOrderSummaryRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IGetOrderSummaryQuery = await responseHandler<IGetOrderSummaryQuery, IGetOrderSummaryRequest>(
      GQL_QUERIES.getOrderSummary,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "getOrderSummary" in data === false) {
      throw data;
    }

    return data.getOrderSummary;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getGetOrderSummary at GetOrderSummary.ts", error);
    return error;
  }
};
