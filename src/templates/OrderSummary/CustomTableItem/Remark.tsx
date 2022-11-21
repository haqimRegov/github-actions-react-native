import React, { Fragment, FunctionComponent, useState } from "react";
import { LayoutChangeEvent, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import {
  circle,
  colorBlue,
  flexChild,
  flexRow,
  fs10BoldBlue6,
  fs10BoldBlue8,
  fs10RegBlue5,
  fsUnderline,
  fullHeight,
  overflowHidden,
  px,
  py,
  rowCenterVertical,
  sh10,
  sh12,
  sh13,
  sh38,
  sh4,
  sw12,
  sw296,
  sw312,
  sw4,
  sw8,
} from "../../../styles";
import { isNotEmpty } from "../../../utils";

const { DASHBOARD_TRACKING } = Language.PAGE;

export interface RemarkProps extends ITableCustomItem {
  sortedColumns: TransactionsSortColumnType[];
}

export const Remark: FunctionComponent<RemarkProps> = ({ item }: RemarkProps) => {
  const { remark } = item.rawData as unknown as IDashboardOrder;
  const [showAll, setShowAll] = useState<boolean>(false);
  const [heightNumber, setHeightNumber] = useState<number>(0);
  const openStyle: ViewStyle = showAll !== true ? { maxHeight: sh38, ...overflowHidden } : {};
  const outerContainerStyle: ViewStyle = { ...px(sw8), ...openStyle };

  const handleOpen = () => {
    setShowAll(!showAll);
  };

  const ShowAllComponent = () => (
    <TouchableWithoutFeedback onPress={handleOpen}>
      <View>
        <CustomFlexSpacer />
        <Text style={{ ...fs10BoldBlue8, ...fsUnderline }}>{DASHBOARD_TRACKING.LABEL_SHOW_ALL}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const handleHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    return setHeightNumber(height);
  };

  return (
    <View style={{ ...flexRow, ...flexChild, ...py(sw12), maxWidth: sw312 }}>
      <View style={outerContainerStyle}>
        {remark === null || (isNotEmpty(remark) && remark.length === 0) ? (
          <View style={{ ...rowCenterVertical, ...fullHeight }}>
            <Text style={fs10RegBlue5}>-</Text>
          </View>
        ) : (
          <View onLayout={handleHeight}>
            {remark.map((data, index: number) => {
              const remarkTitleStyle = data.remark.length > 0 ? fs10BoldBlue6 : fs10RegBlue5;
              return (
                <View key={index}>
                  {/* checks whether there is any remarks for styling change  */}
                  {isNotEmpty(data.remark) ? <Text style={{ ...remarkTitleStyle, lineHeight: sh13 }}>{data.label}</Text> : null}
                  {/* remark with more than 1 point  */}
                  {/* add length  */}
                  {isNotEmpty(data.remark) ? (
                    <Fragment>
                      {data.remark.length > 1 ? (
                        <View>
                          {data.remark.map((subContent, indexes: number) => {
                            return (
                              <View style={flexRow}>
                                <View style={{ height: sh10, ...rowCenterVertical }}>
                                  <View style={circle(sw4, colorBlue._5)} />
                                </View>
                                <CustomSpacer isHorizontal={true} space={sw4} />
                                <Text
                                  key={indexes}
                                  numberOfLines={showAll === true ? undefined : 1}
                                  style={{ ...fs10RegBlue5, lineHeight: sh12, maxWidth: sw296 }}>
                                  {subContent}
                                </Text>
                              </View>
                            );
                          })}
                          <CustomSpacer space={sh4} />
                        </View>
                      ) : (
                        // remark with only 1 point
                        <Text style={fs10RegBlue5}>{data.remark[0]}</Text>
                      )}
                    </Fragment>
                  ) : null}
                </View>
              );
            })}
          </View>
        )}
      </View>
      {heightNumber > sh38 && showAll === false ? (
        <Fragment>
          <CustomFlexSpacer />
          <ShowAllComponent />
          <CustomSpacer isHorizontal={true} space={sw8} />
        </Fragment>
      ) : null}
    </View>
  );
};
