import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const updateSeen = async (
  variables: IUpdateSeenRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IUpdateSeenQuery = await responseHandler<IUpdateSeenQuery, IUpdateSeenRequest>(
      GQL_MUTATIONS.updateSeen,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "updateSeen" in data === false) {
      throw data;
    }

    return data.updateSeen;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in updateSeen at UpdateSeen.ts", error);
    return error;
  }
};
