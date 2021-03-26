import debounce from "lodash.debounce";
import React, { FunctionComponent, useCallback } from "react";
import { TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerHV, colorWhite, sh20 } from "../../styles";

interface IconButtonProps {
  color?: string;
  name: string;
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
  withDebounce?: boolean;
}

export const IconButton: FunctionComponent<IconButtonProps> = ({ color, name, onPress, size, style, withDebounce }: IconButtonProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncePress = useCallback(
    debounce(onPress !== undefined ? onPress : () => {}, 500, {
      leading: true,
      trailing: false,
    }),
    [onPress],
  );

  const handlePress = () => {
    if (onPress !== undefined) {
      if (withDebounce === true) {
        debouncePress();
      } else {
        onPress();
      }
    }
  };

  const defaultSize = size !== undefined ? size : sh20;
  const defaultColor = color !== undefined ? color : colorWhite._1;
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{ ...centerHV, ...style }}>
        <IcoMoon color={defaultColor} name={name} size={defaultSize} />
      </View>
    </TouchableWithoutFeedback>
  );
};
