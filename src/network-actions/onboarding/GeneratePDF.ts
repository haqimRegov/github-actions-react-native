import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const generatePdf = async (variables: IGeneratePdfRequest, navigation: IStackNavigationProp, handleError?: ResponseErrorType) => {
  try {
    const data = await responseHandler<IGeneratePdfMutation, IGeneratePdfRequest>(
      GQL_MUTATIONS.generatePdf,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "generatePdf" in data === false) {
      throw data;
    }

    return data.generatePdf;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in generatePdf at GeneratePdf.ts", error);
    return error;
  }
};
