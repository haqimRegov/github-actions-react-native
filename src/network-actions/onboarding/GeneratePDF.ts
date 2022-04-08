import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const generatePdf = async (
  variables: IGeneratePdfRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IGeneratePdfMutation, IGeneratePdfRequest>(
      GQL_MUTATIONS.generatePdf,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "generatePdfV2" in data === false) {
      throw data;
    }

    return data.generatePdfV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in generatePdfV2 at GeneratePdf.ts", error);
    return error;
  }
};
