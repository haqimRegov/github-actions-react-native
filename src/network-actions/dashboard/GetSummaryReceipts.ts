import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const getSummaryReceipt = async (variables: ISummaryReceiptRequest, handleError?: ResponseErrorType) => {
  try {
    const data = await gqlOperation<ISummaryReceiptMutation, ISummaryReceiptRequest>(
      GQL_MUTATIONS.summaryReceipt,
      variables,
      undefined,
      handleError,
    );
    return data.summaryReceipt;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getSummaryReceipt at SummaryReceipt.ts", error);
    return error;
  }
};
