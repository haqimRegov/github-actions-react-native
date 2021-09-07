import React, { FunctionComponent, ReactNode } from "react";
import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { Language } from "../../constants";
import {
  borderBottomGray4,
  colorTransparent,
  colorWhite,
  DEVICE,
  flexRow,
  fs12RegGray6,
  imageContain,
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

export interface SideMenuProps {
  children?: ReactNode;
  image?: ImageSourcePropType;
  logoStyle?: ImageStyle;
  spaceToBottom?: number;
  spaceToContent?: number;
}

export const SideMenu: FunctionComponent<SideMenuProps> = ({
  children,
  image,
  logoStyle,
  spaceToBottom,
  spaceToContent,
}: SideMenuProps) => {
  const defaultLogoStyle: ImageStyle = { ...imageContain, width: sw94, height: sh40, ...logoStyle };
  const container: ViewStyle = {
    ...flexRow,
    backgroundColor: colorTransparent,
    height: DEVICE.SCREEN.HEIGHT,
    left: 0,
    position: "absolute",
    top: 0,
    width: sw200,
    zIndex: 1,
  };
  const sideMenuV2Container: ViewStyle = {
    ...shadow5,
    backgroundColor: colorWhite._1,
    borderTopRightRadius: sw24,
    borderBottomRightRadius: sw24,
    width: sw200,
  };

  const footerStyle: TextStyle = { ...fs12RegGray6, ...px(sw24) };

  return (
    <View style={container}>
      <View style={sideMenuV2Container}>
        <View style={px(sw24)}>
          <CustomSpacer space={sh44} />
          <Image source={image || LocalAssets.logo.kenangaBrand} style={defaultLogoStyle} />
          <CustomSpacer space={spaceToContent || sh56} />
        </View>
        {children}
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
