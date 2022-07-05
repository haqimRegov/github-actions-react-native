import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, StatusBadge, StatusBadgeColorType } from "../../../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../../../constants";
import { DICTIONARY_ORDER_STATUS } from "../../../../../data/dictionary";
import { IcoMoon } from "../../../../../icons";
import { centerHorizontal, centerVertical, flexRow, fs10RegBlue6, sh4, sw16, sw8 } from "../../../../../styles";

const { DASHBOARD_HOME } = Language.PAGE;

interface PendingStatusProps extends ITableCustomItem {
  downloadInitiated?: boolean;
}

export const PendingStatus: FunctionComponent<PendingStatusProps> = ({ accordionIcon, downloadInitiated, item }: PendingStatusProps) => {
  const { dueDate, status, withHardcopy } = item.rawData as unknown as IDashboardOrder;
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

  const iconName = status === "Submitted" && withHardcopy === true ? "receipt-new" : undefined;

  const dueDateLabel = `${DASHBOARD_HOME.LABEL_DUE}: ${moment(dueDate, "x").format(DEFAULT_DATE_FORMAT)}`;

  return (
    <View style={centerHorizontal}>
      <View style={{ ...flexRow, ...centerVertical }}>
        <StatusBadge color={statusColor} icon={iconName} iconSize={sw16} text={status} />
        <CustomSpacer isHorizontal={true} space={sw8} />
        {accordionIcon !== undefined && downloadInitiated !== true ? (
          <Fragment>
            <IcoMoon {...accordionIcon} suppressHighlighting={true} />
          </Fragment>
        ) : null}
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
