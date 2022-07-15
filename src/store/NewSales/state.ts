export interface INewSalesToast {
  toastText: string;
  toastVisible: boolean;
}
export type NewSalesState = {
  accountDetails: INewSalesAccountDetails;
  disabledSteps: TypeNewSalesKey[];
  emailVerified?: boolean;
  finishedSteps: TypeNewSalesKey[];
  investorProfile: {
    principalClientId?: string;
    jointClientId?: string;
  };
  toast: INewSalesToast;
  riskInfo?: IRiskProfile;
};

export const newSalesInitialState: NewSalesState = {
  accountDetails: {
    accountNo: "",
    fundType: "ut",
    isEpf: undefined,
    isRecurring: undefined,
    riskScore: "",
  },
  disabledSteps: [
    "RiskAssessment",
    "Products",
    "ProductsList",
    "ProductsConfirmation",
    "AccountInformation",
    "IdentityVerification",
    "AdditionalDetails",
    "Summary",
    "Acknowledgement",
    "OrderPreview",
    "TermsAndConditions",
    "Signatures",
    "Payment",
  ],
  emailVerified: false,
  finishedSteps: [],
  investorProfile: {
    principalClientId: undefined,
    jointClientId: undefined,
  },
  toast: {
    toastVisible: false,
    toastText: "All changes saved",
  },
  riskInfo: undefined,
};
