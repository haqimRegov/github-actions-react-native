import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { ContentPage } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { Joint } from "./Joint";
import { SummaryJointDetails } from "./JointDetails";
import { Principal } from "./Principal";

const { SUMMARY } = Language.PAGE;

interface PersonalInfoSummaryProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const PersonalInfoSummaryComponent: FunctionComponent<PersonalInfoSummaryProps> = ({
  accountType,
  handleNextStep,
  personalInfo,
  onboarding,
  updateOnboarding,
}: PersonalInfoSummaryProps) => {
  const { disabledSteps, finishedSteps } = onboarding;
  const { principal, joint } = personalInfo;
  const handleContinue = () => {
    handleNextStep("FATCADeclaration");
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    updatedFinishedSteps.push("PersonalInformation");
    const findDeclarations = updatedDisabledSteps.indexOf("Declarations");
    if (findDeclarations !== -1) {
      updatedDisabledSteps.splice(findDeclarations, 1);
    }
    const findFATCA = updatedDisabledSteps.indexOf("FATCADeclaration");
    if (findFATCA !== -1) {
      updatedDisabledSteps.splice(findFATCA, 1);
    }
    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
  };

  const jointDetails: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_DISTRIBUTION, title: personalInfo.incomeDistribution! },
    { label: SUMMARY.LABEL_SIGNATORY, title: personalInfo.signatory! },
  ];

  const handleBack = () => {
    handleNextStep("EmploymentDetails");
  };

  const isAllEpf = personalInfo.isAllEpf !== undefined ? personalInfo.isAllEpf : false;

  return (
    <ContentPage
      handleCancel={handleBack}
      handleContinue={handleContinue}
      noBounce={true}
      subheading={SUMMARY.HEADING}
      subtitle={SUMMARY.SUBHEADING}>
      <Principal accountType={accountType} handleNextStep={handleNextStep} isAllEpf={isAllEpf} summary={personalInfo.principal!} />
      {accountType === "Individual" ? null : <Joint handleNextStep={handleNextStep} summary={personalInfo.joint!} />}
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
