import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, Tag, TagColorType } from "../../../../components";
import { DICTIONARY_ORDER_STATUS } from "../../../../data/dictionary";
import { IcoMoon } from "../../../../icons";
import { centerHorizontal, flexRow, fs10RegBlue38, sh4, sw12 } from "../../../../styles";

export interface PendingStatusProps extends ITableCustomItem {}

export const PendingStatus: FunctionComponent<PendingStatusProps> = ({ accordionIcon, item }: PendingStatusProps) => {
  const { dueDate, status } = item.rawData as IApplicationHistoryTable;
  let statusColor: TagColorType = "primary";
  if (
    status === DICTIONARY_ORDER_STATUS.submitted ||
    status === DICTIONARY_ORDER_STATUS.pending ||
    status === DICTIONARY_ORDER_STATUS.pendingDoc ||
    status === DICTIONARY_ORDER_STATUS.pendingPayment ||
    status === DICTIONARY_ORDER_STATUS.edd
  ) {
    statusColor = "warning";
  } else if (status === DICTIONARY_ORDER_STATUS.completed) {
    statusColor = "secondary";
  } else {
    statusColor = "danger";
  }
  const rerouted = status === DICTIONARY_ORDER_STATUS.rejectedBr || status === DICTIONARY_ORDER_STATUS.rejectedHq;

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
      {rerouted === true ? (
        <Fragment>
          <CustomSpacer space={sh4} />
          <Text style={fs10RegBlue38}>{dueDate}</Text>
        </Fragment>
      ) : null}
    </View>
  );
};
