import React, { Fragment, FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { IcoMoon } from "../../icons";
import {
  border,
  borderBottomGray4,
  borderLeftGray4,
  centerHV,
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
  sw4,
  sw56,
  sw8,
} from "../../styles";
import { CheckBox } from "../CheckBox";
import { MenuPopup } from "../Touchables/Menu";
import { CustomSpacer } from "../Views/Spacer";

interface AdvanceTableRowProps {
  activeAccordion?: number[];
  columns: ITableColumn[];
  RenderAccordion?: (record: ITableData, index: number) => JSX.Element;
  index: number;
  item: ITableData;
  onRowSelect?: (record: ITableData[]) => void;
  RenderOptions?: (props: ITableOptions) => JSX.Element;
  rowSelection?: ITableData[];
}

export const AdvanceTableRow: FunctionComponent<AdvanceTableRowProps> = ({
  activeAccordion,
  columns,
  index,
  item,
  RenderAccordion,
  onRowSelect,
  RenderOptions,
  rowSelection,
}: AdvanceTableRowProps) => {
  const itemSelected = rowSelection !== undefined && rowSelection.indexOf(item) !== -1;
  const itemAccordionOpen = activeAccordion !== undefined ? activeAccordion.includes(index) : false;
  const itemBorder: ViewStyle = itemAccordionOpen ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {};

  const itemContainer: ViewStyle = {
    ...flexRow,
    borderRadius: sw12,
    ...itemBorder,
    backgroundColor: colorWhite._1,
    minHeight: sh80,
  };
  const rowContainer: ViewStyle = {
    ...flexRow,
  };

  const rowStyle: ViewStyle = {
    ...border(colorGray._4, sw1, sw12),
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
          <TouchableWithoutFeedback onPress={handleSelectRow}>
            <View style={{ height: sh80, ...centerHV }}>
              <CheckBox onPress={handleSelectRow} style={{ ...px(sw20), ...flexRowCC }} toggle={itemSelected} />
            </View>
          </TouchableWithoutFeedback>
        )}
        <View style={rowStyle}>
          <View style={itemContainer}>
            {columns.map((column: ITableColumn, columnIndex: number) => {
              const dataKey = column.key.map((key: ITableItemKey) => key);
              const customStyle = column.itemTextStyle !== undefined ? column.itemTextStyle(rowData) : {};
              const textStyle = { ...fs12BoldBlack2, ...fsUppercase, ...column.textStyle, ...customStyle };
              const handlePressColumnItem = () => {
                if (column.onPressItem !== undefined) {
                  column.onPressItem(rowData);
                }
              };

              const itemBorderLeft = columnIndex === 0 ? {} : borderLeftGray4;

              const itemAccordionIcon: ITableIcon = {
                color: colorBlack._2,
                name: itemAccordionOpen ? "collapse" : "expand",
                size: sh24,
              };

              const itemIcon: ITableIcon = {
                ...itemAccordionIcon,
                ...column.itemIcon,
              };

              const itemLabel: IColumnItem[] = dataKey.map((labelKey: ITableItemKey) => {
                const itemPrefix: ITableItemPrefix[] | undefined =
                  column.prefix !== undefined
                    ? column.prefix.filter((prefix: ITableItemPrefix) => prefix.targetKey === labelKey.key)
                    : undefined;

                const prefixData =
                  itemPrefix !== undefined && itemPrefix.length !== 0
                    ? { prefix: rowData.rawData[itemPrefix[0].key], prefixStyle: itemPrefix[0].textStyle }
                    : {};

                const itemData: IColumnItem = { label: rowData.rawData[labelKey.key], textStyle: labelKey.textStyle, ...prefixData };

                const isBoolean = typeof itemData.label === "boolean";

                if (isBoolean) {
                  itemData.label = "Yes";
                  if (!itemData.label) {
                    itemData.label = "No";
                  }
                }

                return itemData;
              });

              return (
                <TouchableWithoutFeedback key={columnIndex} onPress={handlePressColumnItem}>
                  <View style={{ ...flexRow, ...itemBorderLeft }}>
                    <View style={{ ...flexRow, ...centerVertical, ...px(sw8), ...column.viewStyle, ...column.itemStyle }}>
                      <View>
                        {itemLabel.map((label: IColumnItem, labelIndex: number) => {
                          return (
                            <View key={labelIndex} style={flexRow}>
                              {label.prefix !== undefined ? (
                                <Fragment>
                                  <Text style={{ ...textStyle, ...label.prefixStyle }}>{label.prefix}</Text>
                                  <CustomSpacer isHorizontal={true} space={sw4} />
                                </Fragment>
                              ) : null}
                              <Text style={{ ...textStyle, ...label.textStyle }}>{label.label}</Text>
                            </View>
                          );
                        })}
                      </View>
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
              <View style={{ ...flexRowCC, ...borderLeftGray4, width: sw56 }}>
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
          {RenderAccordion !== undefined && activeAccordion !== undefined ? (
            <Collapsible collapsed={!activeAccordion.includes(index)} duration={50}>
              {activeAccordion.includes(index) ? (
                <Fragment>
                  <View style={borderBottomGray4} />
                  <View>
                    <RenderAccordion {...item} index={index} />
                  </View>
                </Fragment>
              ) : null}
            </Collapsible>
          ) : null}
        </View>
      </View>
    </View>
  );
};
