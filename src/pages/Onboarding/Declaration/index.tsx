import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { ContentPage } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { JointDeclaration } from "./Joint";
import { PrincipalDeclaration } from "./Principal";

const { DECLARATION } = Language.PAGE;

interface DeclarationProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const DeclarationComponent: FunctionComponent<DeclarationProps> = ({
  accountType,
  addPersonalInfo,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
}: DeclarationProps) => {
  // TODO Note for FATCA from FRS
  // TODO US Citizen will be populated from Nationality
  // TODO Section Logic: This will not appear for the joint holder if joint holder is below 18 years old.

  // TODO Note for CRS from FRS
  // TODO Section Logic: This will not appear if EPF investment is selected.
  // TODO Section Logic: This will not appear for the joint holder if joint holder is below 18 years old.
  // TODO Add Additional TaxNumber only when Non-Malaysian.
  // TODO Question: If add additional TaxNumber, User then will need to answer Q2, Q3 and Q4 again. Why give the No TaxNumber choice if they are adding another TaxNumber?

  // TODO Note for FEA
  // TODO Section Logic: The user will only answer this section if the fund currency purchased in Section 3.3.1 is non-MYR referring to the column “Fund Base Currency” in Master Fund List and this section will not appear if EPF investment is selected
  // TODO Section Logic: This section will not appear for the joint holder if joint holder is below 18 years old.

  const { joint, principal } = personalInfo!;

  const handleSubmit = () => {
    handleNextStep("Summary");
    addPersonalInfo({ ...personalInfo, editMode: true });
  };

  const handleJointDeclaration = (value: IDeclarationState) => {
    addPersonalInfo({ ...personalInfo, joint: { ...joint, declaration: { ...joint?.declaration, ...value } } });
  };

  const handlePrincipalDeclaration = (value: IDeclarationState) => {
    addPersonalInfo({ ...personalInfo, principal: { ...principal, declaration: { ...principal?.declaration, ...value } } });
  };

  return (
    <ContentPage handleCancel={handleCancelOnboarding!} handleContinue={handleSubmit} labelContinue={DECLARATION.BUTTON_AGREE}>
      <PrincipalDeclaration
        accountType={accountType}
        epfInvestment={personalInfo.epfInvestment!}
        declaration={principal!.declaration!}
        personalDetails={principal!.personalDetails!}
        setDeclaration={handlePrincipalDeclaration}
      />
      <JointDeclaration
        declaration={joint!.declaration!}
        epfInvestment={personalInfo.epfInvestment!}
        personalDetails={joint!.personalDetails!}
        setDeclaration={handleJointDeclaration}
      />
    </ContentPage>
  );
};

export const Declaration = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(DeclarationComponent);
