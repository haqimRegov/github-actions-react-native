import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { borderBottomGray2, px, sh24, sh48, sw24, sw48 } from "../../../styles";
import { AccountDetails } from "./AccountDetails";
import { JointDetails } from "./Joint";
import { PrincipalDetails } from "./Principal";

const { PERSONAL_DETAILS } = Language.PAGE;
interface PersonalDetailsProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const PersonalDetailsComponent: FunctionComponent<PersonalDetailsProps> = ({
  accountType,
  addPersonalInfo,
  details,
  handleNextStep,
  investmentDetails,
  onboarding,
  personalInfo,
  productSales,
  updateOnboarding,
}: PersonalDetailsProps) => {
  const [validations, setValidations] = useState<IPersonalDetailsPageValidation>({
    principal: { epfNumber: undefined, mothersName: undefined },
    joint: { epfNumber: undefined, mothersName: undefined },
  });
  const { principal, joint, epfInvestment, epfShariah, isAllEpf } = personalInfo;
  const investmentCurrencies = productSales!.map(({ investment }) =>
    investment.fundCurrency !== undefined ? investment.fundCurrency : "",
  );
  const checkOtherRelationship =
    principal!.personalDetails?.relationship === "Others"
      ? principal!.personalDetails?.otherRelationship !== ""
      : principal!.personalDetails?.relationship !== "";
  const checkRelationship = accountType === "Individual" ? true : checkOtherRelationship;
  const checkLocalBank = principal!.bankSummary!.localBank!.map(
    (bank) =>
      bank.bankName !== "" &&
      bank.bankAccountNumber !== "" &&
      bank.bankAccountName !== "" &&
      bank.currency?.includes("") === false &&
      bank.bankAccountNameError === undefined &&
      bank.bankAccountNumberError === undefined,
  );

  const checkForeignBank =
    principal!.bankSummary!.foreignBank!.length > 0
      ? principal!.bankSummary!.foreignBank!.map(
          (bank: IBankDetailsState) =>
            bank.bankName !== "" &&
            bank.bankAccountNumber !== "" &&
            bank.bankAccountName !== "" &&
            bank.currency?.includes("") === false &&
            bank.bankLocation !== "" &&
            bank.bankAccountNameError === undefined &&
            bank.bankAccountNumberError === undefined,
        )
      : [true];

  const validatePrincipal = (info: IHolderInfoState) => {
    const { contactDetails, epfDetails, personalDetails } = info;
    const checkEducation =
      (personalDetails!.educationLevel !== "Others" && personalDetails!.educationLevel !== "") ||
      (personalDetails!.educationLevel !== "" &&
        personalDetails!.educationLevel === "Others" &&
        personalDetails!.otherEducationLevel !== "");
    const checkMalaysianDetails =
      personalDetails?.idType !== "Passport" ? personalDetails!.race !== "" && personalDetails!.bumiputera !== undefined : true;
    const checkEpf =
      epfInvestment === true
        ? epfDetails!.epfMemberNumber !== "" && epfDetails!.epfAccountType !== "" && validations.principal.epfNumber === undefined
        : true;

    return (
      Object.values(contactDetails!.contactNumber!)
        .map((contact) => contact.value)
        .flat()
        .includes("") === false &&
      Object.values(contactDetails!.contactNumber!)
        .map((contact) => typeof contact.error)
        .includes("string") === false &&
      checkMalaysianDetails === true &&
      personalDetails!.mothersMaidenName !== "" &&
      personalDetails!.maritalStatus !== "" &&
      checkEducation === true &&
      personalDetails!.monthlyHouseholdIncome !== "" &&
      checkEpf === true &&
      Object.values(validations.principal)
        .map((value) => typeof value)
        .includes(typeof "string") === false
    );
  };

  const jointContactCheck =
    accountType === "Joint" && moment().diff(moment(details!.jointHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "years") < 18;

  const validateJoint = (info: IHolderInfoState) => {
    const { contactDetails, personalDetails } = info;
    // const jointAge = moment().diff(personalInfo.joint!.personalDetails!.dateOfBirth, "years");
    const checkEducation =
      (personalDetails!.educationLevel !== "Others" && personalDetails!.educationLevel !== "") ||
      (personalDetails!.educationLevel !== "" &&
        personalDetails!.educationLevel === "Others" &&
        personalDetails!.otherEducationLevel !== "");
    const checkMalaysianDetails =
      personalDetails?.idType !== "Passport" ? personalDetails!.race !== "" && personalDetails!.bumiputera !== undefined : true;
    // const checkContactNumber =
    //   jointAge >= 18
    //     ? Object.values(contactDetails!.contactNumber!)
    //         .map((contact) => contact.value)
    //         .flat()
    //         .includes("") === false
    //     : true;
    return (
      Object.values(contactDetails!.contactNumber!)
        .map((contact) => typeof contact.error)
        .includes("string") === false &&
      checkMalaysianDetails === true &&
      personalDetails!.mothersMaidenName !== "" &&
      personalDetails!.maritalStatus !== "" &&
      checkEducation === true &&
      (personalDetails!.monthlyHouseholdIncome !== "" || jointContactCheck === true) &&
      Object.values(validations.joint)
        .map((value) => typeof value)
        .includes(typeof "string") === false
    );
  };

  const principalEpfCheck = personalInfo.isAllEpf === true ? principal?.personalDetails?.enableBankDetails === true : true;

  const buttonDisabled =
    accountType === "Individual"
      ? validatePrincipal(principal!) === false ||
        (principalEpfCheck && checkLocalBank.includes(false) === true) ||
        (principalEpfCheck && checkForeignBank.includes(false) === true)
      : validatePrincipal(principal!) === false ||
        checkLocalBank.includes(false) === true ||
        checkForeignBank.includes(false) === true ||
        validateJoint(joint!) === false ||
        checkRelationship === false;

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

  const handleBack = () => {
    handleNextStep("IdentityVerification");
  };

  const handlePrincipalValidation = (value: IPersonalDetailsValidations) => {
    setValidations({ ...validations, principal: { ...validations.principal, ...value } });
  };

  const handleJointValidation = (value: IPersonalDetailsValidations) => {
    setValidations({ ...validations, joint: { ...validations.joint, ...value } });
  };

  const padding = accountType === "Joint" ? px(sw48) : px(sw24);
  const uniqueCurrencies = investmentCurrencies.filter((currency, index) => investmentCurrencies.indexOf(currency) === index);

  const accountNames = [{ label: details!.principalHolder!.name!, value: details!.principalHolder!.name! }];

  if (accountType === "Joint") {
    accountNames.push(
      { label: details!.jointHolder!.name!, value: details!.jointHolder!.name! },
      { label: PERSONAL_DETAILS.OPTION_COMBINED, value: PERSONAL_DETAILS.OPTION_COMBINED },
    );
  }

  return (
    <ContentPage buttonContainerStyle={padding} continueDisabled={buttonDisabled} handleCancel={handleBack} handleContinue={handleSubmit}>
      <View>
        <PrincipalDetails
          accountNames={accountNames}
          accountType={accountType}
          bankDetails={principal!.bankSummary!}
          contactDetails={principal!.contactDetails!}
          epfDetails={principal!.epfDetails!}
          epfInvestment={epfInvestment!}
          epfShariah={epfShariah!}
          isAllEpf={isAllEpf}
          investmentCurrencies={uniqueCurrencies}
          personalDetails={principal!.personalDetails!}
          setBankDetails={handlePrincipalBankDetails}
          setContactDetails={handlePrincipalContactDetails}
          setEpfDetails={handlePrincipalEpfDetails}
          setPersonalDetails={handlePrincipalPersonalDetails}
          setValidations={handlePrincipalValidation}
          validations={validations.principal}
        />
        {accountType === "Individual" ? null : (
          <Fragment>
            <CustomSpacer space={sh24} />
            <View style={borderBottomGray2} />
            <CustomSpacer space={sh48} />
            <JointDetails
              accountNames={accountNames}
              bankDetails={joint!.bankSummary!}
              contactDetails={joint!.contactDetails!}
              epfDetails={joint!.epfDetails!}
              epfInvestment={epfInvestment!}
              epfShariah={epfShariah!}
              investmentCurrencies={uniqueCurrencies}
              jointContactCheck={jointContactCheck}
              personalDetails={joint!.personalDetails!}
              setBankDetails={handleJointBankDetails}
              setContactDetails={handleJointContactDetails}
              setEpfDetails={handleJointEpfDetails}
              setPersonalDetails={handleJointPersonalDetails}
              setValidations={handleJointValidation}
              validations={validations.joint}
            />
          </Fragment>
        )}
        <AccountDetails
          accountType={accountType}
          investmentDetails={investmentDetails!}
          personalInfo={personalInfo}
          setPersonalInfo={handlePersonalInfo}
        />
      </View>
    </ContentPage>
  );
};

export const PersonalDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(PersonalDetailsComponent);
