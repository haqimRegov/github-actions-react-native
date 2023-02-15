import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { FlatList, Keyboard, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { NunitoRegular } from "../../constants";
import { Language } from "../../constants/language";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  circle,
  colorBlack,
  colorBlue,
  colorGray,
  colorGreen,
  colorTransparent,
  colorWhite,
  flexRow,
  fs12BoldGray6,
  fs16BoldBlue1,
  fullHW,
  noBGColor,
  px,
  py,
  sh12,
  sh176,
  sh4,
  sh44,
  sh8,
  sw15,
  sw16,
  sw2,
  sw24,
  sw286,
  sw296,
  sw328,
  sw360,
} from "../../styles";
import { CustomTextInput } from "../Input";
import { BasicModal } from "../Modals";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

const { DROPDOWN } = Language.PAGE;

interface NewDropdownProps {
  disabled?: boolean;
  error?: string;
  handleChange: (text: string) => void;
  items: TypeLabelValue[];
  keyboardAvoidingRef?: TypeKeyboardAvoidingView;
  label?: string;
  labelStyle?: TextStyle;
  maxHeight?: number;
  placeholder?: string;
  spaceToLabel?: number;
  spaceToTop?: number;
  style?: ViewStyle;
  value: string;
  viewStyle?: ViewStyle;
}

export const NewDropdown: FunctionComponent<NewDropdownProps> = ({
  disabled,
  error,
  handleChange,
  items,
  keyboardAvoidingRef,
  label,
  labelStyle,
  maxHeight,
  placeholder,
  spaceToLabel,
  spaceToTop,
  style,
  value,
  viewStyle,
}: NewDropdownProps) => {
  const [layout, setLayout] = useState<IBasicLayout>({ x: 0, y: 0, width: 0, height: 0 });
  const [ref, setRef] = useState<View | null>(null);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [collapsibleModal, setCollapsibleModal] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const placeholderLabel = placeholder || DROPDOWN.PLACEHOLDER;

  const defaultLabelSpace = spaceToLabel === undefined ? sh4 : spaceToLabel;
  const labelExtractor = items.map((item) => item.label);

  // TODO
  /**
   * Known Issues:
   * 1. Absolute position is wrong when keyboard is open (quick solution, pass keyboardAvoidingRef)
   */

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

  const dropdownContainer: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderColor: colorBlue._1,
    borderRadius: sw16,
    borderWidth: sw2,
    left: layout.x,
    position: "absolute",
    top: layout.y,
    width: sw360,
    zIndex: 3,
    ...viewStyle,
  };

  const placeholderStyle: TextStyle = value ? {} : { color: colorBlack._2, fontFamily: NunitoRegular };
  const inputStyle: ViewStyle = collapsibleModal ? { borderColor: colorTransparent } : {};

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

  return (
    <Fragment>
      <View>
        {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
        {label === undefined ? null : (
          <Fragment>
            <Text style={{ ...fs12BoldGray6, ...labelStyle }}>{label}</Text>
            <CustomSpacer space={defaultLabelSpace} />
          </Fragment>
        )}
        <View ref={setRef} renderToHardwareTextureAndroid={true}>
          <TouchableWithoutFeedback onPress={handleExpand}>
            <View onStartShouldSetResponderCapture={() => true}>
              <CustomTextInput
                disabled={disabled}
                error={error}
                editable={false}
                placeholder={placeholderLabel}
                placeholderTextColor={colorGray._4}
                rightIcon={{ name: "caret-down" }}
                viewStyle={{ ...inputStyle, ...viewStyle }}
                value={value}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <BasicModal animationOutTiming={80} visible={collapsibleModal} hasBackdrop={false}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={fullHW}>
            <View style={dropdownContainer}>
              <View style={{ ...centerVertical, ...flexRow, height: sh44, ...px(sw15) }}>
                <Text numberOfLines={1} style={{ ...fs16BoldBlue1, ...placeholderStyle, maxWidth: sw286 }}>
                  {value || placeholderLabel}
                </Text>
                <CustomFlexSpacer />
                <IcoMoon color={colorBlue._1} name="caret-down" size={sw24} />
              </View>
              <Collapsible duration={100} collapsed={collapse} style={noBGColor}>
                <View style={{ borderTopWidth: sw2, borderTopColor: colorBlue._1, maxHeight: maxHeight }}>
                  <View style={style}>
                    <FlatList
                      data={labelExtractor}
                      style={{ borderBottomLeftRadius: sw16, borderBottomRightRadius: sw16, maxHeight: sh176 }}
                      keyboardDismissMode="on-drag"
                      keyboardShouldPersistTaps="always"
                      keyExtractor={(item: string, index: number) => `${item}-${index}`}
                      ListHeaderComponent={() => <CustomSpacer space={sh8} />}
                      ListFooterComponent={() => <CustomSpacer space={sh8} />}
                      renderItem={({ index }) => {
                        const itemExtractor = items[index];
                        const itemContainer: ViewStyle = { ...centerVertical, ...flexRow, ...py(sh8), ...px(sw16) };
                        const selectedStyle: ViewStyle = value === itemExtractor.label ? { backgroundColor: colorBlue._2 } : {};

                        const handleSelect = () => {
                          handleAnimationClose();
                          setTimeout(() => {
                            if (itemExtractor !== undefined) {
                              handleChange(itemExtractor.value);
                            }
                          }, 250);
                        };

                        return (
                          <TouchableWithoutFeedback key={index} onPress={handleSelect}>
                            <View style={{ ...itemContainer, ...selectedStyle }}>
                              {index === 0 || <CustomSpacer space={sh8} />}
                              <Text numberOfLines={1} style={{ ...fs16BoldBlue1, maxWidth: value === itemExtractor.label ? sw296 : sw328 }}>
                                {itemExtractor.label}
                              </Text>
                              {value === itemExtractor.label ? (
                                <Fragment>
                                  <CustomFlexSpacer />
                                  <View style={{ ...centerHV, ...circle(sw16, colorGreen._1) }}>
                                    <IcoMoon color={colorWhite._1} name="check-v2" size={sh12} />
                                  </View>
                                </Fragment>
                              ) : null}
                              {index === labelExtractor.length - 1 || <CustomSpacer space={sh8} />}
                            </View>
                          </TouchableWithoutFeedback>
                        );
                      }}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                </View>
              </Collapsible>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </BasicModal>
    </Fragment>
  );
};
