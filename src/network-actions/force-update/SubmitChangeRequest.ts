import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitChangeRequest = async (
  variables: ISubmitChangeRequestRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<ISubmitChangeRequestMutation, ISubmitChangeRequestRequest>(
      GQL_MUTATIONS.submitChangeRequest,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "submitCr" in data === false) {
      throw data;
    }

    return data.submitCr;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in submitCr at SubmitChangeRequest.ts", error);
    return error;
  }
};
