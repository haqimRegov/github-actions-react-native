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
import { DICTIONARY_CURRENCY } from "../../../../data/dictionary";
import {
  centerVertical,
  circle,
  colorBlack,
  colorTransparent,
  flexRow,
  fs12RegBlack2,
  fs16BoldBlue2,
  px,
  sh24,
  sh32,
  sw16,
  sw24,
  sw40,
} from "../../../../styles";

const { PERSONAL_DETAILS } = Language.PAGE;

interface IForeignBankDetailsProps {
  bankingDetails: IBankingDetails[];
  setBankingDetails: (input: IBankingDetails[]) => void;
}

export const ForeignBankDetails: FunctionComponent<IForeignBankDetailsProps> = ({
  bankingDetails,
  setBankingDetails,
}: IForeignBankDetailsProps) => {
  const updatedDetails = [...bankingDetails];

  return (
    <View>
      {bankingDetails.map((item: IBankingDetails, index: number) => {
        const handleAddCurrency = () => {
          updatedDetails[index].currency.push("");
          setBankingDetails(updatedDetails);
        };

        const handleRemoveNumber = () => {
          updatedDetails.splice(updatedDetails.indexOf(item), 1);
          setBankingDetails(updatedDetails);
        };

        const handleBankName = (input: string) => {
          updatedDetails[index].bankName = input;
          setBankingDetails(updatedDetails);
        };

        const handleAccountName = (input: string) => {
          updatedDetails[index].accountName = input;
          setBankingDetails(updatedDetails);
        };

        const handleAccountNumber = (input: string) => {
          updatedDetails[index].accountNumber = input;
          setBankingDetails(updatedDetails);
        };

        const handleSwiftCode = (input: string) => {
          updatedDetails[index].bankSwiftCode = input;
          setBankingDetails(updatedDetails);
        };

        const localBankLabel = `${PERSONAL_DETAILS.LABEL_BANK_FOREIGN} ${index + 1}`;

        const currencyExtractor = DICTIONARY_CURRENCY.filter((filteredCurrency) => !item.currency.includes(filteredCurrency.value));

        return (
          <View key={index}>
            <View style={{ ...flexRow, ...px(sw24) }}>
              <TextSpaceArea spaceToBottom={sh32} style={fs16BoldBlue2} text={localBankLabel} />
              <CustomFlexSpacer />
              <IconButton
                name="trash"
                color={colorBlack._1}
                onPress={handleRemoveNumber}
                size={sh32}
                style={circle(sw40, colorTransparent)}
              />
            </View>
            <View style={px(sw24)}>
              <CustomTextInput disabled={true} label={PERSONAL_DETAILS.LABEL_CURRENCY} value={item.currency[0]} />
              {item.currency.slice(1).map((value: TypeBankCurrency, currencyIndex: number) => {
                const handleRemoveCurrency = () => {
                  const updatedCurrency = [...item.currency];
                  updatedCurrency.splice(currencyIndex + 1, 1);
                  const updatedBankingDetails = [...bankingDetails];
                  updatedBankingDetails[index].currency = updatedCurrency;
                  setBankingDetails(updatedBankingDetails);
                };

                const handleOtherCurrency = (input: string) => {
                  const updatedCurrency = [...bankingDetails[index].currency];
                  updatedCurrency[currencyIndex + 1] = input as TypeBankCurrency;
                  const updatedBankingDetails = [...bankingDetails];
                  updatedBankingDetails[index].currency = updatedCurrency;
                  setBankingDetails(updatedBankingDetails);
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
                      <IconButton
                        name="trash"
                        color={colorBlack._1}
                        onPress={handleRemoveCurrency}
                        size={sh24}
                        style={circle(sw40, colorTransparent)}
                      />
                    </View>
                  </View>
                );
              })}
              {item.currency.length === DICTIONARY_CURRENCY.length ? null : (
                <Fragment>
                  <CustomSpacer space={sh32} />
                  <OutlineButton
                    icon="plus"
                    onPress={handleAddCurrency}
                    text={PERSONAL_DETAILS.BUTTON_ADD_CURRENCY}
                    textStyle={fs12RegBlack2}
                  />
                </Fragment>
              )}

              <CustomTextInput
                label={PERSONAL_DETAILS.LABEL_BANK_NAME}
                onChangeText={handleBankName}
                spaceToTop={sh32}
                value={item.bankName}
              />
              <CustomTextInput
                label={PERSONAL_DETAILS.LABEL_BANK_ACCOUNT_NAME}
                onChangeText={handleAccountName}
                spaceToTop={sh32}
                value={item.accountName}
              />
              <CustomTextInput
                keyboardType="numeric"
                label={PERSONAL_DETAILS.LABEL_BANK_ACCOUNT_NUMBER}
                onChangeText={handleAccountNumber}
                spaceToTop={sh32}
                value={item.accountNumber}
              />
              <CustomTextInput
                label={PERSONAL_DETAILS.LABEL_BANK_SWIFT_CODE}
                onChangeText={handleSwiftCode}
                spaceToTop={sh32}
                value={item.bankSwiftCode}
              />
            </View>
            <CustomSpacer space={sh24} />
          </View>
        );
      })}
    </View>
  );
};
