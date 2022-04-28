import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const orderTrackingSummary = async (
  variables: IOrderTrackingSummaryRequest,
  navigation?: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IOrderTrackingSummaryQuery = await responseHandler<IOrderTrackingSummaryQuery, IOrderTrackingSummaryRequest>(
      GQL_MUTATIONS.orderTrackingSummary,
      variables,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "generateOrderTrackingSummary" in data === false) {
      throw data;
    }

    return data.generateOrderTrackingSummary;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in orderTrackingSummary at OrderTrackingSummary.ts", error);
    return error;
  }
};
