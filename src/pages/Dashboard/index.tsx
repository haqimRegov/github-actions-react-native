import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useState } from "react";
import { View } from "react-native";

import {
  CustomDatePicker,
  CustomFlexSpacer,
  CustomSpacer,
  IQuickAction,
  QuickActions,
  RoundedButton,
  SafeAreaPage,
  SideMenuV2,
} from "../../components";
import { alignSelfCenter, borderBottomGray4, flexChild, flexRow, flexRowCC, fullHW, sh24, sw200, sw24 } from "../../styles";
import { AddClient } from "./AddClient";

interface DashboardPageProps {
  navigation: StackNavigationProp<RootNavigatorType>;
}

export const DashboardPage = ({ navigation }: DashboardPageProps) => {
  const [addClient, setAddClient] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<Date | undefined>(undefined);

  const handleTopUp = () => {};

  const handleAddClient = () => {
    setAddClient(true);
  };

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

  const handleOnboarding = () => {
    navigation.navigate("Onboarding");
  };

  return (
    <Fragment>
      <View style={{ ...flexRow, ...fullHW }}>
        <SideMenuV2 />
        <CustomSpacer isHorizontal={true} space={sw200} />
        <SafeAreaPage>
          <View style={flexChild}>
            <CustomSpacer space={sh24} />
            <View style={flexRow}>
              <CustomFlexSpacer />
              <QuickActions actions={QUICK_ACTIONS} />
              <CustomSpacer isHorizontal={true} space={sw24} />
            </View>
            <CustomSpacer space={sh24} />
            <View style={flexRowCC}>
              <CustomDatePicker value={date} setValue={setDate} mode="date" />
              <CustomSpacer isHorizontal={true} space={sw24} />
              <CustomDatePicker value={time} setValue={setTime} mode="time" />
            </View>
            <CustomSpacer space={sh24} />
            <RoundedButton onPress={handleOnboarding} text="Jump to Onboarding" buttonStyle={alignSelfCenter} />
          </View>
        </SafeAreaPage>
      </View>
      <AddClient navigation={navigation} setVisible={setAddClient} visible={addClient} />
    </Fragment>
  );
};
