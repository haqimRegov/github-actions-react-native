import React, { FunctionComponent } from "react";
import { Image, ImageSourcePropType, Text, TextStyle, View, ViewStyle } from "react-native";

import {
  centerHV,
  circle,
  circleBorder,
  colorBlue,
  colorMagenta,
  colorOrange,
  colorPink,
  colorRed,
  colorWhite,
  fs16BoldWhite1,
  fsUppercase,
  shadowBlue5,
  sw2,
  sw24,
  sw46,
  sw48,
} from "../../styles";

export interface AvatarProps {
  color?: string;
  image?: ImageSourcePropType;
  size?: number;
  text?: string;
  textStyle?: TextStyle;
  type?: AvatarType;
}

export const Avatar: FunctionComponent<AvatarProps> = ({ color, image, size, text, textStyle, type }: AvatarProps) => {
  const defaultSize = size !== undefined ? size : sw48;
  const container: ViewStyle = {
    ...centerHV,
    ...circleBorder(defaultSize, sw2, colorWhite._1),
    ...shadowBlue5,
  };

  let defaultColor = color !== undefined ? color : colorBlue._2;
  if (type !== undefined) {
    switch (type) {
      case "agent":
        defaultColor = colorPink._1;
        break;

      case "branch":
        defaultColor = colorMagenta._1;
        break;

      case "hq":
        defaultColor = colorBlue._7;
        break;

      case "client":
        defaultColor = colorOrange._1;
        break;

      case "system":
        defaultColor = colorRed._3;
        break;

      default:
        break;
    }
  }
  const defaultAvatarStyle: ViewStyle = { ...centerHV, ...circle(defaultSize, defaultColor) };

  return (
    <View style={container}>
      {image !== undefined ? <Image source={image} style={{ height: sw46, width: sw46, borderRadius: sw24 }} /> : null}
      {type !== undefined && image === undefined ? (
        <View style={defaultAvatarStyle}>
          <Text style={{ ...fs16BoldWhite1, ...fsUppercase, ...textStyle }}>{text}</Text>
        </View>
      ) : null}
    </View>
  );
};
