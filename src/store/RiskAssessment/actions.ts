import { typedAction } from "../actionCreator";

export const addAssessmentQuestions = (answers: IRiskAssessmentQuestions) => {
  return typedAction("riskAssessment/ADD_ANSWERS", answers);
};

export const addRiskScore = (riskScore: IRiskScore) => {
  return typedAction("riskAssessment/ADD_SCORE", riskScore);
};

export const resetQuestionnaire = () => {
  return typedAction("riskAssessment/RESET_QUESTIONNAIRE");
};

export const resetRiskAssessment = () => {
  return typedAction("riskAssessment/RESET_RISK_ASSESSMENT");
};

export const updateIsRiskUpdated = (toggle: boolean) => {
  return typedAction("riskAssessment/UPDATE_IS_RISK_UPDATED", toggle);
};

export type RiskAssessmentAction = ReturnType<
  typeof addAssessmentQuestions | typeof addRiskScore | typeof resetQuestionnaire | typeof resetRiskAssessment | typeof updateIsRiskUpdated
>;

export const RiskAssessmentActionProps = {
  addAssessmentQuestions,
  addRiskScore,
  resetQuestionnaire,
  resetRiskAssessment,
  updateIsRiskUpdated,
};

export type RiskAssessmentActionsType = typeof RiskAssessmentActionProps;
