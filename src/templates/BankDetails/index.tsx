import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_CURRENCY } from "../../data/dictionary";
import { sh24 } from "../../styles";
import { checkBankValidation, isNotEmpty } from "../../utils";
import { ForeignBankDetails } from "./Foreign";
import { LocalBankDetails } from "./Local";

const { PERSONAL_DETAILS } = Language.PAGE;

interface IBankDetailsProps {
  accountType: TypeAccountChoices;
  bankSummary: IBankSummaryState;
  details: IClientDetailsState;
  enableBank: boolean;
  existingBankSummary?: IBankSummaryState;
  foreignBankDetails: IBankDetailsState[];
  localBankDetails: IBankDetailsState[];
  investmentCurrencies: string[];
  isAllEpf: boolean;
  handleBankSummary: (bankSummary: IBankSummaryState) => void;
  handleToast: (value?: string) => void;
  handleEnableLocalBank: (enable: boolean) => void;
  setForeignBankDetails: (input: IBankDetailsState[]) => void;
  setLocalBankDetails: (input: IBankDetailsState[]) => void;
}

export const BankDetails: FunctionComponent<IBankDetailsProps> = ({
  accountType,
  bankSummary,
  details,
  enableBank,
  existingBankSummary,
  foreignBankDetails,
  // localBankDetails,
  investmentCurrencies,
  isAllEpf,
  // handleBankSummary,
  handleToast,
  handleEnableLocalBank,
  setForeignBankDetails,
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
    bankAccountName: accountType === "Individual" ? details.principalHolder?.name : "",
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

  const checkDisabled = checkBankValidation(localBank!, "local") || checkBankValidation(foreignBank!, "foreign");
  const checkLocalCurrencyDisabled = checkBankValidation(foreignBank!, "foreign");
  const checkForeignCurrencyDisabled = checkBankValidation(localBank!, "local");

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
        accountType={accountType}
        addCurrencyDisabled={checkLocalCurrencyDisabled}
        addDisabled={checkDisabled}
        bankingDetails={localBank!}
        bankNames={accountNames}
        bankSummary={bankSummary}
        // deleteCount={deleteCount}
        enableBank={enableBank}
        existingDetails={existingLocalBank}
        initialForeignBankState={initialForeignBankState}
        investmentCurrencies={investmentCurrencies}
        handleEnableLocalBank={handleEnableLocalBank}
        isAllEpf={isAllEpf}
        remainingCurrencies={checkCurrencyRemaining}
        setBankingDetails={setLocalBankDetails}
        handleToast={handleToast}
        // setDeleteCount={setDeleteCount}
        setForeignBankDetails={setForeignBankDetails}
        // setTempData={setTempData}
      />
      {isAllEpf === true ? null : (
        <Fragment>
          <CustomSpacer space={spaceToButton} />
          <ForeignBankDetails
            accountType={accountType}
            addCurrencyDisabled={checkForeignCurrencyDisabled}
            addDisabled={checkDisabled}
            bankingDetails={foreignBank!}
            bankNames={accountNames}
            bankSummary={bankSummary}
            // deleteCount={deleteCount}
            existingDetails={existingForeignBank}
            initialForeignBankState={initialForeignBankState}
            investmentCurrencies={investmentCurrencies}
            remainingCurrencies={checkCurrencyRemaining}
            setBankingDetails={setForeignBankDetails}
            handleToast={handleToast}
            // setDeleteCount={setDeleteCount}
            // setTempData={setTempData}
          />
        </Fragment>
      )}
    </View>
  );
};
