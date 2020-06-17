import React, { Fragment, useState } from "react";
import { Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

import {
  centerVertical,
  colorBlue,
  colorGray,
  colorWhite,
  flexChild,
  flexRow,
  fs13SemiBoldBlue2,
  px,
  sh16,
  sh48,
  sw14,
  sw2,
  sw5,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface ITextInputProps extends TextInputProps {
  label?: string;
  labelStyle?: TextStyle;
  onPressLabel?: () => void;
  setRef?: (ref: TextInput | null) => void;
  viewStyle?: ViewStyle;
}

export const CustomTextInput = ({ label, labelStyle, onPressLabel, setRef, viewStyle, ...rest }: ITextInputProps) => {
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const borderColor: ViewStyle = inputFocus ? { borderColor: colorBlue._1 } : { borderColor: colorGray._2 };
  const defaultLabelStyle: TextStyle = { ...fs13SemiBoldBlue2, ...labelStyle };
  const textInputStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw14),
    ...borderColor,
    borderWidth: sw2,
    borderRadius: sw5,
    ...viewStyle,
  };
  const textStyle: TextStyle = { ...flexChild, height: sh48 };

  const handleFocus = () => {
    setInputFocus(true);
  };

  const handleBlur = () => {
    setInputFocus(false);
  };

  return (
    <Fragment>
      {label === undefined ? null : (
        <Fragment>
          <CustomSpacer space={sh16} />
          <Text onPress={onPressLabel} style={defaultLabelStyle}>
            {label}
          </Text>
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
    </Fragment>
  );
};
