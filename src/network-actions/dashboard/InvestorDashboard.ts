import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getInvestorDashboard = async (
  variables: IInvestorDashboardRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IInvestorDashboardQuery = await responseHandler<IInvestorDashboardQuery, IInvestorDashboardRequest>(
      GQL_QUERIES.investorDashboard,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "investorDashboard" in data === false) {
      throw data;
    }

    return data.investorDashboard;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getInvestorDashboard at InvestorDashboard.ts", error);
    return error;
  }
};
