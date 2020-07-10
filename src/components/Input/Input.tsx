import React, { Fragment } from "react";
import { Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlack,
  colorGray,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs16SemiBoldBlack2,
  px,
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
  rightIcon?: string;
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
  rightIcon,
  setRef,
  spaceToBottom,
  spaceToLabel,
  spaceToTop,
  style,
  viewStyle,
  ...rest
}: ITextInputProps) => {
  const defaultLabelSpace = spaceToLabel === undefined ? sh4 : spaceToLabel;
  const defaultInputStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    ...centerVertical,
    ...flexRow,
    ...px(sw12),
    borderColor: colorBlack._2,
    borderWidth: sw1,
    borderRadius: sw20,
    height: sh40,
    width: sw350,
    ...viewStyle,
  };
  const textStyle: TextStyle = { ...fs16SemiBoldBlack2, ...flexChild, height: sh40, ...style };

  return (
    <View>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label === undefined ? null : (
        <Fragment>
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw12} />
            <Text onPress={onPressLabel} style={{ ...fs16SemiBoldBlack2, ...labelStyle }}>
              {label}
            </Text>
          </View>
          <CustomSpacer space={defaultLabelSpace} />
        </Fragment>
      )}
      <View style={defaultInputStyle}>
        <TextInput
          placeholder={rest.placeholder}
          placeholderTextColor={colorGray._1}
          ref={setRef}
          selectionColor={colorBlack._2}
          style={textStyle}
          underlineColorAndroid={colorTransparent}
          {...rest}
        />
        {rightIcon === undefined ? null : <IcoMoon color={colorBlack._2} name={rightIcon} size={sw20} />}
      </View>
      {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : null}
    </View>
  );
};
