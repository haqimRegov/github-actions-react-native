import DateTimePicker from "@react-native-community/datetimepicker";
import moment, { isDate } from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Keyboard, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT, NunitoRegular } from "../../constants";
import { Language } from "../../constants/language";
import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlue,
  colorGray,
  colorWhite,
  flexRow,
  fs16BoldBlue1,
  fullHW,
  noBGColor,
  px,
  sh228,
  sh44,
  sw12,
  sw15,
  sw16,
  sw2,
  sw24,
  sw356,
  sw360,
} from "../../styles";
import { CustomTextInput } from "../Input";
import { BasicModal } from "../Modals";
import { CustomButton } from "../Touchables";
import { CustomFlexSpacer } from "../Views";

const { DATE_PICKER } = Language.PAGE;

interface NewDatePickerProps {
  buttonStyle?: ViewStyle;
  buttonText?: string;
  datePickerStyle?: ViewStyle;
  disabled?: boolean;
  error?: string;
  initialDate?: Date;
  keyboardAvoidingRef?: TypeKeyboardAvoidingView;
  maximumDate?: Date;
  minimumDate?: Date;
  mode: "date" | "time";
  placeholder?: string;
  selectedFormat?: string;
  setValue: (value: Date) => void;
  value?: Date;
  viewStyle?: ViewStyle;
}

export const NewDatePicker: FunctionComponent<NewDatePickerProps> = ({
  buttonStyle,
  buttonText,
  datePickerStyle,
  disabled,
  error,
  mode,
  initialDate,
  keyboardAvoidingRef,
  minimumDate,
  maximumDate,
  placeholder,
  selectedFormat,
  setValue,
  value,
  viewStyle,
}: NewDatePickerProps) => {
  const [layout, setLayout] = useState<IBasicLayout>({ x: 0, y: 0, width: 0, height: 0 });
  const [ref, setRef] = useState<View | null>(null);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [collapsibleModal, setCollapsibleModal] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const defaultInitialDate = initialDate !== undefined ? initialDate : new Date();
  const defaultDate = isDate(value) ? value : defaultInitialDate;
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);

  const modeFormat = mode === "date" ? DEFAULT_DATE_FORMAT : DEFAULT_TIME_FORMAT;
  const defaultFormat = selectedFormat !== undefined ? selectedFormat : modeFormat;

  const initialValue = value !== undefined ? value : "";
  const selectedValue = isDate(initialValue) ? moment(initialValue).format(defaultFormat) : "";

  const icon = mode === "date" ? "calendar" : "clock";
  const defaultPlaceholder = mode === "date" ? DATE_PICKER.PLACEHOLDER_DATE : DATE_PICKER.PLACEHOLDER_TIME;
  const customPlaceholder = placeholder !== undefined ? placeholder : defaultPlaceholder;

  // TODO
  /**
   * Known Issues:
   * 1. Absolute position is wrong when keyboard is open (quick solution, pass keyboardAvoidingRef)
   */

  const handleDateChange = (_event: Event, date?: Date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
  };

  const handleAnimationClose = () => {
    setCollapse(true);
    setTimeout(() => {
      setCollapsibleModal(false);
    }, 80);
  };

  const handleBackdropPress = () => {
    if (selectedDate !== value) {
      setSelectedDate(defaultDate);
    }
    handleAnimationClose();
  };

  const handleConfirmDate = () => {
    setValue(selectedDate);
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

  const placeholderStyle: TextStyle = selectedValue ? {} : { color: colorGray._4, fontFamily: NunitoRegular };
  const pickerStyle: ViewStyle = { height: sh228, ...datePickerStyle };

  const defaultButtonStyle: ViewStyle = {
    backgroundColor: colorBlue._1,
    borderWidth: 0,
    borderBottomRightRadius: sw16,
    borderBottomLeftRadius: sw16,
    width: sw356,
    ...buttonStyle,
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

  return (
    <Fragment>
      <View ref={setRef} renderToHardwareTextureAndroid={true}>
        <TouchableWithoutFeedback onPress={handleExpand}>
          <View onStartShouldSetResponderCapture={() => true}>
            <CustomTextInput
              disabled={disabled}
              error={error}
              editable={false}
              placeholder={customPlaceholder}
              rightIcon={{ name: icon }}
              value={selectedValue}
              viewStyle={viewStyle}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <BasicModal animationOutTiming={80} visible={collapsibleModal} hasBackdrop={false}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={fullHW}>
            <View style={dropdownContainer}>
              <View style={{ ...centerVertical, ...flexRow, height: sh44, ...px(sw15) }}>
                <Text style={{ ...fs16BoldBlue1, ...placeholderStyle }}>{selectedValue || customPlaceholder}</Text>
                <CustomFlexSpacer />
                <IcoMoon color={colorBlue._1} name={icon} size={sw24} />
              </View>
              <Collapsible duration={100} collapsed={collapse} style={noBGColor}>
                <View style={{ borderTopWidth: sw2, borderTopColor: colorBlue._1 }}>
                  <View style={pickerStyle}>
                    <DateTimePicker
                      display="spinner"
                      is24Hour={true}
                      maximumDate={maximumDate}
                      minimumDate={minimumDate}
                      mode={mode}
                      onChange={handleDateChange}
                      style={pickerStyle}
                      textColor="black"
                      value={selectedDate}
                    />
                  </View>
                  <View style={{ backgroundColor: colorBlue._1, borderBottomRightRadius: sw12, borderBottomLeftRadius: sw12 }}>
                    <CustomButton
                      buttonStyle={defaultButtonStyle}
                      onPress={handleConfirmDate}
                      text={buttonText || DATE_PICKER.BUTTON_CONFIRM}
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
