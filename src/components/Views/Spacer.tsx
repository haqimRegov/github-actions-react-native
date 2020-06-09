import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { flexChild } from "../../styles";

export interface CustomSpacerProps {
  space: number;
  isHorizontal?: boolean;
}

export const CustomSpacer: FunctionComponent<CustomSpacerProps> = ({ space, isHorizontal }: CustomSpacerProps) => {
  const style: ViewStyle = {};
  if (isHorizontal === true) {
    style.width = space;
  } else {
    style.height = space;
  }

  return <View style={style} />;
};

export const CustomFlexSpacer: FunctionComponent = () => {
  return <View style={flexChild} />;
};
