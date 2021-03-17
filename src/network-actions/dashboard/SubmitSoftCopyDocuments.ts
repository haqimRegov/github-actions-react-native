import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitSoftCopyDocuments = async (
  variables: ISubmitSoftCopyDocumentsRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: ISubmitSoftCopyDocumentsQuery = await responseHandler<ISubmitSoftCopyDocumentsQuery, ISubmitSoftCopyDocumentsRequest>(
      GQL_MUTATIONS.submitSoftCopyDocuments,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "submitSoftcopyDocuments" in data === false) {
      throw data;
    }

    return data.submitSoftcopyDocuments;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in submitSoftCopyDocuments at SubmitSoftCopyDocuments.ts", error);
    return error;
  }
};
