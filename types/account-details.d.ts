declare interface IOrderDetails {
  accountDetails: IAccountDetails;
  investmentSummary: IInvestmentDetails[];
  transactionDetails: ITransactionDetails;
}

declare interface IInvestmentDetails {
  fundCode: string;
  fundCurrency: string;
  fundGroup: string;
  fundName: string;
  fundNumber: string;
  fundType: string;
  investmentAmount: string;
  salesCharge: string;
  type: string;
  utmc: string;
}

declare interface IAccountSummary {
  accountNo: string;
  accountType?: string;
  birthCountry: string;
  birthPlace: string;
  bumiputera?: string;
  dob: string;
  educationLevel: string;
  gender: string;
  maritalStatus: string;
  motherName: string;
  nationality: string;
  operationMode?: string;
  race?: string;
  registrationDate: string;
  relationWithJoint?: string;
  riskProfile: string;
  salutation: string;
  viewAccess?: string;
}

declare interface IContactDetails {
  email: string;
  mobile: string;
  office?: string;
  fax?: string;
  home?: string;
}

declare interface IBankDetails {
  currency: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  accountNo: string;
  swiftCode?: string;
  location?: string;
}

declare interface IEmploymentDetails {
  occupation: string;
  employerAddress: string;
  grossAnnualIncome?: string;
  employerName: string;
  postCode: string;
  businessNature: string;
  city: string;
  monthlyIncome: string;
  state: string;
  country: string;
}

declare interface IEPFDetails {
  epfNumber: string;
  epfAccountType: string;
}

declare interface ITinDetails {
  tinReasons?: string;
  tinRemark?: string;
  tinResidence?: string;
  tinNo?: string;
}
declare interface IFatcaCRS {
  usCitizen: string;
  usBorn: string;
  fatcaProof?: FileBase64;
  fatcaReason?: string;
  malaysiaResident: string;
  crs: string;
  tin: ITinDetails[];
}

declare interface IUploadDocuments {
  adviserSignature?: FileBase64;
  clientSignature?: FileBase64;
}

declare interface IAccountTypeDetails {
  name: string;
  id: string;
  idProof: FileBase64;
  profilePic?: FileBase64;
  accountSummary: IAccountSummary;
  addressInfo: {
    permanentAddress: IAddress;
    mailingAddress: IAddress;
  };
  contactDetails: IContactDetails;
  bankSummary: {
    localBank: IBankDetails[];
    foreignBank: IBankDetails[];
  };
  employmentInfo: IEmploymentDetails;
  epfDetails?: IEPFDetails;
  fatcaCRS: IFatcaCRS;
  uploads: IUploadDocuments;
}

declare interface IAccountDetails {
  principal: IAccountTypeDetails;
  joint?: IAccountTypeDetails;
}

declare interface ITransactionSummary {
  accountNumber: string;
  accountType: string;
  adviserCode: string;
  adviserName: string;
  omniReference: string;
  processingBranch: string;
  transactionDate: string;
}

declare interface IPaymentSummary {
  amount: string;
  currency: string;
  bankCode: string;
  bankName: string;
  kibAccountNo: string;
  kibBankName: string;
  paymentMethod: string;
  proof: FileBase64;
  remark?: string;
  transactionDate: Date;
}

declare interface ITransactionDetails {
  transactionSummary: ITransactionSummary;
  paymentSummary?: IPaymentSummary[];
}
