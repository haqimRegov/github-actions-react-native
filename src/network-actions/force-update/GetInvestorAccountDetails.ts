import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getInvestorAccountDetails = async (
  variables: IInvestorAccountDetailsRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IInvestorAccountDetailsQuery, IInvestorAccountDetailsRequest>(
      GQL_QUERIES.investorAccountDetails,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "investorAccountDetails" in data === false) {
      throw data;
    }

    return data.investorAccountDetails;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in investorAccountDetails at GetInvestorAccountDetails.ts", error);
    return error;
  }
};
