import React, { FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { borderBottomGray2, flexRow } from "../../styles";
import { Tab, TabProps } from "./Tab";

interface TabGroupProps {
  activeTab: number;
  selectedTextStyle?: TextStyle;
  selectedViewStyle?: ViewStyle;
  setActiveTab: (tabIndex: number) => void;
  tabs: TabProps[];
}

export const TabGroup: FunctionComponent<TabGroupProps> = ({
  activeTab,
  selectedTextStyle,
  selectedViewStyle,
  setActiveTab,
  tabs,
}: TabGroupProps) => {
  return (
    <View style={flexRow}>
      {tabs.map((tab: TabProps, index: number) => {
        const handleTabPress = () => {
          if (tab.onPress !== undefined) {
            tab.onPress();
          }
          setActiveTab(index);
        };

        const borderStyle: ViewStyle = activeTab !== index ? borderBottomGray2 : {};
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
