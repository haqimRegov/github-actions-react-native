import { StackNavigationProp } from "@react-navigation/stack";
import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";

import { CustomDatePicker, CustomSpacer, RoundedButton } from "../../components";
import { alignSelfCenter, flexChild, flexRowCC, sh24, sw24 } from "../../styles";
import { DashboardLayout } from "./DashboardLayout";

interface OrderListProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  handleRoute: (route: string) => void;
}

export const OrderList: FunctionComponent<OrderListProps> = ({ navigation, handleRoute }: OrderListProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<Date | undefined>(undefined);

  const handleOnboarding = () => {
    navigation.navigate("Onboarding");
  };

  const handleOrder = () => {
    handleRoute("OrderDetails");
  };

  return (
    <DashboardLayout navigation={navigation}>
      <View style={flexChild}>
        <View style={flexRowCC}>
          <CustomDatePicker value={date} setValue={setDate} mode="date" />
          <CustomSpacer isHorizontal={true} space={sw24} />
          <CustomDatePicker value={time} setValue={setTime} mode="time" />
        </View>
        <CustomSpacer space={sh24} />
        <RoundedButton onPress={handleOnboarding} text="Jump to Onboarding" buttonStyle={alignSelfCenter} />
        <CustomSpacer space={sh24} />
        <RoundedButton onPress={handleOrder} text="Order Details" buttonStyle={alignSelfCenter} />
      </View>
    </DashboardLayout>
  );
};
