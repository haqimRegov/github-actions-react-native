declare interface IContentItem {
  route: TypeOnboardingRoute;
  title: string;
  key: TypeOnboardingKey;
}

declare interface IOnboarding {
  content?: IContentItem[];
  key: TypeOnboardingKey;
  label: string;
  route?: TypeOnboardingRoute;
}

declare interface OnboardingContentProps {
  cancelOnboarding?: boolean;
  handleCancelOnboarding?: () => void;
  handleResetOnboarding: () => void;
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

declare interface OnboardingStepsContentProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

declare interface OnboardingStepsProps {
  activeContent?: IContentItem | IOnboarding;
  activeSection: number;
  disableNextSteps?: boolean;
  disabledSteps?: TypeOnboardingKey[];
  finishedSteps?: TypeOnboardingKey[];
  handleContentChange: (item: IContentItem | IOnboarding) => void;
  handleBackToDashboard: () => void;
  RenderContent: (props: OnboardingStepsContentProps) => JSX.Element;
  setActiveContent: (content: IContentItem | IOnboarding) => void;
  setActiveSection: (section: number) => void;
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

declare type TypeOnboardingKey =
  | "Acknowledgement"
  | "CRSDeclaration"
  | "Declarations"
  | "DeclarationSummary"
  | "EmailVerification"
  | "EmploymentDetails"
  | "FATCADeclaration"
  | "FEADeclaration"
  | "IdentityVerification"
  | "OrderSummary"
  | "Payment"
  | "PersonalDetails"
  | "PersonalInformation"
  | "PersonalInfoSummary"
  | "Products"
  | "RiskAssessment"
  | "Signatures"
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
  PersonalInfoSummary: TypeOnboardingRoute;
  ProductRecommendation: TypeOnboardingRoute;
  RiskAssessment: TypeOnboardingRoute;
  Signatures: TypeOnboardingRoute;
  TermsAndConditions: TypeOnboardingRoute;
}
declare interface IOnboardingKeys {
  Acknowledgement: TypeOnboardingKey;
  CRSDeclaration: TypeOnboardingKey;
  Declarations: TypeOnboardingKey;
  DeclarationSummary: TypeOnboardingKey;
  EmailVerification: TypeOnboardingKey;
  EmploymentDetails: TypeOnboardingKey;
  FATCADeclaration: TypeOnboardingKey;
  FEADeclaration: TypeOnboardingKey;
  IdentityVerification: TypeOnboardingKey;
  OrderSummary: TypeOnboardingKey;
  Payment: TypeOnboardingKey;
  PersonalDetails: TypeOnboardingKey;
  PersonalInformation: TypeOnboardingKey;
  PersonalInfoSummary: TypeOnboardingKey;
  Products: TypeOnboardingKey;
  RiskAssessment: TypeOnboardingKey;
  Signatures: TypeOnboardingKey;
  TermsAndConditions: TypeOnboardingKey;
}
