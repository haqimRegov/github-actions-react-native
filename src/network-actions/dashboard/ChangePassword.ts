import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const changePassword = async (
  variables: IChangePasswordRequest,
  headers: IChangePasswordHeader,
  navigation?: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IChangePasswordQuery = await responseHandler<IChangePasswordQuery, IChangePasswordRequest>(
      GQL_MUTATIONS.changePassword,
      variables,
      headers,
      navigation,
      handleError,
    );

    if (data === undefined || "changePassword" in data === false) {
      throw data;
    }

    return data.changePassword;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in changePassword at ChangePassword.ts", error);
    return error;
  }
};
