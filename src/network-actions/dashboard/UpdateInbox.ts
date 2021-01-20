import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const updateInbox = async (variables: IUpdateInboxRequest, handleError?: ResponseErrorType) => {
  try {
    const data: IUpdateInboxQuery = await gqlOperation<IUpdateInboxQuery, IUpdateInboxRequest>(
      GQL_MUTATIONS.updateInbox,
      variables,
      undefined,
      handleError,
    );
    return data.updateInbox;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in updateInbox at UpdateInbox.ts", error);
    return error;
  }
};
