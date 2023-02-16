import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getAllBanksInAccount = async (
  variables: IGetAllBanksRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IGetAllBanksQuery, IGetAllBanksRequest>(
      GQL_QUERIES.getAllBanks,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "getAllBanksInAccount" in data === false) {
      throw data;
    }

    return data.getAllBanksInAccount;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getAllBanksInAccount at getAllBanks.ts", error);
    return error;
  }
};
