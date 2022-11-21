import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const checkClient = async (
  variables: IEtbCheckRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IEtbCheckQuery = await responseHandler<IEtbCheckQuery, IEtbCheckRequest>(
      GQL_QUERIES.etbCheck,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "etbCheckV2" in data === false) {
      throw data;
    }

    return data.etbCheckV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in checkClient at ETBCheck.ts", error);
    return error;
  }
};
