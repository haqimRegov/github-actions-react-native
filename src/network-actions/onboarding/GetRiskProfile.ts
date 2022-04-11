import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const getRiskProfile = async (
  variables: IGetRiskProfileRequest,
  navigation: IStackNavigationProp,
  handleLoading?: (loading: boolean) => void,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IGetRiskProfileMutation, IGetRiskProfileRequest>(
      GQL_MUTATIONS.riskAssessment,
      variables,
      undefined,
      navigation,
      handleError,
      handleLoading,
    );

    if (data === undefined || "riskAssessmentV2" in data === false) {
      throw data;
    }

    return data.riskAssessmentV2;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Error in getRiskProfile at GetRiskProfile.ts", error);
    return error;
  }
};
