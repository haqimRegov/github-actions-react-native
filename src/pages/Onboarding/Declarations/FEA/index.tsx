import moment from "moment";
import React, { FunctionComponent } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, LinkText } from "../../../../components";
import { Language } from "../../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../../store";
import { borderBottomBlack21, fs12SemiBoldBlue1, px, sh24, sh8, sw24 } from "../../../../styles";
import { FeaDeclarationDetails } from "./Details";

const { DECLARATIONS } = Language.PAGE;

interface FeaDeclarationProps extends PersonalInfoStoreProps, OnboardingContentProps {}

export const FeaDeclarationComponent: FunctionComponent<FeaDeclarationProps> = ({
  accountType,
  addPersonalInfo,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
}: FeaDeclarationProps) => {
  const { principal, joint } = personalInfo;
  const jointAge = moment().diff(joint?.personalDetails?.dateOfBirth, "years");

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
    handleNextStep("DeclarationSummary");
    if (isFea === true && personalInfo.editDeclaration === false) {
      addPersonalInfo({ ...personalInfo, editDeclaration: true });
    }
  };

  const handleRead = () => {
    Alert.alert("Declaration");
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

  const continueEnabled = accountType === "Individual" ? validationsPrincipal : validationsPrincipal && validationsJoint;

  return (
    <ContentPage
      continueDisabled={!continueEnabled}
      handleCancel={handleCancelOnboarding}
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
      {accountType === "Joint" && jointAge >= 18 ? (
        <View>
          <CustomSpacer space={sh24} />
          <View style={borderBottomBlack21} />
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
