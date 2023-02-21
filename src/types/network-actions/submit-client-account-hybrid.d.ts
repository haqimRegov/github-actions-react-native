declare interface ISubmitPersonalDetailsHybrid {
  countryOfBirth?: string;
  educationLevel?: string;
  gender?: string;
  id: FileBase64[];
  maritalStatus?: string;
  monthlyHouseholdIncome?: string;
  mothersMaidenName?: string;
  name?: string; // to be added in schema
  nationality?: string;
  placeOfBirth?: string;
  salutation?: string;
  bumiputera?: string;
  expirationDate?: number;
  race?: string;
  relationship?: string;
}

declare interface ISubmitClientAccountHolderHybridBase {
  clientId: string;
  addressInformation?: ISubmitAddressInformation;
  contactDetails?: ISubmitContactDetails;
  declaration?: ISubmitDeclaration;
  personalDetails: ISubmitPersonalDetailsHybrid;
}

declare interface ISubmitClientAccountHybridJoint extends ISubmitClientAccountHolderHybridBase {
  employmentDetails?: ISubmitEmploymentJoint;
}

declare interface ISubmitClientAccountHybridPrincipal extends ISubmitClientAccountHolderHybridBase {
  bankSummary?: ISubmitBankSummary;
  epfDetails?: ISubmitEpfDetails;
  employmentDetails?: ISubmitEmploymentBase;
}

declare interface ISubmitClientAccountHybridRequest {
  initId: string;
  incomeDistribution: string;
  signatory?: string;
  isEtb: boolean;
  principal: ISubmitClientAccountHybridPrincipal;
  joint?: ISubmitClientAccountHybridJoint;
  investments: ISubmitInvestment[];
}

type ISubmitClientAccountHybridResult = IInvestmentSummary;

declare interface ISubmitClientAccountHybridMutation {
  submitClientAccountHybrid: ISubmitClientAccountHybridResponse;
}

declare type ISubmitClientAccountHybridResponse = IMutationResponse<ISubmitClientAccountHybridResult> | undefined;
