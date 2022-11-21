import React, { FunctionComponent, ReactElement, useState } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import Tooltip, { TooltipSize } from "react-native-walkthrough-tooltip";

import { NunitoBlack } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  circle,
  colorBlue,
  colorGray,
  colorTransparent,
  fs10BoldWhite1,
  px,
  py,
  sh12,
  sh16,
  sh24,
  sw14,
  sw16,
  sw2,
  sw208,
  sw24,
  sw7,
  sw8,
} from "../../styles";

export interface CustomTooltipProps {
  arrowSize?: TooltipSize;
  arrowStyle?: ViewStyle;
  children?: ReactElement;
  color?: string;
  content: ReactElement;
  contentStyle?: ViewStyle;
  infoStyle?: ViewStyle;
  insets?: Record<string, unknown>;
  isVisible?: boolean;
  onClose?: () => void;
  onPress?: () => void;
  overlayColor?: string;
  placement?: "top" | "bottom" | "left" | "right";
  showChild?: boolean;
  spacing?: number;
  theme?: "dark" | "light";
  tooltipStyle?: ViewStyle;
  topAdjustment?: number;
  withShadow?: boolean;
}

export const CustomTooltip: FunctionComponent<CustomTooltipProps> = ({
  arrowSize,
  arrowStyle,
  children,
  color,
  content,
  contentStyle,
  infoStyle,
  insets,
  isVisible,
  onClose,
  onPress,
  overlayColor,
  placement,
  showChild,
  spacing,
  theme,
  tooltipStyle,
  topAdjustment,
  withShadow,
}: CustomTooltipProps) => {
  // TODO known library issues:
  // TODO tooltip flickers when opening inside a scroll view. It gets the last position before scrolling.

  const [popup, setPopup] = useState<boolean>(false);

  const handleShow = () => {
    if (onPress !== undefined) {
      onPress();
    } else {
      setPopup(true);
    }
  };

  const handleHide = () => {
    if (onClose !== undefined) {
      onClose();
    } else {
      setPopup(false);
    }
  };

  const visible = isVisible !== undefined ? isVisible : popup;
  const defaultColor = color !== undefined ? color : colorGray._6;
  const defaultContentStyle: ViewStyle = {
    ...px(sw16),
    ...py(sh16),
    backgroundColor: defaultColor,
    borderRadius: sw8,
    width: sw208,
    ...contentStyle,
  };

  const defaultArrowStyle: ViewStyle = { borderTopColor: defaultColor, ...arrowStyle };
  const defaultInsets = { left: 0, right: 0, top: 0, bottom: 0, ...insets };
  const defaultOverlayColor = overlayColor !== undefined ? overlayColor : colorTransparent;
  const defaultPlacement = placement !== undefined ? placement : "right";
  const defaultShadow = withShadow !== undefined ? withShadow : true;
  const defaultShowChild = showChild !== undefined ? showChild : false;
  const defaultArrowSize = arrowSize !== undefined ? arrowSize : { width: sw7, height: sh12 };
  const defaultSpacing = spacing !== undefined ? spacing : sw2;

  const icon =
    theme === "dark" ? (
      <View style={{ ...centerHV, height: sh24, width: sw24, ...infoStyle }}>
        <View style={{ ...centerHV, ...circle(sw14, colorBlue._1) }}>
          <Text style={{ ...fs10BoldWhite1, fontFamily: NunitoBlack }}>i</Text>
        </View>
      </View>
    ) : (
      <IcoMoon name="info" size={sh24} />
    );

  return (
    <Tooltip
      allowChildInteraction={true}
      arrowSize={defaultArrowSize}
      arrowStyle={defaultArrowStyle}
      backgroundColor={defaultOverlayColor}
      childContentSpacing={defaultSpacing}
      content={content}
      contentStyle={defaultContentStyle}
      closeOnContentInteraction={false}
      disableShadow={defaultShadow}
      displayInsets={defaultInsets}
      isVisible={visible}
      onClose={handleHide}
      placement={defaultPlacement}
      showChildInTooltip={defaultShowChild}
      topAdjustment={topAdjustment}
      tooltipStyle={tooltipStyle}>
      <Pressable onPress={handleShow}>{children !== undefined ? children : icon}</Pressable>
    </Tooltip>
  );
};
