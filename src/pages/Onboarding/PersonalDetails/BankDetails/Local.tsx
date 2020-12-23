import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import {
  AdvancedDropdown,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  IconButton,
  OutlineButton,
  TextSpaceArea,
} from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_CURRENCY, DICTIONARY_MALAYSIA_BANK } from "../../../../data/dictionary";
import {
  centerVertical,
  colorBlack,
  colorBlue,
  flexRow,
  fs12BoldBlue2,
  fs12SemiBoldGray8,
  fs16BoldBlue2,
  px,
  py,
  sh24,
  sh32,
  sh8,
  sw02,
  sw16,
  sw24,
  sw328,
} from "../../../../styles";

const { PERSONAL_DETAILS } = Language.PAGE;

interface ILocalBankDetailsProps {
  bankingDetails: IBankDetailsState[];
  investmentCurrencies: string[];
  setBankingDetails: (input: IBankDetailsState[]) => void;
}

export const LocalBankDetails: FunctionComponent<ILocalBankDetailsProps> = ({
  bankingDetails,
  investmentCurrencies,
  setBankingDetails,
}: ILocalBankDetailsProps) => {
  return (
    <View>
      {bankingDetails.map((item: IBankDetailsState, index: number) => {
        const handleRemoveNumber = () => {
          const updatedDetails = [...bankingDetails];
          updatedDetails.splice(updatedDetails.indexOf(item), 1);
          setBankingDetails(updatedDetails);
        };

        const handleAddCurrency = () => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].currency!.push("");
          setBankingDetails(updatedDetails);
        };

        const handleBankName = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].bankName = input;
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
          setBankingDetails(updatedDetails);
        };

        const handleAccountNumber = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].bankAccountNumber = input;
          setBankingDetails(updatedDetails);
        };

        const handleSwiftCode = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].bankSwiftCode = input;
          setBankingDetails(updatedDetails);
        };

        const localBankLabel = `${PERSONAL_DETAILS.LABEL_BANK_LOCAL} ${index + 1}`;
        const currencyExtractor = DICTIONARY_CURRENCY.filter(
          (filteredCurrency) => filteredCurrency.value !== "MYR" && investmentCurrencies.includes(filteredCurrency.value),
        );

        return (
          <View key={index}>
            <View style={{ ...centerVertical, ...flexRow, ...px(sw24) }}>
              <TextSpaceArea style={fs16BoldBlue2} text={localBankLabel} />
              <CustomSpacer isHorizontal={true} space={sw16} />
              {index === 0 ? null : <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveNumber} size={sh24} />}
            </View>
            <CustomSpacer space={sh24} />
            <View style={px(sw24)}>
              <CustomTextInput disabled={true} label={PERSONAL_DETAILS.LABEL_CURRENCY} value={item.currency![0]} />
              {item
                .currency!.filter((thisCurrency) => thisCurrency !== item.currency![0])
                .map((value: string, currencyIndex: number) => {
                  const handleRemoveCurrency = () => {
                    const updatedDetails = [...bankingDetails];
                    const updatedCurrency = [...item.currency!];
                    updatedCurrency.splice(currencyIndex + 1, 1);
                    updatedDetails[index].currency = updatedCurrency;
                    setBankingDetails(updatedDetails);
                  };

                  const handleOtherCurrency = (input: string) => {
                    const updatedDetails = [...bankingDetails];
                    const updatedCurrency = [...bankingDetails[index].currency!];
                    updatedCurrency[currencyIndex + 1] = input as TypeBankCurrency;
                    updatedDetails[index].currency = updatedCurrency;
                    setBankingDetails(updatedDetails);
                  };

                  return (
                    <View key={currencyIndex} style={{ ...centerVertical, ...flexRow }}>
                      <AdvancedDropdown
                        handleChange={handleOtherCurrency}
                        items={currencyExtractor}
                        label={PERSONAL_DETAILS.LABEL_OTHER_CURRENCY}
                        spaceToTop={sh32}
                        value={value}
                      />
                      <CustomSpacer isHorizontal={true} space={sw16} />
                      <View>
                        <CustomFlexSpacer />
                        <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveCurrency} size={sh24} style={py(sh8)} />
                      </View>
                    </View>
                  );
                })}

              <AdvancedDropdown
                handleChange={handleOtherBank}
                items={DICTIONARY_MALAYSIA_BANK}
                label={PERSONAL_DETAILS.LABEL_BANK_NAME}
                spaceToTop={sh32}
                value={item.bankName!}
              />
              {item.bankName === "Others" ? (
                <CustomTextInput
                  label={PERSONAL_DETAILS.LABEL_BANK_OTHER_NAME}
                  onChangeText={handleOtherBankName}
                  spaceToTop={sh32}
                  value={item.otherBankName}
                />
              ) : null}
              <CustomTextInput
                label={PERSONAL_DETAILS.LABEL_BANK_ACCOUNT_NAME}
                onChangeText={handleAccountName}
                spaceToTop={sh32}
                value={item.bankAccountName}
              />
              <CustomTextInput
                keyboardType="numeric"
                label={PERSONAL_DETAILS.LABEL_BANK_ACCOUNT_NUMBER}
                onChangeText={handleAccountNumber}
                spaceToTop={sh32}
                value={item.bankAccountNumber}
              />
              <CustomTextInput
                label={PERSONAL_DETAILS.LABEL_BANK_SWIFT_CODE}
                onChangeText={handleSwiftCode}
                spaceToTop={sh32}
                value={item.bankSwiftCode}
              />
              <TextSpaceArea
                spaceToTop={sh8}
                style={{ ...fs12SemiBoldGray8, ...px(sw16), letterSpacing: -sw02, maxWidth: sw328 }}
                text={PERSONAL_DETAILS.HINT_SWIFT_CODE}
              />
              {item.currency!.length === investmentCurrencies.length ? null : (
                <Fragment>
                  <CustomSpacer space={sh32} />
                  <OutlineButton
                    buttonType="dashed"
                    color={colorBlue._2}
                    icon="plus"
                    onPress={handleAddCurrency}
                    text={PERSONAL_DETAILS.BUTTON_ADD_CURRENCY}
                    textStyle={fs12BoldBlue2}
                  />
                </Fragment>
              )}
            </View>
            {index === bankingDetails.length - 1 ? null : <CustomSpacer space={sh24} />}
          </View>
        );
      })}
    </View>
  );
};
