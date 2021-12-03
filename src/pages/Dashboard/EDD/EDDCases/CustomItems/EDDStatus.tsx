import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, Tag, TagColorType } from "../../../../../components";
import { DICTIONARY_EDD_STATUS } from "../../../../../data/dictionary/edd";
import { IcoMoon } from "../../../../../icons";
import { centerHorizontal, centerVertical, flexRow, sw12 } from "../../../../../styles";

export interface EDDStatusProps extends ITableCustomItem {
  sortedColumns: IEDDDashboardSortType[];
}

export const EDDStatus: FunctionComponent<EDDStatusProps> = ({ accordionIcon, item }: EDDStatusProps) => {
  const { remark, status } = item.rawData as IEDDDashboardCase;
  let statusColor: TagColorType;
  if (
    status === DICTIONARY_EDD_STATUS.overdue1 ||
    status === DICTIONARY_EDD_STATUS.overdue2 ||
    status === DICTIONARY_EDD_STATUS.cancelled
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
        <Tag color={statusColor} text={status} />
        <CustomSpacer isHorizontal={true} space={sw12} />
        {accordionIcon !== undefined && remark ? (
          <Fragment>
            <IcoMoon {...accordionIcon} suppressHighlighting={true} />
          </Fragment>
        ) : null}
      </View>
    </View>
  );
};
