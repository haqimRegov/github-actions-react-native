import React, { Fragment, FunctionComponent } from "react";
import { FlatList, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  border,
  borderBottomGray7,
  centerVertical,
  colorBlack,
  colorGray,
  colorTransparent,
  colorWhite,
  disabledOpacity,
  flexRow,
  fs12BoldBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  noBorderBottom,
  px,
  py,
  sh200,
  sh24,
  sh38,
  sh40,
  sh8,
  sw1,
  sw16,
  sw20,
  sw24,
  sw300,
  sw358,
  sw360,
} from "../../styles";
import { CollapsibleDropdown } from "../Collapsible";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

const { DROPDOWN } = Language.PAGE;
export interface AdvancedDropdownProps {
  disabled?: boolean;
  handleChange: (text: string) => void;
  items: TypeLabelValue[];
  label?: string;
  labelStyle?: TextStyle;
  placeholder?: string;
  placeholderStyle?: TextStyle;
  spaceToLabel?: number;
  spaceToTop?: number;
  style?: ViewStyle;
  value: string;
}

export const AdvancedDropdown: FunctionComponent<AdvancedDropdownProps> = ({
  disabled,
  handleChange,
  items,
  label,
  labelStyle,
  placeholder,
  placeholderStyle,
  spaceToLabel,
  spaceToTop,
  style,
  value,
}: AdvancedDropdownProps) => {
  const baseDropdownStyle: ViewStyle = {
    ...border(colorGray._7, sw1, sw20),
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
  };

  const dummyStyle: ViewStyle = {
    borderWidth: 0,
    height: sh38,
    width: sw358,
  };

  const defaultLabelStyle: TextStyle = { ...fs16BoldBlack2, lineHeight: sh24, width: sw300, ...labelStyle };
  const defaultPlaceholderStyle: TextStyle = { ...fs16RegBlack2, lineHeight: sh24, ...placeholderStyle };
  const valueStyle = value === "" || value === undefined ? defaultPlaceholderStyle : defaultLabelStyle;

  const placeholderLabel = placeholder || DROPDOWN.PLACEHOLDER;

  const defaultLabelSpace = spaceToLabel === undefined ? 0 : spaceToLabel;
  const labelExtractor = items.map((item) => item.label);

  const disabledStyle = disabled === true ? disabledOpacity : {};

  return (
    <View style={disabledStyle}>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label === undefined ? null : (
        <Fragment>
          <Text style={{ ...fs12BoldBlack2, ...labelStyle }}>{label}</Text>
          <CustomSpacer space={defaultLabelSpace} />
        </Fragment>
      )}
      <View onStartShouldSetResponderCapture={() => disabled === true} style={flexRow}>
        <CollapsibleDropdown
          baseDropdownStyle={baseDropdownStyle}
          dummyBaseStyle={dummyStyle}
          RenderBase={({ collapse, dummyBaseStyle }) => {
            const inputBorder: ViewStyle = collapse === false ? { ...noBorderBottom, borderBottomColor: colorTransparent } : {};

            const defaultInputStyle: ViewStyle = {
              ...border(colorGray._7, sw1, sw20),
              ...centerVertical,
              ...flexRow,
              ...px(sw16),
              backgroundColor: colorWhite._1,
              height: sh40,
              width: sw360,
              ...inputBorder,
              ...dummyBaseStyle,
            };
            return (
              <View style={defaultInputStyle}>
                <Text numberOfLines={1} style={valueStyle}>
                  {value || placeholderLabel}
                </Text>
                <CustomFlexSpacer />
                <IcoMoon color={colorBlack._2} name="caret-down" size={sw20} />
              </View>
            );
          }}
          RenderDropdown={({ handleClose }) => {
            const dropdownStyle: ViewStyle = {
              backgroundColor: colorWhite._1,
              borderBottomLeftRadius: sw24,
              borderBottomRightRadius: sw24,
              ...style,
            };

            return (
              <View>
                <View style={borderBottomGray7} />
                <View style={dropdownStyle}>
                  <FlatList
                    data={labelExtractor}
                    style={{ ...px(sw16), maxHeight: sh200 }}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
                    keyExtractor={(item: string, index: number) => `${item}-${index}`}
                    ListHeaderComponent={() => <CustomSpacer space={sh8} />}
                    ListFooterComponent={() => <CustomSpacer space={sh8} />}
                    renderItem={({ index }) => {
                      const itemContainer: ViewStyle = { ...centerVertical, ...flexRow, ...py(sh8) };
                      const itemStyle: TextStyle = { ...fs16BoldBlack2, letterSpacing: -0.44 };

                      const itemExtractor = items[index];

                      const handleSelect = () => {
                        handleClose();
                        setTimeout(() => {
                          if (itemExtractor !== undefined) {
                            handleChange(itemExtractor.value);
                          }
                        }, 250);
                      };

                      return (
                        <TouchableWithoutFeedback key={index} onPress={handleSelect}>
                          <View style={itemContainer}>
                            <Text numberOfLines={1} style={itemStyle}>
                              {itemExtractor.label}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
