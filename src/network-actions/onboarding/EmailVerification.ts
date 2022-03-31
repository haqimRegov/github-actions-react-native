import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const emailVerification = async (
  variables: IEmailVerificationRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IEmailVerificationMutation, IEmailVerificationRequest>(
      GQL_MUTATIONS.emailVerification,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "emailVerification" in data === false) {
      throw data;
    }

    return data.emailVerification;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in emailVerification at EmailVerification.ts", error);
    return error;
  }
};
