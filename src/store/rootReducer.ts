import { combineReducers } from "redux";

import { clientReducer } from "./Client";
import { onboardingStepsReducer } from "./OnboardingSteps";
import { riskAssessmentReducer } from "./RiskAssessment";
import { selectedFundReducer } from "./SelectedFund";

export const rootReducer = combineReducers({
  client: clientReducer,
  onboardingSteps: onboardingStepsReducer,
  riskAssessment: riskAssessmentReducer,
  selectedFund: selectedFundReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
