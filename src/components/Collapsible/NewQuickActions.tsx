import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Keyboard, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { Language } from "../../constants";
import {
  centerHV,
  colorBlue,
  colorWhite,
  flexRow,
  fs12BoldBlue1,
  fs16BoldBlue1,
  fs16BoldWhite1,
  fullHW,
  noBGColor,
  sh38,
  sh4,
  sh40,
  sh8,
  shadow12Black112,
  sw1,
  sw16,
  sw184,
  sw186,
  sw20,
  sw24,
} from "../../styles";
import { BasicModal } from "../Modals";
import { IconText } from "../Touchables";
import { CustomSpacer } from "../Views/Spacer";

const { DASHBOARD } = Language.PAGE;
export interface IQuickAction {
  label: string;
  labelStyle?: TextStyle;
  onPress?: () => void;
  style?: ViewStyle;
}

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
          const measurement = { x: pageX, y: pageY, height: _height, width: _width };
          if (keyboardAvoidingRef !== undefined && keyboardAvoidingRef !== null) {
            Keyboard.dismiss();
            const keyboardOffset = keyboardAvoidingRef.state.bottom;
            measurement.y += keyboardOffset;
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
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow);
    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", handleKeyboardHide);
    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const collapsibleContainer: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: sw20,
    borderWidth: sw1,
    borderColor: colorBlue._2,
    left: layout.x,
    position: "absolute",
    top: layout.y,
    zIndex: 3,
    ...shadow12Black112,
  };

  const collapseContainerStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    height: sh40,
    width: sw186,
  };

  const collapseIconStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    height: sh40,
    width: sw186,
  };

  const expandedContainerStyle: ViewStyle = {
    backgroundColor: colorBlue._1,
    borderRadius: sw24,
    height: sh40,
    width: sw184,
  };

  const expandedIconStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorBlue._1,
    borderRadius: sw24,
    height: sh38,
    width: sw184,
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
                  iconSize={sw16}
                  name="quick-action"
                  style={collapseIconStyle}
                  text={DASHBOARD.BUTTON_QUICK_ACTIONS}
                  textStyle={fs16BoldBlue1}
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
                  color={colorWhite._1}
                  iconSize={sw16}
                  name="quick-action"
                  style={expandedIconStyle}
                  text="Quick Actions"
                  textStyle={fs16BoldWhite1}
                />
              </View>
              <Collapsible duration={100} collapsed={collapse} style={noBGColor}>
                {collapse ? null : (
                  <View style={dropdownStyle}>
                    {actions.map((action: IQuickAction, index: number) => {
                      const actionTextStyle: TextStyle = { ...fs12BoldBlue1, ...action.labelStyle };
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
