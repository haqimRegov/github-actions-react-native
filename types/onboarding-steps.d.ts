declare interface IContentItem {
  route: TypeOnboardingRoute;
  title: string;
}

declare interface IOnboarding {
  content?: IContentItem[];
  label: string;
  route?: TypeOnboardingRoute;
}

declare interface OnboardingContentProps {
  finishedSteps: TypeOnboardingRoute[];
  handleNextStep: (route: TypeOnboardingRoute) => void;
  navigation: IStackNavigationProp;
  route: string;
  setFinishedSteps: (route: TypeOnboardingRoute[]) => void;
}
declare interface OnboardingStepsContentProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

declare interface OnboardingStepsProps {
  activeContent?: IContentItem | IOnboarding;
  activeSection: number;
  disableNextSteps?: boolean;
  finishedSteps?: TypeOnboardingRoute[];
  handleContentChange: (item: IContentItem | IOnboarding) => void;
  RenderContent: (props: OnboardingStepsContentProps) => JSX.Element;
  setActiveContent: (content: IContentItem | IOnboarding) => void;
  setActiveSection: (section: any) => void;
  setFinishedStep: (step: TypeOnboardingRoute[]) => void;
  steps: IOnboarding[];
}

declare type TypeOnboardingRoute =
  | "Declaration"
  | "EmailVerification"
  | "EmploymentDetails"
  | "IdentityVerification"
  | "OrderSummary"
  | "Payment"
  | "PersonalDetails"
  | "ProductRecommendation"
  | "Questionnaire"
  | "Summary"
  | "TermsAndConditions";

declare interface IOnboardingRoutes {
  Declaration: TypeOnboardingRoute;
  EmailVerification: TypeOnboardingRoute;
  EmploymentDetails: TypeOnboardingRoute;
  IdentityVerification: TypeOnboardingRoute;
  OrderSummary: TypeOnboardingRoute;
  Payment: TypeOnboardingRoute;
  PersonalDetails: TypeOnboardingRoute;
  ProductRecommendation: TypeOnboardingRoute;
  Questionnaire: TypeOnboardingRoute;
  Summary: TypeOnboardingRoute;
  TermsAndConditions: TypeOnboardingRoute;
}
