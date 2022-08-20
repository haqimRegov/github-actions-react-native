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
  transactionType: TTransactionType | undefined;
  riskInfo: IRiskProfile;
};

export const newSalesInitialState: NewSalesState = {
  accountDetails: {
    accountNo: "",
    authorisedSignatory: "",
    ampFund: undefined,
    fundType: "ut",
    isEpf: undefined,
    isRecurring: undefined,
    isSyariah: false,
    riskScore: "",
  },
  disabledSteps: [
    "AccountList",
    "RiskAssessment",
    "RiskSummary",
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
  transactionType: undefined,
  riskInfo: {
    appetite: "",
    profile: "",
    expectedRange: "",
    hnwStatus: "",
    type: "",
  },
};
