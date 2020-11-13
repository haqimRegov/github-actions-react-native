import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { AdvanceTable, CustomSpacer } from "../../../../components";
import { Language } from "../../../../constants/language";
import { DASHBOARD_PENDING_MOCKS } from "../../../../mocks";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  centerHorizontal,
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
  sw128,
  sw152,
  sw16,
  sw170,
  sw24,
  sw32,
  sw80,
  sw88,
} from "../../../../styles";
import { CustomTableItem } from "../CustomTableItem";
import { EDDReasons } from "../EDDReasons";
import { PendingOrderActions } from "./Actions";

const { DASHBOARD_HOME } = Language.PAGE;

export interface PendingOrdersProps extends TransactionsStoreProps {
  handleRoute: (route: string) => void;
  navigation: IStackNavigationProp;
}

const PendingOrdersComponent: FunctionComponent<PendingOrdersProps> = ({
  addPendingOrders,
  pending,
  handleRoute,
  addSelectedOrders,
  viewOrder,
  selectedOrders,
}: PendingOrdersProps) => {
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);

  // TODO integration
  const handleSort = () => {
    Alert.alert("Sort");
  };

  // TODO integration
  const handleDate = () => {
    Alert.alert("Date");
  };

  const handleShowEDDReasons = (item: ITableRowData) => {
    const newSections: number[] = [...activeAccordion];
    const sectionIndex = newSections.indexOf(item.index);
    if (sectionIndex > -1) {
      newSections.splice(sectionIndex, 1);
    } else {
      newSections.splice(0, 1, item.index);
    }
    setActiveAccordion(newSections);
  };

  const handleOrderDetails = (item: ITableData) => {
    viewOrder(item.orderNo);
    handleRoute("OrderDetails");
  };

  const handleSelectProduct = (product: ITableData[]) => {
    let newSelected = product === pending.orders ? product : [...selectedOrders];
    if (product.length === 0) {
      newSelected = [];
    }
    if (product.length === 1) {
      const sectionIndex = newSelected.indexOf(product[0]);
      if (sectionIndex > -1) {
        newSelected.splice(sectionIndex, 1);
      } else {
        newSelected.push(product[0]);
      }
    }
    addSelectedOrders(newSelected as IApplicationHistoryTable[]);
  };

  const tableAccordion = (item: ITableData) => {
    return (
      <Fragment>
        {item.remark !== undefined ? (
          <Fragment>
            <EDDReasons data={item.remark} />
          </Fragment>
        ) : null}
      </Fragment>
    );
  };

  useEffect(() => {
    if (pending.orders.length === 0) {
      addPendingOrders({
        pending: { orders: DASHBOARD_PENDING_MOCKS, currentPage: 1, totalPages: 5 },
        count: { pending: 10, approved: 10, rejected: 1 },
      });
    }
  }, [addPendingOrders, pending]);

  const columns: ITableColumn[] = [
    {
      icon: {
        name: "arrow-down",
        size: sw16,
      },
      key: [{ key: "orderNo", textStyle: { ...fs12RegBlue6, ...fsTransformNone, letterSpacing: -sw039 } }],
      onPressHeader: handleSort,
      viewStyle: {
        width: sw80,
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
      titleStyle: { paddingLeft: sw32 },
      onPressHeader: handleSort,
      viewStyle: {
        width: sw152,
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
      customItem: true,
      icon: {
        name: "arrow-down",
        size: sw16,
      },
      key: [
        { key: "investments" },
        // { key: "balance", textStyle: fs12RegBlue25 },
      ],
      onPressHeader: handleSort,
      prefix: [
        { key: "currency", targetKey: "investment", textStyle: { ...fs12RegBlue2, ...fsUppercase } },
        { value: "balanceType", key: "currency", targetKey: "balance", textStyle: { ...fs12RegBlue25, ...fsTransformNone } },
      ],
      viewStyle: {
        width: sw128,
      },
      title: DASHBOARD_HOME.LABEL_TOTAL_INVESTMENTS,
    },
    {
      icon: {
        name: "caret-down",
        size: sw16,
      },
      key: [
        { key: "createdOnDate", textStyle: fs12RegBlue2 },
        { key: "createdOnTime", textStyle: { ...fs10RegBlue38, ...fsUppercase } },
      ],
      onPressHeader: handleDate,
      viewStyle: {
        width: sw80,
        ...px(0),
        ...centerHorizontal,
      },
      title: DASHBOARD_HOME.LABEL_CREATED_ON,
    },
    {
      icon: {
        name: "arrow-down",
        size: sw16,
      },
      key: [{ key: "status" }],
      onPressHeader: handleSort,
      viewStyle: {
        width: sw170,
      },
      customItem: true,
      title: DASHBOARD_HOME.LABEL_TRANSACTION_STATUS,
      onPressItem: handleShowEDDReasons,
      withAccordion: true,
    },
  ];

  const renderAccordion = pending.orders.length !== 0 ? tableAccordion : undefined;

  const tableContainer: ViewStyle = { backgroundColor: colorWhite._2, borderBottomRightRadius: sw24, borderBottomLeftRadius: sw24 };
  return (
    <Fragment>
      <View style={tableContainer}>
        <AdvanceTable
          activeAccordion={activeAccordion}
          columns={columns}
          data={pending.orders}
          rowSelection={selectedOrders}
          onRowSelect={handleSelectProduct}
          handleRowNavigation={handleOrderDetails}
          RenderAccordion={renderAccordion}
          RenderCustomItem={(data: ITableCustomItem) => <CustomTableItem {...data} />}
          RenderOptions={(props: ITableOptions) => <PendingOrderActions {...props} handleRoute={handleRoute} setCurrentOrder={viewOrder} />}
          rowSelectionLabel=""
        />
        <CustomSpacer space={sh32} />
      </View>
    </Fragment>
  );
};

export const PendingOrders = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(PendingOrdersComponent);
