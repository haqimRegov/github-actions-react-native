import React, { Fragment, FunctionComponent, useState } from "react";
import { FlatList, Keyboard, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { CustomSpacer } from "../../components/Views/Spacer";
import {
  borderBottomGray7,
  centerVertical,
  colorBlack,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs12SemiBoldBlack2,
  fullHW,
  noBGColor,
  px,
  py,
  sh10,
  sh200,
  sh24,
  sh6,
  sw12,
  sw16,
  sw2,
  sw24,
  sw296,
} from "../../styles";
import { CheckBox } from "../CheckBox/CheckBox";
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
  checkboxLabelStyle?: TextStyle;
  collapseOnBaseClick?: boolean;
  collapsibleStyle?: ViewStyle;
  dropdownInnerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  dummyBaseStyle?: ViewStyle;
  flatlistStyle?: ViewStyle;
  handleChange?: (value: string[]) => void;
  handleReset?: (index: number, reset: boolean) => void;
  items?: TypeLabelValue[];
  keyboardAvoidingRef?: TypeKeyboardAvoidingView;
  onBackdropPress?: () => void;
  onClose?: () => void;
  onExpandedBasePress?: () => void;
  RenderBase: (props: RenderBaseProps) => JSX.Element;
  RenderDropdown?: (props: RenderDropdownProps) => JSX.Element;
  style?: ViewStyle;
  value?: string[];
}

interface IBasicLayout {
  height: number;
  width: number;
  x: number;
  y: number;
}

export const CollapsibleDropdown: FunctionComponent<CollapsibleDropdownProps> = ({
  backDrop,
  backDropColor,
  backDropOpacity,
  baseContainerStyle,
  baseDropdownStyle,
  checkboxLabelStyle,
  collapseOnBaseClick,
  collapsibleStyle,
  dropdownInnerStyle,
  flatlistStyle,
  dummyBaseStyle,
  keyboardAvoidingRef,
  onBackdropPress,
  onClose,
  onExpandedBasePress,
  RenderBase,
  value,
  handleChange,
  items,
  style,
  handleReset,
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
      ref.measure((_x, _y, _width, _height, pageX, pageY) => {
        let measurement = { x: pageX, y: pageY, height: _height, width: _width };
        if (keyboardAvoidingRef !== undefined && keyboardAvoidingRef !== null) {
          Keyboard.dismiss();
          const keyboardOffset = keyboardAvoidingRef.state.bottom;
          measurement = { ...measurement, y: measurement.y + keyboardOffset };
          setLayout({ x: pageX, y: pageY + keyboardOffset, height: _height, width: _width });
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

  const dropdownStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw24,
    borderBottomRightRadius: sw24,
    ...style,
  };

  const dropdownInnerContainer: ViewStyle = {
    ...baseDropdownStyle,
    backgroundColor: colorWhite._1,
    borderWidth: 0,
    shadowColor: colorTransparent,
    width: layout.width - sw2,
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
                  <View>
                    <RenderBase collapse={collapse} dummyBaseStyle={dummyBaseStyle} />
                  </View>
                </TouchableWithoutFeedback>
                <Collapsible duration={100} collapsed={collapse} style={{ ...noBGColor, ...collapsibleStyle }}>
                  {RenderDropdown === undefined ? (
                    <View>
                      <View style={borderBottomGray7} />
                      <View style={dropdownStyle}>
                        <FlatList
                          extraData={value}
                          data={items!.map((item) => item.label)}
                          style={{ ...px(sw16), maxHeight: sh200, ...flatlistStyle }}
                          keyboardDismissMode="on-drag"
                          keyboardShouldPersistTaps="always"
                          keyExtractor={(item: string) => item}
                          ListHeaderComponent={() => <CustomSpacer space={sh6} />}
                          ListFooterComponent={() => <CustomSpacer space={sh6} />}
                          renderItem={({ index }) => {
                            const itemExtractor = items![index];
                            const itemValue = itemExtractor.value;
                            const selected = value!.includes(itemValue);
                            const itemContainer: ViewStyle = { ...centerVertical, ...flexRow, ...py(sh10) };
                            const itemStyle: TextStyle = selected ? fs12BoldBlack2 : fs12SemiBoldBlack2;

                            const handleSelect = () => {
                              let reset: boolean = false;
                              if (itemExtractor !== undefined) {
                                let newValue = [...value!];
                                if (newValue.includes(itemValue)) {
                                  newValue = newValue.filter((item) => item !== itemValue);
                                  reset = true;
                                } else {
                                  newValue.push(itemValue);
                                }
                                handleChange!(newValue);
                                handleReset!(index, reset);
                              }
                            };

                            return (
                              <TouchableWithoutFeedback key={index} onPress={handleSelect}>
                                <View style={itemContainer}>
                                  <CheckBox
                                    label={itemExtractor.label}
                                    labelStyle={{ ...itemStyle, width: sw296, ...checkboxLabelStyle }}
                                    numberOfLines={1}
                                    onPress={handleSelect}
                                    spaceToLabel={sw12}
                                    style={{ ...flexChild, height: sh24 }}
                                    toggle={selected}
                                  />
                                </View>
                              </TouchableWithoutFeedback>
                            );
                          }}
                          showsVerticalScrollIndicator={false}
                          scrollEventThrottle={16}
                        />
                      </View>
                    </View>
                  ) : (
                    <RenderDropdown collapse={collapse} handleClose={handleClose} />
                  )}
                </Collapsible>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </BasicModal>
    </Fragment>
  );
};
