import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const addBankSummary = async (
  variables: IBankSummaryRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IBankSummaryQuery, IBankSummaryRequest>(
      GQL_MUTATIONS.addBankSummary,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "addBankSummaryInApplication" in data === false) {
      throw data;
    }

    return data.addBankSummaryInApplication;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in addBankSummaryInApplication at addBankSummaryInApplication.ts", error);
    return error;
  }
};
