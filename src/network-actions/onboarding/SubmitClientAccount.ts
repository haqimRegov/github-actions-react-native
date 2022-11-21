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

    if (data === undefined || "submitClientAccountV2" in data === false) {
      throw data;
    }

    return data.submitClientAccountV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in submitClientAccountV2 at SubmitClientAccount.ts", error);
    return error;
  }
};
