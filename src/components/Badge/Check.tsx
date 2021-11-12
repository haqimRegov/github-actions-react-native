import React, { FunctionComponent, ReactNode } from "react";
import { View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerHV, circle, colorGreen, colorWhite, flexRow, sh6, sw8 } from "../../styles";

export interface BadgeProps {
  children: ReactNode;
  icon?: IIcon;
  style?: ViewStyle;
  withoutIcon?: boolean;
}

export const Badge: FunctionComponent<BadgeProps> = ({ children, icon, style, withoutIcon }: BadgeProps) => {
  const badgeStyle: ViewStyle = { ...centerHV, ...circle(sw8, colorGreen._1), position: "absolute", right: 0, bottom: 0, ...style };
  return (
    <View style={flexRow}>
      {children}
      <View style={badgeStyle}>
        {withoutIcon === false ? null : <IcoMoon color={colorWhite._1} name="success" size={sh6} {...icon} suppressHighlighting={true} />}
      </View>
    </View>
  );
};
