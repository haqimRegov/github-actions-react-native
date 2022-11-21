import Clipboard from "@react-native-clipboard/clipboard";
import React, { Fragment, FunctionComponent } from "react";
import { Pressable, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { DICTIONARY_KIB_BANK_ACCOUNTS } from "../../data/dictionary";
import {
  alignSelfEnd,
  border,
  borderBottomGray2,
  colorBlue,
  colorWhite,
  flexGrow,
  flexRow,
  fs10BoldGray5,
  fs10RegGray4,
  fs12BoldBlue1,
  fs12RegGray4,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh16,
  sh216,
  sh8,
  sw1,
  sw16,
  sw24,
  sw4,
  sw440,
  sw448,
  sw8,
} from "../../styles";
import { IconButton } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

interface CollectionBankCardProps {
  data: IOrderAmount[];
}

interface ICollectionBankCard {
  currency: TypeCurrency[];
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankSwiftCode: string;
}

const { NEW_SALES_PROMPT } = Language.PAGE;

export const CollectionBankCard: FunctionComponent<CollectionBankCardProps> = ({ data }: CollectionBankCardProps) => {
  const containerStyle: ViewStyle = {
    ...border(colorBlue._3, sw1, sw8),
    backgroundColor: colorWhite._1,
    ...py(sh12),
    ...px(sw24),
    width: sw440,
  };
  const dataTextStyle: TextStyle = { marginLeft: "auto", ...fs10BoldGray5 };

  const kibTrustAccount: ICollectionBankCard[] = [];
  const kibAccount: ICollectionBankCard[] = [];

  data.forEach((eachTotal) => {
    const [collectionBank] = DICTIONARY_KIB_BANK_ACCOUNTS.filter((bank) => bank.currency === eachTotal.currency);
    const isTrustAccount = DICTIONARY_KIB_BANK_ACCOUNTS[2].bankAccountName === collectionBank.bankAccountName;
    const account: ICollectionBankCard[] = isTrustAccount ? kibTrustAccount : kibAccount;

    const entry = {
      currency: [collectionBank.currency],
      bankName: collectionBank.bankName,
      bankAccountName: collectionBank.bankAccountName,
      bankAccountNumber: collectionBank.bankAccountNumber,
      bankSwiftCode: collectionBank.bankSwiftCode,
    };

    if (account.length === 0) {
      account.push(entry);
    } else {
      const findBankIndex = account.findIndex((eachAcc) => collectionBank.bankAccountName === eachAcc.bankAccountName);
      if (findBankIndex === -1) {
        account.push(entry);
      } else {
        account[findBankIndex].currency.push(collectionBank.currency);
      }
    }
  });

  const banks = kibAccount.concat(kibTrustAccount);

  return (
    <ScrollView
      scrollEnabled={banks.length > 1 || (kibTrustAccount.length > 0 && kibTrustAccount[0].currency.length > 3)}
      contentContainerStyle={flexGrow}
      style={{ maxHeight: sh216, width: sw448 }}>
      {banks.map((eachBank, index) => {
        return (
          <Fragment key={index}>
            {index === 0 ? null : <CustomSpacer space={sh8} />}
            <View style={containerStyle}>
              <View style={rowCenterVertical}>
                <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_BANK_NAME}</Text>
                <Text style={dataTextStyle}>{eachBank.bankName}</Text>
              </View>
              <CustomSpacer space={sh8} />
              <View style={borderBottomGray2} />
              <CustomSpacer space={sh8} />
              <View style={rowCenterVertical}>
                <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_ACC_NAME}</Text>
                <Text style={dataTextStyle}>{eachBank.bankAccountName}</Text>
              </View>
              <CustomSpacer space={sh8} />
              <View style={borderBottomGray2} />
              <CustomSpacer space={sh8} />
              <View style={flexRow}>
                <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_ACC_NUMBER}</Text>
                <CustomFlexSpacer />
                <View>
                  {eachBank.currency.map((eachCurrency: TypeCurrency, currencyIndex: number) => {
                    const copyToClipboard = () => {
                      Clipboard.setString(eachBank.bankAccountNumber);
                    };

                    return (
                      <Fragment key={currencyIndex}>
                        <CustomSpacer space={sh8} />
                        <View style={{ ...rowCenterVertical, ...alignSelfEnd }}>
                          <Text style={fs12RegGray4}>{`(${eachCurrency})`}</Text>
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          <Pressable onPress={copyToClipboard} style={rowCenterVertical}>
                            <Text style={fs12BoldBlue1}>{eachBank.bankAccountNumber}</Text>
                            <CustomSpacer isHorizontal={true} space={sw4} />
                            <IconButton color={colorBlue._1} name="clipboard-new" onPress={copyToClipboard} size={sh16} />
                          </Pressable>
                        </View>
                      </Fragment>
                    );
                  })}
                </View>
              </View>
              <CustomSpacer space={sh8} />
              <View style={borderBottomGray2} />
              <CustomSpacer space={sh8} />
              <View style={flexRow}>
                <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_SWIFT_CODE}</Text>
                <Text style={dataTextStyle}>{eachBank.bankSwiftCode}</Text>
              </View>
            </View>
          </Fragment>
        );
      })}
    </ScrollView>
  );
};
