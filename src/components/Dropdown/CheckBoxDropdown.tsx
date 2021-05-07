import React, { Fragment, FunctionComponent, useState } from "react";
import { LayoutChangeEvent, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import { CalculateCount } from "../../integrations";
import {
  border,
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  colorTransparent,
  colorWhite,
  flexRow,
  flexWrap,
  fs12BoldBlack2,
  fs12BoldBlue2,
  fs12SemiBoldBlue38,
  fs16RegBlack2,
  noBorderBottom,
  px,
  py,
  sh192,
  sh24,
  sh38,
  sh4,
  sh40,
  sw1,
  sw12,
  sw16,
  sw20,
  sw228,
  sw24,
  sw256,
  sw268,
  sw304,
  sw358,
  sw360,
  sw4,
  sw8,
} from "../../styles";
import { shortenString } from "../../utils";
import { CollapsibleDropdown } from "../Collapsible";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

const { DROPDOWN } = Language.PAGE;
export interface CheckBoxDropdownProps {
  checkBoxStyle?: TextStyle;
  handleChange: (text: string[]) => void;
  items: TypeLabelValue[];
  label?: string;
  labelStyle?: TextStyle;
  placeholder?: string;
  placeholderStyle?: TextStyle;
  spaceToLabel?: number;
  spaceToTop?: number;
  style?: ViewStyle;
  value: string[];
}

export const CheckBoxDropdown: FunctionComponent<CheckBoxDropdownProps> = ({
  checkBoxStyle,
  handleChange,
  items,
  label,
  labelStyle,
  placeholder,
  placeholderStyle,
  spaceToLabel,
  spaceToTop,
  style,
  value,
}: CheckBoxDropdownProps) => {
  const [showMore, setShowMore] = useState<ICheckBoxMoreDetails>({ active: false, number: 0 });
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

  const defaultLabelStyle: TextStyle = { ...fs12SemiBoldBlue38, ...labelStyle };
  const defaultPlaceholderStyle: TextStyle = { ...fs16RegBlack2, lineHeight: sh24, ...placeholderStyle };
  const valueStyle = value.length === 0 || value === undefined ? defaultPlaceholderStyle : defaultLabelStyle;

  const placeholderLabel = placeholder || DROPDOWN.PLACEHOLDER_MANY;

  const defaultLabelSpace = spaceToLabel === undefined ? 0 : spaceToLabel;

  const handleReset = async (index: number, reset: boolean) => {
    const tempArray = value;
    let newArray = value;
    if (reset === false) {
      tempArray.push(items[index].value);
    } else {
      newArray = tempArray.filter((text: string) => text !== items[index].value);
    }
    const updatedArray = reset === false ? tempArray : newArray;
    const shortenArray = updatedArray.map((text) => shortenString(text, 25, 27));
    const count = await CalculateCount(shortenArray, sw304, sw4, fs16RegBlack2);
    setShowMore({ ...showMore, number: count });
  };

  return (
    <View>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label === undefined ? null : (
        <Fragment>
          <View style={flexRow}>
            <Text style={{ ...fs12BoldBlack2, ...labelStyle }}>{label}</Text>
          </View>
          <CustomSpacer space={defaultLabelSpace} />
        </Fragment>
      )}
      <View style={flexRow}>
        <CollapsibleDropdown
          baseDropdownStyle={baseDropdownStyle}
          checkboxLabelStyle={checkBoxStyle}
          dummyBaseStyle={dummyStyle}
          flatlistStyle={{ maxHeight: sh192 }}
          handleReset={handleReset}
          RenderBase={({ collapse, dummyBaseStyle }) => {
            const inputBorder: ViewStyle = collapse === false ? { ...noBorderBottom, borderBottomColor: colorTransparent } : {};

            const defaultInputStyle: ViewStyle = {
              ...border(colorGray._7, sw1, sw20),
              ...centerVertical,
              ...flexRow,
              ...px(sw16),
              backgroundColor: colorWhite._1,
              height: sh40,
              width: sw360,
              ...inputBorder,
              ...dummyBaseStyle,
            };
            const defaultTagStyle: ViewStyle = {
              ...flexRow,
              ...px(sw8),
              ...py(sh4),
              borderRadius: sw24,
              backgroundColor: colorGray._2,
              maxWidth: sw256,
            };

            const handleWidth = async (event: LayoutChangeEvent) => {
              const { height, width } = event.nativeEvent.layout;
              if (showMore.active === false) {
                if (width >= sw256) {
                  setShowMore({ ...showMore, active: true });
                }
              } else if ((height < sh24 && showMore.active === true) || width < sw256) {
                setShowMore({ ...showMore, active: false, number: 0 });
              }
            };
            const dropdownBaseStyle: ViewStyle = {
              ...flexRow,
              ...flexWrap,
              height: sh24,
              maxWidth: sw268,
              overflow: "hidden",
            };

            return (
              <View style={defaultInputStyle}>
                <View style={dropdownBaseStyle} onLayout={handleWidth}>
                  {value.length !== 0 ? (
                    <Fragment>
                      {value.map((item: string, index: number) => {
                        const handleClose = async () => {
                          const valueClone = [...value];
                          valueClone.splice(index, 1);
                          const count = await CalculateCount(valueClone, sw304, sw4, fs16RegBlack2);
                          setShowMore({ ...showMore, number: count });
                          handleChange(valueClone);
                        };

                        return (
                          <View key={index} style={flexRow}>
                            <Fragment>
                              {index !== 0 ? <CustomSpacer isHorizontal={true} space={sw4} /> : null}
                              <TouchableWithoutFeedback onPress={handleClose}>
                                <View style={defaultTagStyle} onStartShouldSetResponderCapture={() => true}>
                                  <Text style={{ ...valueStyle, maxWidth: sw228 }}>{shortenString(item, 25, 27)}</Text>
                                  <CustomSpacer isHorizontal={true} space={sw4} />
                                  <View style={centerHV}>
                                    <IcoMoon color={colorBlue._3_8} name="close" size={sw12} />
                                  </View>
                                </View>
                              </TouchableWithoutFeedback>
                            </Fragment>
                          </View>
                        );
                      })}
                    </Fragment>
                  ) : (
                    <Text style={valueStyle}>{placeholderLabel}</Text>
                  )}
                </View>
                <View>
                  {showMore.active === true && showMore.number > 0 ? (
                    <View style={{ ...centerVertical, ...flexRow }}>
                      <CustomSpacer isHorizontal={true} space={sw4} />
                      <IcoMoon color={colorBlue._3_8} name="plus" size={sw16} />
                      <CustomSpacer isHorizontal={true} space={sw4} />
                      <Text style={fs12BoldBlue2}>{showMore.number}</Text>
                    </View>
                  ) : null}
                </View>
                <CustomFlexSpacer />
                <IcoMoon color={colorBlue._2} name="caret-down" size={sw24} />
              </View>
            );
          }}
          value={value}
          handleChange={handleChange}
          items={items}
          style={style}
        />
      </View>
    </View>
  );
};
