import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { ContentPage } from "../../../components";
import { Language, ONBOARDING_ROUTES } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { Joint } from "./Joint";
import { Principal } from "./Principal";

const { SUMMARY } = Language.PAGE;

interface PersonalDetailsSummaryProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const PersonalDetailsSummaryComponent: FunctionComponent<PersonalDetailsSummaryProps> = ({
  accountType,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
}: PersonalDetailsSummaryProps) => {
  const handleContinue = () => {
    handleNextStep(ONBOARDING_ROUTES.FATCADeclaration);
  };

  return (
    <ContentPage
      handleCancel={handleCancelOnboarding!}
      handleContinue={handleContinue}
      noBounce={true}
      subheading={SUMMARY.HEADING}
      subtitle={SUMMARY.SUBHEADING}>
      <Principal accountType={accountType} handleNextStep={handleNextStep} summary={personalInfo!.principal!} />
      {accountType === "Individual" ? null : <Joint handleNextStep={handleNextStep} summary={personalInfo!.joint!} />}
    </ContentPage>
  );
};

export const PersonalDetailsSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(PersonalDetailsSummaryComponent);
