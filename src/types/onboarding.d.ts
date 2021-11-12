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
  | "RiskAssessment"
  | "Products"
  | "PersonalInformation"
  | "EmailVerification"
  | "IdentityVerification"
  | "PersonalDetails"
  | "EmploymentDetails"
  | "PersonalInfoSummary"
  | "Declarations"
  | "FATCADeclaration"
  | "FEADeclaration"
  | "CRSDeclaration"
  | "DeclarationSummary"
  | "Acknowledgement"
  | "OrderSummary"
  | "TermsAndConditions"
  | "Signatures"
  | "Payment";

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
  RiskAssessment: TypeOnboardingKey;
  Products: TypeOnboardingKey;
  PersonalInformation: TypeOnboardingKey;
  EmailVerification: TypeOnboardingKey;
  IdentityVerification: TypeOnboardingKey;
  PersonalDetails: TypeOnboardingKey;
  EmploymentDetails: TypeOnboardingKey;
  PersonalInfoSummary: TypeOnboardingKey;
  Declarations: TypeOnboardingKey;
  FATCADeclaration: TypeOnboardingKey;
  FEADeclaration: TypeOnboardingKey;
  CRSDeclaration: TypeOnboardingKey;
  DeclarationSummary: TypeOnboardingKey;
  Acknowledgement: TypeOnboardingKey;
  OrderSummary: TypeOnboardingKey;
  TermsAndConditions: TypeOnboardingKey;
  Signatures: TypeOnboardingKey;
  Payment: TypeOnboardingKey;
}
