import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const submitProofOfPayments = async (variables: ISubmitProofOfPaymentsRequest, handleError?: ResponseErrorType) => {
  try {
    const data = await gqlOperation<ISubmitProofOfPaymentsMutation, ISubmitProofOfPaymentsRequest>(
      GQL_MUTATIONS.submitProofOfPayments,
      variables,
      undefined,
      handleError,
    );
    return data?.submitProofOfPayments;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in submitProofOfPayments line 15 at SubmitProofOfPayments.ts", error);
    return error;
  }
};
