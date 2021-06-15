import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { ActivityIndicator, Alert, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, FileViewer, Tab } from "../../../../components";
import { Language } from "../../../../constants/language";
import { getOrderSummary } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  borderBottomBlack21,
  centerHV,
  colorGray,
  colorWhite,
  flexChild,
  flexRow,
  sh16,
  sh24,
  sh56,
  shadowBlue5,
  sw24,
} from "../../../../styles";
import { DashboardLayout } from "../../DashboardLayout";
import { AccountDetails } from "./Account";
import { OrderDetails } from "./OrderDetails";

const { DASHBOARD_ORDER_SUMMARY } = Language.PAGE;

interface OrderDetailsProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
}

const OrderSummaryComponent: FunctionComponent<OrderDetailsProps> = (props: OrderDetailsProps) => {
  const { currentOrder, setScreen, navigation, updateCurrentOrder } = props;
  const [orderSummary, setOrderSummary] = useState<IDashboardOrderSummary | undefined>(undefined);
  const [selection, setSelection] = useState<number>(0);
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);

  const handleCloseViewer = () => {
    setFile(undefined);
  };

  const handleAccountDetails = () => {
    setSelection(1);
  };

  const handleOrderDetails = () => {
    setSelection(0);
  };

  const handleBack = () => {
    updateCurrentOrder(undefined);
    setScreen("Transactions");
  };

  const contentProps = { data: orderSummary!, setFile: setFile };

  let content: JSX.Element = <OrderDetails {...contentProps} isScheduled={currentOrder!.isScheduled} />;

  if (selection === 1) {
    content = <AccountDetails {...contentProps} />;
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
        setSelection(0);
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
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    marginHorizontal: sw24,
    marginVertical: sh24,
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
            <CustomSpacer space={sh16} />
            <View style={flexRow}>
              <Tab
                onPress={handleOrderDetails}
                selected={selection === 0}
                style={{ height: sh56 }}
                text={DASHBOARD_ORDER_SUMMARY.TAB_ORDER_DETAILS}
              />
              <Tab
                onPress={handleAccountDetails}
                selected={selection === 1}
                style={{ height: sh56 }}
                text={DASHBOARD_ORDER_SUMMARY.TAB_PROFILE}
              />
              <CustomSpacer isHorizontal={true} space={sw24} />
            </View>
            <View style={borderBottomBlack21} />
            {orderSummary !== undefined ? (
              content
            ) : (
              <View style={{ ...centerHV, ...flexChild }}>
                <ActivityIndicator color={colorGray._7} size="small" />
              </View>
            )}
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
