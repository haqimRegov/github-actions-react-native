declare interface IOrderSummaryTransaction {
  registrationDate: string;
  servicingAdviserName: string;
  servicingAdviserCode: string;
  kibProcessingBranch: string;
  accountType: TypeAccountChoices;
  accountNo: string;
  accountOperationMode: string;
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
  fundCurrency?: TypeCurrency | "";
  paymentMethod?: TypePaymentMethod;
  investmentAmount?: string;
  kibBankAccountNumber?: string;
  kibBankAccountName?: string;
  kibBankName?: string;
  transactionDate?: number;
  transactionTime?: number;
  proofOfPayment?: FileBase64;
  remark?: string;
  bankName?: string;
  checkNumber?: string;
  clientName?: string;
  clientTrustAccountNumber?: string;
  epfAccountNumber?: string;
  epfReferenceNo?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  recurringType?: string;
  recurringBank?: string;
  frequency?: string;
}

declare interface IOrderSummaryEmploymentDetails {
  occupation: string;
  natureOfBusiness: string;
  monthlyHouseholdIncome: string;
  annualIncome: string | null;
  nameOfEmployer: string;
  address: IAddressState;
}

declare interface IOrderSummaryContactDetails {
  email: string;
  mobileNumber: string;
  faxNumber: string | null;
  homeNumber: string | null;
  officeNumber: string | null;
}

declare interface IOrderSummaryPersonalDetails {
  bumiputera: string | null;
  countryOfBirth: string;
  dateOfBirth: string;
  educationLevel: string;
  otherEducationLevel?: string | null;
  expirationDate?: string | null;
  gender: string;
  id: FileBase64;
  idNumber: string;
  idType: string;
  maritalStatus: string;
  mothersMaidenName: string;
  monthlyHouseholdIncome: string;
  name: string;
  nationality: string;
  placeOfBirth: string;
  race: string | null;
  relationship: string;
  otherRelationship?: string | null;
  riskProfile: string;
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

declare interface IOrderSummaryDeclaration {
  fatca: {
    usCitizen: "Yes" | "No" | null;
    usBorn: "Yes" | "No" | null;
    confirmAddress: "Yes" | "No" | null;
    certificate: DocumentFileBase64 | null;
    formW9: DocumentFileBase64 | null;
    formW8Ben: DocumentFileBase64 | null;
    reason: string | null;
    correspondenceDeclaration: "Yes" | "No" | null;
  };
  crs: {
    taxResident: string | null;
    tin: { country: string | null; tinNumber: string | null; reason: string | null }[];
  };
  fea: {
    resident: "Yes" | "No" | null;
    borrowingFacility: "Yes" | "No" | null;
    balance: string;
  };
}

declare interface IOrderSummaryProfile {
  name: string;
  idNumber: string;
  idType: TypeClientID;

  addressInformation: IOrderSummaryAddressInfo;
  bankInformation: IOrderSummaryBankInfo;
  contactDetails: IOrderSummaryContactDetails;
  employmentInformation: IOrderSummaryEmploymentDetails;
  personalDetails: IOrderSummaryPersonalDetails;
  epfDetails: IOrderSummaryEpf | null;
  uploadedDocument: FileBase64[];

  declaration: IOrderSummaryDeclaration;
}

declare interface IDashboardOrderSummary {
  status: string;
  orderNumber: string;
  remark: string;
  extensionRemark: string;
  totalInvestment: IOrderAmount[];
  transactionDetails: IOrderSummaryTransaction;
  investmentSummary: IOrderSummaryInvestment[];
  paymentSummary: IOrderSummaryPayment[];
  profile: IOrderSummaryProfile[];
}
