import { combineReducers } from "redux";

import { orderSummaryReducer } from "./Acknowledgement";
import { clientReducer } from "./Client";
import { globalReducer } from "./Global";
import { onboardingStepsReducer } from "./OnboardingSteps";
import { personalInfoReducer } from "./PersonalInfo";
import { productsReducer } from "./Products";
import { riskAssessmentReducer } from "./RiskAssessment";
import { selectedFundReducer } from "./SelectedFund";
import { transactionsReducer } from "./Transactions";

export const rootReducer = combineReducers({
  client: clientReducer,
  global: globalReducer,
  onboardingSteps: onboardingStepsReducer,
  orderSummary: orderSummaryReducer,
  personalInfo: personalInfoReducer,
  products: productsReducer,
  riskAssessment: riskAssessmentReducer,
  selectedFund: selectedFundReducer,
  transactions: transactionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
