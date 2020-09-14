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
  monthlyHouseholdIncome?: string;
  occupation?: string;
}

declare interface IFatcaState {
  acknowledgement?: boolean;
  certificate?: FileBase64;
  explanation?: string;
  noCertificate?: boolean;
  reason?: string;
  uploadLater?: boolean;
  usBorn?: string;
  usCitizen?: string;
}

declare interface ITinState {
  country?: string;
  explanation?: string;
  noTin?: boolean;
  reason?: string;
  tinNumber: string;
}

declare interface IFeaState {
  questionOne?: number;
  questionTwo?: number;
  questionThree?: number;
}

declare interface ICrsState {
  taxResident?: string;
  tin?: ITinState[];
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
  epfInvestment?: boolean;
  joint?: IHolderInfoState;
  principal?: IHolderInfoState;
  incomeDistribution?: string;
  signatory?: string;
}
