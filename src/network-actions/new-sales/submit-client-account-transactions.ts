import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitClientAccountTransactions = async (
  variables: ISubmitClientAccountTransactionsRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<ISubmitClientAccountTransactionsMutation, ISubmitClientAccountTransactionsRequest>(
      GQL_MUTATIONS.submitClientAccountTransactions,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "submitClientAccountTransactions" in data === false) {
      throw data;
    }

    return data.submitClientAccountTransactions;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in submitClientAccountTransactions at SubmitClientAccountTransactions.ts", error);
    return error;
  }
};
