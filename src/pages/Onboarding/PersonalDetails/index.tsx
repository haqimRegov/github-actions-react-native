import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../components";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { borderBottomBlack21, px, sh24, sh48, sw24, sw48 } from "../../../styles";
import { AccountDetails } from "./AccountDetails";
import { JointDetails } from "./Joint";
import { PrincipalDetails } from "./Principal";

interface PersonalDetailsProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const PersonalDetailsComponent: FunctionComponent<PersonalDetailsProps> = ({
  accountType,
  addPersonalInfo,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
  productSales,
}: PersonalDetailsProps) => {
  const { principal, joint, epfInvestment } = personalInfo;
  const investmentCurrencies = productSales!.map(({ investment }) =>
    investment.fundCurrency !== undefined ? investment.fundCurrency : "",
  );
  const checkRelationship = accountType === "Individual" ? true : principal!.personalDetails?.relationship !== "";
  const checkLocalBank = principal!.bankSummary!.localBank!.map(
    (bank) => bank.bankName !== "" && bank.bankAccountNumber !== "" && bank.bankAccountName !== "" && bank.currency?.includes("") === false,
  );

  const checkForeignBank =
    principal!.bankSummary!.foreignBank!.length > 0
      ? principal!.bankSummary!.foreignBank!.map(
          (bank) =>
            bank.bankName !== "" &&
            bank.bankAccountNumber !== "" &&
            bank.bankAccountName !== "" &&
            bank.currency?.includes("") === false &&
            bank.bankLocation !== "",
        )
      : [true];

  const validateDetails = (details: IHolderInfoState) => {
    const { contactDetails, personalDetails } = details;
    const checkEducation =
      personalDetails!.educationLevel !== "" ||
      (personalDetails!.educationLevel !== "" &&
        personalDetails!.educationLevel === "Others" &&
        personalDetails!.otherEducationLevel !== "");
    const checkMalaysianDetails =
      personalDetails?.idType !== "Passport" ? personalDetails!.race !== "" && personalDetails!.bumiputera !== undefined : true;
    return (
      Object.values(contactDetails!.contactNumber!)
        .map((contact) => contact.value)
        .flat()
        .includes("") === false &&
      checkMalaysianDetails === true &&
      personalDetails!.mothersMaidenName !== "" &&
      personalDetails!.maritalStatus !== "" &&
      checkEducation === true &&
      personalDetails!.monthlyHouseholdIncome !== ""
    );
  };

  const buttonDisabled =
    accountType === "Individual"
      ? validateDetails(principal!) === false || checkLocalBank.includes(false) === true || checkForeignBank.includes(false) === true
      : validateDetails(principal!) === false ||
        checkLocalBank.includes(false) === true ||
        checkForeignBank.includes(false) === true ||
        validateDetails(joint!) === false ||
        checkRelationship === false;

  const handleSubmit = () => {
    const route: TypeOnboardingRoute = personalInfo.editPersonal === true ? "PersonalInfoSummary" : "EmploymentDetails";
    addPersonalInfo({ ...personalInfo, editPersonal: true });
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
  const padding = accountType === "Joint" ? px(sw48) : px(sw24);
  const uniqueCurrencies = investmentCurrencies.filter((currency, index) => investmentCurrencies.indexOf(currency) === index);

  return (
    <ContentPage
      buttonContainerStyle={padding}
      continueDisabled={buttonDisabled}
      handleCancel={handleCancelOnboarding!}
      handleContinue={handleSubmit}>
      <View>
        <PrincipalDetails
          accountType={accountType}
          bankDetails={principal!.bankSummary!}
          contactDetails={principal!.contactDetails!}
          epfDetails={principal!.epfDetails!}
          epfInvestment={epfInvestment!}
          investmentCurrencies={uniqueCurrencies}
          personalDetails={principal!.personalDetails!}
          setBankDetails={handlePrincipalBankDetails}
          setContactDetails={handlePrincipalContactDetails}
          setEpfDetails={handlePrincipalEpfDetails}
          setPersonalDetails={handlePrincipalPersonalDetails}
        />
        {accountType === "Individual" ? null : (
          <Fragment>
            <CustomSpacer space={sh24} />
            <View style={borderBottomBlack21} />
            <CustomSpacer space={sh48} />
            <JointDetails
              bankDetails={joint!.bankSummary!}
              contactDetails={joint!.contactDetails!}
              epfDetails={joint!.epfDetails!}
              epfInvestment={epfInvestment!}
              investmentCurrencies={uniqueCurrencies}
              personalDetails={joint!.personalDetails!}
              setBankDetails={handleJointBankDetails}
              setContactDetails={handleJointContactDetails}
              setEpfDetails={handleJointEpfDetails}
              setPersonalDetails={handleJointPersonalDetails}
            />
          </Fragment>
        )}
        <AccountDetails accountType={accountType} personalInfo={personalInfo} setPersonalInfo={handlePersonalInfo} />
      </View>
    </ContentPage>
  );
};

export const PersonalDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(PersonalDetailsComponent);
