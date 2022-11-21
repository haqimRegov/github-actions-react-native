import { GQL_QUERIES } from "../../integrations";
import { responseHandler } from "../../utils";

export const getEDDNewCase = async (
  variables: IEDDNewCaseRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data: IEDDNewCaseQuery = await responseHandler<IEDDNewCaseQuery, IEDDNewCaseRequest>(
      GQL_QUERIES.eddCaseQuestions,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );
    if (data === undefined || "caseQuestions" in data === false) {
      throw data;
    }

    return data.caseQuestions;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getEDDNewCase at GetNewCase.ts", error);
    return error;
  }
};
