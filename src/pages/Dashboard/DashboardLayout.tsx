import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, FunctionComponent, ReactNode, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { CustomFlexSpacer, CustomSpacer, IQuickAction, QuickActions } from "../../components";
import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import { logout } from "../../network-actions";
import { GlobalStoreProps } from "../../store";
import {
  alignItemsEnd,
  alignSelfCenter,
  borderBottomGray4,
  centerVertical,
  colorWhite,
  flexGrow,
  flexRow,
  fs24BoldBlack2,
  fullHeight,
  px,
  sh16,
  sw20,
  sw24,
} from "../../styles";
import { AddClient } from "./AddClient";

const { QUICK_ACTIONS } = Language.PAGE;

interface DashboardLayoutProps extends Partial<GlobalStoreProps> {
  children: ReactNode;
  hideQuickActions?: boolean;
  navigation: StackNavigationProp<RootNavigatorType>;
  title?: string;
  titleIcon?: string;
  titleIconOnPress?: () => void;
}

export const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({
  children,
  hideQuickActions,
  navigation,
  resetGlobal,
  title,
  titleIcon,
  titleIconOnPress,
}: DashboardLayoutProps) => {
  const [addClient, setAddClient] = useState<boolean>(false);

  const handleAddClient = () => {
    setAddClient(true);
  };

  const handleTopUp = () => {
    navigation.navigate("Onboarding");
  };

  const handleLogout = () => {
    logout(resetGlobal!, navigation);
  };

  const actions: IQuickAction[] = [
    {
      label: QUICK_ACTIONS.LABEL_NEW_SALES,
      onPress: handleAddClient,
      style: borderBottomGray4,
    },
    {
      label: QUICK_ACTIONS.LABEL_TOP_UP,
      onPress: handleTopUp,
    },
    {
      label: QUICK_ACTIONS.LABEL_SWITCHING,
      onPress: handleTopUp,
    },
    {
      label: QUICK_ACTIONS.LABEL_REDEMPTION,
      onPress: handleTopUp,
    },
    {
      label: QUICK_ACTIONS.LABEL_TRANSFER,
      onPress: handleLogout,
    },
  ];

  return (
    <Fragment>
      <ScrollView bounces={true} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ ...fullHeight, backgroundColor: colorWhite._4 }}>
          <View style={px(sw24)}>
            <CustomSpacer space={sh16} />
            <View style={{ ...centerVertical, ...flexRow }}>
              <View>
                <CustomSpacer space={sh16} />
                <View style={flexRow}>
                  {titleIcon !== undefined ? (
                    <Fragment>
                      <IcoMoon name={titleIcon} onPress={titleIconOnPress} size={sw24} style={alignSelfCenter} />
                      <CustomSpacer isHorizontal={true} space={sw20} />
                    </Fragment>
                  ) : null}
                  {title !== undefined ? <Text style={{ ...fs24BoldBlack2, ...alignItemsEnd }}>{title}</Text> : null}
                </View>
              </View>
              <CustomFlexSpacer />
              {hideQuickActions === true ? null : <QuickActions actions={actions} />}
            </View>
          </View>
          {children}
        </View>
      </ScrollView>
      <AddClient navigation={navigation} setVisible={setAddClient} visible={addClient} />
    </Fragment>
  );
};
