import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { borderBottomRed1, flexRow, fs10RegGray6, fs12BoldBlack2, fs18BoldGray6, px, sh16, sh24, sw16, sw24 } from "../../../styles";
import { CrsDeclarationDetails } from "../../../templates";

const { DECLARATIONS } = Language.PAGE;

interface CrsDeclarationProps extends PersonalInfoStoreProps, OnboardingContentProps {}

export const CrsDeclarationComponent: FunctionComponent<CrsDeclarationProps> = ({
  accountType,
  client,
  addPersonalInfo,
  handleNextStep,
  onboarding,
  personalInfo,
  updateOnboarding,
}: CrsDeclarationProps) => {
  const { disabledSteps, finishedSteps } = onboarding;
  const { editMode, principal, joint } = personalInfo;
  const { details } = client;
  const { principalHolder: principalClient, jointHolder: jointClient } = details!;
  const { isEtb: isPrincipalEtb } = principalClient!;
  const { isEtb: isJointEtb } = jointClient!;

  const handlePrincipalCrs = (crsDeclaration: ICrsState) => {
    addPersonalInfo({
      ...personalInfo,
      principal: { declaration: { ...personalInfo.principal!.declaration, crs: { ...crsDeclaration } } },
    });
  };

  const handleJointCrs = (crsDeclaration: ICrsState) => {
    addPersonalInfo({
      ...personalInfo,
      joint: { declaration: { ...personalInfo.joint!.declaration, crs: { ...crsDeclaration } } },
    });
  };

  const handleContinue = () => {
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];

    // add to finishedSteps
    if (updatedFinishedSteps.includes("CRSDeclaration") === false) {
      updatedFinishedSteps.push("CRSDeclaration");
    }

    // remove from disabledSteps (next step)
    const findDeclarationsSummary = updatedDisabledSteps.indexOf("DeclarationSummary");
    if (findDeclarationsSummary !== -1) {
      updatedDisabledSteps.splice(findDeclarationsSummary, 1);
    }
    // remove in disabledSteps if edit mode
    if (editMode === true) {
      addPersonalInfo({ ...personalInfo, editMode: false });
    }

    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps, finishedSteps: updatedFinishedSteps });

    handleNextStep("DeclarationSummary");
  };

  const isTaxResidentPrincipal = principal?.declaration!.crs!.taxResident! === 0;
  const validateTin = (multipleTin: ITinMultiple[]) =>
    multipleTin
      .map(
        (tin) =>
          tin.country !== "" &&
          ((tin.noTin === false && tin.tinNumber !== "") ||
            (tin.noTin === true && (tin.reason === 0 || tin.reason === 1 || (tin.reason === 2 && tin.explanation !== "")))),
      )
      .includes(false) === false;

  const isTaxResidentJoint = joint?.declaration!.crs!.taxResident! === 0;

  const showTermsPrincipal = isPrincipalEtb === false ? isTaxResidentPrincipal || validateTin(principal!.declaration!.crs!.tin!) : true;

  const showTermsJoint = isJointEtb === false ? isTaxResidentJoint || validateTin(joint?.declaration!.crs!.tin!) : true;

  const validationsPrincipal = { showTerms: showTermsPrincipal };
  const validationsJoint = { showTerms: showTermsJoint };

  const continueEnabledPrincipal =
    isPrincipalEtb === false
      ? showTermsPrincipal &&
        principal?.declaration!.crs!.acceptCrs &&
        principal?.declaration!.crs!.tin!.map((tin) => tin.explanationSaved === true).includes(false) === false
      : true;

  const continueEnabledJoint =
    isJointEtb === false
      ? showTermsJoint &&
        joint?.declaration!.crs!.acceptCrs &&
        joint?.declaration!.crs!.tin!.map((tin) => tin.explanationSaved === true).includes(false) === false
      : true;

  const checkButtonContinue = accountType === "Joint" ? showTermsPrincipal && showTermsJoint : showTermsPrincipal;
  const buttonContinue = checkButtonContinue === true ? handleContinue : undefined;
  const continueEnabled = accountType === "Joint" ? continueEnabledPrincipal && continueEnabledJoint : continueEnabledPrincipal;

  const handleBack = () => {
    handleNextStep("FATCADeclaration");
  };

  return (
    <ContentPage
      cancelDisabled={editMode === true}
      continueDisabled={!continueEnabled}
      handleCancel={handleBack}
      handleContinue={buttonContinue}
      labelContinue={DECLARATIONS.BUTTON_ACCEPT}
      subheading={DECLARATIONS.CRS_HEADING}
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
        <CrsDeclarationDetails
          crs={principal?.declaration?.crs!}
          handleCrsDeclaration={handlePrincipalCrs}
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
          <CrsDeclarationDetails crs={joint?.declaration?.crs!} handleCrsDeclaration={handleJointCrs} validations={validationsJoint} />
        </View>
      ) : null}
    </ContentPage>
  );
};

export const CrsDeclaration = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(CrsDeclarationComponent);
