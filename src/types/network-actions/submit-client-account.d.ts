declare type TypeBooleanString = "true" | "false";

declare interface ISubmitInvestment {
  fundCurrency: string;
  fundId: string;
  fundingOption: string;
  investmentAmount: string;
  salesCharge: string;

  isScheduled?: string;
  isTopup?: boolean;
  fundClass?: string;
  scheduledInvestmentAmount?: string;
  scheduledSalesCharge?: string;
  prsType?: TypePrs;
}

declare interface ISubmitBank {
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankLocation?: string;
  bankName?: string;
  bankSwiftCode?: string;
  currency?: string[];
}

declare interface ISubmitBankSummary {
  localBank: ISubmitBank[];
  foreignBank?: ISubmitBank[];
}

declare interface ISubmitContactNumber {
  code: string;
  label: string;
  value: string;
}

declare interface ISubmitContactDetails {
  emailAddress?: string;
  contactNumber?: ISubmitContactNumber[];
}

declare interface ISubmitEmploymentBase extends IBaseAddress {
  businessNature: string;
  occupation: string;
  employerName: string;
  address: string;
}

declare interface ISubmitEmploymentJoint extends ISubmitEmploymentBase {
  grossIncome: string;
}

declare interface ISubmitAddressMultiline {
  line1: string;
  line2: string;
  line3: string;
}
declare interface ISubmitAddress {
  address: ISubmitAddressMultiline;
  city: string;
  country: string;
  postCode: string;
  state: string;
}

declare interface ISubmitAddressInformation {
  mailingAddress?: ISubmitAddress;
  permanentAddress?: ISubmitAddress;
}

declare interface ISubmitPersonalDetails {
  countryOfBirth?: string;
  educationLevel?: string;
  gender?: string;
  id: FileBase64[];
  maritalStatus?: string;
  monthlyHouseholdIncome?: string;
  mothersMaidenName?: string;
  name: string; // to be added in schema
  nationality?: string;
  placeOfBirth?: string;
  salutation?: string;

  bumiputera?: string;
  expirationDate?: number;
  race?: string;
  relationship?: string;
}

declare interface ISubmitEpfDetails {
  epfAccountType?: string;
  epfMemberNumber?: string;
}

declare interface ISubmitCrsTin {
  country?: string; // undefined if taxResident === 0
  noTin?: string; // "true" || "false", undefined if taxResident === 0
  reason?: string; // undefined if taxResident === 0, required if noTin === true
  tinNumber?: string; // undefined if taxResident === 0 or noTin === true
}

declare interface ISubmitCrs {
  taxResident: string; // find index
  tin: ISubmitCrsTin[]; // undefined if taxResident === 0 or noTin === true
}

declare interface ISubmitFatca {
  formW9?: string; // "true" || "false", required if usCitizen === true
  formW8Ben?: string; // "true" || "false", required if usCitizen === false && usBorn === true && confirmAddress === true,
  confirmAddress?: string; // "true" || "false", only required if usCitizen is false and usBorn is true
  certificate?: FileBase64; // required if noCertificate === false
  noCertificate?: string; // "true" || "false", required if certificate === undefined
  reason?: string; // required if noCertificate === true
  usBorn?: string; // "true" || "false", required if usCitizen === false
  usCitizen: string; // "true" || "false", required
}

declare interface ISubmitFea {
  balance: string;
  borrowingFacility: string; // "true" || "false"
  resident: string; // "true" || "false"
}

declare interface ISubmitDeclaration {
  crs?: ISubmitCrs;
  fatca?: ISubmitFatca;
  fea?: ISubmitFea;
}

declare interface ISubmitClientAccountHolderBase {
  clientId: string;
  addressInformation?: ISubmitAddressInformation;
  contactDetails?: ISubmitContactDetails;
  declaration?: ISubmitDeclaration;
  personalDetails: ISubmitPersonalDetails;
}

declare interface ISubmitClientAccountJoint extends ISubmitClientAccountHolderBase {
  employmentDetails?: ISubmitEmploymentJoint;
}

declare interface ISubmitClientAccountPrincipal extends ISubmitClientAccountHolderBase {
  bankSummary?: ISubmitBankSummary;
  epfDetails?: ISubmitEpfDetails;
  employmentDetails?: ISubmitEmploymentBase;
}

declare interface ISubmitClientAccountRequest {
  initId: string;
  incomeDistribution: string;
  signatory?: string;
  isEtb: boolean;
  principal: ISubmitClientAccountPrincipal;
  joint?: ISubmitClientAccountJoint;
  investments: ISubmitInvestment[];
}

type ISubmitClientAccountResult = IInvestmentSummary;

declare interface ISubmitClientAccountMutation {
  submitClientAccountV2: ISubmitClientAccountResponse;
}

declare type ISubmitClientAccountResponse = IMutationResponse<ISubmitClientAccountResult> | undefined;
