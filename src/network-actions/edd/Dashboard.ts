import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getEDDDashboard = async (
  variables: IEDDDashboardRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IEDDDashboardQuery = await responseHandler<IEDDDashboardQuery, IEDDDashboardRequest>(
      GQL_QUERIES.eddDashboard,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "eddDashboardV2" in data === false) {
      throw data;
    }

    return data.eddDashboardV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getEDDDashboard at Dashboard.ts", error);
    return error;
  }
};
