import React, { ReactNode } from "react";
import { Image, ImageSourcePropType, ImageStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  circle,
  colorBlack,
  colorBlue,
  colorWhite,
  DEVICE,
  flexRow,
  fullWidth,
  px,
  sh100,
  sh36,
  sh60,
  shadow5,
  sw126,
  sw134,
  sw36,
  sw398,
  sw54,
  sw70,
  sw83,
} from "../../styles";
import { CustomFlexSpacer, CustomSpacer } from "../Views";

export interface ISideMenu {
  children?: ReactNode;
  collapse?: boolean;
  image?: ImageSourcePropType;
  logoStyle?: ImageStyle;
  onPressBackdrop?: () => void;
  onPressExpand?: () => void;
  overlay?: boolean;
  spaceToBottom?: number;
  spaceToContent?: number;
}

export const SideMenu = ({
  children,
  collapse,
  logoStyle,
  onPressBackdrop,
  onPressExpand,
  overlay,
  spaceToBottom,
  spaceToContent,
}: ISideMenu) => {
  const contentSpace = spaceToContent !== undefined ? spaceToContent : sh100;
  const containerWidth = collapse === true ? sw134 : sw398;
  const logoWidth = collapse === true ? sw83 : sw126;

  const defaultLogoStyle: ImageStyle = { height: sh60, resizeMode: "contain", width: logoWidth, ...logoStyle };
  const container: ViewStyle = {
    ...flexRow,
    left: 0,
    position: "absolute",
    top: 0,
    zIndex: 99,
  };
  const expandButtonStyle: ViewStyle = { ...centerHV, ...circle(sw54, colorBlue._1), left: sw70 };
  const overlayStyle: ViewStyle = { backgroundColor: colorBlack._1, opacity: 0.5, width: DEVICE.SCREEN.WIDTH };
  const sideMenuContainer: ViewStyle = { ...shadow5, backgroundColor: colorWhite._2, height: DEVICE.SCREEN.HEIGHT, width: containerWidth };

  return (
    <View style={container}>
      <View style={sideMenuContainer}>
        <View style={px(sw36)}>
          <CustomSpacer space={sh36} />
          <Image source={LocalAssets.logo.kenanga} style={defaultLogoStyle} />
          <CustomSpacer space={contentSpace} />
          {children}
          {collapse === false ? null : (
            <TouchableWithoutFeedback onPress={onPressExpand}>
              <View style={expandButtonStyle}>
                <IcoMoon color={colorWhite._1} name="caret-right" />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : <CustomFlexSpacer />}
        {collapse === true ? null : <Image source={LocalAssets.onboarding.people} style={fullWidth} />}
      </View>
      {overlay === true ? (
        <TouchableWithoutFeedback onPress={onPressBackdrop}>
          <View style={overlayStyle} />
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
};
