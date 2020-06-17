import React, { Fragment, useState } from "react";
import { Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

import {
  centerVertical,
  colorBlack,
  colorGray,
  colorWhite,
  flexChild,
  flexRow,
  fs16SemiBoldBlack2,
  sh4,
  sh40,
  sw1,
  sw12,
  sw20,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface ITextInputProps extends TextInputProps {
  label?: string;
  labelStyle?: TextStyle;
  onPressLabel?: () => void;
  setRef?: (ref: TextInput | null) => void;
  spaceToBottom?: number;
  spaceToTop?: number;
  viewStyle?: ViewStyle;
}

export const CustomTextInput = ({
  label,
  labelStyle,
  onPressLabel,
  setRef,
  spaceToBottom,
  spaceToTop,
  viewStyle,
  ...rest
}: ITextInputProps) => {
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  // TODO proper color for border color on focus
  const borderColor: ViewStyle = inputFocus ? { borderColor: colorBlack._2 } : { borderColor: colorBlack._2 };
  const defaultLabelStyle: TextStyle = { ...fs16SemiBoldBlack2, ...labelStyle };
  const textInputStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...borderColor,
    borderWidth: sw1,
    borderRadius: sw20,
    height: sh40,
    ...viewStyle,
  };
  const textStyle: TextStyle = { ...flexChild, ...fs16SemiBoldBlack2, height: sh40 };

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
          <CustomSpacer space={sh4} />
        </Fragment>
      )}
      <View style={textInputStyle}>
        <TextInput
          ref={setRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={textStyle}
          placeholder={rest.placeholder}
          placeholderTextColor={colorGray._1}
          underlineColorAndroid={colorWhite._1}
          {...rest}
        />
      </View>
      {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : null}
    </Fragment>
  );
};
