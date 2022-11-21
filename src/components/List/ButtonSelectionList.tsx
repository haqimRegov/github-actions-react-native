import React, { Fragment, FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { colorBlue, colorRed, flexRow, flexWrap, sw4 } from "../../styles";
import { OutlineButton } from "../Touchables";
import { CustomSpacer } from "../Views";

interface ButtonSelectionListProps {
  activeIndex?: number;
  buttonStyle?: ViewStyle;
  data: string[];
  color?: string;
  icon?: string;
  onPress: (item: number) => void;
  spaceBetween?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const ButtonSelectionList: FunctionComponent<ButtonSelectionListProps> = ({
  activeIndex,
  buttonStyle,
  data,
  color,
  icon,
  onPress,
  spaceBetween,
  style,
  textStyle,
}: ButtonSelectionListProps) => {
  return (
    <View style={{ ...flexRow, ...flexWrap, ...style }}>
      {data.map((item: string, index: number) => {
        const handlePress = () => {
          onPress(index);
        };

        const activeStyle: ViewStyle = activeIndex === index ? { borderColor: colorRed._1 } : {};

        return (
          <Fragment key={index}>
            {index === 0 ? null : <CustomSpacer isHorizontal={true} space={spaceBetween || sw4} />}
            <OutlineButton
              buttonStyle={{ ...buttonStyle, ...activeStyle }}
              icon={icon}
              color={color || colorBlue._1}
              onPress={handlePress}
              text={item}
              textStyle={textStyle}
            />
          </Fragment>
        );
      })}
    </View>
  );
};
