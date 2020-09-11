declare interface IPersonalDetailsState {
  bumiputera?: string;
  countryOfBirth: string;
  dateOfBirth: Date;
  educationLevel?: string;
  expirationDate?: Date;
  gender: string;
  id?: FileBase64;
  idNumber: string;
  idType: string | number;
  maritalStatus?: string;
  mothersMaidenName?: string;
  name: string;
  nationality: string;
  placeOfBirth: string;
  race?: string;
  relationship?: string;
  riskProfile: string;
  salutation: string;
}

declare interface IAddressState {
  address: string;
  city: string;
  country: string;
  postCode: string;
  state: string;
}

declare interface IAddressInfoState {
  mailingAddress: IAddressState;
  permanentAddress: IAddressState;
}

declare interface IContactDetailsState {
  emailAddress: string;
  faxNumber?: string;
  faxNumberCode?: string;
  homeNumber?: string;
  homeNumberCode?: string;
  mobileNumber?: string;
  mobileNumberCode?: string;
  officeNumber?: string;
  officeNumberCode?: string;
}

declare interface IEpfDetailsState {
  epfAccountType: string;
  epfMemberNumber: string;
}

declare interface IBankDetailsState {
  bankAccountName: string;
  bankAccountNumber: string;
  bankLocation?: string;
  bankName: string;
  bankSwiftCode?: string;
  currency: string[];
}

declare interface IBankSummaryState {
  foreignBank?: IBankDetailsState[];
  localBank: IBankDetailsState[];
}

declare interface IEmploymentDetailsState extends IAddressState {
  businessNature: string;
  employerName: string;
  grossIncome?: string;
  monthlyHouseholdIncome: string;
  occupation: string;
}

declare interface IFatcaState {
  certificate?: FileBase64;
  noCertificate: boolean;
  reason?: string;
  uploadLater: boolean;
  usBorn: string | number;
  usCitizen: string | number;
}

declare interface ITinState {
  country: string;
  noTin: boolean;
  reason?: string;
  tinNumber: string;
}

declare interface IFeaState {
  questionOne: number;
  questionTwo: number;
  questionThree: number;
}

declare interface ICrsState {
  taxResident: string | number;
  tin: ITinState[];
}

declare interface IDeclarationState {
  crs: ICrsState;
  fatca: IFatcaState;
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
  editMode?: boolean;
  epfInvestment?: boolean;
  joint?: IHolderInfoState;
  principal?: IHolderInfoState;
}
