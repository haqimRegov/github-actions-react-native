import React, { ReactElement, ReactNode, useState } from "react";
import { TouchableWithoutFeedback, ViewStyle } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

import { colorBlack, colorTransparent, px, py, sh16, sw16, sw208, sw8 } from "../../styles";

export interface TooltipProps {
  arrowStyle?: ViewStyle;
  backgroundColor?: string;
  children: ReactNode;
  content: ReactElement;
  contentStyle?: ViewStyle;
  insets?: Object;
  isVisible?: boolean;
  onClose?: () => void;
  onPress?: () => void;
  placement?: "top" | "bottom" | "left" | "right";
  shadow?: boolean;
  showChild?: boolean;
  tooltipStyle?: ViewStyle;
}

export const TooltipComponent = ({
  arrowStyle,
  backgroundColor,
  children,
  content,
  contentStyle,
  insets,
  onClose,
  onPress,
  placement,
  isVisible,
  shadow,
  showChild,
  tooltipStyle,
}: TooltipProps) => {
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
  const defaultContentStyle: ViewStyle = {
    backgroundColor: colorBlack._2,
    borderRadius: sw8,
    ...px(sw16),
    ...py(sh16),
    width: sw208,
    ...contentStyle,
  };
  const defaultArrowStyle: ViewStyle = { borderTopColor: colorBlack._2, ...arrowStyle };
  const defaultInsets = { left: 0, right: 0, top: 0, bottom: 0, ...insets };
  const defaultBackgroundColor = backgroundColor !== undefined ? backgroundColor : colorTransparent;
  const defaultPlacement = placement !== undefined ? placement : "right";
  return (
    <Tooltip
      isVisible={visible}
      contentStyle={defaultContentStyle}
      arrowStyle={defaultArrowStyle}
      content={content}
      placement={defaultPlacement}
      onClose={handleHide}
      tooltipStyle={tooltipStyle}
      backgroundColor={defaultBackgroundColor}
      disableShadow={shadow}
      showChildInTooltip={showChild}
      displayInsets={defaultInsets}>
      <TouchableWithoutFeedback onPress={handleShow}>{children}</TouchableWithoutFeedback>
    </Tooltip>
  );
};
