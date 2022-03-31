import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const registerPassword = async (variables: ISignUpRequest, headers: ISignUpHeader, handleLoading?: (loading: boolean) => void) => {
  try {
    const data = await responseHandler<ISignUpMutation, ISignUpRequest>(
      GQL_MUTATIONS.registerPassword,
      variables,
      headers,
      undefined,
      undefined,
      handleLoading,
      false,
    );

    if (data === undefined || "signUp" in data === false) {
      throw data;
    }

    return data.signUp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in registerPassword at Password.ts", error);
    return error;
  }
};
