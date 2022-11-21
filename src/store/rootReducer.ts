import { combineReducers } from "redux";

import { acknowledgementReducer } from "./Acknowledgement";
import { clientReducer } from "./Client";
import { eddReducer } from "./EDD";
import { forceUpdateReducer } from "./ForceUpdate";
import { globalReducer } from "./Global";
import { investorsReducer } from "./Investors";
import { newSalesReducer } from "./NewSales";
import { onboardingReducer } from "./Onboarding";
import { personalInfoReducer } from "./PersonalInfo";
import { productsReducer } from "./Products";
import { riskAssessmentReducer } from "./RiskAssessment";
import { selectedFundReducer } from "./SelectedFund";
import { transactionsReducer } from "./Transactions";

export const rootReducer = combineReducers({
  acknowledgement: acknowledgementReducer,
  client: clientReducer,
  forceUpdate: forceUpdateReducer,
  edd: eddReducer,
  global: globalReducer,
  investors: investorsReducer,
  newSales: newSalesReducer,
  onboarding: onboardingReducer,
  personalInfo: personalInfoReducer,
  products: productsReducer,
  riskAssessment: riskAssessmentReducer,
  selectedFund: selectedFundReducer,
  transactions: transactionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
