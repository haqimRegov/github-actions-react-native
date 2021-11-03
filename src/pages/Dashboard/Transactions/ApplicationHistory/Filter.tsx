import moment from "moment";
import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, NewCheckBoxDropdown, NewDatePicker, NewDropdown, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import {
  DICTIONARY_APPROVED_STATUS_FILTER,
  DICTIONARY_PENDING_STATUS_FILTER,
  DICTIONARY_REJECTED_STATUS_FILTER,
  DICTIONARY_TRANSACTIONS_ACCOUNT_TYPE,
  DICTIONARY_TRANSACTIONS_DATE,
  DICTIONARY_TRANSACTIONS_TYPE,
} from "../../../../data/dictionary";
import { flexRow, fs16BoldGray6, px, sh143, sh16, sh24, sh32, sh4, sw24, sw64 } from "../../../../styles";

const { DASHBOARD_FILTER } = Language.PAGE;
interface TransactionsFilterProps {
  activeTab: TransactionsTabType;
  filter: ITransactionsFilter;
  setFilter: (value: ITransactionsFilter) => void;
}

export const TransactionsFilter: FunctionComponent<TransactionsFilterProps> = ({
  activeTab,
  filter,
  setFilter,
}: TransactionsFilterProps) => {
  const { dateSorting, startDate, endDate, transactionsType, accountType, orderStatus } = filter;

  const handleStartDate = (value?: Date) => {
    setFilter({ ...filter, startDate: value });
  };

  const handleEndDate = (value?: Date) => {
    setFilter({ ...filter, endDate: value });
  };

  const handleDateSorting = (value: string) => {
    setFilter({ ...filter, dateSorting: value });
  };

  const handleOrderStatus = (value: string[]) => {
    setFilter({ ...filter, orderStatus: value });
  };

  const handleAccountType = (value: string) => {
    setFilter({ ...filter, accountType: value });
  };

  const handleTransactionsType = (value: string) => {
    setFilter({ ...filter, transactionsType: value });
  };

  let orderStatusList: OrderStatusLabelValue[] = [];
  switch (activeTab) {
    case "approved":
      orderStatusList = DICTIONARY_APPROVED_STATUS_FILTER;
      break;
    case "rejected":
      orderStatusList = DICTIONARY_REJECTED_STATUS_FILTER;
      break;

    default:
      orderStatusList = DICTIONARY_PENDING_STATUS_FILTER;
      break;
  }

  return (
    <View>
      <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={{ ...fs16BoldGray6, ...px(sw24) }} text={DASHBOARD_FILTER.TITLE} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <NewDropdown
          handleChange={handleDateSorting}
          items={DICTIONARY_TRANSACTIONS_DATE}
          label={DASHBOARD_FILTER.LABEL_DATE_SORTING}
          value={dateSorting!}
        />
      </View>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View>
          <TextSpaceArea spaceToBottom={sh4} text={DASHBOARD_FILTER.LABEL_START_DATE} />
          <NewDatePicker
            datePickerStyle={{ height: sh143 }}
            mode="date"
            maximumDate={endDate || moment().toDate()}
            setValue={handleStartDate}
            value={startDate}
          />
          {/* <CustomCalendar
            handleSetStartDate={handleStartDate}
            startDate={startDate!}
          /> */}
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        <View>
          <TextSpaceArea spaceToBottom={sh4} text={DASHBOARD_FILTER.LABEL_END_DATE} />
          {/* <CustomCalendar handleSetStartDate={handleEndDate} startDate={endDate!} /> */}
          <NewDatePicker
            datePickerStyle={{ height: sh143 }}
            mode="date"
            minimumDate={startDate}
            maximumDate={moment().toDate()}
            setValue={handleEndDate}
            value={endDate}
          />
        </View>
      </View>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <NewDropdown
          handleChange={handleTransactionsType}
          items={DICTIONARY_TRANSACTIONS_TYPE}
          label={DASHBOARD_FILTER.LABEL_TRANSACTIONS_TYPE}
          value={transactionsType!}
        />
        <CustomSpacer isHorizontal={true} space={sw64} />
        <NewCheckBoxDropdown
          handleChange={handleOrderStatus}
          items={orderStatusList}
          label={DASHBOARD_FILTER.LABEL_ORDER_STATUS}
          value={orderStatus!}
        />
      </View>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <NewDropdown
          handleChange={handleAccountType}
          items={DICTIONARY_TRANSACTIONS_ACCOUNT_TYPE}
          label={DASHBOARD_FILTER.LABEL_ACCOUNT_TYPE}
          value={accountType!}
        />
      </View>
    </View>
  );
};
