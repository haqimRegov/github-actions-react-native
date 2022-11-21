import React, { Fragment, FunctionComponent, useState } from "react";
import { Pressable, ScrollView, Text, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";
import ParsedText from "react-native-parsed-text";

import { CustomFlexSpacer, CustomSpacer, TableBadge } from "../../components";
import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  alignItemsEnd,
  borderBottomBlue3,
  borderBottomGray2,
  colorBlue,
  colorWhite,
  colorYellow,
  flexGrow,
  flexRow,
  fs10BoldGray5,
  fs10RegGray4,
  fs18BoldBlack2,
  noBGColor,
  noBorderBottom,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh296,
  sh8,
  sw16,
  sw24,
  sw288,
  sw440,
  sw448,
  sw8,
  sw96,
} from "../../styles";
import { isNotEmpty } from "../../utils";

const { SUBMISSION_SUMMARY } = Language.PAGE;

interface SubmissionSummaryCollapsibleProps {
  data: ISubmissionSummaryOrder[];
}

export const SubmissionSummaryCollapsible: FunctionComponent<SubmissionSummaryCollapsibleProps> = ({
  data,
}: SubmissionSummaryCollapsibleProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([0]);

  const containerStyle: ViewStyle = { backgroundColor: colorWhite._1, borderRadius: sw8, width: sw440 };
  const cardStyle: ViewStyle = { ...py(sh12), ...px(sw24) };

  return (
    <Fragment>
      <ScrollView scrollEnabled={data.length > 4} contentContainerStyle={flexGrow} style={{ maxHeight: sh296, width: sw448 }}>
        <View style={containerStyle}>
          {data.map((details: ISubmissionSummaryOrder, index: number) => {
            const active = activeSections.includes(index);
            const defaultIcon = active ? "caret-up" : "caret-down";

            const handleSetSections = () => {
              let newSections = [...activeSections];
              const findSection = newSections.indexOf(index);
              if (findSection === -1) {
                newSections = [index];
              } else {
                newSections.splice(findSection, 1);
              }
              setActiveSections(newSections);
            };

            const borderCheck: ViewStyle = index === data.length - 1 ? noBorderBottom : borderBottomBlue3;

            return (
              <Fragment key={index}>
                {isNotEmpty(details.remarks) === true && details.remarks.length > 0 ? (
                  <View style={{ ...cardStyle, ...borderCheck }}>
                    <Pressable onPress={handleSetSections} style={rowCenterVertical}>
                      <Text style={fs18BoldBlack2}>{details.orderNumber}</Text>
                      <CustomSpacer isHorizontal={true} space={sw8} />
                      <IcoMoon color={colorBlue._1} name={defaultIcon} size={sw16} />
                      <CustomFlexSpacer />
                      <TableBadge text={SUBMISSION_SUMMARY.BADGE_SUBMITTING} color="success" />
                    </Pressable>
                    <Collapsible duration={120} collapsed={!active} style={noBGColor}>
                      <View>
                        <CustomSpacer space={sh12} />
                        <View style={{ ...borderBottomGray2, ...px(sw24) }} />
                        <CustomSpacer space={sh12} />
                        {isNotEmpty(details.remarks) ? (
                          <Fragment>
                            {details.remarks.map((document, docIndex: number) => {
                              return (
                                <Fragment key={docIndex}>
                                  <View style={flexRow}>
                                    <Text style={fs10RegGray4}>{document.title}</Text>
                                    <CustomFlexSpacer />
                                    <View style={{ ...flexRow, maxWidth: sw288 }}>
                                      {document.otherRemarks !== undefined ? (
                                        <Fragment>
                                          <View style={{ ...alignItemsEnd, minWidth: sw96 }}>
                                            {document.otherRemarks.map((otherRemarks, remark: number) => {
                                              return (
                                                <Text key={remark} style={{ ...fs10BoldGray5, color: colorYellow._2 }}>
                                                  {otherRemarks}
                                                </Text>
                                              );
                                            })}
                                          </View>
                                          <CustomSpacer isHorizontal={true} space={sw8} />
                                        </Fragment>
                                      ) : null}

                                      <View style={{ ...alignItemsEnd, minWidth: sw96 }}>
                                        {document.remarks.map((docRemark, remark: number) => {
                                          return (
                                            <Fragment key={remark}>
                                              <ParsedText
                                                style={fs10BoldGray5}
                                                parse={[
                                                  {
                                                    pattern: /(?:Principal Holder|Joint Holder|Principal & Joint Holder)/,
                                                    style: fs10RegGray4,
                                                  },
                                                ]}>
                                                {docRemark}
                                              </ParsedText>
                                            </Fragment>
                                          );
                                        })}
                                      </View>
                                    </View>
                                  </View>
                                  {docIndex === details.remarks.length - 1 ? null : (
                                    <Fragment>
                                      <CustomSpacer space={sh8} />
                                      <View style={borderBottomGray2} />
                                      <CustomSpacer space={sh8} />
                                    </Fragment>
                                  )}
                                </Fragment>
                              );
                            })}
                          </Fragment>
                        ) : null}
                      </View>
                    </Collapsible>
                  </View>
                ) : (
                  <View style={cardStyle}>
                    <View style={rowCenterVertical}>
                      <Text style={fs18BoldBlack2}>{details.orderNumber}</Text>
                      <CustomFlexSpacer />
                      <TableBadge text={SUBMISSION_SUMMARY.BADGE_SUBMITTING} color="success" />
                    </View>
                  </View>
                )}
              </Fragment>
            );
          })}
        </View>
      </ScrollView>
    </Fragment>
  );
};
