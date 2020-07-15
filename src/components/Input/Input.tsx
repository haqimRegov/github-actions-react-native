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
  fs12BoldBlack2,
  fs16BoldBlack2,
  px,
  sh40,
  sh8,
  sw1,
  sw16,
  sw20,
  sw360,
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
  const defaultLabelSpace = spaceToLabel === undefined ? sh8 : spaceToLabel;
  const defaultInputStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    ...centerVertical,
    ...flexRow,
    ...px(sw16),
    borderColor: colorGray._7,
    borderWidth: sw1,
    borderRadius: sw20,
    height: sh40,
    width: sw360,
    ...viewStyle,
  };
  const textStyle: TextStyle = { ...fs16BoldBlack2, ...flexChild, height: sh40, ...style };

  return (
    <View>
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
        <TextInput
          placeholder={rest.placeholder}
          placeholderTextColor={colorGray._4}
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
