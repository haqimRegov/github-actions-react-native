import { GQL_QUERIES } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const getInbox = async (variables: IGetInboxRequest, handleError?: ResponseErrorType) => {
  try {
    const data: IGetInboxQuery = await gqlOperation<IGetInboxQuery, IGetInboxRequest>(
      GQL_QUERIES.getInbox,
      variables,
      undefined,
      handleError,
    );
    return data.getInbox;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getInbox at GetInbox.ts", error);
    return error;
  }
};
