import { RiskAssessmentAction } from "./actions";
import { riskAssessmentInitialState, RiskAssessmentState } from "./state";

export function riskAssessmentReducer(state = riskAssessmentInitialState, action: RiskAssessmentAction): RiskAssessmentState {
  switch (action.type) {
    case "riskAssessment/ADD_ANSWERS":
      return {
        ...state,
        questionnaire: { ...state.questionnaire, ...action.payload },
      };
    case "riskAssessment/ADD_SCORE":
      return {
        ...state,
        riskScore: { ...state.riskScore, ...action.payload },
      };
    case "riskAssessment/RESET_QUESTIONNAIRE":
      return {
        ...state,
        questionnaire: { ...riskAssessmentInitialState.questionnaire },
      };
    case "riskAssessment/RESET_RISK_ASSESSMENT":
      return {
        ...riskAssessmentInitialState,
      };

    default:
      return state;
  }
}
