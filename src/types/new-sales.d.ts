declare interface INewSalesContentItem {
  route: TypeNewSalesRoute;
  title: string;
  key: TypeNewSalesKey;
}

declare interface INewSales {
  content?: INewSalesContentItem[];
  key: TypeNewSalesKey;
  label: string;
  route?: TypeNewSalesRoute;
}

declare interface NewSalesContentProps {
  cancelNewSales?: boolean;
  handleCancelNewSales?: () => void;
  handleResetNewSales: () => void;
  handleNextStep: (route: TypeNewSalesRoute) => void;
}

declare interface NewSalesStepsContentProps {
  handleNextStep: (route: TypeNewSalesRoute) => void;
}

declare interface NewSalesStepsProps {
  activeContent?: IContentItem | INewSales;
  activeSection: number;
  disableNextSteps?: boolean;
  disabledSteps?: TypeNewSalesKey[];
  finishedSteps?: TypeNewSalesKey[];
  handleContentChange: (item: IContentItem | INewSales) => void;
  handleBackToDashboard: () => void;
  RenderContent: (props: NewSalesStepsContentProps) => JSX.Element;
  setActiveContent: (content: IContentItem | INewSales) => void;
  setActiveSection: (section: number) => void;
  setFinishedStep: (step: TypeNewSalesKey[]) => void;
  steps: INewSales[];
}

declare interface INewSalesRoutes {
  AccountList: TypeNewSalesRoute;
  Acknowledgement: TypeNewSalesRoute;
  AdditionalDetails: TypeNewSalesRoute;
  IdentityVerification: TypeNewSalesRoute;
  OrderPreview: TypeNewSalesRoute;
  Payment: TypeNewSalesRoute;
  ProductsList: TypeNewSalesRoute;
  ProductsConfirmation: TypeNewSalesRoute;
  RiskAssessment: TypeNewSalesRoute;
  Signatures: TypeNewSalesRoute;
  Summary: TypeNewSalesRoute;
  TermsAndConditions: TypeNewSalesRoute;
}

declare interface INewSalesKeys {
  AccountList: TypeNewSalesKey;
  Acknowledgement: TypeNewSalesKey;
  AdditionalDetails: TypeNewSalesKey;
  IdentityVerification: TypeNewSalesKey;
  OrderPreview: TypeNewSalesKey;
  Payment: TypeNewSalesKey;
  ProductsList: TypeNewSalesKey;
  ProductsConfirmation: TypeNewSalesKey;
  RiskAssessment: TypeNewSalesKey;
  Signatures: TypeNewSalesKey;
  Summary: TypeNewSalesKey;
  TermsAndConditions: TypeNewSalesKey;
}

declare type TypeNewSalesKey = keyof INewSalesKeys;
declare type TypeNewSalesRoute = keyof INewSalesRoutes;
