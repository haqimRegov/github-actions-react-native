import React, { Fragment, ReactNode } from "react";
import { SafeAreaView, StatusBar, StatusBarStyle, ViewStyle } from "react-native";

import { colorGray, flexChild, flexNone } from "../../styles";

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
    backgroundColor: topBackgroundColor !== undefined ? topBackgroundColor : colorGray._5,
  };

  const safeAreaBottomStyle: ViewStyle = {
    ...flexChild,
    backgroundColor: bottomBackgroundColor !== undefined ? bottomBackgroundColor : colorGray._5,
  };

  return (
    <Fragment>
      <StatusBar barStyle={defaultBarStyle} />
      <SafeAreaView style={safeAreaTopStyle} />
      <SafeAreaView style={safeAreaBottomStyle}>{children}</SafeAreaView>
    </Fragment>
  );
};
