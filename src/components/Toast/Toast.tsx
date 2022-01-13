import React, { Fragment, FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import * as Animatable from "react-native-animatable";

import { Language } from "../../constants";
import {
  absolutePosition,
  centerHorizontal,
  centerVertical,
  colorBlack,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlue8,
  fs12RegWhite1,
  fullWidth,
  justifyContentEnd,
  sh24,
  sh48,
  sw16,
  sw24,
  sw240,
  sw62,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views";

const { TOAST } = Language.PAGE;

declare interface CustomToastProps {
  animationIn?: Animatable.Animation;
  animationOut?: Animatable.Animation;
  children?: ReactNode;
  count?: number;
  duration?: number;
  onPress?: () => void;
  setCount?: (count: number) => void;
  style?: ViewStyle;
}

export const CustomToast: FunctionComponent<CustomToastProps> = ({
  animationIn,
  animationOut,
  children,
  count,
  duration,
  onPress,
  setCount,
  style,
}: CustomToastProps) => {
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [tempVisible, setTempVisible] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(3);
  const [visible, setVisible] = useState<boolean>(false);
  const defaultDuration = duration !== undefined ? duration : 3;

  const handlePress = () => {
    if (onPress !== undefined) {
      onPress();
      if (setCount !== undefined) {
        setCount(0);
      }
      setVisible(false);
      setTimer(3);
    } else {
      setVisible(false);
      if (setCount !== undefined) {
        setCount(0);
      }
      setFadeOut(true);
      setTimer(defaultDuration);
    }
  };

  const handleVisible = () => {
    if (visible === false) {
      setTempVisible(false);
    }
  };

  useEffect(() => {
    let countdownTimer: ReturnType<typeof setTimeout>;
    if (visible === true) {
      if (timer > 0) {
        countdownTimer = setInterval(() => {
          setTimer(timer - 1);
        }, 1000);
      } else {
        setVisible(false);
        setTimer(defaultDuration);
        setTimeout(() => {
          if (setCount !== undefined) {
            setCount(0);
          }
        }, 400);
      }
    }
    return () => clearInterval(countdownTimer);
  }, [visible, timer]);

  useEffect(() => {
    if (count !== undefined && count !== 0) {
      setVisible(true);
      setTempVisible(true);
      if (count > 1) {
        setTimer(timer + defaultDuration / 2);
      }
    }
  }, [count]);

  useEffect(() => {
    if (duration !== undefined) {
      setTimer(duration);
    }
    setFadeOut(false);
  }, [tempVisible]);

  const containerStyle: ViewStyle = {
    ...flexRow,
    ...fullWidth,
    ...justifyContentEnd,
    ...absolutePosition,
    height: sh48,
    top: sh24,
    ...style,
  };
  const contentContainerStyle: ViewStyle = {
    ...flexRow,
    backgroundColor: colorWhite._1,
    marginRight: sw24,
    width: sw240,
    ...style,
  };

  const textContainerStyle: ViewStyle = {
    ...flexChild,
    ...flexRow,
    ...centerVertical,
    backgroundColor: colorBlack._2,
    borderTopLeftRadius: sw8,
    borderBottomLeftRadius: sw8,
  };

  const undoContainerStyle: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    ...centerHorizontal,
    backgroundColor: colorBlack._2,
    borderTopRightRadius: sw8,
    borderBottomRightRadius: sw8,
    height: sh48,
    width: sw62,
  };

  // const numberContainerStyle: ViewStyle = {
  //   ...centerVertical,
  //   borderRadius: sw100,
  //   borderColor: colorWhite._1,
  //   borderWidth: sw1,
  //   height: sw24,
  //   width: sw24,
  // };

  const defaultAnimationIn: Animatable.Animation = animationIn !== undefined ? animationIn : "slideInRight";
  const defaultPropAnimationOut: Animatable.Animation = animationOut !== undefined ? animationOut : "fadeOut";
  const defaultAnimationOut: Animatable.Animation = fadeOut === false ? "slideOutRight" : defaultPropAnimationOut;
  const defaultDeletedText = count !== undefined && count > 1 ? TOAST.LABEL_FUNDS_DELETED : TOAST.LABEL_FUND_DELETED;
  return (
    <Fragment>
      {tempVisible === true ? (
        <Fragment>
          <View style={containerStyle}>
            <Animatable.View
              animation={visible === true ? defaultAnimationIn : defaultAnimationOut}
              duration={visible === true ? 1000 : 1000}
              style={contentContainerStyle}
              onAnimationEnd={handleVisible}>
              {children !== undefined ? (
                children
              ) : (
                <Fragment>
                  <View style={textContainerStyle}>
                    <CustomSpacer isHorizontal={true} space={sw16} />
                    <Text style={fs12RegWhite1}>{count}</Text>
                    <CustomSpacer isHorizontal={true} space={sw8} />
                    <Text style={fs12RegWhite1}>{defaultDeletedText}</Text>
                  </View>
                  <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
                    <View style={undoContainerStyle}>
                      <Text style={fs12BoldBlue8}>{TOAST.LABEL_UNDO}</Text>
                    </View>
                  </TouchableOpacity>
                </Fragment>
              )}
            </Animatable.View>
          </View>
        </Fragment>
      ) : null}
    </Fragment>
  );
};
