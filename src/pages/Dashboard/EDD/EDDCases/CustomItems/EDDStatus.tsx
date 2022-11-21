import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, StatusBadge, StatusBadgeColorType } from "../../../../../components";
import { DICTIONARY_EDD_STATUS } from "../../../../../data/dictionary/edd";
import { IcoMoon } from "../../../../../icons";
import { centerHorizontal, centerVertical, flexRow, sw12 } from "../../../../../styles";

export interface EDDStatusProps extends ITableCustomItem {
  sortedColumns: IEDDDashboardSortType[];
}

export const EDDStatus: FunctionComponent<EDDStatusProps> = ({ accordionIcon, item }: EDDStatusProps) => {
  const { status } = item.rawData as unknown as IEDDDashboardCase;
  let statusColor: StatusBadgeColorType;
  if (
    status === DICTIONARY_EDD_STATUS.overdue1 ||
    status === DICTIONARY_EDD_STATUS.overdue2 ||
    status === DICTIONARY_EDD_STATUS.cancelled ||
    status === DICTIONARY_EDD_STATUS.rerouted
  ) {
    statusColor = "error";
  } else if (status === DICTIONARY_EDD_STATUS.submitted) {
    statusColor = "success";
  } else if (status === DICTIONARY_EDD_STATUS.completed) {
    statusColor = "complete";
  } else {
    statusColor = "warning";
  }

  return (
    <View style={centerHorizontal}>
      <View style={{ ...flexRow, ...centerVertical }}>
        <StatusBadge color={statusColor} text={status} />
        <CustomSpacer isHorizontal={true} space={sw12} />
        {accordionIcon !== undefined ? (
          <Fragment>
            <IcoMoon {...accordionIcon} suppressHighlighting={true} />
          </Fragment>
        ) : null}
      </View>
    </View>
  );
};
