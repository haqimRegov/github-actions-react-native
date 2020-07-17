import React, { Fragment, useState } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlack,
  colorBlue,
  colorGray,
  colorTransparent,
  colorWhite,
  flexRow,
  fs12BoldBlack2,
  fs12RegBlue1,
  fsUppercase,
  sh120,
  sh55,
  sw24,
  sw32,
  sw36,
  sw4,
  sw8,
} from "../../styles";
import { CheckBox } from "../Touchables/CheckBox";
import { CustomSpacer } from "../Views/Spacer";

export const CustomTable = ({
  activeAccordion,
  columns,
  data,
  onChangeAccordion,
  onRowSelect,
  RenderAccordion,
  RenderOptions,
  rowSelection,
}: CustomTableProps) => {
  const [allRowsSelected, setAllRowsSelected] = useState(false);
  const activeSection = activeAccordion !== undefined ? activeAccordion : [];

  const handleAccordionChange = (indexes: number[]) => {
    if (onChangeAccordion !== undefined) {
      onChangeAccordion(indexes);
    }
  };

  const tableAccordion = (record: ITableData) => {
    return RenderAccordion !== undefined ? <RenderAccordion {...record} /> : <View />;
  };

  const TableHeader = () => {
    const tableHeaderStyle: ViewStyle = {
      ...flexRow,
      ...centerVertical,
      backgroundColor: colorBlack._2,
      height: sh55,
      borderTopLeftRadius: sw8,
      borderTopRightRadius: sw8,
    };

    return (
      <View style={tableHeaderStyle}>
        {columns.map((item: ITableColumn, index: number) => {
          const handleCompare = (a: ITableData, b: ITableData) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          };

          const handleSelectAll = () => {
            if (onRowSelect !== undefined) {
              const updatedRows = rowSelection !== data ? data : [];
              onRowSelect(updatedRows);
            }
          };

          if (rowSelection !== undefined && item.type === "checkbox") {
            const rowSelectionClone = [...rowSelection];
            const dataClone = [...data];
            const toggleAll = JSON.stringify(rowSelectionClone.sort(handleCompare)) === JSON.stringify(dataClone.sort(handleCompare));

            setAllRowsSelected(toggleAll);
          }

          const headerStyle: ViewStyle = { ...flexRow, ...centerVertical, ...item.viewStyle };
          const textStyle = { ...fs12RegBlue1, ...item.textStyle };

          return (
            <TouchableWithoutFeedback key={index} onPress={item.onPressHeader}>
              <View style={headerStyle}>
                {item.type === "checkbox" ? (
                  <Fragment>
                    <CustomSpacer isHorizontal={true} space={sw36} />
                    <CheckBox
                      label={item.title}
                      labelStyle={textStyle}
                      onPress={handleSelectAll}
                      spaceToLabel={sw24}
                      toggle={allRowsSelected}
                    />
                  </Fragment>
                ) : (
                  <Text style={textStyle}>{item.title}</Text>
                )}
                {item.icon === undefined ? null : <IcoMoon {...item.icon} />}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  };

  const tableItem = (item: ITableData, index: number) => {
    const itemSelected = rowSelection !== undefined && rowSelection.indexOf(item) !== -1;
    const itemSelectedStyle: ViewStyle = itemSelected
      ? { backgroundColor: colorGray._1, borderLeftWidth: sw4, borderLeftColor: colorBlue._1 }
      : {};
    const space = itemSelected ? sw32 : sw36;
    const itemColor: ViewStyle = index % 2 === 0 ? { backgroundColor: colorWhite._1 } : { backgroundColor: colorGray._2 };
    const itemContainer: ViewStyle = { ...flexRow, ...centerVertical, ...itemColor, ...itemSelectedStyle, height: sh120 };

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
      <TouchableWithoutFeedback onPress={handleSelectRow}>
        <View key={index} style={itemContainer}>
          {columns.map((column: ITableColumn, columnIndex: number) => {
            let toggle = false;
            const columnItem = item[column.key];
            const key = Object.keys(item)[Object.values(item).indexOf(columnItem)];
            const columnData = { key: key, value: columnItem, rawData: item, index: index };
            const customStyle = column.itemTextStyle !== undefined ? column.itemTextStyle(columnData) : {};
            const textStyle = { ...fs12BoldBlack2, ...fsUppercase, ...column.textStyle, ...customStyle };

            if (rowSelection !== undefined && column.type === "checkbox") {
              toggle = rowSelection.includes(item);
            }
            const handlePressColumnItem = () => {
              if (column.onPressItem !== undefined) {
                column.onPressItem(columnData);
              }
            };

            return (
              <TouchableWithoutFeedback key={columnIndex} onPress={handlePressColumnItem}>
                <View style={{ ...flexRow, ...column.viewStyle, ...column.itemStyle }}>
                  {column.type === "checkbox" ? (
                    <Fragment>
                      <CustomSpacer isHorizontal={true} space={space} />
                      <CheckBox
                        label={item[column.key]}
                        labelStyle={textStyle}
                        onPress={handleSelectRow}
                        spaceToLabel={sw24}
                        toggle={toggle}
                      />
                    </Fragment>
                  ) : (
                    <Text style={textStyle}>{item[column.key]}</Text>
                  )}
                </View>
              </TouchableWithoutFeedback>
            );
          })}

          {RenderOptions !== undefined ? <RenderOptions data={rowData} onClose={() => {}} /> : null}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View>
      <TableHeader />
      <Accordion
        activeSections={activeSection}
        duration={400}
        expandMultiple={true}
        onChange={handleAccordionChange}
        renderContent={tableAccordion}
        renderHeader={tableItem}
        sections={data}
        touchableProps={{ underlayColor: colorTransparent }}
      />
    </View>
  );
};
