import React, { FunctionComponent, ReactElement, ReactNode, useState } from "react";
import { TouchableWithoutFeedback, ViewStyle } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

import { IcoMoon } from "../../icons";
import { colorBlack, colorTransparent, px, py, sh16, sh24, sw16, sw208, sw8 } from "../../styles";

export interface CustomTooltipProps {
  arrowStyle?: ViewStyle;
  children?: ReactNode;
  content: ReactElement;
  contentStyle?: ViewStyle;
  insets?: Object;
  isVisible?: boolean;
  onClose?: () => void;
  onPress?: () => void;
  overlayColor?: string;
  placement?: "top" | "bottom" | "left" | "right";
  showChild?: boolean;
  tooltipStyle?: ViewStyle;
  withShadow?: boolean;
}

export const CustomTooltip: FunctionComponent<CustomTooltipProps> = ({
  arrowStyle,
  children,
  content,
  contentStyle,
  insets,
  onClose,
  onPress,
  overlayColor,
  placement,
  isVisible,
  showChild,
  tooltipStyle,
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
  const defaultContentStyle: ViewStyle = {
    ...px(sw16),
    ...py(sh16),
    backgroundColor: colorBlack._2,
    borderRadius: sw8,
    width: sw208,
    ...contentStyle,
  };
  const defaultArrowStyle: ViewStyle = { borderTopColor: colorBlack._2, ...arrowStyle };
  const defaultInsets = { left: 0, right: 0, top: 0, bottom: 0, ...insets };
  const defaultOverlayColor = overlayColor !== undefined ? overlayColor : colorTransparent;
  const defaultPlacement = placement !== undefined ? placement : "right";
  const defaultShadow = withShadow !== undefined ? withShadow : true;
  const defaultShowChild = showChild !== undefined ? showChild : false;

  return (
    <Tooltip
      arrowStyle={defaultArrowStyle}
      backgroundColor={defaultOverlayColor}
      content={content}
      contentStyle={defaultContentStyle}
      disableShadow={defaultShadow}
      displayInsets={defaultInsets}
      isVisible={visible}
      onClose={handleHide}
      placement={defaultPlacement}
      showChildInTooltip={defaultShowChild}
      tooltipStyle={tooltipStyle}>
      <TouchableWithoutFeedback onPress={handleShow}>
        {children !== undefined ? children : <IcoMoon name="info" size={sh24} />}
      </TouchableWithoutFeedback>
    </Tooltip>
  );
};
