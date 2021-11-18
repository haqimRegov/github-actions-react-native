import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const resubmitOrder = async (
  variables: IResubmitOrderRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IResubmitOrderMutation = await responseHandler<IResubmitOrderMutation, IResubmitOrderRequest>(
      GQL_MUTATIONS.resubmitOrder,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "resubmitOrder" in data === false) {
      throw data;
    }

    return data.resubmitOrder;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in resubmitOrder at ResubmitOrder.ts", error);
    return error;
  }
};
