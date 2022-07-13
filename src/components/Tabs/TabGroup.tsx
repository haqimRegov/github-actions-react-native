import React, { FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { flexRow } from "../../styles";
import { Tab, TabProps } from "./Tab";

interface TabGroupProps {
  activeTab: number;
  containerStyle?: ViewStyle;
  selectedTextStyle?: TextStyle;
  selectedViewStyle?: ViewStyle;
  setActiveTab: (tabIndex: number) => void;
  tabs: TabProps[];
  unSelectedViewStyle?: ViewStyle;
}

export const TabGroup: FunctionComponent<TabGroupProps> = ({
  activeTab,
  containerStyle,
  selectedTextStyle,
  selectedViewStyle,
  setActiveTab,
  unSelectedViewStyle,
  tabs,
}: TabGroupProps) => {
  return (
    <View style={{ ...flexRow, ...containerStyle }}>
      {tabs.map((tab: TabProps, index: number) => {
        const handleTabPress = () => {
          if (tab.onPress !== undefined) {
            tab.onPress();
          }
          setActiveTab(index);
        };

        const checkStyle = unSelectedViewStyle !== undefined ? unSelectedViewStyle : {};
        const borderStyle: ViewStyle = activeTab !== index ? checkStyle : {};
        const checkSelectedView: ViewStyle = activeTab === index && selectedViewStyle !== undefined ? selectedViewStyle : {};
        const checkSelectedText: TextStyle = activeTab === index && selectedTextStyle !== undefined ? selectedTextStyle : {};
        const tabStyle: ViewStyle = { ...borderStyle, ...tab.style, ...checkSelectedView };

        return (
          <Tab
            key={index}
            onPress={handleTabPress}
            selected={activeTab === index}
            style={tabStyle}
            textStyle={checkSelectedText}
            {...tab}
          />
        );
      })}
    </View>
  );
};
