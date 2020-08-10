import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useState } from "react";
import { View } from "react-native";

import { CustomSpacer, RoundedButton } from "../../components";
import { SideMenuV2 } from "../../components/Nav/SideMenuV2";
import { alignSelfCenter, centerHV, flexCol, flexRow, fullHW, sw20, sw256 } from "../../styles";
import { AddClient } from "./AddClient";

interface DashboardPageProps {
  navigation: StackNavigationProp<RootNavigatorType>;
}

export const DashboardPage = ({ navigation }: DashboardPageProps) => {
  const [addClient, setAddClient] = useState<boolean>(false);

  const handleAddClient = () => {
    setAddClient(true);
  };

  const handleOnboarding = () => {
    navigation.navigate("Onboarding");
  };

  return (
    <Fragment>
      <View style={{ ...flexRow, ...fullHW }}>
        <SideMenuV2 />
        <CustomSpacer isHorizontal={true} space={sw256} />
        <View style={{ ...flexCol, ...centerHV }}>
          <RoundedButton onPress={handleAddClient} text="Add Client" buttonStyle={alignSelfCenter} />
          <CustomSpacer space={sw20} />
          <RoundedButton onPress={handleOnboarding} text="Products" buttonStyle={alignSelfCenter} />
        </View>
      </View>
      <AddClient navigation={navigation} setVisible={setAddClient} visible={addClient} />
    </Fragment>
  );
};
