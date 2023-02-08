import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import {
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  IconButton,
  NewDropdown,
  OutlineButton,
  TextSpaceArea,
} from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_CURRENCY, ERROR } from "../../../../data/dictionary";
import {
  centerVertical,
  colorBlack,
  flexRow,
  fs12RegGray5,
  fs16BoldBlue1,
  px,
  py,
  sh16,
  sh24,
  sh32,
  sh8,
  sw16,
  sw24,
  sw360,
} from "../../../../styles";
import { isNonNumber, isNumber } from "../../../../utils";

const { ADDITIONAL_DETAILS } = Language.PAGE;

interface IForeignBankDetailsProps {
  bankingDetails: IBankDetailsState[];
  bankNames: TypeLabelValue[];
  investmentCurrencies: string[];
  setBankingDetails: (input: IBankDetailsState[]) => void;
}

export const ForeignBankDetails: FunctionComponent<IForeignBankDetailsProps> = ({
  bankingDetails,
  bankNames,
  investmentCurrencies,
  setBankingDetails,
}: IForeignBankDetailsProps) => {
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

  const handleAddForeignBank = () => {
    const bankingDetailsClone = [...bankingDetails];
    bankingDetailsClone.push(initialForeignBankState);
    setBankingDetails(bankingDetailsClone);
  };

  const nonMyrCurrencies = investmentCurrencies.filter((currency) => currency !== "MYR");
  const selectedNonMyrCurrencies = bankingDetails.filter((bank) => !bank.currency?.includes("MYR"));
  const noForeignBank = nonMyrCurrencies.length === 0 || selectedNonMyrCurrencies.length === nonMyrCurrencies.length;

  return (
    <View>
      {bankingDetails.map((item: IBankDetailsState, index: number) => {
        const handleAddCurrency = () => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].currency!.push("");
          setBankingDetails(updatedDetails);
        };

        const handleRemoveNumber = () => {
          const updatedDetails = [...bankingDetails];
          updatedDetails.splice(updatedDetails.indexOf(item), 1);
          setBankingDetails(updatedDetails);
        };

        const handleBankName = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].bankName = input;
          setBankingDetails(updatedDetails);
        };

        const checkAccountBankName = () => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].bankAccountNameError = isNonNumber(item.bankAccountName!) === false ? ERROR.INVALID_BANK_NAME : undefined;
          setBankingDetails(updatedDetails);
        };

        const handleBankLocation = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].bankLocation = input;
          setBankingDetails(updatedDetails);
        };

        const handleAccountName = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].bankAccountName = input;
          if (input !== "Combined" && input !== "") {
            updatedDetails[index].combinedBankAccountName = "";
          }
          setBankingDetails(updatedDetails);
        };

        const handleCombinedName = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].combinedBankAccountName = input;
          setBankingDetails(updatedDetails);
        };

        const handleAccountNumber = (input: string) => {
          const updatedDetails = [...bankingDetails];
          if (isNumber(input) === true || input === "") {
            updatedDetails[index].bankAccountNumber = input;
            updatedDetails[index].bankAccountNumberError = input === "" ? ERROR.INVALID_BANK_NUMBER : undefined;
          }
          setBankingDetails(updatedDetails);
        };

        const checkNumber = () => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].bankAccountNumberError =
            isNumber(item.bankAccountNumber!) === false ? ERROR.INVALID_BANK_NUMBER : undefined;
          setBankingDetails(updatedDetails);
        };

        const handleSwiftCode = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].bankSwiftCode = input;
          setBankingDetails(updatedDetails);
        };

        const foreignBankLabel = `${ADDITIONAL_DETAILS.LABEL_BANK_FOREIGN} ${index + 1}`;
        const currencyExtractor = DICTIONARY_CURRENCY.filter((filteredCurrency) => {
          return filteredCurrency.value !== "MYR" && investmentCurrencies.includes(filteredCurrency.value);
        });

        return (
          <View key={index}>
            <View style={{ ...centerVertical, ...flexRow, ...px(sw24) }}>
              <TextSpaceArea style={fs16BoldBlue1} text={foreignBankLabel} />
              <CustomSpacer isHorizontal={true} space={sw16} />
              <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveNumber} size={sh24} />
            </View>
            <CustomSpacer space={sh16} />
            <View style={px(sw24)}>
              {item.currency!.map((value: string, currencyIndex: number) => {
                const handleRemoveCurrency = () => {
                  const updatedCurrency = [...item.currency!];
                  updatedCurrency.splice(currencyIndex, 1);
                  const updatedBankingDetails = [...bankingDetails];
                  updatedBankingDetails[index].currency = updatedCurrency;
                  setBankingDetails(updatedBankingDetails);
                };

                const handleOtherCurrency = (input: string) => {
                  const updatedCurrency = [...bankingDetails[index].currency!];
                  updatedCurrency[currencyIndex] = input as TypeBankCurrency;
                  const updatedBankingDetails = [...bankingDetails];
                  updatedBankingDetails[index].currency = updatedCurrency;
                  setBankingDetails(updatedBankingDetails);
                };

                const label = currencyIndex === 0 ? ADDITIONAL_DETAILS.LABEL_CURRENCY : ADDITIONAL_DETAILS.LABEL_OTHER_CURRENCY;

                return (
                  <Fragment key={currencyIndex}>
                    {currencyIndex === 0 ? null : <CustomSpacer space={sh32} />}
                    <View style={{ ...centerVertical, ...flexRow }}>
                      <NewDropdown handleChange={handleOtherCurrency} items={currencyExtractor} label={label} value={value} />
                      <CustomSpacer isHorizontal={true} space={sw16} />
                      {currencyIndex === 0 ? null : (
                        <View>
                          <CustomFlexSpacer />
                          <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveCurrency} size={sh24} style={py(sh8)} />
                        </View>
                      )}
                    </View>
                  </Fragment>
                );
              })}
              <CustomTextInput
                label={ADDITIONAL_DETAILS.LABEL_BANK_NAME}
                onChangeText={handleBankName}
                spaceToTop={sh32}
                value={item.bankName}
              />
              <NewDropdown
                handleChange={handleAccountName}
                items={bankNames}
                label={ADDITIONAL_DETAILS.LABEL_BANK_ACCOUNT_NAME}
                spaceToTop={sh32}
                value={item.bankAccountName!}
              />
              {item.bankAccountName === "Combined" ? (
                <CustomTextInput
                  autoCapitalize="words"
                  error={item.bankAccountNameError}
                  label={ADDITIONAL_DETAILS.LABEL_BANK_ACCOUNT_NAME}
                  onBlur={checkAccountBankName}
                  onChangeText={handleCombinedName}
                  spaceToTop={sh32}
                  value={item.combinedBankAccountName}
                />
              ) : null}
              <CustomTextInput
                error={item.bankAccountNumberError}
                keyboardType="numeric"
                label={ADDITIONAL_DETAILS.LABEL_BANK_ACCOUNT_NUMBER}
                onBlur={checkNumber}
                onChangeText={handleAccountNumber}
                spaceToTop={sh32}
                value={item.bankAccountNumber}
              />
              <NewDropdown
                items={DICTIONARY_COUNTRIES}
                handleChange={handleBankLocation}
                label={ADDITIONAL_DETAILS.LABEL_BANK_LOCATION}
                spaceToTop={sh32}
                value={item.bankLocation || ""}
              />
              <CustomTextInput
                label={ADDITIONAL_DETAILS.LABEL_BANK_SWIFT_CODE_OPTIONAL}
                onChangeText={handleSwiftCode}
                spaceToTop={sh32}
                value={item.bankSwiftCode}
              />
              <TextSpaceArea spaceToTop={sh8} style={{ ...fs12RegGray5, maxWidth: sw360 }} text={ADDITIONAL_DETAILS.HINT_SWIFT_CODE} />
              {item.currency!.length === currencyExtractor.length ? null : (
                <Fragment>
                  <CustomSpacer space={sh32} />
                  <OutlineButton
                    buttonType="dashed"
                    icon="plus"
                    onPress={handleAddCurrency}
                    text={ADDITIONAL_DETAILS.BUTTON_ADD_CURRENCY}
                  />
                </Fragment>
              )}
            </View>
            {index === bankingDetails.length - 1 ? null : <CustomSpacer space={sh24} />}
          </View>
        );
      })}
      {noForeignBank === true ? null : (
        <View style={px(sw24)}>
          <CustomSpacer space={sh24} />
          <OutlineButton buttonType="dashed" icon="plus" onPress={handleAddForeignBank} text={ADDITIONAL_DETAILS.BUTTON_ADD_FOREIGN} />
        </View>
      )}
    </View>
  );
};
