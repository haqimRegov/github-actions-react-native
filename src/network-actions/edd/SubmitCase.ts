import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitCase = async (
  variables: ISubmitCaseRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: ISubmitCaseMutation = await responseHandler<ISubmitCaseMutation, ISubmitCaseRequest>(
      GQL_MUTATIONS.submitEDDCase,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "submitEdd" in data === false) {
      throw data;
    }

    return data.submitEdd;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in submitCase at SubmitCase.ts", error);
    return error;
  }
};
