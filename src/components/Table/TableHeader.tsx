import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import { centerVertical, flexRow, fs10RegBlue38, px, sh24, sw4, sw8 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

const { PRODUCT_LIST } = Language.PAGE;

export const TableHeader: FunctionComponent<TableHeaderProps> = ({
  columns,
  RenderCustomHeader,
  RowSelectionItem,
  withActions,
}: TableHeaderProps) => {
  const tableHeaderStyle: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    height: sh24,
  };

  const tableColumns = withActions === true ? [...columns, { key: [], title: PRODUCT_LIST.LABEL_COLUMN_ACTIONS }] : columns;

  return (
    <View style={tableHeaderStyle}>
      {RowSelectionItem !== undefined ? <RowSelectionItem /> : null}
      {tableColumns.map((item: ITableColumn, index: number) => {
        const headerStyle: ViewStyle = { ...flexRow, ...centerVertical, ...px(sw8), ...item.viewStyle };
        const textStyle: TextStyle = { ...fs10RegBlue38, ...item.textStyle, ...item.titleStyle };

        return (
          <Fragment key={index}>
            {RenderCustomHeader !== undefined && item.customHeader === true ? (
              <RenderCustomHeader item={item} />
            ) : (
              <TouchableWithoutFeedback onPress={item.onPressHeader}>
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
            )}
          </Fragment>
        );
      })}
    </View>
  );
};
