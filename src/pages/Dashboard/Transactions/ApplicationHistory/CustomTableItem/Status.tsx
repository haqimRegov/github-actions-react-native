import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, Tag, TagColorType } from "../../../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../../../constants";
import { DICTIONARY_ORDER_STATUS } from "../../../../../data/dictionary";
import { IcoMoon } from "../../../../../icons";
import { centerHorizontal, flexRow, fs10RegBlue38, sh4, sw12 } from "../../../../../styles";

const { DASHBOARD_HOME } = Language.PAGE;
export interface PendingStatusProps extends ITableCustomItem {}

export const PendingStatus: FunctionComponent<PendingStatusProps> = ({ accordionIcon, item }: PendingStatusProps) => {
  const { dueDate, status } = item.rawData as IDashboardOrder;
  let statusColor: TagColorType = "primary";
  if (status === DICTIONARY_ORDER_STATUS.void || status === DICTIONARY_ORDER_STATUS.rejected) {
    statusColor = "error";
  } else if (status === DICTIONARY_ORDER_STATUS.submitted) {
    statusColor = "success";
  } else if (status === DICTIONARY_ORDER_STATUS.completed) {
    statusColor = "secondary";
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
      <View style={flexRow}>
        <Tag color={statusColor} text={status} />
        <CustomSpacer isHorizontal={true} space={sw12} />
        {rerouted === true && accordionIcon !== undefined ? (
          <Fragment>
            <IcoMoon {...accordionIcon} />
          </Fragment>
        ) : null}
      </View>
      {dueDate !== null ? (
        <Fragment>
          <CustomSpacer space={sh4} />
          <Text style={fs10RegBlue38}>{dueDateLabel}</Text>
        </Fragment>
      ) : null}
    </View>
  );
};
