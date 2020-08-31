import React, { Fragment } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { centerVertical, colorBlack, flexCol, flexRow, fs12RegBlue1, sh16, sw1 } from "../../styles";
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
  noDividier?: boolean;
  spaceToDivider?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const LinkText = ({ onPress, style, text }: LinkTextProps) => {
  return (
    <Text onPress={onPress} style={{ ...fs12RegBlue1, ...style }}>
      {text}
    </Text>
  );
};

export const LinkTextGroup = ({ direction, divider, links, noDividier, spaceToDivider, style }: LinkTextGroupProps) => {
  const viewStyle = direction === "column" ? { ...flexCol, ...style } : { ...flexRow, ...centerVertical, ...style };
  const defaultSpace = spaceToDivider !== undefined ? spaceToDivider : 0;
  const isHorizontal = direction !== "column";

  const linkDivider = divider !== undefined ? divider : <View style={{ backgroundColor: colorBlack._2, height: sh16, width: sw1 }} />;

  return (
    <View style={viewStyle}>
      {links.map((link: LinkTextProps, index: number) => {
        return (
          <Fragment key={index}>
            {index === 0 ? null : (
              <Fragment>
                <CustomSpacer isHorizontal={isHorizontal} space={defaultSpace} />
                {noDividier === true ? null : linkDivider}
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
