import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const submitPdf = async (variables: ISubmitPdfRequest, handleError?: ResponseErrorType) => {
  try {
    const data = await gqlOperation<ISubmitPdfMutation, ISubmitPdfRequest>(GQL_MUTATIONS.submitPdf, variables, undefined, handleError);
    return data?.submitPdf;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in submitPdf line 15 at SubmitPDF.ts", error);
    return error;
  }
};
