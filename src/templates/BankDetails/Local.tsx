import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import {
  ColorCard,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  IconButton,
  LabeledTitle,
  NewDropdown,
  OutlineButton,
  TextSpaceArea,
} from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_CURRENCY, DICTIONARY_MALAYSIA_BANK, ERROR } from "../../data/dictionary";
import {
  borderBottomGray2,
  centerVertical,
  colorBlack,
  flexRow,
  fs12RegGray5,
  fs16BoldBlack2,
  py,
  sh16,
  sh24,
  sh4,
  sh8,
  sw16,
  sw360,
} from "../../styles";
import { checkLocalBankPartial, getInitialBankState, isNonNumber, isNotEmpty, isNumber } from "../../utils";

const { PERSONAL_DETAILS, ADDITIONAL_DETAILS } = Language.PAGE;

interface ILocalBankDetailsProps {
  accountType: TypeAccountChoices;
  addCurrencyDisabled: boolean;
  addDisabled: boolean;
  bankingDetails: IBankDetailsState[];
  bankNames: TypeLabelValue[];
  bankSummary: IBankSummaryState;
  enableBank: boolean;
  existingDetails?: IBankDetailsState[];
  handleEnableLocalBank: (enable: boolean) => void;
  handleToast: (text?: string) => void;
  initialForeignBankState: IBankDetailsState;
  investmentCurrencies: string[];
  isAllEpf: boolean;
  remainingCurrencies: string[];
  setBankingDetails: (input: IBankDetailsState[]) => void;
  setForeignBankDetails: (input: IBankDetailsState[]) => void;
}

export const LocalBankDetails: FunctionComponent<ILocalBankDetailsProps> = ({
  // investmentCurrencies,
  accountType,
  addCurrencyDisabled,
  addDisabled,
  bankingDetails,
  bankNames,
  bankSummary,
  existingDetails,
  handleToast,
  initialForeignBankState,
  isAllEpf,
  remainingCurrencies,
  setBankingDetails,
  setForeignBankDetails,
}: ILocalBankDetailsProps) => {
  const { foreignBank } = bankSummary;

  const handleAddForeignBank = () => {
    const bankingDetailsClone = [...foreignBank!];
    const addCurrency = remainingCurrencies.length === 1 ? { currency: [...remainingCurrencies] } : {};
    bankingDetailsClone.push({ ...initialForeignBankState, ...addCurrency });
    setForeignBankDetails(bankingDetailsClone);
  };

  return (
    <Fragment>
      <View>
        {bankingDetails.map((item: IBankDetailsState, index: number) => {
          const { id } = item;
          const handleAddCurrency = () => {
            const updatedDetails = [...bankingDetails];
            if (remainingCurrencies.length === 1) {
              updatedDetails[index].currency!.push(remainingCurrencies[0]);
            } else {
              updatedDetails[index].currency!.push("");
            }
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

          const handleOtherBankName = (input: string) => {
            const updatedDetails = [...bankingDetails];
            updatedDetails[index].otherBankName = input;
            setBankingDetails(updatedDetails);
          };

          const handleOtherBank = (input: string) => {
            if (input !== "Others") {
              handleOtherBankName("");
            }
            handleBankName(input);
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

          const handleReset = () => {
            const updatedDetails = [...bankingDetails];
            const checkAccountName = accountType === "Individual" ? updatedDetails[index].bankAccountName : undefined;
            updatedDetails[index] = { ...getInitialBankState("local", checkAccountName) };
            setBankingDetails(updatedDetails);
          };

          const currencyExtractor = DICTIONARY_CURRENCY.filter(
            (filteredCurrency) => filteredCurrency.value !== "MYR" && remainingCurrencies.includes(filteredCurrency.value),
          );
          const checkCurrencyLabel = item.currency!.length > 1 ? `${PERSONAL_DETAILS.LABEL_CURRENCY} 1` : PERSONAL_DETAILS.LABEL_CURRENCY;
          const checkHeader = isAllEpf === true ? `${PERSONAL_DETAILS.LABEL_BANK_LOCAL} (optional)` : PERSONAL_DETAILS.LABEL_BANK_LOCAL;
          const checkSwiftCodeDisabled =
            existingDetails !== undefined && existingDetails.length > 0 ? existingDetails[index].bankSwiftCode !== "" : false;
          const checkSubtitle = isAllEpf === true ? PERSONAL_DETAILS.LABEL_BANK_SUBTITLE_EPF : PERSONAL_DETAILS.LABEL_BANK_SUBTITLE;
          const checkDisabled = !checkLocalBankPartial(bankingDetails);

          return (
            <Fragment key={index}>
              <ColorCard
                header="custom"
                customHeader={
                  <View style={flexRow}>
                    <LabeledTitle label={checkHeader} labelStyle={fs16BoldBlack2} title={checkSubtitle} titleStyle={fs12RegGray5} />
                    <CustomFlexSpacer />
                    {isNotEmpty(id) ? null : (
                      <Fragment>
                        <CustomFlexSpacer />
                        <IconButton
                          disabled={checkDisabled}
                          name="refresh"
                          color={colorBlack._1}
                          onPress={handleReset}
                          size={sh24}
                          style={py(sh8)}
                        />
                      </Fragment>
                    )}
                  </View>
                }
                content={
                  <View>
                    <CustomTextInput disabled={true} label={checkCurrencyLabel} value={item.currency![0]} />
                    {item
                      .currency!.filter((thisCurrency) => thisCurrency !== item.currency![0])
                      .map((value: string, currencyIndex: number) => {
                        const handleRemoveCurrency = () => {
                          const updatedCurrency = [...item.currency!];
                          updatedCurrency.splice(currencyIndex + 1, 1);
                          const updatedData = { ...item, currency: updatedCurrency };
                          setBankingDetails([updatedData]);
                          handleToast(`${value} ${ADDITIONAL_DETAILS.LABEL_CURRENCY_DELETED}`);
                        };

                        const handleOtherCurrency = (input: string) => {
                          const updatedDetails = [...bankingDetails];
                          const updatedCurrency = [...bankingDetails[index].currency!];
                          updatedCurrency[currencyIndex + 1] = input as TypeBankCurrency;
                          updatedDetails[index].currency = updatedCurrency;
                          setBankingDetails(updatedDetails);
                        };
                        const label =
                          item.currency!.length === 1
                            ? PERSONAL_DETAILS.LABEL_CURRENCY
                            : `${PERSONAL_DETAILS.LABEL_CURRENCY} ${currencyIndex + 2}`;
                        const checkCurrencyDisabled =
                          existingDetails !== undefined && existingDetails.length > 0
                            ? existingDetails[index].currency?.includes(value)
                            : false;

                        return (
                          <View key={currencyIndex} style={{ ...centerVertical, ...flexRow }}>
                            <NewDropdown
                              disabled={remainingCurrencies.length === 0 || checkCurrencyDisabled}
                              handleChange={handleOtherCurrency}
                              items={currencyExtractor}
                              label={label}
                              spaceToTop={sh16}
                              value={value}
                            />
                            {value !== "" && checkCurrencyDisabled === false ? (
                              <Fragment>
                                <CustomSpacer isHorizontal={true} space={sw16} />
                                <View>
                                  <CustomFlexSpacer />
                                  <IconButton
                                    name="trash"
                                    color={colorBlack._1}
                                    onPress={handleRemoveCurrency}
                                    size={sh24}
                                    style={py(sh8)}
                                  />
                                </View>
                              </Fragment>
                            ) : null}
                          </View>
                        );
                      })}
                    {remainingCurrencies.length === 0 ? null : (
                      <Fragment>
                        <CustomSpacer space={sh16} />
                        <OutlineButton
                          buttonType="dashed"
                          disabled={addCurrencyDisabled || item.currency?.some((eachValue) => eachValue === "")}
                          icon="plus"
                          onPress={handleAddCurrency}
                          text={PERSONAL_DETAILS.BUTTON_ADD_CURRENCY}
                        />
                        <CustomSpacer space={sh16} />
                        <View style={borderBottomGray2} />
                      </Fragment>
                    )}
                    <NewDropdown
                      disabled={id !== undefined}
                      handleChange={handleOtherBank}
                      items={DICTIONARY_MALAYSIA_BANK}
                      label={PERSONAL_DETAILS.LABEL_BANK_NAME}
                      spaceToTop={sh16}
                      value={item.bankName!}
                    />
                    {item.bankName === "Others" ? (
                      <CustomTextInput
                        label={PERSONAL_DETAILS.LABEL_BANK_OTHER_NAME}
                        onChangeText={handleOtherBankName}
                        spaceToTop={sh16}
                        value={item.otherBankName}
                      />
                    ) : null}
                    {accountType === "Individual" ? (
                      <CustomTextInput
                        disabled={true}
                        label={PERSONAL_DETAILS.LABEL_BANK_ACCOUNT_NAME}
                        onChangeText={handleAccountName}
                        spaceToTop={sh16}
                        value={item.bankAccountName}
                      />
                    ) : (
                      <NewDropdown
                        disabled={id !== undefined}
                        handleChange={handleAccountName}
                        items={bankNames}
                        label={PERSONAL_DETAILS.LABEL_BANK_ACCOUNT_NAME}
                        spaceToTop={sh16}
                        value={item.bankAccountName!}
                      />
                    )}
                    {item.bankAccountName === "Combined" ? (
                      <CustomTextInput
                        autoCapitalize="words"
                        error={item.bankAccountNameError}
                        label={PERSONAL_DETAILS.LABEL_BANK_ACCOUNT_NAME_COMBINED}
                        onBlur={checkAccountBankName}
                        onChangeText={handleCombinedName}
                        spaceToTop={sh16}
                        value={item.combinedBankAccountName}
                      />
                    ) : null}
                    <CustomTextInput
                      disabled={id !== undefined}
                      error={item.bankAccountNumberError}
                      keyboardType="numeric"
                      label={PERSONAL_DETAILS.LABEL_BANK_ACCOUNT_NUMBER}
                      onBlur={checkNumber}
                      onChangeText={handleAccountNumber}
                      spaceToTop={sh16}
                      value={item.bankAccountNumber}
                    />
                    <CustomTextInput
                      disabled={checkSwiftCodeDisabled}
                      label={PERSONAL_DETAILS.LABEL_BANK_SWIFT_CODE_OPTIONAL}
                      onChangeText={handleSwiftCode}
                      spaceToTop={sh16}
                      value={item.bankSwiftCode}
                    />
                    <TextSpaceArea spaceToTop={sh4} style={{ ...fs12RegGray5, maxWidth: sw360 }} text={PERSONAL_DETAILS.HINT_SWIFT_CODE} />
                    {remainingCurrencies.length === 0 || foreignBank!.length > 0 ? null : (
                      <Fragment>
                        <CustomSpacer space={sh16} />
                        <View style={borderBottomGray2} />
                        <CustomSpacer space={sh16} />
                        <OutlineButton
                          buttonType="dashed"
                          disabled={addDisabled}
                          icon="plus"
                          onPress={handleAddForeignBank}
                          text={PERSONAL_DETAILS.BUTTON_ADD_FOREIGN}
                        />
                      </Fragment>
                    )}
                  </View>
                }
              />
            </Fragment>
          );
        })}
      </View>
    </Fragment>
  );
};
