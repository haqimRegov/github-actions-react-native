import PushNotificationIOS from "@react-native-community/push-notification-ios";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, ScrollView, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/images/LocalAssets";
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
import { DICTIONARY_KIB_BRANCHES } from "../../data/dictionary";
import { getInbox, updateInbox } from "../../network-actions";
import { updateSeen } from "../../network-actions/dashboard/UpdateSeen";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../store";
import {
  borderBottomGray2,
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
  shadow16Blue112,
  sw24,
} from "../../styles";

const { EMPTY_STATE, INBOX } = Language.PAGE;

interface InboxPageProps extends GlobalStoreProps {
  handleRoute: (route: DashboardPageType) => void;
  isLogout: boolean;
  navigation: IStackNavigationProp;
}

const InboxPageComponent: FunctionComponent<InboxPageProps> = ({
  isLogout,
  navigation,
  unreadMessages,
  updatedUnreadMessages,
}: InboxPageProps) => {
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
    const response: IGetInboxResponse = await getInbox(request, navigation, setInitialLoading);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        let notificationBucket = {};
        data.result.inbox.forEach((message: IGetInboxMessage) => {
          const dateLabel = moment(message.createdOn, "x").format(FULL_DATE_FORMAT);
          const item: INotificationItem = {
            createdAt: message.createdOn,
            id: message.notificationId,
            isRead: message.isRead,
            isSeen: message.isSeen,
            localIsRead: message.isRead,
            message: message.message,
            title: message.title,
            sender: message.senderName,
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
    setInitialLoading(true);
    await handleFetch(inboxList.page);
    setInitialLoading(false);
  };

  const handleReadAll = async () => {
    setInitialLoading(true);
    const request = {};
    const response: IUpdateInboxResponse = await updateInbox(request, navigation, setInitialLoading);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        await handleFetch(inboxList.page);
        setInitialLoading(false);
      }
      if (error !== null) {
        setInitialLoading(false);
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleRead = async (request: IUpdateSeenRequest, id: string) => {
    const response: IUpdateInboxResponse = await updateSeen(request, navigation);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        const updatedInboxList = [...inboxList.notifications].map((eachNotification: INotificationList) => {
          const updatedNotifications = eachNotification.messages.map((eachMessage: INotificationItem) => {
            const updateLocalIsRead = eachMessage.id === id ? true : eachMessage.localIsRead;
            return { ...eachMessage, localIsRead: updateLocalIsRead };
          });
          return { date: eachNotification.date, messages: updatedNotifications };
        });
        setInboxList({ ...inboxList, notifications: updatedInboxList });
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleSeen = async () => {
    const request: IUpdateSeenRequest = { dashboard: "getinbox", tab: ["notification"] };
    const updateSeenResponse: IUpdateSeenResponse = await updateSeen(request, navigation);
    if (updateSeenResponse !== undefined) {
      const { error } = updateSeenResponse;
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleMessage = async (notification: INotificationItem) => {
    if (notification.isRead === false) {
      const request: IUpdateSeenRequest = { dashboard: "getinbox", tab: ["notification"], referenceKey: notification.id };
      await handleRead(request, notification.id);
    }
  };

  const handleNext = async () => {
    if (inboxList !== undefined && initialLoading === false) {
      setInboxList({ ...inboxList, page: (parseInt(inboxList.page, 10) + 1).toString() });
      setInitialLoading(true);
      const newPage = parseInt(inboxList.page, 10) + 1;
      await handleFetch(newPage.toString());
      setInitialLoading(false);
    }
  };

  const handlePrev = async () => {
    if (inboxList !== undefined && initialLoading === false) {
      setInboxList({ ...inboxList, page: (parseInt(inboxList.page, 10) - 1).toString() });
      setInitialLoading(true);
      const newPage = parseInt(inboxList.page, 10) - 1;
      await handleFetch(newPage.toString());
      setInitialLoading(false);
    }
  };

  const handleAvatar = ({ sender, source }: INotificationItem) => {
    const customSender = sender
      ? sender
          .split(" ")
          .filter((text) => text !== "")
          .map((text, index) => (index < 2 ? text.substr(0, 1) : ""))
          .join("")
      : "-";
    const initials = sender && sender in DICTIONARY_KIB_BRANCHES ? DICTIONARY_KIB_BRANCHES[sender].code : customSender;
    const defaultInitials = sender === "system" ? "HQ" : initials;
    const avatar: AvatarProps = { text: defaultInitials, type: source as AvatarType };
    return avatar;
  };

  const cardStyle: ViewStyle = {
    ...flexChild,
    ...shadow16Blue112,
    backgroundColor: colorWhite._2,
    borderRadius: sw24,
    marginHorizontal: sw24,
    marginVertical: sh24,
  };

  useEffect(() => {
    return () => {
      if (isLogout !== true) {
        handleSeen();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogout]);

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
    <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={cardStyle}>
        <CustomSpacer space={sh153} />
        <CustomSpacer space={sh16} />
        <CollapsibleHeader
          filterVisible={filterVisible}
          handleFilter={handleFilter}
          inputSearch={inputSearch}
          label={INBOX.HEADER}
          noFilter={true}
          onSubmitEditing={handleSearch}
          placeholder={INBOX.PLACEHOLDER_SEARCH}
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
        <View style={borderBottomGray2} />
        <View style={{ ...px(sw24), ...flexChild }}>
          <CustomSpacer space={sh24} />
          {inboxList.notifications.length === 0 || initialLoading === true ? (
            <EmptyTable hintText={hintText} illustration={illustration} loading={initialLoading} title={title} subtitle={subtitle} />
          ) : (
            inboxList.notifications.map((inbox: INotificationList, index: number) => {
              const newDateFormat: Date = new Date(inbox.date);
              const newMoment = moment(newDateFormat);
              const label = moment().diff(newMoment, "days") === 0 ? "Today" : moment(newMoment, FULL_DATE_FORMAT).format(FULL_DATE_FORMAT);
              return (
                <Fragment key={index}>
                  {index === 0 ? null : <CustomSpacer space={sh32} />}
                  <NotificationList
                    avatarProps={handleAvatar}
                    handleReadAll={handleReadAll}
                    items={inbox.messages}
                    label={label}
                    markAll={index === 0}
                    notificationsCount={badgeCount}
                    onPress={handleMessage}
                  />
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
