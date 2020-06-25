import React, { useState, Fragment } from "react";
import { Text, View, TouchableWithoutFeedbackBase, ViewStyle, TextStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import { CustomSpacer } from "../../components/Views/Spacer";
import {
  centerHorizontal,
  colorGray,
  colorWhite,
  customShadow,
  flexChild,
  fs12SemiBoldBlack2,
  fs16SemiBoldBlack2,
  px,
  sh31,
  sh56,
  sh8,
  sw24,
  sh24,
} from "../../styles";

interface BasicAccordionProps {
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  contentStyle?: TextStyle;
  sections: object[];
  spaceInBetween?: number;
  spaceToBottom?: number;
  spaceToTop?: number;
  titleStyle?: TextStyle;
}

interface SectionProps {
  content: string;
  title: string;
}

export const BasicAccordion = ({
  containerStyle,
  contentContainerStyle,
  contentStyle,
  sections,
  spaceInBetween,
  spaceToBottom,
  spaceToTop,
  titleStyle,
}: BasicAccordionProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const handleUpdate = (section: number[]) => {
    setActiveSections(section);
  };
  const renderTitle = (section: SectionProps) => {
    return (
      <Fragment>
        <View style={defaultContainerStyle}>
          <Text style={defaultTitleStyle}>{section.title}</Text>
        </View>
        <CustomSpacer space={spaceInBetween !== undefined ? spaceInBetween : sh8} />
      </Fragment>
    );
  };
  const renderContent = (section: SectionProps) => {
    return (
      <Fragment>
        <View style={defaultContentContainerStyle}>
          <Text style={defaultContentStyle}>{section.content}</Text>
        </View>
      </Fragment>
    );
  };

  const defaultContainerStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: 10,
    ...centerHorizontal,
    ...containerStyle,
    ...customShadow(colorGray._4, 5, 0, 0.5, 20),
    ...flexChild,
    height: sh56,
    ...px(sw24),
  };
  const defaultContentContainerStyle: ViewStyle = { backgroundColor: colorWhite._1, ...contentContainerStyle, ...px(sw24) };
  const defaultTitleStyle: ViewStyle = { ...fs16SemiBoldBlack2, ...titleStyle };
  const defaultContentStyle: ViewStyle = { ...contentStyle, ...fs12SemiBoldBlack2 };
  return (
    <Fragment>
      <CustomSpacer space={spaceToTop !== undefined ? spaceToTop : sh24} />
      <Accordion
        activeSections={activeSections}
        onChange={handleUpdate}
        renderContent={renderContent}
        renderHeader={renderTitle}
        sections={sections}
        touchableComponent={TouchableWithoutFeedbackBase}
        underlayColor={colorWhite._1}
      />
      <CustomSpacer space={spaceToBottom !== undefined ? spaceToBottom : sh31} />
    </Fragment>
  );
};
