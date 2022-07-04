import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { InvestorsMapDispatchToProps, InvestorsMapStateToProps, InvestorsStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { AccountInformation } from "../../../templates";
import { ACCOUNT_INFORMATION_DUMMY_RESPONSE, ORDER_HISTORY_DUMMY } from "../Transactions/change-request-summary-dummy";

interface AccountInformationPageProps extends InvestorsStoreProps {
  setScreen: (route: TransactionsPageType) => void;
}

const AccountInformationComponent: FunctionComponent<AccountInformationPageProps> = ({
  addOrderHistory,
  currentAccount,
  orderHistory,
  setScreen,
  updateCurrentOrder,
  updateOrderHistorySort,
}: AccountInformationPageProps) => {
  const { sort } = orderHistory;
  const [accountInformation, setAccountInformation] = useState<IInvestorAccount | undefined>(undefined);
  const [showDateBy, setShowDateBy] = useState<IShowDateBy>({ type: "Last Updated", key: "descending" });
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleBack = () => {
    setScreen("OrderSummary");
  };

  const handleViewProfile = () => {
    setScreen("InvestorProfile");
  };

  const handleFetch = async () => {
    // TODO integration fetch account information using currentAccount.accountNo
    console.log("AccountInformationPage currentAccount", currentAccount);
    // setLoading(true);
    // const request: IGetOrderSummaryRequest = { orderNumber: currentOrder!.orderNumber };
    // const dashboardResponse: IGetOrderSummaryResponse = await getOrderSummary(request, navigation);
    // console.log(dashboardResponse);
    // setLoading(false);
    // if (dashboardResponse !== undefined) {
    //   const { data, error } = dashboardResponse;
    //   if (error === null && data !== null) {
    setAccountInformation(ACCOUNT_INFORMATION_DUMMY_RESPONSE);
    //   }
    //   if (error !== null) {
    //     setTimeout(() => {
    //       Alert.alert(error.message);
    //     }, 100);
    //   }
    // }
  };

  const handleFetchOrderHistory = async () => {
    setIsFetching(true);
    const findStatus = sort.filter((sortType) => sortType.column === "status");

    // const filterStatus = filter.orderStatus!.map((value) => ({ column: "status", value: value }));
    // const filterAccountType = filter.accountType!.map((value) => ({ column: "accountType", value: value }));
    // const filterTransactionsType = filter.transactionsType!.map((value) => ({ column: "transactionType", value: value }));
    // const minimumDate = filter.startDate !== undefined ? moment(filter.startDate).startOf("day").format("x") : "0";
    // const maximumDate = filter.endDate !== undefined ? moment(filter.endDate).endOf("day").format("x") : moment().endOf("day").format("x");
    // const checkDateSorting =
    //   filter.dateSorting !== "Created"
    //     ? {
    //         column: filter.dateSorting === "Created" ? "createdOn" : "lastUpdated",
    //         value: `${minimumDate}~${maximumDate}`,
    //       }
    //     : undefined;
    // const updatedFilter = [...filterTransactionsType, ...filterAccountType, ...filterStatus];
    // if (checkDateSorting !== undefined) {
    //   updatedFilter.push(checkDateSorting);
    // }
    const checkStatusSort: ITransactionsSort[] =
      findStatus.length !== 0 ? [...sort, { column: "lastUpdated", value: "descending" }] : [...sort];
    const defaultSort: ITransactionsSort[] = sort.length === 0 ? [{ column: "lastUpdated", value: "descending" }] : checkStatusSort;
    // eslint-disable-next-line no-console
    console.log("defaultSort", defaultSort);
    // const request: IDashboardRequest = {
    //   tab: "rejected",
    //   page: page,
    //   search: search,
    //   sort: defaultSort,
    //   filter: updatedFilter,
    // };
    // console.log("request", request);
    // const dashboardResponse: IDashboardResponse = await getDashboard(request, navigation, setIsFetching);
    const orderHistoryResponse = { data: { result: { orders: ORDER_HISTORY_DUMMY } }, error: null };
    setIsFetching(false);
    if (orderHistoryResponse !== undefined) {
      const { data, error } = orderHistoryResponse;
      if (error === null && data !== null) {
        addOrderHistory({
          ...orderHistory,
          orders: data.result.orders,
        });
      }
      if (error !== null) {
        setTimeout(() => {
          // Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleViewOrderSummary = (item: IDashboardOrder) => {
    updateCurrentOrder(item);
    setScreen("OrderSummary");
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={flexChild}>
      <AccountInformation
        data={accountInformation}
        handleBack={handleBack}
        handleEdit={() => {}}
        handleViewProfile={handleViewProfile}
        orderHistory={{
          isFetching: isFetching,
          orderHistory: orderHistory,
          showDateBy: showDateBy,
          setShowDateBy: setShowDateBy,
          handleFetch: handleFetchOrderHistory,
          handleViewOrderSummary: handleViewOrderSummary,
          updateOrderHistorySort: updateOrderHistorySort,
        }}
      />
    </View>
  );
};

export const AccountInformationPage = connect(InvestorsMapStateToProps, InvestorsMapDispatchToProps)(AccountInformationComponent);
