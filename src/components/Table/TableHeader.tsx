import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerVertical, flexRow, fs12RegBlue25, px, sh16, sw10, sw20, sw4, sw56 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

interface TableHeaderProps {
  columns: ITableColumn[];
  rowSelectionLabel?: string;
}

export const TableHeader: FunctionComponent<TableHeaderProps> = ({ columns, rowSelectionLabel }: TableHeaderProps) => {
  const tableHeaderStyle: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    height: sh16,
  };

  const headerLetterSpacing = { letterSpacing: -0.33 };

  return (
    <View style={tableHeaderStyle}>
      <View style={{ width: sw56, ...flexRow }}>
        <CustomSpacer isHorizontal={true} space={sw20} />
        {rowSelectionLabel !== undefined ? <Text style={{ ...fs12RegBlue25, ...headerLetterSpacing }}>{rowSelectionLabel}</Text> : null}
      </View>
      {columns.map((item: ITableColumn, index: number) => {
        const headerStyle: ViewStyle = { ...flexRow, ...centerVertical, ...item.viewStyle };
        const textStyle: TextStyle = { ...fs12RegBlue25, ...headerLetterSpacing, ...px(sw10), ...item.textStyle };

        return (
          <TouchableWithoutFeedback key={index} onPress={item.onPressHeader}>
            <View style={headerStyle}>
              <Text style={textStyle}>{item.title}</Text>
              {item.icon === undefined ? null : (
                <Fragment>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <IcoMoon {...item.icon} />
                </Fragment>
              )}
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};
