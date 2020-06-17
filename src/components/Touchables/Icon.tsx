import React from "react";
import { TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { blueShadow, centerHV, circle, colorBlue, colorWhite, sh20, sw48 } from "../../styles";

interface IconButtonProps {
  color?: string;
  name: string;
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
}

export const IconButton = ({ color, name, onPress, size, style }: IconButtonProps) => {
  const defaultStyle: ViewStyle = style !== undefined ? style : { ...centerHV, ...circle(sw48, colorBlue._1), ...blueShadow };
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
