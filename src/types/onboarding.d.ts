declare interface IContentItem {
  route: TypeOnboardingRoute;
  title: string;
  key: TypeOnboardingKey;
}

declare interface IOnboardingContentItem {
  route: TypeOnboardingRoute;
  title: string;
  key: TypeOnboardingKey;
}

declare interface IOnboarding {
  content?: IOnboardingContentItem[];
  key: TypeOnboardingKey;
  label: string;
  route?: TypeOnboardingRoute;
}

declare interface OnboardingContentProps {
  cancelOnboarding?: boolean;
  handleCancelOnboarding?: () => void;
  handleResetOnboarding: () => void;
  handleNextStep: (route: TypeOnboardingKey) => void;
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

declare interface IOnboardingRoutes {
  Acknowledgement: TypeOnboardingRoute;
  CRSDeclaration: TypeOnboardingRoute;
  Declarations: TypeOnboardingRoute;
  DeclarationSummary: TypeOnboardingRoute;
  EmailVerification: TypeOnboardingRoute;
  EmploymentDetails: TypeOnboardingRoute;
  FATCADeclaration: TypeOnboardingRoute;
  FEADeclaration: TypeOnboardingRoute;
  IdentityVerification: TypeOnboardingRoute;
  OrderSummary: TypeOnboardingRoute;
  Payment: TypeOnboardingRoute;
  PersonalDetails: TypeOnboardingRoute;
  PersonalInformation: TypeOnboardingRoute;
  PersonalInfoSummary: TypeOnboardingRoute;
  Products: TypeOnboardingRoute;
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

declare type TypeOnboardingKey = keyof IOnboardingKeys;
declare type TypeOnboardingRoute = keyof IOnboardingRoutes;
