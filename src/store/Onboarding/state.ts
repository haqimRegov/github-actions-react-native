export type OnboardingState = {
  disabledSteps: TypeOnboardingKey[];
  finishedSteps: TypeOnboardingKey[];
  riskInfo: IRiskProfile;
  toast: string | undefined;
};

export const onboardingInitialState: OnboardingState = {
  disabledSteps: [
    "RiskAssessment",
    "Products",
    "ProductsList",
    "ProductsConfirmation",
    "PersonalInformation",
    "EmailVerification",
    "IdentityVerification",
    "ContactDetails",
    "EmploymentDetails",
    "AdditionalDetails",
    "PersonalInfoSummary",
    "Declarations",
    "FATCADeclaration",
    "CRSDeclaration",
    "DeclarationSummary",
    "Acknowledgement",
    "OrderSummary",
    "TermsAndConditions",
    "Signatures",
    "Payment",
  ],
  finishedSteps: [],
  riskInfo: {
    appetite: "",
    expectedRange: "",
    hnwStatus: "",
    profile: "",
    type: "",
  },
  toast: undefined,
};
