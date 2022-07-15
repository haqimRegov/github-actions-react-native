import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { ColorCard, ContentPage, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { ERROR } from "../../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { px, sh24, sw24 } from "../../../styles";
import { isNotEmpty, isNumber } from "../../../utils";
import { defaultContentProps } from "../Content";
import { AccountDetails } from "./AccountDetails";
import { BankDetails } from "./BankDetails";
import { EPFDetails } from "./EPFDetails";

const { PERSONAL_DETAILS } = Language.PAGE;

interface PersonalDetailsProps extends PersonalInfoStoreProps, NewSalesContentProps {}

const AdditionalInfoComponent: FunctionComponent<PersonalDetailsProps> = ({
  accountType,
  addPersonalInfo,
  details,
  handleNextStep,
  investmentDetails,
  // newSales,
  personalInfo,
  productSales,
}: PersonalDetailsProps) => {
  const [epfNumberValidation, setEpfNumberValidation] = useState<string | undefined>(undefined);
  const { epfInvestment, epfShariah } = personalInfo;
  const { bankSummary, epfDetails } = personalInfo.principal!;
  const { localBank, foreignBank } = bankSummary!;
  const inputEpfType = epfDetails!.epfAccountType!;
  const inputEpfNumber = epfDetails!.epfMemberNumber!;
  const handlePersonalInfo = (value: IPersonalInfoState) => {
    addPersonalInfo({ ...personalInfo, ...value });
  };

  const handleCancel = () => {};
  const handleContinue = () => {
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
            bank.bankAccountName === "" &&
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
  const checkEpf = epfInvestment === true ? epfNumberValidation !== undefined || inputEpfNumber === "" : false;
  const accountNames = [{ label: details!.principalHolder!.name!, value: details!.principalHolder!.name! }];
  const continueDisabled =
    checkLocalBank.includes(false) === true ||
    checkForeignBank.includes(false) === true ||
    checkCurrencyRemaining.length !== 0 ||
    checkEpf === true;

  if (accountType === "Joint") {
    accountNames.push(
      { label: details!.jointHolder!.name!, value: details!.jointHolder!.name! },
      { label: PERSONAL_DETAILS.OPTION_COMBINED, value: PERSONAL_DETAILS.OPTION_COMBINED },
    );
  }

  return (
    <ContentPage
      {...defaultContentProps}
      continueDisabled={continueDisabled}
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      subheading={PERSONAL_DETAILS.HEADING_ADD_ADDITIONAL}
      subtitle={PERSONAL_DETAILS.SUBTITLE_ADDITIONAL_DETAILS}>
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
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
          foreignBankDetails={foreignBank!}
          investmentCurrencies={investmentCurrencies}
          localBankDetails={localBank!}
          remainingCurrencies={checkCurrencyRemaining}
          setForeignBankDetails={handleForeignBank}
          setLocalBankDetails={handleLocalBank}
        />
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

export const AdditionalInfo = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(AdditionalInfoComponent);
