import React, { ReactNode } from "react";
import { Image, ImageSourcePropType, ImageStyle, View } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import { colorWhite, fullWidth, px, sh100, sh36, sh60, sw126, sw36, sw398 } from "../../styles";
import { CustomFlexSpacer, CustomSpacer } from "../Views";

export interface ISideMenu {
  children?: ReactNode;
  logoStyle?: ImageStyle;
  image?: ImageSourcePropType;
  spaceToBottom?: number;
  spaceToContent?: number;
}

export const SideMenu = ({ children, logoStyle, spaceToBottom, spaceToContent }: ISideMenu) => {
  const defaultLogoStyle: ImageStyle = { height: sh60, resizeMode: "contain", width: sw126, ...logoStyle };
  const contentSpace = spaceToContent !== undefined ? spaceToContent : sh100;

  return (
    <View style={{ backgroundColor: colorWhite._2, width: sw398 }}>
      <View style={px(sw36)}>
        <CustomSpacer space={sh36} />
        <Image source={LocalAssets.logo.kenanga} style={defaultLogoStyle} />
        <CustomSpacer space={contentSpace} />
        {children}
      </View>
      {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : <CustomFlexSpacer />}
      <Image source={LocalAssets.onboarding.people} style={fullWidth} />
    </View>
  );
};
