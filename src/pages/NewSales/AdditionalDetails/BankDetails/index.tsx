import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";

import { CustomSpacer } from "../../../../components";
import { DICTIONARY_CURRENCY } from "../../../../data/dictionary";
import { sh24 } from "../../../../styles";
import { isNotEmpty } from "../../../../utils";
import { ForeignBankDetails } from "./Foreign";
import { LocalBankDetails } from "./Local";

interface IBankDetailsProps {
  bankNames: TypeLabelValue[];
  bankSummary: IBankSummaryState;
  enableBank: boolean;
  foreignBankDetails: IBankDetailsState[];
  localBankDetails: IBankDetailsState[];
  investmentCurrencies: string[];
  isAllEpf: boolean;
  handleEnableLocalBank: (enable: boolean) => void;
  remainingCurrencies: string[];
  setForeignBankDetails: (input: IBankDetailsState[]) => void;
  setLocalBankDetails: (input: IBankDetailsState[]) => void;
}

export const BankDetails: FunctionComponent<IBankDetailsProps> = ({
  bankNames,
  bankSummary,
  enableBank,
  foreignBankDetails,
  localBankDetails,
  investmentCurrencies,
  isAllEpf,
  handleEnableLocalBank,
  remainingCurrencies,
  setForeignBankDetails,
  setLocalBankDetails,
}: IBankDetailsProps) => {
  const [currentCurrency, setCurrentCurrency] = useState<string>("");
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
  const checkCurrency = localBank!
    .map((eachLocalBank: IBankDetailsState) => eachLocalBank.currency)
    .flat()
    .includes("");
  const checkForeignCurrency =
    isNotEmpty(foreignBank) &&
    foreignBank!
      .map((eachLocalBank: IBankDetailsState) => eachLocalBank.currency)
      .flat()
      .includes("");
  const checkDisabled = checkCurrency || checkForeignCurrency;

  return (
    <View>
      <LocalBankDetails
        addDisabled={checkDisabled}
        bankingDetails={localBankDetails}
        bankNames={bankNames}
        bankSummary={bankSummary}
        currentCurrency={currentCurrency}
        enableBank={enableBank}
        initialForeignBankState={initialForeignBankState}
        investmentCurrencies={investmentCurrencies}
        handleEnableLocalBank={handleEnableLocalBank}
        isAllEpf={isAllEpf}
        remainingCurrencies={remainingCurrencies}
        setBankingDetails={setLocalBankDetails}
        setCurrentCurrency={setCurrentCurrency}
        setForeignBankDetails={setForeignBankDetails}
      />
      {isAllEpf === true ? null : (
        <Fragment>
          <CustomSpacer space={spaceToButton} />
          <ForeignBankDetails
            addDisabled={checkDisabled}
            bankingDetails={foreignBankDetails}
            bankNames={bankNames}
            currentCurrency={currentCurrency}
            initialForeignBankState={initialForeignBankState}
            investmentCurrencies={investmentCurrencies}
            remainingCurrencies={remainingCurrencies}
            setBankingDetails={setForeignBankDetails}
            setCurrentCurrency={setCurrentCurrency}
          />
        </Fragment>
      )}
    </View>
  );
};
