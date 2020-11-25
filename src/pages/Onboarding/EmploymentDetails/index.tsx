import React, { Fragment, FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../components";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { borderBottomBlack21, px, sh24, sh48, sw24, sw48 } from "../../../styles";
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
    handleNextStep("PersonalInfoSummary");
  };

  const handlePrincipalEmployment = (value: IEmploymentDetailsState) => {
    addPersonalInfo({ ...personalInfo, principal: { ...principal, employmentDetails: { ...principal?.employmentDetails, ...value } } });
  };

  const handleJointEmployment = (value: IEmploymentDetailsState) => {
    addPersonalInfo({ ...personalInfo, joint: { ...joint, employmentDetails: { ...joint?.employmentDetails, ...value } } });
  };
  const padding: ViewStyle = accountType === "Joint" ? px(sw48) : px(sw24);

  return (
    <ContentPage
      buttonContainerStyle={padding}
      continueDisabled={buttonDisabled}
      handleCancel={handleCancelOnboarding!}
      handleContinue={handleSubmit}>
      <PrincipalEmploymentDetails
        accountType={accountType}
        personalDetails={principal!.personalDetails!}
        employmentDetails={principal!.employmentDetails!}
        setEmploymentDetails={handlePrincipalEmployment}
      />
      {accountType === "Individual" ? null : (
        <Fragment>
          <CustomSpacer space={sh24} />
          <View style={borderBottomBlack21} />
          <CustomSpacer space={sh48} />
          <JointEmploymentDetails
            accountType={accountType}
            personalDetails={joint!.personalDetails!}
            employmentDetails={joint!.employmentDetails!}
            setEmploymentDetails={handleJointEmployment}
          />
        </Fragment>
      )}
    </ContentPage>
  );
};

export const EmploymentDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(EmploymentDetailsComponent);
