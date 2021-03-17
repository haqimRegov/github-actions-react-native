import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getAgentProfile = async (
  variables: IGetAgentProfileRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IGetAgentProfileQuery = await responseHandler<IGetAgentProfileQuery, IGetAgentProfileRequest>(
      GQL_QUERIES.getAgentProfile,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "agentProfile" in data === false) {
      throw data;
    }

    return data.agentProfile;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getAgentProfile at GetAgentProfile.ts", error);
    return error;
  }
};
