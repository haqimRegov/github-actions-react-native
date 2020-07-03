import React, { Fragment, ReactNode } from "react";
import { ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";

import { CustomSpacer } from "../../components/Views";
import { flexChild, flexRow, fs16RegBlack2, fs24RegBlack2, px, sh25, sh31, sh8, sw16, sw240, sw96 } from "../../styles";
import { SafeAreaPage } from "../CommonPages/SafeAreaPage";
import { RoundedButton } from "../Touchables/Button";

interface ContentPageProps {
  children: ReactNode;
  handleLeftButton: () => void;
  handleRightButton: () => void;
  heading: string;
  headingStyle?: TextStyle;
  leftButtonText: string;
  rightButtonText: string;
  spaceToBottom?: number;
  spaceToSubHeading?: number;
  spaceToTitle?: number;
  spaceToTop?: number;
  subHeading: string;
  subHeadingStyle?: TextStyle;
  title?: string;
  titleStyle?: TextStyle;
}

export const ContentPage = ({
  children,
  handleLeftButton,
  handleRightButton,
  heading,
  headingStyle,
  leftButtonText,
  rightButtonText,
  spaceToBottom,
  spaceToSubHeading,
  spaceToTitle,
  spaceToTop,
  subHeading,
  subHeadingStyle,
  title,
  titleStyle,
}: ContentPageProps) => {
  const defaultHeadingStyle: ViewStyle = { ...fs24RegBlack2, ...headingStyle };
  const defaultSubHeadingStyle: ViewStyle = { ...fs16RegBlack2, ...subHeadingStyle };
  const defaultTitleStyle: ViewStyle = { ...fs16RegBlack2, ...titleStyle };
  return (
    <SafeAreaPage>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ ...flexChild, ...px(sw96) }}>
          <CustomSpacer space={spaceToTop !== undefined ? spaceToTop : sh31} />
          <Text style={defaultHeadingStyle}>{heading}</Text>
          <CustomSpacer space={spaceToSubHeading !== undefined ? spaceToSubHeading : sh8} />
          <Text style={defaultSubHeadingStyle}>{subHeading}</Text>
          {title !== undefined ? (
            <Fragment>
              <CustomSpacer space={spaceToTitle !== undefined ? spaceToTitle : sh8} />
              <Text style={defaultTitleStyle}>{title}</Text>
            </Fragment>
          ) : null}
        </View>
        {children}
        <View style={{ ...flexRow, ...px(sw96) }}>
          <RoundedButton buttonStyle={{ width: sw240 }} onPress={handleLeftButton} secondary={true} text={leftButtonText} />
          <CustomSpacer isHorizontal={true} space={sw16} />
          <RoundedButton buttonStyle={{ width: sw240 }} onPress={handleRightButton} text={rightButtonText} />
        </View>
        <CustomSpacer space={spaceToBottom !== undefined ? spaceToBottom : sh25} />
      </ScrollView>
    </SafeAreaPage>
  );
};
