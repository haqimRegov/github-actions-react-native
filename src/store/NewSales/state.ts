export interface INewSalesToast {
  toastText: string;
  toastVisible: boolean;
}
export type NewSalesState = {
  accountNo: string;
  disabledSteps: TypeNewSalesKey[];
  emailVerified?: boolean;
  finishedSteps: TypeNewSalesKey[];
  toast: INewSalesToast;
};

export const newSalesInitialState: NewSalesState = {
  accountNo: "",
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
};
