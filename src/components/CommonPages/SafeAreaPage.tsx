import React, { Fragment, ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colorWhite, flexChild } from "../../styles";

interface SafeArePageProps {
  bottomBackgroundColor?: string;
  bottomSpace?: number;
  children: ReactNode;
  topBackgroundColor?: string;
}

export const SafeAreaPage = ({ bottomBackgroundColor, bottomSpace, children, topBackgroundColor }: SafeArePageProps) => {
  const { top } = useSafeAreaInsets();

  const topStyle: ViewStyle = {
    backgroundColor: topBackgroundColor !== undefined ? topBackgroundColor : colorWhite._4,
    height: top,
  };

  const bottomStyle: ViewStyle = {
    backgroundColor: bottomBackgroundColor !== undefined ? bottomBackgroundColor : colorWhite._4,
    height: bottomSpace !== undefined ? bottomSpace : 0,
  };

  return (
    <Fragment>
      <View style={flexChild}>
        <View style={topStyle} />
        <View style={{ ...flexChild, backgroundColor: bottomBackgroundColor !== undefined ? bottomBackgroundColor : colorWhite._4 }}>
          {children}
        </View>
        <View style={bottomStyle} />
      </View>
    </Fragment>
  );
};
