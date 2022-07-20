import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getEtbAccountList = async (
  variables: IEtbAccountListRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IEtbAccountListQuery, IEtbAccountListRequest>(
      GQL_QUERIES.etbAccountList,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "etbAccountList" in data === false) {
      throw data;
    }

    return data.etbAccountList;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in etbAccountList at getEtbAccountList.ts", error);
    return error;
  }
};
