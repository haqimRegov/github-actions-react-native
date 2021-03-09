import React, { Fragment, FunctionComponent, useState } from "react";
import { View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { borderBottomBlack21, px, sh24, sh48, sw24, sw48 } from "../../../styles";
import { JointVerification } from "./Joint";
import { PrincipalVerification } from "./Principal";

const { ID_VERIFICATION } = Language.PAGE;

interface IDVerificationProps extends PersonalInfoStoreProps {
  handleBack: () => void;
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

const IDVerificationComponent: FunctionComponent<IDVerificationProps> = ({
  accountType,
  addPersonalInfo,
  handleBack,
  handleNextStep,
  onboarding,
  personalInfo,
  riskScore,
  updateOnboarding,
}: IDVerificationProps) => {
  const { principal, joint } = personalInfo;
  const [validations, setValidations] = useState<IIDVerificationPageValidation>({
    principal: {
      name: undefined,
      permanentPostCode: undefined,
      mailingPostCode: undefined,
    },
    joint: {
      name: undefined,
      permanentPostCode: undefined,
      mailingPostCode: undefined,
    },
  });

  const validateDetails = (details: IHolderInfoState, rules: IIDVerificationValidations) => {
    const { addressInformation, personalDetails } = details;
    const checkPassport =
      personalDetails!.idType === "Passport" ? personalDetails!.nationality !== "" && personalDetails!.expirationDate !== undefined : true;

    return (
      personalDetails!.idNumber !== "" &&
      personalDetails!.dateOfBirth !== undefined &&
      personalDetails!.name !== "" &&
      personalDetails!.salutation !== "" &&
      personalDetails!.gender !== "" &&
      personalDetails!.placeOfBirth !== "" &&
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
    addPersonalInfo({ principal: { ...principal, personalDetails: { ...principal?.personalDetails, riskProfile: riskScore.appetite } } });
    const route: TypeOnboardingRoute = personalInfo.editPersonal === true ? "PersonalInfoSummary" : "PersonalDetails";
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findPersonalDetails = updatedDisabledSteps.indexOf("PersonalDetails");
    if (findPersonalDetails !== -1) {
      updatedDisabledSteps.splice(findPersonalDetails, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep(route);
  };

  const continueDisabled =
    accountType === "Individual"
      ? validateDetails(principal!, validations.principal) === false
      : validateDetails(principal!, validations.principal) === false || validateDetails(joint!, validations.joint) === false;

  const handlePrincipalDetails = (value: IPersonalDetailsState) => {
    addPersonalInfo({ principal: { personalDetails: { ...principal!.personalDetails, ...value } } });
  };

  const handlePrincipalAddress = (value: IAddressInfoState) => {
    addPersonalInfo({ principal: { addressInformation: { ...principal!.addressInformation, ...value } } });
  };

  const handleJointDetails = (value: IPersonalDetailsState) => {
    addPersonalInfo({ joint: { personalDetails: { ...joint!.personalDetails, ...value } } });
  };

  const handleJointAddress = (value: IAddressInfoState) => {
    addPersonalInfo({ joint: { addressInformation: { ...joint!.addressInformation, ...value } } });
  };

  const handlePrincipalValidation = (value: IIDVerificationValidations) => {
    setValidations({ ...validations, principal: { ...validations.principal, ...value } });
  };

  const handleJointValidation = (value: IIDVerificationValidations) => {
    setValidations({ ...validations, joint: { ...validations.joint, ...value } });
  };

  const padding: ViewStyle = accountType === "Joint" ? px(sw48) : px(sw24);

  return (
    <ContentPage
      buttonContainerStyle={padding}
      continueDisabled={continueDisabled}
      handleCancel={handleBack}
      handleContinue={handleSubmit}
      labelCancel={ID_VERIFICATION.BUTTON_BACK}
      labelContinue={ID_VERIFICATION.BUTTON_VERIFY}>
      <PrincipalVerification
        accountType={accountType}
        addressInfo={principal!.addressInformation!}
        personalDetails={principal!.personalDetails!}
        setAddressInfo={handlePrincipalAddress}
        setPersonalDetails={handlePrincipalDetails}
        setValidations={handlePrincipalValidation}
        validations={validations.principal}
      />
      {accountType === "Individual" ? null : (
        <Fragment>
          <CustomSpacer space={sh24} />
          <View style={borderBottomBlack21} />
          <CustomSpacer space={sh48} />
          <JointVerification
            addressInfo={joint!.addressInformation!}
            personalDetails={joint!.personalDetails!}
            setAddressInfo={handleJointAddress}
            setPersonalDetails={handleJointDetails}
            setValidations={handleJointValidation}
            validations={validations.joint}
          />
        </Fragment>
      )}
    </ContentPage>
  );
};

export const IDVerification = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(IDVerificationComponent);
