export type OnboardingState = {
  disabledSteps: TypeOnboardingKey[];
  finishedSteps: TypeOnboardingKey[];
  riskInfo: IRiskProfile;
};

export const onboardingInitialState: OnboardingState = {
  disabledSteps: [
    "RiskAssessment",
    "Products",
    "PersonalInformation",
    "IdentityVerification",
    "PersonalDetails",
    "EmploymentDetails",
    "AdditionalDetails",
    "PersonalInfoSummary",
    "Declarations",
    "CRSDeclaration",
    "DeclarationSummary",
    "Acknowledgement",
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
};
