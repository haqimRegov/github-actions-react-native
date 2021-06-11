import React, { Fragment, FunctionComponent } from "react";
import { FlatList, Image, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { DICTIONARY_MOBILE_CODE } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import {
  border,
  borderBottomGray7,
  centerVertical,
  colorBlack,
  colorGray,
  colorRed,
  colorWhite,
  disabledOpacity,
  flexRow,
  fs12BoldBlack2,
  fs12RegGray6,
  fs12SemiBoldRed2,
  px,
  py,
  sh16,
  sh176,
  sh38,
  sh8,
  shadowBlue5,
  sw1,
  sw16,
  sw20,
  sw24,
  sw304,
  sw358,
  sw8,
} from "../../styles";
import { CollapsibleMobileDropdown } from "../Collapsible/MobileDropdown";
import { CustomSpacer } from "../Views/Spacer";
import { CustomTextInputProps } from "./Input";

interface MobileInputProps extends CustomTextInputProps {
  data: IContactNumber;
  handleContactNumber: (data: IContactNumber) => void;
}

export const MobileInput: FunctionComponent<MobileInputProps> = ({
  disabled,
  label,
  labelStyle,
  spaceToLabel,
  spaceToTop,
  style,
  data,
  handleContactNumber,
  ...textInputProps
}: MobileInputProps) => {
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

  const defaultLabelSpace = spaceToLabel === undefined ? 0 : spaceToLabel;
  const disabledStyle = disabled === true ? disabledOpacity : {};

  const labelText = label !== undefined ? label : data.label;

  return (
    <View style={disabledStyle}>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {!labelText ? null : (
        <Fragment>
          <Text style={{ ...fs12BoldBlack2, ...labelStyle }}>{labelText}</Text>
          <CustomSpacer space={defaultLabelSpace} />
        </Fragment>
      )}
      <View onStartShouldSetResponderCapture={() => disabled === true} style={flexRow}>
        <CollapsibleMobileDropdown
          baseDropdownStyle={baseDropdownStyle}
          baseViewProps={{ onStartShouldSetResponderCapture: undefined }}
          data={data}
          setData={handleContactNumber}
          dummyBaseStyle={dummyStyle}
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
                    data={DICTIONARY_MOBILE_CODE.map((item) => item.label)}
                    style={{ ...px(sw16), maxHeight: sh176 }}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
                    keyExtractor={(item, index) => `${item}-${index}`}
                    ListHeaderComponent={() => <CustomSpacer space={sh8} />}
                    ListFooterComponent={() => <CustomSpacer space={sh8} />}
                    renderItem={({ index }) => {
                      const itemContainer: ViewStyle = { ...centerVertical, ...flexRow, ...py(sh8) };
                      const itemExtractor = DICTIONARY_MOBILE_CODE[index];

                      const handleSelect = () => {
                        handleClose();
                        setTimeout(() => {
                          if (itemExtractor !== undefined) {
                            const updatedData: IContactNumber = { ...data, code: itemExtractor.value };
                            handleContactNumber(updatedData);
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
          {...textInputProps}
        />
      </View>
      {data.error === undefined ? null : (
        <Fragment>
          <CustomSpacer space={sh8} />
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw16} />
            <IcoMoon color={colorRed._2} name="error" size={sh16} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={{ ...fs12SemiBoldRed2, width: sw304 }}>{data.error}</Text>
          </View>
        </Fragment>
      )}
    </View>
  );
};
