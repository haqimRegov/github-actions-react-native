import React, { Fragment, FunctionComponent, ReactNode, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { CustomFlexSpacer, CustomSpacer, IQuickAction, Tag, TagColorType } from "../../components";
import { NewQuickActions } from "../../components/Collapsible/NewQuickActions";
import { Language } from "../../constants";
import { DICTIONARY_ORDER_STATUS } from "../../data/dictionary";
import { DICTIONARY_EDD_STATUS } from "../../data/dictionary/edd";
import { IcoMoon } from "../../icons";
import {
  alignItemsEnd,
  alignSelfCenter,
  centerVertical,
  colorWhite,
  flexGrow,
  flexRow,
  fs24BoldBlack2,
  fullHeight,
  px,
  sh16,
  sw16,
  sw20,
  sw24,
} from "../../styles";
import { NewSales } from "./QuickActions";

const { QUICK_ACTIONS } = Language.PAGE;

interface DashboardLayoutProps {
  children: ReactNode;
  hideQuickActions?: boolean;
  navigation: IStackNavigationProp;
  scrollEnabled?: boolean;
  sideElement?: ReactNode;
  status?: string;
  title?: string;
  titleIcon?: string;
  titleIconOnPress?: () => void;
}

export const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({
  children,
  hideQuickActions,
  navigation,
  scrollEnabled,
  sideElement,
  status,
  title,
  titleIcon,
  titleIconOnPress,
}: DashboardLayoutProps) => {
  const [addClient, setAddClient] = useState<boolean>(false);

  const handleAddClient = () => {
    setAddClient(true);
  };

  // const handleTopUp = () => {
  //   navigation.navigate("Onboarding");
  // };

  // const handleLogout = () => {
  //   logout(resetGlobal!, navigation);
  // };

  const actions: IQuickAction[] = [
    {
      label: QUICK_ACTIONS.LABEL_NEW_SALES,
      onPress: handleAddClient,
      // style: borderBottomGray4,
    },
    // {
    //   label: QUICK_ACTIONS.LABEL_TOP_UP,
    //   onPress: handleTopUp,
    // },
    // {
    //   label: QUICK_ACTIONS.LABEL_SWITCHING,
    //   onPress: handleTopUp,
    // },
    // {
    //   label: QUICK_ACTIONS.LABEL_REDEMPTION,
    //   onPress: handleTopUp,
    // },
    // {
    //   label: QUICK_ACTIONS.LABEL_TRANSFER,
    //   onPress: handleLogout,
    // },
  ];

  let statusColor: TagColorType;
  if (
    status === DICTIONARY_ORDER_STATUS.void ||
    status === DICTIONARY_ORDER_STATUS.rejected ||
    status === DICTIONARY_EDD_STATUS.cancelled
  ) {
    statusColor = "error";
  } else if (status === DICTIONARY_ORDER_STATUS.submitted) {
    statusColor = "success";
  } else if (status === DICTIONARY_ORDER_STATUS.completed) {
    statusColor = "secondary";
  } else if (status === DICTIONARY_ORDER_STATUS.reroutedBr || status === DICTIONARY_ORDER_STATUS.reroutedHq) {
    statusColor = "danger";
  } else {
    statusColor = "warning";
  }
  const defaultSideElement = sideElement !== undefined ? sideElement : null;

  return (
    <Fragment>
      <ScrollView
        bounces={true}
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}>
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
              {status !== undefined ? (
                <View style={{ ...px(sw16), ...centerVertical }}>
                  <CustomSpacer space={sh16} />
                  <Tag color={statusColor} text={status} />
                </View>
              ) : null}
              <CustomFlexSpacer />
              {hideQuickActions === true ? defaultSideElement : <NewQuickActions actions={actions} />}
            </View>
          </View>
          {children}
        </View>
      </ScrollView>
      <NewSales navigation={navigation} setVisible={setAddClient} visible={addClient} />
    </Fragment>
  );
};
