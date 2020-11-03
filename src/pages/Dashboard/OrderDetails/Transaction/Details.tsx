import React, { Fragment } from "react";
import { Alert, Text, View } from "react-native";

import { CardWrap, CustomSpacer, IconText, LabeledTitleProps, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
import {
  borderBottomBlack21,
  colorBlue,
  flexRow,
  fs12BoldBlack2,
  fs16BoldBlue2,
  fs18BoldBlack2,
  px,
  sh16,
  sh24,
  sh32,
  sh8,
  sw16,
  sw20,
  sw24,
  sw64,
} from "../../../../styles";

const { DASHBOARD_ORDER_DETAILS } = Language.PAGE;

declare interface TransactionDetailsContentProps {
  transactionSummary: LabeledTitleProps[];
  paymentSummary: LabeledTitleProps[][];
}

export const TransactionDetailsContent = ({ transactionSummary, paymentSummary }: TransactionDetailsContentProps) => {
  const handleEdit = () => {
    Alert.alert("payment edit route");
  };

  const cardWrapProps = { spaceBetween: sw64, noInitialSpace: true, labelStyle: { ...fs12BoldBlack2, lineHeight: sh16 } };

  return (
    <Fragment>
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_SUMMARY} />
        <CardWrap data={transactionSummary} {...cardWrapProps} />
      </View>
      <CustomSpacer space={sh16} />
      {paymentSummary !== undefined ? (
        <Fragment>
          <View style={borderBottomBlack21} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <View style={flexRow}>
              <Text style={fs18BoldBlack2}>{DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_SUMMARY}</Text>
              <CustomSpacer isHorizontal={true} space={sw20} />
              <IcoMoon color={colorBlue._1} name="edit" onPress={handleEdit} size={sw24} />
            </View>
            <CustomSpacer space={sh16} />
            {paymentSummary.map((payment, index: number) => {
              const label = `${DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT} ${index + 1}`;
              return (
                <Fragment key={index}>
                  {index !== 0 ? <CustomSpacer space={sh8} /> : null}
                  <IconText color={colorBlue._2} iconSize={sh24} name="bank" spaceBetween={sw16} textStyle={fs16BoldBlue2} text={label} />
                  <CustomSpacer space={sh16} />
                  <View style={borderBottomBlack21} />
                  <CustomSpacer space={sh16} />
                  <CardWrap data={payment} {...cardWrapProps} />
                </Fragment>
              );
            })}
          </View>
        </Fragment>
      ) : null}
      <CustomSpacer space={sh8} />
    </Fragment>
  );
};
