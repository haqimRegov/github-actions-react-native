import React, { Fragment, useState } from "react";
import { Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

import {
  centerVertical,
  colorBlack,
  colorGray,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs16SemiBoldBlack2,
  sh4,
  sh40,
  sw1,
  sw12,
  sw20,
  sw350,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface ITextInputProps extends TextInputProps {
  label?: string;
  labelStyle?: TextStyle;
  onPressLabel?: () => void;
  setRef?: (ref: TextInput | null) => void;
  spaceToBottom?: number;
  spaceToLabel?: number;
  spaceToTop?: number;
  style?: TextStyle;
  viewStyle?: ViewStyle;
}

export const CustomTextInput = ({
  label,
  labelStyle,
  onPressLabel,
  setRef,
  spaceToBottom,
  spaceToLabel,
  spaceToTop,
  style,
  viewStyle,
  ...rest
}: ITextInputProps) => {
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  // TODO proper color for border color on focus
  const borderColor: ViewStyle = inputFocus ? { borderColor: colorBlack._2 } : { borderColor: colorBlack._2 };
  const defaultLabelStyle: TextStyle = { ...fs16SemiBoldBlack2, ...labelStyle };
  const defaultLabelSpace = spaceToLabel === undefined ? sh4 : spaceToLabel;
  const defaultInputStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    ...centerVertical,
    ...flexRow,
    ...borderColor,
    borderWidth: sw1,
    borderRadius: sw20,
    height: sh40,
    width: sw350,
    ...viewStyle,
  };
  const textStyle: TextStyle = { ...fs16SemiBoldBlack2, ...flexChild, height: sh40, ...style };

  const handleFocus = () => {
    setInputFocus(true);
  };

  const handleBlur = () => {
    setInputFocus(false);
  };

  return (
    <Fragment>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label === undefined ? null : (
        <Fragment>
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw12} />
            <Text onPress={onPressLabel} style={defaultLabelStyle}>
              {label}
            </Text>
          </View>
          <CustomSpacer space={defaultLabelSpace} />
        </Fragment>
      )}
      <View style={defaultInputStyle}>
        <CustomSpacer isHorizontal={true} space={sw12} />
        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={rest.placeholder}
          placeholderTextColor={colorGray._1}
          ref={setRef}
          selectionColor={colorBlack._2}
          style={textStyle}
          underlineColorAndroid={colorTransparent}
          {...rest}
        />
      </View>
      {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : null}
    </Fragment>
  );
};
