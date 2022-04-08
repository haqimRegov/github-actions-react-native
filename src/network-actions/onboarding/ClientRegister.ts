import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const clientRegister = async (
  variables: IClientRegisterRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IClientRegisterMutation, IClientRegisterRequest>(
      GQL_MUTATIONS.clientRegister,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "clientRegisterV2" in data === false) {
      throw data;
    }

    return data.clientRegisterV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in clientRegister at ClientRegister.ts", error);
    return error;
  }
};
