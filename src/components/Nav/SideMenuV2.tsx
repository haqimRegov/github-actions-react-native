import React, { ReactNode } from "react";
import { Image, ImageSourcePropType, ImageStyle, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import { colorGray, colorWhite, flexRow, px, sh24, sh40, sh96, shadow5, sw200, sw208, sw24, sw94 } from "../../styles";
import { CustomFlexSpacer, CustomSpacer } from "../Views";

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
    backgroundColor: colorGray._3,
    width: sw208, // size is different to show shadow
  };
  const sideMenuV2Container: ViewStyle = {
    ...px(sw24),
    ...shadow5,
    backgroundColor: colorWhite._1,
    borderTopRightRadius: sw24,
    borderBottomRightRadius: sw24,
    width: sw200,
  };

  return (
    <View style={container}>
      <View style={sideMenuV2Container}>
        <CustomSpacer space={sh24} />
        <Image source={LocalAssets.logo.kenanga_investors} style={defaultLogoStyle} />
        <CustomSpacer space={sh96} />
        {children}
        {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : <CustomFlexSpacer />}
      </View>
    </View>
  );
};
