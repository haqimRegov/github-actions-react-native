import React, { FunctionComponent, ReactNode } from "react";
import { ScrollView, Text, TextStyle, View } from "react-native";

import { ActionButtons, ActionButtonsProps, CustomFlexSpacer, CustomSpacer, TextSpaceArea } from "../../components/Views";
import { colorBlue, flexGrow, flexRow, fs16SemiBoldGray6, fs24BoldGray6, fs40BoldGray6, px, sh32, sh56, sh8, sw24 } from "../../styles";
import { SafeAreaPage } from "../CommonPages/SafeAreaPage";

export interface ContentPageProps extends ActionButtonsProps {
  children: ReactNode;
  heading?: string;
  headingStyle?: TextStyle;
  noBounce?: boolean;
  sideElement?: ReactNode;
  spaceToBottom?: number;
  spaceToHeading?: number;
  spaceToTitle?: number;
  spaceToTop?: number;
  subheading?: string;
  subheadingStyle?: TextStyle;
  subtitle?: string;
  subtitleStyle?: TextStyle;
}

export const ContentPage: FunctionComponent<ContentPageProps> = ({
  children,
  heading,
  headingStyle,
  noBounce,
  sideElement,
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
    buttonContainerStyle: px(sw24),
    ...rest,
  };
  const defaultSubtitleStyle: TextStyle = { ...fs16SemiBoldGray6, ...subtitleStyle };

  return (
    <SafeAreaPage>
      <ScrollView
        bounces={!noBounce}
        contentContainerStyle={{ ...flexGrow, backgroundColor: colorBlue._2 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={{ ...flexRow, ...px(sw24) }}>
          <View>
            <CustomSpacer space={topSpace} />
            {heading === undefined ? null : <Text style={{ ...fs40BoldGray6, ...headingStyle }}>{heading}</Text>}
            {subheading === undefined ? null : (
              <TextSpaceArea spaceToTop={subheadingTopSpace} style={{ ...fs24BoldGray6, ...subheadingStyle }} text={subheading} />
            )}
            {subtitle !== undefined ? <TextSpaceArea spaceToTop={subtitleTopSpace} style={defaultSubtitleStyle} text={subtitle} /> : null}
          </View>
          <CustomFlexSpacer />
          {sideElement !== undefined ? sideElement : null}
        </View>
        {children}
        <CustomFlexSpacer />
        <CustomSpacer space={sh56} />
        <ActionButtons continueDebounce={true} {...actionButtonProps} />
        <CustomSpacer space={spaceToBottom !== undefined ? spaceToBottom : sh56} />
      </ScrollView>
    </SafeAreaPage>
  );
};
