export type OnboardingState = {
  disabledSteps: TypeOnboardingKey[];
  finishedSteps: TypeOnboardingKey[];
};

export const onboardingInitialState: OnboardingState = {
  disabledSteps: [
    "Products",
    "PersonalInformation",
    "IdentityVerification",
    "PersonalDetails",
    "EmploymentDetails",
    "PersonalInfoSummary",
    "Declarations",
    "FEADeclaration",
    "CRSDeclaration",
    "DeclarationSummary",
    "Acknowledgement",
    "TermsAndConditions",
    "Signatures",
    "Payment",
  ],
  finishedSteps: [],
};
