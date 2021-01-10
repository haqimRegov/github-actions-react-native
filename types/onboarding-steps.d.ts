declare interface IContentItem {
  route: TypeOnboardingRoute;
  title: string;
}

declare interface IOnboarding {
  content?: IContentItem[];
  key: string;
  label: string;
  route?: TypeOnboardingRoute;
}

declare interface OnboardingContentProps {
  cancelOnboarding?: boolean;
  handleCancelOnboarding?: () => void;
  handleResetOnboarding?: () => void;
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

declare interface OnboardingStepsContentProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

declare interface OnboardingStepsProps {
  activeContent?: IContentItem | IOnboarding;
  activeSection: number;
  disableNextSteps?: boolean;
  finishedSteps?: TypeOnboardingKey[];
  handleContentChange: (item: IContentItem | IOnboarding) => void;
  handleBackToDashboard: () => void;
  RenderContent: (props: OnboardingStepsContentProps) => JSX.Element;
  setActiveContent: (content: IContentItem | IOnboarding) => void;
  setActiveSection: (section: any) => void;
  setFinishedStep: (step: TypeOnboardingKey[]) => void;
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
  | "PersonalInfoSummary"
  | "ProductRecommendation"
  | "RiskAssessment"
  | "Signatures"
  | "TermsAndConditions";

declare type TypeOnboardingKey = "Acknowledgement" | "Declarations" | "PersonalInformation" | "Products" | "RiskAssessment" | "Payment";

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
  PersonalInfoSummary: TypeOnboardingRoute;
  ProductRecommendation: TypeOnboardingRoute;
  RiskAssessment: TypeOnboardingRoute;
  Signatures: TypeOnboardingRoute;
  TermsAndConditions: TypeOnboardingRoute;
}

declare interface IOnboardingKeys {
  Acknowledgement: TypeOnboardingKey;
  Declarations: TypeOnboardingKey;
  PersonalInformation: TypeOnboardingKey;
  Products: TypeOnboardingKey;
  RiskAssessment: TypeOnboardingKey;
  Payment: TypeOnboardingKey;
}
