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

    if (data === undefined || "emailVerificationV2" in data === false) {
      throw data;
    }

    return data.emailVerificationV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in emailVerificationV2 at EmailVerification.ts", error);
    return error;
  }
};
