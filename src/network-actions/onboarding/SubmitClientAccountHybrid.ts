import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitClientAccountHybrid = async (
  variables: ISubmitClientAccountHybridRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<ISubmitClientAccountHybridMutation, ISubmitClientAccountHybridRequest>(
      GQL_MUTATIONS.submitClientAccountHybrid,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "submitClientAccountHybrid" in data === false) {
      throw data;
    }

    return data.submitClientAccountHybrid;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in submitClientAccountHybrid at SubmitClientAccountHybrid.ts", error);
    return error;
  }
};
