import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const updateInbox = async (
  variables: IUpdateInboxRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IUpdateInboxQuery = await responseHandler<IUpdateInboxQuery, IUpdateInboxRequest>(
      GQL_MUTATIONS.updateInbox,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "updateInbox" in data === false) {
      throw data;
    }

    return data.updateInbox;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in updateInbox at UpdateInbox.ts", error);
    return error;
  }
};
