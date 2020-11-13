import React, { Fragment, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { colorBlack, colorTransparent, colorWhite, flexRow, fullHW, noBGColor } from "../../styles";
import { BasicModal } from "../Modals/Basic";

interface RenderBaseProps {
  collapse: boolean;
  dummyBaseStyle?: ViewStyle;
}

interface RenderDropdownProps {
  collapse: boolean;
  handleClose: () => void;
}

export interface CollapsibleDropdownProps {
  backDrop?: boolean;
  backDropColor?: string;
  backDropOpacity?: number;
  baseContainerStyle?: ViewStyle;
  baseDropdownStyle?: ViewStyle;
  dropdownInnerStyle?: ViewStyle;
  collapseOnBaseClick?: boolean;
  collapsibleStyle?: ViewStyle;
  dummyBaseStyle?: ViewStyle;
  keyboardAvoidingRef?: TypeKeyboardAvoidingView;
  onBackdropPress?: () => void;
  onClose?: () => void;
  onExpandedBasePress?: () => void;
  RenderBase: (props: RenderBaseProps) => JSX.Element;
  RenderDropdown: (props: RenderDropdownProps) => JSX.Element;
}

interface IBasicLayout {
  height: number;
  width: number;
  x: number;
  y: number;
}

export const CollapsibleDropdown = ({
  backDrop,
  backDropColor,
  backDropOpacity,
  baseContainerStyle,
  baseDropdownStyle,
  collapseOnBaseClick,
  collapsibleStyle,
  dropdownInnerStyle,
  dummyBaseStyle,
  keyboardAvoidingRef,
  onBackdropPress,
  onClose,
  onExpandedBasePress,
  RenderBase,
  RenderDropdown,
}: CollapsibleDropdownProps) => {
  const [layout, setLayout] = useState<IBasicLayout>({ x: 0, y: 0, width: 0, height: 0 });
  const [ref, setRef] = useState<View | null>(null);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [collapsibleModal, setCollapsibleModal] = useState<boolean>(false);

  // TODO
  /**
   * Known Issues:
   * 1. Absolute position is wrong when keyboard is open (quick solution, pass keyboardAvoidingRef)
   */

  const handleAnimationOpen = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      setCollapse(false);
    }, 50);
  };

  const handleAnimationClose = () => {
    setCollapse(true);
    setTimeout(() => {
      setCollapsibleModal(false);
    }, 50);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    handleAnimationClose();
  };

  const handleBackdropPress = () => {
    if (onBackdropPress) {
      onBackdropPress();
    }
    handleClose();
  };

  const handleExpandedBasePress = () => {
    if (onExpandedBasePress) {
      onExpandedBasePress();
    }
    if (collapseOnBaseClick === undefined || collapseOnBaseClick === true) {
      handleClose();
    }
  };

  const handleExpand = () => {
    if (ref !== null) {
      ref.measure((_x, _y, _width, _height, px, py) => {
        let measurement = { x: px, y: py, height: _height, width: _width };
        if (keyboardAvoidingRef !== undefined && keyboardAvoidingRef !== null) {
          Keyboard.dismiss();
          const keyboardOffset = keyboardAvoidingRef.state.bottom;
          measurement = { ...measurement, y: measurement.y + keyboardOffset };
          setLayout({ x: px, y: py + keyboardOffset, height: _height, width: _width });
        }
        setLayout(measurement);
      });
      setCollapsibleModal(!collapsibleModal);
      handleAnimationOpen();
    }
  };

  const baseContainer: ViewStyle = { ...noBGColor, ...baseContainerStyle };

  const dropdownContainer: ViewStyle = {
    backgroundColor: colorWhite._1,
    left: layout.x,
    position: "absolute",
    top: layout.y,
    zIndex: 3,
    ...baseDropdownStyle,
  };

  const dropdownInnerContainer: ViewStyle = {
    ...baseDropdownStyle,
    backgroundColor: colorWhite._1,
    borderWidth: 0,
    shadowColor: colorTransparent,
    width: layout.width - 2,
    ...dropdownInnerStyle,
  };
  const defaultBackDrop = backDrop !== undefined ? backDrop : false;
  const defaultBackDropColor = backDropColor !== undefined ? backDropColor : colorBlack._1;
  const defaultBackDropOpacity = backDropOpacity !== undefined ? backDropOpacity : 1;

  return (
    <Fragment>
      <View ref={setRef} renderToHardwareTextureAndroid={true} style={{ ...flexRow }}>
        <TouchableWithoutFeedback onPress={handleExpand}>
          <View onStartShouldSetResponderCapture={() => true} style={baseContainer}>
            <RenderBase collapse={collapse} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <BasicModal
        animationOutTiming={50}
        visible={collapsibleModal}
        hasBackdrop={defaultBackDrop}
        backdropColor={defaultBackDropColor}
        backdropOpacity={defaultBackDropOpacity}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={fullHW}>
            <View style={dropdownContainer}>
              <View style={dropdownInnerContainer}>
                <TouchableWithoutFeedback onPress={handleExpandedBasePress}>
                  <View onStartShouldSetResponderCapture={() => true}>
                    <RenderBase collapse={collapse} dummyBaseStyle={dummyBaseStyle} />
                  </View>
                </TouchableWithoutFeedback>
                <Collapsible duration={100} collapsed={collapse} style={{ ...noBGColor, ...collapsibleStyle }}>
                  <RenderDropdown collapse={collapse} handleClose={handleClose} />
                </Collapsible>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </BasicModal>
    </Fragment>
  );
};
