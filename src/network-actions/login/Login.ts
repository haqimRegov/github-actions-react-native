import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils/ResponseHandler";

export const login = async (variables: ILoginRequest, headers: ILoginHeader, handleLoading?: (loading: boolean) => void) => {
  try {
    const data: ILoginMutation = await responseHandler<ILoginMutation, ILoginRequest>(
      GQL_MUTATIONS.userLogin,
      variables,
      headers,
      undefined,
      undefined,
      handleLoading,
      false,
    );

    if (data === undefined || "userLogin" in data === false) {
      throw data;
    }

    return data.userLogin;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in login at Login.ts", error);

    return error;
  }
};
