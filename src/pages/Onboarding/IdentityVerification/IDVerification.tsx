import React, { Fragment, FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { ERROR } from "../../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { px, sh24, sh4, sw24 } from "../../../styles";
import { isNumber } from "../../../utils";
import { EPFDetails } from "./EPFDetails";
import { JointVerification } from "./Joint";
import { PrincipalVerification } from "./Principal";

const { ID_VERIFICATION } = Language.PAGE;

interface IDVerificationProps extends PersonalInfoStoreProps {
  handleBack: () => void;
  handleNextStep: (route: TypeOnboardingKey) => void;
}

const IDVerificationComponent: FunctionComponent<IDVerificationProps> = ({
  accountType,
  addPersonalInfo,
  client,
  handleBack,
  handleNextStep,
  onboarding,
  personalInfo,
  updateOnboarding,
}: IDVerificationProps) => {
  const { epfInvestment, epfShariah, principal, joint } = personalInfo;
  const { epfDetails } = principal!;
  const inputEpfType = epfDetails!.epfAccountType!;
  const inputEpfNumber = epfDetails!.epfMemberNumber!;
  const { details: clientDetails } = client;
  const { principalHolder: principalClient, jointHolder: jointClient } = clientDetails!;
  const { isEtb: isPrincipalEtb } = principalClient!;
  const { isEtb: isJointEtb } = jointClient!;
  const [validations, setValidations] = useState<IIDVerificationPageValidation>({
    principal: {
      name: undefined,
      permanentPostCode: undefined,
      mailingPostCode: undefined,
      mothersName: undefined,
      epfNumber: undefined,
    },
    joint: {
      name: undefined,
      permanentPostCode: undefined,
      mailingPostCode: undefined,
      mothersName: undefined,
    },
  });

  const validateDetails = (details: IHolderInfoState, rules: IIDVerificationValidations) => {
    const { addressInformation, personalDetails } = details;
    const checkPassport =
      personalDetails!.idType === "Passport"
        ? personalDetails!.nationality !== "" && personalDetails!.expirationDate !== undefined && personalDetails!.countryOfBirth !== ""
        : true;
    const checkEducation =
      (personalDetails!.educationLevel !== "Others" && personalDetails!.educationLevel !== "") ||
      (personalDetails!.educationLevel !== "" &&
        personalDetails!.educationLevel === "Others" &&
        personalDetails!.otherEducationLevel !== "");
    const checkMalaysianDetails =
      personalDetails?.idType !== "Passport" ? personalDetails!.race !== "" && personalDetails!.bumiputera !== undefined : true;

    return (
      personalDetails!.idNumber !== "" &&
      personalDetails!.dateOfBirth !== undefined &&
      personalDetails!.name !== "" &&
      personalDetails!.salutation !== "" &&
      personalDetails!.gender !== "" &&
      personalDetails!.placeOfBirth !== "" &&
      personalDetails!.countryOfBirth !== "" &&
      personalDetails?.mothersMaidenName !== "" &&
      personalDetails?.maritalStatus !== "" &&
      checkMalaysianDetails === true &&
      checkEducation === true &&
      Object.values(addressInformation!.permanentAddress!).includes("") === false &&
      Object.values(addressInformation!.permanentAddress!.address!).includes("") === false &&
      Object.values(addressInformation!.mailingAddress!).includes("") === false &&
      Object.values(addressInformation!.mailingAddress!.address!).includes("") === false &&
      Object.values(rules)
        .map((value) => typeof value)
        .includes(typeof "string") === false &&
      checkPassport === true
    );
  };

  const handleSubmit = () => {
    const route: TypeOnboardingKey = personalInfo.editPersonal === true ? "PersonalInfoSummary" : "PersonalDetails";
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findPersonalDetails = updatedDisabledSteps.indexOf("PersonalDetails");
    if (findPersonalDetails !== -1) {
      updatedDisabledSteps.splice(findPersonalDetails, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep(route);
  };

  const handlePrincipalDetails = (value: IPersonalDetailsState) => {
    addPersonalInfo({ principal: { personalDetails: { ...principal!.personalDetails, ...value } } });
  };

  const handlePrincipalAddress = (value: IAddressInfoState) => {
    const jointMailingAddress =
      joint!.addressInformation!.sameAddress === true && accountType === "Joint"
        ? { joint: { addressInformation: { ...joint!.addressInformation, mailingAddress: { ...value.mailingAddress } } } }
        : {};
    addPersonalInfo({ principal: { addressInformation: { ...principal!.addressInformation, ...value } }, ...jointMailingAddress });
  };

  const handleJointDetails = (value: IPersonalDetailsState) => {
    addPersonalInfo({ joint: { personalDetails: { ...joint!.personalDetails, ...value } } });
  };

  const handleJointAddress = (value: IAddressInfoState) => {
    const jointMailingAddress =
      value.sameAddress === true && accountType === "Joint"
        ? { mailingAddress: { ...principal!.addressInformation!.mailingAddress } }
        : { mailingAddress: { ...value.mailingAddress } };
    addPersonalInfo({ joint: { addressInformation: { ...joint!.addressInformation, ...value, ...jointMailingAddress } } });
  };

  const handlePrincipalValidation = (value: IIDVerificationValidations) => {
    setValidations({ ...validations, principal: { ...validations.principal, ...value } });
  };

  const handleJointValidation = (value: IIDVerificationValidations) => {
    setValidations({ ...validations, joint: { ...validations.joint, ...value } });
  };

  const handleInputEpfType = (value: string) =>
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        epfDetails: {
          ...personalInfo.principal?.epfDetails,
          epfAccountType: value,
        },
      },
    });

  const handleInputEpfNumber = (value: string) =>
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        epfDetails: {
          ...personalInfo.principal?.epfDetails,
          epfMemberNumber: value,
        },
      },
    });

  const handleEpfNumber = () => {
    const checkEpfNumber = isNumber(inputEpfNumber) === false || inputEpfNumber === "" ? ERROR.INVALID_NUMBER : undefined;
    setValidations({
      ...validations,
      principal: {
        ...validations.principal,
        epfNumber: checkEpfNumber,
      },
    });
  };

  const checkEpf =
    epfInvestment === true
      ? principal!.epfDetails!.epfMemberNumber !== "" &&
        principal?.epfDetails!.epfAccountType !== "" &&
        validations.principal.epfNumber === undefined
      : true;

  // const principalEpfCheck = personalInfo.isAllEpf === true ? principal?.personalDetails?.enableBankDetails === true : true;

  const continueDisabled =
    accountType === "Individual"
      ? checkEpf === false || validateDetails(principal!, validations.principal) === false
      : (isPrincipalEtb === false && validateDetails(principal!, validations.principal) === false) ||
        (isJointEtb === false && validateDetails(joint!, validations.joint) === false);

  return (
    <ContentPage
      buttonContainerStyle={px(sw24)}
      continueDisabled={continueDisabled}
      handleCancel={handleBack}
      handleContinue={handleSubmit}
      subheading={ID_VERIFICATION.LABEL_HEADING}
      spaceToTitle={sh4}
      subtitle={ID_VERIFICATION.LABEL_SUB_HEADING}>
      {isPrincipalEtb === false ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <PrincipalVerification
            accountType={accountType!}
            accountHolder="Principal"
            addressInfo={principal!.addressInformation!}
            clientDetails={client.details?.principalHolder!}
            personalDetails={principal!.personalDetails!}
            setAddressInfo={handlePrincipalAddress}
            setPersonalDetails={handlePrincipalDetails}
            setValidations={handlePrincipalValidation}
            validations={validations.principal}
          />
        </Fragment>
      ) : null}
      {accountType === "Individual" || isJointEtb === true ? null : (
        <Fragment>
          <CustomSpacer space={sh24} />
          <JointVerification
            accountHolder="Joint"
            addressInfo={joint!.addressInformation!}
            clientDetails={client.details?.jointHolder!}
            personalDetails={joint!.personalDetails!}
            setAddressInfo={handleJointAddress}
            setPersonalDetails={handleJointDetails}
            setValidations={handleJointValidation}
            validations={validations.joint}
          />
        </Fragment>
      )}
      {epfInvestment === true ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <EPFDetails
            epfNumberError={validations.principal.epfNumber}
            epfShariah={epfShariah!}
            inputEpfNumber={inputEpfNumber}
            inputEpfType={inputEpfType}
            onBlurEpfNumber={handleEpfNumber}
            setInputEpfNumber={handleInputEpfNumber}
            setInputEpfType={handleInputEpfType}
          />
        </Fragment>
      ) : null}
    </ContentPage>
  );
};

export const IDVerification = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(IDVerificationComponent);
