import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const submitSoftCopyDocuments = async (variables: ISubmitSoftCopyDocumentsRequest, handleError?: ResponseErrorType) => {
  try {
    const data: ISubmitSoftCopyDocumentsQuery = await gqlOperation<ISubmitSoftCopyDocumentsQuery, ISubmitSoftCopyDocumentsRequest>(
      GQL_MUTATIONS.submitSoftCopyDocuments,
      variables,
      undefined,
      handleError,
    );
    return data.submitSoftcopyDocuments;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in submitSoftCopyDocuments at SubmitSoftCopyDocuments.ts", error);
    return error;
  }
};
