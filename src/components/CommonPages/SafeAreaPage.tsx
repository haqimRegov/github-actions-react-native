import React, { Fragment, ReactNode } from "react";
import { SafeAreaView, StatusBar, StatusBarStyle, ViewStyle } from "react-native";

import { colorWhite, flexChild, flexNone } from "../../styles";

interface SafeArePageProps {
  barStyle?: StatusBarStyle;
  bottomBackgroundColor?: string;
  children: ReactNode;
  topBackgroundColor?: string;
}

export const SafeAreaPage = ({ barStyle, bottomBackgroundColor, children, topBackgroundColor }: SafeArePageProps) => {
  const defaultBarStyle = barStyle !== undefined ? barStyle : "default";

  const safeAreaTopStyle: ViewStyle = {
    ...flexNone,
    backgroundColor: topBackgroundColor !== undefined ? topBackgroundColor : colorWhite._1,
  };

  const safeAreaBottomStyle: ViewStyle = {
    ...flexChild,
    backgroundColor: bottomBackgroundColor !== undefined ? bottomBackgroundColor : colorWhite._1,
  };

  return (
    <Fragment>
      <StatusBar barStyle={defaultBarStyle} />
      <SafeAreaView style={safeAreaTopStyle} />
      <SafeAreaView style={safeAreaBottomStyle}>{children}</SafeAreaView>
    </Fragment>
  );
};
