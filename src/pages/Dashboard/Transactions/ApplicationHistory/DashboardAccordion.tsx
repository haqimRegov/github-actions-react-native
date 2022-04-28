import React, { Fragment, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { CustomFlexSpacer, CustomSpacer, OutlineButton } from "../../../../components";
import { Language } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
import {
  alignSelfEnd,
  border,
  borderBottomGray2,
  centerHV,
  colorBlue,
  colorRed,
  colorTransparent,
  flexRow,
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
import { isNotEmpty } from "../../../../utils";
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
  const { documents, reason, status, label } = item;
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleNavigation = (route: string) => {
    setCurrentOrder(item);
    switch (route) {
      case "Proof of Payment":
      case "Recurring Info":
        setScreen("DashboardPayment");
        break;
      case "Certificate of Lost of Nationality":
      case "Certificate of Loss of Nationality":
      case "NRIC":
      case "NRIC - Front":
      case "NRIC - Back":
        setScreen("UploadDocuments");
        break;
      case "EPF 9N form + IC Copies":
      case "EPF 9N Form":
      case "UT Account Opening/Transaction":
      case "W8-Ben":
      case "W9":
        setScreen("UploadHardCopy");
        break;
      case "Submission Summary Receipt":
        if (handleSelectOrder !== undefined) {
          handleSelectOrder(item);
        }
        break;
      default:
        setScreen("DashboardPayment");
    }
  };

  const handleTrackStatus = () => {
    setCurrentOrder(item);
    setOrderSummaryActiveTab("tracking");
    setScreen("OrderSummary");
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
  const itemsLabel =
    isNotEmpty(documents) && documents !== undefined && documents.length > 1
      ? DASHBOARD_HOME.LABEL_PENDING_ITEMS
      : DASHBOARD_HOME.LABEL_PENDING_ITEM;
  const buttonStyle: ViewStyle = {
    ...border(colorBlue._1, sw1, sw24),
    backgroundColor: colorTransparent,
    height: sh32,
  };
  const checkMaxWidth = showAll === false ? { maxWidth: sw360 } : {};
  const itemContainerStyle: ViewStyle = {
    ...rowCenterVertical,
    ...checkMaxWidth,
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
            <Text style={fs12RegGray5}>{label}</Text>
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
        {isNotEmpty(documents) && documents!.length > 0 ? (
          <View>
            <View style={borderBottomGray2} />
            <CustomSpacer space={sh16} />
            <Text style={fs12RegGray6}>{itemsLabel}</Text>
            <CustomSpacer space={sh8} />
            <View style={rowCenterVertical}>
              <View style={{ ...itemContainerStyle }}>
                {documents!.map((eachContent: IItemWithCount, eachContentIndex: number) => {
                  const handlePress = () => {
                    handleNavigation(eachContent.document);
                  };
                  const checkIcon = eachContent.document === "Recurring Info" ? "plus" : "upload";
                  return (
                    <View key={eachContent.document} style={flexRow}>
                      {itemIndex === -1 || eachContentIndex < itemIndex || showAll === true ? (
                        <Fragment>
                          {eachContentIndex !== 0 ? <CustomSpacer isHorizontal={true} space={sw16} /> : null}
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
                        </Fragment>
                      ) : null}
                    </View>
                  );
                })}
              </View>
              {showAll === false && itemIndex !== -1 ? (
                <View style={rowCenterVertical}>
                  <CustomSpacer isHorizontal={true} space={sw16} />
                  <Pressable onPress={handleShowAll}>
                    <View>
                      <Text style={fs12BoldBlue1}>{`+${documents!.length - itemIndex} more`}</Text>
                    </View>
                  </Pressable>
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
