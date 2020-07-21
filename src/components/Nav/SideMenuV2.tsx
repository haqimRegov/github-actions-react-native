import React, { ReactNode } from "react";
import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import { Language } from "../../constants";
import {
  borderBottomGray4,
  colorTransparent,
  colorWhite,
  DEVICE,
  flexRow,
  fs12RegBlue25,
  px,
  sh16,
  sh24,
  sh40,
  sh44,
  sh56,
  shadow5,
  sw200,
  sw24,
  sw94,
} from "../../styles";
import { CustomFlexSpacer, CustomSpacer } from "../Views";

const { SIDE_MENU } = Language.PAGE;

export interface ISideMenuV2 {
  children?: ReactNode;
  image?: ImageSourcePropType;
  logoStyle?: ImageStyle;
  spaceToBottom?: number;
  spaceToContent?: number;
}

export const SideMenuV2 = ({ children, logoStyle, spaceToBottom }: ISideMenuV2) => {
  const defaultLogoStyle: ImageStyle = { width: sw94, height: sh40, resizeMode: "contain", ...logoStyle };
  const container: ViewStyle = {
    ...flexRow,
    backgroundColor: colorTransparent,
    height: DEVICE.SCREEN.HEIGHT,
    left: 0,
    position: "absolute",
    top: 0,
    width: sw200, // size is different to show shadow
    zIndex: 1,
  };
  const sideMenuV2Container: ViewStyle = {
    ...shadow5,
    backgroundColor: colorWhite._1,
    borderTopRightRadius: sw24,
    borderBottomRightRadius: sw24,
    width: sw200,
  };

  const footerStyle: TextStyle = { ...fs12RegBlue25, ...px(sw24), letterSpacing: -0.3 };

  return (
    <View style={container}>
      <View style={sideMenuV2Container}>
        <View style={px(sw24)}>
          <CustomSpacer space={sh44} />
          <Image source={LocalAssets.logo.kenanga_investors} style={defaultLogoStyle} />
          <CustomSpacer space={sh56} />
          {children}
        </View>
        {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : <CustomFlexSpacer />}
        <View style={borderBottomGray4} />
        <View>
          <CustomSpacer space={sh16} />
          <Text style={footerStyle}>{SIDE_MENU.LABEL_FOOTER}</Text>
          <CustomSpacer space={sh24} />
        </View>
      </View>
    </View>
  );
};
