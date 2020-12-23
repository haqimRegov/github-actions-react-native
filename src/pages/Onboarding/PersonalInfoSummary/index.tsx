import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { ContentPage, LabeledTitleProps } from "../../../components";
import { Language, ONBOARDING_KEYS, ONBOARDING_ROUTES } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { Joint } from "./Joint";
import { SummaryJointDetails } from "./JointDetails";
import { Principal } from "./Principal";

const { SUMMARY } = Language.PAGE;

interface PersonalInfoSummaryProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const PersonalInfoSummaryComponent: FunctionComponent<PersonalInfoSummaryProps> = ({
  accountType,
  finishedSteps,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
  updateFinishedSteps,
}: PersonalInfoSummaryProps) => {
  const { principal, joint } = personalInfo;
  const handleContinue = () => {
    handleNextStep(ONBOARDING_ROUTES.FATCADeclaration);
    const updatedSteps: TypeOnboardingKey[] = [...finishedSteps];
    updatedSteps.push(ONBOARDING_KEYS.PersonalInformation);
    updateFinishedSteps(updatedSteps);
  };

  const jointDetails: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_DISTRIBUTION, title: personalInfo!.incomeDistribution! },
    { label: SUMMARY.LABEL_SIGNATORY, title: personalInfo!.signatory! },
  ];

  return (
    <ContentPage
      handleCancel={handleCancelOnboarding!}
      handleContinue={handleContinue}
      noBounce={true}
      subheading={SUMMARY.HEADING}
      subtitle={SUMMARY.SUBHEADING}>
      <Principal accountType={accountType} handleNextStep={handleNextStep} summary={personalInfo!.principal!} />
      {accountType === "Individual" ? null : <Joint handleNextStep={handleNextStep} summary={personalInfo!.joint!} />}
      {accountType === "Individual" ? null : (
        <SummaryJointDetails
          handleNextStep={handleNextStep}
          jointDetails={jointDetails}
          jointName={joint!.personalDetails!.name!}
          principalName={principal!.personalDetails!.name!}
        />
      )}
    </ContentPage>
  );
};

export const PersonalInfoSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(PersonalInfoSummaryComponent);
