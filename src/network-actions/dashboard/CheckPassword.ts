import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const checkPassword = async (
  variables: ICheckPasswordRequest,
  headers: ICheckPasswordHeader,
  navigation?: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: ICheckPasswordQuery = await responseHandler<ICheckPasswordQuery, ICheckPasswordRequest>(
      GQL_QUERIES.checkPassword,
      variables,
      headers,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "checkPassword" in data === false) {
      throw data;
    }

    return data.checkPassword;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in changePassword at ChangePassword.ts", error);
    return error;
  }
};
