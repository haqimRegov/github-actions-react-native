import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const submitProofOfPayments = async (
  variables: ISubmitProofOfPaymentsRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<ISubmitProofOfPaymentsMutation, ISubmitProofOfPaymentsRequest>(
      GQL_MUTATIONS.submitProofOfPayments,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "submitProofOfPayments" in data === false) {
      throw data;
    }

    return data.submitProofOfPayments;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in submitProofOfPayments at SubmitProofOfPayments.ts", error);
    return error;
  }
};
