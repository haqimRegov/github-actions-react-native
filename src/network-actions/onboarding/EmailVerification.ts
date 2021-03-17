import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const emailVerification = async (
  variables: IEmailVerificationRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IEmailVerificationMutation, IEmailVerificationRequest>(
      GQL_MUTATIONS.emailVerification,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "emailVerification" in data === false) {
      throw data;
    }

    return data.emailVerification;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in emailVerification at EmailVerification.ts", error);
    return error;
  }
};
