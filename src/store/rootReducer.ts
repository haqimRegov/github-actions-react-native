import { combineReducers } from "redux";

import { acknowledgementReducer } from "./Acknowledgement";
import { clientReducer } from "./Client";
import { globalReducer } from "./Global";
import { onboardingReducer } from "./Onboarding";
import { onboardingPaymentReducer } from "./OnboardingPayment";
import { personalInfoReducer } from "./PersonalInfo";
import { productsReducer } from "./Products";
import { riskAssessmentReducer } from "./RiskAssessment";
import { selectedFundReducer } from "./SelectedFund";
import { transactionsReducer } from "./Transactions";

export const rootReducer = combineReducers({
  acknowledgement: acknowledgementReducer,
  client: clientReducer,
  global: globalReducer,
  onboarding: onboardingReducer,
  onboardingPayment: onboardingPaymentReducer,
  personalInfo: personalInfoReducer,
  products: productsReducer,
  riskAssessment: riskAssessmentReducer,
  selectedFund: selectedFundReducer,
  transactions: transactionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
