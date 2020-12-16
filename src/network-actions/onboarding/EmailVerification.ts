import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const emailVerification = async (variables: IEmailVerificationRequest, handleError?: ResponseErrorType) => {
  try {
    const data = await gqlOperation<IEmailVerificationMutation, IEmailVerificationRequest>(
      GQL_MUTATIONS.emailVerification,
      variables,
      undefined,
      handleError,
    );
    return data.emailVerification;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in emailVerification line 15 at EmailVerification.ts", error);
    return error;
  }
};
