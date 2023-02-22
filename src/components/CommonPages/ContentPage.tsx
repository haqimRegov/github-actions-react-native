import React, { FunctionComponent, ReactNode } from "react";
import { Pressable, ScrollView, Text, TextStyle, View } from "react-native";

import { ActionButtons, ActionButtonsProps, CustomFlexSpacer, CustomSpacer, TextSpaceArea } from "../../components/Views";
import { Language } from "../../constants";
import {
  borderBottomBlue8,
  colorBlue,
  flexGrow,
  flexRow,
  fs12BoldBlue8,
  fs14RegGray5,
  fs18BoldGray6,
  fs24BoldGray6,
  px,
  rowCenterVertical,
  sh20,
  sh4,
  sh48,
  sw24,
  sw30,
} from "../../styles";
import { SafeAreaPage } from "../CommonPages/SafeAreaPage";

const { CONTENT_PAGE } = Language.PAGE;
export interface ContentPageProps extends ActionButtonsProps {
  children: ReactNode;
  handleSkip?: () => void;
  heading?: string;
  headingStyle?: TextStyle;
  noBounce?: boolean;
  setScrollViewRef?: (ref: ScrollView | null) => void;
  sideElement?: ReactNode;
  skippable?: boolean;
  spaceToBottom?: number;
  spaceToButton?: number;
  spaceToHeading?: number;
  spaceToTitle?: number;
  spaceToTop?: number;
  subheading?: string;
  subheadingStyle?: TextStyle;
  subtitle?: string;
  subtitleStyle?: TextStyle;
}

export const defaultContentProps: Partial<ContentPageProps> = {
  headingStyle: fs24BoldGray6,
  spaceToBottom: sh48,
  spaceToButton: sh48,
  spaceToHeading: 0,
  spaceToTitle: sh4,
  spaceToTop: sh20,
  subheadingStyle: fs18BoldGray6,
  subtitleStyle: fs14RegGray5,
};

export const ContentPage: FunctionComponent<ContentPageProps> = ({
  children,
  handleSkip,
  heading,
  headingStyle,
  noBounce,
  setScrollViewRef,
  sideElement,
  skippable,
  spaceToBottom,
  spaceToButton,
  spaceToHeading,
  spaceToTitle,
  spaceToTop,
  subheading,
  subheadingStyle,
  subtitle,
  subtitleStyle,
  ...rest
}: ContentPageProps) => {
  const topSpace = spaceToTop !== undefined ? spaceToTop : defaultContentProps.spaceToTop!;
  const subheadingTopSpace = spaceToHeading !== undefined ? spaceToHeading : defaultContentProps.spaceToHeading;
  const subtitleTopSpace = spaceToTitle !== undefined ? spaceToTitle : defaultContentProps.spaceToTitle;
  const actionButtonProps: ActionButtonsProps = {
    buttonContainerStyle: px(sw24),
    ...rest,
  };
  const defaultSubtitleStyle: TextStyle = { ...defaultContentProps.subtitleStyle, ...subtitleStyle };

  return (
    <SafeAreaPage>
      <ScrollView
        bounces={!noBounce}
        contentContainerStyle={{ ...flexGrow, backgroundColor: colorBlue._2 }}
        keyboardShouldPersistTaps="handled"
        ref={setScrollViewRef}
        showsVerticalScrollIndicator={false}>
        <View style={{ ...flexRow, ...px(sw24) }}>
          <View>
            <CustomSpacer space={topSpace} />
            {heading === undefined ? null : <Text style={{ ...defaultContentProps.headingStyle, ...headingStyle }}>{heading}</Text>}
            {subheading === undefined ? null : (
              <TextSpaceArea
                spaceToTop={subheadingTopSpace}
                style={{ ...defaultContentProps.subheadingStyle, ...subheadingStyle }}
                text={subheading}
              />
            )}
            {subtitle !== undefined ? <TextSpaceArea spaceToTop={subtitleTopSpace} style={defaultSubtitleStyle} text={subtitle} /> : null}
          </View>
          <CustomFlexSpacer />
          {sideElement !== undefined ? sideElement : null}
        </View>
        {children}
        <CustomFlexSpacer />
        <CustomSpacer space={spaceToButton || defaultContentProps.spaceToButton!} />
        {skippable === true ? (
          <View style={rowCenterVertical}>
            <ActionButtons continueDebounce={true} labelCancel={CONTENT_PAGE.BUTTON_BACK} {...actionButtonProps} />
            <CustomFlexSpacer />
            <Pressable onPress={handleSkip}>
              <View style={borderBottomBlue8}>
                <Text style={fs12BoldBlue8}>{CONTENT_PAGE.BUTTON_SKIP}</Text>
              </View>
            </Pressable>
            <CustomSpacer isHorizontal={true} space={sw30} />
          </View>
        ) : (
          <ActionButtons continueDebounce={true} labelCancel={CONTENT_PAGE.BUTTON_BACK} {...actionButtonProps} />
        )}
        <CustomSpacer space={spaceToBottom !== undefined ? spaceToBottom : defaultContentProps.spaceToBottom!} />
      </ScrollView>
    </SafeAreaPage>
  );
};
