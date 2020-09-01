import React, { FunctionComponent, ReactNode, useState } from "react";
import { LayoutChangeEvent, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerVertical, colorBlack, fs12BoldWhite1, px, py, sh12, sh24, sw12, sw264, sw32, sw8 } from "../../styles";

export interface IPopupLayout {
  height: number;
  width: number;
}
interface CustomPopupProps {
  containerStyle?: ViewStyle;
  children: JSX.Element;
  color?: string;
  direction?: "top" | "left" | "bottom" | "right";
  popupContent?: ReactNode;
  popupOnPress?: (toggle: boolean) => void;
  popupStyle?: ViewStyle;
  popupText?: string;
  textStyle?: TextStyle;
  show?: boolean;
  spaceToPopup?: number;
}

export const CustomPopup: FunctionComponent<CustomPopupProps> = ({
  children,
  containerStyle,
  color,
  direction,
  popupContent,
  popupOnPress,
  popupStyle,
  popupText,
  show,
  spaceToPopup,
  textStyle,
}: CustomPopupProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [basePosition, setBasePosition] = useState<IPopupLayout>({ height: 0, width: 0 });
  const [popupPosition, setPopupPosition] = useState<IPopupLayout>({ height: 0, width: 0 });

  const spaceToIcon = spaceToPopup || 0;
  const iconOffsetSpace = spaceToIcon - 22;

  let arrowIcon = "arrow-solid-left";
  let flexDirection: "row" | "column" | "row-reverse" | "column-reverse" = direction === "top" || direction === "bottom" ? "column" : "row";
  let iconOffset: ViewStyle = { right: -sw12 };
  let leftPosition = basePosition.width + iconOffsetSpace;
  let topPosition = -popupPosition.height / 2 + basePosition.height / 2;

  if (direction === "left") {
    arrowIcon = "arrow-solid-right";
    flexDirection = "row-reverse";
    leftPosition = -popupPosition.width - iconOffsetSpace;
  }
  if (direction === "top") {
    arrowIcon = "arrow-solid-down";
    flexDirection = "column-reverse";
    iconOffset = { top: sw12 };
    leftPosition = -popupPosition.width / 2 + basePosition.width / 2;
    topPosition = -popupPosition.height - iconOffsetSpace;
  }
  if (direction === "bottom") {
    arrowIcon = "arrow-solid-up";
    iconOffset = { top: sw12 };
    leftPosition = -popupPosition.width / 2 + basePosition.width / 2;
    topPosition = 0 + iconOffsetSpace + basePosition.height;
  }

  const popupColor = color !== undefined ? color : colorBlack._2;

  const handlePress = () => {
    setShowPopup(!showPopup);
    popupOnPress!(!showPopup);
  };

  const handleBaseLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setBasePosition({ width, height });
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setPopupPosition({ width, height });
  };

  const container: ViewStyle = {
    ...centerVertical,
    flexDirection: flexDirection,
    left: leftPosition,
    position: "absolute",
    top: topPosition,
  };

  const defaultPopupStyle: ViewStyle = {
    backgroundColor: popupColor,
    borderRadius: sw8,
    width: sw264,
  };

  const popupTextStyle: TextStyle = { ...fs12BoldWhite1, ...px(sw12), ...py(sh12), lineHeight: sh24, ...textStyle };

  return (
    <View onLayout={handleBaseLayout} style={containerStyle}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View>
          {children}
          {show === true || showPopup === true ? (
            <View onLayout={handleLayout} style={{ ...container }}>
              <IcoMoon color={popupColor} name={arrowIcon} size={sw32} style={{ ...iconOffset }} />
              <View style={{ ...defaultPopupStyle, ...popupStyle }}>
                {popupContent !== undefined ? popupContent : <Text style={popupTextStyle}>{popupText}</Text>}
              </View>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
