import moment from "moment";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../../components";
import { Language, ONBOARDING_KEYS, ONBOARDING_ROUTES } from "../../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../../store";
import { borderBottomBlack21, sh24 } from "../../../../styles";
import { DeclarationDetails } from "./Details";

const { DECLARATION_SUMMARY } = Language.PAGE;

interface DeclarationSummaryProps extends PersonalInfoStoreProps, OnboardingContentProps {}

export const DeclarationSummaryComponent: FunctionComponent<DeclarationSummaryProps> = ({
  accountType,
  finishedSteps,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
  updateFinishedSteps,
}: DeclarationSummaryProps) => {
  const { principal, joint } = personalInfo;
  const jointAge = moment().diff(joint?.personalDetails?.dateOfBirth, "years");

  // TODO handle if FEA
  const isFea = 100 < 500;

  const handleContinue = () => {
    handleNextStep(ONBOARDING_ROUTES.OrderSummary);
    const updatedSteps: TypeOnboardingKey[] = [...finishedSteps];
    updatedSteps.push(ONBOARDING_KEYS.Declarations);
    updateFinishedSteps(updatedSteps);
  };

  const principalSubtitle = isFea ? DECLARATION_SUMMARY.SUBHEADING_FEA : DECLARATION_SUMMARY.SUBHEADING;
  const jointSubtitle = isFea ? DECLARATION_SUMMARY.SUBHEADING_JOINT_FEA : DECLARATION_SUMMARY.SUBHEADING_JOINT;
  const subtitle = accountType === "Joint" && jointAge >= 18 ? jointSubtitle : principalSubtitle;

  return (
    <ContentPage
      handleCancel={handleCancelOnboarding}
      handleContinue={handleContinue}
      labelContinue={DECLARATION_SUMMARY.BUTTON_CONFIRM}
      subheading={DECLARATION_SUMMARY.HEADING}
      subtitle={subtitle}>
      <CustomSpacer space={sh24} />
      <DeclarationDetails
        accountHolder="Principal"
        accountType={accountType}
        handleNextStep={handleNextStep}
        isFea={isFea}
        name={principal?.personalDetails!.name!}
        summary={personalInfo.principal?.declaration!}
      />
      {accountType === "Joint" && jointAge >= 18 ? (
        <View>
          <CustomSpacer space={sh24} />
          <View style={borderBottomBlack21} />
          <CustomSpacer space={sh24} />
          <DeclarationDetails
            accountHolder="Joint"
            accountType="Joint"
            handleNextStep={handleNextStep}
            isFea={isFea}
            name={joint!.personalDetails!.name!}
            summary={joint!.declaration!}
          />
        </View>
      ) : null}
    </ContentPage>
  );
};

export const DeclarationSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(DeclarationSummaryComponent);
