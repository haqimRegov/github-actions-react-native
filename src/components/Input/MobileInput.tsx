import React, { Fragment, FunctionComponent } from "react";
import {
  FlatList,
  Image,
  NativeSyntheticEvent,
  Text,
  TextInputFocusEventData,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

import { Language } from "../../constants/language";
import { DICTIONARY_COUNTRY_CODE } from "../../data/dictionary";
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
  disabledOpacity,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs12RegGray6,
  fs12SemiBoldRed2,
  noBorderBottom,
  px,
  py,
  sh16,
  sh200,
  sh38,
  sh40,
  sh8,
  shadowBlue5,
  sw1,
  sw16,
  sw20,
  sw24,
  sw304,
  sw358,
  sw360,
  sw8,
} from "../../styles";
import { CollapsibleDropdown } from "../Collapsible";
import { CustomSpacer } from "../Views";
import { CustomTextInput, CustomTextInputProps } from "./Input";

const { INPUT_MOBILE } = Language.PAGE;

interface MobileInputProps extends CustomTextInputProps {
  // disabled?: boolean;
  // error?: string;
  // keyboardType?: KeyboardTypeOptions;
  // label?: string;
  // labelStyle?: TextStyle;
  // // onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  // placeholder?: string;
  // spaceToLabel?: number;
  // spaceToTop?: number;
  // style?: ViewStyle;

  onChangeCode: (text: string) => void;
  code: string;
}

export const MobileInput: FunctionComponent<MobileInputProps> = ({
  code,
  disabled,
  error,
  label,
  labelStyle,
  onBlur,
  onChangeText,
  onChangeCode,
  spaceToLabel,
  spaceToTop,
  style,
  value,
  ...textInputProps
}: MobileInputProps) => {
  const borderColor = error !== undefined ? colorRed._2 : colorGray._7;
  const baseDropdownStyle: ViewStyle = {
    ...border(colorGray._7, sw1, sw20),
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
  };

  const dummyStyle: ViewStyle = {
    borderWidth: 0,
    height: sh38,
    width: sw358,
  };

  const numberInputStyle: ViewStyle = {
    borderRadius: undefined,
    borderWidth: 0,
    height: sh38,
    width: "100%",
    borderTopRightRadius: sw24,
    borderBottomRightRadius: sw24,
  };

  const placeholderLabel = textInputProps.placeholder || INPUT_MOBILE.PLACEHOLDER;

  const defaultLabelSpace = spaceToLabel === undefined ? 0 : spaceToLabel;
  const disabledStyle = disabled === true ? disabledOpacity : {};

  return (
    <View style={disabledStyle}>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label === undefined ? null : (
        <Fragment>
          <Text style={{ ...fs12BoldBlack2, ...labelStyle }}>{label}</Text>
          <CustomSpacer space={defaultLabelSpace} />
        </Fragment>
      )}
      <View onStartShouldSetResponderCapture={() => disabled === true} style={flexRow}>
        <CollapsibleDropdown
          baseDropdownStyle={baseDropdownStyle}
          baseViewProps={{ onStartShouldSetResponderCapture: undefined }}
          dummyBaseStyle={dummyStyle}
          RenderBase={({ collapse, dummyBaseStyle }) => {
            const dummyBorderColor = collapse === true ? {} : { borderColor: colorGray._7 };
            const inputBorder: ViewStyle =
              collapse === false ? { ...noBorderBottom, borderBottomColor: colorTransparent, ...dummyBorderColor } : {};

            const defaultInputStyle: ViewStyle = {
              ...border(borderColor, sw1, sw20),
              ...centerVertical,
              ...flexRow,
              backgroundColor: colorWhite._1,
              height: sh40,
              width: sw360,
              ...inputBorder,
              ...dummyBaseStyle,
            };
            const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
              if (onChangeText !== undefined) {
                onChangeText(event.nativeEvent.text);
              }
              if (onBlur !== undefined) {
                onBlur(event);
              }
            };

            const countryCodeIndex = DICTIONARY_COUNTRY_CODE.findIndex((countryCode) => countryCode.value === code);
            const valueExtractor = DICTIONARY_COUNTRY_CODE[countryCodeIndex];

            return (
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
                    defaultValue={value}
                    onBlur={handleBlur}
                    placeholder={placeholderLabel}
                    viewStyle={numberInputStyle}
                    {...textInputProps}
                  />
                </View>
              </View>
            );
          }}
          RenderDropdown={({ handleClose }) => {
            const dropdownStyle: ViewStyle = {
              backgroundColor: colorWhite._1,
              borderBottomLeftRadius: sw24,
              borderBottomRightRadius: sw24,
              ...style,
            };

            return (
              <View>
                <View style={borderBottomGray7} />
                <View style={dropdownStyle}>
                  <FlatList
                    data={DICTIONARY_COUNTRY_CODE.map((item) => item.label)}
                    style={{ ...px(sw16), maxHeight: sh200 }}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
                    keyExtractor={(item, index) => `${item}-${index}`}
                    ListHeaderComponent={() => <CustomSpacer space={sh8} />}
                    ListFooterComponent={() => <CustomSpacer space={sh8} />}
                    renderItem={({ index }) => {
                      const itemContainer: ViewStyle = { ...centerVertical, ...flexRow, ...py(sh8) };
                      const itemExtractor = DICTIONARY_COUNTRY_CODE[index];

                      const handleSelect = () => {
                        handleClose();
                        setTimeout(() => {
                          if (itemExtractor !== undefined) {
                            onChangeCode(itemExtractor.value);
                          }
                        }, 250);
                      };

                      return (
                        <TouchableWithoutFeedback key={itemExtractor.label} onPress={handleSelect}>
                          <View style={itemContainer}>
                            {itemExtractor.flag !== undefined ? (
                              <Image source={itemExtractor.flag} style={{ width: sw24, height: sw24, ...shadowBlue5 }} />
                            ) : (
                              <View style={{ width: sw24, height: sw24, backgroundColor: colorBlack._2 }} />
                            )}
                            <CustomSpacer isHorizontal={true} space={sw8} />
                            <Text numberOfLines={1} style={fs12BoldBlack2}>
                              {itemExtractor.label}
                            </Text>
                            <CustomSpacer isHorizontal={true} space={sw8} />
                            <Text numberOfLines={1} style={fs12RegGray6}>
                              {itemExtractor.value}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
      {error === undefined ? null : (
        <Fragment>
          <CustomSpacer space={sh8} />
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw16} />
            <IcoMoon color={colorRed._2} name="error" size={sh16} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={{ ...fs12SemiBoldRed2, width: sw304 }}>{error}</Text>
          </View>
        </Fragment>
      )}
    </View>
  );
};
