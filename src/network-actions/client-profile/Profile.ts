import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getClientProfile = async (
  variables: IClientProfileRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IClientProfileQuery = await responseHandler<IClientProfileQuery, IClientProfileRequest>(
      GQL_QUERIES.clientProfile,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "clientProfile" in data === false) {
      throw data;
    }

    return data.clientProfile;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in clientProfile at Profile.ts", error);
    return error;
  }
};
