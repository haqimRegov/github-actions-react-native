import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { FlatList, Keyboard, LayoutChangeEvent, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import { CalculateCount } from "../../integrations";
import {
  border,
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  colorRed,
  colorWhite,
  disabledOpacity5,
  flexChild,
  flexRow,
  flexWrap,
  fs12BoldBlue1,
  fs12BoldGray6,
  fs12RegRed2,
  fs16RegGray6,
  fullHW,
  noBGColor,
  overflowHidden,
  px,
  py,
  rowCenterVertical,
  scaleHeight,
  sh16,
  sh176,
  sh24,
  sh4,
  sh44,
  sh48,
  sh8,
  sw1,
  sw12,
  sw14,
  sw16,
  sw2,
  sw228,
  sw24,
  sw256,
  sw264,
  sw296,
  sw32,
  sw336,
  sw360,
  sw4,
  sw8,
} from "../../styles";
import { shortenString } from "../../utils";
import { CheckBox } from "../CheckBox";
import { BasicModal } from "../Modals";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

const { DROPDOWN } = Language.PAGE;
export interface NewCheckBoxDropdownProps {
  checkBoxStyle?: TextStyle;
  disabled?: boolean;
  disabledValues?: string[];
  error?: string;
  handleChange: (text: string[]) => void;
  items: TypeLabelValue[];
  keyboardAvoidingRef?: TypeKeyboardAvoidingView;
  label?: string;
  labelStyle?: TextStyle;
  placeholder?: string;
  placeholderStyle?: TextStyle;
  spaceToLabel?: number;
  spaceToTop?: number;
  style?: ViewStyle;
  value: string[];
  viewStyle?: ViewStyle;
}

export const NewCheckBoxDropdown: FunctionComponent<NewCheckBoxDropdownProps> = ({
  // checkBoxStyle,
  disabled,
  disabledValues,
  error,
  handleChange,
  items,
  keyboardAvoidingRef,
  label,
  labelStyle,
  placeholder,
  // placeholderStyle,
  spaceToLabel,
  spaceToTop,
  style,
  value,
  viewStyle,
}: NewCheckBoxDropdownProps) => {
  const [showMore, setShowMore] = useState<ICheckBoxMoreDetails>({ active: false, number: 0 });
  const [layout, setLayout] = useState<IBasicLayout>({ x: 0, y: 0, width: 0, height: 0 });
  const [ref, setRef] = useState<View | null>(null);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [collapsibleModal, setCollapsibleModal] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const PILLS_MAX_WIDTH = sw264;

  const placeholderLabel = placeholder || DROPDOWN.PLACEHOLDER_MANY;
  const defaultLabelSpace = spaceToLabel === undefined ? sh4 : spaceToLabel;
  const labelExtractor = items.map((item) => item.label);
  const itemsWithId = items.map((item, index) => ({ ...item, id: index }));

  const disabledLabel = disabled === true ? disabledOpacity5 : {};
  const disabledStyle = disabled === true ? { ...disabledOpacity5, backgroundColor: colorGray._1 } : {};

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

  const handleCalculate = async (texts: string[]) => {
    const shortenArray = texts.map((text: string) => shortenString(text, 25, 27));
    const count = await CalculateCount(shortenArray, PILLS_MAX_WIDTH, sw32, sw8, fs12BoldBlue1);
    return count;
  };

  const handleReset = async (index: number, reset: boolean) => {
    const tempArray = [...value];
    let newArray = value;
    if (reset === false) {
      tempArray.push(items[index].value);
    } else {
      newArray = tempArray.filter((text: string) => text !== items[index].value);
    }
    const updatedArray = reset === false ? tempArray : newArray;
    const count = await handleCalculate(updatedArray);
    setShowMore({ ...showMore, number: count });
  };

  const errorStyle: ViewStyle = error !== undefined ? { backgroundColor: colorRed._5, borderWidth: sw2, borderColor: colorRed._2 } : {};

  const defaultInputStyle: ViewStyle = {
    ...border(colorGray._3, sw1, sw32),
    ...centerVertical,
    ...flexRow,
    ...px(error !== undefined ? 0 : sw1),
    backgroundColor: colorWhite._1,
    height: sh48,
    width: sw360,
    ...errorStyle,
    ...disabledStyle,
    ...viewStyle,
  };

  const defaultTagStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw8),
    ...py(sh4),
    backgroundColor: colorBlue._3,
    borderRadius: sw24,
    maxWidth: sw256,
  };

  const handleWidth = async (event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;
    if (showMore.active === false) {
      if (width >= PILLS_MAX_WIDTH) {
        setShowMore({ ...showMore, active: true });
      }
    } else if ((height < sh24 && showMore.active === true) || width < PILLS_MAX_WIDTH) {
      setShowMore({ ...showMore, active: false, number: 0 });
    }
  };

  const dropdownBaseStyle: ViewStyle = {
    ...flexRow,
    ...flexWrap,
    ...overflowHidden,
    height: sh24,
    maxWidth: PILLS_MAX_WIDTH,
  };

  const input = (
    <View style={{ ...centerVertical, ...flexRow, height: sh44, ...px(sw14), ...flexChild }}>
      <View style={dropdownBaseStyle} onLayout={handleWidth}>
        {value.length !== 0 ? (
          <Fragment>
            {value.map((item: string, index: number) => {
              const handleClose = async () => {
                const valueClone = [...value];
                valueClone.splice(index, 1);
                const count = await handleCalculate(valueClone);
                setShowMore({ ...showMore, number: count });
                handleChange(valueClone);
              };

              return (
                <View key={index} style={flexRow}>
                  <Fragment>
                    <TouchableWithoutFeedback onPress={handleClose}>
                      <View style={defaultTagStyle}>
                        <Text style={{ ...fs12BoldBlue1, maxWidth: sw228 }}>{shortenString(item, 25, 27)}</Text>
                        <CustomSpacer isHorizontal={true} space={sw4} />
                        <View style={centerHV}>
                          <IcoMoon color={colorBlue._1} name="close" size={sw12} />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    {index !== value.length - 1 ? <CustomSpacer isHorizontal={true} space={sw8} /> : null}
                  </Fragment>
                </View>
              );
            })}
          </Fragment>
        ) : (
          <Text style={fs16RegGray6}>{placeholderLabel}</Text>
        )}
      </View>
      <View>
        {showMore.active === true && showMore.number > 0 ? (
          <View style={{ ...rowCenterVertical, width: sw24 }}>
            <IcoMoon color={colorBlue._1} name="plus" size={sw12} />
            <CustomSpacer isHorizontal={true} space={sw4} />
            <Text style={{ ...fs12BoldBlue1, lineHeight: sh16 }}>{showMore.number}</Text>
          </View>
        ) : null}
      </View>
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
            <Text style={{ ...fs12BoldGray6, ...disabledLabel, ...labelStyle }}>{label}</Text>
            <CustomSpacer space={defaultLabelSpace} />
          </Fragment>
        )}
        <View ref={setRef} renderToHardwareTextureAndroid={true}>
          <TouchableWithoutFeedback onPress={handleExpand}>
            <View style={defaultInputStyle}>{input}</View>
          </TouchableWithoutFeedback>
        </View>
        {error === undefined ? null : (
          <View>
            <CustomSpacer space={sh4} />
            <View style={flexRow}>
              <IcoMoon color={colorRed._2} name="error-filled" size={sw16} />
              <CustomSpacer isHorizontal={true} space={sw8} />
              <Text style={{ ...fs12RegRed2, width: sw336 }}>{error}</Text>
            </View>
          </View>
        )}
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
                      ListHeaderComponent={() => <CustomSpacer space={sh16} />}
                      ListFooterComponent={() => <CustomSpacer space={sh16} />}
                      renderItem={({ index }) => {
                        const originalItem: TypeLabelValue = items[index];
                        const itemExtractor = itemsWithId[index];
                        const itemValue = itemExtractor.value;
                        const selected = value.includes(itemValue);
                        const itemContainer: ViewStyle = { ...px(sw16) };
                        const itemStyle: ViewStyle = originalItem.subLabel === undefined ? py(sh4) : {};
                        const checkDisabled = disabledValues !== undefined && disabledValues?.includes(items[index].value);

                        const handleSelect = () => {
                          let reset = false;
                          if (itemExtractor !== undefined) {
                            let newValue = [...value];
                            if (newValue.includes(itemValue)) {
                              newValue = newValue.filter((item) => item !== itemValue);
                              reset = true;
                            } else {
                              newValue.push(itemValue);
                            }
                            handleChange(newValue);
                            handleReset(index, reset);
                          }
                        };
                        return (
                          <TouchableWithoutFeedback key={index} onPress={handleSelect}>
                            <View style={itemContainer}>
                              <CheckBox
                                disabled={checkDisabled}
                                label={itemExtractor.label}
                                labelStyle={{ fontSize: sh16, lineHeight: scaleHeight(16 * 1.48), width: sw296 }}
                                numberOfLines={1}
                                onPress={handleSelect}
                                spaceToLabel={sw12}
                                style={itemStyle}
                                subLabel={originalItem.subLabel}
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
