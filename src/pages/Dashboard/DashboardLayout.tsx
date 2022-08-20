import React, { forwardRef, Fragment, MutableRefObject, ReactNode, useImperativeHandle, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { CustomFlexSpacer, CustomSpacer, IQuickAction, NewQuickActions, StatusBadge, StatusBadgeColorType } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_ORDER_STATUS } from "../../data/dictionary";
import { DICTIONARY_EDD_STATUS } from "../../data/dictionary/edd";
import { IcoMoon } from "../../icons";
import {
  alignItemsEnd,
  alignSelfCenter,
  centerVertical,
  colorBlue,
  flexGrow,
  flexRow,
  fs18BoldGray6,
  fullHeight,
  px,
  rowCenterVertical,
  sh24,
  sw16,
  sw24,
  sw8,
} from "../../styles";
import { NewSales } from "./QuickActions";

const { QUICK_ACTIONS } = Language.PAGE;

export interface IDashboardLayoutRef {
  addClient: boolean;
  setAddClient: (value: boolean) => void;
}

interface DashboardLayoutProps {
  children: ReactNode;
  handleAccountOpening?: () => void;
  handleNewSales?: () => void;
  hideQuickActions?: boolean;
  navigation: IStackNavigationProp;
  ref?: MutableRefObject<IDashboardLayoutRef | undefined>;
  scrollEnabled?: boolean;
  setPage?: (page: DashboardPageType) => void;
  setScrollRef?: (ref: ScrollView) => void;
  sideElement?: ReactNode;
  status?: string;
  title?: string;
  titleIcon?: string;
  titleIconOnPress?: () => void;
}

export const DashboardLayout = forwardRef<IDashboardLayoutRef | undefined, DashboardLayoutProps>((props, ref) => {
  const {
    children,
    handleAccountOpening,
    handleNewSales,
    hideQuickActions,
    navigation,
    scrollEnabled,
    setPage,
    setScrollRef,
    sideElement,
    status,
    title,
    titleIcon,
    titleIconOnPress,
  } = props;

  const [addClient, setAddClient] = useState<boolean>(false);

  const handleAddClient = () => {
    if (handleAccountOpening !== undefined) {
      handleAccountOpening();
    }
    setAddClient(true);
  };

  const newSales = () => {
    if (handleNewSales !== undefined) {
      handleNewSales();
    }
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
      label: QUICK_ACTIONS.LABEL_ACCOUNT_OPENING_NEW_SALES,
      onPress: handleAddClient,
      // style: borderBottomGray2,
    },
    {
      label: QUICK_ACTIONS.LABEL_SALES,
      onPress: newSales,
    },
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

  let statusColor: StatusBadgeColorType;
  if (
    status === DICTIONARY_ORDER_STATUS.void ||
    status === DICTIONARY_ORDER_STATUS.rejected ||
    status === DICTIONARY_EDD_STATUS.cancelled ||
    status === DICTIONARY_EDD_STATUS.overdue1 ||
    status === DICTIONARY_EDD_STATUS.overdue2
  ) {
    statusColor = "error";
  } else if (status === DICTIONARY_ORDER_STATUS.submitted) {
    statusColor = "success";
  } else if (status === DICTIONARY_ORDER_STATUS.completed || status === DICTIONARY_ORDER_STATUS.pendingInitialOrder) {
    statusColor = "complete";
  } else if (status === DICTIONARY_ORDER_STATUS.reroutedBr || status === DICTIONARY_ORDER_STATUS.reroutedHq) {
    statusColor = "danger";
  } else {
    statusColor = "warning";
  }
  const defaultSideElement = sideElement !== undefined ? sideElement : null;

  useImperativeHandle(ref, () => ({ addClient, setAddClient }));

  return (
    <Fragment>
      <ScrollView
        bounces={true}
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        ref={setScrollRef}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}>
        <View style={{ ...fullHeight, backgroundColor: colorBlue._2 }}>
          <View style={px(sw24)}>
            <CustomSpacer space={sh24} />
            <View style={rowCenterVertical}>
              <View>
                <View style={flexRow}>
                  {titleIcon !== undefined ? (
                    <Fragment>
                      <IcoMoon
                        name={titleIcon}
                        onPress={titleIconOnPress}
                        size={sw24}
                        style={alignSelfCenter}
                        suppressHighlighting={true}
                      />
                      <CustomSpacer isHorizontal={true} space={sw8} />
                    </Fragment>
                  ) : null}
                  {title !== undefined ? <Text style={{ ...fs18BoldGray6, ...alignItemsEnd }}>{title}</Text> : null}
                </View>
              </View>
              {status !== undefined ? (
                <View style={{ ...px(sw16), ...centerVertical }}>
                  <StatusBadge color={statusColor} text={status} />
                </View>
              ) : null}
              <CustomFlexSpacer />
              {hideQuickActions === true ? defaultSideElement : <NewQuickActions actions={actions} />}
            </View>
          </View>
          {children}
        </View>
      </ScrollView>
      <NewSales navigation={navigation} setPage={setPage} setVisible={setAddClient} visible={addClient} />
    </Fragment>
  );
});
