import React, { Fragment, FunctionComponent } from "react";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  borderBottomGray2,
  colorBlue,
  colorWhite,
  flexRow,
  fs10BoldGray5,
  fs10RegGray4,
  fs12RegGray4,
  px,
  py,
  sh12,
  sh16,
  sh8,
  sw16,
  sw24,
  sw4,
} from "../../styles";
import { isNotEmpty } from "../../utils";
import { CustomSpacer } from "./Spacer";

declare interface ISummaryCardProps {
  data: ISummaryCard;
}

interface ISummaryCard {
  bankName: string;
  accountName: string;
  accountNumber: IAccountNumber[];
  bankSwiftCode?: string;
}

interface IAccountNumber {
  currency: string;
  id: string;
}

const { NEW_SALES_PROMPT } = Language.PAGE;

export const SummaryCard: FunctionComponent<ISummaryCardProps> = ({ data }: ISummaryCardProps) => {
  const containerStyle: ViewStyle = { backgroundColor: colorWhite._1, borderRadius: sh8, ...py(sh12), ...px(sw24) };
  const dataTextStyle: TextStyle = { marginLeft: "auto", ...fs10BoldGray5 };
  const innerContentStyle: ViewStyle = { marginLeft: "auto" };

  return (
    <Fragment>
      <View style={containerStyle}>
        {/* bankName  */}
        <View style={flexRow}>
          <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_BANK_NAME}</Text>
          <Text style={dataTextStyle}>{data.bankName}</Text>
        </View>

        {/* account Name  */}
        <CustomSpacer space={sh8} />
        <View style={borderBottomGray2} />
        <CustomSpacer space={sh8} />
        <View style={flexRow}>
          <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_ACC_NAME}</Text>
          <Text style={dataTextStyle}>{data.accountName}</Text>
        </View>

        {/* account Number  */}
        <CustomSpacer space={sh8} />
        <View style={borderBottomGray2} />
        <CustomSpacer space={sh8} />
        <View style={flexRow}>
          <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_ACC_NUMBER}</Text>
          <View style={innerContentStyle}>
            {data.accountNumber.map((accNumber, index: number) => {
              const copyToClipboard = () => {
                console.log(accNumber.id);
              };
              return (
                <Fragment key={index}>
                  <View style={flexRow}>
                    <Text style={fs12RegGray4}>{accNumber.currency}</Text>
                    <CustomSpacer space={sw16} isHorizontal />
                    <Pressable onPress={copyToClipboard} style={flexRow}>
                      <Text style={fs10BoldGray5}>{accNumber.id}</Text>
                      <CustomSpacer space={sw4} isHorizontal />
                      {/* TODO import copy icon  */}
                      <IcoMoon name={"bank"} size={sh16} color={colorBlue._1} />
                    </Pressable>
                  </View>
                  <CustomSpacer space={sh8} />
                </Fragment>
              );
            })}
          </View>
        </View>

        {/* optional swiftCode  */}
        {isNotEmpty(data.bankSwiftCode) ? (
          <Fragment>
            <View style={borderBottomGray2} />
            <CustomSpacer space={sh8} />
            <View style={flexRow}>
              <Text style={fs10RegGray4}>{NEW_SALES_PROMPT.LABEL_SWIFT_CODE}</Text>
              <Text style={dataTextStyle}>{data.bankSwiftCode}</Text>
            </View>
          </Fragment>
        ) : null}
      </View>
    </Fragment>
  );
};
