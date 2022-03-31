import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  NativeSyntheticEvent,
  Text,
  TextInputFocusEventData,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import Collapsible from "react-native-collapsible";

import { Language, NunitoRegular } from "../../constants";
import { DICTIONARY_MOBILE_CODE, ERROR } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import {
  border,
  centerHV,
  centerVertical,
  circle,
  colorBlue,
  colorGray,
  colorGreen,
  colorRed,
  colorTransparent,
  colorWhite,
  disabledOpacity5,
  flexChild,
  flexRow,
  fs12BoldGray6,
  fs12RegRed2,
  fs16BoldBlue1,
  fs16BoldGray6,
  fs16RegGray5,
  fullHeight,
  fullHW,
  fullWidth,
  noBGColor,
  px,
  py,
  sh12,
  sh16,
  sh176,
  sh4,
  sh44,
  sh48,
  sh8,
  shadow16Blue112,
  sw1,
  sw11,
  sw16,
  sw2,
  sw23,
  sw24,
  sw304,
  sw32,
  sw328,
  sw356,
  sw360,
  sw8,
} from "../../styles";
import { isNumber } from "../../utils";
import { BasicModal } from "../Modals";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";
import { CustomTextInput, CustomTextInputProps } from "./Input";

const { INPUT_MOBILE } = Language.PAGE;

interface NewMobileInputProps extends CustomTextInputProps {
  data: IContactNumber;
  handleContactNumber: (data: IContactNumber) => void;
  keyboardAvoidingRef?: TypeKeyboardAvoidingView;
  viewStyle?: ViewStyle;
  withSearch?: boolean;
}

export const NewMobileInput: FunctionComponent<NewMobileInputProps> = ({
  data,
  disabled,
  handleContactNumber,
  keyboardAvoidingRef,
  label,
  labelStyle,
  spaceToLabel,
  spaceToTop,
  style,
  viewStyle,
  withSearch,
  ...textInputProps
}: NewMobileInputProps) => {
  const [layout, setLayout] = useState<IBasicLayout>({ x: 0, y: 0, width: 0, height: 0 });
  const [ref, setRef] = useState<View | null>(null);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [collapsibleModal, setCollapsibleModal] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const [inputSearch, setInputSearch] = useState<string>("");

  // TODO
  /**
   * Known Issues:
   * 1. No keyboard avoiding view
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
  };

  const handleChangeMobile = (text: string) => {
    const updatedNumber = { ...data };
    if (isNumber(text) === true || text === "") {
      updatedNumber.value = text;
      updatedNumber.error = text === "" ? ERROR.INVALID_NUMBER : undefined;
    }
    handleContactNumber(updatedNumber);
  };

  const handleBlurInside = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (textInputProps.onBlur !== undefined) {
      textInputProps.onBlur(e);
    } else {
      const updatedNumber = { ...data };
      if (isNumber(updatedNumber.value) === true || updatedNumber.value === "") {
        updatedNumber.error = updatedNumber.value === "" ? ERROR.INVALID_NUMBER : undefined;
      }
      handleContactNumber(updatedNumber);
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
  };

  const dropdownStyle: ViewStyle = {
    ...fullWidth,
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw24,
    borderBottomRightRadius: sw24,
    ...style,
  };

  const disabledStyle = disabled === true ? disabledOpacity5 : {};
  const errorStyle: ViewStyle =
    data.error !== undefined ? { backgroundColor: colorRed._5, borderWidth: sw2, borderColor: colorRed._2 } : {};

  const baseInputStyle = {
    ...centerVertical,
    ...flexRow,
    backgroundColor: colorWhite._1,
    ...disabledStyle,
    ...viewStyle,
  };

  const collapsedInputStyle: ViewStyle = {
    ...border(colorGray._3, sw1, sw32),
    height: sh48,
    width: sw360,
    ...baseInputStyle,
    ...errorStyle,
    paddingLeft: data.error !== undefined ? sw23 : sw24,
  };

  const expandedInputStyle: ViewStyle = {
    ...border(colorTransparent, 0, sw32),
    height: sh44,
    width: sw356,
    ...baseInputStyle,
    paddingLeft: sw23,
  };

  const inputStyle = {
    ...flexChild,
    fontFamily: NunitoRegular,
    fontSize: sh16,
    ...style,
  };

  const numberInputStyle: ViewStyle = {
    ...fullWidth,
    backgroundColor: colorTransparent,
    borderBottomRightRadius: sw24,
    borderRadius: undefined,
    borderTopRightRadius: sw24,
    borderWidth: 0,
    ...px(sw16),
  };

  const defaultLabelSpace = spaceToLabel === undefined ? sh4 : spaceToLabel;
  const placeholderLabel = textInputProps.placeholder ? textInputProps.placeholder : INPUT_MOBILE.PLACEHOLDER;
  const labelText = label !== undefined ? label : data.label;

  const countryCodeIndex = DICTIONARY_MOBILE_CODE.findIndex((countryCode) => countryCode.id === data.id);
  const valueExtractor = DICTIONARY_MOBILE_CODE[countryCodeIndex];

  const searchData =
    inputSearch !== "" && withSearch === true
      ? DICTIONARY_MOBILE_CODE.filter((mobileCode) => {
          const valueToSearch = inputSearch.startsWith("+") || isNumber(inputSearch.substr(0)) ? mobileCode.value : mobileCode.label;
          const value = valueToSearch.toLowerCase().indexOf(inputSearch.toLowerCase()) !== -1 ? mobileCode.label : undefined;
          return value;
        }).map((mobileCode) => mobileCode.id)
      : DICTIONARY_MOBILE_CODE.map((mobileCode) => mobileCode.id);

  const input = (
    <Fragment>
      <View
        style={{
          ...centerVertical,
          ...flexRow,
          ...fullHeight,
          borderRightColor: colorGray._3,
          borderRightWidth: sw1,
        }}>
        {valueExtractor.flag !== undefined ? (
          <Image source={valueExtractor.flag} style={{ width: sw24, height: sw24, ...shadow16Blue112 }} />
        ) : (
          <View style={{ width: sw24, height: sw24, backgroundColor: colorGray._6 }} />
        )}
        <CustomSpacer isHorizontal={true} space={sw11} />
        <IcoMoon color={colorBlue._1} name="caret-down" size={sw24} />
        <CustomSpacer isHorizontal={true} space={sw16} />
      </View>
      <CustomTextInput
        containerStyle={flexChild}
        keyboardType="numeric"
        onBlur={handleBlurInside}
        onChangeText={handleChangeMobile}
        placeholder={placeholderLabel}
        inputPrefix={`(${data.code})`}
        prefixStyle={fs16BoldGray6}
        style={inputStyle}
        value={data.value}
        viewStyle={numberInputStyle}
        {...textInputProps}
      />
    </Fragment>
  );

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
        {!labelText ? null : (
          <Fragment>
            <Text style={{ ...fs12BoldGray6, ...labelStyle }}>{labelText}</Text>
            <CustomSpacer space={defaultLabelSpace} />
          </Fragment>
        )}
        <View ref={setRef} renderToHardwareTextureAndroid={true}>
          <TouchableWithoutFeedback onPress={handleExpand}>
            <View style={collapsedInputStyle}>{input}</View>
          </TouchableWithoutFeedback>
        </View>
        {data.error === undefined ? null : (
          <Fragment>
            <CustomSpacer space={sh8} />
            <View style={flexRow}>
              <CustomSpacer isHorizontal={true} space={sw16} />
              <IcoMoon color={colorRed._2} name="error-filled" size={sw16} />
              <CustomSpacer isHorizontal={true} space={sw8} />
              <Text style={{ ...fs12RegRed2, width: sw304 }}>{data.error}</Text>
            </View>
          </Fragment>
        )}
      </View>
      <BasicModal animationOutTiming={80} visible={collapsibleModal} hasBackdrop={false}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={fullHW}>
            <View style={dropdownContainer}>
              <View style={expandedInputStyle}>{input}</View>
              <Collapsible duration={100} collapsed={collapse} style={noBGColor}>
                <View style={{ borderTopWidth: sw2, borderTopColor: colorBlue._1 }}>
                  <View onStartShouldSetResponderCapture={() => disabled === true} style={flexRow}>
                    <View style={dropdownStyle}>
                      {withSearch === true ? (
                        <CustomTextInput
                          containerStyle={{ ...px(sw16), ...py(sh16) }}
                          onChangeText={setInputSearch}
                          placeholder="Search by Country"
                          leftIcon={{ name: "search" }}
                          value={inputSearch}
                          viewStyle={{ width: sw328 }}
                        />
                      ) : null}
                      <FlatList
                        data={searchData}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps="always"
                        keyExtractor={(item, index) => `${item}-${index}`}
                        ListFooterComponent={() => <CustomSpacer space={sh8} />}
                        ListHeaderComponent={withSearch === true ? null : () => <CustomSpacer space={sh8} />}
                        renderItem={({ item }) => {
                          const findItem = DICTIONARY_MOBILE_CODE.filter((code) => code.id === item);
                          const itemExtractor = findItem.length === 0 ? DICTIONARY_MOBILE_CODE[0] : findItem[0];
                          const selected = data.id === itemExtractor.id;
                          const selectedStyle = selected ? { backgroundColor: colorBlue._2 } : {};
                          const itemContainer: ViewStyle = {
                            ...centerVertical,
                            ...flexRow,
                            ...px(sw16),
                            ...py(sh8),
                            ...selectedStyle,
                          };

                          const handleSelect = () => {
                            handleAnimationClose();
                            setTimeout(() => {
                              if (itemExtractor !== undefined) {
                                const updatedData: IContactNumber = { ...data, code: itemExtractor.value, id: itemExtractor.id };
                                handleContactNumber(updatedData);
                              }
                            }, 250);
                          };

                          return (
                            <TouchableWithoutFeedback key={itemExtractor.label} onPress={handleSelect}>
                              <View style={itemContainer}>
                                {itemExtractor.flag !== undefined ? (
                                  <Image source={itemExtractor.flag} style={{ width: sw24, height: sw24, ...shadow16Blue112 }} />
                                ) : (
                                  <View style={{ width: sw24, height: sw24, backgroundColor: colorGray._6 }} />
                                )}
                                <CustomSpacer isHorizontal={true} space={sw8} />
                                <Text numberOfLines={1} style={fs16BoldBlue1}>
                                  {itemExtractor.label}
                                </Text>
                                <CustomSpacer isHorizontal={true} space={sw8} />
                                <Text numberOfLines={1} style={fs16RegGray5}>
                                  {itemExtractor.value}
                                </Text>
                                <CustomFlexSpacer />
                                {selected ? (
                                  <View style={{ ...centerHV, ...circle(sw16, colorGreen._1) }}>
                                    <IcoMoon color={colorWhite._1} name="check-v2" size={sh12} />
                                  </View>
                                ) : null}
                              </View>
                            </TouchableWithoutFeedback>
                          );
                        }}
                        showsVerticalScrollIndicator={false}
                        style={{ maxHeight: sh176 }}
                      />
                    </View>
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
