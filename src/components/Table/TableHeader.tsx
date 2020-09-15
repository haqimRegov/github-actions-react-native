import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import { centerVertical, colorTransparent, flexRow, fs12RegBlue25, sw1, sw20, sw4, sw56, sw8, sw9 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

const { PRODUCT_LIST } = Language.PAGE;

interface TableHeaderProps {
  columns: ITableColumn[];
  rowSelectionLabel?: string;
  withActions?: boolean;
}

export const TableHeader: FunctionComponent<TableHeaderProps> = ({ columns, rowSelectionLabel, withActions }: TableHeaderProps) => {
  const tableHeaderStyle: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    borderWidth: sw1,
    borderColor: colorTransparent,
  };

  const headerLetterSpacing = { letterSpacing: -0.33 };
  const tableColumns = withActions === true ? [...columns, { key: [], title: PRODUCT_LIST.LABEL_COLUMN_ACTIONS }] : columns;

  return (
    <View style={tableHeaderStyle}>
      {rowSelectionLabel !== undefined ? (
        <View style={{ width: sw56, ...flexRow }}>
          <CustomSpacer isHorizontal={true} space={sw20} />
          <Text style={{ ...fs12RegBlue25, ...headerLetterSpacing }}>{rowSelectionLabel}</Text>
        </View>
      ) : null}
      {tableColumns.map((item: ITableColumn, index: number) => {
        const headerStyle: ViewStyle = { ...flexRow, ...centerVertical, ...item.viewStyle };
        const textStyle: TextStyle = { ...fs12RegBlue25, ...headerLetterSpacing, ...item.textStyle, ...item.titleStyle };

        return (
          <TouchableWithoutFeedback key={index} onPress={item.onPressHeader}>
            <View style={headerStyle}>
              <CustomSpacer isHorizontal={true} space={index === 0 ? sw8 : sw9} />
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
