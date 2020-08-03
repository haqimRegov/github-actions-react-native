import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useState } from "react";
import { View } from "react-native";

import { CustomSpacer, RoundedButton } from "../../components";
import { SideMenuV2 } from "../../components/Nav/SideMenuV2";
import { alignSelfCenter, flexRow, fullHW, sw200 } from "../../styles";
import { AddClient } from "./AddClient";

interface DashboardPageProps {
  navigation: StackNavigationProp<RootNavigatorType>;
}

export const DashboardPage = ({ navigation }: DashboardPageProps) => {
  const [addClient, setAddClient] = useState<boolean>(false);

  const handleAddClient = () => {
    setAddClient(true);
  };
  return (
    <Fragment>
      <View style={{ ...flexRow, ...fullHW }}>
        <SideMenuV2 />
        <CustomSpacer isHorizontal={true} space={sw200} />
        <RoundedButton onPress={handleAddClient} text="Add Client" buttonStyle={alignSelfCenter} />
      </View>
      <AddClient navigation={navigation} setVisible={setAddClient} visible={addClient} />
    </Fragment>
  );
};
