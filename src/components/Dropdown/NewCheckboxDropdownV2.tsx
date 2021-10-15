import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, LayoutChangeEvent, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { BasicModal } from "..";
import { Language } from "../../constants/language";
import { IcoMoon } from "../../icons";
import {
  border,
  centerVertical,
  colorBlue,
  colorWhite,
  disabledOpacity,
  flexChild,
  flexRow,
  flexWrap,
  fs12BoldBlack2,
  fs12BoldBlue2,
  fs16RegBlack2,
  fullHW,
  noBGColor,
  overflowHidden,
  px,
  py,
  sh12,
  sh16,
  sh176,
  sh22,
  sh44,
  sh48,
  sh8,
  sh9,
  sw1,
  sw12,
  sw14,
  sw16,
  sw2,
  sw24,
  sw264,
  sw32,
  sw360,
  sw4,
  sw8,
} from "../../styles";
import { CheckBox } from "../CheckBox";
import { CustomFlexSpacer, CustomSpacer } from "../Views";

const { DROPDOWN } = Language.PAGE;

interface NewCheckBoxDropdownV2Props {
  disabled?: boolean;
  handleChange: (text: string[]) => void;
  items: TypeLabelValue[];
  keyboardAvoidingRef?: TypeKeyboardAvoidingView;
  label?: string;
  labelStyle?: TextStyle;
  placeholder?: string;
  spaceToLabel?: number;
  spaceToTop?: number;
  style?: ViewStyle;
  value: string[];
  viewStyle?: ViewStyle;
}

interface IOverflow {
  width: number;
  value: string;
  overflow: boolean;
}

export const NewCheckBoxDropdownV2: FunctionComponent<NewCheckBoxDropdownV2Props> = ({
  disabled,
  handleChange,
  items,
  keyboardAvoidingRef,
  label,
  labelStyle,
  placeholder,
  spaceToLabel,
  spaceToTop,
  style,
  value,
  viewStyle,
}: NewCheckBoxDropdownV2Props) => {
  const [layout, setLayout] = useState<IBasicLayout>({ x: 0, y: 0, width: 0, height: 0 });
  const [ref, setRef] = useState<View | null>(null);
  const pillRef = useRef<View | null>(null);
  // console.log("pillRef", pillRef);
  // const parentRef = useRef<View | null>(null);
  // console.log("parentRef", parentRef);
  // const [pillTotalWidth, setPillTotalWidth] = useState<number>(0);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [collapsibleModal, setCollapsibleModal] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  // const [overflow, setOverflow] = useState<boolean>(false);
  const [overflowValue, setOverflowValue] = useState<IOverflow[]>([]);
  // const [measuredLayout, setMeasuredLayout] = useState(0);
  // console.log("measuredLayout", measuredLayout);

  const placeholderLabel = placeholder || DROPDOWN.PLACEHOLDER;

  const defaultLabelSpace = spaceToLabel === undefined ? 0 : spaceToLabel;
  const labelExtractor = items.map((item) => item.label);
  const itemsWithId = items.map((item, index) => ({ ...item, id: index }));

  const disabledStyle = disabled === true ? disabledOpacity : {};

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
    Keyboard.dismiss();
    if (ref !== null && keyboardVisible === false) {
      ref.measure((_x, _y, _width, _height, pageX, pageY) => {
        let measurement = { x: pageX, y: pageY, height: _height, width: _width };
        if (keyboardAvoidingRef !== undefined && keyboardAvoidingRef !== null) {
          Keyboard.dismiss();
          const keyboardOffset = keyboardAvoidingRef.state.bottom;
          measurement = { ...measurement, y: measurement.y + keyboardOffset };
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

  const dropdownContainer: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderColor: colorBlue._2,
    borderRadius: sw16,
    borderWidth: sw2,
    left: layout.x,
    position: "absolute",
    top: layout.y,
    width: sw360,
    zIndex: 3,
    ...viewStyle,
  };

  // const placeholderStyle: TextStyle = value.length > 0 ? {} : { color: colorBlack._3, fontFamily: NunitoRegular };
  // const inputStyle: ViewStyle = collapsibleModal ? { borderColor: colorTransparent } : {};

  const handleKeyboardDidShow = () => {
    setKeyboardVisible(true);
  };
  const handleKeyboardHide = () => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", handleKeyboardHide);
    return () => {
      Keyboard.removeListener("keyboardDidShow", handleKeyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", handleKeyboardHide);
    };
  }, []);

  // const dropdownBaseStyle: ViewStyle = {
  //   ...flexRow,
  //   ...flexWrap,
  //   height: sh24,
  //   maxWidth: sw268,
  //   overflow: "hidden",
  // };

  // const defaultInputStyle: ViewStyle = {
  //   ...border(colorGray._7, sw1, sw20),
  //   ...centerVertical,
  //   ...flexRow,
  //   ...px(sw16),
  //   backgroundColor: colorWhite._1,
  //   height: sh40,
  //   width: collapse === false ? sw358 : sw360,
  //   // ...inputBorder,
  // };

  const defaultInputStyle: ViewStyle = {
    ...border(colorWhite._3, sw1, sw32),
    ...centerVertical,
    ...flexRow,
    ...px(sw1),
    backgroundColor: colorWhite._1,
    height: sh48,
    width: sw360,
    ...disabledStyle,
    ...viewStyle,
  };

  // const defaultTagStyle: ViewStyle = {
  //   ...flexRow,
  //   ...px(sw8),
  //   ...py(sh4),
  //   borderRadius: sw24,
  //   backgroundColor: colorBlue._7,
  //   maxWidth: sw256,
  // };

  // console.log("value", value);
  // const handleWidth = async (event: LayoutChangeEvent) => {
  //   const { height, width } = event.nativeEvent.layout;
  //   console.log(height, width);
  //   // if (showMore.active === false) {
  //   //   if (width >= sw256) {
  //   //     setShowMore({ ...showMore, active: true });
  //   //   }
  //   // } else if ((height < sh24 && showMore.active === true) || width < sw256) {
  //   //   setShowMore({ ...showMore, active: false, number: 0 });
  //   // }
  // };

  const handleValue = (searchValue: string) => {
    // let reset: boolean = false;
    let newValue = [...value!];
    if (newValue.includes(searchValue)) {
      newValue = newValue.filter((item) => item !== searchValue);

      // setPillTotalWidth(0);
      // reset = true;
      let newOverflowValue = [...overflowValue];
      newOverflowValue = overflowValue.filter((item) => item.value !== searchValue);
      let widthSum = 0;
      if (newOverflowValue.length > 0) {
        newOverflowValue = newOverflowValue.map((ofv) => {
          const { width } = ofv;
          const newOfv = { ...ofv, overflow: widthSum + width > sw264 };

          // if (ofv.overflow === false) {
          widthSum += width + sw8;
          // }

          return newOfv;
        });
        // .reduce((totalWidth: number, currentWidth: number) => totalWidth + currentWidth);
      }
      // console.log("widthSum", widthSum);
      // console.log("newOverflowValue", newOverflowValue);
      setOverflowValue(newOverflowValue);
    } else {
      newValue.push(searchValue);
    }
    handleChange!(newValue);
    // console.log("after handleChange");
    // handleReset!(index, reset);
  };

  // console.log("pillTotalWidth", pillTotalWidth);

  // useEffect(() => {
  //   setPillTotalWidth(0);
  // }, [value]);

  const handleParentLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    // setPillTotalWidth(pillTotalWidth + width);
    // console.log("handleParentLayout height", height);
    // setOverflow(height > 24);
    if (height === 0) {
      // console.log("height zero", height);
      // setOverflow(false);
      setOverflowValue([]);
    }
  };

  // console.log("overflow", overflow);
  // console.log("overflowValue", overflowValue);

  // useEffect(() => {
  //   const pillTotalWidth =
  //     overflowValue.length !== 0
  //       ? overflowValue
  //           .map((ofv) => {
  //             let { width } = ofv;

  //             if (ofv.overflow === false) {
  //               width += sw8;
  //             }

  //             return width;
  //           })
  //           .reduce((totalWidth: number, currentWidth: number) => totalWidth + currentWidth)
  //       : 288;
  //   console.log("pillTotalWidth", pillTotalWidth);
  //   if (pillTotalWidth < 288) {
  //     setOverflowValue([]);
  //   }
  // }, [value]);
  // useEffect(() => {
  //   let overflowWidth = 0;
  //   let updatedOverflowValue = [...overflowValue];
  //   if (overflowValue.length > 0 && overflowValue.length !== value.length) {
  //     updatedOverflowValue = overflowValue.map((ofv) => {
  //       const { width } = ofv;
  //       const newOfv = { ...ofv, overflow: overflowWidth + width > sw264 };

  //       // if (ofv.overflow === false) {
  //       overflowWidth += width + sw8;
  //       // }

  //       return newOfv;
  //     });
  //     // .reduce((totalWidth: number, currentWidth: number) => totalWidth + currentWidth);
  //     console.log("updatedOverflowValue", updatedOverflowValue);
  //     setOverflowValue(updatedOverflowValue);
  //   }
  //   // console.log("pillTotalWidth", pillTotalWidth);
  //   // if (pillTotalWidth < 288) {
  //   // }
  // }, [value]);
  const overflowCount = overflowValue.filter((ofv) => ofv.overflow === true);

  const input = (
    <View style={{ ...centerVertical, ...flexRow, height: sh44, ...px(sw14), ...flexChild }}>
      <View style={{ ...flexRow, ...flexWrap, ...overflowHidden, maxWidth: sw264 }} onLayout={handleParentLayout}>
        {value.length !== 0 ? (
          value
            // .sort((a, b) => a.length - b.length)
            .map((selectedValue, valueIndex) => {
              const handlePillLayout = (e: LayoutChangeEvent) => {
                const { y, width } = e.nativeEvent.layout;
                // setPillTotalWidth(pillTotalWidth + width);
                // console.log("pillLayout", selectedValue, e.nativeEvent.layout);
                const newOverflowValue = [...overflowValue];
                const findExisting = newOverflowValue.findIndex((ofv) => ofv.value === selectedValue);
                // console.log("findExisting", findExisting);
                if (findExisting === -1) {
                  newOverflowValue.push({ value: selectedValue, width: width, overflow: y > 0 });
                }
                // const uniqueOverflow = [...new Set(newOverflowValue)];

                // console.log("uniqueOverflow", uniqueOverflow);
                // console.log("y", y);
                // console.log("newOverflowValue", newOverflowValue);
                setOverflowValue(newOverflowValue);
              };
              return overflowValue.findIndex((ofv) => ofv.value === selectedValue && ofv.overflow === true) !== -1 ? null : (
                <View key={valueIndex} ref={pillRef} style={flexRow} onLayout={handlePillLayout}>
                  <TouchableWithoutFeedback onPress={() => handleValue(selectedValue)}>
                    <View
                      style={{
                        backgroundColor: colorBlue._3,
                        borderRadius: sw24,
                        ...px(sw8),
                        ...flexRow,
                        ...centerVertical,
                      }}>
                      <Text style={{ ...fs12BoldBlue2 }}>{selectedValue}</Text>
                      <CustomSpacer isHorizontal={true} space={sw4} />
                      <IcoMoon color={colorBlue._2} name="close" size={sh12} />
                    </View>
                  </TouchableWithoutFeedback>
                  <CustomSpacer isHorizontal={true} space={sw8} />
                </View>
              );
            })
        ) : (
          <Text style={fs16RegBlack2}>{placeholderLabel}</Text>
        )}
      </View>
      {overflowCount.length === 0 ? null : <Text style={fs16RegBlack2}>+ {overflowCount.length}</Text>}
      <CustomFlexSpacer />
      <IcoMoon color={colorBlue._2} name="caret-down" size={sw24} />
    </View>
  );

  return (
    <Fragment>
      <View>
        {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
        {label === undefined ? null : (
          <Fragment>
            <Text style={{ ...fs12BoldBlack2, ...disabledStyle, ...labelStyle }}>{label}</Text>
            <CustomSpacer space={defaultLabelSpace} />
          </Fragment>
        )}
        <View ref={setRef} renderToHardwareTextureAndroid={true}>
          <TouchableWithoutFeedback onPress={handleExpand}>
            <View style={defaultInputStyle}>{input}</View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <BasicModal animationOutTiming={80} visible={collapsibleModal} hasBackdrop={false}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={fullHW}>
            <View style={dropdownContainer}>
              {input}
              <Collapsible duration={100} collapsed={collapse} style={noBGColor}>
                <View style={{ borderTopWidth: sw2, borderTopColor: colorBlue._2 }}>
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
                        const itemExtractor = itemsWithId![index];
                        const itemValue = itemExtractor.value;
                        const selected = value!.includes(itemValue);
                        const itemContainer: ViewStyle = { ...px(sw16) };

                        const handleSelect = () => {
                          // let reset: boolean = false;
                          if (itemExtractor !== undefined) {
                            handleValue(itemValue);
                            // handleReset!(index, reset);
                          }
                        };

                        return (
                          <TouchableWithoutFeedback key={index} onPress={handleSelect}>
                            <View style={itemContainer}>
                              <CheckBox
                                label={itemExtractor.label}
                                labelStyle={{ fontSize: sh16, lineHeight: sh22 }}
                                numberOfLines={1}
                                onPress={handleSelect}
                                spaceToLabel={sw12}
                                style={{ ...py(sh9) }}
                                toggle={selected}
                              />
                              {index !== labelExtractor.length - 1 && <CustomSpacer space={sh8} />}
                            </View>
                          </TouchableWithoutFeedback>
                        );
                      }}
                      showsVerticalScrollIndicator={false}
                      scrollEventThrottle={16}
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
