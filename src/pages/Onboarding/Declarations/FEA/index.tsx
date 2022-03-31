import React, { FunctionComponent } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, LinkText } from "../../../../components";
import { Language } from "../../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../../store";
import { borderBottomGray2, fs12SemiBoldBlue1, px, sh24, sh8, sw24 } from "../../../../styles";
import { FeaDeclarationDetails } from "./Details";

const { DECLARATIONS } = Language.PAGE;

interface FeaDeclarationProps extends PersonalInfoStoreProps, OnboardingContentProps {}

export const FeaDeclarationComponent: FunctionComponent<FeaDeclarationProps> = ({
  accountType,
  addPersonalInfo,
  handleNextStep,
  onboarding,
  personalInfo,
  updateOnboarding,
}: FeaDeclarationProps) => {
  const { principal, joint } = personalInfo;

  const handlePrincipalFea = (feaDeclaration: IFeaState) => {
    addPersonalInfo({
      ...personalInfo,
      principal: { declaration: { ...personalInfo.principal!.declaration, fea: { ...feaDeclaration } } },
    });
  };

  const handleJointFea = (feaDeclaration: IFeaState) => {
    addPersonalInfo({
      ...personalInfo,
      joint: { declaration: { ...personalInfo.joint!.declaration, fea: { ...feaDeclaration } } },
    });
  };

  const handleContinue = () => {
    // TODO handle if FEA
    const isFea = true;
    if (isFea === true && personalInfo.editDeclaration === false) {
      addPersonalInfo({ ...personalInfo, editDeclaration: true });
    }
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findDeclarationSummary = updatedDisabledSteps.indexOf("DeclarationSummary");
    if (findDeclarationSummary !== -1) {
      updatedDisabledSteps.splice(findDeclarationSummary, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep("DeclarationSummary");
  };

  const handleRead = () => {
    Alert.alert("Declaration");
  };

  const handleBack = () => {
    handleNextStep("CRSDeclaration");
  };

  const validationsPrincipal =
    principal?.declaration!.fea!.acceptFea &&
    principal?.declaration!.fea!.resident !== -1 &&
    principal?.declaration!.fea!.facility !== -1 &&
    principal?.declaration!.fea!.balance !== "" &&
    principal?.declaration!.fea!.balanceError === undefined;

  const validationsJoint =
    joint?.declaration!.fea!.acceptFea &&
    joint?.declaration!.fea!.resident !== -1 &&
    joint?.declaration!.fea!.facility !== -1 &&
    principal?.declaration!.fea!.balance !== "" &&
    principal?.declaration!.fea!.balanceError === undefined;

  const continueEnabled = accountType === "Joint" ? validationsPrincipal && validationsJoint : validationsPrincipal;

  return (
    <ContentPage
      continueDisabled={!continueEnabled}
      handleCancel={handleBack}
      handleContinue={handleContinue}
      labelContinue={DECLARATIONS.BUTTON_ACCEPT}
      subheading={DECLARATIONS.FEA_HEADING}>
      <CustomSpacer space={sh8} />
      <View style={px(sw24)}>
        <LinkText onPress={handleRead} text={DECLARATIONS.READ_FEA} style={fs12SemiBoldBlue1} />
      </View>
      <FeaDeclarationDetails
        accountHolder="Principal"
        accountType={accountType}
        fea={principal?.declaration?.fea!}
        handleFeaDeclaration={handlePrincipalFea}
        name={principal?.personalDetails?.name!}
      />
      {accountType === "Joint" ? (
        <View>
          <CustomSpacer space={sh24} />
          <View style={borderBottomGray2} />
          <FeaDeclarationDetails
            accountHolder="Joint"
            accountType="Joint"
            fea={joint?.declaration?.fea!}
            name={joint?.personalDetails?.name!}
            handleFeaDeclaration={handleJointFea}
          />
        </View>
      ) : null}
    </ContentPage>
  );
};

export const FeaDeclaration = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(FeaDeclarationComponent);
