import React, { FunctionComponent, useState } from "react";
import { LayoutChangeEvent, LayoutRectangle, TextStyle, View, ViewStyle } from "react-native";
import { Dropdown, DropDownData, DropDownProps } from "react-native-material-dropdown";

import { Language } from "../../constants";
import {
  colorBlack,
  colorGray,
  colorTransparent,
  colorWhite,
  fs16BoldBlack2,
  noBorderBottom,
  sh130,
  sh16,
  sh56,
  sw1,
  sw16,
  sw20,
  sw360,
} from "../../styles";
import { CustomTextInput } from "../Input";
import { CustomSpacer } from "../Views";

const { DROPDOWN } = Language.PAGE;
export interface CustomDropdownProps {
  data: DropDownData[];
  handleChange: (text: string) => void;
  inputStyle?: TextStyle;
  label?: string;
  labelStyle?: TextStyle;
  placeholder?: string;
  propsExtractor?: (item: DropDownData, index: number) => Partial<DropDownProps>;
  spaceToTop?: number;
  value: string;
}

export const CustomDropdown: FunctionComponent<CustomDropdownProps> = ({
  data,
  handleChange,
  inputStyle,
  label,
  labelStyle,
  placeholder,
  propsExtractor,
  spaceToTop,
  value,
}: CustomDropdownProps) => {
  const [dropdownLayout, setDropdownLayout] = useState<LayoutRectangle | undefined>(undefined);
  const [focus, setFocus] = useState<boolean>(false);

  const handleDropdownLayout = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setDropdownLayout(layout);
  };

  const handleFocus = () => {
    if (focus === false) {
      setTimeout(() => {
        setFocus(true);
      }, 300);
    } else {
      setFocus(false);
    }
  };

  const dropdownStyle: ViewStyle = {
    borderBottomLeftRadius: sw20,
    borderBottomRightRadius: sw20,
    borderColor: colorGray._7,
    borderWidth: sw1,
    maxHeight: sh130,
    shadowOpacity: 0,
    width: sw360,
  };

  const inputBorder: ViewStyle = focus ? { ...noBorderBottom, borderBottomColor: colorTransparent } : {};
  const dropdownInputStyle: ViewStyle = { backgroundColor: colorWhite._1, width: sw360, ...inputBorder };

  const dropdownOffsetY = dropdownLayout !== undefined ? dropdownLayout.height + sh16 : sh56;

  return (
    <View style={{ width: sw360 }}>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      <Dropdown
        animationDuration={0}
        data={data}
        dropdownOffset={{ left: sw16, top: dropdownOffsetY }}
        dropdownPosition={0}
        itemTextStyle={fs16BoldBlack2}
        onBlur={handleFocus}
        onChangeText={handleChange}
        onFocus={handleFocus}
        pickerStyle={dropdownStyle}
        propsExtractor={propsExtractor}
        renderBase={() => {
          return (
            <CustomTextInput
              onLayout={handleDropdownLayout}
              editable={false}
              rightIcon="caret-down"
              label={label}
              labelStyle={labelStyle}
              placeholder={placeholder || DROPDOWN.PLACEHOLDER}
              placeholderTextColor={colorBlack._2}
              pointerEvents="none"
              style={inputStyle}
              value={value}
              viewStyle={dropdownInputStyle}
            />
          );
        }}
        rippleOpacity={0}
        useNativeDriver={true}
      />
    </View>
  );
};
