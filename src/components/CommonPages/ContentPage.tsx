import React, { ReactNode } from "react";
import { ScrollView, Text, TextStyle, View } from "react-native";

import { ActionButtons, ActionButtonsProps, CustomFlexSpacer, CustomSpacer, TextSpaceArea } from "../../components/Views";
import { flexGrow, fs24BoldBlack2, fs24RegBlack2, fs36SemiBoldBlack2, px, sh16, sh25, sh32, sh8, sw94 } from "../../styles";
import { SafeAreaPage } from "../CommonPages/SafeAreaPage";

interface ContentPageProps extends ActionButtonsProps {
  children: ReactNode;
  heading?: string;
  headingStyle?: TextStyle;
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
  const topSpace = spaceToTop !== undefined ? spaceToTop : sh32;
  const subheadingTopSpace = spaceToHeading !== undefined ? spaceToHeading : sh8;
  const subtitleTopSpace = spaceToTitle !== undefined ? spaceToTitle : sh8;

  const actionButtonProps: ActionButtonsProps = {
    ...rest,
    buttonContainerStyle: px(sw94),
  };

  return (
    <SafeAreaPage>
      <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
        <View style={px(sw94)}>
          <CustomSpacer space={topSpace} />
          {heading === undefined ? null : <Text style={{ ...fs36SemiBoldBlack2, ...headingStyle }}>{heading}</Text>}
          {subheading === undefined ? null : (
            <TextSpaceArea spaceToTop={subheadingTopSpace} style={{ ...fs24BoldBlack2, ...subheadingStyle }} text={subheading} />
          )}
          {subtitle !== undefined ? (
            <TextSpaceArea spaceToTop={subtitleTopSpace} style={{ ...fs24RegBlack2, ...subtitleStyle }} text={subtitle} />
          ) : null}
        </View>
        {children}
        <CustomFlexSpacer />
        <CustomSpacer space={sh16} />
        <ActionButtons {...actionButtonProps} />
        <CustomSpacer space={spaceToBottom !== undefined ? spaceToBottom : sh25} />
      </ScrollView>
    </SafeAreaPage>
  );
};
