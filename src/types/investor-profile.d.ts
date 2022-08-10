declare interface IAccountDetails {
  accountNumber?: string[];
  accountOperationMode?: string | null;
  accountType?: TypeAccountChoices;
  distributionInstruction?: string;
  registrationDate?: string;
}

declare interface IRiskProfile {
  appetite: string;
  expectedRange: string;
  hnwStatus: string;
  profile: string;
  type: string;
}

declare interface IAccountInvestorOverview {
  clientId: string;
  lastUpdated?: string;
  name: string;
  id?: FileBase64 | null;
  idNumber: string;
  idType: TypeClientID;
  riskProfile: string | null;
}

declare interface IStructuredInvestorProfile {
  identificationDetails: LabeledTitleProps[];
  personalDetails: LabeledTitleProps[];
  contactDetails: LabeledTitleProps[];
  permanentAddress: LabeledTitleProps[];
  correspondenceAddress: LabeledTitleProps[];
  employmentDetails: LabeledTitleProps[];
  employmentAddress: LabeledTitleProps[];
  declarations: {
    crs: LabeledTitleProps[];
    crsTin: LabeledTitleProps[][];
    fatca: LabeledTitleProps[];
    fea?: LabeledTitleProps[];
  };
}

declare interface IInvestorAccount {
  accountDetails: IAccountDetails | null; // accountInformation
  addressInformation: IOrderSummaryAddressInfo; // investorProfile and accountInformation
  bankInformation: IOrderSummaryBankInfo | null; // accountInformation
  contactDetails: IOrderSummaryContactDetails | null; // investorProfile
  declaration: IOrderSummaryDeclaration | null; // investorProfile
  documentSummary: IDocumentSummary | null; // investorProfile
  employmentInformation: IOrderSummaryEmploymentDetails | null; // investorProfile
  epfDetails: IOrderSummaryEpf | null; // investorProfile
  investorOverview: IAccountInvestorOverview[]; // [Principal, Joint] investorProfile will always be [Principal] only
  orderHistory: IDashboardOrder[] | null;
  personalDetails: IOrderSummaryPersonalDetails | null; // investorProfile
}

declare type InvestorProfileTabType = "profile" | "declarations" | "document";
declare type AccountInformationTabType = "account" | "order-history";

declare interface IStructuredAccountInformation {
  accountDetails: LabeledTitleProps[];
  correspondenceAddress: LabeledTitleProps[];
  foreignBank?: ISummaryColorCardSection;
  localBank: ISummaryColorCardSection;
}
