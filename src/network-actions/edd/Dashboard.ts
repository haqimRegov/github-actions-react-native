import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getEDDDashboard = async (
  variables: IEDDDashboardRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IEDDDashboardQuery = await responseHandler<IEDDDashboardQuery, IEDDDashboardRequest>(
      GQL_QUERIES.eddDashboard,
      variables,
      undefined,
      navigation,
      handleError,
    );
    if (data === undefined || "eddDashboard" in data === false) {
      throw data;
    }

    return data.eddDashboard;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getEDDDashboard at Dashboard.ts", error);
    return error;
  }
};
