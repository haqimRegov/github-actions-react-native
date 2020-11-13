import React, { Fragment } from "react";
import { Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  border,
  centerVertical,
  colorBlack,
  colorGray,
  colorRed,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs12SemiBoldRed2,
  fs16BoldBlack2,
  fs16RegBlack2,
  fsNoLineHeight,
  px,
  sh16,
  sh38,
  sh40,
  sh8,
  sw1,
  sw16,
  sw20,
  sw304,
  sw360,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface ITextInputProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  inputPrefix?: string;
  label?: string;
  labelStyle?: TextStyle;
  noBorder?: boolean;
  onPressLabel?: () => void;
  prefixStyle?: TextStyle;
  rightIcon?: string;
  rightIconPress?: () => void;
  rightIconSize?: number;
  setRef?: (ref: TextInput | null) => void;
  spaceToBottom?: number;
  spaceToLabel?: number;
  spaceToTop?: number;
  style?: TextStyle;
  viewStyle?: ViewStyle;
}

export const CustomTextInput = ({
  disabled,
  editable,
  error,
  inputPrefix,
  label,
  labelStyle,
  noBorder,
  onLayout,
  onPressLabel,
  prefixStyle,
  rightIcon,
  rightIconPress,
  rightIconSize,
  setRef,
  spaceToBottom,
  spaceToLabel,
  spaceToTop,
  style,
  value,
  viewStyle,
  ...rest
}: ITextInputProps) => {
  const borderWidth = noBorder === true ? 0 : sw1;
  const borderColor = error !== undefined ? colorRed._2 : colorGray._7;
  const defaultInputStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw16),
    ...border(borderColor, borderWidth, sw20),
    backgroundColor: colorWhite._1,
    height: sh40,
    width: sw360,
    ...viewStyle,
  };
  const defaultLabelSpace = spaceToLabel === undefined ? 0 : spaceToLabel;

  const disabledStyle: TextStyle = disabled === true ? { opacity: 0.5 } : {};
  const disabledInput = disabled === true ? !disabled : editable;

  return (
    <View onLayout={onLayout}>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label === undefined ? null : (
        <Fragment>
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw16} />
            <Text onPress={onPressLabel} style={{ ...fs12BoldBlack2, ...labelStyle }}>
              {label}
            </Text>
          </View>
          <CustomSpacer space={defaultLabelSpace} />
        </Fragment>
      )}
      <View style={defaultInputStyle}>
        {inputPrefix !== undefined ? (
          <Fragment>
            <Text style={{ ...fs16RegBlack2, ...prefixStyle }}>{inputPrefix}</Text>
            <CustomSpacer isHorizontal={true} space={sw8} />
          </Fragment>
        ) : null}
        <TextInput
          editable={disabledInput}
          placeholder={rest.placeholder}
          placeholderTextColor={colorGray._7}
          ref={setRef}
          selectionColor={colorBlack._2}
          style={{ ...fs16BoldBlack2, ...flexChild, height: sh38, ...disabledStyle, ...style, ...fsNoLineHeight }}
          underlineColorAndroid={colorTransparent}
          value={value}
          {...rest}
        />
        {rightIcon === undefined ? null : (
          <IcoMoon color={colorBlack._2} name={rightIcon} onPress={rightIconPress} size={rightIconSize || sw20} />
        )}
      </View>
      {error === undefined ? null : (
        <Fragment>
          <CustomSpacer space={sh8} />
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw16} />
            <IcoMoon color={colorRed._2} name="error" size={sh16} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={{ ...fs12SemiBoldRed2, width: sw304 }}>{error}</Text>
          </View>
        </Fragment>
      )}
      {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : null}
    </View>
  );
};
