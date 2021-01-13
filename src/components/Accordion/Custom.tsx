import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { IcoMoon } from "../../icons";
import {
  borderBottomBlack21,
  centerVertical,
  colorWhite,
  flexRow,
  fs12BoldBlack2,
  fs14BoldBlack2,
  fs14RegBlack2,
  fs16BoldBlue2,
  noBGColor,
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

interface CustomAccordionProps {
  sections: ICustomAccordionSection[];

  expandAll?: boolean;
  expandMultiple?: boolean;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  hideIcon?: boolean;
  icon?: string;
  spaceInBetween?: number;
}

export const CustomAccordion: FunctionComponent<CustomAccordionProps> = ({
  sections,
  expandAll,
  expandMultiple,
  headerStyle,
  hideIcon,
  icon,
  spaceInBetween,
  titleStyle,
}: CustomAccordionProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  useEffect(() => {
    if (expandAll === true) {
      const allActiveSections: number[] = [];
      sections.map((_section, index) => {
        return allActiveSections.push(index);
      });
      setActiveSections(allActiveSections);
    } else {
      setActiveSections([]);
    }
  }, [expandAll, sections]);
  const defaultHeaderStyle: ViewStyle = {
    // ...centerVertical,
    ...shadowBlue5,
    // ...flexRow,
    ...px(sw24),
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
    minHeight: sh56,
    ...headerStyle,
  };

  const defaultSpaceInBetween = spaceInBetween !== undefined ? spaceInBetween : sh8;

  return (
    <View>
      {sections.map((section: ICustomAccordionSection, index: number) => {
        const { custom, subsection, title } = section;
        const active = activeSections.includes(index);
        // const defaultStyle = active ? { ...defaultHeaderStyle, ...noBorderBottom } : defaultHeaderStyle;
        const defaultIcon = active ? "caret-up" : "caret-down";
        const customIcon = icon !== undefined ? icon : defaultIcon;

        const handleSetSections = () => {
          let newSections = [...activeSections];
          const findSection = newSections.indexOf(index);
          if (findSection === -1) {
            if (expandMultiple === true) {
              newSections.push(index);
            } else {
              newSections = [index];
            }
          } else {
            newSections.splice(findSection, 1);
          }
          setActiveSections(newSections);
        };
        return (
          <Fragment key={index}>
            {index === 0 ? null : <CustomSpacer space={defaultSpaceInBetween} />}
            <View style={defaultHeaderStyle}>
              <Fragment>
                <TouchableWithoutFeedback onPress={handleSetSections}>
                  <View style={{ ...flexRow, height: sh56, ...centerVertical }}>
                    <Text style={{ ...fs16BoldBlue2, ...titleStyle }}>{title}</Text>
                    <CustomFlexSpacer />
                    {hideIcon === true ? null : <IcoMoon name={customIcon} size={sw20} />}
                  </View>
                </TouchableWithoutFeedback>
              </Fragment>
              <Collapsible duration={200} collapsed={!active} style={{ ...noBGColor }}>
                {custom !== undefined ? (
                  custom
                ) : (
                  <View>
                    {subsection !== undefined &&
                      subsection.map((terms, subsectionIndex) => {
                        return (
                          <Fragment key={subsectionIndex}>
                            {subsectionIndex !== 0 ? (
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
                )}
              </Collapsible>
            </View>
          </Fragment>
        );
      })}
    </View>
  );
};
