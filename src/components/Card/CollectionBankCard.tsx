import Clipboard from "@react-native-clipboard/clipboard";
import React, { Fragment, FunctionComponent } from "react";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { DICTIONARY_KIB_BANK_ACCOUNTS } from "../../data/dictionary";
import {
  border,
  borderBottomGray2,
  colorBlue,
  colorWhite,
  flexRow,
  fs10BoldGray5,
  fs10RegGray4,
  fs12RegGray4,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh16,
  sh8,
  sw1,
  sw16,
  sw24,
  sw4,
  sw8,
} from "../../styles";
import { IconButton } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

declare interface CollectionBankCardProps {
  data: IKibBankAccounts[];
}

const { NEW_SALES_PROMPT } = Language.PAGE;

export const CollectionBankCard: FunctionComponent<CollectionBankCardProps> = ({ data }: CollectionBankCardProps) => {
  const containerStyle: ViewStyle = { ...border(colorBlue._3, sw1, sw8), backgroundColor: colorWhite._1, ...py(sh12), ...px(sw24) };
  const dataTextStyle: TextStyle = { marginLeft: "auto", ...fs10BoldGray5 };

  // TODO confirm if Bank Account Name is same across all accounts
  const defaultBank = DICTIONARY_KIB_BANK_ACCOUNTS[0];

  return (
    <View style={containerStyle}>
      <View style={rowCenterVertical}>
        <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_BANK_NAME}</Text>
        <Text style={dataTextStyle}>{defaultBank.bankName}</Text>
      </View>
      <CustomSpacer space={sh8} />
      <View style={borderBottomGray2} />
      <CustomSpacer space={sh8} />
      <View style={rowCenterVertical}>
        <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_ACC_NAME}</Text>
        <Text style={dataTextStyle}>{defaultBank.bankAccountName}</Text>
      </View>
      <CustomSpacer space={sh8} />
      <View style={borderBottomGray2} />
      <CustomSpacer space={sh8} />
      <View style={flexRow}>
        <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_ACC_NUMBER}</Text>
        <CustomFlexSpacer />
        <View>
          {data.map((bank: IKibBankAccounts, index: number) => {
            const copyToClipboard = () => {
              Clipboard.setString(bank.bankAccountNumber);
            };
            return (
              <Fragment key={index}>
                <View style={rowCenterVertical}>
                  <Text style={fs12RegGray4}>{`(${bank.currency})`}</Text>
                  <CustomSpacer isHorizontal={true} space={sw16} />
                  <Pressable onPress={copyToClipboard} style={rowCenterVertical}>
                    <Text style={fs10BoldGray5}>{bank.bankAccountNumber}</Text>
                    <CustomSpacer isHorizontal={true} space={sw4} />
                    <IconButton color={colorBlue._1} name="clipboard-new" onPress={copyToClipboard} size={sh16} />
                  </Pressable>
                </View>
                <CustomSpacer space={sh8} />
              </Fragment>
            );
          })}
        </View>
      </View>
      <View style={borderBottomGray2} />
      <CustomSpacer space={sh8} />
      <View style={flexRow}>
        <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_SWIFT_CODE}</Text>
        <Text style={dataTextStyle}>{defaultBank.bankSwiftCode}</Text>
      </View>
    </View>
  );
};
