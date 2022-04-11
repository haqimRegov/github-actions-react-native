import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const emailOtpVerification = async (
  variables: IEmailOtpVerificationRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IEmailOtpVerificationMutation, IEmailOtpVerificationRequest>(
      GQL_MUTATIONS.emailOtpVerification,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "emailOtpVerificationV2" in data === false) {
      throw data;
    }

    return data.emailOtpVerificationV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in emailOtpVerificationV2 at EmailOTPVerification.ts", error);
    return error;
  }
};
