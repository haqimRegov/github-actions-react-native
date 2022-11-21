import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const getSummaryReceipt = async (
  variables: ISummaryReceiptRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<ISummaryReceiptMutation, ISummaryReceiptRequest>(
      GQL_MUTATIONS.summaryReceipt,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "summaryReceipt" in data === false) {
      throw data;
    }

    return data.summaryReceipt;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getSummaryReceipt at SummaryReceipt.ts", error);
    return error;
  }
};
