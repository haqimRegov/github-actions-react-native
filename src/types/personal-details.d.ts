declare interface IClientIDState {
  frontPage?: FileBase64;
  secondPage?: FileBase64;
}

declare interface IPersonalDetailsState {
  bumiputera?: string;
  countryOfBirth?: string;
  dateOfBirth?: Date;
  educationLevel?: string;
  enableBankDetails?: boolean;
  otherEducationLevel?: string;
  expirationDate?: Date;
  gender?: string;
  id?: IClientIDState;
  idNumber?: string;
  idType?: string;
  maritalStatus?: string;
  mothersMaidenName?: string;
  monthlyHouseholdIncome?: string;
  name?: string;
  nationality?: string;
  placeOfBirth?: string;
  race?: string;
  relationship?: string;
  otherRelationship?: string;
  riskProfile?: string;
  salutation?: string;
}

declare interface IBaseAddress {
  city?: string;
  country?: string;
  postCode?: string;
  state?: string;
}

declare interface IAddressMultiline {
  line1?: string;
  line2?: string;
  line3?: string;
  line4?: string;
}

declare interface IAddressState extends IBaseAddress {
  address?: IAddressMultiline;
}
declare interface IAddressInfoState {
  mailingAddress?: IAddressState;
  permanentAddress?: IAddressState;
  sameAddress?: boolean;
}

declare interface IContactNumberState {
  code: string;
  error?: string;
  id: string;
  label: string;
  value: string;
}
declare interface IContactDetailsState {
  emailAddress?: string;
  contactNumber?: IContactNumberState[];
}

declare interface IEpfDetailsState {
  epfAccountType?: string;
  epfMemberNumber?: string;
}

declare interface IBankDetailsState {
  bankAccountName?: string;
  bankAccountNameError?: string;
  bankAccountNumber?: string;
  bankAccountNumberError?: string;
  bankLocation?: string;
  bankName?: string;
  bankSwiftCode?: string;
  combinedBankAccountName?: string;
  currency?: string[];
  otherBankName?: string;
}

declare interface IBankSummaryState {
  foreignBank?: IBankDetailsState[];
  localBank?: IBankDetailsState[];
}

declare interface IEmploymentDetailsState extends IAddressState {
  businessNature?: string;
  employerName?: string;
  grossIncome?: string;
  occupation?: string;
  isEnabled?: boolean;
}

declare interface IFatcaState {
  acceptFatca?: boolean;
  confirmAddress?: TypeToggleButtonValue;
  formW9?: boolean;
  formW8Ben?: boolean;
  certificate?: FileBase64;
  explanation?: string;
  explanationSaved?: boolean;
  noCertificate?: boolean;
  reason?: TypeAdvanceToggleButtonValue;
  uploadLater?: boolean;
  usBorn?: TypeToggleButtonValue;
  usCitizen?: TypeToggleButtonValue;
}

declare interface IFeaState {
  acceptFea?: boolean;
  balance?: string;
  balanceError?: string;
  facility?: TypeAdvanceToggleButtonValue;
  resident?: TypeToggleButtonValue;
}

declare interface ITinMultiple {
  country?: string;
  explanation?: string;
  explanationSaved?: boolean;
  noTin?: boolean;
  reason?: TypeAdvanceToggleButtonValue;
  tinNumber?: string;
}

declare interface ITinState {
  tin?: ITinMultiple[];
}

declare interface ICrsState extends ITinState {
  acceptCrs?: boolean;
  taxResident?: TypeAdvanceToggleButtonValue;
}

declare interface IDeclarationState {
  crs?: ICrsState;
  fatca?: IFatcaState;
  fea?: IFeaState;
}

declare interface IHolderInfoState {
  addressInformation?: IAddressInfoState;
  bankSummary?: IBankSummaryState;
  contactDetails?: IContactDetailsState;
  declaration?: IDeclarationState;
  employmentDetails?: IEmploymentDetailsState;
  epfDetails?: IEpfDetailsState;
  personalDetails?: IPersonalDetailsState;
}

declare interface IPersonalInfoState {
  cancelOnboarding?: boolean;
  editMode?: boolean;
  editPersonal?: boolean;
  editDeclaration?: boolean;
  emailOtpSent?: boolean;
  epfInvestment?: boolean;
  epfShariah?: boolean;
  isAllEpf?: boolean;
  joint?: IHolderInfoState;
  principal?: IHolderInfoState;
  incomeDistribution?: string;
  signatory?: string;
}
