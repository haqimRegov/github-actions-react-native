import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, MultiSelectPills, NewCheckBoxDropdown, NewDatePicker, StatusBadge, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import {
  DICTIONARY_APPROVED_STATUS_FILTER,
  DICTIONARY_PENDING_STATUS_FILTER,
  DICTIONARY_REJECTED_STATUS_FILTER,
  DICTIONARY_TRANSACTIONS_ACCOUNT_TYPE,
  DICTIONARY_TRANSACTIONS_TYPE,
} from "../../../../data/dictionary";
import { flexRow, fs12BoldGray6, fs16BoldGray6, px, sh143, sh16, sh24, sh32, sh4, sw16, sw24, sw64, sw8 } from "../../../../styles";
import { isNotEmpty, titleCaseString } from "../../../../utils";

const { DASHBOARD_FILTER } = Language.PAGE;
interface TransactionsFilterProps {
  activeTab: TransactionsTabType;
  availableFilters: ITransactionsAvailableFilter;
  filter: ITransactionsFilter;
  setFilter: (value: ITransactionsFilter) => void;
}

export const TransactionsFilter: FunctionComponent<TransactionsFilterProps> = ({
  activeTab,
  availableFilters,
  filter,
  setFilter,
}: TransactionsFilterProps) => {
  const { dateSorting, startDate, endDate, transactionsType, accountType, orderStatus } = filter;

  const handleStartDate = (value?: Date) => {
    if (value !== undefined && endDate !== undefined) {
      const updatedDate = value < endDate ? value : endDate;
      setFilter({ ...filter, startDate: updatedDate });
    }
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

  const handleAccountType = (value: string[]) => {
    setFilter({ ...filter, accountType: value });
  };

  const handleTransactionsType = (value: string[]) => {
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
  const pills: string[] = ["Created", "Last Updated"];
  const disabledTransactionTypes: string[] = DICTIONARY_TRANSACTIONS_TYPE.map((eachTransaction) => eachTransaction.value).filter(
    (eachValue: string) => !availableFilters.transactionType.includes(eachValue),
  );
  const disabledAccountTypes: string[] = DICTIONARY_TRANSACTIONS_ACCOUNT_TYPE.map((eachAccountType) => eachAccountType.value).filter(
    (eachValue: string) => !availableFilters.accountType.map((eachType) => titleCaseString(eachType)).includes(eachValue),
  );
  const disabledStatuses: string[] = orderStatusList
    .map((eachStatus) => eachStatus.value)
    .filter((eachValue: string) => !availableFilters.orderStatus.includes(eachValue));

  return (
    <View>
      <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={{ ...fs16BoldGray6, ...px(sw24) }} text={DASHBOARD_FILTER.TITLE} />
      <View style={px(sw24)}>
        <Text style={fs12BoldGray6}>{DASHBOARD_FILTER.LABEL_DATE_SORTING}</Text>
        <CustomSpacer space={sh4} />
        <View style={flexRow}>
          {pills.map((currentPill: string, index: number) => {
            const handlePress = () => {
              handleDateSorting(pills[index]);
            };

            return (
              <View key={index} style={flexRow}>
                <StatusBadge
                  color={isNotEmpty(dateSorting) && dateSorting!.toLowerCase() === currentPill.toLowerCase() ? "primary" : "secondary"}
                  onPress={handlePress}
                  style={{ ...px(sw16) }}
                  text={currentPill}
                />
                <CustomSpacer isHorizontal={true} space={sw8} />
              </View>
            );
          })}
        </View>
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
        <NewCheckBoxDropdown
          disabledValues={disabledTransactionTypes}
          handleChange={handleTransactionsType}
          items={DICTIONARY_TRANSACTIONS_TYPE}
          label={DASHBOARD_FILTER.LABEL_TRANSACTIONS_TYPE}
          value={transactionsType!}
        />
        <CustomSpacer isHorizontal={true} space={sw64} />
        <NewCheckBoxDropdown
          disabledValues={disabledStatuses}
          handleChange={handleOrderStatus}
          items={orderStatusList}
          label={DASHBOARD_FILTER.LABEL_ORDER_STATUS}
          value={orderStatus!}
        />
      </View>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <MultiSelectPills
          disabledValues={disabledAccountTypes}
          onSelect={handleAccountType}
          labels={DICTIONARY_TRANSACTIONS_ACCOUNT_TYPE}
          header={DASHBOARD_FILTER.LABEL_ACCOUNT_TYPE}
          space={sw8}
          values={accountType!}
        />
      </View>
    </View>
  );
};
