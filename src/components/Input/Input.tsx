import React, { Fragment, FunctionComponent, RefObject, useState } from "react";
import { NativeSyntheticEvent, Text, TextInput, TextInputFocusEventData, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

import { NunitoBold, NunitoRegular } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  border,
  centerVertical,
  colorBlack,
  colorBlue,
  colorGray,
  colorRed,
  colorTransparent,
  colorWhite,
  customShadow,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs12RegRed2,
  fs16RegBlack2,
  px,
  sh16,
  sh4,
  sh48,
  sh50,
  sw1,
  sw15,
  sw16,
  sw2,
  sw24,
  sw32,
  sw336,
  sw360,
  sw4,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface CustomTextInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  disabled?: boolean;
  error?: string;
  inputPrefix?: string;
  label?: string;
  labelStyle?: TextStyle;
  leftIcon?: IIcon;
  noBorder?: boolean;
  onPressLabel?: () => void;
  prefixStyle?: TextStyle;
  rightIcon?: IIcon;
  setRef?: string | ((instance: TextInput | null) => void) | RefObject<TextInput> | null | undefined;
  spaceToBottom?: number;
  spaceToLabel?: number;
  spaceToTop?: number;
  style?: TextStyle;
  testID?: string;
  viewStyle?: ViewStyle;
}

export const CustomTextInput: FunctionComponent<CustomTextInputProps> = ({
  containerStyle,
  disabled,
  error,
  inputPrefix,
  label,
  labelStyle,
  leftIcon,
  noBorder,
  onBlur,
  onFocus,
  onLayout,
  onPressLabel,
  placeholder,
  prefixStyle,
  rightIcon,
  setRef,
  spaceToBottom,
  spaceToTop,
  style,
  testID,
  value,
  viewStyle,
  ...textInputProps
}: CustomTextInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const borderWidth = noBorder === true ? { borderWidth: 0 } : {};
  const disabledStyle = disabled === true ? { backgroundColor: colorGray._5, opacity: 0.6 } : {};
  const errorStyle: ViewStyle = error !== undefined ? { backgroundColor: colorRed._3_08, borderWidth: sw2, borderColor: colorRed._2 } : {};
  const focusedShadow = isFocused ? customShadow(colorBlue._2, 0, 0, 0.02, sw4) : {};

  const defaultContainerStyle: ViewStyle = {
    paddingTop: spaceToTop !== undefined ? spaceToTop : 0,
    paddingBottom: spaceToBottom !== undefined ? spaceToBottom : 0,
  };

  const defaultInputStyle: ViewStyle = {
    ...border(isFocused ? colorBlue._2 : colorWhite._3, isFocused ? sw2 : sw1, sw32),
    ...centerVertical,
    ...flexRow,
    ...px(isFocused === false && error === undefined ? sw16 : sw15),
    backgroundColor: colorWhite._1,
    height: sh48,
    width: sw360,
    ...borderWidth,
    ...focusedShadow,
    ...errorStyle,
    ...disabledStyle,
    ...viewStyle,
  };

  const inputStyle = {
    ...flexChild,
    fontFamily: placeholder !== undefined && !value ? NunitoRegular : NunitoBold,
    fontSize: sh16,
    height: isFocused ? sh50 : sh48, // height is more than the input view size to adjust the keyboard avoiding view
    ...style,
  };

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onBlur) {
      onBlur(event);
    }
    setIsFocused(false);
  };

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onFocus) {
      onFocus(event);
    }
    setIsFocused(true);
  };

  return (
    <View onLayout={onLayout} style={{ width: sw360, ...defaultContainerStyle, ...containerStyle }}>
      {label === undefined ? null : (
        <Text onPress={onPressLabel} style={{ ...fs12BoldBlack2, ...labelStyle }}>
          {label}
        </Text>
      )}
      <View style={defaultInputStyle}>
        {leftIcon === undefined ? null : (
          <Fragment>
            <IcoMoon
              color={leftIcon.color || colorBlue._2}
              name={leftIcon.name}
              onPress={disabled === true ? undefined : leftIcon.onPress}
              size={leftIcon.size || sw24}
            />
            <CustomSpacer isHorizontal={true} space={sw16} />
          </Fragment>
        )}
        {inputPrefix !== undefined ? (
          <Fragment>
            <Text style={{ ...fs16RegBlack2, ...prefixStyle }}>{inputPrefix}</Text>
            <CustomSpacer isHorizontal={true} space={sw8} />
          </Fragment>
        ) : null}
        <TextInput
          autoCorrect={false}
          editable={!disabled}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          placeholderTextColor={colorGray._9}
          ref={setRef}
          selectionColor={colorBlack._2}
          spellCheck={false}
          style={inputStyle}
          testID={testID}
          underlineColorAndroid={colorTransparent}
          value={value}
          {...textInputProps}
        />
        {rightIcon === undefined ? null : (
          <Fragment>
            <CustomSpacer isHorizontal={true} space={sw16} />
            <IcoMoon
              color={rightIcon.color || colorBlue._2}
              name={rightIcon.name}
              onPress={disabled === true ? undefined : rightIcon.onPress}
              size={rightIcon.size || sw24}
            />
          </Fragment>
        )}
      </View>
      {error === undefined ? null : (
        <View>
          <CustomSpacer space={sh4} />
          <View style={flexRow}>
            <IcoMoon color={colorRed._2} name="error-filled" size={sw16} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={{ ...fs12RegRed2, width: sw336 }}>{error}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
