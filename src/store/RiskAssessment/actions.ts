import { Dispatch } from "react";
import { AnyAction } from "redux";

import { SAMPLE_RISK_ASSESSMENT } from "../../mocks";
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

// Action creator returning a thunk!
export const getRiskAssessment = (questionnaire: IRiskAssessmentQuestions) => {
  return (dispatch: Dispatch<AnyAction>) => {
    // TODO integration
    // Pretend to load an item
    setTimeout(() => {
      if (questionnaire) {
        // TODO
      }
      const results = SAMPLE_RISK_ASSESSMENT;
      if (results) {
        dispatch(addRiskScore(results));
      }
    }, 50);
  };
};

export type RiskAssessmentAction = ReturnType<
  typeof addAssessmentQuestions | typeof addRiskScore | typeof resetQuestionnaire | typeof resetRiskAssessment
>;
