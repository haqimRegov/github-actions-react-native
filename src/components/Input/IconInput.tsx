import React, { FunctionComponent } from "react";
import { Image, ImageSourcePropType, ImageStyle, TextInput, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { border, centerVertical, colorGray, flexChild, fullWidth, sh24, sh40, sw1, sw16, sw20 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";
import { CustomTextInput, CustomTextInputProps } from "./Input";

interface IconInputProps extends CustomTextInputProps {
  icon?: ImageSourcePropType | string;
  iconSize?: number;
  iconPosition?: "left" | "right";
  iconInputRef?: TextInput | null;
  setIconInputRef?: (instance: TextInput | null) => void;
}

export const IconInput: FunctionComponent<IconInputProps> = ({
  icon,
  iconPosition,
  iconSize,
  keyboardType,
  onChangeText,
  placeholder,
  iconInputRef,
  setIconInputRef,
  textContentType,
  value,
  viewStyle,
  ...rest
}: IconInputProps) => {
  const defaultIconSize = iconSize !== undefined ? iconSize : sh24;
  const imageSize: ImageStyle =
    iconSize !== undefined ? { height: iconSize, width: iconSize } : { height: defaultIconSize, width: defaultIconSize };

  const icoMoon = typeof icon === "string" ? <IcoMoon name={icon} size={defaultIconSize} /> : null;
  const imageIcon = typeof icon === "number" ? <Image source={icon} style={imageSize} /> : null;

  const flexDirection: ViewStyle = iconPosition === "right" ? { flexDirection: "row-reverse" } : { flexDirection: "row" };

  const inputContainerStyle: ViewStyle = {
    ...border(colorGray._7, sw1, sw20),
    ...centerVertical,
    ...flexChild,
    ...flexDirection,
    ...viewStyle,
  };

  const dynamicHeight: number = viewStyle !== undefined && typeof viewStyle.height === "number" ? viewStyle.height : sh40;
  const offsetHeight: number = dynamicHeight - 2;

  const textInputStyle = {
    ...flexChild,
    ...fullWidth,
    ...viewStyle,
    height: offsetHeight,
  };

  const handleInput = () => {
    if (iconInputRef !== undefined && iconInputRef !== null) {
      iconInputRef.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleInput}>
      <View style={inputContainerStyle}>
        <CustomSpacer isHorizontal={true} space={sw16} />
        {icoMoon}
        {imageIcon}
        <CustomTextInput
          keyboardType={keyboardType}
          noBorder={true}
          onChangeText={onChangeText}
          placeholder={placeholder}
          setRef={setIconInputRef}
          textContentType={textContentType}
          value={value}
          viewStyle={textInputStyle}
          {...rest}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
