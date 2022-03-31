import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, LayoutChangeEvent, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { Language } from "../../constants/language";
import { IcoMoon } from "../../icons";
import {
  border,
  centerVertical,
  colorBlue,
  colorGray,
  colorWhite,
  disabledOpacity5,
  flexChild,
  flexRow,
  flexWrap,
  fs12BoldBlue1,
  fs12BoldGray6,
  fs16BoldBlue1,
  fs16RegGray6,
  fullHW,
  noBGColor,
  overflowHidden,
  px,
  py,
  sh12,
  sh16,
  sh176,
  sh4,
  sh44,
  sh48,
  sh8,
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
import { CheckBox } from "../CheckBox/CheckBox";
import { BasicModal } from "../Modals/Basic";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

const { DROPDOWN } = Language.PAGE;

interface POCCheckboxDropdownProps {
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

export const POCCheckboxDropdown: FunctionComponent<POCCheckboxDropdownProps> = ({
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
}: POCCheckboxDropdownProps) => {
  const [layout, setLayout] = useState<IBasicLayout>({ x: 0, y: 0, width: 0, height: 0 });
  const [ref, setRef] = useState<View | null>(null);
  const pillRef = useRef<View | null>(null);
  // const parentRef = useRef<View | null>(null);
  // const [pillTotalWidth, setPillTotalWidth] = useState<number>(0);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [collapsibleModal, setCollapsibleModal] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  // const [overflow, setOverflow] = useState<boolean>(false);
  const [overflowValue, setOverflowValue] = useState<IOverflow[]>([]);
  // const [measuredLayout, setMeasuredLayout] = useState(0);

  const placeholderLabel = placeholder || DROPDOWN.PLACEHOLDER;

  const defaultLabelSpace = spaceToLabel === undefined ? sh4 : spaceToLabel;
  const labelExtractor = items.map((item) => item.label);
  const itemsWithId = items.map((item, index) => ({ ...item, id: index }));

  const disabledStyle = disabled === true ? disabledOpacity5 : {};

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

  // const placeholderStyle: TextStyle = value.length > 0 ? {} : { color: colorBlack._2, fontFamily: NunitoRegular };
  // const inputStyle: ViewStyle = collapsibleModal ? { borderColor: colorTransparent } : {};

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

  // const dropdownBaseStyle: ViewStyle = {
  //   ...flexRow,
  //   ...flexWrap,
  //   height: sh24,
  //   maxWidth: sw268,
  //   overflow: "hidden",
  // };

  // const defaultInputStyle: ViewStyle = {
  //   ...border(colorGray._4, sw1, sw20),
  //   ...centerVertical,
  //   ...flexRow,
  //   ...px(sw16),
  //   backgroundColor: colorWhite._1,
  //   height: sh40,
  //   width: collapse === false ? sw358 : sw360,
  //   // ...inputBorder,
  // };

  const defaultInputStyle: ViewStyle = {
    ...border(colorGray._3, sw1, sw32),
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

  // const handleWidth = async (event: LayoutChangeEvent) => {
  //   const { height, width } = event.nativeEvent.layout;
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
    let newValue = [...value];
    if (newValue.includes(searchValue)) {
      newValue = newValue.filter((item) => item !== searchValue);

      // setPillTotalWidth(0);
      // reset = true;
      let newOverflowValue = overflowValue.filter((item) => item.value !== searchValue);
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
      setOverflowValue(newOverflowValue);
    } else {
      newValue.push(searchValue);
    }
    handleChange(newValue);
    // handleReset(index, reset);
  };

  // useEffect(() => {
  //   setPillTotalWidth(0);
  // }, [value]);

  const handleParentLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    // setPillTotalWidth(pillTotalWidth + width);
    // setOverflow(height > 24);
    if (height === 0) {
      // setOverflow(false);
      setOverflowValue([]);
    }
  };

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
                const newOverflowValue = [...overflowValue];
                const findExisting = newOverflowValue.findIndex((ofv) => ofv.value === selectedValue);
                if (findExisting === -1) {
                  newOverflowValue.push({ value: selectedValue, width: width, overflow: y > 0 });
                }
                // const uniqueOverflow = [...new Set(newOverflowValue)];

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
                      <Text style={{ ...fs12BoldBlue1 }}>{selectedValue}</Text>
                      <CustomSpacer isHorizontal={true} space={sw4} />
                      <IcoMoon color={colorBlue._1} name="close" size={sh12} />
                    </View>
                  </TouchableWithoutFeedback>
                  <CustomSpacer isHorizontal={true} space={sw8} />
                </View>
              );
            })
        ) : (
          <Text style={fs16RegGray6}>{placeholderLabel}</Text>
        )}
      </View>
      {overflowCount.length === 0 ? null : <Text style={fs16BoldBlue1}>+ {overflowCount.length}</Text>}
      <CustomFlexSpacer />
      <IcoMoon color={colorBlue._1} name="caret-down" size={sw24} />
    </View>
  );

  return (
    <Fragment>
      <View>
        {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
        {label === undefined ? null : (
          <Fragment>
            <Text style={{ ...fs12BoldGray6, ...disabledStyle, ...labelStyle }}>{label}</Text>
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
                <View style={{ borderTopWidth: sw2, borderTopColor: colorBlue._1 }}>
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
                        const originalItem: TypeLabelValue = items[index];
                        const itemExtractor = itemsWithId[index];
                        const itemValue = itemExtractor.value;
                        const selected = value.includes(itemValue);
                        const itemContainer: ViewStyle = { ...px(sw16) };
                        const itemStyle: ViewStyle = originalItem.subLabel === undefined ? { ...py(sh4) } : {};

                        const handleSelect = () => {
                          // let reset: boolean = false;
                          if (itemExtractor !== undefined) {
                            handleValue(itemValue);
                            // handleReset(index, reset);
                          }
                        };

                        return (
                          <TouchableWithoutFeedback key={index} onPress={handleSelect}>
                            <View style={itemContainer}>
                              <CheckBox
                                label={itemExtractor.label}
                                labelStyle={{ fontSize: sh16 }}
                                numberOfLines={1}
                                onPress={handleSelect}
                                spaceToLabel={sw12}
                                subLabel={originalItem.subLabel}
                                style={itemStyle}
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
