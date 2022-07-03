import React, { Fragment, FunctionComponent, useState } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";
import ParsedText from "react-native-parsed-text";

import { CustomFlexSpacer, CustomSpacer, StatusBadgeColorType, TableBadge } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_ORDER_STATUS } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import {
  alignItemsEnd,
  borderBottomBlue3,
  borderBottomGray2,
  colorBlue,
  colorWhite,
  flexRow,
  fs10BoldGray5,
  fs10RegGray4,
  fs10RegGray5,
  fs18BoldBlack2,
  noBGColor,
  noBorderBottom,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh8,
  sw16,
  sw24,
  sw8,
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

  const containerStyle: ViewStyle = { backgroundColor: colorWhite._1, borderRadius: sw8 };
  const cardStyle: ViewStyle = { ...py(sh12), ...px(sw24) };

  return (
    <Fragment>
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

          const badgeTitle = details.status === "Submitted" ? SUBMISSION_SUMMARY.BADGE_SUBMITTING : details.status;

          let statusColor: StatusBadgeColorType;

          if (details.status === DICTIONARY_ORDER_STATUS.void || details.status === DICTIONARY_ORDER_STATUS.rejected) {
            statusColor = "error";
          } else if (details.status === DICTIONARY_ORDER_STATUS.submitted) {
            statusColor = "success";
          } else if (
            details.status === DICTIONARY_ORDER_STATUS.completed ||
            details.status === DICTIONARY_ORDER_STATUS.pendingInitialOrder
          ) {
            statusColor = "complete";
          } else if (details.status === DICTIONARY_ORDER_STATUS.reroutedBr || details.status === DICTIONARY_ORDER_STATUS.reroutedHq) {
            statusColor = "danger";
          } else {
            statusColor = "warning";
          }

          return (
            <Fragment key={index}>
              {isNotEmpty(details.remarks) === true ? (
                <View style={{ ...cardStyle, ...borderCheck }}>
                  <Pressable onPress={handleSetSections} style={rowCenterVertical}>
                    <Text style={fs18BoldBlack2}>{details.orderNumber}</Text>
                    <CustomSpacer isHorizontal={true} space={sw8} />
                    <IcoMoon color={colorBlue._1} name={defaultIcon} size={sw16} />
                    <CustomFlexSpacer />
                    <TableBadge text={badgeTitle} color={statusColor} />
                  </Pressable>
                  <Collapsible duration={100} collapsed={!active} style={noBGColor}>
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
                                  <View style={alignItemsEnd}>
                                    {document.remarks.map((docRemark, remark: number) => {
                                      return (
                                        <Fragment key={remark}>
                                          <ParsedText style={fs10BoldGray5} parse={[{ pattern: /\(\w+\)/, style: fs10RegGray5 }]}>
                                            {docRemark}
                                          </ParsedText>
                                        </Fragment>
                                      );
                                    })}
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
                    <TableBadge text={badgeTitle} color={statusColor} />
                  </View>
                </View>
              )}
            </Fragment>
          );
        })}
      </View>
    </Fragment>
  );
};
