import React, { useState, Fragment } from "react";
import { Text, View, TouchableWithoutFeedbackBase, ViewStyle, TextStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import { CustomSpacer } from "../Views/Spacer";
import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorGray,
  colorWhite,
  customShadow,
  flexRow,
  fs12SemiBoldBlack2,
  fs16SemiBoldBlack2,
  px,
  sh05,
  sh20,
  sh24,
  sh31,
  sh5,
  sh56,
  sh8,
  spaceBetweenHorizontal,
  sw11,
  sw24,
} from "../../styles";

interface BasicProps {
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  contentStyle?: TextStyle;
  icon?: string;
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
  icon,
  sections,
  spaceInBetween,
  spaceToBottom,
  spaceToTop,
  titleStyle,
}: BasicProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const defaultSpaceInBetween = spaceInBetween !== undefined ? spaceInBetween : sh8;

  const defaultTitleContainerStyle: ViewStyle = {
    ...centerVertical,
    ...containerStyle,
    ...customShadow(colorGray._4, sh5, 0, sh05, sh20),
    ...flexRow,
    ...px(sw24),
    ...spaceBetweenHorizontal,
    backgroundColor: colorWhite._1,
    borderRadius: 10,
    height: sh56,
  };
  const defaultContentContainerStyle: ViewStyle = { ...contentContainerStyle, ...px(sw24), backgroundColor: colorWhite._1 };
  const defaultTitleStyle: ViewStyle = { ...fs16SemiBoldBlack2, ...titleStyle };
  const defaultContentStyle: ViewStyle = { ...contentStyle, ...fs12SemiBoldBlack2 };

  const handleUpdate = (section: number[]) => {
    setActiveSections(section);
  };
  const renderTitle = (section: SectionProps) => {
    const selected = sections.indexOf(section);
    const contentOpenedStyle: ViewStyle = { ...defaultTitleContainerStyle, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 };
    const defaultStyle = activeSections.includes(selected) ? contentOpenedStyle : defaultTitleContainerStyle;
    return (
      <Fragment>
        <View style={defaultStyle}>
          <Text style={defaultTitleStyle}>{section.title}</Text>
          {icon !== undefined ? <IcoMoon name={icon} size={sw11} /> : null}
        </View>
        {activeSections.includes(selected) === false ? <CustomSpacer space={defaultSpaceInBetween} /> : null}
      </Fragment>
    );
  };
  const renderContent = (section: SectionProps) => {
    const selected = sections.indexOf(section);
    const contentOpenedStyle: ViewStyle = { ...defaultContentContainerStyle, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 };
    const defaultStyle = activeSections.includes(selected) ? contentOpenedStyle : defaultContentContainerStyle;
    return (
      <Fragment>
        <View style={defaultStyle}>
          <Text style={defaultContentStyle}>{section.content}</Text>
        </View>
        <CustomSpacer space={defaultSpaceInBetween} />
      </Fragment>
    );
  };

  return (
    <Fragment>
      <CustomSpacer space={spaceToTop !== undefined ? spaceToTop : sh24} />
      <Accordion
        activeSections={activeSections}
        expandMultiple={true}
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
