import { RouteProp } from "@react-navigation/native";
import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Image, ImageStyle, Text, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { Avatar, CustomFlexSpacer, CustomSpacer, MenuItemProps, MenuList, SideMenu } from "../../components";
import { DAY_DATE_FORMAT, Language } from "../../constants";
import { DICTIONARY_LINK_AIMS } from "../../data/dictionary";
import { usePrevious } from "../../hooks";
import { IcoMoon } from "../../icons";
import { RNInAppBrowser } from "../../integrations";
import { logout } from "../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../store";
import {
  borderBottomGray2,
  centerVertical,
  colorBlue,
  flexChild,
  flexRow,
  fs12BoldGray6,
  fs12RegGray5,
  fs18BoldBlue1,
  fullHW,
  imageContain,
  px,
  py,
  sh16,
  sh24,
  sh32,
  sw16,
  sw160,
  sw200,
  sw24,
  sw66,
  sw96,
} from "../../styles";
import { InboxPage } from "./Inbox";
import { Investors } from "./Investors";
import { Profile } from "./Profile";
import { Transactions } from "./Transactions";

const { DASHBOARD } = Language.PAGE;
interface DashboardPageProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
  route: RouteProp<PrivateNavigatorType, "Dashboard">;
}

const DashboardPageComponent: FunctionComponent<DashboardPageProps> = ({
  agent,
  client,
  investors,
  navigation,
  route,
  resetClientDetails,
  resetTransactions,
  resetEDD,
  resetInvestors,
  unreadMessages,
}: DashboardPageProps) => {
  const { isLogout, setIsLogout } = route.params;
  const { top } = useSafeAreaInsets();
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const [page, setPage] = useState<DashboardPageType>(investors.backToInvestorOverview === true ? "Investors" : "Transactions");
  const prevPage = usePrevious(page);

  const handleRoute = (nextPage: DashboardPageType) => {
    setPage(nextPage);
  };

  const handleLogout = () => {
    setIsLogout(true);
    logout(navigation);
  };

  const handleDataReset = (currentRoute: DashboardPageType) => {
    if (currentRoute !== page) {
      switch (currentRoute) {
        case "Transactions":
          resetTransactions();
          break;
        case "Investors":
          resetInvestors();
          break;
        case "EDD":
          resetEDD();
          break;
        default:
          resetTransactions();
      }
    }
  };

  const handleAims = () => {
    RNInAppBrowser.openLink(DICTIONARY_LINK_AIMS);
  };

  const handleInbox = () => {
    setPage("Inbox");
  };

  const handleProfile = () => {
    setPage("Profile");
  };

  const handleDashboard = () => {
    handleDataReset("Transactions");
    setPage("Transactions");
  };

  const handleInvestors = () => {
    handleDataReset("Investors");
    setPage("Investors");
  };

  // const handleEDD = () => {
  //   handleDataReset("EDD");
  //   setPage("EDD");
  // };

  const props = { handleRoute: handleRoute, navigation: navigation, isLogout };

  let content: JSX.Element = <Transactions {...props} />;
  if (page === "Inbox") {
    content = <InboxPage {...props} />;
  }
  if (page === "Transactions") {
    content = <Transactions {...props} />;
  }
  if (page === "Investors") {
    content = (
      <Investors
        {...props}
        showInvestorOverview={
          client.isForceUpdate === true ||
          client.isNewSales === true ||
          investors.backToInvestorOverview === true ||
          client.directToAccountOpening === true
        }
      />
    );
  }
  // if (page === "EDD") {
  //   content = <EDD {...props} />;
  // }
  if (page === "Profile") {
    content = <Profile {...props} />;
  }

  const inboxCount = page === "Inbox" ? 0 : parseInt(unreadMessages!, 10);

  const MENU_ITEMS: MenuItemProps[] = [
    { name: "transaction", onPress: handleDashboard, title: DASHBOARD.MENU_DASHBOARD },
    { name: "investors", onPress: handleInvestors, title: DASHBOARD.MENU_INVESTORS },
    // { name: "edd", onPress: handleEDD, title: DASHBOARD.MENU_EDD, subtitle: DASHBOARD.MENU_EDD_SUBTITLE },
    { badgeCount: inboxCount, name: "bell", onPress: handleInbox, title: DASHBOARD.MENU_INBOX },
    { name: "profile", onPress: handleProfile, title: DASHBOARD.MENU_PROFILE },
    { name: "logout-new", onPress: handleLogout, title: DASHBOARD.MENU_LOGOUT },
  ];

  const initials =
    agent !== undefined
      ? agent
          .name!.split(" ")
          .filter((text) => text !== "")
          .map((text, index) => (index < 2 ? text.substr(0, 1) : ""))
          .join("")
      : "";

  const logoAimsStyle: ImageStyle = { ...imageContain, height: sh32, width: sw66 };

  useEffect(() => {
    const pages: DashboardPageType[] = ["Transactions", "Investors", "Inbox", "Profile"];
    const pageIndex = pages.indexOf(page);
    if (activeMenu !== pageIndex) {
      setActiveMenu(pageIndex);
    }
    if (prevPage === "Investors" && client.details?.principalHolder?.name !== "") {
      resetClientDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <View style={{ ...flexRow, ...fullHW }}>
      <SideMenu spaceToBottom={0} spaceToContent={sh16}>
        <View>
          <View style={borderBottomGray2} />
          <View style={{ ...centerVertical, ...flexRow, ...px(sw24), ...py(sh16) }}>
            <Avatar text={initials} type="agent" />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View style={{ width: sw96 }}>
              <Text numberOfLines={2} style={fs18BoldBlue1}>
                {agent?.name}
              </Text>
            </View>
          </View>
          <View style={borderBottomGray2} />
          <View style={{ ...flexRow, ...py(sh16) }}>
            <CustomSpacer isHorizontal={true} space={sw24} />
            <View style={{ width: sw160 }}>
              <Text style={fs12BoldGray6}>{agent?.rank}</Text>
              <Text style={fs12RegGray5}>{agent?.branch}</Text>
              <Text style={fs12RegGray5}>{`${moment().format(DAY_DATE_FORMAT)}`}</Text>
            </View>
            <CustomSpacer isHorizontal={true} space={sw16} />
          </View>
          <View style={borderBottomGray2} />
          <MenuList activeIndex={activeMenu} items={MENU_ITEMS} />
        </View>
        <CustomFlexSpacer />
        <View style={borderBottomGray2} />
        <TouchableWithoutFeedback onPress={handleAims}>
          <View style={{ ...centerVertical, ...flexRow, ...px(sw24), ...py(sh16) }}>
            <Image source={LocalAssets.logo.aims} style={logoAimsStyle} />
            <CustomFlexSpacer />
            <IcoMoon color={colorBlue._1} name="external" size={sh24} />
          </View>
        </TouchableWithoutFeedback>
        <View style={borderBottomGray2} />
      </SideMenu>
      <CustomSpacer isHorizontal={true} space={sw200} />
      <View style={{ ...flexChild, backgroundColor: colorBlue._2 }}>
        <CustomSpacer space={top} />
        {content}
      </View>
    </View>
  );
};

export const DashboardPage = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(DashboardPageComponent);
