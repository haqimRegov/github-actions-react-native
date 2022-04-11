import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitPdf = async (
  variables: ISubmitPdfRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<ISubmitPdfMutation, ISubmitPdfRequest>(
      GQL_MUTATIONS.submitPdf,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "submitPdfV2" in data === false) {
      throw data;
    }

    return data.submitPdfV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in submitPdfV2 at SubmitPDF.ts", error);
    return error;
  }
};
