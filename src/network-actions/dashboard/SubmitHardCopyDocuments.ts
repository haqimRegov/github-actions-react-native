import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitHardCopyDocuments = async (
  variables: ISubmitHardCopyDocumentsRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: ISubmitHardCopyDocumentsQuery = await responseHandler<ISubmitHardCopyDocumentsQuery, ISubmitHardCopyDocumentsRequest>(
      GQL_MUTATIONS.submitHardCopyDocuments,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "submitHardcopyDocuments" in data === false) {
      throw data;
    }

    return data.submitHardcopyDocuments;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in submitHardCopyDocuments at SubmitHardCopyDocuments.ts", error);
    return error;
  }
};
