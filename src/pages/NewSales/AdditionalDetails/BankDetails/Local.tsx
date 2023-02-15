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
  Switch,
  TextSpaceArea,
} from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_CURRENCY, DICTIONARY_MALAYSIA_BANK, ERROR } from "../../../../data/dictionary";
import {
  alignFlexStart,
  borderBottomGray2,
  centerVertical,
  colorBlack,
  flexRow,
  fs12RegGray5,
  fs16BoldBlack2,
  fs16RegBlack2,
  fsAlignLeft,
  py,
  sh16,
  sh24,
  sh4,
  sh8,
  sw16,
  sw360,
} from "../../../../styles";
import { isNonNumber, isNumber } from "../../../../utils";

const { PERSONAL_DETAILS } = Language.PAGE;

interface ILocalBankDetailsProps {
  addDisabled: boolean;
  bankingDetails: IBankDetailsState[];
  bankSummary: IBankSummaryState;
  bankNames: TypeLabelValue[];
  currentCurrency: string;
  enableBank: boolean;
  handleEnableLocalBank: (enable: boolean) => void;
  initialForeignBankState: IBankDetailsState;
  investmentCurrencies: string[];
  isAllEpf: boolean;
  remainingCurrencies: string[];
  setBankingDetails: (input: IBankDetailsState[]) => void;
  setCurrentCurrency: (current: string) => void;
  setForeignBankDetails: (input: IBankDetailsState[]) => void;
}

export const LocalBankDetails: FunctionComponent<ILocalBankDetailsProps> = ({
  addDisabled,
  bankingDetails,
  bankSummary,
  bankNames,
  currentCurrency,
  enableBank,
  handleEnableLocalBank,
  initialForeignBankState,
  investmentCurrencies,
  isAllEpf,
  remainingCurrencies,
  setBankingDetails,
  setCurrentCurrency,
  setForeignBankDetails,
}: ILocalBankDetailsProps) => {
  const [promptModal, setPromptModal] = useState<boolean>(false);
  const { foreignBank } = bankSummary;

  const handleAddForeignBank = () => {
    const bankingDetailsClone = [...foreignBank!];
    const addCurrency = remainingCurrencies.length === 1 ? { currency: [remainingCurrencies[0]] } : {};
    bankingDetailsClone.push({ ...initialForeignBankState, ...addCurrency });
    setForeignBankDetails(bankingDetailsClone);
  };

  const handleRemove = () => {
    const updatedBankingDetails = [...bankingDetails];
    const findIndex = updatedBankingDetails.findIndex((eachDetail: IBankDetailsState) => eachDetail.currency?.includes(currentCurrency));
    if (findIndex !== -1) {
      let updatedData: IBankDetailsState = { ...updatedBankingDetails[findIndex] };
      const { currency: updatedCurrency } = updatedData;
      const currencyIndex = updatedCurrency?.indexOf(currentCurrency);
      updatedCurrency!.splice(currencyIndex!, 1);
      updatedData = { ...updatedData, currency: updatedCurrency };
      updatedBankingDetails[findIndex] = updatedData;
    }
    setBankingDetails(updatedBankingDetails);
  };

  const handleEnable = (toggle: boolean | undefined) => {
    handleEnableLocalBank(toggle!);
  };

  const handleCancel = () => {
    setPromptModal(false);
  };

  const handlePromptRemove = () => {
    setPromptModal(false);
    handleRemove();
  };
  const promptTitle = `${PERSONAL_DETAILS.LABEL_REMOVE} ${currentCurrency} ${PERSONAL_DETAILS.LABEL_CURRENCY_SALES}?`;

  return (
    <Fragment>
      <View>
        {bankingDetails.map((item: IBankDetailsState, index: number) => {
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

          const currencyExtractor = DICTIONARY_CURRENCY.filter(
            (filteredCurrency) => filteredCurrency.value !== "MYR" && investmentCurrencies.includes(filteredCurrency.value),
          );
          const checkCurrencyLabel = item.currency!.length > 1 ? `${PERSONAL_DETAILS.LABEL_CURRENCY} 1` : PERSONAL_DETAILS.LABEL_CURRENCY;

          return (
            <Fragment key={index}>
              <ColorCard
                header="custom"
                customHeader={
                  <LabeledTitle
                    label={PERSONAL_DETAILS.LABEL_BANK_LOCAL}
                    labelStyle={fs16BoldBlack2}
                    title={PERSONAL_DETAILS.LABEL_BANK_SUBTITLE}
                    titleStyle={fs12RegGray5}
                  />
                }
                content={
                  <View>
                    {isAllEpf === true ? (
                      <Fragment>
                        <Switch
                          label={PERSONAL_DETAILS.LABEL_ADD_BANK_DETAILS_OPTIONAL}
                          labelStyle={fs16RegBlack2}
                          onPress={handleEnable}
                          toggle={enableBank}
                        />
                        {enableBank === true ? (
                          <Fragment>
                            <CustomSpacer space={sh16} />
                            <View style={borderBottomGray2} />
                            <CustomSpacer space={sh16} />
                          </Fragment>
                        ) : null}
                      </Fragment>
                    ) : null}
                    {isAllEpf === false || enableBank === true ? (
                      <Fragment>
                        <CustomTextInput disabled={true} label={checkCurrencyLabel} value={item.currency![0]} />
                        {item
                          .currency!.filter((thisCurrency) => thisCurrency !== item.currency![0])
                          .map((value: string, currencyIndex: number) => {
                            const handleRemoveCurrency = () => {
                              setCurrentCurrency(value);
                              setPromptModal(true);
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

                            return (
                              <View key={currencyIndex} style={{ ...centerVertical, ...flexRow }}>
                                <NewDropdown
                                  disabled={value !== ""}
                                  handleChange={handleOtherCurrency}
                                  items={currencyExtractor}
                                  label={label}
                                  spaceToTop={sh16}
                                  value={value}
                                />
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
                              </View>
                            );
                          })}
                        {remainingCurrencies.length === 0 ? null : (
                          <Fragment>
                            <CustomSpacer space={sh16} />
                            <OutlineButton
                              buttonType="dashed"
                              disabled={addDisabled}
                              icon="plus"
                              onPress={handleAddCurrency}
                              text={PERSONAL_DETAILS.BUTTON_ADD_CURRENCY}
                            />
                            <CustomSpacer space={sh16} />
                            <View style={borderBottomGray2} />
                          </Fragment>
                        )}
                        <NewDropdown
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
                        <NewDropdown
                          handleChange={handleAccountName}
                          items={bankNames}
                          label={PERSONAL_DETAILS.LABEL_BANK_ACCOUNT_NAME}
                          spaceToTop={sh16}
                          value={item.bankAccountName!}
                        />
                        {item.bankAccountName === "Combined" ? (
                          <CustomTextInput
                            autoCapitalize="words"
                            error={item.bankAccountNameError}
                            label={PERSONAL_DETAILS.LABEL_BANK_ACCOUNT_NAME}
                            onBlur={checkAccountBankName}
                            onChangeText={handleCombinedName}
                            spaceToTop={sh16}
                            value={item.combinedBankAccountName}
                          />
                        ) : null}
                        <CustomTextInput
                          error={item.bankAccountNumberError}
                          keyboardType="numeric"
                          label={PERSONAL_DETAILS.LABEL_BANK_ACCOUNT_NUMBER}
                          onBlur={checkNumber}
                          onChangeText={handleAccountNumber}
                          spaceToTop={sh16}
                          value={item.bankAccountNumber}
                        />
                        <CustomTextInput
                          label={PERSONAL_DETAILS.LABEL_BANK_SWIFT_CODE_OPTIONAL}
                          onChangeText={handleSwiftCode}
                          spaceToTop={sh16}
                          value={item.bankSwiftCode}
                        />
                        <TextSpaceArea
                          spaceToTop={sh4}
                          style={{ ...fs12RegGray5, maxWidth: sw360 }}
                          text={PERSONAL_DETAILS.HINT_SWIFT_CODE}
                        />
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
                      </Fragment>
                    ) : null}
                  </View>
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
        handleContinue={handlePromptRemove}
        label={promptTitle}
        labelCancel={PERSONAL_DETAILS.BUTTON_CANCEL}
        labelContinue={PERSONAL_DETAILS.LABEL_REMOVE}
        labelStyle={fsAlignLeft}
        title={PERSONAL_DETAILS.LABEL_REMOVE_CURRENCY_SUBTITLE}
        titleStyle={fsAlignLeft}
        visible={promptModal}
      />
    </Fragment>
  );
};
