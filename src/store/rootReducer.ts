import { combineReducers } from "redux";

import { orderSummaryReducer } from "./Acknowledgement";
import { clientReducer } from "./Client";
import { onboardingStepsReducer } from "./OnboardingSteps";
import { personalInfoReducer } from "./PersonalInfo";
import { productsReducer } from "./Products";
import { riskAssessmentReducer } from "./RiskAssessment";
import { selectedFundReducer } from "./SelectedFund";

export const rootReducer = combineReducers({
  client: clientReducer,
  onboardingSteps: onboardingStepsReducer,
  personalInfo: personalInfoReducer,
  products: productsReducer,
  riskAssessment: riskAssessmentReducer,
  selectedFund: selectedFundReducer,
  orderSummary: orderSummaryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
