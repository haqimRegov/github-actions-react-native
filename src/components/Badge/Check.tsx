import React, { FunctionComponent, ReactNode } from "react";
import { View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerHV, circle, colorGreen, colorWhite, flexRow, sh6, sw8 } from "../../styles";

export interface BadgeProps {
  children: ReactNode;
  icon?: IIcon;
  style?: ViewStyle;
}

export const Badge: FunctionComponent<BadgeProps> = ({ children, icon, style }: BadgeProps) => {
  const badgeStyle: ViewStyle = { ...centerHV, ...circle(sw8, colorGreen._1), position: "absolute", right: 0, bottom: 0, ...style };
  return (
    <View style={flexRow}>
      {children}
      <View style={badgeStyle}>
        <IcoMoon color={colorWhite._1} name="success" size={sh6} {...icon} />
      </View>
    </View>
  );
};
