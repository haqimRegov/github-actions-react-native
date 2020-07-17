import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomFlexSpacer, CustomSpacer, CustomTextInput, IconButton, OutlineButton } from "../../../components";
import { Language } from "../../../constants";
import { centerVertical, circleBorder, colorBlue, flexRow, px, sh24, sh4, sh8, sw05, sw12, sw14, sw16, sw32 } from "../../../styles";

const { CONTACT_DETAILS } = Language.PAGE;

interface IBankDetailsProps {
  bankingDetails: IBankingDetails[];
  setBankingDetails: (input: IBankingDetails[]) => void;
}

const blankLocalBankState = {
  accountName: "",
  accountNumber: "",
  bankName: "",
};

export const BankDetails: FunctionComponent<IBankDetailsProps> = ({ bankingDetails, setBankingDetails }: IBankDetailsProps) => {
  const handleAddLocalBank = () => {
    const bankingDetailsClone = [...bankingDetails, { ...blankLocalBankState }];
    setBankingDetails(bankingDetailsClone);
  };

  const handleAddForeignBank = () => {
    const bankingDetailsClone = [...bankingDetails, { ...blankLocalBankState }];
    setBankingDetails(bankingDetailsClone);
  };

  return (
    <View>
      {bankingDetails.map((item: IBankingDetails, index: number) => {
        const handleRemoveNumber = () => {
          const updatedNumber = [...bankingDetails];
          updatedNumber.splice(updatedNumber.indexOf(item), 1);
          setBankingDetails(updatedNumber);
        };

        const handleBankName = (input: string) => {
          const updatedNumber = [...bankingDetails];
          updatedNumber[index].bankName = input;
          setBankingDetails(updatedNumber);
        };

        const handleAccountName = (input: string) => {
          const updatedNumber = [...bankingDetails];
          updatedNumber[index].accountName = input;
          setBankingDetails(updatedNumber);
        };

        const handleAccountNumber = (input: string) => {
          const updatedNumber = [...bankingDetails];
          updatedNumber[index].accountNumber = input;
          setBankingDetails(updatedNumber);
        };

        return (
          <View key={index} style={{ ...centerVertical, ...flexRow }}>
            <View>
              <CustomTextInput
                label={CONTACT_DETAILS.LABEL_BANK_NAME}
                onChangeText={handleBankName}
                rightIcon="caret-down"
                spaceToTop={sh24}
                value={item.bankName}
              />
              <CustomTextInput
                label={CONTACT_DETAILS.LABEL_BANK_ACCOUNT_NAME}
                onChangeText={handleAccountName}
                rightIcon="caret-down"
                spaceToTop={sh24}
                value={item.accountName}
              />
              <CustomTextInput
                keyboardType="numeric"
                label={CONTACT_DETAILS.LABEL_BANK_ACCOUNT_NUMBER}
                onChangeText={handleAccountNumber}
                spaceToTop={sh24}
                value={item.accountNumber}
              />
            </View>
            <CustomSpacer isHorizontal={true} space={sw16} />
            {index === 0 ? null : (
              <View>
                <CustomFlexSpacer />
                <IconButton
                  color={colorBlue._1}
                  name="close"
                  onPress={handleRemoveNumber}
                  size={sw12}
                  style={circleBorder(sw32, sw05, colorBlue._1)}
                />
                <CustomSpacer space={sh4} />
              </View>
            )}
          </View>
        );
      })}
      <View style={px(sw14)}>
        <CustomSpacer space={sh8} />
        <OutlineButton icon="plus" onPress={handleAddLocalBank} text={CONTACT_DETAILS.BUTTON_ADD_LOCAL} />
        <CustomSpacer space={sh8} />
        <OutlineButton icon="plus" onPress={handleAddForeignBank} text={CONTACT_DETAILS.BUTTON_ADD_FOREIGN} />
      </View>
    </View>
  );
};
