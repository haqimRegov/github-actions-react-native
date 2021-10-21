import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Keyboard, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import {
  centerHV,
  colorBlue,
  colorGray,
  colorWhite,
  flexRow,
  fs12BoldBlue2,
  fs16BoldBlue2,
  fullHW,
  noBGColor,
  sh24,
  sh38,
  sh4,
  sh40,
  sh8,
  shadowBlack5,
  sw1,
  sw160,
  sw162,
  sw20,
  sw24,
} from "../../styles";
import { IQuickAction } from "../Collapsible";
import { BasicModal } from "../Modals";
import { IconText } from "../Touchables";
import { CustomSpacer } from "../Views/Spacer";

// export interface IQuickAction {
//   label: string;
//   labelStyle?: TextStyle;
//   onPress?: () => void;
//   style?: ViewStyle;
// }

interface NewQuickActions {
  actions: IQuickAction[];
  disabled?: boolean;
  keyboardAvoidingRef?: TypeKeyboardAvoidingView;
  label?: string;
  labelStyle?: TextStyle;
  style?: ViewStyle;
}

export const NewQuickActions: FunctionComponent<NewQuickActions> = ({ actions, disabled, keyboardAvoidingRef }: NewQuickActions) => {
  const [layout, setLayout] = useState<IBasicLayout>({ x: 0, y: 0, width: 0, height: 0 });
  const [ref, setRef] = useState<View | null>(null);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [collapsibleModal, setCollapsibleModal] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const handleAnimationClose = () => {
    setCollapse(true);
    setTimeout(() => {
      setCollapsibleModal(false);
    }, 80);
  };

  const handleBackdropPress = () => {
    handleAnimationClose();
  };

  const handleExpand = () => {
    if (disabled !== true) {
      Keyboard.dismiss();
      if (ref !== null && keyboardVisible === false) {
        ref.measure((_x, _y, _width, _height, pageX, pageY) => {
          let measurement = { x: pageX, y: pageY, height: _height, width: _width };
          if (keyboardAvoidingRef !== undefined && keyboardAvoidingRef !== null) {
            Keyboard.dismiss();
            const keyboardOffset = keyboardAvoidingRef.state.bottom;
            measurement = { ...measurement, y: measurement.y + keyboardOffset };
            setLayout({ x: pageX, y: pageY + keyboardOffset, height: _height, width: _width });
          } else {
            setLayout(measurement);
          }
        });
        setCollapsibleModal(!collapsibleModal);
        setTimeout(() => {
          setCollapse(false);
        }, 80);
      }
    }
  };

  const handleKeyboardDidShow = () => {
    setKeyboardVisible(true);
  };
  const handleKeyboardHide = () => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", handleKeyboardHide);
    return () => {
      Keyboard.removeListener("keyboardDidShow", handleKeyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", handleKeyboardHide);
    };
  }, []);

  const collapsibleContainer: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: sw20,
    borderWidth: sw1,
    borderColor: colorGray._2,
    left: layout.x,
    position: "absolute",
    top: layout.y,
    zIndex: 3,
    ...shadowBlack5,
  };

  const collapseContainerStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    height: sh40,
    width: sw162,
  };

  const collapseIconStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    height: sh40,
    width: sw162,
  };

  const expandedContainerStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    height: sh40,
    width: sw160,
  };

  const expandedIconStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorGray._2,
    borderRadius: sw24,
    height: sh38,
    width: sw160,
  };

  const dropdownStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw20,
    borderBottomRightRadius: sw20,
  };

  return (
    <Fragment>
      <View>
        <View ref={setRef} renderToHardwareTextureAndroid={true}>
          <TouchableWithoutFeedback onPress={handleExpand}>
            <View onStartShouldSetResponderCapture={() => true}>
              <View style={collapseContainerStyle}>
                <IconText
                  color={colorBlue._2}
                  iconSize={sh24}
                  name="quick-action"
                  style={collapseIconStyle}
                  text="Quick Actions"
                  textStyle={fs16BoldBlue2}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <BasicModal animationOutTiming={80} backdropOpacity={0.7} visible={collapsibleModal}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={fullHW}>
            <View style={collapsibleContainer}>
              <View style={expandedContainerStyle}>
                <IconText
                  color={colorBlue._2}
                  iconSize={sh24}
                  name="quick-action"
                  style={expandedIconStyle}
                  text="Quick Actions"
                  textStyle={fs16BoldBlue2}
                />
              </View>
              <Collapsible duration={100} collapsed={collapse} style={noBGColor}>
                {collapse ? null : (
                  <View style={dropdownStyle}>
                    {actions.map((action: IQuickAction, index: number) => {
                      const actionTextStyle: TextStyle = { ...fs12BoldBlue2, letterSpacing: -0.44, ...action.labelStyle };
                      const actionStyle: ViewStyle = { ...centerHV, ...flexRow, height: sh40, ...action.style };

                      const handlePress = () => {
                        handleAnimationClose();
                        setTimeout(() => {
                          if (action.onPress !== undefined) {
                            action.onPress();
                          }
                        }, 300);
                      };

                      return (
                        <Fragment key={index}>
                          {index === 0 ? <CustomSpacer space={sh8} /> : null}
                          <TouchableWithoutFeedback onPress={handlePress}>
                            <View style={actionStyle}>
                              <Text style={actionTextStyle}>{action.label}</Text>
                            </View>
                          </TouchableWithoutFeedback>
                          {index === actions.length - 1 ? <CustomSpacer space={sh4} /> : null}
                        </Fragment>
                      );
                    })}
                  </View>
                )}
              </Collapsible>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </BasicModal>
    </Fragment>
  );
};
