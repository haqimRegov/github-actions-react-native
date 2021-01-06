import { GQL_QUERIES } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const getReceiptSummaryList = async (variables: IGetReceiptSummaryListRequest, handleError?: ResponseErrorType) => {
  try {
    const data = await gqlOperation<IGetReceiptSummaryListMutation, IGetReceiptSummaryListRequest>(
      GQL_QUERIES.getReceiptSummaryList,
      variables,
      undefined,
      handleError,
    );
    return data?.getReceiptSummaryList;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getReceiptSummaryList line 15 at GetReceiptSummaryList.ts", error);
    return error;
  }
};
