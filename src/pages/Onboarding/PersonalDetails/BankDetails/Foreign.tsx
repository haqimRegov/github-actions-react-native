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
import { DICTIONARY_COUNTRIES, DICTIONARY_CURRENCY } from "../../../../data/dictionary";
import {
  centerVertical,
  colorBlack,
  flexRow,
  fs12SemiBoldGray8,
  fs16BoldBlue2,
  px,
  py,
  sh16,
  sh24,
  sh32,
  sh8,
  sw16,
  sw24,
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
  return (
    <View>
      {bankingDetails.map((item: IBankingDetails, index: number) => {
        const handleAddCurrency = () => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].currency.push("");
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

        const handleBankLocation = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].bankLocation = input;
          setBankingDetails(updatedDetails);
        };

        const handleAccountName = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].accountName = input;
          setBankingDetails(updatedDetails);
        };

        const handleAccountNumber = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].accountNumber = input;
          setBankingDetails(updatedDetails);
        };

        const handleSwiftCode = (input: string) => {
          const updatedDetails = [...bankingDetails];
          updatedDetails[index].bankSwiftCode = input;
          setBankingDetails(updatedDetails);
        };

        const foreignBankLabel = `${PERSONAL_DETAILS.LABEL_BANK_FOREIGN} ${index + 1}`;

        const currencyExtractor = DICTIONARY_CURRENCY.filter((filteredCurrency) => !item.currency.includes(filteredCurrency.value));

        return (
          <View key={index}>
            <View style={{ ...centerVertical, ...flexRow, ...px(sw24) }}>
              <TextSpaceArea style={fs16BoldBlue2} text={foreignBankLabel} />
              <CustomSpacer isHorizontal={true} space={sw16} />
              <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveNumber} size={sh24} />
            </View>
            <CustomSpacer space={sh16} />
            <View style={px(sw24)}>
              {item.currency.map((value: TypeBankCurrency, currencyIndex: number) => {
                const handleRemoveCurrency = () => {
                  const updatedCurrency = [...item.currency];
                  updatedCurrency.splice(currencyIndex, 1);
                  const updatedBankingDetails = [...bankingDetails];
                  updatedBankingDetails[index].currency = updatedCurrency;
                  setBankingDetails(updatedBankingDetails);
                };

                const handleOtherCurrency = (input: string) => {
                  const updatedCurrency = [...bankingDetails[index].currency];
                  updatedCurrency[currencyIndex] = input as TypeBankCurrency;
                  const updatedBankingDetails = [...bankingDetails];
                  updatedBankingDetails[index].currency = updatedCurrency;
                  setBankingDetails(updatedBankingDetails);
                };

                const label = currencyIndex === 0 ? PERSONAL_DETAILS.LABEL_CURRENCY : PERSONAL_DETAILS.LABEL_OTHER_CURRENCY;

                return (
                  <Fragment key={currencyIndex}>
                    {currencyIndex === 0 ? null : <CustomSpacer space={sh32} />}
                    <View style={{ ...centerVertical, ...flexRow }}>
                      <AdvancedDropdown handleChange={handleOtherCurrency} items={currencyExtractor} label={label} value={value} />
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
              {item.currency.length === DICTIONARY_CURRENCY.length ? null : (
                <Fragment>
                  <CustomSpacer space={sh32} />
                  <OutlineButton icon="plus" onPress={handleAddCurrency} text={PERSONAL_DETAILS.BUTTON_ADD_CURRENCY} />
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
              <AdvancedDropdown
                items={DICTIONARY_COUNTRIES}
                handleChange={handleBankLocation}
                label={PERSONAL_DETAILS.LABEL_BANK_LOCATION}
                spaceToTop={sh32}
                value={item.bankLocation || ""}
              />
              <CustomTextInput
                label={PERSONAL_DETAILS.LABEL_BANK_SWIFT_CODE}
                onChangeText={handleSwiftCode}
                spaceToTop={sh32}
                value={item.bankSwiftCode}
              />
              <TextSpaceArea spaceToTop={sh8} style={{ ...fs12SemiBoldGray8, ...px(sw16) }} text={PERSONAL_DETAILS.HINT_SWIFT_CODE} />
            </View>
            <CustomSpacer space={sh24} />
          </View>
        );
      })}
    </View>
  );
};
