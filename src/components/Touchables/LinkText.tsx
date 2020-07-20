import React, { Fragment } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { centerVertical, flexCol, flexRow, fs12RegBlue1, fsCapitalize } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface LinkTextProps {
  onPress?: () => void;
  style?: TextStyle;
  text: string;
}

export interface LinkTextGroupProps {
  direction?: "row" | "column";
  divider?: JSX.Element;
  links: LinkTextProps[];
  spaceToDivider?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const LinkText = ({ onPress, style, text }: LinkTextProps) => {
  const textLinkStyle: TextStyle = { ...fs12RegBlue1, ...fsCapitalize, ...style };

  return (
    <Text onPress={onPress} style={textLinkStyle}>
      {text}
    </Text>
  );
};

export const LinkTextGroup = ({ direction, divider, links, spaceToDivider, style }: LinkTextGroupProps) => {
  const viewStyle = direction === "column" ? { ...flexCol, ...style } : { ...flexRow, ...centerVertical, ...style };
  const defaultSpace = spaceToDivider !== undefined ? spaceToDivider : 0;
  const isHorizontal = direction !== "column";

  return (
    <View style={viewStyle}>
      {links.map((link: LinkTextProps, index: number) => {
        return (
          <Fragment key={index}>
            {index === 0 ? null : (
              <Fragment>
                <CustomSpacer isHorizontal={isHorizontal} space={defaultSpace} />
                {divider}
              </Fragment>
            )}
            <CustomSpacer isHorizontal={isHorizontal} space={defaultSpace} />
            <LinkText {...link} />
          </Fragment>
        );
      })}
    </View>
  );
};
