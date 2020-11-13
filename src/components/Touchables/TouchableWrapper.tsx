import React, { Fragment, FunctionComponent, ReactNode } from "react";
import { TouchableWithoutFeedback } from "react-native";

export interface TouchableWrapperProps {
  children: ReactNode;
  isTouchable: boolean;
  onPress: () => void;
}

export const TouchableWrapper: FunctionComponent<TouchableWrapperProps> = ({ children, isTouchable, onPress }: TouchableWrapperProps) => {
  return (
    <Fragment>
      {isTouchable === true ? (
        <TouchableWithoutFeedback onPress={onPress}>{children}</TouchableWithoutFeedback>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </Fragment>
  );
};
