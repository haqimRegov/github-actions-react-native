import { GQL_MUTATIONS } from "../../integrations";
import { gqlOperation } from "../../integrations/graphql/functions";

export const getRiskProfile = async (variables: IGetRiskProfileRequest, handleError?: ResponseErrorType) => {
  try {
    const data = await gqlOperation<IGetRiskProfileMutation, IGetRiskProfileRequest>(
      GQL_MUTATIONS.riskAssessment,
      variables,
      undefined,
      handleError,
    );
    return data?.riskAssessment;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getRiskProfile line 15 at GetRiskProfile.ts", error);
    return error;
  }
};
