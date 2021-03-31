import React, { Fragment, FunctionComponent, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import Collapsible from "react-native-collapsible";

import { Language } from "../../constants";
import { DICTIONARY_COUNTRY_CODE, ERROR } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import {
  border,
  borderBottomGray7,
  centerVertical,
  colorBlack,
  colorBlue,
  colorGray,
  colorRed,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs12SemiBoldBlack2,
  fullHW,
  noBGColor,
  noBorderBottom,
  px,
  py,
  sh10,
  sh200,
  sh24,
  sh38,
  sh40,
  sh6,
  shadowBlue5,
  sw1,
  sw12,
  sw16,
  sw2,
  sw20,
  sw24,
  sw268,
  sw296,
  sw360,
  sw8,
} from "../../styles";
import { isNumber } from "../../utils";
import { CheckBox } from "../CheckBox/CheckBox";
import { CustomTextInput, CustomTextInputProps } from "../Input/Input";
import { BasicModal } from "../Modals/Basic";
import { CustomSpacer } from "../Views/Spacer";

const { INPUT_MOBILE } = Language.PAGE;

interface RenderBaseProps {
  collapse: boolean;
  dummyBaseStyle?: ViewStyle;
  onChange?: (text: string) => void;
}

interface RenderDropdownProps {
  collapse: boolean;
  handleClose: () => void;
}

export interface CollapsibleDropdownProps extends CustomTextInputProps {
  backDrop?: boolean;
  backDropColor?: string;
  backDropOpacity?: number;
  baseContainerStyle?: ViewStyle;
  baseDropdownStyle?: ViewStyle;
  baseViewProps?: ViewProps;
  checkboxLabelStyle?: TextStyle;
  collapseOnBaseClick?: boolean;
  collapsibleStyle?: ViewStyle;
  data: IContactNumber;
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
  RenderBase?: (props: RenderBaseProps) => JSX.Element;
  RenderDropdown?: (props: RenderDropdownProps) => JSX.Element;
  setData: (data: IContactNumber) => void;
  style?: ViewStyle;
}

interface IBasicLayout {
  height: number;
  width: number;
  x: number;
  y: number;
}

export const CollapsibleMobileDropdown: FunctionComponent<CollapsibleDropdownProps> = ({
  backDrop,
  backDropColor,
  backDropOpacity,
  baseContainerStyle,
  baseDropdownStyle,
  baseViewProps,
  checkboxLabelStyle,
  collapseOnBaseClick,
  collapsibleStyle,
  data,
  dropdownInnerStyle,
  dummyBaseStyle,
  flatlistStyle,
  handleChange,
  handleReset,
  items,
  keyboardAvoidingRef,
  onBackdropPress,
  onClose,
  onExpandedBasePress,
  RenderBase,
  RenderDropdown,
  setData,
  style,
  ...textInputProps
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

  const handleChangeMobile = (text: string) => {
    const updatedNumber = { ...data };
    if (isNumber(text) === true || text === "") {
      updatedNumber.value = text;
      updatedNumber.error = text === "" ? ERROR.INVALID_NUMBER : undefined;
    }
    setData(updatedNumber);
  };

  const handleBlurInside = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (textInputProps.onBlur !== undefined) {
      textInputProps.onBlur(e);
    } else {
      const updatedNumber = { ...data };
      if (isNumber(updatedNumber.value) === true || updatedNumber.value === "") {
        updatedNumber.error = updatedNumber.value === "" ? ERROR.INVALID_NUMBER : undefined;
      }
      setData(updatedNumber);
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

  const borderColor = data.error !== undefined ? colorRed._2 : colorGray._7;

  const dummyBorderColor = collapse === true ? {} : { borderColor: colorGray._7 };
  const inputBorder: ViewStyle = collapse === false ? { ...noBorderBottom, borderBottomColor: colorTransparent, ...dummyBorderColor } : {};
  const defaultInputStyle: ViewStyle = {
    ...border(borderColor, sw1, sw20),
    ...centerVertical,
    ...flexRow,
    backgroundColor: colorWhite._1,
    height: sh40,
    width: sw360,
    ...inputBorder,
  };
  const countryCodeIndex = DICTIONARY_COUNTRY_CODE.findIndex((countryCode) => countryCode.value === data.code);
  const valueExtractor = DICTIONARY_COUNTRY_CODE[countryCodeIndex];
  const numberInputStyle: ViewStyle = {
    borderRadius: undefined,
    borderWidth: 0,
    height: sh38,
    width: "100%",
    borderTopRightRadius: sw24,
    borderBottomRightRadius: sw24,
  };
  const placeholderLabel = INPUT_MOBILE.PLACEHOLDER;

  return (
    <Fragment>
      <View ref={setRef} renderToHardwareTextureAndroid={true} style={{ ...flexRow }}>
        <TouchableWithoutFeedback onPress={handleExpand}>
          <View onStartShouldSetResponderCapture={() => true} style={baseContainer} {...baseViewProps}>
            {RenderBase !== undefined ? (
              <RenderBase collapse={collapse} />
            ) : (
              <View style={defaultInputStyle}>
                <View style={{ ...centerVertical, ...flexRow }}>
                  <CustomSpacer isHorizontal={true} space={sw16} />
                  {valueExtractor.flag !== undefined ? (
                    <Image source={valueExtractor.flag} style={{ width: sw24, height: sw24, ...shadowBlue5 }} />
                  ) : (
                    <View style={{ width: sw24, height: sw24, backgroundColor: colorBlack._2 }} />
                  )}
                  <CustomSpacer isHorizontal={true} space={sw8} />
                  <IcoMoon color={colorBlue._2} name="caret-down" size={sw24} />
                  <CustomSpacer isHorizontal={true} space={sw16} />
                  <View style={{ height: sh40, backgroundColor: colorGray._7, width: sw1 }} />
                </View>
                <View onStartShouldSetResponder={() => true} style={{ ...flexChild }}>
                  <CustomTextInput
                    containerStyle={{ width: sw268 }}
                    keyboardType="numeric"
                    onBlur={handleBlurInside}
                    onChangeText={handleChangeMobile}
                    placeholder={placeholderLabel}
                    value={data.value}
                    viewStyle={numberInputStyle}
                    {...textInputProps}
                  />
                </View>
              </View>
            )}
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
                    {RenderBase !== undefined ? (
                      <RenderBase collapse={collapse} dummyBaseStyle={dummyBaseStyle} onChange={handleChangeMobile} />
                    ) : (
                      <View style={{ ...defaultInputStyle, ...dummyBaseStyle }}>
                        <View style={{ ...centerVertical, ...flexRow }}>
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          {valueExtractor.flag !== undefined ? (
                            <Image source={valueExtractor.flag} style={{ width: sw24, height: sw24, ...shadowBlue5 }} />
                          ) : (
                            <View style={{ width: sw24, height: sw24, backgroundColor: colorBlack._2 }} />
                          )}
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <IcoMoon color={colorBlue._2} name="caret-down" size={sw24} />
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          <View style={{ height: sh40, backgroundColor: colorGray._7, width: sw1 }} />
                        </View>
                        <View onStartShouldSetResponder={() => true} style={{ ...flexChild }}>
                          <CustomTextInput
                            onBlur={handleBlurInside}
                            onChangeText={handleChangeMobile}
                            placeholder={placeholderLabel}
                            value={data.value}
                            viewStyle={numberInputStyle}
                            {...textInputProps}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
                <Collapsible duration={100} collapsed={collapse} style={{ ...noBGColor, ...collapsibleStyle }}>
                  {RenderDropdown === undefined ? (
                    <View>
                      <View style={borderBottomGray7} />
                      <View style={dropdownStyle}>
                        <FlatList
                          extraData={data.value}
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
                            const selected = data.value.includes(itemValue);
                            const itemContainer: ViewStyle = { ...centerVertical, ...flexRow, ...py(sh10) };
                            const itemStyle: TextStyle = selected ? fs12BoldBlack2 : fs12SemiBoldBlack2;

                            const handleSelect = () => {
                              let reset: boolean = false;
                              if (itemExtractor !== undefined) {
                                let newValue = [...data.value];
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
