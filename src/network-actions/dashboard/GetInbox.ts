import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getInbox = async (variables: IGetInboxRequest, navigation: IStackNavigationProp, handleError?: ResponseErrorType) => {
  try {
    const data: IGetInboxQuery = await responseHandler<IGetInboxQuery, IGetInboxRequest>(
      GQL_QUERIES.getInbox,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "getInbox" in data === false) {
      throw data;
    }

    return data.getInbox;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getInbox at GetInbox.ts", error);
    return error;
  }
};
