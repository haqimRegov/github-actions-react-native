import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getCaseResponse = async (
  variables: ICaseResponseRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: ICaseResponseQuery = await responseHandler<ICaseResponseQuery, ICaseResponseRequest>(
      GQL_QUERIES.caseResponse,
      variables,
      undefined,
      navigation,
      handleError,
    );
    if (data === undefined || "caseResponse" in data === false) {
      throw data;
    }

    return data.caseResponse;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getCaseResponse at GetCaseResponse.ts", error);
    return error;
  }
};
