import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getSoftCopyDocuments = async (
  variables: IGetSoftCopyDocumentsRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IGetSoftCopyDocumentsQuery = await responseHandler<IGetSoftCopyDocumentsQuery, IGetSoftCopyDocumentsRequest>(
      GQL_QUERIES.listSoftCopyDocuments,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "listSoftcopyDocumentsV2" in data === false) {
      throw data;
    }

    return data.listSoftcopyDocumentsV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getSoftCopyDocuments at GetSoftCopyDocuments.ts", error);
    return error;
  }
};
