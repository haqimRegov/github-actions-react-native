import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const registerPassword = async (variables: ISignUpRequest, headers: ISignUpHeader) => {
  try {
    const data = await responseHandler<ISignUpMutation, ISignUpRequest>(
      GQL_MUTATIONS.registerPassword,
      variables,
      headers,
      undefined,
      undefined,
      false,
    );

    if (data === undefined || "signUp" in data === false) {
      throw data;
    }

    return data.signUp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in registerPassword at Password.ts", error);
    return error;
  }
};
