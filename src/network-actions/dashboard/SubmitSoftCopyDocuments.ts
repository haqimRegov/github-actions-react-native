import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitSoftCopyDocuments = async (
  variables: ISubmitSoftCopyDocumentsRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: ISubmitSoftCopyDocumentsQuery = await responseHandler<ISubmitSoftCopyDocumentsQuery, ISubmitSoftCopyDocumentsRequest>(
      GQL_MUTATIONS.submitSoftCopyDocuments,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "submitSoftcopyDocuments" in data === false) {
      throw data;
    }

    return data.submitSoftcopyDocuments;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in submitSoftCopyDocuments at SubmitSoftCopyDocuments.ts", error);
    return error;
  }
};
