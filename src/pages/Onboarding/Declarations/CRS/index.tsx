import moment from "moment";
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
  const jointAge = moment().diff(joint?.personalDetails?.dateOfBirth, "years");

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
    updatedDisabledSteps.splice(findFea, 1);
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep(route);
  };

  const handleRead = () => {
    Alert.alert("Declaration");
  };

  const isTaxResidentPrincipal = principal?.declaration!.crs!.taxResident! === 0;
  const isNonTaxResidentPrincipal = principal?.declaration!.crs!.taxResident! === 1 || principal?.declaration!.crs!.taxResident! === 2;
  const isTinDeclaredPrincipal = principal?.declaration!.crs!.country !== "" && principal?.declaration!.crs!.tinNumber !== "";
  const noTinWithReasonPrincipal =
    principal?.declaration!.crs!.country !== "" &&
    principal?.declaration!.crs!.noTin === true &&
    (principal?.declaration!.crs!.reason === 0 || principal?.declaration!.crs!.reason === 1);
  const noTinOtherReasonPrincipal =
    principal?.declaration!.crs!.country !== "" &&
    principal?.declaration!.crs!.noTin === true &&
    principal?.declaration!.crs!.reason === 2 &&
    principal?.declaration!.crs!.explanation !== "";

  const isTaxResidentJoint = joint?.declaration!.crs!.taxResident! === 0;
  const isNonTaxResidentJoint = joint?.declaration!.crs!.taxResident! === 1 || joint?.declaration!.crs!.taxResident! === 2;
  const isTinDeclaredJoint = joint?.declaration!.crs!.country !== "" && joint?.declaration!.crs!.tinNumber !== "";
  const noTinWithReasonJoint =
    joint?.declaration!.crs!.country !== "" &&
    joint?.declaration!.crs!.noTin === true &&
    (joint?.declaration!.crs!.reason === 0 || joint?.declaration!.crs!.reason === 1);
  const noTinOtherReasonJoint =
    joint?.declaration!.crs!.country !== "" &&
    joint?.declaration!.crs!.noTin === true &&
    joint?.declaration!.crs!.reason === 2 &&
    joint?.declaration!.crs!.explanation !== "";

  const showTermsPrincipal =
    isTaxResidentPrincipal ||
    (isNonTaxResidentPrincipal && isTinDeclaredPrincipal) ||
    (isNonTaxResidentPrincipal && noTinWithReasonPrincipal) ||
    (isNonTaxResidentPrincipal && noTinOtherReasonPrincipal);

  const showTermsJoint =
    isTaxResidentJoint ||
    (isNonTaxResidentJoint && isTinDeclaredJoint) ||
    (isNonTaxResidentJoint && noTinWithReasonJoint) ||
    (isNonTaxResidentJoint && noTinOtherReasonJoint);

  const validationsPrincipal = { showTerms: showTermsPrincipal };
  const validationsJoint = { showTerms: showTermsJoint };

  const showButtonContinuePrincipal = showTermsPrincipal ? handleContinue : undefined;
  const showButtonContinueJoint = showTermsJoint ? handleContinue : undefined;

  const continueEnabledPrincipal =
    showTermsPrincipal && principal?.declaration!.crs!.acceptCrs && principal?.declaration!.crs!.explanationSaved;

  const continueEnabledJoint = showTermsJoint && joint?.declaration!.crs!.acceptCrs && joint?.declaration!.crs!.explanationSaved;

  const showButtonContinue =
    accountType === "Individual" ? showButtonContinuePrincipal : showButtonContinuePrincipal && showButtonContinueJoint;
  const continueEnabled = accountType === "Individual" ? continueEnabledPrincipal : continueEnabledPrincipal && continueEnabledJoint;

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
      {accountType === "Joint" && jointAge >= 18 ? (
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
