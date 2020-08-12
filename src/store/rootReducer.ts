import { combineReducers } from "redux";

import { clientReducer } from "./Client";
import { onboardingStepsReducer } from "./OnboardingSteps";
import { riskAssessmentReducer } from "./RiskAssessment";

export const rootReducer = combineReducers({
  client: clientReducer,
  onboardingSteps: onboardingStepsReducer,
  riskAssessment: riskAssessmentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
