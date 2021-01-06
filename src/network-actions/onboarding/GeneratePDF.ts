import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const generatePdf = async (variables: IGeneratePdfRequest, handleError?: ResponseErrorType) => {
  try {
    const data = await gqlOperation<IGeneratePdfMutation, IGeneratePdfRequest>(
      GQL_MUTATIONS.generatePdf,
      variables,
      undefined,
      handleError,
    );
    return data?.generatePdf;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in generatePdf line 15 at GeneratePdf.ts", error);
    return error;
  }
};
