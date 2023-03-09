import React, { Fragment, FunctionComponent } from "react";
import { Pressable, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";
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
  fs12RegGray6,
  fs14BoldGray6,
  fs16BoldBlue1,
  fsAlignCenter,
  justifyContentEnd,
  noBGColor,
  px,
  py,
  sh16,
  sh17,
  sh424,
  sh56,
  sh8,
  shadow16Blue112,
  sw14,
  sw16,
  sw20,
  sw24,
  sw8,
} from "../../styles";

interface TermsAccordionNewProps {
  activeSections: number[];
  expandMultiple?: boolean;
  headerStyle?: ViewStyle;
  hideIcon?: boolean;
  icon?: string;
  sections: ITermsAccordionSection[];
  setActiveSections: (updateSections: number[]) => void;
  spaceInBetween?: number;
  titleStyle?: TextStyle;
}

export const TermsAccordionNew: FunctionComponent<TermsAccordionNewProps> = ({
  activeSections,
  expandMultiple,
  headerStyle,
  hideIcon,
  icon,
  sections,
  setActiveSections,
  spaceInBetween,
  titleStyle,
}: TermsAccordionNewProps) => {
  const defaultHeaderStyle: ViewStyle = {
    // ...centerVertical,
    ...shadow16Blue112,
    // ...flexRow,
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
    minHeight: sh56,
    ...headerStyle,
  };
  const outerContentContainerStyle: ViewStyle = {
    ...px(sw16),
    marginBottom: sh16,
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sh8,
    borderBottomRightRadius: sh8,
  };
  const innerContentContainerStyle: ViewStyle = {
    ...px(sw16),
    ...py(sh16),
    backgroundColor: colorWhite._2,
    borderRadius: sh8,
    height: sh424,
  };

  const defaultSpaceInBetween = spaceInBetween !== undefined ? spaceInBetween : sh8;

  return (
    <View>
      {sections.map((section: ITermsAccordionSection, index: number) => {
        const { custom, subsection, title } = section;
        const active = activeSections.includes(index);
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

        // todo All New Sales/Topup/Switching/Transfer/Redemption without opening a new account, will only display these two TC&s:
        // todo Transactions Terms and Conditions General Terms and Conditions */
        return (
          <Fragment key={index}>
            {index === 0 ? null : <CustomSpacer space={defaultSpaceInBetween} />}

            <View style={defaultHeaderStyle}>
              <Fragment>
                <Pressable onPress={handleSetSections} style={{ ...flexRow, height: sh56, ...centerVertical, ...px(sw24) }}>
                  <Text style={{ ...fs16BoldBlue1, ...titleStyle }}>{title}</Text>
                  <CustomFlexSpacer />
                  {hideIcon === true ? null : <IcoMoon name={customIcon} size={sw20} />}
                </Pressable>
              </Fragment>

              <Collapsible duration={200} collapsed={!active} style={noBGColor}>
                {custom !== undefined ? (
                  custom
                ) : (
                  <View style={outerContentContainerStyle}>
                    <ScrollView style={innerContentContainerStyle}>
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
                              <View>
                                {terms.heading !== undefined ? <Text style={fs14BoldGray6}>{terms.heading}</Text> : null}
                                <CustomSpacer space={sh8} />
                                {terms.termsList.map((term, insideIndex) => {
                                  return (
                                    <Fragment key={insideIndex}>
                                      <View>
                                        {term.label === undefined ? null : (
                                          <Fragment>
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
                                                <Text style={{ ...fs12RegGray6, ...flexWrap, ...flexShrink }}>{line.text}</Text>
                                              </View>

                                              {term.content.length - 1 === contentIndex ? null : <CustomSpacer space={sh8} />}
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
                    </ScrollView>
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
