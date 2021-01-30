import { GQL_QUERIES } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const getSoftCopyDocuments = async (variables: IGetSoftCopyDocumentsRequest, handleError?: ResponseErrorType) => {
  try {
    const data: IGetSoftCopyDocumentsQuery = await gqlOperation<IGetSoftCopyDocumentsQuery, IGetSoftCopyDocumentsRequest>(
      GQL_QUERIES.listSoftCopyDocuments,
      variables,
      undefined,
      handleError,
    );
    return data.listSoftcopyDocuments;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getSoftCopyDocuments at GetSoftCopyDocuments.ts", error);
    return error;
  }
};
