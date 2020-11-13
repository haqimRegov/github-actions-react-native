import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import { centerVertical, colorTransparent, flexRow, fs10RegBlue38, px, sh24, sw1, sw20, sw4, sw56, sw8 } from "../../styles";
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
    height: sh24,
  };

  const tableColumns = withActions === true ? [...columns, { key: [], title: PRODUCT_LIST.LABEL_COLUMN_ACTIONS }] : columns;

  return (
    <View style={tableHeaderStyle}>
      {rowSelectionLabel !== undefined ? (
        <View style={{ width: sw56, ...flexRow }}>
          <CustomSpacer isHorizontal={true} space={sw20} />
          <Text style={fs10RegBlue38}>{rowSelectionLabel}</Text>
        </View>
      ) : null}
      {tableColumns.map((item: ITableColumn, index: number) => {
        const headerStyle: ViewStyle = { ...flexRow, ...centerVertical, ...px(sw8), ...item.viewStyle };
        const textStyle: TextStyle = { ...fs10RegBlue38, ...item.textStyle, ...item.titleStyle };

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
