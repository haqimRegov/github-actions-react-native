import React, { Fragment, FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  border,
  borderLeftGray2,
  centerVertical,
  colorBlack,
  colorGray,
  colorWhite,
  flexRow,
  flexRowCC,
  fs12BoldBlack2,
  fsUppercase,
  px,
  sh24,
  sh8,
  sh80,
  sw1,
  sw12,
  sw16,
  sw20,
  sw56,
  sw8,
} from "../../styles";
import { CheckBox } from "../Touchables/CheckBox";
import { MenuPopup } from "../Touchables/Menu";
import { CustomSpacer } from "../Views/Spacer";

interface TableRowProps {
  activeAccordion?: number[];
  columns: ITableColumn[];
  index: number;
  item: ITableData;
  onRowSelect?: (record: ITableData[]) => void;
  RenderOptions?: (props: ITableOptions) => JSX.Element;
  rowSelection?: ITableData[];
}

export const TableRow: FunctionComponent<TableRowProps> = ({
  activeAccordion,
  columns,
  index,
  item,
  onRowSelect,
  RenderOptions,
  rowSelection,
}: TableRowProps) => {
  const itemSelected = rowSelection !== undefined && rowSelection.indexOf(item) !== -1;
  const itemAccordionOpen = activeAccordion !== undefined ? activeAccordion.includes(index) : false;
  const itemBorder: ViewStyle = itemAccordionOpen ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {};
  const itemContainer: ViewStyle = {
    ...flexRow,
    ...border(colorGray._2, sw1, sw12),
    ...itemBorder,
    backgroundColor: colorWhite._1,
    height: sh80,
  };
  const rowContainer: ViewStyle = {
    ...flexRow,
  };

  const handleSelectRow = () => {
    if (onRowSelect !== undefined) {
      onRowSelect([item]);
    }
  };

  const rowData: IColumnItemAccordion = {
    index: index,
    rawData: item,
  };

  return (
    <View>
      {index === 0 ? null : <CustomSpacer space={sh8} />}
      <View style={rowContainer}>
        {rowSelection === undefined ? null : (
          <CheckBox onPress={handleSelectRow} style={{ ...px(sw20), ...flexRowCC }} toggle={itemSelected} />
        )}
        <View style={itemContainer}>
          {columns.map((column: ITableColumn, columnIndex: number) => {
            const columnItem = item[column.key];
            const key = Object.keys(item)[Object.values(item).indexOf(columnItem)];
            const columnData = { ...rowData, key: key, value: columnItem };
            const customStyle = column.itemTextStyle !== undefined ? column.itemTextStyle(columnData) : {};
            const textStyle = { ...fs12BoldBlack2, ...fsUppercase, ...column.textStyle, ...customStyle };

            const handlePressColumnItem = () => {
              if (column.onPressItem !== undefined) {
                column.onPressItem(columnData);
              }
            };

            const itemBorderLeft = columnIndex === 0 ? {} : borderLeftGray2;

            const itemAccordionIcon: ITableIcon = {
              color: colorBlack._2,
              name: itemAccordionOpen ? "collapse" : "expand",
              size: sh24,
            };

            const itemIcon: ITableIcon = {
              ...itemAccordionIcon,
              ...column.itemIcon,
            };

            return (
              <TouchableWithoutFeedback key={columnIndex} onPress={handlePressColumnItem}>
                <View style={{ ...flexRow, ...itemBorderLeft }}>
                  <View style={{ ...flexRow, ...centerVertical, ...px(sw8), ...column.viewStyle, ...column.itemStyle }}>
                    <Text style={textStyle}>{item[column.key]}</Text>
                    {column.itemIcon !== undefined || column.withAccordion === true ? (
                      <Fragment>
                        <CustomSpacer isHorizontal={true} space={sw16} />
                        <IcoMoon {...itemIcon} />
                      </Fragment>
                    ) : null}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
          {RenderOptions !== undefined ? (
            <View style={{ ...flexRowCC, ...borderLeftGray2, width: sw56 }}>
              <MenuPopup
                RenderButton={({ show }) => {
                  return (
                    <TouchableWithoutFeedback onPress={show}>
                      <IcoMoon name="action-menu" size={sh24} />
                    </TouchableWithoutFeedback>
                  );
                }}
                RenderContent={({ hide }) => {
                  return <RenderOptions data={rowData} onClose={hide} />;
                }}
              />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};
