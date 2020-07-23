import React, { Fragment } from "react";
import { Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  border,
  centerVertical,
  colorBlack,
  colorBlue,
  colorGray,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs16BoldBlack2,
  px,
  sh40,
  sh8,
  sw1,
  sw16,
  sw20,
  sw360,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface ITextInputProps extends TextInputProps {
  label?: string;
  labelStyle?: TextStyle;
  inputPrefix?: string;
  noBorder?: boolean;
  onPressLabel?: () => void;
  rightIcon?: string;
  prefixStyle?: TextStyle;
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
  inputPrefix,
  noBorder,
  onLayout,
  onPressLabel,
  rightIcon,
  prefixStyle,
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
  const defaultInputStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw16),
    ...border(colorGray._7, borderWidth, sw20),
    backgroundColor: colorWhite._1,
    height: sh40,
    width: sw360,
    ...viewStyle,
  };
  const defaultLabelSpace = spaceToLabel === undefined ? sh8 : spaceToLabel;

  // // TODO improved placeholder style
  // const placeHolderStyle: TextStyle =
  //   value === "" || value === undefined ? { ...fs16RegBlack2, letterSpacing: -0.39, opacity: 0.7 } : fs16BoldBlack2;

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
            <Text style={prefixStyle}>{inputPrefix}</Text>
            <CustomSpacer isHorizontal={true} space={sw8} />
          </Fragment>
        ) : null}
        <TextInput
          placeholder={rest.placeholder}
          placeholderTextColor={colorBlue._4_7}
          ref={setRef}
          selectionColor={colorBlack._2}
          style={{ ...fs16BoldBlack2, ...flexChild, height: sh40, ...style }}
          underlineColorAndroid={colorTransparent}
          value={value}
          {...rest}
        />
        {rightIcon === undefined ? null : <IcoMoon color={colorBlack._2} name={rightIcon} size={sw20} />}
      </View>
      {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : null}
    </View>
  );
};
