import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { centerVertical, colorBlue, colorGray, flexCol, flexRow, flexWrap, fs12RegBlue8, sh16, sw1, sw2 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface LinkTextProps {
  onPress?: () => void;
  style?: TextStyle;
  text: string;
  withUnderline?: boolean;
}

export interface LinkTextGroupProps {
  direction?: "row" | "column";
  divider?: JSX.Element;
  links: LinkTextProps[];
  noDivider?: boolean;
  spaceToDivider?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const LinkText: FunctionComponent<LinkTextProps> = ({ onPress, style, text, withUnderline }: LinkTextProps) => {
  const underline = withUnderline === true ? { borderBottomWidth: sw2, borderBottomColor: colorBlue._1 } : {};

  return (
    <View style={flexWrap}>
      <View style={underline}>
        <Text onPress={onPress} style={{ ...fs12RegBlue8, ...style }} suppressHighlighting={true}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export const LinkTextGroup = ({ direction, divider, links, noDivider, spaceToDivider, style }: LinkTextGroupProps) => {
  const viewStyle = direction === "column" ? { ...flexCol, ...style } : { ...flexRow, ...centerVertical, ...style };
  const defaultSpace = spaceToDivider !== undefined ? spaceToDivider : 0;
  const isHorizontal = direction !== "column";

  const linkDivider = divider !== undefined ? divider : <View style={{ backgroundColor: colorGray._6, height: sh16, width: sw1 }} />;

  return (
    <View style={viewStyle}>
      {links.map((link: LinkTextProps, index: number) => {
        return (
          <Fragment key={index}>
            {index === 0 ? null : (
              <Fragment>
                <CustomSpacer isHorizontal={isHorizontal} space={defaultSpace} />
                {noDivider === true ? null : linkDivider}
              </Fragment>
            )}
            {index === 0 ? null : <CustomSpacer isHorizontal={isHorizontal} space={defaultSpace} />}
            <LinkText {...link} />
          </Fragment>
        );
      })}
    </View>
  );
};
