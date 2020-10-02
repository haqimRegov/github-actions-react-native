import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/LocalAssets";
import { Avatar, CustomFlexSpacer, CustomSpacer, MenuItemProps, MenuList, SafeAreaPage, SideMenu } from "../../components";
import { DAY_FORMAT, FULL_DATE_FORMAT, Language } from "../../constants";
import { DICTIONARY_AIMS_URL } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import { logout } from "../../network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../store";
import {
  borderBottomGray4,
  centerVertical,
  colorBlue,
  flexRow,
  fs12BoldBlue2,
  fs12RegBlue2,
  fs14RegBlue2,
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
import { LinkUtils } from "../../utils";
import { UploadDocuments, UploadHardCopy } from "./Documents";
import { OrderDetails } from "./OrderDetails";
import { OrderList } from "./OrderList";

const { DASHBOARD } = Language.PAGE;
interface DashboardPageProps extends GlobalStoreProps {
  navigation: IStackNavigationProp;
}

const DashboardPageComponent: FunctionComponent<DashboardPageProps> = ({ agent, navigation, resetGlobal }: DashboardPageProps) => {
  const [route, setRoute] = useState<string>("");

  const handleRoute = (nextPage: string) => {
    setRoute(nextPage);
  };

  const handleLogout = () => {
    logout(resetGlobal, navigation);
  };

  const handleAims = () => {
    LinkUtils.openLink(DICTIONARY_AIMS_URL);
  };

  const handleInbox = () => {};

  const handleProfile = () => {};

  const handleDashboard = () => {};
  const handleEdd = () => {};

  const props = { handleRoute: handleRoute, navigation: navigation };
  let content: JSX.Element = <OrderList {...props} />;

  if (route === "OrderDetails") {
    content = <OrderDetails {...props} />;
  }
  if (route === "UploadDocuments") {
    content = <UploadDocuments {...props} />;
  }
  if (route === "UploadHardCopy") {
    content = <UploadHardCopy {...props} />;
  }

  // TODO integration for inbox
  const MENU_ITEMS: MenuItemProps[] = [
    { name: "dashboard", onPress: handleDashboard, text: DASHBOARD.MENU_DASHBOARD },
    { badgeCount: 2, name: "bell", onPress: handleInbox, text: DASHBOARD.MENU_INBOX },
    { badgeCount: 3, name: "order-check", onPress: handleEdd, text: DASHBOARD.MENU_EDD },
    { name: "profile", onPress: handleProfile, text: DASHBOARD.MENU_PROFILE },
    { name: "logout", onPress: handleLogout, text: DASHBOARD.MENU_LOGOUT },
  ];

  const dateToday = moment().format(FULL_DATE_FORMAT);
  const dayToday = `${moment().format(DAY_FORMAT)},`;

  const agentId = ` (${DASHBOARD.LABEL_ID}: `;
  const agentBranchId = (
    <Fragment>
      {agent?.branch!}
      {agentId}
      <Text style={{ ...fs12RegBlue2, letterSpacing: -sw033 }}>{agent?.agentCode!}</Text>
    </Fragment>
  );

  return (
    <Fragment>
      <View style={{ ...flexRow, ...fullHW }}>
        <SideMenu spaceToBottom={0} spaceToContent={sh32}>
          <View>
            <View style={borderBottomGray4} />
            <View style={{ ...centerVertical, ...flexRow, ...px(sw24), ...py(sh24) }}>
              <Avatar image={{ uri: agent?.image }} />
              <CustomSpacer isHorizontal={true} space={sw16} />
              <View style={{ width: sw96 }}>
                <Text numberOfLines={1} style={{ ...fs18BoldBlue2, letterSpacing: -sw05, lineHeight: sh24 }}>
                  {agent?.name}
                </Text>
                <Text style={{ ...fs14RegBlue2, letterSpacing: -sw039, lineHeight: sh16 }}>{agent?.role}</Text>
              </View>
            </View>
            <View style={borderBottomGray4} />
            <View style={{ ...flexRow, ...py(sh20) }}>
              <CustomSpacer isHorizontal={true} space={sw24} />
              <View style={{ width: sw160 }}>
                <Text style={{ ...fs12BoldBlue2, letterSpacing: -sw033, lineHeight: sh16 }}>{agentBranchId})</Text>
                <Text style={{ ...fs12BoldBlue2, letterSpacing: -sw033, lineHeight: sh16 }}>{dayToday}</Text>
                <Text style={{ ...fs12BoldBlue2, letterSpacing: -sw033, lineHeight: sh16 }}>{dateToday}</Text>
              </View>
              <CustomSpacer isHorizontal={true} space={sw16} />
            </View>
            <View style={borderBottomGray4} />
            <View style={px(sw24)}>
              <MenuList items={MENU_ITEMS} />
            </View>
          </View>
          <CustomFlexSpacer />
          <View style={borderBottomGray4} />
          <TouchableWithoutFeedback onPress={handleAims}>
            <View style={{ ...centerVertical, ...flexRow, ...px(sw24), ...py(sh16) }}>
              <Image source={LocalAssets.logo.aims} style={{ height: sh24, width: sw66 }} />
              <CustomFlexSpacer />
              <IcoMoon color={colorBlue._2} name="external" size={sh24} />
            </View>
          </TouchableWithoutFeedback>
          <View style={borderBottomGray4} />
        </SideMenu>
        <CustomSpacer isHorizontal={true} space={sw200} />
        <SafeAreaPage>{content}</SafeAreaPage>
      </View>
    </Fragment>
  );
};

export const DashboardPage = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(DashboardPageComponent);
