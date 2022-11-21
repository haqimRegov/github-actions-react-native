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
      GQL_MUTATIONS.expiredPassword,
      variables,
      headers,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "expiredChangePassword" in data === false) {
      throw data;
    }

    return data.expiredChangePassword;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in expiredPassword at ExpiredPassword.ts", error);
    return error;
  }
};
