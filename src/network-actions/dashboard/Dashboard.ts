import { GQL_QUERIES } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const getDashboard = async (variables: IDashboardRequest, handleError?: ResponseErrorType) => {
  try {
    const data: IDashboardQuery = await gqlOperation<IDashboardQuery, IDashboardRequest>(
      GQL_QUERIES.dashboard,
      variables,
      undefined,
      handleError,
    );
    return data.dashboard;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getDashboard at Dashboard.ts", error);
    return error;
  }
};
