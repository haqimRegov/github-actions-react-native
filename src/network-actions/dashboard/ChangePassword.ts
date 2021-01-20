import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const changePassword = async (
  variables: IChangePasswordRequest,
  headers: IChangePasswordHeader,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IChangePasswordQuery = await gqlOperation<IChangePasswordQuery, IChangePasswordRequest>(
      GQL_MUTATIONS.changePassword,
      variables,
      headers,
      handleError,
    );
    return data.changePassword;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in changePassword at ChangePassword.ts", error);
    return error;
  }
};
