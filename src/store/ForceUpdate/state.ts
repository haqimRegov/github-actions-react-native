export type ForceUpdateState = {
  disabledSteps: TypeForceUpdateKey[];
  emailVerified?: boolean;
  finishedSteps: TypeForceUpdateKey[];
  showOpenAccount?: boolean;
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
  emailVerified: false,
  finishedSteps: [],
  showOpenAccount: false,
};
