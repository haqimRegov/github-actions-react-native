import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { ColorCard, ContentPage, CustomSpacer, CustomTextInput, NewDropdown } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_CURRENCY, DICTIONARY_RELATIONSHIP, ERROR } from "../../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { px, sh16, sh24, sw24 } from "../../../styles";
import { isNotEmpty, isNumber } from "../../../utils";
import { AccountDetails } from "./AccountDetails";
import { BankDetails } from "./BankDetails";
import { EPFDetails } from "./EPFDetails";

const { PERSONAL_DETAILS } = Language.PAGE;

const initialBankDetails: IBankDetailsState = {
  bankAccountName: "",
  bankAccountNumber: "",
  bankLocation: DICTIONARY_COUNTRIES[0].value,
  bankName: "",
  bankSwiftCode: "",
  currency: [DICTIONARY_CURRENCY[0].value],
  otherBankName: "",
};

interface PersonalDetailsProps extends PersonalInfoStoreProps, NewSalesContentProps {}

const AdditionalInfoComponent: FunctionComponent<PersonalDetailsProps> = ({
  accountType,
  addPersonalInfo,
  details,
  handleNextStep,
  investmentDetails,
  newSales,
  personalInfo,
  productSales,
  updateNewSales,
}: PersonalDetailsProps) => {
  const [epfNumberValidation, setEpfNumberValidation] = useState<string | undefined>(undefined);
  const { epfInvestment, epfShariah, signatory, incomeDistribution, isAllEpf, principal } = personalInfo;
  const { disabledSteps, finishedSteps } = newSales;
  const { bankSummary, epfDetails, personalDetails } = personalInfo.principal!;
  const { localBank, foreignBank } = bankSummary!;
  const { enableBankDetails, otherRelationship, relationship } = personalDetails!;
  const inputEpfType = epfDetails!.epfAccountType!;
  const inputEpfNumber = epfDetails!.epfMemberNumber!;

  const handlePersonalInfo = (value: IPersonalInfoState) => {
    addPersonalInfo({ ...personalInfo, ...value });
  };

  const handleCancel = () => {
    handleNextStep("IdentityVerification");
  };

  const handleContinue = () => {
    const updatedDisabledSteps = [...disabledSteps];
    const updatedFinishedSteps = [...finishedSteps];

    const findFinishedId = updatedFinishedSteps.indexOf("IdentityVerification");
    if (findFinishedId === -1) {
      updatedFinishedSteps.push("IdentityVerification");
    }

    const findDisabledId = updatedDisabledSteps.indexOf("IdentityVerification");
    if (findDisabledId === -1) {
      updatedDisabledSteps.push("IdentityVerification");
    }

    const findDisabledDetails = updatedDisabledSteps.indexOf("AdditionalDetails");
    if (findDisabledDetails === -1) {
      updatedDisabledSteps.push("AdditionalDetails");
    }

    const findFinishedDetails = updatedFinishedSteps.indexOf("AdditionalDetails");
    if (findFinishedDetails === -1) {
      updatedFinishedSteps.push("AdditionalDetails");
    }

    updateNewSales({ ...newSales, disabledSteps: updatedDisabledSteps, finishedSteps: updatedFinishedSteps });
    handleNextStep("Summary");
  };

  const handleForeignBank = (updatedForeignBank: IBankDetailsState[]) => {
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        bankSummary: {
          ...bankSummary,
          foreignBank: updatedForeignBank,
        },
      },
    });
  };

  const handleLocalBank = (updatedLocalBank: IBankDetailsState[]) => {
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        bankSummary: {
          ...bankSummary,
          localBank: updatedLocalBank,
        },
      },
    });
  };

  const handleEnableLocalBank = (enable: boolean) => {
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        personalDetails: {
          ...personalInfo.principal?.personalDetails,
          enableBankDetails: enable,
        },
        bankSummary: {
          localBank: [{ ...initialBankDetails }],
          foreignBank: [],
        },
      },
    });
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
    setEpfNumberValidation(checkEpfNumber);
  };

  const handleRelationship = (value: string) => {
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        personalDetails: {
          ...personalInfo.principal?.personalDetails,
          relationship: value,
        },
      },
    });
  };

  const handleOtherRelationship = (otherRelationValue: string) => {
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        personalDetails: {
          ...personalInfo.principal?.personalDetails,
          otherRelationship: otherRelationValue,
        },
      },
    });
  };

  // TODO change account name check to !== for both local and foreign

  const checkLocalBank = bankSummary!.localBank!.map(
    (bank) =>
      bank.bankName !== "" &&
      bank.bankAccountNumber !== "" &&
      bank.bankAccountName !== "" &&
      bank.currency?.includes("") === false &&
      bank.bankAccountNameError === undefined &&
      bank.bankAccountNumberError === undefined,
  );

  const checkForeignBank =
    bankSummary!.foreignBank!.length > 0
      ? bankSummary!.foreignBank!.map(
          (bank: IBankDetailsState) =>
            bank.bankName !== "" &&
            bank.bankAccountNumber !== "" &&
            bank.bankAccountName !== "" &&
            bank.currency?.includes("") === false &&
            bank.bankLocation !== "" &&
            bank.bankSwiftCode !== "" &&
            bank.bankAccountNameError === undefined &&
            bank.bankAccountNumberError === undefined,
        )
      : [true];

  const investmentCurrencies = productSales!.map(({ investment }) =>
    investment.fundCurrency !== undefined ? investment.fundCurrency : "",
  );

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
  const checkEpf = epfInvestment === true ? epfNumberValidation !== undefined || inputEpfNumber === "" || inputEpfType === "" : false;
  const checkJoint = accountType === "Joint" ? relationship === "" || (relationship === "Others" && otherRelationship === "") : false;
  const accountNames = [{ label: details!.principalHolder!.name!, value: details!.principalHolder!.name! }];
  const principalEpfCheck = personalInfo.isAllEpf === true ? principal?.personalDetails?.enableBankDetails === true : true;
  const continueDisabled =
    (checkLocalBank.includes(false) === true && principalEpfCheck === true) ||
    (checkForeignBank.includes(false) === true && principalEpfCheck === true) ||
    checkCurrencyRemaining.length !== 0 ||
    checkEpf === true ||
    signatory === "" ||
    incomeDistribution === "" ||
    checkJoint;
  if (accountType === "Joint") {
    accountNames.push(
      { label: details!.jointHolder!.name!, value: details!.jointHolder!.name! },
      { label: PERSONAL_DETAILS.OPTION_COMBINED, value: PERSONAL_DETAILS.OPTION_COMBINED },
    );
  }

  return (
    <ContentPage
      continueDisabled={continueDisabled}
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      subheading={PERSONAL_DETAILS.HEADING_ADD_ADDITIONAL}
      subtitle={PERSONAL_DETAILS.SUBTITLE_ADDITIONAL_DETAILS}>
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        {accountType === "Joint" ? (
          <Fragment>
            <ColorCard
              header={{ label: PERSONAL_DETAILS.LABEL_HEADER_JOINT_RELATIONSHIP }}
              content={
                <Fragment>
                  <NewDropdown
                    handleChange={handleRelationship}
                    items={DICTIONARY_RELATIONSHIP}
                    label={PERSONAL_DETAILS.LABEL_RELATIONSHIP}
                    value={relationship!}
                  />
                  {relationship! === "Others" ? (
                    <CustomTextInput
                      label={PERSONAL_DETAILS.LABEL_RELATIONSHIP_OTHER}
                      onChangeText={handleOtherRelationship}
                      spaceToTop={sh16}
                      value={otherRelationship}
                    />
                  ) : null}
                </Fragment>
              }
            />
            <CustomSpacer space={sh24} />
          </Fragment>
        ) : null}
        {epfInvestment === true ? (
          <Fragment>
            <ColorCard
              header={{ label: PERSONAL_DETAILS.LABEL_EPF_DETAILS }}
              content={
                <EPFDetails
                  epfNumberError={epfNumberValidation}
                  epfShariah={epfShariah!}
                  inputEpfNumber={inputEpfNumber}
                  inputEpfType={inputEpfType}
                  onBlurEpfNumber={handleEpfNumber}
                  setInputEpfNumber={handleInputEpfNumber}
                  setInputEpfType={handleInputEpfType}
                />
              }
            />
            <CustomSpacer space={sh24} />
          </Fragment>
        ) : null}
        <BankDetails
          bankNames={accountNames}
          bankSummary={bankSummary!}
          enableBank={enableBankDetails!}
          foreignBankDetails={foreignBank!}
          investmentCurrencies={investmentCurrencies}
          isAllEpf={isAllEpf || false}
          handleEnableLocalBank={handleEnableLocalBank}
          localBankDetails={localBank!}
          remainingCurrencies={checkCurrencyRemaining}
          setForeignBankDetails={handleForeignBank}
          setLocalBankDetails={handleLocalBank}
        />
        <AccountDetails
          accountType={accountType!}
          investmentDetails={investmentDetails!}
          personalInfo={personalInfo}
          setPersonalInfo={handlePersonalInfo}
        />
      </View>
    </ContentPage>
  );
};

export const AdditionalInfo = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(AdditionalInfoComponent);
