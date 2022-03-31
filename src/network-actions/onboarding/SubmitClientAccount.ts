import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitClientAccount = async (
  variables: ISubmitClientAccountRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<ISubmitClientAccountMutation, ISubmitClientAccountRequest>(
      GQL_MUTATIONS.submitClientAccount,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "submitClientAccount" in data === false) {
      throw data;
    }

    return data.submitClientAccount;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in submitClientAccount at SubmitClientAccount.ts", error);
    return error;
  }
};
