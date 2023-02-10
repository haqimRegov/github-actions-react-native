import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { borderBottomRed1, flexRow, fs10RegGray6, fs12BoldBlack2, fs18BoldGray6, px, sh16, sh24, sw16, sw24 } from "../../../styles";
import { CrsDeclarationDetails, CRSDefinition } from "../../../templates";

const { DECLARATIONS } = Language.PAGE;

interface CrsDeclarationProps extends PersonalInfoStoreProps, OnboardingContentProps {}

export const CrsDeclarationComponent: FunctionComponent<CrsDeclarationProps> = ({
  accountType,
  addPersonalInfo,
  handleNextStep,
  onboarding,
  personalInfo,
  updateOnboarding,
}: CrsDeclarationProps) => {
  const [crsDefinition, setCRSDefinition] = useState<boolean>(false);
  const { principal, joint } = personalInfo;

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
    // const defaultRoute: TypeOnboardingKey = "DeclarationSummary";
    const route: TypeOnboardingKey = "DeclarationSummary";
    if (personalInfo.editDeclaration === false) {
      addPersonalInfo({ ...personalInfo, editDeclaration: true });
    }
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findDeclarationSummary = updatedDisabledSteps.indexOf("DeclarationSummary");
    if (findDeclarationSummary !== -1) {
      updatedDisabledSteps.splice(findDeclarationSummary, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep(route);
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

  const showTermsPrincipal = isTaxResidentPrincipal || validateTin(principal!.declaration!.crs!.tin!);

  const showTermsJoint = isTaxResidentJoint || validateTin(joint?.declaration!.crs!.tin!);

  const validationsPrincipal = { showTerms: showTermsPrincipal };
  const validationsJoint = { showTerms: showTermsJoint };

  const showButtonContinuePrincipal = showTermsPrincipal ? handleContinue : undefined;
  const showButtonContinueJoint = showTermsJoint ? handleContinue : undefined;

  const continueEnabledPrincipal =
    showTermsPrincipal &&
    principal?.declaration!.crs!.acceptCrs &&
    principal?.declaration!.crs!.tin!.map((tin) => tin.explanationSaved === true).includes(false) === false;

  const continueEnabledJoint =
    showTermsJoint &&
    joint?.declaration!.crs!.acceptCrs &&
    joint?.declaration!.crs!.tin!.map((tin) => tin.explanationSaved === true).includes(false) === false;

  const showButtonContinue = accountType === "Joint" ? showButtonContinuePrincipal && showButtonContinueJoint : showButtonContinuePrincipal;
  const continueEnabled = accountType === "Joint" ? continueEnabledPrincipal && continueEnabledJoint : continueEnabledPrincipal;

  const handleBack = () => {
    handleNextStep("FATCADeclaration");
  };

  return (
    <ContentPage
      continueDisabled={!continueEnabled}
      handleCancel={handleBack}
      handleContinue={showButtonContinue}
      labelContinue={DECLARATIONS.BUTTON_ACCEPT}
      subheading={DECLARATIONS.CRS_HEADING}
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
      <CrsDeclarationDetails
        crs={principal?.declaration?.crs!}
        handleCrsDeclaration={handlePrincipalCrs}
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
          <CrsDeclarationDetails crs={joint?.declaration?.crs!} handleCrsDeclaration={handleJointCrs} validations={validationsJoint} />
        </View>
      ) : null}
      {crsDefinition ? <CRSDefinition setVisible={setCRSDefinition} visible={crsDefinition} /> : null}
    </ContentPage>
  );
};

export const CrsDeclaration = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(CrsDeclarationComponent);
