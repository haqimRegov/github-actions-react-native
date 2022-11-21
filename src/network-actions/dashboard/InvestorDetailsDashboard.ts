import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getInvestorDetailsDashboard = async (
  variables: IInvestorDetailsDashboardRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IInvestorDetailsDashboardQuery = await responseHandler<IInvestorDetailsDashboardQuery, IInvestorDetailsDashboardRequest>(
      GQL_QUERIES.investorDetailsDashboard,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "investorDetailsDashboard" in data === false) {
      throw data;
    }

    return data.investorDetailsDashboard;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getInvestorDashboard at InvestorDashboard.ts", error);
    return error;
  }
};
