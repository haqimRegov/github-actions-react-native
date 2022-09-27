import React, { Fragment, FunctionComponent, useState } from "react";
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { NunitoRegular } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  colorBlack,
  colorBlue,
  colorGray,
  colorRed,
  colorTransparent,
  colorWhite,
  disabledOpacity6,
  flexRow,
  flexRowCC,
  fs12BoldGray6,
  fs12RegRed2,
  fs16BoldGray6,
  sh16,
  sh4,
  sh46,
  sh48,
  sw1,
  sw136,
  sw16,
  sw2,
  sw24,
  sw264,
  sw32,
  sw336,
  sw4,
  sw64,
  sw8,
} from "../../styles";
import { formatAmount, isEmpty, parseAmount } from "../../utils";
import { CustomSpacer } from "../Views/Spacer";

export interface NumberPickerProps {
  containerStyle?: ViewStyle;
  disabled?: boolean;
  disableLeftIcon?: boolean;
  disableRightIcon?: boolean;
  error: string | undefined;
  innerContainerStyle?: ViewStyle;
  interval?: number;
  label?: string;
  labelStyle?: TextStyle;
  maxValue?: number;
  minValue?: number;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  onPressLabel?: () => void;
  placeholder?: string;
  setValue: (value: string) => void;
  spaceToBottom?: number;
  spaceToLabel?: number;
  spaceToTop?: number;
  style?: TextStyle;
  testID?: string;
  value: string;
}

export const NumberPicker: FunctionComponent<NumberPickerProps> = ({
  containerStyle,
  disabled,
  disableLeftIcon,
  disableRightIcon,
  error,
  innerContainerStyle,
  interval,
  label,
  labelStyle,
  maxValue,
  minValue,
  onBlur,
  onFocus,
  onLayout,
  onPressLabel,
  placeholder,
  setValue,
  spaceToBottom,
  spaceToLabel,
  spaceToTop,
  style,
  testID,
  value,
}: NumberPickerProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [textInputRef, setTextInputRef] = useState<TextInput | null>(null);
  const [hover, setHover] = useState<"increase" | "decrease" | undefined>(undefined);

  const errorBorderColor: ViewStyle = error !== undefined ? { borderColor: colorRed._2 } : {};
  const errorBGColor: ViewStyle = error !== undefined ? { backgroundColor: colorRed._4 } : {};

  const defaultInterval = interval !== undefined ? interval : 0.5;
  const defaultMinValue = minValue !== undefined ? minValue : 0;
  const valueIsEmpty = isEmpty(value) || value === "";
  const defaultValue = valueIsEmpty === false ? parseAmount(value) : defaultMinValue;

  const leftIconBg = disabled === true ? colorGray._1 : colorWhite._1;
  const rightIconBg = disabled === true ? colorGray._1 : colorWhite._1;
  const innerContainerBg = disabled === true ? colorGray._1 : colorWhite._1;

  const valueIsMinimum = error === undefined && parseAmount(value) === defaultMinValue;
  const valueIsMaximum = maxValue !== undefined && error === undefined && parseAmount(value) === maxValue;

  const leftIconDisabled = disableLeftIcon === true || disabled === true || valueIsMinimum === true || valueIsEmpty === true;
  const rightIconDisabled = disableRightIcon === true || disabled === true || valueIsMaximum === true;

  const disabledLeftIcon: ViewStyle = leftIconDisabled ? disabledOpacity6 : {};
  const disabledRightIcon: ViewStyle = rightIconDisabled ? disabledOpacity6 : {};
  const textDisabled: ViewStyle = disabled === true ? { opacity: disabledOpacity6.opacity } : {};

  const leftIconStyle: ViewStyle = {
    ...flexRowCC,
    backgroundColor: hover === "decrease" ? colorBlue._2 : leftIconBg,
    borderBottomLeftRadius: sw32,
    borderColor: isFocused ? colorBlue._1 : colorGray._3,
    borderTopLeftRadius: sw32,
    borderWidth: isFocused || error !== undefined ? sw2 : sw1,
    width: sw64,
    ...errorBorderColor,
    ...errorBGColor,
  };

  const rightIconStyle: ViewStyle = {
    ...flexRowCC,
    backgroundColor: hover === "increase" ? colorBlue._2 : rightIconBg,
    borderBottomRightRadius: sw32,
    borderColor: isFocused ? colorBlue._1 : colorGray._3,
    borderTopRightRadius: sw32,
    borderWidth: isFocused || error !== undefined ? sw2 : sw1,
    width: sw64,
    ...errorBorderColor,
    ...errorBGColor,
  };

  const innerContainer: ViewStyle = {
    ...flexRowCC,
    backgroundColor: innerContainerBg,
    borderBottomWidth: isFocused || error !== undefined ? sw2 : sw1,
    borderColor: isFocused ? colorBlue._1 : colorGray._3,
    borderTopWidth: isFocused || error !== undefined ? sw2 : sw1,
    width: sw136,
    ...errorBorderColor,
    ...errorBGColor,
    ...innerContainerStyle,
  };

  const defaultContainerStyle: ViewStyle = {
    paddingTop: spaceToTop !== undefined ? spaceToTop : 0,
    paddingBottom: spaceToBottom !== undefined ? spaceToBottom : 0,
  };

  const inputStyle: TextStyle = {
    color: isFocused ? colorBlue._1 : colorBlack._2,
    fontFamily: NunitoRegular,
    fontSize: sh16,
    height: isFocused || error !== undefined ? sh46 : sh48, // height is more than the input view size to adjust the keyboard avoiding view
    ...textDisabled,
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

  const handleInputFocus = () => {
    if (textInputRef !== null) {
      textInputRef.focus();
    }
  };

  const handleChangeText = (input: string) => {
    setValue(input);
  };

  const handleDecrease = () => {
    const checkError = error !== undefined;
    if (checkError === false && valueIsEmpty === false) {
      const newValue = defaultValue - defaultInterval;
      if (newValue >= defaultMinValue) {
        setValue(formatAmount(newValue));
      } else {
        setValue(formatAmount(defaultMinValue));
      }
    }
  };
  const handleIncrease = () => {
    const checkError = error !== undefined;
    if (checkError === false) {
      const increment = defaultValue + defaultInterval;
      const newValue = valueIsEmpty ? defaultMinValue : increment;
      if (maxValue !== undefined) {
        if (newValue <= maxValue) {
          setValue(formatAmount(newValue));
        } else {
          setValue(formatAmount(maxValue));
        }
      } else {
        setValue(formatAmount(newValue));
      }
    }
  };

  return (
    <View onLayout={onLayout} style={{ width: sw264, ...defaultContainerStyle, ...containerStyle }}>
      {label === undefined ? null : (
        <Text
          onPress={onPressLabel}
          style={{ ...fs12BoldGray6, paddingBottom: spaceToLabel || sh4, ...labelStyle }}
          suppressHighlighting={true}>
          {label}
        </Text>
      )}
      <View style={flexRow}>
        <Pressable
          disabled={disableLeftIcon || disabled || valueIsEmpty}
          onPress={handleDecrease}
          style={leftIconStyle}
          onPressIn={() => {
            if (leftIconDisabled === false) {
              setHover("decrease");
            }
          }}
          onPressOut={() => {
            if (leftIconDisabled === false) {
              setHover(undefined);
            }
          }}>
          <IcoMoon color={colorBlue._1} name="minus" size={sw24} suppressHighlighting={true} style={disabledLeftIcon} />
        </Pressable>
        <Pressable disabled={disabled} onPress={handleInputFocus} style={innerContainer}>
          <TextInput
            autoCorrect={false}
            editable={!disabled}
            maxLength={9}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={colorGray._4}
            ref={setTextInputRef}
            selectionColor={colorGray._6}
            spellCheck={false}
            style={inputStyle}
            testID={testID}
            textAlign="center"
            underlineColorAndroid={colorTransparent}
            value={value}
          />
          {value === "" && isFocused === false ? null : (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <Text style={{ ...fs16BoldGray6, width: sw16, ...textDisabled }}>%</Text>
            </Fragment>
          )}
        </Pressable>
        <Pressable
          disabled={disableRightIcon || disabled}
          onPress={handleIncrease}
          style={rightIconStyle}
          onPressIn={() => {
            if (rightIconDisabled === false) {
              setHover("increase");
            }
          }}
          onPressOut={() => {
            if (rightIconDisabled === false) {
              setHover(undefined);
            }
          }}>
          <IcoMoon color={colorBlue._1} name="plus" size={sw24} suppressHighlighting={true} style={disabledRightIcon} />
        </Pressable>
      </View>
      {error === undefined ? null : (
        <View>
          <CustomSpacer space={sh4} />
          <View style={flexRow}>
            <IcoMoon color={colorRed._2} name="error-filled" size={sw16} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={{ ...fs12RegRed2, lineHeight: sh16, width: sw336 }}>{error}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
