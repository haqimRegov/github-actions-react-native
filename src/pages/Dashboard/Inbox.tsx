import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, ScrollView, View, ViewStyle } from "react-native";

import { CollapsibleHeader, CustomFlexSpacer, CustomSpacer, NotificationList, Pagination, Tab } from "../../components";
import { FULL_DATE_FORMAT, Language } from "../../constants";
import { SAMPLE_INBOX } from "../../mocks";
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

const { INBOX } = Language.PAGE;

interface InboxPageProps {
  navigation: IStackNavigationProp;
  handleRoute: (route: string) => void;
}

export const InboxPage: FunctionComponent<InboxPageProps> = () => {
  const [inboxList, setInboxList] = useState<INotificationList[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  const handleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleNext = () => {
    Alert.alert("handlePress");
  };

  const handlePrev = () => {
    Alert.alert("handlePress");
  };

  const handleMessage = () => {
    // TODO integration
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
    // disable lint because of reduce accumulator issue
    /* eslint-disable no-param-reassign */
    const messagesByDate = SAMPLE_INBOX.reduce((notifications, item) => {
      const dateLabel = moment(item.createdAt).format(FULL_DATE_FORMAT);
      if (notifications[dateLabel]) {
        notifications[dateLabel].messages.push(item);
      } else {
        notifications = { ...notifications, [dateLabel]: { date: dateLabel, messages: [item] } };
      }
      return notifications;
    }, {});

    setInboxList(Object.values(messagesByDate));
  }, []);
  return (
    <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={cardStyle}>
        <CustomSpacer space={sh153} />
        <CustomSpacer space={sh16} />
        <CollapsibleHeader
          filterVisible={filterVisible}
          handleFilter={handleFilter}
          inputSearch={inputSearch}
          noFilter={true}
          placeholder={INBOX.PLACEHOLDER_SEARCH}
          label={INBOX.HEADER}
          setInputSearch={setInputSearch}
        />
        <View style={flexRow}>
          <Tab selected={true} style={{ height: sh48 }} text={INBOX.TAB_NOTIFICATIONS} />
          <CustomFlexSpacer />
          <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={1} totalItems={36} totalPages={5} itemsPerPage={20} />
          <CustomSpacer isHorizontal={true} space={sw24} />
        </View>
        <View style={borderBottomBlack21} />
        <View style={{ ...px(sw24), ...flexChild }}>
          <CustomSpacer space={sh24} />
          {inboxList.map((inbox: INotificationList, index: number) => {
            const label = moment().diff(inbox.date, "days") === 0 ? "Today" : moment(inbox.date, FULL_DATE_FORMAT).format(FULL_DATE_FORMAT);
            return (
              <Fragment key={index}>
                {index === 0 ? null : <CustomSpacer space={sh32} />}
                <NotificationList items={inbox.messages} label={label} onPress={handleMessage} />
              </Fragment>
            );
          })}
        </View>
        <CustomSpacer space={sh24} />
      </View>
    </ScrollView>
  );
};
