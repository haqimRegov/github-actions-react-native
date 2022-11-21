import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const changePassword = async (
  variables: IChangePasswordRequest,
  headers: IChangePasswordHeader,
  navigation?: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IChangePasswordQuery = await responseHandler<IChangePasswordQuery, IChangePasswordRequest>(
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

    return data.changePasswordV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in changePassword at ChangePassword.ts", error);
    return error;
  }
};
