import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitPdf = async (variables: ISubmitPdfRequest, navigation: IStackNavigationProp, handleError?: ResponseErrorType) => {
  try {
    const data = await responseHandler<ISubmitPdfMutation, ISubmitPdfRequest>(
      GQL_MUTATIONS.submitPdf,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "submitPdf" in data === false) {
      throw data;
    }

    return data.submitPdf;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in submitPdf at SubmitPDF.ts", error);
    return error;
  }
};
