import React, { Fragment, FunctionComponent, useState } from "react";
import { LayoutChangeEvent, Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer } from "../../components";
import { english } from "../../constants/language/english";
import { IcoMoon } from "../../icons";
import {
  borderLeftGray3,
  colorBlue,
  colorWhite,
  flexRow,
  flexWrap,
  fs12BoldGray6,
  fs18BoldBlack2,
  px,
  py,
  rowCenterVertical,
  scaleWidth,
  sh16,
  sh40,
  sh72,
  sh8,
  sw16,
  sw24,
  sw4,
} from "../../styles";
import { formatAmount } from "../../utils";

const { ORDER_SUMMARY } = english.PAGE;

interface GrandTotalProps {
  grandTotal: IOrderAmount[];
  grandTotalRecurring?: IOrderAmount;
}

export const GrandTotal: FunctionComponent<GrandTotalProps> = ({ grandTotal, grandTotalRecurring }: GrandTotalProps) => {
  const [recurringWidth, setRecurringWidth] = useState<number>(0);

  const containerStyle: ViewStyle = {
    ...flexRow,
    ...px(sw24),
    ...py(sh16),
    backgroundColor: colorWhite._1,
    borderRadius: sh8,
    minHeight: sh72,
  };

  const GRAND_TOTAL_MAX_WIDTH = 704;
  const grandTotalWidth = scaleWidth(GRAND_TOTAL_MAX_WIDTH - recurringWidth);

  return (
    <View style={px(sw24)}>
      <View style={containerStyle}>
        <IcoMoon color={colorBlue._1} name="order" size={sh40} />
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View>
          <Text style={fs12BoldGray6}>{ORDER_SUMMARY.LABEL_GRAND_TOTAL}</Text>
          <CustomSpacer isHorizontal={true} space={sw4} />
          <View style={{ ...rowCenterVertical, ...flexWrap, maxWidth: grandTotalWidth }}>
            {grandTotal ? (
              <Fragment>
                {grandTotal.map((totalAmount: IOrderAmount, index: number) => {
                  return (
                    <View key={index} style={rowCenterVertical}>
                      {index !== 0 ? <Text style={{ ...fs18BoldBlack2, ...px(sw4) }}>+</Text> : null}
                      <Text style={fs18BoldBlack2}>{totalAmount.currency}</Text>
                      <CustomSpacer isHorizontal={true} space={sw4} />
                      <Text style={fs18BoldBlack2}>{formatAmount(totalAmount.amount)}</Text>
                    </View>
                  );
                })}
              </Fragment>
            ) : (
              <Text style={fs18BoldBlack2}>-</Text>
            )}
          </View>
        </View>
        <CustomFlexSpacer />
        {grandTotalRecurring ? (
          <View
            onLayout={(e: LayoutChangeEvent) => {
              setRecurringWidth(e.nativeEvent.layout.width);
            }}
            style={flexRow}>
            <View style={borderLeftGray3} />
            <CustomSpacer isHorizontal space={sw24} />
            <View>
              <Text style={fs12BoldGray6}>{ORDER_SUMMARY.LABEL_RECURRING}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <View style={rowCenterVertical}>
                <Text style={fs18BoldBlack2}>{grandTotalRecurring.currency}</Text>
                <CustomSpacer isHorizontal={true} space={sw4} />
                <Text style={fs18BoldBlack2}>{formatAmount(grandTotalRecurring.amount)}</Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};
