import React, { ReactNode } from "react";
import { ScrollView, Text, TextStyle, View } from "react-native";

import { ActionButtons, ActionButtonsProps, CustomFlexSpacer, CustomSpacer, TextSpaceArea } from "../../components/Views";
import { flexGrow, fs16SemiBoldBlack2, fs24BoldBlack2, fs40BoldBlack2, px, sh36, sh56, sh8, sw24 } from "../../styles";
import { SafeAreaPage } from "../CommonPages/SafeAreaPage";

interface ContentPageProps extends ActionButtonsProps {
  children: ReactNode;
  heading?: string;
  headingStyle?: TextStyle;
  noBounce?: boolean;
  spaceToBottom?: number;
  spaceToHeading?: number;
  spaceToTitle?: number;
  spaceToTop?: number;
  subheading?: string;
  subheadingStyle?: TextStyle;
  subtitle?: string;
  subtitleStyle?: TextStyle;
}

export const ContentPage = ({
  children,
  heading,
  headingStyle,
  noBounce,
  spaceToBottom,
  spaceToHeading,
  spaceToTitle,
  spaceToTop,
  subheading,
  subheadingStyle,
  subtitle,
  subtitleStyle,
  ...rest
}: ContentPageProps) => {
  const topSpace = spaceToTop !== undefined ? spaceToTop : sh36;
  const subheadingTopSpace = spaceToHeading !== undefined ? spaceToHeading : sh8;
  const subtitleTopSpace = spaceToTitle !== undefined ? spaceToTitle : sh8;
  const actionButtonProps: ActionButtonsProps = {
    buttonContainerStyle: px(sw24),
    ...rest,
  };
  const defaultSubtitleStyle: TextStyle = { ...fs16SemiBoldBlack2, letterSpacing: -0.05, ...subtitleStyle };

  return (
    <SafeAreaPage>
      <ScrollView bounces={!noBounce} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
        <View style={px(sw24)}>
          <CustomSpacer space={topSpace} />
          {heading === undefined ? null : <Text style={{ ...fs40BoldBlack2, ...headingStyle }}>{heading}</Text>}
          {subheading === undefined ? null : (
            <TextSpaceArea spaceToTop={subheadingTopSpace} style={{ ...fs24BoldBlack2, ...subheadingStyle }} text={subheading} />
          )}
          {subtitle !== undefined ? <TextSpaceArea spaceToTop={subtitleTopSpace} style={defaultSubtitleStyle} text={subtitle} /> : null}
        </View>
        {children}
        <CustomFlexSpacer />
        <CustomSpacer space={sh56} />
        <ActionButtons {...actionButtonProps} />
        <CustomSpacer space={spaceToBottom !== undefined ? spaceToBottom : sh56} />
      </ScrollView>
    </SafeAreaPage>
  );
};
