import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { CustomFlexSpacer, CustomSpacer } from "../../components";
import { IcoMoon } from "../../icons";
import {
  borderBottomGray2,
  centerHorizontal,
  centerVertical,
  colorWhite,
  flexRow,
  flexShrink,
  flexWrap,
  fs10RegGray6,
  fs12BoldGray6,
  fs14BoldGray6,
  fs16BoldBlue1,
  fsAlignCenter,
  justifyContentEnd,
  noBGColor,
  px,
  sh16,
  sh17,
  sh56,
  sh8,
  shadow16Blue112,
  sw14,
  sw20,
  sw24,
  sw8,
} from "../../styles";

interface TermsAccordionProps {
  expandAll?: boolean;
  expandMultiple?: boolean;
  headerStyle?: ViewStyle;
  hideIcon?: boolean;
  icon?: string;
  sections: ITermsAccordionSection[];
  spaceInBetween?: number;
  titleStyle?: TextStyle;
}

export const TermsAccordion: FunctionComponent<TermsAccordionProps> = ({
  expandAll,
  expandMultiple,
  headerStyle,
  hideIcon,
  icon,
  sections,
  spaceInBetween,
  titleStyle,
}: TermsAccordionProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

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
  const defaultHeaderStyle: ViewStyle = {
    // ...centerVertical,
    ...shadow16Blue112,
    // ...flexRow,
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
    minHeight: sh56,
    ...headerStyle,
  };

  const defaultSpaceInBetween = spaceInBetween !== undefined ? spaceInBetween : sh8;

  return (
    <View>
      {sections.map((section: ITermsAccordionSection, index: number) => {
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
                  <View style={{ ...flexRow, height: sh56, ...centerVertical, ...px(sw24) }}>
                    <Text style={{ ...fs16BoldBlue1, ...titleStyle }}>{title}</Text>
                    <CustomFlexSpacer />
                    {hideIcon === true ? null : <IcoMoon name={customIcon} size={sw20} />}
                  </View>
                </TouchableWithoutFeedback>
              </Fragment>
              <Collapsible duration={200} collapsed={!active} style={noBGColor}>
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
                                <View style={borderBottomGray2} />
                                <CustomSpacer space={sh16} />
                              </Fragment>
                            ) : null}
                            <View style={px(sw24)}>
                              {terms.heading !== undefined ? <Text style={fs14BoldGray6}>{terms.heading}</Text> : null}
                              <CustomSpacer space={sh8} />
                              {terms.termsList.map((term, insideIndex) => {
                                return (
                                  <Fragment key={insideIndex}>
                                    <View>
                                      {term.label === undefined ? null : (
                                        <Fragment>
                                          <CustomSpacer space={sh8} />
                                          <Text style={fs12BoldGray6}>{term.label}</Text>
                                        </Fragment>
                                      )}
                                      {term.content.map((line: IContent, contentIndex: number) => {
                                        const defaultWidth = line.prefix === "•" ? sw14 : sw20;
                                        const defaultPrefixIndentSpace =
                                          line.prefixIndentSpace !== undefined ? line.prefixIndentSpace : sw8;
                                        return (
                                          <Fragment key={contentIndex}>
                                            <View style={{ ...flexRow }}>
                                              {line.indentSpace !== undefined ? (
                                                <CustomSpacer isHorizontal={true} space={line.indentSpace} />
                                              ) : null}
                                              {line.prefix !== undefined ? (
                                                <>
                                                  <View style={{ ...flexRow, ...justifyContentEnd, width: defaultWidth }}>
                                                    <View style={{ ...centerHorizontal, height: sh17 }}>
                                                      <Text style={{ ...fs10RegGray6, ...fsAlignCenter }}>{line.prefix}</Text>
                                                    </View>
                                                    {line.prefixIndent !== undefined && line.prefixIndent === false ? null : (
                                                      <CustomSpacer isHorizontal={true} space={defaultPrefixIndentSpace} />
                                                    )}
                                                  </View>
                                                </>
                                              ) : null}
                                              <Text style={{ ...fs10RegGray6, ...flexWrap, ...flexShrink }}>{line.text}</Text>
                                            </View>
                                            <CustomSpacer space={sh16} />
                                          </Fragment>
                                        );
                                      })}
                                    </View>
                                    <CustomSpacer space={sh16} />
                                  </Fragment>
                                );
                              })}
                            </View>
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
