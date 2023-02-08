import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { AccountHeader, ColorCard, ContentPage, CustomSpacer } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { px, sh24, sw24 } from "../../../styles";
import { ContactDetails } from "./ContactDetails";

const { CONTACT_DETAILS, ID_VERIFICATION, PERSONAL_DETAILS } = Language.PAGE;
interface PersonalDetailsProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const PersonalDetailsComponent: FunctionComponent<PersonalDetailsProps> = ({
  accountType,
  addPersonalInfo,
  client,
  details,
  handleNextStep,
  onboarding,
  personalInfo,
  updateOnboarding,
}: PersonalDetailsProps) => {
  const { principal, joint } = personalInfo;
  const { details: clientDetails } = client;
  const { principalHolder: principalClient, jointHolder: jointClient } = clientDetails!;
  const { isEtb: isPrincipalEtb } = principalClient!;
  const { isEtb: isJointEtb } = jointClient!;
  const { contactDetails: principalContactDetails } = principal!;
  const { contactDetails: jointContactDetails } = joint!;

  const validatePrincipal = (info: IHolderInfoState) => {
    const { contactDetails } = info;

    return (
      Object.values(contactDetails!.contactNumber!)
        .map((contact) => contact.value)
        .flat()
        .includes("") === false &&
      Object.values(contactDetails!.contactNumber!)
        .map((contact) => typeof contact.error)
        .includes("string") === false
    );
  };

  const jointContactCheck =
    accountType === "Joint" && moment().diff(moment(details!.jointHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "years") < 18;

  const validateJoint = (info: IHolderInfoState) => {
    const { contactDetails } = info;
    return (
      Object.values(contactDetails!.contactNumber!)
        .map((contact) => typeof contact.error)
        .includes("string") === false &&
      jointContactCheck === false &&
      Object.values(contactDetails!.contactNumber!)
        .map((contact) => contact.value)
        .flat()
        .includes("") === false
    );
  };

  const buttonDisabled =
    accountType === "Individual"
      ? validatePrincipal(principal!) === false
      : (isPrincipalEtb === false && validatePrincipal(principal!) === false) || (isJointEtb === false && validateJoint(joint!) === false);

  const handleSubmit = () => {
    const route: TypeOnboardingKey = personalInfo.editPersonal === true ? "PersonalInfoSummary" : "EmploymentDetails";
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findInfoSummary = updatedDisabledSteps.indexOf("PersonalInfoSummary");
    addPersonalInfo({ ...personalInfo, editPersonal: findInfoSummary === -1 });
    const findEmploymentDetails = updatedDisabledSteps.indexOf("EmploymentDetails");
    if (findEmploymentDetails !== -1) {
      updatedDisabledSteps.splice(findEmploymentDetails, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep(route);
  };

  const handlePrincipalContactDetails = (value: IContactNumberState[]) => {
    addPersonalInfo({ principal: { contactDetails: { ...principal!.contactDetails, contactNumber: value } } });
  };

  const handleJointContactDetails = (value: IContactNumberState[]) => {
    addPersonalInfo({ joint: { contactDetails: { ...joint!.contactDetails, contactNumber: value } } });
  };

  const handleBack = () => {
    handleNextStep("IdentityVerification");
  };

  const accountNames = [{ label: details!.principalHolder!.name!, value: details!.principalHolder!.name! }];

  if (accountType === "Joint") {
    accountNames.push(
      { label: details!.jointHolder!.name!, value: details!.jointHolder!.name! },
      { label: PERSONAL_DETAILS.OPTION_COMBINED, value: PERSONAL_DETAILS.OPTION_COMBINED },
    );
  }
  const isContactOptional = jointContactCheck !== undefined ? jointContactCheck : false;
  const checkContactDetailsLabel =
    accountType === "Individual"
      ? PERSONAL_DETAILS.LABEL_ADD_PRINCIPAL_HOLDER_CONTACT_INDIVIDUAL
      : PERSONAL_DETAILS.LABEL_ADD_PRINCIPAL_HOLDER_CONTACT;

  return (
    <ContentPage
      buttonContainerStyle={px(sw24)}
      continueDisabled={buttonDisabled}
      handleCancel={handleBack}
      handleContinue={handleSubmit}
      subheading={CONTACT_DETAILS.HEADING_CONTACT_DETAILS}
      subtitle={CONTACT_DETAILS.SUB_HEADING_CONTACT_DETAILS}
      spaceToTitle={0}>
      <View style={px(sw24)}>
        {isPrincipalEtb === false ? (
          <Fragment>
            <CustomSpacer space={sh24} />
            {accountType === "Individual" ? null : (
              <AccountHeader title={ID_VERIFICATION.LABEL_PRINCIPAL_HOLDER} subtitle={principal?.personalDetails?.name!} />
            )}
            <ColorCard
              header={{ label: checkContactDetailsLabel }}
              content={
                <ContactDetails
                  contactNumber={principalContactDetails?.contactNumber!}
                  setContactNumber={handlePrincipalContactDetails}
                  optional={isContactOptional}
                />
              }
            />
          </Fragment>
        ) : null}
        {accountType === "Individual" || isJointEtb === true ? null : (
          <Fragment>
            <CustomSpacer space={sh24} />
            <AccountHeader title={ID_VERIFICATION.LABEL_JOINT_HOLDER} subtitle={joint?.personalDetails?.name!} />
            <ColorCard
              header={{ label: PERSONAL_DETAILS.LABEL_ADD_JOINT_HOLDER_CONTACT }}
              content={
                <ContactDetails
                  contactNumber={jointContactDetails?.contactNumber!}
                  setContactNumber={handleJointContactDetails}
                  optional={isContactOptional}
                />
              }
            />
          </Fragment>
        )}
      </View>
    </ContentPage>
  );
};

export const PersonalDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(PersonalDetailsComponent);
