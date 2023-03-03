import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { AccountHeader, ColorCard, ContentPage, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { px, sh24, sw24 } from "../../../styles";
import { BankDetails } from "../../../templates";
import { getInitialBankState, isNotEmpty } from "../../../utils";
import { AccountDetails } from "./AccountDetails";
import { JointRelationship } from "./JointRelationship";

const { ADDITIONAL_DETAILS } = Language.PAGE;
interface AdditionalDetailsProps extends PersonalInfoStoreProps, OnboardingContentProps {}

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
  updateOnboardingToast,
}: AdditionalDetailsProps) => {
  const { disabledSteps, finishedSteps } = onboarding;
  const { editMode, principal, isAllEpf } = personalInfo;
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
      // bank.bankAccountName === "" &&
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
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];
    // add to finishedSteps
    if (updatedFinishedSteps.includes("EmploymentDetails") === false) {
      updatedFinishedSteps.push("EmploymentDetails");
    }

    // add to finishedSteps
    if (updatedFinishedSteps.includes("AdditionalDetails") === false) {
      updatedFinishedSteps.push("AdditionalDetails");
    }

    // remove from disabledSteps (next step)
    const findPersonalInfoSummary = updatedDisabledSteps.indexOf("PersonalInfoSummary");
    if (findPersonalInfoSummary !== -1) {
      updatedDisabledSteps.splice(findPersonalInfoSummary, 1);
    }

    // remove in disabledSteps if edit mode
    if (editMode === true) {
      addPersonalInfo({ ...personalInfo, editMode: false });
    }

    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps, finishedSteps: updatedFinishedSteps });

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
      localBank: [{ ...getInitialBankState(details?.principalHolder!.name) }],
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

  const handleToast = (value?: string) => {
    updateOnboardingToast(`${value} ${ADDITIONAL_DETAILS.LABEL_CURRENCY_DELETED}`);
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
      : checkLocalBank.includes(false) === true ||
        checkForeignBank.includes(false) === true ||
        checkRelationship === false ||
        checkCurrencyRemaining.length > 0;
  const names =
    accountType === "Joint"
      ? `${personalInfo.principal!.personalDetails!.name!} ${ADDITIONAL_DETAILS.LABEL_AND} ${personalInfo.joint!.personalDetails!.name!}`
      : "";
  const subtitleLabel = `${ADDITIONAL_DETAILS.LABEL_PRINCIPAL} ${ADDITIONAL_DETAILS.LABEL_AND} ${ADDITIONAL_DETAILS.LABEL_JOINT}`;

  return (
    <Fragment>
      <ContentPage
        cancelDisabled={editMode === true}
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
            details={details!}
            enableBank={enableBankDetails!}
            foreignBankDetails={foreignBank!}
            handleBankSummary={handleBankSummary}
            investmentCurrencies={investmentCurrencies}
            isAllEpf={isAllEpf || false}
            handleEnableLocalBank={handleEnable}
            localBankDetails={localBank!}
            handleToast={handleToast}
            setForeignBankDetails={setForeignBank}
            setLocalBankDetails={setLocalBank}
          />
        </View>
      </ContentPage>
    </Fragment>
  );
};

export const AdditionalDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(AdditionalDetailsComponent);
