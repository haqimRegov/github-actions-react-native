import React, { Fragment, FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { IcoMoon } from "../../icons";
import {
  border,
  borderBottomGray2,
  borderLeftBlue2,
  centerHorizontal,
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  colorWhite,
  disabledOpacity5,
  flexRow,
  flexRowCC,
  fs12BoldBlue1,
  fsCapitalize,
  px,
  py,
  sh32,
  sh4,
  sh8,
  sh80,
  sw1,
  sw12,
  sw16,
  sw19,
  sw26,
  sw4,
  sw56,
  sw8,
} from "../../styles";
import { CheckBox } from "../CheckBox";
import { MenuPopup } from "../Touchables/Menu";
import { TouchableWrapper } from "../Touchables/TouchableWrapper";
import { CustomSpacer } from "../Views/Spacer";

export const AdvanceTableRow: FunctionComponent<AdvanceTableRowProps> = ({
  activeAccordion,
  columns,
  disabled,
  handleRowNavigation,
  index,
  item,
  lastIndex,
  onRowSelect,
  RenderAccordion,
  RenderCustomItem,
  RenderOptions,
  rowContainerStyle,
  rowSelection,
  rowSelectionKey,
}: AdvanceTableRowProps) => {
  const disabledCheckbox = disabled === true ? disabledOpacity5 : {};
  const itemSelected =
    rowSelection !== undefined && rowSelectionKey !== undefined
      ? rowSelection.findIndex((row) => row[rowSelectionKey] === item[rowSelectionKey]) > -1
      : false;
  const itemAccordionOpen = activeAccordion !== undefined ? activeAccordion.includes(index) : false;
  const itemBorder: ViewStyle = itemAccordionOpen ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {};

  const itemContainer: ViewStyle = {
    ...flexRow,
    borderRadius: sw12,
    ...itemBorder,
    backgroundColor: colorWhite._1,
    minHeight: sh80,
    ...rowContainerStyle,
  };

  const handleSelectRow = () => {
    if (onRowSelect !== undefined && disabled === false) {
      onRowSelect(item);
    }
  };

  const handleRowSelection = () => {
    if (handleRowNavigation !== undefined) {
      handleRowNavigation(item);
    }
  };

  const rowData: ITableRowData = {
    index: index,
    rawData: item,
  };

  return (
    <TouchableWithoutFeedback onPress={handleRowSelection}>
      <View>
        {index === 0 ? null : <CustomSpacer space={sh8} />}
        <View style={flexRow}>
          {rowSelection === undefined ? null : (
            <TouchableWithoutFeedback onPress={handleSelectRow}>
              <View style={{ height: sh80, ...centerHV }}>
                <CheckBox
                  disabled={disabled}
                  onPress={handleSelectRow}
                  style={{ ...px(sw19), ...flexRowCC, ...disabledCheckbox }}
                  toggle={itemSelected}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          <View style={border(colorBlue._2, sw1, sw12)}>
            <View style={itemContainer}>
              {columns.map((column: ITableColumn, columnIndex: number) => {
                const dataKey = column.key.map((key: ITableItemKey) => key);
                const customStyle = column.itemTextStyle !== undefined ? column.itemTextStyle(rowData) : {};
                const textStyle = { ...fs12BoldBlue1, ...fsCapitalize, ...column.textStyle, ...customStyle };
                const handlePressColumnItem = () => {
                  if (column.onPressItem === undefined) {
                    return handleRowSelection();
                  }
                  return column.onPressItem(rowData);
                };

                const itemBorderLeft = columnIndex === 0 ? {} : borderLeftBlue2;

                const itemAccordionIcon: ITableIcon = {
                  color: colorGray._6,
                  name: itemAccordionOpen ? "collapse" : "expand",
                  size: sw26,
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
                      ? {
                          prefix:
                            itemPrefix[0].value !== undefined
                              ? `${rowData.rawData[itemPrefix[0].value]}: ${rowData.rawData[itemPrefix[0].key]}`
                              : rowData.rawData[itemPrefix[0].key],
                          prefixStyle: itemPrefix[0].textStyle,
                        }
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
                const centerVert = column.customItem === undefined ? { ...centerVertical } : null;

                const itemStyle: ViewStyle = {
                  ...flexRow,
                  ...centerVert,
                  ...itemBorderLeft,
                  ...px(sw8),
                  ...column.viewStyle,
                  ...column.itemStyle,
                };

                return (
                  <TouchableWrapper isTouchable={column.onPressItem !== undefined} key={columnIndex} onPress={handlePressColumnItem}>
                    <View style={flexRow}>
                      <View style={itemStyle}>
                        {column.customItem === undefined || RenderCustomItem === undefined ? (
                          <Fragment>
                            <View>
                              {itemLabel.map((label: IColumnItem, labelIndex: number) => {
                                const defaultLabel = label.label !== null ? label.label : "-";
                                const defaultContentStyle: ViewStyle =
                                  label.label === null ? { ...flexRow, ...centerHorizontal } : { ...flexRow };
                                return (
                                  <Fragment key={labelIndex}>
                                    {label.label !== undefined ? (
                                      <Fragment>
                                        <View key={labelIndex} style={defaultContentStyle}>
                                          {label.prefix !== undefined ? (
                                            <Fragment>
                                              <Text style={{ ...textStyle, ...label.prefixStyle }}>{label.prefix}</Text>
                                              <CustomSpacer isHorizontal={true} space={sw4} />
                                            </Fragment>
                                          ) : null}
                                          <Text numberOfLines={2} style={{ ...textStyle, ...label.textStyle }}>
                                            {defaultLabel}
                                          </Text>
                                        </View>
                                      </Fragment>
                                    ) : null}
                                  </Fragment>
                                );
                              })}
                            </View>
                            {column.itemIcon !== undefined || column.withAccordion === true ? (
                              <Fragment>
                                {itemLabel.length > 0 ? <CustomSpacer isHorizontal={true} space={sw16} /> : null}
                                <IcoMoon {...itemIcon} suppressHighlighting={true} />
                              </Fragment>
                            ) : null}
                          </Fragment>
                        ) : (
                          <RenderCustomItem accordionIcon={itemIcon} item={rowData} keyName={dataKey[0]} lastIndex={lastIndex} />
                        )}
                      </View>
                    </View>
                  </TouchableWrapper>
                );
              })}
              {RenderOptions !== undefined ? (
                <TouchableWithoutFeedback>
                  <View style={{ ...flexRowCC, ...borderLeftBlue2, width: sw56 }}>
                    <MenuPopup
                      RenderButton={({ show }) => {
                        return (
                          <TouchableWithoutFeedback onPress={show}>
                            <View style={{ ...px(sw4), ...py(sh4) }}>
                              <IcoMoon color={colorGray._6} name="action-menu" size={sh32} />
                            </View>
                          </TouchableWithoutFeedback>
                        );
                      }}
                      RenderContent={({ hide }) => {
                        return <RenderOptions data={rowData} onClose={hide} />;
                      }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              ) : null}
            </View>
            {RenderAccordion !== undefined && activeAccordion !== undefined ? (
              <Collapsible collapsed={!activeAccordion.includes(index)} duration={50}>
                {activeAccordion.includes(index) ? (
                  <Fragment>
                    <View style={borderBottomGray2} />
                    <View>
                      <RenderAccordion {...item} index={index} />
                    </View>
                  </Fragment>
                ) : null}
              </Collapsible>
            ) : null}
          </View>
          <CustomSpacer isHorizontal={true} space={sw16} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
