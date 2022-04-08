import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getReceiptSummaryList = async (
  variables: IGetReceiptSummaryListRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IGetReceiptSummaryListMutation, IGetReceiptSummaryListRequest>(
      GQL_QUERIES.getReceiptSummaryList,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "receiptSummary" in data === false) {
      throw data;
    }

    return data.receiptSummary;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in receiptSummary at GetReceiptSummaryList.ts", error);
    return error;
  }
};
