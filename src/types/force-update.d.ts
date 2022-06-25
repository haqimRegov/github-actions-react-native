declare interface IForceUpdateContentItem {
  route: TypeForceUpdateRoute;
  title: string;
  key: TypeForceUpdateKey;
}

declare interface IForceUpdate {
  content?: IForceUpdateContentItem[];
  key: TypeForceUpdateKey;
  label: string;
  route?: TypeForceUpdateRoute;
}

declare interface ForceUpdateContentProps {
  cancelForceUpdate?: boolean;
  handleCancelForceUpdate?: () => void;
  handleResetForceUpdate: () => void;
  handleNextStep: (route: TypeForceUpdateRoute) => void;
}

declare interface ForceUpdateStepsContentProps {
  handleNextStep: (route: TypeForceUpdateRoute) => void;
}

declare interface ForceUpdateStepsProps {
  activeContent?: IContentItem | IForceUpdate;
  activeSection: number;
  disableNextSteps?: boolean;
  disabledSteps?: TypeForceUpdateKey[];
  finishedSteps?: TypeForceUpdateKey[];
  handleContentChange: (item: IContentItem | IForceUpdate) => void;
  handleBackToDashboard: () => void;
  RenderContent: (props: ForceUpdateStepsContentProps) => JSX.Element;
  setActiveContent: (content: IContentItem | IForceUpdate) => void;
  setActiveSection: (section: number) => void;
  setFinishedStep: (step: TypeForceUpdateKey[]) => void;
  steps: IForceUpdate[];
}

declare interface IForceUpdateRoutes {
  InvestorInformation: TypeForceUpdateRoute;
  Contact: TypeForceUpdateRoute;
  ContactSummary: TypeForceUpdateRoute;
  RiskAssessment: TypeForceUpdateRoute;
  Declarations: TypeForceUpdateRoute;
  FATCADeclaration: TypeForceUpdateRoute;
  CRSDeclaration: TypeForceUpdateRoute;
  DeclarationSummary: TypeForceUpdateRoute;
  Acknowledgement: TypeForceUpdateRoute;
  TermsAndConditions: TypeForceUpdateRoute;
  Signatures: TypeForceUpdateRoute;
}

declare interface IForceUpdateKeys {
  InvestorInformation: TypeForceUpdateKey;
  Contact: TypeForceUpdateKey;
  ContactSummary: TypeForceUpdateKey;
  RiskAssessment: TypeForceUpdateKey;
  Declarations: TypeForceUpdateKey;
  FATCADeclaration: TypeForceUpdateKey;
  CRSDeclaration: TypeForceUpdateKey;
  DeclarationSummary: TypeForceUpdateKey;
  Acknowledgement: TypeForceUpdateKey;
  TermsAndConditions: TypeForceUpdateKey;
  Signatures: TypeForceUpdateKey;
}

declare type TypeForceUpdateKey = keyof IForceUpdateKeys;
declare type TypeForceUpdateRoute = keyof IForceUpdateRoutes;
