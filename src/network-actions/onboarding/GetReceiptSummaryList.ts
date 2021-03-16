import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getReceiptSummaryList = async (
  variables: IGetReceiptSummaryListRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IGetReceiptSummaryListMutation, IGetReceiptSummaryListRequest>(
      GQL_QUERIES.getReceiptSummaryList,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "getReceiptSummaryList" in data === false) {
      throw data;
    }

    return data.getReceiptSummaryList;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getReceiptSummaryList at GetReceiptSummaryList.ts", error);
    return error;
  }
};
