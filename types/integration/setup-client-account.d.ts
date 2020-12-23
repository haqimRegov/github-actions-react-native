declare interface IRequestIDVerification {
  countryOfBirth: string;
  expirationDate?: number;
  gender: string;
  id: FileBase64[];
  correspondenceAddress: IAddressState;
  fullName: string;
  permanentAddress: IAddressState;
  placeOfBirth: string;
  salutation: string;
}

declare interface IRequestPersonalDetails {
  bumiputera?: boolean;
  monthlyHouseholdIncome: string;
  educationLevel: string;
  faxNumber?: string;
  homeNumber?: {
    mobileCode: string;
    number: string;
  };
  maritalStatus: string;
  mobileNumber?: {
    mobileCode: string;
    number: string;
  };
  mothersMaidenName: string;
  officeNumber?: {
    mobileCode: string;
    number: string;
  };
  race?: string;
  relationshipWithJoint?: string;
}

declare interface IRequestInvestment {
  fundId: string;
  fundingOption: string;
  currency: string;
  investmentAmount: number;
  isScheduled: boolean;
  scheduledInvestmentAmount?: number;
  salesCharge: number;
  scheduledSalesCharge?: number;
}

declare interface IRequestFatca {
  noCertificate: boolean;
  usBorn: boolean;
  usPerson: boolean;
  malaysiaResident: boolean;
  certificate?: FileBase64;
}

declare interface IRequestCrs {
  taxResident: string;
  tin?: {
    country?: string;
    tinNumber?: string;
    noTin?: boolean;
  };
}
declare interface IRequestFea {
  malaysiaResident: boolean;
  domesticRinggitBorrowing: boolean;
  remainingBalance: string;
}

declare interface IRequestBank {
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;
  bankSwiftCode: string;
  currency: string[];
}

declare interface IRequestEmployment {
  grossAnnualIncome?: string;
  address: IAddressState;
  nameOfEmployer: string;
  natureOfBusiness: string;
  occupation: string;
}

declare interface ISetupClientAccountRequest {
  clientId: {
    principal: string;
    joint?: string;
  };
  clientEmail: {
    principal: string;
    joint?: string;
  };
  idVerification: {
    principalHolder: IRequestIDVerification;
    jointHolder?: IRequestIDVerification;
  };
  personalDetails: {
    principalHolder: IRequestPersonalDetails;
    jointHolder?: IRequestPersonalDetails;
  };
  epfDetails?: {
    principalHolder: {
      epfMemberNumber: string;
      epfAccountType: string;
    };
  };
  bankDetails: {
    principalHolder: {
      localBank: IRequestBank[];
      foreignBank?: IRequestBank[];
    };
  };
  employmentDetails: {
    principalHolder: IRequestEmployment;
    jointHolder?: IRequestEmployment;
  };
  fatca: {
    principalHolder: IRequestFatca;
    jointHolder?: IRequestFatca;
  };
  crs: {
    principalHolder: IRequestCrs;
    jointHolder?: IRequestCrs;
  };
  fea: {
    principalHolder: IRequestFea;
    jointHolder?: IRequestFea;
  };
  distributionInstruction: string;
  accountOperatingControl?: string;
  investments: IRequestInvestment[];
}

declare interface ISetupClientAccountResult extends IInvestmentSummary {}

declare interface ISetupClientAccountMutation {
  setupClientAccount: ISetupClientAccountResponse;
}

declare type ISetupClientAccountResponse = IMutationResponse<ISetupClientAccountResult> | undefined;
