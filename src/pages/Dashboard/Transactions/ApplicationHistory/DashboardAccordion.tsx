import React, { Fragment, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, OutlineButton } from "../../../../components";
import { Language, NunitoBold } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
import {
  alignSelfEnd,
  border,
  borderBottomGray3,
  centerHV,
  colorBlue,
  colorRed,
  colorTransparent,
  flexRow,
  flexWrap,
  fs12BoldBlue1,
  fs12BoldGray6,
  fs12RegGray5,
  fs12RegGray6,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh16,
  sh32,
  sh8,
  sw1,
  sw12,
  sw16,
  sw24,
  sw360,
  sw4,
  sw648,
  sw8,
} from "../../../../styles";
import { isArrayNotEmpty, isNotEmpty } from "../../../../utils";
import { OrderRemarks } from "./OrderRemarks";

const { DASHBOARD_HOME } = Language.PAGE;

interface IDashboardAccordionProps {
  handleSelectOrder?: (item: IDashboardOrder) => void;
  item: IDashboardOrder;
  remarkTitle?: string;
  setScreen: (route: TransactionsPageType) => void;
  setCurrentOrder: (order: IDashboardOrder) => void;
  setOrderSummaryActiveTab: (tab: OrderSummaryTabType) => void;
}

export const DashboardAccordion: React.FunctionComponent<IDashboardAccordionProps> = ({
  handleSelectOrder,
  item,
  remarkTitle,
  setCurrentOrder,
  setOrderSummaryActiveTab,
  setScreen,
}: IDashboardAccordionProps) => {
  const { documents, highlightedText, isScheduled, reason, status, withHardcopy } = item;
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleNavigation = (route: string) => {
    setCurrentOrder(item);
    if (route !== "Submission Summary Receipt") {
      switch (item.status) {
        case "Pending Payment":
        case "Pending Doc & Payment":
        case "BR - Rerouted":
        case "HQ - Rerouted":
          if (route === "Certificate of Loss of Nationality" || route.includes("NRIC")) {
            setScreen("UploadDocuments");
          } else {
            setScreen("DashboardPayment");
          }
          break;
        case "Pending Doc":
          setScreen("UploadDocuments");
          break;
        case "Pending Physical Doc":
          setScreen("UploadHardCopy");
          break;
        default:
          setScreen("DashboardPayment");
      }
    } else if (handleSelectOrder !== undefined) {
      handleSelectOrder(item);
    }
  };

  const handleTrackStatus = () => {
    setCurrentOrder(item);
    setOrderSummaryActiveTab("tracking");
    setScreen("OrderSummary");
  };

  const getStatusDescription = () => {
    switch (status) {
      case "Pending Doc":
        return DASHBOARD_HOME.DESCRIPTION_STATUS_DOC;
      case "Pending Doc & Payment":
        return DASHBOARD_HOME.DESCRIPTION_STATUS_DOC_PAYMENT;
      case "Pending Payment":
        return isScheduled === true ? DASHBOARD_HOME.DESCRIPTION_STATUS_RECURRING : DASHBOARD_HOME.DESCRIPTION_STATUS_PAYMENT;
      case "Pending Physical Doc":
        return DASHBOARD_HOME.DESCRIPTION_STATUS_PHYSICAL;
      case "Pending Initial Order":
        return DASHBOARD_HOME.DESCRIPTION_STATUS_INITIAL;
      case "Submitted":
        return DASHBOARD_HOME.DESCRIPTION_STATUS_SUBMITTED;
      case "BR - Rerouted":
      case "HQ - Rerouted":
        return DASHBOARD_HOME.DESCRIPTION_STATUS_REROUTED;
      case "Rejected":
        return DASHBOARD_HOME.DESCRIPTION_STATUS_REJECTED;
      case "Void":
        return DASHBOARD_HOME.DESCRIPTION_STATUS_VOID;
      default:
        return "";
    }
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  let count = 0;
  let itemIndex = -1;
  if (itemWidths.filter((eachItem: number) => eachItem !== undefined).length === documents.length) {
    itemIndex = itemWidths.findIndex((eachItem: number, eachItemIndex: number) => {
      count += eachItem;
      if (count >= sw360) {
        return true;
      }
      count = eachItemIndex !== 0 ? count + sw16 : count;
      return false;
    });
  }
  const itemsLabel = isArrayNotEmpty(documents) ? DASHBOARD_HOME.LABEL_PENDING_ITEMS : null;

  const buttonStyle: ViewStyle = {
    ...border(colorBlue._1, sw1, sw24),
    backgroundColor: colorTransparent,
    height: sh32,
  };
  const checkMaxWidth = showAll === false ? { maxWidth: sw360 } : {};
  const itemContainerStyle: ViewStyle = {
    ...rowCenterVertical,
    ...checkMaxWidth,
    ...flexWrap,
  };
  const sideElementContainer: ViewStyle = { ...flexRow, ...centerHV, borderBottomColor: colorRed._1, borderBottomWidth: sw1 };
  const containerStyle: ViewStyle = {
    ...px(sw16),
    ...py(sh12),
    backgroundColor: colorBlue._2,
    borderBottomLeftRadius: sw8,
    borderBottomRightRadius: sw8,
  };

  return (
    <Pressable onPress={() => {}}>
      <View style={containerStyle}>
        <View style={flexRow}>
          <View style={{ maxWidth: sw648 }}>
            <Text style={fs12BoldGray6}>{status}</Text>
            {isNotEmpty(highlightedText) &&
            highlightedText !== "" &&
            ((status === "Submitted" && withHardcopy === true) || status === "Completed") ? (
              <Text style={fs12RegGray5}>
                {status === "Completed"
                  ? DASHBOARD_HOME.DESCRIPTION_STATUS_COMPLETED_1
                  : DASHBOARD_HOME.DESCRIPTION_STATUS_SUBMITTED_HARDCOPY_1}
                <Text style={{ ...fs12RegGray5, fontFamily: NunitoBold }}>{` ${highlightedText}. `}</Text>
                {status === "Completed"
                  ? DASHBOARD_HOME.DESCRIPTION_STATUS_COMPLETED_2
                  : DASHBOARD_HOME.DESCRIPTION_STATUS_SUBMITTED_HARDCOPY_2}
              </Text>
            ) : (
              <Text style={fs12RegGray5}>{getStatusDescription()}</Text>
            )}
          </View>
          {status !== "Pending Payment" &&
          status !== "Pending Doc & Payment" &&
          status !== "Pending Doc" &&
          status !== "Pending Physical Doc" ? (
            <Fragment>
              <CustomFlexSpacer />
              <View style={alignSelfEnd}>
                <TouchableWithoutFeedback onPress={handleTrackStatus}>
                  <View style={sideElementContainer}>
                    <Text style={fs12BoldBlue1}>{DASHBOARD_HOME.LABEL_TRACK_STATUS}</Text>
                    <CustomSpacer isHorizontal={true} space={sw4} />
                    <IcoMoon name="arrow-right" color={colorBlue._1} size={sw12} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </Fragment>
          ) : null}
        </View>
        <CustomSpacer space={sh16} />
        {isArrayNotEmpty(documents) ? (
          <View>
            <View style={borderBottomGray3} />
            <CustomSpacer space={sh16} />
            {documents[0].document !== "Submission Summary Receipt" ? <Text style={fs12RegGray6}>{itemsLabel}</Text> : null}
            <View style={rowCenterVertical}>
              <View style={{ ...itemContainerStyle }}>
                {documents.map((eachContent: IItemWithCount, eachContentIndex: number) => {
                  const handlePress = () => {
                    handleNavigation(eachContent.document);
                  };
                  const checkDownload = eachContent.document === "Submission Summary Receipt" ? "download" : "upload";
                  const checkIcon = eachContent.document === "Recurring Info" ? "plus" : checkDownload;
                  return (
                    <View key={eachContent.document}>
                      <CustomSpacer space={sh8} />
                      <View style={flexRow}>
                        {itemIndex === -1 || eachContentIndex < itemIndex || showAll === true ? (
                          <Fragment>
                            <View
                              onLayout={(event: LayoutChangeEvent) => {
                                const { width } = event.nativeEvent.layout;
                                const updatedWidth = [...itemWidths];
                                updatedWidth[eachContentIndex] = width;
                                setItemWidths(updatedWidth);
                              }}>
                              <OutlineButton
                                badgeCount={eachContent.count > 1 ? eachContent.count : undefined}
                                buttonStyle={buttonStyle}
                                color={colorBlue._1}
                                icon={checkIcon}
                                onPress={handlePress}
                                text={eachContent.document}
                              />
                            </View>
                            {eachContentIndex !== documents.length - 1 ? <CustomSpacer isHorizontal={true} space={sw16} /> : null}
                          </Fragment>
                        ) : null}
                      </View>
                    </View>
                  );
                })}
              </View>
              {showAll === false && itemIndex !== -1 ? (
                <View>
                  <CustomSpacer space={sh8} />
                  <View style={rowCenterVertical}>
                    <CustomSpacer isHorizontal={true} space={sw16} />
                    <Pressable onPress={handleShowAll}>
                      <View>
                        <Text style={fs12BoldBlue1}>{`+${documents.length - itemIndex} more`}</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        ) : null}
        {isNotEmpty(reason) && reason.length > 0 ? (
          <OrderRemarks handleNavigation={handleNavigation} remarkTitle={remarkTitle} remarks={reason} status={status} />
        ) : null}
      </View>
    </Pressable>
  );
};
