export type ForceUpdateState = {
  disabledSteps: TypeForceUpdateKey[];
  declarations: string[];
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
  declarations: [],
  emailVerified: false,
  finishedSteps: [],
  showOpenAccount: false,
};
