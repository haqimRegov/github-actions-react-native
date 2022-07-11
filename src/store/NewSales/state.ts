export interface INewSalesToast {
  toastText: string;
  toastVisible: boolean;
}
export type NewSalesState = {
  accountDetails: INewSalesAccountDetails;
  disabledSteps: TypeNewSalesKey[];
  emailVerified?: boolean;
  finishedSteps: TypeNewSalesKey[];
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
    "Acknowledgement",
    "AdditionalDetails",
    "IdentityVerification",
    "OrderPreview",
    "Payment",
    "ProductsList",
    "ProductsConfirmation",
    "RiskAssessment",
    "Signatures",
    "Summary",
    "TermsAndConditions",
  ],
  emailVerified: false,
  finishedSteps: [],
  toast: {
    toastVisible: false,
    toastText: "All changes saved",
  },
  riskInfo: undefined,
};
