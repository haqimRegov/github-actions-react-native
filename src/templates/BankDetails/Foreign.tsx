import React, { Fragment, FunctionComponent, useState } from "react";
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
  PromptModal,
  TextSpaceArea,
} from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_CURRENCY, ERROR } from "../../data/dictionary";
import {
  alignFlexStart,
  borderBottomGray2,
  colorBlack,
  flexRow,
  fs12RegGray5,
  fs16BoldBlack2,
  fsAlignLeft,
  py,
  rowCenterVertical,
  sh16,
  sh20,
  sh24,
  sh4,
  sh8,
  sw16,
  sw360,
} from "../../styles";
import { isNonNumber, isNumber } from "../../utils";

const { PERSONAL_DETAILS } = Language.PAGE;

interface IForeignBankDetailsProps {
  accountType: TypeAccountChoices;
  addCurrencyDisabled: boolean;
  addDisabled: boolean;
  bankingDetails: IBankDetailsState[];
  bankNames: TypeLabelValue[];
  bankSummary: IBankSummaryState;
  currentCurrency: string;
  // deleteCount: number;
  existingDetails?: IBankDetailsState[];
  initialForeignBankState: IBankDetailsState;
  investmentCurrencies: string[];
  remainingCurrencies: string[];
  setBankingDetails: (input: IBankDetailsState[]) => void;
  setCurrentCurrency: (current: string) => void;
  setDeleteToast: (toggle: boolean) => void;
  // setDeleteCount: (count: number) => void;
  // setTempData: (updatedDetails: IBankSummaryState) => void;
}

interface IPromptDetails {
  title: string;
  index: number;
}

export const ForeignBankDetails: FunctionComponent<IForeignBankDetailsProps> = ({
  accountType,
  addCurrencyDisabled,
  addDisabled,
  bankingDetails,
  bankNames,
  // bankSummary,
  // currentCurrency,
  // deleteCount,
  existingDetails,
  initialForeignBankState,
  investmentCurrencies,
  remainingCurrencies,
  setBankingDetails,
  setCurrentCurrency,
  setDeleteToast,
}: // setDeleteCount,
// setTempData,
IForeignBankDetailsProps) => {
  const [promptModal, setPromptModal] = useState<boolean>(false);
  const [promptDetails, setPromptDetails] = useState<IPromptDetails>({ title: "", index: 0 });
  const handleAddForeignBank = () => {
    const bankingDetailsClone = [...bankingDetails];
    const addCurrency = remainingCurrencies.length === 1 ? { currency: [remainingCurrencies[0]] } : {};
    bankingDetailsClone.push({ ...initialForeignBankState, ...addCurrency });
    // setTempData({ ...bankSummary, foreignBank: bankingDetailsClone });
    setBankingDetails(bankingDetailsClone);
  };

  const handleDelete = () => {
    const updatedBankingDetails = [...bankingDetails];
    updatedBankingDetails.splice(promptDetails.index, 1);
    // setTempData({ ...bankSummary, foreignBank: updatedBankingDetails });
    setBankingDetails(updatedBankingDetails);
  };

  const handleCancel = () => {
    setPromptModal(false);
  };

  const handleRemove = () => {
    setPromptModal(false);
    handleDelete();
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

          const handleRemoveBank = () => {
            const checkIndex =
              index === 0 ? `${PERSONAL_DETAILS.BANK_REMOVE_PROMPT_TITLE}?` : `${PERSONAL_DETAILS.BANK_REMOVE_PROMPT_TITLE} ${index + 1}?`;
            setPromptDetails({ title: checkIndex, index: index });
            setPromptModal(true);
          };

          const currencyExtractor = DICTIONARY_CURRENCY.filter((filteredCurrency) => {
            return filteredCurrency.value !== "MYR" && investmentCurrencies.includes(filteredCurrency.value);
          });
          const header =
            bankingDetails.length > 1 ? `${PERSONAL_DETAILS.LABEL_BANK_FOREIGN} ${index + 1}` : PERSONAL_DETAILS.LABEL_BANK_FOREIGN;
          const checkSwiftCodeDisabled =
            existingDetails !== undefined && existingDetails.length - 1 >= index ? existingDetails[index].bankSwiftCode !== "" : false;

          return (
            <Fragment key={index}>
              {index !== 0 ? <CustomSpacer space={sh24} /> : null}
              <ColorCard
                header="custom"
                customHeader={
                  <View style={flexRow}>
                    <LabeledTitle
                      label={header}
                      labelStyle={fs16BoldBlack2}
                      title={PERSONAL_DETAILS.LABEL_BANK_SUBTITLE}
                      titleStyle={fs12RegGray5}
                    />
                    <CustomFlexSpacer />
                    {id === undefined ? (
                      <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveBank} size={sh24} style={py(sh8)} />
                    ) : null}
                  </View>
                }
                content={
                  <Fragment>
                    {item.currency!.map((value: string, currencyIndex: number) => {
                      const handleOtherCurrency = (input: string) => {
                        const updatedCurrency = [...bankingDetails[index].currency!];
                        updatedCurrency[currencyIndex] = input as TypeBankCurrency;
                        const updatedBankingDetails = [...bankingDetails];
                        updatedBankingDetails[index].currency = updatedCurrency;
                        setBankingDetails(updatedBankingDetails);
                      };

                      const handleRemoveCurrency = () => {
                        setCurrentCurrency(value);
                        const updatedBankingDetails = [...bankingDetails];
                        let updatedData: IBankDetailsState = { ...item };
                        const { currency: updatedCurrency } = updatedData;
                        if (updatedCurrency!.length === 1) {
                          updatedCurrency![currencyIndex] = "";
                        } else {
                          updatedCurrency!.splice(currencyIndex!, 1);
                          updatedData = { ...updatedData, currency: updatedCurrency };
                          updatedBankingDetails[index] = updatedData;
                        }
                        // setDeleteCount(deleteCount + 1);
                        setBankingDetails(updatedBankingDetails);
                        setDeleteToast(true);
                        // setTempData({ ...bankSummary, foreignBank: updatedBankingDetails });
                      };

                      const label =
                        item.currency!.length === 1
                          ? PERSONAL_DETAILS.LABEL_CURRENCY
                          : `${PERSONAL_DETAILS.LABEL_CURRENCY} ${currencyIndex + 1}`;
                      const checkCurrencyDisabled =
                        existingDetails !== undefined && existingDetails.length - 1 >= index
                          ? existingDetails[index].currency?.includes(value)
                          : false;

                      return (
                        <Fragment key={currencyIndex}>
                          {currencyIndex === 0 ? null : <CustomSpacer space={sh16} />}
                          <View style={rowCenterVertical}>
                            <NewDropdown
                              disabled={remainingCurrencies.length === 0 || checkCurrencyDisabled}
                              handleChange={handleOtherCurrency}
                              items={currencyExtractor}
                              label={label}
                              value={value}
                            />
                            <CustomSpacer isHorizontal={true} space={sw16} />
                            {value !== "" && checkCurrencyDisabled === false ? (
                              <View style={{ marginTop: sh20 }}>
                                <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveCurrency} size={sh24} style={py(sh8)} />
                              </View>
                            ) : null}
                          </View>
                        </Fragment>
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
                    <CustomTextInput
                      disabled={id !== undefined}
                      label={PERSONAL_DETAILS.LABEL_BANK_NAME}
                      onChangeText={handleBankName}
                      spaceToTop={sh16}
                      value={item.bankName}
                    />
                    {accountType === "Individual" ? (
                      <CustomTextInput
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
                    <NewDropdown
                      disabled={id !== undefined}
                      items={DICTIONARY_COUNTRIES}
                      handleChange={handleBankLocation}
                      label={PERSONAL_DETAILS.LABEL_BANK_LOCATION}
                      spaceToTop={sh16}
                      value={item.bankLocation || ""}
                    />
                    {remainingCurrencies.length === 0 ? null : (
                      <View>
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
                      </View>
                    )}
                  </Fragment>
                }
              />
            </Fragment>
          );
        })}
      </View>
      <PromptModal
        backdropOpacity={0.4}
        contentStyle={alignFlexStart}
        handleCancel={handleCancel}
        handleContinue={handleRemove}
        label={promptDetails.title}
        labelCancel={PERSONAL_DETAILS.BUTTON_CANCEL}
        labelContinue={PERSONAL_DETAILS.LABEL_REMOVE}
        labelStyle={fsAlignLeft}
        title={PERSONAL_DETAILS.BANK_REMOVE_PROMPT_SUBTITLE}
        titleStyle={fsAlignLeft}
        visible={promptModal}
      />
    </Fragment>
  );
};
