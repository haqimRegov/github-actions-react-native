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
  handleCancelOnboarding?: () => void;
  handleNextStep: (route: TypeOnboardingRoute) => void;
  setFinishedSteps: (route: TypeOnboardingRoute[]) => void;
}

declare interface OnboardingProps extends OnboardingContentProps {
  navigation: IStackNavigationProp;
  resetClientDetails: () => void;
  resetPersonalInfo: () => void;
  route: string;
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
  | "CRSDeclaration"
  | "DeclarationSummary"
  | "EmailVerification"
  | "EmploymentDetails"
  | "FATCADeclaration"
  | "FEADeclaration"
  | "IdentityVerification"
  | "OrderSummary"
  | "Payment"
  | "PersonalDetails"
  | "ProductRecommendation"
  | "RiskAssessment"
  | "PersonalDetailsSummary"
  | "TermsAndConditions";

declare interface IOnboardingRoutes {
  CRSDeclaration: TypeOnboardingRoute;
  DeclarationSummary: TypeOnboardingRoute;
  EmailVerification: TypeOnboardingRoute;
  EmploymentDetails: TypeOnboardingRoute;
  FATCADeclaration: TypeOnboardingRoute;
  FEADeclarations: TypeOnboardingRoute;
  IdentityVerification: TypeOnboardingRoute;
  OrderSummary: TypeOnboardingRoute;
  Payment: TypeOnboardingRoute;
  PersonalDetails: TypeOnboardingRoute;
  PersonalDetailsSummary: TypeOnboardingRoute;
  ProductRecommendation: TypeOnboardingRoute;
  RiskAssessment: TypeOnboardingRoute;
  TermsAndConditions: TypeOnboardingRoute;
}
