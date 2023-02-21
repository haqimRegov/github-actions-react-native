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
  client,
  addPersonalInfo,
  handleNextStep,
  onboarding,
  personalInfo,
  updateOnboarding,
}: FatcaDeclarationProps) => {
  const { disabledSteps, finishedSteps } = onboarding;
  const { editMode, principal, joint } = personalInfo;
  const { details } = client;
  const { principalHolder: principalClient, jointHolder: jointClient } = details!;
  const { isEtb: isPrincipalEtb } = principalClient!;
  const { isEtb: isJointEtb } = jointClient!;
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
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];

    // add to finishedSteps
    if (updatedFinishedSteps.includes("FATCADeclaration") === false) {
      updatedFinishedSteps.push("FATCADeclaration");
    }
    // remove in disabledSteps if edit mode
    if (editMode === true) {
      const findDeclarationsSummary = updatedDisabledSteps.indexOf("DeclarationSummary");

      if (findDeclarationsSummary !== -1) {
        updatedDisabledSteps.splice(findDeclarationsSummary, 1);
      }
      addPersonalInfo({ ...personalInfo, editMode: false });
    }

    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps });

    const route: TypeOnboardingKey = editMode === true ? "DeclarationSummary" : "CRSDeclaration";
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
    isPrincipalEtb === false
      ? (principal?.declaration!.fatca!.usCitizen === 0 && principal?.declaration!.fatca!.formW9) ||
        citizenNoBornNoPrincipal ||
        (citizenNoBornYesPrincipal && uploadYesAddressNoPrincipal) ||
        (citizenNoBornYesPrincipal && uploadYesAddressYesPrincipal && principal?.declaration!.fatca!.formW8Ben) ||
        (citizenNoBornYesPrincipal && uploadNoLostYesAddressNoPrincipal) ||
        (citizenNoBornYesPrincipal && uploadNoLostYesAddressYesPrincipal && principal?.declaration!.fatca!.formW8Ben) ||
        (citizenNoBornYesPrincipal && uploadNoLostNoAddressNoPrincipal) ||
        (citizenNoBornYesPrincipal && uploadNoLostNoAddressYesPrincipal && principal?.declaration!.fatca!.formW8Ben)
      : true;

  const showTermsJoint =
    isJointEtb === false
      ? (joint?.declaration!.fatca!.usCitizen === 0 && joint?.declaration!.fatca!.formW9) ||
        citizenNoBornNoJoint ||
        (citizenNoBornYesJoint && uploadYesAddressNoJoint) ||
        (citizenNoBornYesJoint && uploadYesAddressYesJoint && joint?.declaration!.fatca!.formW8Ben) ||
        (citizenNoBornYesJoint && uploadNoLostYesAddressNoJoint) ||
        (citizenNoBornYesJoint && uploadNoLostYesAddressYesJoint && joint?.declaration!.fatca!.formW8Ben) ||
        (citizenNoBornYesJoint && uploadNoLostNoAddressNoJoint) ||
        (citizenNoBornYesJoint && uploadNoLostNoAddressYesJoint && joint?.declaration!.fatca!.formW8Ben)
      : true;

  const continueEnabledPrincipal =
    isPrincipalEtb === false
      ? showTermsPrincipal && principal?.declaration!.fatca!.acceptFatca && principal?.declaration!.fatca!.explanationSaved
      : true;
  const continueEnabledJoint =
    isJointEtb === false ? showTermsJoint && joint?.declaration!.fatca!.acceptFatca && joint?.declaration!.fatca!.explanationSaved : true;

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

  const checkButtonContinue = accountType === "Joint" ? showTermsPrincipal && showTermsJoint : showTermsPrincipal;
  const buttonContinue = checkButtonContinue === true ? handleContinue : undefined;
  const continueEnabled = accountType === "Joint" ? continueEnabledPrincipal && continueEnabledJoint : continueEnabledPrincipal;

  const handleBack = () => {
    handleNextStep("PersonalInfoSummary");
  };

  return (
    <ContentPage
      cancelDisabled={editMode === true}
      continueDisabled={!continueEnabled}
      handleCancel={handleBack}
      handleContinue={buttonContinue}
      labelContinue={DECLARATIONS.BUTTON_ACCEPT}
      subheading={DECLARATIONS.FATCA_HEADING}
      subheadingStyle={fs18BoldGray6}>
      {accountType === "Joint" && isPrincipalEtb === false ? (
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
      {isPrincipalEtb === false ? (
        <FatcaDeclarationDetails
          address={principalAddress}
          fatca={principal?.declaration?.fatca!}
          handleFatcaDeclaration={handlePrincipalFatca}
          validations={validationsPrincipal}
        />
      ) : null}
      {accountType === "Joint" && isJointEtb === false ? (
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
