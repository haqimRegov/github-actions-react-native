import moment from "moment";
import React, { FunctionComponent, useState } from "react";
import { Image, ImageStyle, Text, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { Avatar, CustomFlexSpacer, CustomSpacer, MenuItemProps, MenuList, SideMenu } from "../../components";
import { DAY_FORMAT, FULL_DATE_FORMAT, Language } from "../../constants";
import { DICTIONARY_LINK_AIMS } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import { RNInAppBrowser } from "../../integrations";
import { logout } from "../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../store";
import {
  borderBottomGray4,
  centerVertical,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  fs10RegBlue2,
  fs12BoldBlue2,
  fs18BoldBlue2,
  fullHW,
  imageContain,
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
import { EDD } from "./EDD";
import { InboxPage } from "./Inbox";
import { Profile } from "./Profile";
import { Transactions } from "./Transactions";

const { DASHBOARD } = Language.PAGE;
interface DashboardPageProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
}

const DashboardPageComponent: FunctionComponent<DashboardPageProps> = ({ agent, navigation, unreadMessages }: DashboardPageProps) => {
  const { top } = useSafeAreaInsets();
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const [route, setRoute] = useState<DashboardPageType>("Transactions");

  const handleRoute = (nextPage: DashboardPageType) => {
    setRoute(nextPage);
  };

  const handleLogout = () => {
    logout(navigation);
  };

  const handleAims = () => {
    RNInAppBrowser.openLink(DICTIONARY_LINK_AIMS);
  };

  const handleInbox = () => {
    setActiveMenu(1);
    setRoute("Inbox");
  };

  const handleProfile = () => {
    setRoute("Profile");
    setActiveMenu(3);
  };

  const handleDashboard = () => {
    setRoute("Transactions");
    setActiveMenu(0);
  };

  const handleEDD = () => {
    setRoute("EDD");
    setActiveMenu(2);
  };

  const props = { handleRoute: handleRoute, navigation: navigation };
  let content: JSX.Element = <Transactions {...props} />;
  if (route === "Inbox") {
    content = <InboxPage {...props} />;
  }
  if (route === "Transactions") {
    content = <Transactions {...props} />;
  }
  if (route === "EDD") {
    content = <EDD {...props} />;
  }
  if (route === "Profile") {
    content = <Profile {...props} />;
  }

  const inboxCount = route === "Inbox" ? 0 : parseInt(unreadMessages!, 10);

  const MENU_ITEMS: MenuItemProps[] = [
    { name: "transaction", onPress: handleDashboard, title: DASHBOARD.MENU_DASHBOARD },
    { badgeCount: inboxCount, name: "bell", onPress: handleInbox, title: DASHBOARD.MENU_INBOX },
    { name: "edd", onPress: handleEDD, title: DASHBOARD.MENU_EDD, subtitle: DASHBOARD.MENU_EDD_SUBTITLE },
    { name: "profile", onPress: handleProfile, title: DASHBOARD.MENU_PROFILE },
    { name: "logout", onPress: handleLogout, title: DASHBOARD.MENU_LOGOUT },
  ];

  const dateToday = moment().format(FULL_DATE_FORMAT);
  const dayToday = `${moment().format(DAY_FORMAT)},`;

  const initials =
    agent !== undefined
      ? agent
          .name!.split(" ")
          .filter((text) => text !== "")
          .map((text, index) => (index < 2 ? text.substr(0, 1) : ""))
          .join("")
      : "";

  const logoAimsStyle: ImageStyle = { ...imageContain, height: sh32, width: sw66 };

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
            <Image source={LocalAssets.logo.aims} style={logoAimsStyle} />
            <CustomFlexSpacer />
            <IcoMoon color={colorBlue._2} name="external" size={sh24} />
          </View>
        </TouchableWithoutFeedback>
        <View style={borderBottomGray4} />
      </SideMenu>
      <CustomSpacer isHorizontal={true} space={sw200} />
      <View style={{ ...flexChild, backgroundColor: colorWhite._4 }}>
        <CustomSpacer space={top} />
        {content}
      </View>
    </View>
  );
};

export const DashboardPage = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(DashboardPageComponent);
