declare interface IClientIDState {
  frontPage?: FileBase64;
  secondPage?: FileBase64;
}

declare interface IPersonalDetailsState {
  bumiputera?: string;
  countryOfBirth?: string;
  dateOfBirth?: Date;
  educationLevel?: string;
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

declare interface IAddressState {
  address?: string;
  city?: string;
  country?: string;
  postCode?: string;
  state?: string;
}

declare interface IAddressInfoState {
  mailingAddress?: IAddressState;
  permanentAddress?: IAddressState;
}

declare interface IContactNumberState {
  label: string;
  code: string;
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
  bankAccountNumber?: string;
  bankLocation?: string;
  bankName?: string;
  bankSwiftCode?: string;
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
}

declare interface IFatcaState {
  acceptFatca?: boolean;
  confirmAddress?: TypeToggleButtonValue;
  agreeToFill?: boolean;
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
  facility?: TypeAdvanceToggleButtonValue;
  resident?: TypeToggleButtonValue;
}

declare interface ITinState {
  country?: string;
  explanation?: string;
  explanationSaved?: boolean;
  noTin?: boolean;
  reason?: TypeAdvanceToggleButtonValue;
  tinNumber?: string;
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
  joint?: IHolderInfoState;
  principal?: IHolderInfoState;
  incomeDistribution?: string;
  signatory?: string;
}
