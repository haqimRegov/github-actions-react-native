import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { ContentPage } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { AccountDetails } from "./AccountDetails";
import { JointDetails } from "./Joint";
import { PrincipalDetails } from "./Principal";

const { PERSONAL_DETAILS } = Language.PAGE;

interface PersonalDetailsProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const PersonalDetailsComponent: FunctionComponent<PersonalDetailsProps> = ({
  accountType,
  addPersonalInfo,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
}: PersonalDetailsProps) => {
  const { principal, joint, epfInvestment } = personalInfo;

  // TODO validations
  const buttonDisabled = false;

  const handleSubmit = () => {
    const route: TypeOnboardingRoute = personalInfo.editMode === true ? "Summary" : "EmploymentDetails";
    handleNextStep(route);
  };

  const handlePersonalInfo = (value: IPersonalInfoState) => {
    addPersonalInfo({ ...personalInfo, ...value });
  };

  const handlePrincipalContactDetails = (value: IContactDetailsState) => {
    addPersonalInfo({ principal: { contactDetails: { ...principal!.contactDetails, ...value } } });
  };

  const handlePrincipalBankDetails = (value: IBankSummaryState) => {
    addPersonalInfo({ principal: { bankSummary: { ...principal!.bankSummary, ...value } } });
  };

  const handlePrincipalEpfDetails = (value: IEpfDetailsState) => {
    addPersonalInfo({ principal: { epfDetails: { ...principal!.epfDetails, ...value } } });
  };

  const handlePrincipalPersonalDetails = (value: IPersonalDetailsState) => {
    addPersonalInfo({ principal: { personalDetails: { ...principal!.personalDetails, ...value } } });
  };

  const handleJointContactDetails = (value: IContactDetailsState) => {
    addPersonalInfo({ joint: { contactDetails: { ...joint!.contactDetails, ...value } } });
  };

  const handleJointBankDetails = (value: IBankSummaryState) => {
    addPersonalInfo({ joint: { bankSummary: { ...joint!.bankSummary, ...value } } });
  };

  const handleJointEpfDetails = (value: IEpfDetailsState) => {
    addPersonalInfo({ joint: { epfDetails: { ...joint!.epfDetails, ...value } } });
  };

  const handleJointPersonalDetails = (value: IPersonalDetailsState) => {
    addPersonalInfo({ joint: { personalDetails: { ...joint!.personalDetails, ...value } } });
  };

  const principalName = principal?.personalDetails!.name!;
  const heading =
    accountType === "Individual"
      ? undefined
      : `${PERSONAL_DETAILS.HEADING_HELLO} ${principalName} ${PERSONAL_DETAILS.LABEL_AND} ${joint?.personalDetails!.name!}.`;
  const subheading = accountType === "Individual" ? undefined : PERSONAL_DETAILS.SUBHEADING_WEALTH;
  const subtitle = accountType === "Individual" ? undefined : PERSONAL_DETAILS.SUBTITLE_DETAILS;

  return (
    <ContentPage
      continueDisabled={buttonDisabled}
      handleCancel={handleCancelOnboarding!}
      handleContinue={handleSubmit}
      heading={heading}
      subheading={subheading}
      subtitle={subtitle}>
      <View>
        <PrincipalDetails
          accountType={accountType}
          bankDetails={principal!.bankSummary!}
          contactDetails={principal!.contactDetails!}
          epfDetails={principal!.epfDetails!}
          epfInvestment={epfInvestment!}
          personalDetails={principal!.personalDetails!}
          setBankDetails={handlePrincipalBankDetails}
          setContactDetails={handlePrincipalContactDetails}
          setEpfDetails={handlePrincipalEpfDetails}
          setPersonalDetails={handlePrincipalPersonalDetails}
        />
        {accountType === "Individual" ? null : (
          <JointDetails
            bankDetails={joint!.bankSummary!}
            contactDetails={joint!.contactDetails!}
            epfDetails={joint!.epfDetails!}
            epfInvestment={epfInvestment!}
            personalDetails={joint!.personalDetails!}
            setBankDetails={handleJointBankDetails}
            setContactDetails={handleJointContactDetails}
            setEpfDetails={handleJointEpfDetails}
            setPersonalDetails={handleJointPersonalDetails}
          />
        )}
        <AccountDetails accountType={accountType} personalInfo={personalInfo} setPersonalInfo={handlePersonalInfo} />
      </View>
    </ContentPage>
  );
};

export const PersonalDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(PersonalDetailsComponent);
