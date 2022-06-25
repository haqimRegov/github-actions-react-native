import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, LinkText } from "../../../../components";
import { Language } from "../../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../../store";
import { fs12SemiBoldBlue1, fs18BoldGray6, px, sh48, sh8, sw24 } from "../../../../styles";
import { FatcaDefinition } from "../../../Onboarding/Declarations/FATCA/FatcaDefinition";
import { FatcaDeclarationDetails } from "./Details";

const { DECLARATIONS } = Language.PAGE;

interface FatcaDeclarationProps extends PersonalInfoStoreProps, ForceUpdateContentProps {}

const FATCAContentComponent: FunctionComponent<FatcaDeclarationProps> = ({
  addPersonalInfo,
  handleNextStep,
  forceUpdate,
  personalInfo,
  updateForceUpdate,
}: FatcaDeclarationProps) => {
  const { principal } = personalInfo;
  const [fatcaDefinition, setFatcaDefinition] = useState<boolean>(false);

  const principalAddress = `${Object.values(principal?.addressInformation?.permanentAddress?.address!).join("")}, ${
    principal?.addressInformation?.permanentAddress?.postCode
  }, ${principal?.addressInformation?.permanentAddress?.city}, ${principal?.addressInformation?.permanentAddress?.state}, ${
    principal?.addressInformation?.permanentAddress?.country
  }`;

  const handlePrincipalFatca = (fatcaDeclaration: IFatcaState) => {
    addPersonalInfo({
      ...personalInfo,
      principal: { declaration: { ...personalInfo.principal!.declaration, fatca: { ...fatcaDeclaration } } },
    });
  };

  const handleContinue = () => {
    const route: TypeForceUpdateRoute = personalInfo.editDeclaration === true ? "DeclarationSummary" : "CRSDeclaration";
    const updatedDisabledSteps: TypeForceUpdateKey[] = [...forceUpdate.disabledSteps];
    const findCrs = updatedDisabledSteps.indexOf("CRSDeclaration");
    if (findCrs !== -1) {
      updatedDisabledSteps.splice(findCrs, 1);
    }
    updateForceUpdate({ ...forceUpdate, disabledSteps: updatedDisabledSteps });
    handleNextStep(route);
  };

  const handleRead = () => {
    setFatcaDefinition(true);
  };

  const citizenNoBornNoPrincipal = principal?.declaration!.fatca!.usCitizen === 1 && principal?.declaration!.fatca!.usBorn === 1;
  const citizenNoBornYesPrincipal = principal?.declaration!.fatca!.usCitizen === 1 && principal?.declaration!.fatca!.usBorn === 0;
  const uploadYesAddressYesPrincipal =
    principal?.declaration!.fatca!.certificate !== undefined && principal?.declaration!.fatca!.confirmAddress === 0;
  const uploadYesAddressNoPrincipal =
    principal?.declaration!.fatca!.certificate !== undefined && principal?.declaration!.fatca!.confirmAddress === 1;
  const uploadNoLostYesPrincipal = principal?.declaration!.fatca!.noCertificate === true && principal?.declaration!.fatca!.reason === 0;
  const uploadNoLostYesAddressYesPrincipal = uploadNoLostYesPrincipal && principal?.declaration!.fatca!.confirmAddress === 0;
  const uploadNoLostYesAddressNoPrincipal = uploadNoLostYesPrincipal && principal?.declaration!.fatca!.confirmAddress === 1;
  const uploadNoLostNoPrincipal =
    principal?.declaration!.fatca!.noCertificate === true &&
    principal?.declaration!.fatca!.reason === 1 &&
    principal?.declaration!.fatca!.explanation !== "";
  const uploadNoLostNoAddressYesPrincipal = uploadNoLostNoPrincipal && principal?.declaration!.fatca!.confirmAddress === 0;
  const uploadNoLostNoAddressNoPrincipal = uploadNoLostNoPrincipal && principal?.declaration!.fatca!.confirmAddress === 1;

  const showTermsPrincipal =
    (principal?.declaration!.fatca!.usCitizen === 0 && principal?.declaration!.fatca!.formW9) ||
    citizenNoBornNoPrincipal ||
    (citizenNoBornYesPrincipal && uploadYesAddressNoPrincipal) ||
    (citizenNoBornYesPrincipal && uploadYesAddressYesPrincipal && principal?.declaration!.fatca!.formW8Ben) ||
    (citizenNoBornYesPrincipal && uploadNoLostYesAddressNoPrincipal) ||
    (citizenNoBornYesPrincipal && uploadNoLostYesAddressYesPrincipal && principal?.declaration!.fatca!.formW8Ben) ||
    (citizenNoBornYesPrincipal && uploadNoLostNoAddressNoPrincipal) ||
    (citizenNoBornYesPrincipal && uploadNoLostNoAddressYesPrincipal && principal?.declaration!.fatca!.formW8Ben);

  const continueEnabledPrincipal =
    showTermsPrincipal && principal?.declaration!.fatca!.acceptFatca && principal?.declaration!.fatca!.explanationSaved;

  const validationsPrincipal = {
    citizenNoBornYes: citizenNoBornYesPrincipal,
    showTerms: showTermsPrincipal === true,
    uploadNoLostNo: uploadNoLostNoPrincipal,
    uploadNoLostNoAddressYes: uploadNoLostNoAddressYesPrincipal,
    uploadNoLostYes: uploadNoLostYesPrincipal,
    uploadNoLostYesAddressYes: uploadNoLostYesAddressYesPrincipal,
    uploadYesAddressYes: uploadYesAddressYesPrincipal,
  };

  const continueEnabled = continueEnabledPrincipal;

  const handleBack = () => {
    handleNextStep("RiskAssessment");
  };

  const defaultContentProps = {
    spaceToBottom: sh48,
    subheadingStyle: fs18BoldGray6,
  };

  return (
    <ContentPage
      continueDisabled={!continueEnabled}
      handleCancel={handleBack}
      handleContinue={handleContinue}
      labelContinue={DECLARATIONS.BUTTON_ACCEPT_SAVE}
      subheading={DECLARATIONS.FATCA_HEADING}
      {...defaultContentProps}>
      <CustomSpacer space={sh8} />
      <View style={px(sw24)}>
        <LinkText onPress={handleRead} text={DECLARATIONS.READ_FATCA} style={fs12SemiBoldBlue1} />
      </View>
      <FatcaDeclarationDetails
        address={principalAddress}
        fatca={principal?.declaration?.fatca!}
        handleFatcaDeclaration={handlePrincipalFatca}
        validations={validationsPrincipal}
      />
      {fatcaDefinition ? <FatcaDefinition setVisible={setFatcaDefinition} visible={fatcaDefinition} /> : null}
    </ContentPage>
  );
};

export const FATCAContent = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(FATCAContentComponent);
