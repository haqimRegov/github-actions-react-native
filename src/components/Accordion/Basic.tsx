import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import { IcoMoon } from "../../icons";
import {
  borderBottomBlack21,
  centerVertical,
  colorTransparent,
  colorWhite,
  flexRow,
  fs12BoldBlack2,
  fs14BoldBlack2,
  fs14RegBlack2,
  fs16BoldBlue2,
  noBorderBottom,
  px,
  sh16,
  sh24,
  sh56,
  sh8,
  shadowBlue5,
  sw20,
  sw24,
  sw8,
} from "../../styles";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

export const BasicAccordion: FunctionComponent<IBasicAccordionProps> = ({
  expandAll,
  expandMultiple,
  headerStyle,
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
    return (
      <View style={{ backgroundColor: colorWhite._1, borderBottomLeftRadius: sw8, borderBottomRightRadius: sw8 }}>
        {section.sections.map((terms, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 ? (
                <Fragment>
                  <View style={borderBottomBlack21} />
                  <CustomSpacer space={sh16} />
                </Fragment>
              ) : null}
              {terms.heading !== undefined ? <Text style={{ ...fs14BoldBlack2, ...px(sw24) }}>{terms.heading}</Text> : null}
              <CustomSpacer space={sh8} />
              {terms.termsList.map((term, insideIndex) => {
                return (
                  <Fragment key={insideIndex}>
                    <View style={px(sw24)}>
                      {term.label === undefined ? null : (
                        <Fragment>
                          <CustomSpacer space={sh8} />
                          <Text style={fs12BoldBlack2}>{term.label}</Text>
                        </Fragment>
                      )}
                      <Text style={{ ...fs14RegBlack2, lineHeight: sh24 }}>{term.content}</Text>
                    </View>
                    <CustomSpacer space={sh16} />
                  </Fragment>
                );
              })}
            </Fragment>
          );
        })}
      </View>
    );
  };

  const renderHeader = (section: IAccordionSection) => {
    const defaultHeaderStyle: ViewStyle = {
      ...centerVertical,
      ...shadowBlue5,
      ...flexRow,
      ...px(sw24),
      backgroundColor: colorWhite._1,
      borderRadius: sw8,
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
          <Text style={{ ...fs16BoldBlue2, ...titleStyle }}>{section.title}</Text>
          <CustomFlexSpacer />
          {hideIcon === true ? null : <IcoMoon name={customIcon} size={sw20} />}
        </View>
      </Fragment>
    );
  };

  useEffect(() => {
    if (expandAll === true) {
      const allActiveSections: number[] = [];
      sections.forEach((_section, index) => {
        return allActiveSections.push(index);
      });
      setActiveSections(allActiveSections);
    } else {
      setActiveSections([]);
    }
  }, [expandAll, sections]);

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
