import React, { Fragment, FunctionComponent } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { MenuPopup } from "../../../../../components";
import { IcoMoon } from "../../../../../icons";
import { colorGray, px, py, sh20, sh24, sh4, sw4 } from "../../../../../styles";
import { PendingOrderActions } from "../Incomplete/Actions";

declare interface IPendingActions {
  downloadInitiated?: boolean;
  item: ITableRowData;
  handleResubmitOrder?: (orderNumber: string) => void;
  handleSelectOrder?: (order: IDashboardOrder) => void;
  setCurrentOrder?: (order: IDashboardOrder) => void;
  setScreen?: (route: TransactionsPageType) => void;
  sortedColumns?: TransactionsSortColumnType[];
}

export const PendingActions: FunctionComponent<IPendingActions> = ({
  downloadInitiated,
  item,
  handleSelectOrder,
  handleResubmitOrder,
  setCurrentOrder,
  setScreen,
}: IPendingActions) => {
  const handleView = () => {
    if (setCurrentOrder !== undefined && setScreen !== undefined) {
      setCurrentOrder(item.rawData as unknown as IDashboardOrder);
      setScreen("OrderSummary");
    }
  };
  return (
    <Fragment>
      {(item.rawData.status === "Submitted" && item.rawData.withHardcopy === false) ||
      item.rawData.status === "Pending Initial Order" ||
      downloadInitiated === true ? (
        <TouchableWithoutFeedback onPress={handleView}>
          <View>
            <IcoMoon color={colorGray._6} name="eye-show" size={sh20} />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <MenuPopup
          RenderButton={({ show }) => {
            return (
              <TouchableWithoutFeedback onPress={show}>
                <View style={{ ...px(sw4), ...py(sh4) }}>
                  <IcoMoon color={colorGray._6} name="action-menu" size={sh24} />
                </View>
              </TouchableWithoutFeedback>
            );
          }}
          RenderContent={({ hide }) => {
            return (
              <PendingOrderActions
                data={item}
                onClose={hide}
                handleResubmitOrder={handleResubmitOrder!}
                handleSelectOrder={handleSelectOrder!}
                setScreen={setScreen!}
                setCurrentOrder={setCurrentOrder!}
              />
            );
          }}
        />
      )}
    </Fragment>
  );
};
