import { SAMPLE_RISK_ASSESSMENT } from "../../mocks";
import { RiskAssessmentActionsType } from "../../store";

export const getRiskScore = (actionProps: RiskAssessmentActionsType, params: IRiskAssessmentQuestions) => {
  // TODO integration
  // eslint-disable-next-line no-console
  console.log(params);
  // Pretend fetch
  const results = SAMPLE_RISK_ASSESSMENT;

  actionProps.addRiskScore(results);
};
