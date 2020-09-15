import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { ContentPage } from "../../../components";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { JointEmploymentDetails } from "./Joint";
import { PrincipalEmploymentDetails } from "./Principal";

interface EmploymentDetailsProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const EmploymentDetailsComponent: FunctionComponent<EmploymentDetailsProps> = ({
  accountType,
  addPersonalInfo,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
}: EmploymentDetailsProps) => {
  const { joint, principal } = personalInfo;

  // TODO validations
  const buttonDisabled = false;

  const handleSubmit = () => {
    const route: TypeOnboardingRoute = personalInfo.editMode === true ? "Summary" : "Declaration";
    handleNextStep(route);
  };

  const handlePrincipalEmployment = (value: IEmploymentDetailsState) => {
    addPersonalInfo({ ...personalInfo, principal: { ...principal, employmentDetails: { ...principal?.employmentDetails, ...value } } });
  };

  const handleJointEmployment = (value: IEmploymentDetailsState) => {
    addPersonalInfo({ ...personalInfo, joint: { ...joint, employmentDetails: { ...joint?.employmentDetails, ...value } } });
  };

  return (
    <ContentPage continueDisabled={buttonDisabled} handleCancel={handleCancelOnboarding!} handleContinue={handleSubmit}>
      <PrincipalEmploymentDetails
        accountType={accountType}
        personalDetails={principal!.personalDetails!}
        employmentDetails={principal!.employmentDetails!}
        setEmploymentDetails={handlePrincipalEmployment}
      />
      {accountType === "Individual" ? null : (
        <JointEmploymentDetails
          accountType={accountType}
          personalDetails={joint!.personalDetails!}
          employmentDetails={joint!.employmentDetails!}
          setEmploymentDetails={handleJointEmployment}
        />
      )}
    </ContentPage>
  );
};

export const EmploymentDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(EmploymentDetailsComponent);
