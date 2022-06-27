import React, { Fragment, FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import * as Animatable from "react-native-animatable";

import { Language } from "../../constants";
import {
  absolutePosition,
  centerHorizontal,
  centerVertical,
  colorBlack,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlue8,
  fs12RegWhite1,
  fullWidth,
  justifyContentEnd,
  px,
  sh16,
  sh48,
  sw16,
  sw24,
  sw240,
  sw62,
  sw8,
} from "../../styles";
import { IconButton } from "../Touchables";
import { CustomSpacer } from "../Views";

const { TOAST } = Language.PAGE;

declare interface IRenderContentProps {
  handlePress: () => void;
}

declare interface CustomToastProps {
  animationIn?: Animatable.Animation;
  animationOut?: Animatable.Animation;
  children?: ReactNode;
  count?: number;
  deleteText?: string;
  duration?: number;
  isDeleteToast?: boolean;
  onPress?: () => void;
  parentVisible?: boolean;
  RenderContent?: (props: IRenderContentProps) => JSX.Element;
  setCount?: (currentCount: number) => void;
  setParentVisible?: (currentVisibility: boolean) => void;
  style?: ViewStyle;
  toastStyle?: ViewStyle;
}

export const CustomToast: FunctionComponent<CustomToastProps> = ({
  animationIn,
  animationOut,
  count,
  deleteText,
  duration,
  isDeleteToast,
  onPress,
  parentVisible,
  RenderContent,
  setParentVisible,
  setCount,
  style,
  toastStyle,
}: CustomToastProps) => {
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [tempVisible, setTempVisible] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(parentVisible !== undefined ? parentVisible : false);
  const defaultDuration = duration !== undefined ? duration : 3;
  const [timer, setTimer] = useState<number>(defaultDuration);

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
      if (setParentVisible !== undefined) {
        setParentVisible(false);
      }
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
        if (setCount !== undefined) {
          setCount(0);
        }
      }
    }
    return () => clearInterval(countdownTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, timer]);

  useEffect(() => {
    if (count !== 0) {
      setVisible(true);
      setTempVisible(true);
      if (count !== undefined && count > 1) {
        setTimer(timer + defaultDuration / 2);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    if (parentVisible !== undefined && parentVisible === true) {
      setVisible(true);
      setTempVisible(true);
    } else {
      setVisible(false);
      setTempVisible(false);
    }
  }, [parentVisible]);

  useEffect(() => {
    if (duration !== undefined) {
      setTimer(duration);
    }
    setFadeOut(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempVisible]);

  const containerStyle: ViewStyle = {
    ...flexRow,
    ...fullWidth,
    ...justifyContentEnd,
    ...absolutePosition,
    height: sh48,
    top: sh48,
    ...style,
  };
  const contentContainerStyle: ViewStyle = {
    backgroundColor: colorBlack._2,
    marginRight: sw24,
    width: sw240,
    borderRadius: sw8,
    ...style,
  };

  const textContainerStyle: ViewStyle = {
    ...flexChild,
    ...flexRow,
    ...centerVertical,
    borderTopLeftRadius: sw8,
    borderBottomLeftRadius: sw8,
  };

  const sideContainerStyle: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    ...centerHorizontal,
    height: sh48,
  };

  const undoContainerStyle: ViewStyle = {
    width: sw62,
    backgroundColor: colorBlack._2,
    borderTopRightRadius: sw8,
    borderBottomRightRadius: sw8,
    ...sideContainerStyle,
  };

  const checkCountText = count !== undefined && count > 1 ? TOAST.LABEL_FUNDS_DELETED : TOAST.LABEL_FUND_DELETED;
  const defaultDeletedText = deleteText !== undefined ? deleteText : checkCountText;
  const defaultText = deleteText !== undefined ? deleteText : TOAST.LABEL_ALL_CHANGES_SAVED;

  const toastContent =
    isDeleteToast !== undefined && isDeleteToast === true ? (
      <View style={{ ...flexRow, ...toastStyle }}>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View style={textContainerStyle}>
          <Text style={{ ...fs12RegWhite1, lineHeight: sh16 }}>{`${count} ${defaultDeletedText}`}</Text>
        </View>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View style={{ backgroundColor: colorWhite._1 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
            <View style={undoContainerStyle}>
              <Text style={fs12BoldBlue8}>{TOAST.LABEL_UNDO}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={{ ...flexRow, ...px(sw16), ...toastStyle }}>
        <View style={textContainerStyle}>
          <Text style={{ ...fs12RegWhite1, lineHeight: sh16 }}>{defaultText}</Text>
        </View>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View style={sideContainerStyle}>
          <IconButton color={colorBlue._8} name="close" onPress={handlePress} size={sw16} />
        </View>
      </View>
    );

  const defaultAnimationIn: Animatable.Animation = animationIn !== undefined ? animationIn : "slideInRight";
  const defaultPropAnimationOut: Animatable.Animation = animationOut !== undefined ? animationOut : "fadeOut";
  const defaultAnimationOut: Animatable.Animation = fadeOut === false ? "slideOutRight" : defaultPropAnimationOut;
  return (
    <Fragment>
      {tempVisible === true ? (
        <Fragment>
          <View style={containerStyle}>
            <Animatable.View
              animation={visible === true ? defaultAnimationIn : defaultAnimationOut}
              duration={1000}
              style={contentContainerStyle}
              onAnimationEnd={handleVisible}>
              {RenderContent !== undefined ? <RenderContent handlePress={handlePress} /> : toastContent}
            </Animatable.View>
          </View>
        </Fragment>
      ) : null}
    </Fragment>
  );
};
