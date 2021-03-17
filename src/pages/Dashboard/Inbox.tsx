import PushNotificationIOS from "@react-native-community/push-notification-ios";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, ScrollView, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/LocalAssets";
import {
  AvatarProps,
  CollapsibleHeader,
  CustomFlexSpacer,
  CustomSpacer,
  EmptyTable,
  NotificationList,
  Pagination,
  Tab,
} from "../../components";
import { FULL_DATE_FORMAT, Language } from "../../constants";
import { getInbox, updateInbox } from "../../network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../store";
import {
  borderBottomBlack21,
  colorWhite,
  flexChild,
  flexGrow,
  flexRow,
  px,
  sh153,
  sh16,
  sh24,
  sh32,
  sh48,
  shadowBlue5,
  sw24,
} from "../../styles";

const { EMPTY_STATE, INBOX } = Language.PAGE;

interface InboxPageProps extends GlobalStoreProps {
  navigation: IStackNavigationProp;
  handleRoute: (route: DashboardPageType) => void;
}

const InboxPageComponent: FunctionComponent<InboxPageProps> = ({ navigation, unreadMessages, updatedUnreadMessages }: InboxPageProps) => {
  const [inboxList, setInboxList] = useState<IInbox>({
    notifications: [],
    newMessageCount: "",
    page: "1",
    pages: "1",
  });
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  const handleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleFetch = async (newPage: string) => {
    const request: IGetInboxRequest = { page: newPage, search: inputSearch };
    // eslint-disable-next-line no-console
    console.log("request", request);
    const response: IGetInboxResponse = await getInbox(request, navigation);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        // eslint-disable-next-line no-console
        console.log("data", data);
        let notificationBucket = {};
        data.result.inbox.forEach((message: IGetInboxMessage) => {
          const dateLabel = moment(message.createdOn, "x").format(FULL_DATE_FORMAT);
          const item: INotificationItem = {
            createdAt: message.createdOn,
            id: message.notificationId,
            isRead: message.isRead,
            message: message.message,
            title: message.title,
            sender: message.senderName || "-",
            source: message.source,
          };
          if (notificationBucket[dateLabel]) {
            notificationBucket[dateLabel].messages.push(item);
          } else {
            notificationBucket = { ...notificationBucket, [dateLabel]: { date: dateLabel, messages: [item] } };
          }
          return notificationBucket;
        });

        const newNotifications: INotificationList[] = Object.values(notificationBucket);
        setInboxList({
          notifications: newNotifications,
          newMessageCount: data.result.newMessageCount,
          page: data.result.page,
          pages: data.result.pages,
        });
        updatedUnreadMessages(data.result.newMessageCount);
        PushNotificationIOS.setApplicationIconBadgeNumber(parseInt(data.result.newMessageCount, 10));
      }

      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleInitialFetch = async () => {
    setInitialLoading(true);
    await handleFetch("1");
    setInitialLoading(false);
  };

  const handleSearch = async () => {
    await handleFetch(inboxList.page);
  };

  const handleRead = async (id: string) => {
    const request: IUpdateInboxRequest = { notificationIds: [id] };
    // eslint-disable-next-line no-console
    console.log("updateInbox request", request);
    const response: IUpdateInboxResponse = await updateInbox(request, navigation);
    // setLoading(false);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        // eslint-disable-next-line no-console
        console.log("data", data);
        handleFetch(inboxList.page);
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleMessage = async (notification: INotificationItem) => {
    if (notification.isRead === false) {
      await handleRead(notification.id);
    }
  };

  const handleNext = () => {
    if (inboxList !== undefined) {
      const newPage = parseInt(inboxList.page, 10) + 1;
      handleFetch(newPage.toString());
    }
  };

  const handlePrev = () => {
    if (inboxList !== undefined) {
      const newPage = parseInt(inboxList.page, 10) - 1;
      handleFetch(newPage.toString());
    }
  };

  const handleAvatar = ({ sender, source }: INotificationItem) => {
    const initials =
      sender !== undefined
        ? sender
            .split(" ")
            .filter((text) => text !== "")
            .map((text, index) => (index < 2 ? text.substr(0, 1) : ""))
            .join("")
        : "OMNI";
    const defaultInitials = sender === "system" ? "KIB" : initials;
    const avatar: AvatarProps = { text: defaultInitials, type: source as AvatarType };
    return avatar;
  };

  const cardStyle: ViewStyle = {
    ...flexChild,
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    marginHorizontal: sw24,
    marginVertical: sh24,
  };

  useEffect(() => {
    handleInitialFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const badgeCount = inboxList.newMessageCount === "" ? parseInt(unreadMessages!, 10) : parseInt(inboxList.newMessageCount, 10);
  const noResults = inputSearch !== undefined && inputSearch !== "";
  const title = noResults === true ? EMPTY_STATE.LABEL_NO_RESULTS : INBOX.EMPTY_TITLE;
  const subtitle = noResults === true ? `${EMPTY_STATE.TITLE_SEARCH} '${inputSearch}'` : INBOX.EMPTY_SUBTITLE;
  const hintText = noResults === true ? EMPTY_STATE.SUBTITLE : undefined;
  const illustration = noResults === true ? undefined : LocalAssets.illustration.inboxEmpty;

  return (
    <ScrollView contentContainerStyle={flexGrow} showsVerticalScrollIndicator={false}>
      <View style={cardStyle}>
        <CustomSpacer space={sh153} />
        <CustomSpacer space={sh16} />
        <CollapsibleHeader
          filterVisible={filterVisible}
          handleFilter={handleFilter}
          inputSearch={inputSearch}
          noFilter={true}
          onSubmitEditing={handleSearch}
          placeholder={INBOX.PLACEHOLDER_SEARCH}
          label={INBOX.HEADER}
          setInputSearch={setInputSearch}
        />
        <View style={flexRow}>
          <Tab badgeCount={badgeCount} selected={true} style={{ height: sh48 }} text={INBOX.TAB_NOTIFICATIONS} />
          <CustomFlexSpacer />
          <Pagination
            onPressNext={handleNext}
            onPressPrev={handlePrev}
            page={parseInt(inboxList.page, 10)}
            totalPages={parseInt(inboxList.pages, 10)}
          />
          <CustomSpacer isHorizontal={true} space={sw24} />
        </View>
        <View style={borderBottomBlack21} />
        <View style={{ ...px(sw24), ...flexChild }}>
          <CustomSpacer space={sh24} />
          {inboxList.notifications.length === 0 ? (
            <EmptyTable hintText={hintText} illustration={illustration} loading={initialLoading} title={title} subtitle={subtitle} />
          ) : (
            inboxList.notifications.map((inbox: INotificationList, index: number) => {
              const label =
                moment().diff(inbox.date, "days") === 0 ? "Today" : moment(inbox.date, FULL_DATE_FORMAT).format(FULL_DATE_FORMAT);
              return (
                <Fragment key={index}>
                  {index === 0 ? null : <CustomSpacer space={sh32} />}
                  <NotificationList avatarProps={handleAvatar} items={inbox.messages} label={label} onPress={handleMessage} />
                </Fragment>
              );
            })
          )}
        </View>
        <CustomSpacer space={sh24} />
      </View>
    </ScrollView>
  );
};

export const InboxPage = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(InboxPageComponent);
