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
  AdditionalDetails: TypeOnboardingRoute;
  ContactDetails: TypeOnboardingRoute;
  CRSDeclaration: TypeOnboardingRoute;
  Declarations: TypeOnboardingRoute;
  DeclarationSummary: TypeOnboardingRoute;
  EmailVerification: TypeOnboardingRoute;
  EmploymentDetails: TypeOnboardingRoute;
  FATCADeclaration: TypeOnboardingRoute;
  IdentityVerification: TypeOnboardingRoute;
  OrderSummary: TypeOnboardingRoute;
  Payment: TypeOnboardingRoute;
  PersonalInformation: TypeOnboardingRoute;
  PersonalInfoSummary: TypeOnboardingRoute;
  Products: TypeOnboardingRoute;
  ProductsList: TypeOnboardingRoute;
  ProductsConfirmation: TypeOnboardingRoute;
  RiskAssessment: TypeOnboardingRoute;
  RiskSummary: TypeOnboardingRoute;
  Signatures: TypeOnboardingRoute;
  TermsAndConditions: TypeOnboardingRoute;
}

declare interface IOnboardingKeys {
  Acknowledgement: TypeOnboardingKey;
  AdditionalDetails: TypeOnboardingKey;
  ContactDetails: TypeOnboardingKey;
  CRSDeclaration: TypeOnboardingKey;
  Declarations: TypeOnboardingKey;
  DeclarationSummary: TypeOnboardingKey;
  EmailVerification: TypeOnboardingKey;
  EmploymentDetails: TypeOnboardingKey;
  FATCADeclaration: TypeOnboardingKey;
  IdentityVerification: TypeOnboardingKey;
  OrderSummary: TypeOnboardingKey;
  Payment: TypeOnboardingKey;
  PersonalInformation: TypeOnboardingKey;
  PersonalInfoSummary: TypeOnboardingKey;
  Products: TypeOnboardingKey;
  ProductsList: TypeOnboardingKey;
  ProductsConfirmation: TypeOnboardingKey;
  RiskAssessment: TypeOnboardingKey;
  RiskSummary: TypeOnboardingRoute;
  Signatures: TypeOnboardingKey;
  TermsAndConditions: TypeOnboardingKey;
}

declare type TypeOnboardingKey = keyof IOnboardingKeys;
declare type TypeOnboardingRoute = keyof IOnboardingRoutes;
