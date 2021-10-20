import moment from "moment";
import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, NewCheckBoxDropdownV2, NewDatePicker, NewDropdown, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_EDD_DATE, DICTIONARY_HISTORY_TAB_STATUS, DICTIONARY_NEW_TAB_STATUS } from "../../../../data/dictionary/edd";
import { centerVertical, flexRow, fs16BoldBlack1, px, sh143, sh24, sh32, sh8, sw24, sw64 } from "../../../../styles";

const { DASHBOARD_FILTER } = Language.PAGE;
interface EDDFilterProps {
  activeTab: EDDTabType;
  filter: IEDDFilter;
  setFilter: (value: IEDDFilter) => void;
}

export const EDDFilter: FunctionComponent<EDDFilterProps> = ({ activeTab, filter, setFilter }: EDDFilterProps) => {
  const { dateSorting, startDate, endDate, caseStatus } = filter;

  const handleStartDate = (value?: Date) => {
    setFilter({ ...filter, startDate: value });
  };

  const handleEndDate = (value?: Date) => {
    setFilter({ ...filter, endDate: value });
  };

  const handleDateSorting = (value: string) => {
    setFilter({ ...filter, dateSorting: value });
  };

  const handleCaseStatus = (value: string[]) => {
    setFilter({ ...filter, caseStatus: value });
  };

  let caseStatusList: IEDDStatusLabelValue[] = [];
  switch (activeTab) {
    case "new":
      caseStatusList = DICTIONARY_NEW_TAB_STATUS;
      break;
    case "history":
      caseStatusList = DICTIONARY_HISTORY_TAB_STATUS;
      break;

    default:
      caseStatusList = DICTIONARY_NEW_TAB_STATUS;
      break;
  }

  return (
    <View>
      <View style={{ ...px(sw24) }}>
        <View style={{ ...centerVertical, ...flexRow }}>
          <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh32} style={fs16BoldBlack1} text={DASHBOARD_FILTER.TITLE} />
        </View>
      </View>
      <View style={{ ...flexRow, ...px(sw24) }}>
        <NewDropdown
          handleChange={handleDateSorting}
          items={DICTIONARY_EDD_DATE}
          label={DASHBOARD_FILTER.LABEL_DATE_SORTING}
          value={dateSorting!}
        />
      </View>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View>
          <TextSpaceArea spaceToBottom={sh8} text={DASHBOARD_FILTER.LABEL_START_DATE} />
          <NewDatePicker
            datePickerStyle={{ height: sh143 }}
            maximumDate={endDate || moment().toDate()}
            mode="date"
            setValue={handleStartDate}
            value={startDate}
          />
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        <View>
          <TextSpaceArea spaceToBottom={sh8} text={DASHBOARD_FILTER.LABEL_END_DATE} />
          <NewDatePicker
            datePickerStyle={{ height: sh143 }}
            maximumDate={moment().toDate()}
            minimumDate={startDate}
            mode="date"
            setValue={handleEndDate}
            value={endDate}
          />
        </View>
      </View>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <NewCheckBoxDropdownV2
          handleChange={handleCaseStatus}
          items={caseStatusList}
          label={DASHBOARD_FILTER.LABEL_ORDER_STATUS}
          value={caseStatus!}
        />
      </View>
      <CustomSpacer space={sh24} />
    </View>
  );
};
