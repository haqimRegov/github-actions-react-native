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
          questionTwo: 0,
          questionThree: 0,
          questionFour: 0,
          questionFive: 0,
          questionSix: 0,
          questionSeven: 0,
          questionEight: 0,
          questionNine: -1,
        },
      };
    case "riskAssessment/RESET_RISK_ASSESSMENT":
      return {
        questionnaire: {
          questionTwo: 0,
          questionThree: 0,
          questionFour: 0,
          questionFive: 0,
          questionSix: 0,
          questionSeven: 0,
          questionEight: 0,
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
      };

    default:
      return state;
  }
}
