import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";

import { CustomSpacer } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_CURRENCY } from "../../data/dictionary";
import { sh24 } from "../../styles";
import { isNotEmpty } from "../../utils";
import { ForeignBankDetails } from "./Foreign";
import { LocalBankDetails } from "./Local";

const { PERSONAL_DETAILS } = Language.PAGE;

interface IBankDetailsProps {
  accountType: TypeAccountChoices;
  bankSummary: IBankSummaryState;
  currentCurrency: string;
  details: IClientDetailsState;
  enableBank: boolean;
  existingBankSummary?: IBankSummaryState;
  foreignBankDetails: IBankDetailsState[];
  localBankDetails: IBankDetailsState[];
  investmentCurrencies: string[];
  isAllEpf: boolean;
  handleBankSummary: (bankSummary: IBankSummaryState) => void;
  setDeleteToast: (toggle: boolean) => void;
  handleEnableLocalBank: (enable: boolean) => void;
  setForeignBankDetails: (input: IBankDetailsState[]) => void;
  setCurrentCurrency: (currency: string) => void;
  setLocalBankDetails: (input: IBankDetailsState[]) => void;
}

export const BankDetails: FunctionComponent<IBankDetailsProps> = ({
  accountType,
  bankSummary,
  currentCurrency,
  details,
  enableBank,
  existingBankSummary,
  foreignBankDetails,
  localBankDetails,
  investmentCurrencies,
  isAllEpf,
  handleBankSummary,
  setDeleteToast,
  handleEnableLocalBank,
  setForeignBankDetails,
  setCurrentCurrency,
  setLocalBankDetails,
}: IBankDetailsProps) => {
  // TODO Undo delete functionality
  // const [deleteCount, setDeleteCount, tempData, setTempData] = useDelete<IBankSummaryState>(bankSummary!, handleBankSummary);
  // const checkBankSummary = tempData !== undefined ? tempData : bankSummary;
  // const localBank = tempData !== undefined ? tempData.localBank : bankSummary.localBank;
  // const foreignBank = tempData !== undefined ? tempData.foreignBank : bankSummary.foreignBank;
  const { localBank, foreignBank } = bankSummary;
  const spaceToButton = foreignBankDetails.length !== 0 ? sh24 : 0;
  const initialLocalBankState: IBankDetailsState = {
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    bankSwiftCode: "",
    currency: [DICTIONARY_CURRENCY[0].value],
    otherBankName: "",
  };

  const initialForeignBankState: IBankDetailsState = {
    ...initialLocalBankState,
    bankLocation: "",
    currency: [""],
  };

  // const handleUndoDelete = () => {
  //   setTempData(bankSummary);
  // };

  const checkLocalBank = localBank!.map(
    (bank) =>
      bank.bankName !== "" &&
      bank.bankAccountNumber !== "" &&
      bank.bankAccountName !== "" &&
      bank.currency?.includes("") === false &&
      bank.bankAccountNameError === undefined &&
      bank.bankAccountNumberError === undefined,
  );

  const checkForeignBank =
    foreignBank!.length > 0
      ? foreignBank!.map(
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
  const checkDisabled = checkLocalBank.includes(false) || checkForeignBank.includes(false);
  const checkLocalCurrencyDisabled = checkForeignBank.includes(false);
  const checkForeignCurrencyDisabled = checkLocalBank.includes(false);

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
  const accountNames = [{ label: details.principalHolder!.name!, value: details.principalHolder?.name! }];
  if (accountType === "Joint") {
    accountNames.push(
      { label: details!.jointHolder!.name!, value: details!.jointHolder!.name! },
      { label: PERSONAL_DETAILS.OPTION_COMBINED, value: PERSONAL_DETAILS.OPTION_COMBINED },
    );
  }
  const existingLocalBank = existingBankSummary !== undefined ? existingBankSummary.localBank : undefined;
  const existingForeignBank = existingBankSummary !== undefined ? existingBankSummary.foreignBank : undefined;

  return (
    <View>
      <LocalBankDetails
        addCurrencyDisabled={checkLocalCurrencyDisabled}
        addDisabled={checkDisabled}
        bankingDetails={localBank!}
        bankNames={accountNames}
        bankSummary={bankSummary}
        currentCurrency={currentCurrency}
        // deleteCount={deleteCount}
        enableBank={enableBank}
        existingDetails={existingLocalBank}
        initialForeignBankState={initialForeignBankState}
        investmentCurrencies={investmentCurrencies}
        handleEnableLocalBank={handleEnableLocalBank}
        isAllEpf={isAllEpf}
        remainingCurrencies={checkCurrencyRemaining}
        setBankingDetails={setLocalBankDetails}
        setDeleteToast={setDeleteToast}
        setCurrentCurrency={setCurrentCurrency}
        // setDeleteCount={setDeleteCount}
        setForeignBankDetails={setForeignBankDetails}
        // setTempData={setTempData}
      />
      {isAllEpf === true ? null : (
        <Fragment>
          <CustomSpacer space={spaceToButton} />
          <ForeignBankDetails
            addCurrencyDisabled={checkForeignCurrencyDisabled}
            addDisabled={checkDisabled}
            bankingDetails={foreignBank!}
            bankNames={accountNames}
            bankSummary={bankSummary}
            currentCurrency={currentCurrency}
            // deleteCount={deleteCount}
            existingDetails={existingForeignBank}
            initialForeignBankState={initialForeignBankState}
            investmentCurrencies={investmentCurrencies}
            remainingCurrencies={checkCurrencyRemaining}
            setBankingDetails={setForeignBankDetails}
            setDeleteToast={setDeleteToast}
            setCurrentCurrency={setCurrentCurrency}
            // setDeleteCount={setDeleteCount}
            // setTempData={setTempData}
          />
        </Fragment>
      )}
    </View>
  );
};
