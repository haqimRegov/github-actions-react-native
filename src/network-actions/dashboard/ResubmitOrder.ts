import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const resubmitOrder = async (variables: IResubmitOrderRequest, handleError?: ResponseErrorType) => {
  try {
    const data: IResubmitOrderMutation = await gqlOperation<IResubmitOrderMutation, IResubmitOrderRequest>(
      GQL_MUTATIONS.resubmitOrder,
      variables,
      undefined,
      handleError,
    );
    return data.resubmitOrder;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in resubmitOrder at ResubmitOrder.ts", error);
    return error;
  }
};
