import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getOrderSummary = async (
  variables: IGetOrderSummaryRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IGetOrderSummaryQuery = await responseHandler<IGetOrderSummaryQuery, IGetOrderSummaryRequest>(
      GQL_QUERIES.getOrderSummary,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "getOrderSummaryV2" in data === false) {
      throw data;
    }

    return data.getOrderSummaryV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getGetOrderSummary at GetOrderSummary.ts", error);
    return error;
  }
};
