import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { AccountHeader, ColorCard, ContentPage, CustomSpacer, CustomToast } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_CURRENCY } from "../../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { px, sh24, sw24 } from "../../../styles";
import { BankDetails } from "../../../templates";
import { isNotEmpty } from "../../../utils";
import { AccountDetails } from "./AccountDetails";
import { JointRelationship } from "./JointRelationship";

const { ADDITIONAL_DETAILS } = Language.PAGE;
interface AdditionalDetailsProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const initialBankDetails: IBankDetailsState = {
  bankAccountName: "",
  bankAccountNumber: "",
  bankLocation: DICTIONARY_COUNTRIES[0].value,
  bankName: "",
  bankSwiftCode: "",
  currency: [DICTIONARY_CURRENCY[0].value],
  otherBankName: "",
};

const AdditionalDetailsComponent: FunctionComponent<AdditionalDetailsProps> = ({
  accountType,
  addPersonalInfo,
  details,
  handleNextStep,
  investmentDetails,
  onboarding,
  personalInfo,
  productSales,
  updateOnboarding,
}: AdditionalDetailsProps) => {
  const [deleteToast, setDeleteToast] = useState<boolean>(false);
  const [currentCurrency, setCurrentCurrency] = useState<string>("");
  // const [deleteCount, setEpfNumberValidation] = useState<string | undefined>(undefined);
  const { principal, isAllEpf } = personalInfo;
  const { bankSummary } = principal!;
  const { localBank, foreignBank } = bankSummary!;
  const personalDetails = principal?.personalDetails;
  const { enableBankDetails } = personalDetails!;

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
  const checkLocalBankEmpty = principal!.bankSummary!.localBank!.map(
    (bank) =>
      bank.bankName === "" &&
      bank.bankAccountNumber === "" &&
      bank.bankAccountName === "" &&
      bank.bankAccountNameError === undefined &&
      bank.bankAccountNumberError === undefined,
  );

  const checkLocalBankEpf =
    isAllEpf === true
      ? checkLocalBank.includes(false) === true && checkLocalBankEmpty.includes(false) === true
      : checkLocalBank.includes(false) === true;
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

  const handleSubmit = () => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    addPersonalInfo({ ...personalInfo, editPersonal: true });
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep("PersonalInfoSummary");
  };

  const handlePrincipalBankDetails = (value: IBankSummaryState) => {
    addPersonalInfo({ principal: { bankSummary: { ...bankSummary, ...value } } });
  };
  const handlePrincipalPersonalDetails = (value: IPersonalDetailsState) => {
    addPersonalInfo({ principal: { personalDetails: { ...principal!.personalDetails, ...value } } });
  };

  const handleEnable = (toggle: boolean | undefined) => {
    handlePrincipalPersonalDetails({ ...personalDetails, enableBankDetails: toggle });
    const bankSummaryState: IBankSummaryState = {
      localBank: [{ ...initialBankDetails }],
      foreignBank: [],
    };
    handlePrincipalBankDetails(bankSummaryState);
  };

  const setLocalBank = (value: IBankDetailsState[]) => {
    handlePrincipalBankDetails({ localBank: value });
  };
  const setForeignBank = (value: IBankDetailsState[]) => {
    handlePrincipalBankDetails({ foreignBank: value });
  };

  const handlePersonalInfo = (value: IPersonalInfoState) => {
    addPersonalInfo({ ...personalInfo, ...value });
  };

  const handleBack = () => {
    handleNextStep("EmploymentDetails");
  };

  const handleBankSummary = (updatedBankSummary: IBankSummaryState) => {
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        bankSummary: {
          ...bankSummary,
          ...updatedBankSummary,
        },
      },
    });
  };

  const accountNames = [{ label: details!.principalHolder!.name!, value: details!.principalHolder!.name! }];

  if (accountType === "Joint") {
    accountNames.push(
      { label: details!.jointHolder!.name!, value: details!.jointHolder!.name! },
      { label: ADDITIONAL_DETAILS.OPTION_COMBINED, value: ADDITIONAL_DETAILS.OPTION_COMBINED },
    );
  }

  const nonMyrCurrencies = investmentCurrencies.filter((currency) => currency !== "MYR");
  const selectedNonMyrCurrencies = isNotEmpty(foreignBank)
    ? [
        ...foreignBank!
          .map((eachBank: IBankDetailsState) => eachBank.currency)
          .map((currency) => {
            const updatedArray = [...currency!].filter((each) => each !== "MYR");
            return updatedArray;
          })
          .flat(),
        ...localBank!
          .map((eachBank: IBankDetailsState) => eachBank.currency)
          .map((currency) => {
            const updatedArray = [...currency!].filter((each) => each !== "MYR");
            return updatedArray;
          })
          .flat(),
      ]
    : [];
  const checkCurrencyRemaining = nonMyrCurrencies.filter((eachCurrency: string) => !selectedNonMyrCurrencies.includes(eachCurrency));
  const buttonDisabled =
    accountType === "Individual"
      ? checkLocalBankEpf || checkForeignBank.includes(false) === true || checkCurrencyRemaining.length > 0
      : checkLocalBank.includes(false) === true || checkForeignBank.includes(false) === true || checkRelationship === false;
  const names =
    accountType === "Joint"
      ? `${personalInfo.principal!.personalDetails!.name!} ${ADDITIONAL_DETAILS.LABEL_AND} ${personalInfo.joint!.personalDetails!.name!}`
      : "";
  const subtitleLabel = `${ADDITIONAL_DETAILS.LABEL_PRINCIPAL} ${ADDITIONAL_DETAILS.LABEL_AND} ${ADDITIONAL_DETAILS.LABEL_JOINT}`;

  return (
    <Fragment>
      <ContentPage
        continueDisabled={buttonDisabled}
        handleCancel={handleBack}
        handleContinue={handleSubmit}
        subheading={ADDITIONAL_DETAILS.HEADING_ADDITIONAL_DETAILS}
        subtitle={ADDITIONAL_DETAILS.SUBHEADING_ADDITIONAL_DETAILS}
        spaceToTitle={0}>
        <View style={px(sw24)}>
          <CustomSpacer space={sh24} />
          {accountType === "Individual" ? null : <AccountHeader title={subtitleLabel} subtitle={names} />}
          <AccountDetails
            accountType={accountType!}
            investmentDetails={investmentDetails!}
            personalInfo={personalInfo}
            setPersonalInfo={handlePersonalInfo}
          />
          {accountType === "Joint" ? (
            <Fragment>
              <CustomSpacer space={sh24} />
              <ColorCard
                content={
                  <Fragment>
                    <JointRelationship personalDetails={personalDetails!} setPersonalDetails={handlePrincipalPersonalDetails} />
                  </Fragment>
                }
                header={{ label: ADDITIONAL_DETAILS.LABEL_HEADER_JOINT_RELATIONSHIP }}
              />
            </Fragment>
          ) : null}
          <CustomSpacer space={sh24} />
          <BankDetails
            accountType={accountType!}
            bankSummary={bankSummary!}
            currentCurrency={currentCurrency}
            details={details!}
            enableBank={enableBankDetails!}
            foreignBankDetails={foreignBank!}
            handleBankSummary={handleBankSummary}
            investmentCurrencies={investmentCurrencies}
            isAllEpf={isAllEpf || false}
            handleEnableLocalBank={handleEnable}
            localBankDetails={localBank!}
            setCurrentCurrency={setCurrentCurrency}
            setDeleteToast={setDeleteToast}
            setForeignBankDetails={setForeignBank}
            setLocalBankDetails={setLocalBank}
          />
        </View>
      </ContentPage>
      <CustomToast
        parentVisible={deleteToast}
        deleteText={`${currentCurrency} ${ADDITIONAL_DETAILS.LABEL_CURRENCY_DELETED}`}
        setParentVisible={setDeleteToast}
      />
    </Fragment>
  );
};

export const AdditionalDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(AdditionalDetailsComponent);
