import React, { FunctionComponent, useState } from "react";
import { View, ViewStyle } from "react-native";

import { borderBottomGray4, flexRow } from "../../styles";
import { Tab, TabProps } from "./Tab";

interface TabGroupProps {
  tabs: TabProps[];
}

export const TabGroup: FunctionComponent<TabGroupProps> = ({ tabs }: TabGroupProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={flexRow}>
      {tabs.map((tab: TabProps, index: number) => {
        const handleTabPress = () => {
          if (tab.onPress) {
            tab.onPress();
          }
          setActiveTab(index);
        };

        const borderStyle: ViewStyle = activeTab !== index ? borderBottomGray4 : {};
        const tabStyle: ViewStyle = { ...borderStyle, ...tab.style };

        return <Tab {...tab} key={index} selected={activeTab === index} style={tabStyle} onPress={handleTabPress} />;
      })}
    </View>
  );
};
