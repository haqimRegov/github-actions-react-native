import React, { FunctionComponent, ReactNode } from "react";
import { View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerHV, circle, colorGreen, colorWhite, flexRow, sh6, sw8 } from "../../styles";

export interface BadgeProps {
  children: ReactNode;
}

export const Badge: FunctionComponent<BadgeProps> = ({ children }: BadgeProps) => {
  const badgeStyle: ViewStyle = { ...centerHV, ...circle(sw8, colorGreen._1), position: "absolute", right: 0, bottom: 0 };
  return (
    <View style={flexRow}>
      {children}
      <View style={badgeStyle}>
        <IcoMoon color={colorWhite._1} name="check" size={sh6} />
      </View>
    </View>
  );
};
