import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/LocalAssets";
import { Avatar, CustomFlexSpacer, CustomSpacer, MenuItemProps, MenuList, SafeAreaPage, SideMenu } from "../../components";
import { DAY_FORMAT, FULL_DATE_FORMAT, Language } from "../../constants";
import { DICTIONARY_AIMS_URL } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import { RNInAppBrowser } from "../../integrations";
import { logout } from "../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../store";
import {
  borderBottomGray4,
  centerVertical,
  colorBlue,
  flexRow,
  fs10RegBlue2,
  fs12BoldBlue2,
  fs18BoldBlue2,
  fullHW,
  px,
  py,
  sh16,
  sh20,
  sh24,
  sh32,
  sw033,
  sw039,
  sw05,
  sw16,
  sw160,
  sw200,
  sw24,
  sw66,
  sw96,
} from "../../styles";
import { HandleSessionTokenExpired } from "../../utils";
import { InboxPage } from "./Inbox";
import { Profile } from "./Profile";
import { Transactions } from "./Transactions";

const { DASHBOARD } = Language.PAGE;
interface DashboardPageProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
}

const DashboardPageComponent: FunctionComponent<DashboardPageProps> = ({
  agent,
  config,
  navigation,
  unreadMessages,
}: DashboardPageProps) => {
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const [route, setRoute] = useState<DashboardPageType>("Transactions");
  // const [activeTab, setActiveTab] = useState<TransactionsTabType>("pending");

  const handleRoute = (nextPage: DashboardPageType) => {
    setRoute(nextPage);
  };

  const handleLogout = async () => {
    const response = await logout();
    HandleSessionTokenExpired(navigation, response);
  };

  const handleAims = () => {
    RNInAppBrowser.openLink(DICTIONARY_AIMS_URL);
  };

  const handleInbox = () => {
    setActiveMenu(1);
    setRoute("Inbox");
  };

  const handleProfile = () => {
    setRoute("Profile");
    setActiveMenu(2);
  };

  const handleDashboard = () => {
    setRoute("Transactions");
    setActiveMenu(0);
  };

  const props = { handleRoute: handleRoute, navigation: navigation };
  let content: JSX.Element = <Transactions {...props} />;
  if (route === "Inbox") {
    content = <InboxPage {...props} />;
  }
  if (route === "Transactions") {
    content = <Transactions {...props} />;
  }
  if (route === "Profile") {
    content = <Profile {...props} />;
  }

  // if (currentOrder !== "" && currentOrder !== undefined) {
  // }
  const inboxCount = route === "Inbox" ? 0 : parseInt(unreadMessages!, 10);

  const MENU_ITEMS: MenuItemProps[] = [
    { name: "transaction", onPress: handleDashboard, title: DASHBOARD.MENU_DASHBOARD },
    { badgeCount: inboxCount, name: "bell", onPress: handleInbox, title: DASHBOARD.MENU_INBOX },
    { name: "profile", onPress: handleProfile, title: DASHBOARD.MENU_PROFILE },
    { name: "logout", onPress: handleLogout, title: DASHBOARD.MENU_LOGOUT },
  ];

  const dateToday = moment().format(FULL_DATE_FORMAT);
  const dayToday = `${moment().format(DAY_FORMAT)},`;

  useEffect(() => {
    if (agent === undefined || config === undefined) {
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initials =
    agent !== undefined
      ? agent
          .name!.split(" ")
          .filter((text) => text !== "")
          .map((text, index) => (index < 2 ? text.substr(0, 1) : ""))
          .join("")
      : "";

  return (
    <View style={{ ...flexRow, ...fullHW }}>
      <SideMenu spaceToBottom={0} spaceToContent={sh32}>
        <View>
          <View style={borderBottomGray4} />
          <View style={{ ...centerVertical, ...flexRow, ...px(sw24), ...py(sh24) }}>
            <Avatar text={initials} type="agent" />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View style={{ width: sw96 }}>
              <Text numberOfLines={2} style={{ ...fs18BoldBlue2, letterSpacing: -sw05, lineHeight: sh24 }}>
                {agent?.name}
              </Text>
              <Text style={{ ...fs10RegBlue2, letterSpacing: -sw039 }}>{agent?.role}</Text>
            </View>
          </View>
          <View style={borderBottomGray4} />
          <View style={{ ...flexRow, ...py(sh20) }}>
            <CustomSpacer isHorizontal={true} space={sw24} />
            <View style={{ width: sw160 }}>
              <Text style={{ ...fs12BoldBlue2, letterSpacing: -sw033, lineHeight: sh16 }}>{agent?.branch}</Text>
              <Text style={{ ...fs12BoldBlue2, letterSpacing: -sw033, lineHeight: sh16 }}>{dayToday}</Text>
              <Text style={{ ...fs12BoldBlue2, letterSpacing: -sw033, lineHeight: sh16 }}>{dateToday}</Text>
            </View>
            <CustomSpacer isHorizontal={true} space={sw16} />
          </View>
          <View style={borderBottomGray4} />
          <MenuList activeIndex={activeMenu} items={MENU_ITEMS} />
        </View>
        <CustomFlexSpacer />
        <View style={borderBottomGray4} />
        <TouchableWithoutFeedback onPress={handleAims}>
          <View style={{ ...centerVertical, ...flexRow, ...px(sw24), ...py(sh16) }}>
            <Image source={LocalAssets.logo.aims} style={{ height: sh32, width: sw66 }} />
            <CustomFlexSpacer />
            <IcoMoon color={colorBlue._2} name="external" size={sh24} />
          </View>
        </TouchableWithoutFeedback>
        <View style={borderBottomGray4} />
      </SideMenu>
      <CustomSpacer isHorizontal={true} space={sw200} />
      <SafeAreaPage>{content}</SafeAreaPage>
    </View>
  );
};

export const DashboardPage = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(DashboardPageComponent);
