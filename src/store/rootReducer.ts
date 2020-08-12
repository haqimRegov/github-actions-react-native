import { combineReducers } from "redux";

import { clientReducer } from "./Client";
import { onboardingReducer } from "./Onboarding";
import { onboardingStepsReducer } from "./OnboardingSteps";

export const rootReducer = combineReducers({
  client: clientReducer,
  onboarding: onboardingReducer,
  onboardingSteps: onboardingStepsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
