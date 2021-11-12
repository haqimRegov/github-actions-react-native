import React, { FunctionComponent, ReactElement, ReactNode, useState } from "react";
import { TouchableWithoutFeedback, ViewStyle } from "react-native";
import Tooltip, { TooltipSize } from "react-native-walkthrough-tooltip";

import { IcoMoon } from "../../icons";
import { colorGray, colorTransparent, px, py, sh12, sh16, sh24, sw16, sw2, sw208, sw7, sw8 } from "../../styles";

export interface CustomTooltipProps {
  arrowSize?: TooltipSize;
  arrowStyle?: ViewStyle;
  children?: ReactNode;
  color?: string;
  content: ReactElement;
  contentStyle?: ViewStyle;
  insets?: Record<string, unknown>;
  isVisible?: boolean;
  onClose?: () => void;
  onPress?: () => void;
  overlayColor?: string;
  placement?: "top" | "bottom" | "left" | "right";
  showChild?: boolean;
  spacing?: number;
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
  insets,
  onClose,
  onPress,
  overlayColor,
  placement,
  isVisible,
  showChild,
  spacing,
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

  return (
    <Tooltip
      arrowSize={defaultArrowSize}
      arrowStyle={defaultArrowStyle}
      backgroundColor={defaultOverlayColor}
      childContentSpacing={defaultSpacing}
      content={content}
      contentStyle={defaultContentStyle}
      disableShadow={defaultShadow}
      displayInsets={defaultInsets}
      isVisible={visible}
      onClose={handleHide}
      placement={defaultPlacement}
      showChildInTooltip={defaultShowChild}
      topAdjustment={topAdjustment}
      tooltipStyle={tooltipStyle}>
      <TouchableWithoutFeedback onPress={handleShow}>
        {children !== undefined ? children : <IcoMoon name="info" size={sh24} />}
      </TouchableWithoutFeedback>
    </Tooltip>
  );
};
