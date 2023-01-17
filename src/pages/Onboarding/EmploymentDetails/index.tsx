import React, { Fragment, FunctionComponent, useState } from "react";
import { View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../components";
import { EMPLOYMENT_EXEMPTIONS, Q8_OPTIONS } from "../../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { borderBottomGray2, px, sh40, sw24, sw48 } from "../../../styles";
import { JointEmploymentDetails } from "./Joint";
import { PrincipalEmploymentDetails } from "./Principal";

interface EmploymentDetailsProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const EmploymentDetailsComponent: FunctionComponent<EmploymentDetailsProps> = ({
  accountType,
  addPersonalInfo,
  handleNextStep,
  onboarding,
  personalInfo,
  questionnaire,
  updateOnboarding,
}: EmploymentDetailsProps) => {
  const [validations, setValidations] = useState<IEmploymentDetailsPageValidation>({
    principal: { postCode: undefined },
    joint: { postCode: undefined },
  });

  const { joint, principal } = personalInfo;
  const annualIncomePrincipal = { annualIncomePrincipal: Q8_OPTIONS[questionnaire.questionEight].label };

  const validateDetails = (details: IHolderInfoState, rules: IEmploymentDetailsValidations) => {
    const { employmentDetails, personalDetails } = details;
    const isRelationship = personalDetails?.relationship;
    const validationResult =
      employmentDetails!.occupation !== "" &&
      employmentDetails!.businessNature !== "" &&
      employmentDetails!.employerName !== "" &&
      employmentDetails!.postCode !== "" &&
      employmentDetails!.city !== "" &&
      employmentDetails!.state !== "" &&
      employmentDetails!.country !== "" &&
      Object.values(employmentDetails!.address!).includes("") === false &&
      Object.values(rules)
        .map((value) => typeof value)
        .includes(typeof "string") === false;

    if (employmentDetails?.occupation !== undefined && EMPLOYMENT_EXEMPTIONS.includes(employmentDetails.occupation)) {
      if (isRelationship !== undefined) {
        if (employmentDetails.isOptional === true) {
          return validationResult;
        }
        const principalFalse = true;
        return principalFalse;
      }

      if (employmentDetails.isOptional === true) {
        return validationResult;
      }
      const jointFalse = true;
      return jointFalse;
    }

    if (employmentDetails?.occupation === "Others") {
      return (
        employmentDetails!.othersOccupation !== "" &&
        employmentDetails!.businessNature !== "" &&
        employmentDetails!.employerName !== "" &&
        employmentDetails!.postCode !== "" &&
        employmentDetails!.city !== "" &&
        employmentDetails!.state !== "" &&
        employmentDetails!.country !== "" &&
        Object.values(employmentDetails!.address!).includes("") === false &&
        Object.values(rules)
          .map((value) => typeof value)
          .includes(typeof "string") === false
      );
    }

    return validationResult;
  };

  const checkJointGross =
    joint?.employmentDetails !== undefined && joint.employmentDetails.isOptional === true
      ? accountType === "Joint" && joint!.employmentDetails!.grossIncome !== ""
      : true;
  const buttonDisabled =
    accountType === "Individual" || joint?.employmentDetails?.isEnabled === false
      ? validateDetails(principal!, validations.principal) === false
      : validateDetails(principal!, validations.principal) === false ||
        validateDetails(joint!, validations.joint) === false ||
        checkJointGross === false;

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

  const handlePrincipalPersonalInfo = (value: IPersonalDetailsState) => {
    addPersonalInfo({
      ...personalInfo,
      principal: { ...principal, personalDetails: { ...principal?.personalDetails, ...value } },
    });
  };

  const handleJointPersonalInfo = (value: IPersonalDetailsState) => {
    addPersonalInfo({ ...personalInfo, joint: { ...joint, personalDetails: { ...joint?.personalDetails, ...value } } });
  };

  const handleBack = () => {
    handleNextStep("PersonalDetails");
  };

  const handlePrincipalValidation = (value: IEmploymentDetailsValidations) => {
    setValidations({ ...validations, principal: { ...validations.principal, ...value } });
  };

  const handleJointValidation = (value: IEmploymentDetailsValidations) => {
    setValidations({ ...validations, joint: { ...validations.joint, ...value } });
  };

  const padding: ViewStyle = accountType === "Joint" ? px(sw48) : px(sw24);

  return (
    <ContentPage buttonContainerStyle={padding} continueDisabled={buttonDisabled} handleCancel={handleBack} handleContinue={handleSubmit}>
      <PrincipalEmploymentDetails
        accountType={accountType}
        employmentDetails={principal!.employmentDetails!}
        personalDetails={{ ...principal!.personalDetails!, ...annualIncomePrincipal }}
        setEmploymentDetails={handlePrincipalEmployment}
        setPersonalInfoDetails={handlePrincipalPersonalInfo}
        setValidations={handlePrincipalValidation}
        validations={validations.principal}
      />
      {accountType === "Individual" ? null : (
        <Fragment>
          <CustomSpacer space={sh40} />
          <View style={borderBottomGray2} />
          <CustomSpacer space={sh40} />
          <JointEmploymentDetails
            accountType={accountType}
            employmentDetails={joint!.employmentDetails!}
            personalDetails={{ ...joint!.personalDetails! }}
            setEmploymentDetails={handleJointEmployment}
            setPersonalInfoDetails={handleJointPersonalInfo}
            setValidations={handleJointValidation}
            validations={validations.joint}
          />
        </Fragment>
      )}
    </ContentPage>
  );
};

export const EmploymentDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(EmploymentDetailsComponent);
