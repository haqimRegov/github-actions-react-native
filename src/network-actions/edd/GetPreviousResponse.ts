import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getPreviousResponse = async (
  variables: IPreviousResponseRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IPreviousResponseQuery = await responseHandler<IPreviousResponseQuery, IPreviousResponseRequest>(
      GQL_QUERIES.previousResponse,
      variables,
      undefined,
      navigation,
      handleError,
    );
    if (data === undefined || "previousResponse" in data === false) {
      throw data;
    }

    return data.previousResponse;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getPreviousResponse at GetPreviousResponse.ts", error);
    return error;
  }
};
