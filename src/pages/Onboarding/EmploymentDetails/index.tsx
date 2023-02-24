import moment from "moment";
import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { ContentPage } from "../../../components";
import { Language } from "../../../constants";
import { EMPLOYMENT_EXEMPTIONS } from "../../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { initialJointEmploymentDetails } from "./Details";
import { JointEmploymentDetails } from "./Joint";
import { PrincipalEmploymentDetails } from "./Principal";

const { EMPLOYMENT_DETAILS } = Language.PAGE;

interface EmploymentDetailsProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const EmploymentDetailsComponent: FunctionComponent<EmploymentDetailsProps> = ({
  accountType,
  addPersonalInfo,
  client,
  handleNextStep,
  onboarding,
  personalInfo,
  updateOnboarding,
}: EmploymentDetailsProps) => {
  const [validations, setValidations] = useState<IEmploymentDetailsPageValidation>({
    principal: { postCode: undefined },
    joint: { postCode: undefined },
  });

  const { disabledSteps, finishedSteps } = onboarding;
  const { editMode, joint, principal } = personalInfo;
  const { details: clientDetails } = client;
  const { principalHolder: principalClient, jointHolder: jointClient } = clientDetails!;
  const { isEtb: isPrincipalEtb } = principalClient!;
  const { isEtb: isJointEtb } = jointClient!;

  const jointAgeCheck = accountType === "Joint" && moment().diff(moment(joint?.personalDetails?.dateOfBirth), "years") < 18;

  const validateDetails = (details: IHolderInfoState, rules: IEmploymentDetailsValidations) => {
    const { employmentDetails } = details;
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
      if (employmentDetails.isOptional === true) {
        return validationResult;
      }
      return true;
    }

    if (employmentDetails?.occupation === "Others") {
      return employmentDetails!.othersOccupation !== "" && validationResult;
    }

    return validationResult;
  };

  const checkJointGross =
    joint?.employmentDetails !== undefined &&
    joint.employmentDetails.occupation !== "" &&
    (joint.employmentDetails.isOptional === true || !EMPLOYMENT_EXEMPTIONS.includes(joint.employmentDetails.occupation!))
      ? accountType === "Joint" && joint!.employmentDetails!.grossIncome !== ""
      : true;
  const checkMinor =
    jointAgeCheck === true && joint?.employmentDetails?.occupation === ""
      ? false
      : validateDetails(joint!, validations.joint) === false || checkJointGross === false;
  const buttonDisabled =
    accountType === "Individual"
      ? validateDetails(principal!, validations.principal) === false
      : (isPrincipalEtb === false && validateDetails(principal!, validations.principal) === false) || (isJointEtb === false && checkMinor);

  const handleSubmit = (resetJoint?: boolean) => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];
    // add to finishedSteps
    if (updatedFinishedSteps.includes("EmploymentDetails") === false) {
      updatedFinishedSteps.push("EmploymentDetails");
    }

    // remove in disabledSteps if edit mode
    if (editMode === true) {
      const findPersonalInfoSummary = updatedDisabledSteps.indexOf("PersonalInfoSummary");

      if (findPersonalInfoSummary !== -1) {
        updatedDisabledSteps.splice(findPersonalInfoSummary, 1);
      }
      const checkResetJoint = resetJoint === true ? { joint: { ...joint, employmentDetails: { ...initialJointEmploymentDetails } } } : {};
      addPersonalInfo({ ...personalInfo, editMode: false, ...checkResetJoint });
    }

    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps, finishedSteps: updatedFinishedSteps });

    const route: TypeOnboardingKey = editMode === true ? "PersonalInfoSummary" : "AdditionalDetails";
    handleNextStep(route);
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
    handleNextStep("ContactDetails");
  };

  const handlePrincipalValidation = (value: IEmploymentDetailsValidations) => {
    setValidations({ ...validations, principal: { ...validations.principal, ...value } });
  };

  const handleJointValidation = (value: IEmploymentDetailsValidations) => {
    setValidations({ ...validations, joint: { ...validations.joint, ...value } });
  };

  const handleSkip = () => {
    if (editMode === false) {
      addPersonalInfo({ ...personalInfo, joint: { ...joint, employmentDetails: { ...initialJointEmploymentDetails } } });
    }
    handleSubmit(true);
  };

  const checkSkippable = isPrincipalEtb === true && jointAgeCheck === true;

  return (
    <ContentPage
      cancelDisabled={editMode === true}
      continueDisabled={buttonDisabled}
      handleSkip={handleSkip}
      skippable={checkSkippable}
      subheading={EMPLOYMENT_DETAILS.HEADING}
      subtitle={EMPLOYMENT_DETAILS.SUBHEADING}
      handleCancel={handleBack}
      handleContinue={handleSubmit}>
      {isPrincipalEtb === false ? (
        <PrincipalEmploymentDetails
          accountType={accountType!}
          employmentDetails={principal!.employmentDetails!}
          personalDetails={principal!.personalDetails!}
          setEmploymentDetails={handlePrincipalEmployment}
          setPersonalInfoDetails={handlePrincipalPersonalInfo}
          setValidations={handlePrincipalValidation}
          validations={validations.principal}
        />
      ) : null}
      {accountType === "Individual" || isJointEtb === true ? null : (
        <JointEmploymentDetails
          accountType={accountType!}
          employmentDetails={joint!.employmentDetails!}
          personalDetails={joint!.personalDetails!}
          setEmploymentDetails={handleJointEmployment}
          setPersonalInfoDetails={handleJointPersonalInfo}
          setValidations={handleJointValidation}
          validations={validations.joint}
        />
      )}
    </ContentPage>
  );
};

export const EmploymentDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(EmploymentDetailsComponent);
