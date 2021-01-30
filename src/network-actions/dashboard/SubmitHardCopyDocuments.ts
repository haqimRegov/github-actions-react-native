import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const submitHardCopyDocuments = async (variables: ISubmitHardCopyDocumentsRequest, handleError?: ResponseErrorType) => {
  try {
    const data: ISubmitHardCopyDocumentsQuery = await gqlOperation<ISubmitHardCopyDocumentsQuery, ISubmitHardCopyDocumentsRequest>(
      GQL_MUTATIONS.submitHardCopyDocuments,
      variables,
      undefined,
      handleError,
    );
    return data.submitHardcopyDocuments;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in submitHardCopyDocuments at SubmitHardCopyDocuments.ts", error);
    return error;
  }
};
