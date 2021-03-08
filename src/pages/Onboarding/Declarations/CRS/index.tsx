import React, { FunctionComponent } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, LinkText } from "../../../../components";
import { Language } from "../../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../../store";
import { borderBottomBlack21, fs12SemiBoldBlue1, px, sh24, sh8, sw24 } from "../../../../styles";
import { CrsDeclarationDetails } from "./Details";

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
    // TODO handle if FEA
    const isFea = true;
    const defaultRoute: TypeOnboardingRoute = isFea ? "FEADeclaration" : "DeclarationSummary";
    const route: TypeOnboardingRoute = personalInfo.editDeclaration === true ? "DeclarationSummary" : defaultRoute;
    if (isFea === true && personalInfo.editDeclaration === false) {
      addPersonalInfo({ ...personalInfo, editDeclaration: true });
    }
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findFea = updatedDisabledSteps.indexOf("FEADeclaration");
    if (findFea !== -1) {
      updatedDisabledSteps.splice(findFea, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep(route);
  };

  const handleRead = () => {
    Alert.alert("Declaration");
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
      subheading={DECLARATIONS.CRS_HEADING}>
      <CustomSpacer space={sh8} />
      <View style={px(sw24)}>
        <LinkText onPress={handleRead} text={DECLARATIONS.READ_DECLARATION} style={fs12SemiBoldBlue1} />
      </View>
      <CrsDeclarationDetails
        accountHolder="Principal"
        accountType={accountType}
        crs={principal?.declaration?.crs!}
        handleCrsDeclaration={handlePrincipalCrs}
        name={principal?.personalDetails?.name!}
        validations={validationsPrincipal}
      />
      {accountType === "Joint" ? (
        <View>
          <CustomSpacer space={sh24} />
          <View style={borderBottomBlack21} />
          <CrsDeclarationDetails
            accountHolder="Joint"
            accountType="Joint"
            crs={joint?.declaration?.crs!}
            name={joint?.personalDetails?.name!}
            handleCrsDeclaration={handleJointCrs}
            validations={validationsJoint}
          />
        </View>
      ) : null}
    </ContentPage>
  );
};

export const CrsDeclaration = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(CrsDeclarationComponent);
