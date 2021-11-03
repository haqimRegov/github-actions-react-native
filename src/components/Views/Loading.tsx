import React, { FunctionComponent } from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";

import { centerHV, colorGray, flexChild } from "../../styles";

interface LoadingProps {
  color?: string;
  size?: number | "small" | "large";
  style?: ViewStyle;
}

export const Loading: FunctionComponent<LoadingProps> = ({ color, size, style }: LoadingProps) => {
  return (
    <View style={{ ...centerHV, ...flexChild, ...style }}>
      <ActivityIndicator color={color || colorGray._4} size={size || "small"} />
    </View>
  );
};
