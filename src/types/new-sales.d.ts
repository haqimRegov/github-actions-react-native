declare interface INewSalesAccountDetails {
  accountNo: string;
  authorisedSignatory: string;
  fundType: ProductType;
  isEpf?: boolean;
  riskScore: string;
  isRecurring?: boolean;
}

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
  handleCancelNewSales?: (backToInvestor?: boolean) => void;
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
  AccountInformation: TypeNewSalesRoute;
  AccountList: TypeNewSalesRoute;
  Acknowledgement: TypeNewSalesRoute;
  AdditionalDetails: TypeNewSalesRoute;
  IdentityVerification: TypeNewSalesRoute;
  OrderPreview: TypeNewSalesRoute;
  Payment: TypeNewSalesRoute;
  Products: TypeNewSalesRoute;
  ProductsList: TypeNewSalesRoute;
  ProductsConfirmation: TypeNewSalesRoute;
  RiskAssessment: TypeNewSalesRoute;
  RiskProfile: TypeNewSalesRoute;
  Signatures: TypeNewSalesRoute;
  Summary: TypeNewSalesRoute;
  TermsAndConditions: TypeNewSalesRoute;
}

declare interface INewSalesKeys {
  AccountInformation: TypeNewSalesKey;
  AccountList: TypeNewSalesKey;
  Acknowledgement: TypeNewSalesKey;
  AdditionalDetails: TypeNewSalesKey;
  IdentityVerification: TypeNewSalesKey;
  OrderPreview: TypeNewSalesKey;
  Payment: TypeNewSalesKey;
  Products: TypeNewSalesRoute;
  ProductsList: TypeNewSalesKey;
  ProductsConfirmation: TypeNewSalesKey;
  RiskAssessment: TypeNewSalesKey;
  RiskProfile: TypeNewSalesKey;
  Signatures: TypeNewSalesKey;
  Summary: TypeNewSalesKey;
  TermsAndConditions: TypeNewSalesKey;
}

declare type TypeNewSalesKey = keyof INewSalesKeys;
declare type TypeNewSalesRoute = keyof INewSalesRoutes;
