declare interface IOrderSummaryTransaction {
  accountNumber: string[] | string;
  accountOperationMode: string | null;
  accountType: TypeAccountChoices;
  kibProcessingBranch: string;
  registrationDate: string;
  servicingAdviserCode: string;
  servicingAdviserName: string;
}

declare interface IOrderSummaryInvestment {
  distributionInstruction: string;
  fundClass: string;
  fundCode: string;
  fundCurrency: string;
  fundingOption: string;
  fundIssuer: string;
  fundName: string;
  fundType: string;
  investmentAmount: string;
  investmentType: string;
  isFea: string;
  recurring: string;
  salesCharge: string;
  scheduledInvestmentAmount: string;
  scheduledSalesCharge: string;
}

declare interface IOrderSummaryPayment {
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankName?: string;
  checkNumber?: string;
  clientName?: string;
  clientTrustAccountNumber?: string;
  epfAccountNumber?: string;
  epfReferenceNo?: string;
  frequency?: string;
  fundCurrency?: TypeCurrency | "";
  investmentAmount?: string;
  isCombined?: boolean;
  kibBankAccountName?: string;
  kibBankAccountNumber?: string;
  kibBankName?: string;
  paymentMethod?: TypePaymentMethod;
  proofOfPayment?: FileBase64;
  recurringBank?: string;
  recurringType?: string;
  referenceNumber?: string;
  remark?: string;
  surplusNote?: string;
  transactionDate?: number;
  transactionTime?: number;
  utmc?: string;
}

declare interface IOrderSummaryEmploymentDetails {
  address: IAddressState;
  annualIncome: string | null;
  monthlyHouseholdIncome: string | null;
  nameOfEmployer: string;
  natureOfBusiness: string;
  occupation: string;
}

declare interface IOrderSummaryContactDetails {
  email: string;
  faxNumber: string | null;
  homeNumber: string | null;
  mobileNumber: string;
  officeNumber: string | null;
}

declare interface IOrderSummaryPersonalDetails {
  bumiputera: string | null;
  countryOfBirth: string;
  dateOfBirth: string;
  educationLevel: string;
  expirationDate?: string | null;
  gender: string;
  maritalStatus: string;
  monthlyHouseholdIncome: string;
  mothersMaidenName: string;
  nationality: string;
  otherEducationLevel?: string | null;
  otherRelationship?: string | null;
  placeOfBirth: string;
  race: string | null;
  relationship: string | null;
  riskProfile: string;
  riskProfileLastUpdated?: string | null;
  salutation: string;
}

declare interface IOrderSummaryAddress {
  address: IAddressMultiline;
  city: string;
  country: string;
  postCode: string;
  state: string;
}

declare interface IOrderSummaryAddressInfo {
  mailingAddress: IOrderSummaryAddress;
  permanentAddress: IOrderSummaryAddress;
}

declare interface IOrderSummaryBank {
  bankAccountName: string;
  bankAccountNumber: string;
  bankLocation: string | null;
  bankName: string;
  bankSwiftCode: string | null;
  currency: string[];
  otherBankName?: string | null;
}

declare interface IOrderSummaryBankInfo {
  foreignBank: IOrderSummaryBank[] | null;
  localBank: IOrderSummaryBank[];
}

declare interface IOrderSummaryEpf {
  epfAccountType: string;
  epfMemberNumber: string;
}

declare interface IOrderSummaryTin {
  country: string | null;
  tinNumber: string | null;
  reason: string | null;
}

declare interface IOrderSummaryDeclaration {
  crs: {
    taxResident: string | null;
    tin: IOrderSummaryTin[];
  };
  fatca: {
    certificate: DocumentFileBase64 | null;
    confirmAddress: "true" | "false" | null;
    correspondenceDeclaration: "Yes" | "No" | null;
    formW8Ben: DocumentFileBase64 | null;
    formW9: DocumentFileBase64 | null;
    reason: string | null;
    usBorn: "true" | "false" | null;
    usCitizen: "true" | "false" | null;
  };
  fea: {
    balance: string;
    borrowingFacility: "Yes" | "No" | null;
    resident: "Yes" | "No" | null;
  } | null;
}

declare interface IOrderSummaryProfile extends IAccountDetails {
  addressInformation: IOrderSummaryAddressInfo;
  bankInformation?: IOrderSummaryBankInfo;
  clientId?: string | null;
  contactDetails: IOrderSummaryContactDetails;
  declaration: IOrderSummaryDeclaration;
  employmentInformation: IOrderSummaryEmploymentDetails;
  epfDetails: IOrderSummaryEpf | null;
  idNumber: string;
  idType: TypeClientID;
  name: string;
  personalDetails: IOrderSummaryPersonalDetails;
  uploadedDocument?: FileBase64[];
}

declare interface IDashboardOrderSummary {
  documentSummary: IDocumentSummary;
  extensionRemark: string | null;
  investmentSummary: IOrderSummaryInvestment[] | null;
  orderNumber: string;
  paymentSummary: IOrderSummaryPayment[] | null;
  profile: IOrderSummaryProfile[];
  remark: string | null;
  riskInfo: IRiskProfile | null;
  status: string;
  totalInvestment: IOrderAmount[] | null;
  trackingSummary: ITrackingSummary[];
  transactionDetails: IOrderSummaryTransaction;
}

declare interface IStructuredData {
  accountDocuments: LabeledTitleProps[];
  accountSummaryDetails: LabeledTitleProps[];
  contactDetails: LabeledTitleProps[];
  employmentDetails: LabeledTitleProps[];
  epfDetails: LabeledTitleProps[];
  declarations: {
    crs: LabeledTitleProps[];
    fatca: LabeledTitleProps[];
    fea: LabeledTitleProps[];
  };
  foreignBankDetails: LabeledTitleProps[][];
  localBankDetails: LabeledTitleProps[][];
  mailingAddress: LabeledTitleProps[];
  permanentAddress: LabeledTitleProps[];
  profilePic?: FileBase64;
  showJointToggle?: boolean;
}

declare type OrderSummaryTabType = "order" | "document" | "account" | "tracking";
