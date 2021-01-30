import { GQL_QUERIES } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const getHardCopyDocuments = async (variables: IGetHardCopyDocumentsRequest, handleError?: ResponseErrorType) => {
  try {
    const data: IGetHardCopyDocumentsQuery = await gqlOperation<IGetHardCopyDocumentsQuery, IGetHardCopyDocumentsRequest>(
      GQL_QUERIES.listHardCopyDocuments,
      variables,
      undefined,
      handleError,
    );
    return data.listHardcopyDocuments;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getHardCopyDocuments at GetHardCopyDocuments.ts", error);
    return error;
  }
};
