import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getDashboard = async (
  variables: IDashboardRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IDashboardQuery = await responseHandler<IDashboardQuery, IDashboardRequest>(
      GQL_QUERIES.dashboard,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "agentDashboardV2" in data === false) {
      throw data;
    }

    return data.agentDashboardV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in agentDashboardV2 at Dashboard.ts", error);
    return error;
  }
};
