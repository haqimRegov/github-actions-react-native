import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const expiredPassword = async (
  variables: IExpiredPasswordRequest,
  headers: IExpiredPasswordHeader,
  navigation?: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IExpiredPasswordQuery = await responseHandler<IExpiredPasswordQuery, IExpiredPasswordRequest>(
      GQL_MUTATIONS.changePassword,
      variables,
      headers,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "changePasswordV2" in data === false) {
      throw data;
    }

    return data.changePassword;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in changePassword at ChangePassword.ts", error);
    return error;
  }
};
