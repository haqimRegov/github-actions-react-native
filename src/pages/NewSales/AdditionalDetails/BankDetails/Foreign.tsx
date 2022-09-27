import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";

import {
  ColorCard,
  CustomSpacer,
  CustomTextInput,
  IconButton,
  LabeledTitle,
  NewDropdown,
  OutlineButton,
  PromptModal,
  TextSpaceArea,
} from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_CURRENCY, ERROR } from "../../../../data/dictionary";
import {
  alignFlexStart,
  borderBottomGray2,
  colorBlack,
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
} from "../../../../styles";
import { isNonNumber, isNumber } from "../../../../utils";

const { PERSONAL_DETAILS } = Language.PAGE;

interface IForeignBankDetailsProps {
  addDisabled: boolean;
  bankingDetails: IBankDetailsState[];
  bankNames: TypeLabelValue[];
  currentCurrency: string;
  initialForeignBankState: IBankDetailsState;
  investmentCurrencies: string[];
  remainingCurrencies: string[];
  setBankingDetails: (input: IBankDetailsState[]) => void;
  setCurrentCurrency: (current: string) => void;
}

interface IPromptText {
  title: string;
  subtitle: string;
}

export const ForeignBankDetails: FunctionComponent<IForeignBankDetailsProps> = ({
  addDisabled,
  bankingDetails,
  bankNames,
  currentCurrency,
  initialForeignBankState,
  investmentCurrencies,
  remainingCurrencies,
  setBankingDetails,
  setCurrentCurrency,
}: IForeignBankDetailsProps) => {
  const [promptModal, setPromptModal] = useState<boolean>(false);
  const [promptText, setPromptText] = useState<IPromptText>({ title: "", subtitle: "" });
  const handleAddForeignBank = () => {
    const bankingDetailsClone = [...bankingDetails];
    const addCurrency = remainingCurrencies.length === 1 ? { currency: [remainingCurrencies[0]] } : {};
    bankingDetailsClone.push({ ...initialForeignBankState, ...addCurrency });
    setBankingDetails(bankingDetailsClone);
  };

  const handleDelete = () => {
    const updatedBankingDetails = [...bankingDetails];
    const findIndex = updatedBankingDetails.findIndex((eachDetail: IBankDetailsState) => eachDetail.currency?.includes(currentCurrency));
    if (findIndex !== -1) {
      let updatedData: IBankDetailsState = { ...updatedBankingDetails[findIndex] };
      const { currency: updatedCurrency } = updatedData;
      const currencyIndex = updatedCurrency?.indexOf(currentCurrency);
      updatedCurrency!.splice(currencyIndex!, 1);
      if (updatedCurrency!.length === 0) {
        updatedBankingDetails.splice(findIndex, 1);
      } else {
        updatedData = { ...updatedData, currency: updatedCurrency };
        updatedBankingDetails[findIndex] = updatedData;
      }
    }
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

          const currencyExtractor = DICTIONARY_CURRENCY.filter((filteredCurrency) => {
            return filteredCurrency.value !== "MYR" && investmentCurrencies.includes(filteredCurrency.value);
          });
          const header =
            bankingDetails.length > 1 ? `${PERSONAL_DETAILS.LABEL_BANK_FOREIGN} ${index + 1}` : PERSONAL_DETAILS.LABEL_BANK_FOREIGN;

          return (
            <Fragment key={index}>
              {index !== 0 ? <CustomSpacer space={sh24} /> : null}
              <ColorCard
                header="custom"
                customHeader={
                  <LabeledTitle
                    label={header}
                    labelStyle={fs16BoldBlack2}
                    title={PERSONAL_DETAILS.LABEL_BANK_SUBTITLE}
                    titleStyle={fs12RegGray5}
                  />
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
                        let modalText: IPromptText;
                        if (item.currency!.length === 1) {
                          modalText = {
                            title: `${PERSONAL_DETAILS.LABEL_REMOVE} ${value} ${PERSONAL_DETAILS.LABEL_AND_FOREIGN_BANK_ACCOUNT}`,
                            subtitle: PERSONAL_DETAILS.LABEL_REMOVE_CURRENCY_ACCOUNT,
                          };
                        } else {
                          modalText = {
                            title: `${PERSONAL_DETAILS.LABEL_REMOVE} ${value} ${PERSONAL_DETAILS.LABEL_CURRENCY}?`,
                            subtitle: PERSONAL_DETAILS.LABEL_REMOVE_CURRENCY_SUBTITLE,
                          };
                        }
                        setCurrentCurrency(value);
                        setPromptText(modalText);
                        setPromptModal(true);
                      };

                      const label =
                        item.currency!.length === 1
                          ? PERSONAL_DETAILS.LABEL_CURRENCY
                          : `${PERSONAL_DETAILS.LABEL_CURRENCY} ${currencyIndex + 1}`;

                      return (
                        <Fragment key={currencyIndex}>
                          {currencyIndex === 0 ? null : <CustomSpacer space={sh16} />}
                          <View style={rowCenterVertical}>
                            <NewDropdown
                              disabled={value !== ""}
                              handleChange={handleOtherCurrency}
                              items={currencyExtractor}
                              label={label}
                              value={value}
                            />
                            <CustomSpacer isHorizontal={true} space={sw16} />
                            <View style={{ marginTop: sh20 }}>
                              <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveCurrency} size={sh24} style={py(sh8)} />
                            </View>
                          </View>
                        </Fragment>
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
                    <CustomTextInput
                      label={PERSONAL_DETAILS.LABEL_BANK_NAME}
                      onChangeText={handleBankName}
                      spaceToTop={sh16}
                      value={item.bankName}
                    />
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
                    <NewDropdown
                      items={DICTIONARY_COUNTRIES}
                      handleChange={handleBankLocation}
                      label={PERSONAL_DETAILS.LABEL_BANK_LOCATION}
                      spaceToTop={sh16}
                      value={item.bankLocation || ""}
                    />
                    <CustomTextInput
                      label={PERSONAL_DETAILS.LABEL_BANK_SWIFT_CODE}
                      onChangeText={handleSwiftCode}
                      spaceToTop={sh16}
                      value={item.bankSwiftCode}
                    />
                    <TextSpaceArea spaceToTop={sh4} style={{ ...fs12RegGray5, maxWidth: sw360 }} text={PERSONAL_DETAILS.HINT_SWIFT_CODE} />
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
        label={promptText.title}
        labelCancel={PERSONAL_DETAILS.BUTTON_CANCEL}
        labelContinue={PERSONAL_DETAILS.LABEL_REMOVE}
        labelStyle={fsAlignLeft}
        title={promptText.subtitle}
        titleStyle={fsAlignLeft}
        visible={promptModal}
      />
    </Fragment>
  );
};
