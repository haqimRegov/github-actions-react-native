import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getHardCopyDocuments = async (
  variables: IGetHardCopyDocumentsRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IGetHardCopyDocumentsQuery = await responseHandler<IGetHardCopyDocumentsQuery, IGetHardCopyDocumentsRequest>(
      GQL_QUERIES.listHardCopyDocuments,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "listHardcopyDocumentsV2" in data === false) {
      throw data;
    }

    return data.listHardcopyDocumentsV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getHardCopyDocuments at GetHardCopyDocuments.ts", error);
    return error;
  }
};
