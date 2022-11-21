import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitPdfTransactions = async (
  variables: ISubmitPdfTransactionsRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<ISubmitPdfTransactionsMutation, ISubmitPdfTransactionsRequest>(
      GQL_MUTATIONS.submitPdfTransactions,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "submitPdfTransactions" in data === false) {
      throw data;
    }

    return data.submitPdfTransactions;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in submitPdfTransactions at SubmitPDFTransactions.ts", error);
    return error;
  }
};
