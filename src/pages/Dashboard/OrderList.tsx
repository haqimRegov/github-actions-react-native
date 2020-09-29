import { StackNavigationProp } from "@react-navigation/stack";
import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { CustomDatePicker, CustomSpacer, RoundedButton } from "../../components";
import { logout } from "../../network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../store";
import { alignSelfCenter, flexChild, flexRowCC, sh24, sw24 } from "../../styles";
import { DashboardLayout } from "./DashboardLayout";

interface OrderListProps extends GlobalStoreProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  handleRoute: (route: string) => void;
}

const OrderListComponent: FunctionComponent<OrderListProps> = ({ navigation, handleRoute, resetGlobal }: OrderListProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<Date | undefined>(undefined);

  const handleOnboarding = () => {
    navigation.navigate("Onboarding");
  };

  const handleOrder = () => {
    handleRoute("OrderDetails");
  };

  const handlePersonalDocuments = () => {
    handleRoute("UploadDocuments");
  };

  const handleUploadHardCopy = () => {
    handleRoute("UploadHardCopy");
  };
  const handleLogOut = () => {
    logout(resetGlobal, navigation);
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
        <CustomSpacer space={sh24} />
        <RoundedButton onPress={handleLogOut} text="Log Out" buttonStyle={alignSelfCenter} />
        <CustomSpacer space={sh24} />
        <RoundedButton onPress={handlePersonalDocuments} text="Upload Docs" buttonStyle={alignSelfCenter} />
        <CustomSpacer space={sh24} />
        <RoundedButton onPress={handleUploadHardCopy} text="Upload Hard Copy Docs" buttonStyle={alignSelfCenter} />
      </View>
    </DashboardLayout>
  );
};

export const OrderList = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(OrderListComponent);
