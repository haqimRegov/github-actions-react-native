import React, { Fragment, FunctionComponent, useState } from "react";
import { LayoutChangeEvent, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import { CalculateCount } from "../../integrations";
import {
  border,
  centerHV,
  centerVertical,
  colorBlack,
  colorBlue,
  colorGray,
  colorTransparent,
  colorWhite,
  flexRow,
  flexWrap,
  fs12BoldBlack2,
  fs12SemiBoldBlue2,
  fs12SemiBoldWhite1,
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
  sw24,
  sw240,
  sw35,
  sw358,
  sw360,
  sw4,
  sw8,
} from "../../styles";
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

export interface moreDetails {
  active: boolean;
  number: number;
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
  const [showMore, setShowMore] = useState<moreDetails>({ active: false, number: 0 });
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

  const defaultLabelStyle: TextStyle = { ...fs12SemiBoldWhite1, ...labelStyle };
  const defaultPlaceholderStyle: TextStyle = { ...fs16RegBlack2, ...placeholderStyle };
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
    const count = await CalculateCount(updatedArray, sw240, sw35);
    setShowMore({ ...showMore, number: count });
  };

  return (
    <View>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label === undefined ? null : (
        <Fragment>
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw16} />
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
              backgroundColor: colorBlue._2,
            };

            const handleWidth = async (event: LayoutChangeEvent) => {
              const { height, width } = event.nativeEvent.layout;
              if (showMore.active === false) {
                if (width >= sw240) {
                  setShowMore({ ...showMore, active: true });
                }
              } else if ((height < sh24 && showMore.active === true) || width < sw240) {
                setShowMore({ ...showMore, active: false, number: 0 });
              }
            };
            const dropdownBaseStyle: ViewStyle = {
              ...flexRow,
              maxWidth: sw240,
              ...flexWrap,
              height: sh24,
              overflow: "hidden",
            };
            const showMoreText = `+${showMore.number} More`;

            return (
              <View style={defaultInputStyle}>
                <View style={dropdownBaseStyle} onLayout={handleWidth}>
                  {value.length !== 0 ? (
                    <Fragment>
                      {value.map((item: string, index: number) => {
                        const handleClose = async () => {
                          const valueClone = [...value];
                          valueClone.splice(index, 1);
                          const count = await CalculateCount(valueClone, sw240, sw35);
                          setShowMore({ ...showMore, number: count });
                          handleChange(valueClone);
                        };

                        return (
                          <Fragment key={index}>
                            <Fragment>
                              {index !== 0 ? <CustomSpacer isHorizontal={true} space={sw4} /> : null}
                              <TouchableWithoutFeedback onPress={handleClose}>
                                <View style={defaultTagStyle} onStartShouldSetResponderCapture={() => true}>
                                  <Text style={valueStyle}>{item}</Text>
                                  <CustomSpacer isHorizontal={true} space={sw4} />
                                  <View style={centerHV}>
                                    <IcoMoon color={colorWhite._1} name="close" size={sw12} />
                                  </View>
                                </View>
                              </TouchableWithoutFeedback>
                            </Fragment>
                          </Fragment>
                        );
                      })}
                    </Fragment>
                  ) : (
                    <Text style={valueStyle}>{placeholderLabel}</Text>
                  )}
                </View>
                <View>
                  {showMore.active === true && showMore.number > 0 ? (
                    <Fragment>
                      <CustomSpacer isHorizontal={true} space={sw4} />
                      <View style={{ ...defaultTagStyle, backgroundColor: colorGray._3 }}>
                        <Text style={fs12SemiBoldBlue2}>{showMoreText}</Text>
                      </View>
                    </Fragment>
                  ) : null}
                </View>
                <CustomFlexSpacer />
                <IcoMoon color={colorBlack._2} name="caret-down" size={sw20} />
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
