import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const generatePdfTransactions = async (
  variables: IGeneratePdfTransactionsRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IGeneratePdfTransactionsMutation, IGeneratePdfTransactionsRequest>(
      GQL_MUTATIONS.generatePdfTransactions,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "generatePdfTransactions" in data === false) {
      throw data;
    }

    return data.generatePdfTransactions;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in generatePdfTransactions at GeneratePDFTransactions.ts", error);
    return error;
  }
};
