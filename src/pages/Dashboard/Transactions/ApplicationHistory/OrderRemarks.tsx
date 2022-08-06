import React, { Fragment, FunctionComponent, useState } from "react";
import { Image, ImageStyle, LayoutChangeEvent, Pressable, Text, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { Badge, CustomSpacer, OutlineButton } from "../../../../components";
import { Language } from "../../../../constants/language";
import { IcoMoon } from "../../../../icons";
import {
  border,
  borderBottomGray2,
  centerHV,
  circle,
  colorBlue,
  colorGreen,
  colorWhite,
  disabledOpacity6,
  flexRow,
  flexWrap,
  fs10RegGray6,
  fs12BoldBlack2,
  fs12BoldBlue1,
  fs12RegBlack2,
  px,
  py,
  rowCenterVertical,
  sh11,
  sh14,
  sh16,
  sh4,
  sh40,
  sh8,
  sw1,
  sw100,
  sw14,
  sw16,
  sw24,
  sw278,
  sw312,
  sw340,
  sw370,
  sw4,
  sw8,
} from "../../../../styles";
import { isNotEmpty } from "../../../../utils";

const { DASHBOARD_HOME } = Language.PAGE;

interface OrderRemarksProps {
  cardStyle?: ViewStyle;
  handleNavigation?: (route: string) => void;
  remarks: IDashboardReason[];
  remarkTitle?: string;
  showIcon?: boolean;
  status: OrderStatusType | IEDDStatusType;
}

declare interface ILayoutValues {
  values: number[];
}
export const OrderRemarks: FunctionComponent<OrderRemarksProps> = ({
  cardStyle,
  handleNavigation,
  remarks,
  remarkTitle,
  status,
}: OrderRemarksProps) => {
  const [itemLayouts, setItemLayouts] = useState<ILayoutValues[]>([]);
  const [heights, setHeights] = useState<number[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const checkTitle =
    status === "BR - Rerouted" || status === "HQ - Rerouted" ? DASHBOARD_HOME.LABEL_REASON_REROUTED : DASHBOARD_HOME.LABEL_REASON_REJECTED;
  const defaultTitle = remarkTitle !== undefined ? remarkTitle : checkTitle;
  const containerStyle: ViewStyle = {
    ...px(sw16),
    ...py(sh8),
    ...border(colorWhite._1, sw1, sw8),
    backgroundColor: colorWhite._1,
    width: sw370,
    marginBottom: sh14,
    ...cardStyle,
  };
  const imageStyle: ImageStyle = {
    width: sw16,
    height: sw16,
  };

  return (
    <Fragment>
      <View>
        <View style={borderBottomGray2} />
        <CustomSpacer space={sh16} />
        <Text style={fs12RegBlack2}>{defaultTitle}</Text>
        <CustomSpacer space={sh4} />
        <View style={{ ...flexWrap, ...flexRow }}>
          {remarks.map(({ isSubmitted, isDisabled, title, content, documents }: IDashboardReason, index) => {
            let count = 0;
            let itemIndex = -1;
            if (heights[index] > sh40) {
              const numberOfLines = 2;
              let countLines = 1;
              if (itemLayouts.length > 0 && itemLayouts[index] !== undefined) {
                itemIndex = itemLayouts[index].values.findIndex((eachItem: number, eachItemIndex: number) => {
                  count = count + eachItem + sw16;
                  if (count >= sw340 || (countLines === numberOfLines && count >= sw278 && eachItemIndex !== itemLayouts.length - 1)) {
                    if (countLines !== numberOfLines) {
                      countLines++;
                      count = eachItem;
                    } else if (countLines === numberOfLines) {
                      return true;
                    }
                  }
                  return false;
                });
              }
            }
            const disabledStyle: ViewStyle =
              isDisabled === true || isSubmitted === true
                ? {
                    ...disabledOpacity6,
                  }
                : {};

            return (
              <Fragment key={index}>
                <View style={containerStyle}>
                  <View style={flexRow}>
                    {title === "Invalid Proof of Payment:" || title === "Invalid Documents:" || title === "Invalid Physical Documents:" ? (
                      <Fragment>
                        {isSubmitted === true ? (
                          <View>
                            <Badge icon={{ name: "success", size: sh8 }} style={circle(sw16, colorGreen._1)}>
                              <IcoMoon color={colorWhite._1} name="success" size={sw16} />
                            </Badge>
                          </View>
                        ) : (
                          <Image source={LocalAssets.icon.iconWarning} style={imageStyle} />
                        )}
                      </Fragment>
                    ) : (
                      <View style={{ width: sw14, height: sw14, ...centerHV, borderRadius: sw100, backgroundColor: colorBlue._1 }}>
                        <Text style={{ fontSize: sh11, color: colorWhite._1 }}>i</Text>
                      </View>
                    )}
                    <CustomSpacer isHorizontal={true} space={sw8} />
                    <View>
                      <Text style={fs12BoldBlack2}>{title}</Text>
                      {content.length > 1 && title !== "Others" ? (
                        <Fragment>
                          {content.map((eachContent: string, eachContentIndex: number) => {
                            return (
                              <View key={eachContentIndex} style={rowCenterVertical}>
                                <CustomSpacer isHorizontal={true} space={sw4} />
                                <Text style={fs10RegGray6}>{`• ${eachContent}`}</Text>
                              </View>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <Fragment>
                          {content.length > 0 ? <Text style={{ ...fs10RegGray6, maxWidth: sw312 }}>{content[0]}</Text> : null}
                        </Fragment>
                      )}
                    </View>
                  </View>
                  <CustomSpacer space={sh8} />
                  {isNotEmpty(documents) && documents!.length > 0 ? (
                    <View
                      onLayout={(event: LayoutChangeEvent) => {
                        const { height } = event.nativeEvent.layout;
                        const updatedHeights = [...heights];
                        updatedHeights[index] = height;
                        setHeights(updatedHeights);
                      }}
                      style={{ ...rowCenterVertical, ...flexWrap, ...disabledStyle }}
                      pointerEvents={isDisabled === true || isSubmitted === true ? "none" : "auto"}>
                      {documents!.map((eachProcess: IItemWithCount, eachProcessIndex: number) => {
                        const handlePress = () => {
                          if (handleNavigation !== undefined) {
                            handleNavigation(eachProcess.document);
                          }
                        };
                        const checkIcon = isSubmitted === false || isSubmitted === undefined ? "upload" : undefined;

                        return (
                          <Fragment key={eachProcessIndex}>
                            {itemIndex === -1 || eachProcessIndex < itemIndex || showAll === true ? (
                              <Fragment>
                                <View
                                  key={eachProcessIndex}
                                  onLayout={(event: LayoutChangeEvent) => {
                                    const { width } = event.nativeEvent.layout;
                                    const updatedLayouts = [...itemLayouts];
                                    const updatedValues = updatedLayouts[index] !== undefined ? updatedLayouts[index].values : [];
                                    updatedValues[eachProcessIndex] = width;
                                    updatedLayouts[index] = { values: updatedValues };
                                    setItemLayouts(updatedLayouts);
                                  }}
                                  style={{ marginBottom: sh8, marginRight: sw16 }}>
                                  <OutlineButton
                                    badgeCount={eachProcess.count > 1 ? eachProcess.count : undefined}
                                    color={colorBlue._1}
                                    icon={checkIcon}
                                    onPress={handlePress}
                                    text={eachProcess.document}
                                  />
                                </View>
                              </Fragment>
                            ) : null}
                          </Fragment>
                        );
                      })}
                      {showAll === false && itemIndex !== -1 ? (
                        <View style={rowCenterVertical}>
                          <Pressable onPress={handleShowAll}>
                            <View>
                              <Text style={fs12BoldBlue1}>{`+${documents!.length - itemIndex} more`}</Text>
                            </View>
                          </Pressable>
                        </View>
                      ) : null}
                    </View>
                  ) : null}
                </View>
                {index % 2 === 0 ? <CustomSpacer isHorizontal={true} space={sw24} /> : null}
              </Fragment>
            );
          })}
        </View>
      </View>
    </Fragment>
  );
};
