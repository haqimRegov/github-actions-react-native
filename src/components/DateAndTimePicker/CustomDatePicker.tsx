import DateTimePicker from "@react-native-community/datetimepicker";
import moment, { isDate } from "moment";
import React, { useState } from "react";
import { View, ViewStyle } from "react-native";

import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from "../../constants";
import { Language } from "../../constants/language";
import {
  colorBlue,
  colorGray,
  colorTransparent,
  colorWhite,
  flexRow,
  sh228,
  sh38,
  sw1,
  sw20,
  sw24,
  sw32,
  sw358,
  sw360,
} from "../../styles";
import { CollapsibleDropdown } from "../Collapsible";
import { CustomTextInput } from "../Input";
import { CustomButton } from "../Touchables";

const { DATE_PICKER } = Language.PAGE;

interface CustomDatePickerProps {
  buttonText?: string;
  datePickerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  initialDate?: Date;
  keyboardAvoidingRef?: TypeKeyboardAvoidingView;
  maximumDate?: Date;
  minimumDate?: Date;
  mode: "date" | "time";
  placeholder?: string;
  selectedFormat?: string;
  setValue: (value: Date) => void;
  value?: Date;
}

export const CustomDatePicker = ({
  buttonText,
  datePickerStyle,
  dropdownStyle,
  mode,
  initialDate,
  keyboardAvoidingRef,
  minimumDate,
  maximumDate,
  placeholder,
  selectedFormat,
  setValue,
  value,
}: CustomDatePickerProps) => {
  const defaultInitialDate = initialDate !== undefined ? initialDate : new Date();
  const defaultDate = isDate(value) ? value : defaultInitialDate;
  const modeFormat = mode === "date" ? DEFAULT_DATE_FORMAT : DEFAULT_TIME_FORMAT;
  const defaultFormat = selectedFormat !== undefined ? selectedFormat : modeFormat;
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
  const initialValue = value !== undefined ? value : "";
  const selectedValue = isDate(initialValue) ? moment(initialValue).format(defaultFormat) : "";
  const buttonLabel = buttonText !== undefined ? buttonText : DATE_PICKER.BUTTON_CONFIRM;

  const handleDateChange = (_event: Event, date?: Date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
  };

  const handleOnClose = () => {
    if (selectedDate !== value) {
      setSelectedDate(defaultDate);
    }
  };

  const icon = mode === "date" ? "calendar" : "clock";
  const defaultPlaceholder = mode === "date" ? DATE_PICKER.PLACEHOLDER_DATE : DATE_PICKER.PLACEHOLDER_TIME;

  const baseDropdownStyle: ViewStyle = {
    backgroundColor: colorTransparent,
    borderBottomColor: colorTransparent,
    borderBottomLeftRadius: sw32,
    borderBottomRightRadius: sw32,
    borderColor: colorGray._7,
    borderTopLeftRadius: sw20,
    borderTopRightRadius: sw20,
    borderWidth: sw1,
    width: sw360,
    ...dropdownStyle,
  };

  const dummyInputStyle: ViewStyle = {
    width: sw358,
    borderWidth: 0,
  };

  const pickerStyle: ViewStyle = { width: sw360, height: sh228, ...datePickerStyle };

  const buttonStyle: ViewStyle = {
    backgroundColor: colorBlue._2,
    borderWidth: 0,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
    width: sw358,
  };

  return (
    <View style={flexRow}>
      <CollapsibleDropdown
        baseDropdownStyle={baseDropdownStyle}
        dummyBaseStyle={dummyInputStyle}
        onBackdropPress={handleOnClose}
        onExpandedBasePress={handleOnClose}
        keyboardAvoidingRef={keyboardAvoidingRef}
        RenderBase={({ dummyBaseStyle }) => {
          const baseInputStyle: ViewStyle = {
            height: sh38,
            borderWidth: 0,
            width: sw358,
          };

          const containerStyle: ViewStyle = {
            borderRadius: sw32,
            borderWidth: sw1,
            borderColor: colorGray._7,
            width: sw360,
            ...dummyBaseStyle,
          };

          return (
            <View style={containerStyle}>
              <CustomTextInput
                editable={false}
                placeholder={placeholder || defaultPlaceholder}
                rightIcon={icon}
                value={selectedValue}
                viewStyle={baseInputStyle}
              />
            </View>
          );
        }}
        RenderDropdown={({ collapse, handleClose }) => {
          const dropdownContainer: ViewStyle = {
            backgroundColor: colorWhite._1,
            borderBottomLeftRadius: sw24,
            borderBottomRightRadius: sw24,
          };

          const collapseContainer: ViewStyle = collapse
            ? {}
            : {
                borderTopWidth: sw1,
                borderColor: colorGray._7,
                borderBottomLeftRadius: sw24,
                borderBottomRightRadius: sw24,
                width: sw358,
              };

          const handleConfirmDate = () => {
            setValue(selectedDate);
            handleClose();
          };

          return (
            <View style={dropdownContainer}>
              <View style={collapseContainer}>
                <DateTimePicker
                  display="calendar"
                  is24Hour={true}
                  maximumDate={maximumDate}
                  minimumDate={minimumDate}
                  mode={mode}
                  onChange={handleDateChange}
                  style={pickerStyle}
                  value={selectedDate}
                />
                <CustomButton buttonStyle={buttonStyle} onPress={handleConfirmDate} text={buttonLabel} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
