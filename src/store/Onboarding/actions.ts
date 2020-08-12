import { Dispatch } from "react";
import { AnyAction } from "redux";

import { SAMPLE_RISK_ASSESSMENT } from "../../mocks";
import { typedAction } from "../actionCreator";

export const addAssessmentQuestions = (answers: IRiskAssessmentQuestions) => {
  return typedAction("onboarding/ADD_QUESTIONS", answers);
};

const addRiskAssessment = (riskAssessment: IRiskScore) => {
  return typedAction("onboarding/ADD_ASSESSMENT", riskAssessment);
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
        dispatch(addRiskAssessment(results));
      }
    }, 50);
  };
};

export const resetRiskAssessment = () => {
  return typedAction("client/RESET_ASSESSMENT");
};

export const resetQuestionnaire = () => {
  return typedAction("client/RESET_QUESTIONNAIRE");
};

export type OnboardingAction = ReturnType<
  typeof addAssessmentQuestions | typeof addRiskAssessment | typeof resetRiskAssessment | typeof resetQuestionnaire
>;
