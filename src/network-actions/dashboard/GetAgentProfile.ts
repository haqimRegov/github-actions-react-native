import { GQL_QUERIES } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const getAgentProfile = async (variables: IGetAgentProfileRequest, handleError?: ResponseErrorType) => {
  try {
    const data: IGetAgentProfileQuery = await gqlOperation<IGetAgentProfileQuery, IGetAgentProfileRequest>(
      GQL_QUERIES.getAgentProfile,
      variables,
      undefined,
      handleError,
    );
    return data.agentProfile;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getAgentProfile at GetAgentProfile.ts", error);
    return error;
  }
};
