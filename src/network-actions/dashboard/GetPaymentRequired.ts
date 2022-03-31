import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getPaymentRequired = async (
  variables: IGetPaymentRequiredRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IGetPaymentRequiredQuery = await responseHandler<IGetPaymentRequiredQuery, IGetPaymentRequiredRequest>(
      GQL_QUERIES.listPaymentRequired,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "listPaymentRequired" in data === false) {
      throw data;
    }

    return data.listPaymentRequired;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getPaymentRequired at GetPaymentRequired.ts", error);
    return error;
  }
};
