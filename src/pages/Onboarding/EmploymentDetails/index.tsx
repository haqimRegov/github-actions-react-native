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
  handleNextStep,
  onboarding,
  personalInfo,
  updateOnboarding,
}: EmploymentDetailsProps) => {
  const { joint, principal } = personalInfo;

  const checkJointGross = accountType === "Joint" && joint!.employmentDetails!.grossIncome !== "";
  const validateDetails = (details: IHolderInfoState) => {
    const { employmentDetails } = details;
    return (
      employmentDetails!.occupation !== "" &&
      employmentDetails!.businessNature !== "" &&
      employmentDetails!.employerName !== "" &&
      employmentDetails!.address !== "" &&
      employmentDetails!.postCode !== "" &&
      employmentDetails!.city !== "" &&
      employmentDetails!.state !== "" &&
      employmentDetails!.country !== ""
    );
  };

  const buttonDisabled =
    accountType === "Individual"
      ? validateDetails(principal!) === false
      : validateDetails(principal!) === false || validateDetails(joint!) === false || checkJointGross === false;

  const handleSubmit = () => {
    addPersonalInfo({ ...personalInfo, editPersonal: true });
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findInfoSummary = updatedDisabledSteps.indexOf("PersonalInfoSummary");
    if (findInfoSummary !== -1) {
      updatedDisabledSteps.splice(findInfoSummary, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep("PersonalInfoSummary");
  };

  const handlePrincipalEmployment = (value: IEmploymentDetailsState) => {
    addPersonalInfo({ ...personalInfo, principal: { ...principal, employmentDetails: { ...principal?.employmentDetails, ...value } } });
  };

  const handleJointEmployment = (value: IEmploymentDetailsState) => {
    addPersonalInfo({ ...personalInfo, joint: { ...joint, employmentDetails: { ...joint?.employmentDetails, ...value } } });
  };

  const handleBack = () => {
    handleNextStep("PersonalDetails");
  };

  const padding: ViewStyle = accountType === "Joint" ? px(sw48) : px(sw24);

  return (
    <ContentPage buttonContainerStyle={padding} continueDisabled={buttonDisabled} handleCancel={handleBack} handleContinue={handleSubmit}>
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
