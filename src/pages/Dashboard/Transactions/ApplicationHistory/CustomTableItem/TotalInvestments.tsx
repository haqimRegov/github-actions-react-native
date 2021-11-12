import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomSpacer, CustomTooltip, TouchableWrapper } from "../../../../../components";
import { Language } from "../../../../../constants/language";
import {
  alignFlexStart,
  centerHorizontal,
  flexChild,
  flexRow,
  fs12BoldBlue8,
  fs12BoldWhite1,
  fs12RegBlue1,
  fs12RegGray4,
  fullWidth,
  sh56,
  sh7,
  sh8,
  sw12,
  sw4,
  sw84,
} from "../../../../../styles";

const { DASHBOARD_HOME } = Language.PAGE;

export type TotalInvestmentsProps = ITableCustomItem;

export const TotalInvestments: FunctionComponent<TotalInvestmentsProps> = ({ item, lastIndex }: TotalInvestmentsProps) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const { totalInvestment } = item.rawData as IDashboardOrder;
  const handleShowMore = () => {
    setShowToolTip(!showToolTip);
  };
  const handleClose = () => {
    setShowToolTip(false);
  };

  const content = (
    <Fragment>
      {totalInvestment.map((investment: IOrderAmount, index: number) => {
        return (
          <View key={index}>
            <View style={flexRow}>
              <Text style={fs12BoldWhite1}>{investment.currency}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <Text numberOfLines={1} style={fs12BoldWhite1}>
                {investment.amount}
              </Text>
            </View>
          </View>
        );
      })}
    </Fragment>
  );
  const tooltipPlacement = lastIndex ? "top" : "bottom";
  const topAdjustment = lastIndex ? -sh56 : undefined;
  const style: ViewStyle = totalInvestment.length <= 3 ? centerHorizontal : { ...alignFlexStart, ...flexChild, marginVertical: sh8 };

  return (
    <TouchableWrapper isTouchable={totalInvestment.length > 3} onPress={handleShowMore}>
      <View style={{ ...style, ...flexChild }} onResponderStart={() => true}>
        {totalInvestment.map((investment: IOrderAmount, index: number) => {
          return (
            <Fragment key={index}>
              {index < 3 ? (
                <View style={flexRow}>
                  <Text style={fs12RegGray4}>{investment.currency}</Text>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <Text numberOfLines={1} style={{ ...fs12RegBlue1, width: sw84 }}>
                    {investment.amount}
                  </Text>
                </View>
              ) : null}
            </Fragment>
          );
        })}
        {totalInvestment.length > 3 ? (
          <Fragment>
            <CustomTooltip
              arrowSize={{ height: sh7, width: sw12 }}
              content={content}
              contentStyle={fullWidth}
              isVisible={showToolTip}
              onClose={handleClose}
              onPress={handleShowMore}
              placement={tooltipPlacement}
              topAdjustment={topAdjustment}
              spacing={0}>
              <View>
                <Text style={fs12BoldBlue8}>{DASHBOARD_HOME.LABEL_SHOW_ALL}</Text>
              </View>
            </CustomTooltip>
          </Fragment>
        ) : null}
      </View>
    </TouchableWrapper>
  );
};
