import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { LayoutChangeEvent, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { CustomSpacer } from "../../../../../components";
import { Language } from "../../../../../constants";
import {
  autoHeight,
  colorBlue,
  flexRow,
  fs10BoldBlue1,
  fs10BoldBlue8,
  fs10RegBlue6,
  justifyContentStart,
  overflowHidden,
  px,
  sh12,
  sh19,
  sh20,
  sh4,
  sh52,
  sh64,
  sw12,
  sw4,
  sw8,
} from "../../../../../styles";
import { isEmpty, isNotEmpty } from "../../../../../utils";

const { DASHBOARD_TRACKING } = Language.PAGE;

export interface RemarkProps extends ITableCustomItem {
  sortedColumns: TransactionsSortColumnType[];
}

export const Remark: FunctionComponent<RemarkProps> = ({ item }: RemarkProps) => {
  const { remark } = item.rawData as IDashboardOrder;
  const [onPress, setOnPress] = useState<boolean>(false);
  const [heightNumber, setHeightNumber] = useState<number>(0);
  const labelNormalStyle: TextStyle = { ...fs10RegBlue6, marginTop: sh20 };
  const bulletStyle: TextStyle = { fontSize: sw12, fontWeight: "bold" };
  const bulletPointTextStyle: TextStyle = { paddingLeft: sw4, ...fs10RegBlue6 };
  const showAllTextStyle: TextStyle =
    onPress !== true ? { ...fs10BoldBlue8, textDecorationLine: "underline", textDecorationColor: colorBlue._8 } : { display: "none" };
  const showAllContainerStyle: ViewStyle = { marginLeft: "auto", marginTop: "auto", marginBottom: sh19 };
  const openStyle: ViewStyle = onPress !== true ? { maxHeight: sh64, ...overflowHidden } : { maxHeight: "auto", marginBottom: sh4 };
  const outerContainerStyle: ViewStyle = {
    ...justifyContentStart,
    ...openStyle,
    ...px(sw8),
    paddingTop: sh12,
  };

  const handleOpen = () => {
    setOnPress(true);
  };
  // const totalRemarks =
  //   remark.length > 0 ? remark.map((eachSection) => eachSection.remark.length).reduce((total, current) => total + current) : 0;

  const ShowAllComponent = () => (
    <TouchableWithoutFeedback onPress={handleOpen}>
      <View style={showAllContainerStyle}>
        <Text style={showAllTextStyle}>{DASHBOARD_TRACKING.LABEL_SHOW_ALL}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const handleHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    return setHeightNumber(height);
  };

  return (
    <View style={flexRow}>
      <View style={outerContainerStyle}>
        {isEmpty(remark) || (isNotEmpty(remark) && remark.length) === 0 ? (
          <Text style={{ marginTop: sh20 }}>-</Text>
        ) : (
          <View onLayout={handleHeight}>
            {remark.map((data, index: number) => {
              return (
                <View key={index}>
                  {/* checks whether there is any remarks for styling change  */}
                  {isNotEmpty(data.remark) ? (
                    <View>
                      <Text style={data.remark.length > 0 ? fs10BoldBlue1 : labelNormalStyle}>{data.label}</Text>
                    </View>
                  ) : null}
                  {/* remark with more than 1 point  */}
                  {/* add length  */}
                  {isNotEmpty(data.remark) ? (
                    <Fragment>
                      {data.remark.length > 1 ? (
                        <View style={autoHeight}>
                          <View>
                            {data.remark.map((subContent, indexes: number) => {
                              return (
                                <View style={flexRow} key={indexes}>
                                  <Text style={bulletStyle}>{"\u2022"}</Text>
                                  <Text style={bulletPointTextStyle}>{subContent}</Text>
                                </View>
                              );
                            })}
                          </View>
                          <CustomSpacer space={sh4} />
                        </View>
                      ) : (
                        // remark with only 1 point
                        <View>
                          <Text style={fs10RegBlue6}>{data.remark[0]}</Text>
                        </View>
                      )}
                    </Fragment>
                  ) : null}
                </View>
              );
            })}
          </View>
        )}
      </View>
      {/* show all button  */}
      {heightNumber > sh52 ? <ShowAllComponent /> : null}
    </View>
  );
};
