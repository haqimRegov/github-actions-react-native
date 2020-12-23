declare type TypeBooleanString = "true" | "false";

declare interface ISubmitInvestment {
  fundCurrency: string;
  fundId: string;
  fundingOption: string;
  investmentAmount: string;
  isScheduled: TypeBooleanString;
  salesCharge: string;

  fundClass?: string;
  scheduledInvestmentAmount?: string;
  scheduledSalesCharge?: string;
}

declare interface ISubmitBank {
  bankAccountName: string;
  bankAccountNumber: string;
  bankLocation: string;
  bankName: string;
  bankSwiftCode: string;
  currency: string[];
}

declare interface ISubmitContactNumber {
  code: string;
  label: string;
  value: string;
}

declare interface ISubmitEmploymentBase extends ISubmitAddress {
  businessNature: string;
  occupation: string;
  employerName: string;
}

declare interface ISubmitEmploymentJoint extends ISubmitEmploymentBase {
  grossIncome: string;
}

declare interface ISubmitAddress {
  address: string;
  city: string;
  country: string;
  postCode: string;
  state: string;
}

declare interface ISubmitPersonalDetails {
  countryOfBirth: string;
  educationLevel: string;
  gender: string;
  id: FileBase64[];
  maritalStatus: string;
  monthlyHouseholdIncome: string;
  mothersMaidenName: string;
  name: string; // to be added in schema
  nationality: string;
  placeOfBirth: string;
  salutation: string;

  bumiputera?: boolean;
  expirationDate?: string;
  race?: string;
  relationship?: string;
}

declare interface ISubmitEpfDetails {
  epfAccountType: string;
  epfMemberNumber: string;
}

declare interface ISubmitCrs {
  country?: string; // undefined if taxResident === 0
  noTin?: TypeBooleanString; // "true" || "false", undefined if taxResident === 0
  reason?: string; // undefined if taxResident === 0, required if noTin === true
  taxResident: string; // find index
  tinNumber?: string; // undefined if taxResident === 0 or noTin === true
}

declare interface ISubmitFatca {
  formW9?: TypeBooleanString; // "true" || "false", required if usCitizen === true
  formW8Ben?: TypeBooleanString; // "true" || "false", required if usCitizen === false && usBorn === true && confirmAddress === true,
  confirmAddress?: TypeBooleanString; // "true" || "false", only required if usCitizen is false and usBorn is true
  certificate?: FileBase64; // required if noCertificate === false
  noCertificate?: TypeBooleanString; // "true" || "false", required if certificate === undefined
  reason?: string; // required if noCertificate === true
  usBorn?: TypeBooleanString; // "true" || "false", required if usCitizen === false
  usCitizen: TypeBooleanString; // "true" || "false", required
}

declare interface ISubmitFea {
  balance: string;
  borrowingFacility: TypeBooleanString; // "true" || "false"
  resident: TypeBooleanString; // "true" || "false"
}

declare interface ISubmitClientAccountRequest {
  incomeDistribution: "";
  signatory?: string;
  principal: {
    clientId: string;
    addressInformation: {
      mailingAddress: ISubmitAddress;
      permanentAddress: ISubmitAddress;
    };
    bankSummary: {
      localBank: ISubmitBank[];
      foreignBank?: ISubmitBank[];
    };
    contactDetails: {
      emailAddress: string;
      contactNumber: ISubmitContactNumber[];
    };
    declaration: {
      crs: ISubmitCrs;
      fatca: ISubmitFatca;
      fea: ISubmitFea;
    };
    epfDetails?: ISubmitEpfDetails;
    employmentDetails: ISubmitEmploymentBase;
    personalDetails: ISubmitPersonalDetails;
  };
  joint?: {
    clientId: string;
    addressInformation: {
      mailingAddress: ISubmitAddress;
      permanentAddress: ISubmitAddress;
    };
    contactDetails?: {
      emailAddress?: string;
      contactNumber?: ISubmitContactNumber[];
    };
    declaration?: {
      crs?: ISubmitCrs;
      fatca?: ISubmitFatca;
      fea?: ISubmitFea;
    };
    employmentDetails?: ISubmitEmploymentJoint;
    personalDetails: ISubmitPersonalDetails;
  };
  investments: ISubmitInvestment[];
}

declare interface ISubmitClientAccountResult extends IInvestmentSummary {}

declare interface ISubmitClientAccountMutation {
  setupClientAccount: ISubmitClientAccountResponse;
}

declare type ISubmitClientAccountResponse = IMutationResponse<ISubmitClientAccountResult> | undefined;
