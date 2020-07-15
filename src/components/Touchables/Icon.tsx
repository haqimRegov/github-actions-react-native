import React from "react";
import { TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerHV, circle, colorRed, colorWhite, sh20, sw48 } from "../../styles";

interface IconButtonProps {
  color?: string;
  name: string;
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
}

export const IconButton = ({ color, name, onPress, size, style }: IconButtonProps) => {
  const defaultStyle: ViewStyle = { ...centerHV, ...circle(sw48, colorRed._1), ...style };
  const defaultSize = size !== undefined ? size : sh20;
  const defaultColor = color !== undefined ? color : colorWhite._1;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={defaultStyle}>
        <IcoMoon color={defaultColor} name={name} size={defaultSize} />
      </View>
    </TouchableWithoutFeedback>
  );
};
