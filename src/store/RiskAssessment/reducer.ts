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
        questionnaire: {
          questionTwo: -1,
          questionThree: 0,
          questionFour: -1,
          questionFive: -1,
          questionSix: -1,
          questionSeven: 0,
          questionEight: -1,
          questionNine: -1,
        },
      };
    case "riskAssessment/RESET_RISK_ASSESSMENT":
      return {
        questionnaire: {
          questionTwo: -1,
          questionThree: 0,
          questionFour: -1,
          questionFive: -1,
          questionSix: -1,
          questionSeven: 0,
          questionEight: -1,
          questionNine: -1,
        },
        riskScore: {
          appetite: "",
          profile: "",
          rangeOfReturn: "",
          fundSuggestion: "",
          netWorth: "",
          type: "",
        },
        isRiskUpdated: false,
      };
    case "riskAssessment/UPDATE_IS_RISK_UPDATED":
      return {
        ...state,
        isRiskUpdated: action.payload,
      };

    default:
      return state;
  }
}
