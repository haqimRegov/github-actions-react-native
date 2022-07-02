export type ForceUpdateState = {
  disabledSteps: TypeForceUpdateKey[];
  emailVerified?: boolean;
  finishedSteps: TypeForceUpdateKey[];
};

export const forceUpdateInitialState: ForceUpdateState = {
  disabledSteps: [
    "ContactSummary",
    "RiskAssessment",
    "Declarations",
    "FATCADeclaration",
    "CRSDeclaration",
    "DeclarationSummary",
    "Acknowledgement",
    "TermsAndConditions",
    "Signatures",
  ],
  finishedSteps: [],
  emailVerified: false,
};
