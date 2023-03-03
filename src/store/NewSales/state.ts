export type NewSalesState = {
  accountDetails: INewSalesAccountDetails;
  disabledSteps: TypeNewSalesKey[];
  emailVerified?: boolean;
  finishedSteps: TypeNewSalesKey[];
  investorProfile: {
    principalClientId?: string;
    jointClientId?: string;
  };
  toast: string | undefined;
  transactionType: TTransactionType | undefined;
  riskInfo: IRiskProfile;
};

export const newSalesInitialState: NewSalesState = {
  accountDetails: {
    accountNo: "",
    authorisedSignatory: "",
    ampDetails: undefined,
    bankDetails: undefined,
    fundType: "ut",
    isBankDetailsRequired: false,
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
  toast: undefined,
  transactionType: undefined,
  riskInfo: {
    appetite: "",
    profile: "",
    expectedRange: "",
    hnwStatus: "",
    type: "",
  },
};
