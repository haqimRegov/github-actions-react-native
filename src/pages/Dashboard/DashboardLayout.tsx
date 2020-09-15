import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, FunctionComponent, ReactNode, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { CustomFlexSpacer, CustomSpacer, IQuickAction, QuickActions } from "../../components";
import { IcoMoon } from "../../icons";
import { borderBottomGray4, centerVertical, flexGrow, flexRow, fs24BoldBlack2, fullHeight, px, sh16, sw20, sw24 } from "../../styles";
import { AddClient } from "./AddClient";

interface DashboardLayoutProps {
  children: ReactNode;
  navigation: StackNavigationProp<RootNavigatorType>;
  title?: string;
  titleIcon?: string;
  titleIconOnPress?: () => void;
}

export const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({
  children,
  navigation,
  title,
  titleIcon,
  titleIconOnPress,
}: DashboardLayoutProps) => {
  const [addClient, setAddClient] = useState<boolean>(false);

  const handleAddClient = () => {
    setAddClient(true);
  };

  const handleTopUp = () => {};

  const QUICK_ACTIONS: IQuickAction[] = [
    {
      label: "Add New Client",
      onPress: handleAddClient,
      style: borderBottomGray4,
    },
    {
      label: "Top Up",
      onPress: handleTopUp,
    },
    {
      label: "Switch",
      onPress: handleTopUp,
    },
    {
      label: "Redeem",
      onPress: handleTopUp,
    },
    {
      label: "Transfer",
      onPress: handleTopUp,
    },
    {
      label: "Buy Fund",
      onPress: handleTopUp,
    },
  ];

  return (
    <Fragment>
      <ScrollView bounces={true} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={fullHeight}>
          <View style={px(sw24)}>
            <CustomSpacer space={sh16} />
            <View style={{ ...centerVertical, ...flexRow }}>
              {titleIcon !== undefined ? (
                <Fragment>
                  <IcoMoon name={titleIcon} onPress={titleIconOnPress} size={sw24} />
                  <CustomSpacer isHorizontal={true} space={sw20} />
                </Fragment>
              ) : null}
              {title !== undefined ? <Text style={fs24BoldBlack2}>{title}</Text> : null}
              <CustomFlexSpacer />
              <QuickActions actions={QUICK_ACTIONS} />
            </View>
          </View>
          {children}
        </View>
      </ScrollView>
      <AddClient navigation={navigation} setVisible={setAddClient} visible={addClient} />
    </Fragment>
  );
};
