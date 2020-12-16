import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const emailOtpVerification = async (variables: IEmailOtpVerificationRequest, handleError?: ResponseErrorType) => {
  try {
    const data = await gqlOperation<IEmailOtpVerificationMutation, IEmailOtpVerificationRequest>(
      GQL_MUTATIONS.emailOtpVerification,
      variables,
      undefined,
      handleError,
    );
    return data.emailOtpVerification;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in emailOtpVerification line 15 at EmailOTPVerification.ts", error);
    return error;
  }
};
