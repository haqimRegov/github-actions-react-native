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
  return typedAction("riskAssessment/RESET_SCORE");
};

export type RiskAssessmentAction = ReturnType<
  typeof addAssessmentQuestions | typeof addRiskScore | typeof resetQuestionnaire | typeof resetRiskAssessment
>;

export const RiskAssessmentActionProps = {
  addAssessmentQuestions,
  addRiskScore,
  resetQuestionnaire,
  resetRiskAssessment,
};

export type RiskAssessmentActionsType = typeof RiskAssessmentActionProps;
