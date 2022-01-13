import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, StatusBadge, StatusBadgeColorType } from "../../../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../../../constants";
import { DICTIONARY_ORDER_STATUS } from "../../../../../data/dictionary";
import { IcoMoon } from "../../../../../icons";
import { centerHorizontal, centerVertical, colorBlue, flexRow, fs10RegBlue6, sh16, sh4, sw12 } from "../../../../../styles";

const { DASHBOARD_HOME } = Language.PAGE;

export interface PendingStatusProps extends ITableCustomItem {
  sortedColumns: TransactionsSortColumnType[];
}

export const PendingStatus: FunctionComponent<PendingStatusProps> = ({ accordionIcon, item, sortedColumns }: PendingStatusProps) => {
  const { dueDate, remark, status, withHardcopy } = item.rawData as IDashboardOrder;
  let statusColor: StatusBadgeColorType;
  if (status === DICTIONARY_ORDER_STATUS.void || status === DICTIONARY_ORDER_STATUS.rejected) {
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

  const rerouted =
    status === DICTIONARY_ORDER_STATUS.reroutedBr ||
    status === DICTIONARY_ORDER_STATUS.reroutedHq ||
    status === DICTIONARY_ORDER_STATUS.rejected;

  const dueDateLabel = `${DASHBOARD_HOME.LABEL_DUE}: ${moment(dueDate, "x").format(DEFAULT_DATE_FORMAT)}`;

  return (
    <View style={centerHorizontal}>
      <View style={{ ...flexRow, ...centerVertical }}>
        <StatusBadge color={statusColor} text={status} />
        <CustomSpacer isHorizontal={true} space={sw12} />
        {rerouted === true && accordionIcon !== undefined && remark ? (
          <Fragment>
            <IcoMoon {...accordionIcon} suppressHighlighting={true} />
          </Fragment>
        ) : null}
        {status === "Submitted" && withHardcopy === true ? <IcoMoon color={colorBlue._1} name="receipt" size={sh16} /> : null}
      </View>
      {dueDate !== null ? (
        <Fragment>
          <CustomSpacer space={sh4} />
          <Text style={fs10RegBlue6}>{dueDateLabel}</Text>
        </Fragment>
      ) : null}
    </View>
  );
};
