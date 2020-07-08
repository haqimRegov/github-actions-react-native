import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorGray,
  colorTransparent,
  colorWhite,
  customShadow,
  flexRow,
  fs16SemiBoldBlack2,
  noBorderBottom,
  px,
  sh20,
  sh5,
  sh56,
  sh8,
  sw10,
  sw20,
  sw24,
} from "../../styles";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

export const BasicAccordion: FunctionComponent<IBasicAccordionProps> = ({
  headerStyle,
  expandMultiple,
  hideIcon,
  icon,
  sections,
  spaceInBetween,
  titleStyle,
}: IBasicAccordionProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const handleSetSections = (section: number[]) => {
    setActiveSections(section);
  };

  const renderContent = (section: IAccordionSection) => {
    return section.content;
  };

  const renderHeader = (section: IAccordionSection) => {
    const defaultHeaderStyle: ViewStyle = {
      ...centerVertical,
      ...customShadow(colorGray._4, sh5, 0, 0.5, sh20),
      ...flexRow,
      ...px(sw24),
      backgroundColor: colorWhite._1,
      borderRadius: sw10,
      height: sh56,
      ...headerStyle,
    };

    const current = sections.indexOf(section);
    const defaultStyle = activeSections.includes(current) ? { ...defaultHeaderStyle, ...noBorderBottom } : defaultHeaderStyle;
    const defaultIcon = activeSections.includes(current) ? "caret-up" : "caret-down";
    const customIcon = icon !== undefined ? icon : defaultIcon;
    const defaultSpaceInBetween = spaceInBetween !== undefined ? spaceInBetween : sh8;

    return (
      <Fragment>
        {current === 0 ? null : <CustomSpacer space={defaultSpaceInBetween} />}
        <View style={defaultStyle}>
          <Text style={{ ...fs16SemiBoldBlack2, ...titleStyle }}>{section.title}</Text>
          <CustomFlexSpacer />
          {hideIcon === true ? null : <IcoMoon name={customIcon} size={sw20} />}
        </View>
      </Fragment>
    );
  };

  return (
    <Accordion
      activeSections={activeSections}
      expandMultiple={expandMultiple}
      onChange={handleSetSections}
      renderContent={renderContent}
      renderHeader={renderHeader}
      sections={sections}
      touchableProps={{ underlayColor: colorTransparent }}
      underlayColor={colorWhite._1}
    />
  );
};
