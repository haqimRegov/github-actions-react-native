import React, { FunctionComponent } from "react";
import { Image, ImageSourcePropType, View, ViewStyle } from "react-native";

import { centerHV, circleBorder, colorBlack, colorWhite, customShadow, sw1, sw24, sw46, sw48, sw5 } from "../../styles";

export interface AvatarProps {
  image?: ImageSourcePropType;
}

export const Avatar: FunctionComponent<AvatarProps> = ({ image }: AvatarProps) => {
  const container: ViewStyle = { ...centerHV, ...circleBorder(sw48, sw1, colorWhite._1), ...customShadow(colorBlack._1, 0, 0, 0.4, sw5) };
  return (
    <View style={container}>
      {image !== undefined ? <Image source={image} style={{ height: sw46, width: sw46, borderRadius: sw24 }} /> : null}
    </View>
  );
};
