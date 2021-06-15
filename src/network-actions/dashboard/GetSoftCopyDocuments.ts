import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getSoftCopyDocuments = async (
  variables: IGetSoftCopyDocumentsRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IGetSoftCopyDocumentsQuery = await responseHandler<IGetSoftCopyDocumentsQuery, IGetSoftCopyDocumentsRequest>(
      GQL_QUERIES.listSoftCopyDocuments,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "listSoftcopyDocuments" in data === false) {
      throw data;
    }

    return data.listSoftcopyDocuments;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getSoftCopyDocuments at GetSoftCopyDocuments.ts", error);
    return error;
  }
};
