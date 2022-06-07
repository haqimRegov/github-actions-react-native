import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, TextStyle, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, FileViewer, Loading, TabGroup } from "../../../../components";
import { Language } from "../../../../constants";
import { getOrderSummary } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import { borderBottomRed1, colorRed, colorWhite, flexChild, flexRow, sh24, shadow16Blue112, sw24, sw8 } from "../../../../styles";
import { DashboardLayout } from "../../DashboardLayout";
import { AccountDetails } from "./Account";
import { Document } from "./Document";
import { OrderDetails } from "./OrderDetails";
import { Tracking } from "./Tracking";

const { DASHBOARD_ORDER_SUMMARY } = Language.PAGE;

interface OrderDetailsProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
  activeTab: OrderSummaryTabType;
  setActiveTab: (route: OrderSummaryTabType) => void;
}

const OrderSummaryComponent: FunctionComponent<OrderDetailsProps> = (props: OrderDetailsProps) => {
  const { currentOrder, setScreen, navigation, updateCurrentOrder, activeTab, setActiveTab } = props;
  const [orderSummary, setOrderSummary] = useState<IDashboardOrderSummary | undefined>(undefined);
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);
  const tabs: OrderSummaryTabType[] = ["order", "document", "profile", "tracking"];
  const activeTabIndex = tabs.indexOf(activeTab);

  const handleTabs = (index: number) => {
    setActiveTab(tabs[index]);
  };

  const handleCloseViewer = () => {
    setFile(undefined);
  };

  const handleBack = () => {
    updateCurrentOrder(undefined);
    setActiveTab("order");
    setScreen("Transactions");
  };

  const contentProps = { data: orderSummary!, setFile: setFile };

  let content: JSX.Element = <OrderDetails {...contentProps} isScheduled={currentOrder!.isScheduled} />;
  if (activeTab === "document") {
    content = <Document {...contentProps} />;
  }
  if (activeTab === "profile") {
    content = <AccountDetails {...contentProps} />;
  }
  if (activeTab === "tracking") {
    content = <Tracking {...contentProps} />;
  }
  const handleFetch = async () => {
    // setLoading(true);
    const request: IGetOrderSummaryRequest = { orderNumber: currentOrder!.orderNumber };
    const dashboardResponse: IGetOrderSummaryResponse = await getOrderSummary(request, navigation);
    // setLoading(false);
    if (dashboardResponse !== undefined) {
      const { data, error } = dashboardResponse;
      if (error === null && data !== null) {
        setOrderSummary(data.result);
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardStyle: ViewStyle = {
    ...flexChild,
    ...shadow16Blue112,
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
    marginHorizontal: sw24,
    marginVertical: sh24,
  };
  const backgroundStyle: ViewStyle = {
    backgroundColor: colorRed._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
  };

  const backgroundText: TextStyle = {
    color: colorWhite._1,
  };

  return (
    <Fragment>
      <DashboardLayout
        {...props}
        hideQuickActions={true}
        status={currentOrder!.status}
        title={DASHBOARD_ORDER_SUMMARY.HEADING}
        titleIcon="arrow-left"
        titleIconOnPress={handleBack}>
        <View style={flexChild}>
          <View style={cardStyle}>
            <View style={flexRow}>
              <TabGroup
                selectedViewStyle={backgroundStyle}
                selectedTextStyle={backgroundText}
                activeTab={activeTabIndex}
                setActiveTab={handleTabs}
                tabs={[
                  { text: DASHBOARD_ORDER_SUMMARY.TAB_ORDER_DETAILS },
                  { text: DASHBOARD_ORDER_SUMMARY.TAB_DOCUMENT },
                  { text: DASHBOARD_ORDER_SUMMARY.TAB_PROFILE },
                  { text: DASHBOARD_ORDER_SUMMARY.TAB_TRACKING },
                ]}
              />
              <CustomSpacer isHorizontal={true} space={sw24} />
            </View>
            <View style={borderBottomRed1} />
            {orderSummary !== undefined ? content : <Loading />}
          </View>
        </View>
      </DashboardLayout>
      {file !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="url" value={file} visible={file !== undefined} />
      ) : null}
    </Fragment>
  );
};

export const DashboardOrderSummary = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(OrderSummaryComponent);
