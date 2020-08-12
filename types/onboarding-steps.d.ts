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
  handleNextStep: (route: string) => void;
  navigation: IStackNavigationProp;
  route: string;
  setFinishedSteps: (route: TypeOnboardingRoute[]) => void;
}
declare interface OnboardingStepsContentProps {
  handleNextStep: (route: string) => void;
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
  | "Acknowledgement"
  | "Declaration"
  | "EmploymentDetails"
  | "IdentityVerification"
  | "Payment"
  | "PersonalDetails"
  | "ProductRecommendation"
  | "PRSDetails"
  | "Questionnaire";

declare interface IOnboardingRoutes {
  Acknowledgement: TypeOnboardingRoute;
  Declaration: TypeOnboardingRoute;
  EmploymentDetails: TypeOnboardingRoute;
  IdentityVerification: TypeOnboardingRoute;
  Payment: TypeOnboardingRoute;
  PersonalDetails: TypeOnboardingRoute;
  ProductRecommendation: TypeOnboardingRoute;
  PRSDetails: TypeOnboardingRoute;
  Questionnaire: TypeOnboardingRoute;
}
