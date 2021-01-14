import React, { FunctionComponent, useEffect } from "react";
import { Alert, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { AdvanceTable, CustomSpacer } from "../../../../components";
import { Language } from "../../../../constants/language";
import { DASHBOARD_APPROVED_MOCKS } from "../../../../mocks";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  colorWhite,
  fs10RegBlue38,
  fs12BoldBlue2,
  fs12RegBlue2,
  fs12RegBlue25,
  fs12RegBlue6,
  fsTransformNone,
  fsUppercase,
  px,
  sh32,
  sw039,
  sw106,
  sw136,
  sw144,
  sw16,
  sw176,
  sw24,
  sw32,
  sw88,
} from "../../../../styles";
import { CustomTableItem } from "../CustomTableItem";
import { ApprovedOrderActions } from "./Actions";

const { DASHBOARD_HOME } = Language.PAGE;

export interface ApprovedOrdersProps extends TransactionsStoreProps {
  handleRoute: (route: string) => void;
  navigation: IStackNavigationProp;
}

const ApprovedOrdersComponent: FunctionComponent<ApprovedOrdersProps> = ({
  addApprovedOrders,
  approved,
  handleRoute,
  viewOrder,
}: ApprovedOrdersProps) => {
  const handleOrderDetails = (item: ITableData) => {
    viewOrder(item.orderNo);
    handleRoute("OrderDetails");
  };

  // TODO integration
  const handleSort = () => {
    Alert.alert("Sort");
  };

  // TODO integration
  const handleDate = () => {
    Alert.alert("Date");
  };

  useEffect(() => {
    if (approved.orders.length === 0) {
      addApprovedOrders({
        approved: { orders: DASHBOARD_APPROVED_MOCKS, currentPage: 1, totalPages: 5 },
        count: { pending: 10, approved: 10, rejected: 1 },
      });
    }
  }, [addApprovedOrders, approved]);

  const columns: ITableColumn[] = [
    {
      icon: {
        name: "arrow-down",
        size: sw16,
      },
      key: [{ key: "orderNo", textStyle: { ...fs12RegBlue6, ...fsTransformNone, letterSpacing: -sw039 } }],
      onPressHeader: handleSort,
      viewStyle: {
        width: sw88,
      },
      title: DASHBOARD_HOME.LABEL_ORDER_NO,
    },
    {
      customItem: true,
      icon: {
        name: "arrow-down",
        size: sw16,
      },
      key: [{ key: "investorName", textStyle: { ...fsTransformNone, ...fs12BoldBlue2 } }],
      onPressHeader: handleSort,
      titleStyle: { paddingLeft: sw32 },
      viewStyle: {
        width: sw176,
      },
      title: DASHBOARD_HOME.LABEL_INVESTOR_NAME_ID_NO,
    },
    {
      key: [{ key: "transactionType", textStyle: fs12BoldBlue2 }],
      viewStyle: {
        width: sw88,
      },
      title: DASHBOARD_HOME.LABEL_TRANSACTION_TYPE,
    },
    {
      icon: {
        name: "arrow-down",
        size: sw16,
      },
      key: [
        { key: "investment", textStyle: fs12BoldBlue2 },
        { key: "balance", textStyle: fs12RegBlue25 },
      ],
      onPressHeader: handleSort,
      prefix: [
        { key: "currency", targetKey: "investment", textStyle: { ...fs12RegBlue2, ...fsUppercase } },
        { value: "balanceType", key: "currency", targetKey: "balance", textStyle: { ...fs12RegBlue25, ...fsTransformNone } },
      ],
      viewStyle: {
        width: sw144,
      },
      title: DASHBOARD_HOME.LABEL_TOTAL_INVESTMENTS,
    },
    {
      icon: {
        name: "caret-down",
      },
      key: [
        { key: "lastUpdatedDate", textStyle: fs12RegBlue2 },
        { key: "lastUpdatedTime", textStyle: { ...fs10RegBlue38, ...fsUppercase } },
      ],
      onPressHeader: handleDate,
      viewStyle: {
        width: sw136,
      },
      title: DASHBOARD_HOME.LABEL_LAST_UPDATED,
    },
    {
      customItem: true,
      key: [{ key: "status" }],
      viewStyle: {
        width: sw106,
      },
      title: DASHBOARD_HOME.LABEL_STATUS,
    },
  ];

  const tableContainer: ViewStyle = {
    backgroundColor: colorWhite._2,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
    ...px(sw16),
  };

  return (
    <View style={tableContainer}>
      <AdvanceTable
        columns={columns}
        data={approved.orders}
        handleRowNavigation={handleOrderDetails}
        RenderCustomItem={(data: ITableCustomItem) => <CustomTableItem {...data} />}
        RenderOptions={(props: ITableOptions) => <ApprovedOrderActions {...props} handleRoute={handleRoute} setCurrentOrder={viewOrder} />}
      />
      <CustomSpacer space={sh32} />
    </View>
  );
};

export const ApprovedOrders = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(ApprovedOrdersComponent);