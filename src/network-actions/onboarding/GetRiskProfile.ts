import { GQL_MUTATIONS } from "../../integrations";
import { responseHandler } from "../../utils";

export const getRiskProfile = async (
  variables: IGetRiskProfileRequest,
  navigation: IStackNavigationProp,
  handleError?: ResponseErrorType,
) => {
  try {
    const data = await responseHandler<IGetRiskProfileMutation, IGetRiskProfileRequest>(
      GQL_MUTATIONS.riskAssessment,
      variables,
      undefined,
      navigation,
      handleError,
    );

    if (data === undefined || "riskAssessment" in data === false) {
      throw data;
    }

    return data.riskAssessment;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getRiskProfile at GetRiskProfile.ts", error);
    return error;
  }
};
