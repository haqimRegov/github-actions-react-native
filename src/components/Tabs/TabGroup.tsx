import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { borderBottomGray2, flexRow } from "../../styles";
import { Tab, TabProps } from "./Tab";

interface TabGroupProps {
  activeTab: number;
  setActiveTab: (tabIndex: number) => void;
  tabs: TabProps[];
}

export const TabGroup: FunctionComponent<TabGroupProps> = ({ activeTab, setActiveTab, tabs }: TabGroupProps) => {
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
        const tabStyle: ViewStyle = { ...borderStyle, ...tab.style };

        return <Tab {...tab} key={index} selected={activeTab === index} style={tabStyle} onPress={handleTabPress} />;
      })}
    </View>
  );
};
