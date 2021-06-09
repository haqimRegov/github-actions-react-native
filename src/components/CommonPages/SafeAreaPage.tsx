import React, { Fragment, ReactNode } from "react";
import { StatusBar, StatusBarStyle, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colorGray, flexChild } from "../../styles";

interface SafeArePageProps {
  barStyle?: StatusBarStyle;
  bottomBackgroundColor?: string;
  bottomSpace?: number;
  children: ReactNode;
  topBackgroundColor?: string;
}

export const SafeAreaPage = ({ barStyle, bottomBackgroundColor, bottomSpace, children, topBackgroundColor }: SafeArePageProps) => {
  const { top } = useSafeAreaInsets();
  const defaultBarStyle = barStyle !== undefined ? barStyle : "default";

  const topStyle: ViewStyle = {
    backgroundColor: topBackgroundColor !== undefined ? topBackgroundColor : colorGray._5,
    height: top,
  };

  const bottomStyle: ViewStyle = {
    backgroundColor: bottomBackgroundColor !== undefined ? bottomBackgroundColor : colorGray._5,
    height: bottomSpace !== undefined ? bottomSpace : 0,
  };

  return (
    <Fragment>
      <StatusBar barStyle={defaultBarStyle} />
      <View style={flexChild}>
        <View style={topStyle} />
        <View style={{ ...flexChild, backgroundColor: bottomBackgroundColor !== undefined ? bottomBackgroundColor : colorGray._5 }}>
          {children}
        </View>
        <View style={bottomStyle} />
      </View>
    </Fragment>
  );
};
