import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { borderBottomRed1, flexRow, fs10RegGray6, fs12BoldBlack2, fs18BoldGray6, px, sh16, sh24, sw16, sw24 } from "../../../styles";
import { FatcaDeclarationDetails } from "../../../templates";

const { DECLARATIONS } = Language.PAGE;

interface FatcaDeclarationProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const FatcaDeclarationComponent: FunctionComponent<FatcaDeclarationProps> = ({
  accountType,
  addPersonalInfo,
  handleNextStep,
  onboarding,
  personalInfo,
  updateOnboarding,
}: FatcaDeclarationProps) => {
  const { principal, joint } = personalInfo;
  const principalAddress = `${Object.values(principal?.addressInformation?.permanentAddress?.address!).join("")}, ${
    principal?.addressInformation?.permanentAddress?.postCode
  }, ${principal?.addressInformation?.permanentAddress?.city}, ${principal?.addressInformation?.permanentAddress?.state}, ${
    principal?.addressInformation?.permanentAddress?.country
  }`;
  const jointAddress = `${Object.values(joint?.addressInformation?.permanentAddress?.address!).join("")}, ${
    joint?.addressInformation?.permanentAddress?.postCode
  }, ${joint?.addressInformation?.permanentAddress?.city}, ${joint?.addressInformation?.permanentAddress?.state}, ${
    joint?.addressInformation?.permanentAddress?.country
  }`;

  const handlePrincipalFatca = (fatcaDeclaration: IFatcaState) => {
    addPersonalInfo({
      ...personalInfo,
      principal: { declaration: { ...personalInfo.principal!.declaration, fatca: { ...fatcaDeclaration } } },
    });
  };

  const handleJointFatca = (fatcaDeclaration: IFatcaState) => {
    addPersonalInfo({
      ...personalInfo,
      joint: { declaration: { ...personalInfo.joint!.declaration, fatca: { ...fatcaDeclaration } } },
    });
  };

  const handleContinue = () => {
    const route: TypeOnboardingKey = personalInfo.editDeclaration === true ? "DeclarationSummary" : "CRSDeclaration";
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findCrs = updatedDisabledSteps.indexOf("CRSDeclaration");
    if (findCrs !== -1) {
      updatedDisabledSteps.splice(findCrs, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep(route);
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

  const citizenNoBornNoJoint = joint?.declaration!.fatca!.usCitizen === 1 && joint?.declaration!.fatca!.usBorn === 1;
  const citizenNoBornYesJoint = joint?.declaration!.fatca!.usCitizen === 1 && joint?.declaration!.fatca!.usBorn === 0;
  const uploadYesAddressYesJoint = joint?.declaration!.fatca!.certificate !== undefined && joint?.declaration!.fatca!.confirmAddress === 0;
  const uploadYesAddressNoJoint = joint?.declaration!.fatca!.certificate !== undefined && joint?.declaration!.fatca!.confirmAddress === 1;
  const uploadNoLostYesJoint = joint?.declaration!.fatca!.noCertificate === true && joint?.declaration!.fatca!.reason === 0;
  const uploadNoLostYesAddressYesJoint = uploadNoLostYesJoint && joint?.declaration!.fatca!.confirmAddress === 0;
  const uploadNoLostYesAddressNoJoint = uploadNoLostYesJoint && joint?.declaration!.fatca!.confirmAddress === 1;
  const uploadNoLostNoJoint =
    joint?.declaration!.fatca!.noCertificate === true &&
    joint?.declaration!.fatca!.reason === 1 &&
    joint?.declaration!.fatca!.explanation !== "";
  const uploadNoLostNoAddressYesJoint = uploadNoLostNoJoint && joint?.declaration!.fatca!.confirmAddress === 0;
  const uploadNoLostNoAddressNoJoint = uploadNoLostNoJoint && joint?.declaration!.fatca!.confirmAddress === 1;

  const showTermsPrincipal =
    (principal?.declaration!.fatca!.usCitizen === 0 && principal?.declaration!.fatca!.formW9) ||
    citizenNoBornNoPrincipal ||
    (citizenNoBornYesPrincipal && uploadYesAddressNoPrincipal) ||
    (citizenNoBornYesPrincipal && uploadYesAddressYesPrincipal && principal?.declaration!.fatca!.formW8Ben) ||
    (citizenNoBornYesPrincipal && uploadNoLostYesAddressNoPrincipal) ||
    (citizenNoBornYesPrincipal && uploadNoLostYesAddressYesPrincipal && principal?.declaration!.fatca!.formW8Ben) ||
    (citizenNoBornYesPrincipal && uploadNoLostNoAddressNoPrincipal) ||
    (citizenNoBornYesPrincipal && uploadNoLostNoAddressYesPrincipal && principal?.declaration!.fatca!.formW8Ben);

  const showTermsJoint =
    (joint?.declaration!.fatca!.usCitizen === 0 && joint?.declaration!.fatca!.formW9) ||
    citizenNoBornNoJoint ||
    (citizenNoBornYesJoint && uploadYesAddressNoJoint) ||
    (citizenNoBornYesJoint && uploadYesAddressYesJoint && joint?.declaration!.fatca!.formW8Ben) ||
    (citizenNoBornYesJoint && uploadNoLostYesAddressNoJoint) ||
    (citizenNoBornYesJoint && uploadNoLostYesAddressYesJoint && joint?.declaration!.fatca!.formW8Ben) ||
    (citizenNoBornYesJoint && uploadNoLostNoAddressNoJoint) ||
    (citizenNoBornYesJoint && uploadNoLostNoAddressYesJoint && joint?.declaration!.fatca!.formW8Ben);

  const showButtonContinuePrincipal = showTermsPrincipal ? handleContinue : undefined;
  const continueEnabledPrincipal =
    showTermsPrincipal && principal?.declaration!.fatca!.acceptFatca && principal?.declaration!.fatca!.explanationSaved;
  const showButtonContinueJoint = showTermsJoint ? handleContinue : undefined;
  const continueEnabledJoint = showTermsJoint && joint?.declaration!.fatca!.acceptFatca && joint?.declaration!.fatca!.explanationSaved;

  const validationsPrincipal = {
    citizenNoBornYes: citizenNoBornYesPrincipal,
    showTerms: showTermsPrincipal === true,
    uploadNoLostNo: uploadNoLostNoPrincipal,
    uploadNoLostNoAddressYes: uploadNoLostNoAddressYesPrincipal,
    uploadNoLostYes: uploadNoLostYesPrincipal,
    uploadNoLostYesAddressYes: uploadNoLostYesAddressYesPrincipal,
    uploadYesAddressYes: uploadYesAddressYesPrincipal,
  };

  const validationsJoint = {
    citizenNoBornYes: citizenNoBornYesJoint,
    showTerms: showTermsJoint === true,
    uploadNoLostNo: uploadNoLostNoJoint,
    uploadNoLostNoAddressYes: uploadNoLostNoAddressYesJoint,
    uploadNoLostYes: uploadNoLostYesJoint,
    uploadNoLostYesAddressYes: uploadNoLostYesAddressYesJoint,
    uploadYesAddressYes: uploadYesAddressYesJoint,
  };

  const showButtonContinue = accountType === "Joint" ? showButtonContinuePrincipal && showButtonContinueJoint : showButtonContinuePrincipal;
  const continueEnabled = accountType === "Joint" ? continueEnabledPrincipal && continueEnabledJoint : continueEnabledPrincipal;

  const handleBack = () => {
    handleNextStep("PersonalInfoSummary");
  };

  return (
    <ContentPage
      continueDisabled={!continueEnabled}
      handleCancel={handleBack}
      handleContinue={showButtonContinue}
      labelContinue={DECLARATIONS.BUTTON_ACCEPT}
      subheading={DECLARATIONS.FATCA_HEADING}
      subheadingStyle={fs18BoldGray6}>
      {accountType === "Joint" ? (
        <Fragment>
          <CustomSpacer space={sh16} />
          <View style={px(sw24)}>
            <View style={flexRow}>
              <Text style={fs10RegGray6}>{DECLARATIONS.LABEL_PRINCIPAL_HOLDER}</Text>
              <CustomSpacer isHorizontal space={sw16} />
              <Text style={fs12BoldBlack2}>{principal?.personalDetails?.name}</Text>
            </View>
            <View style={borderBottomRed1} />
          </View>
        </Fragment>
      ) : null}
      <FatcaDeclarationDetails
        address={principalAddress}
        fatca={principal?.declaration?.fatca!}
        handleFatcaDeclaration={handlePrincipalFatca}
        validations={validationsPrincipal}
      />
      {accountType === "Joint" ? (
        <View>
          <CustomSpacer space={sh24} />
          <View style={px(sw24)}>
            <View style={flexRow}>
              <Text style={fs10RegGray6}>{DECLARATIONS.LABEL_JOINT_HOLDER}</Text>
              <CustomSpacer isHorizontal space={sw16} />
              <Text style={fs12BoldBlack2}>{joint?.personalDetails?.name}</Text>
            </View>
            <View style={borderBottomRed1} />
          </View>
          <FatcaDeclarationDetails
            address={jointAddress}
            fatca={joint?.declaration?.fatca!}
            handleFatcaDeclaration={handleJointFatca}
            validations={validationsJoint}
          />
        </View>
      ) : null}
    </ContentPage>
  );
};

export const FatcaDeclaration = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(FatcaDeclarationComponent);