import React, { Fragment, FunctionComponent } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { MenuPopup } from "../../../../../components";
import { IcoMoon } from "../../../../../icons";
import { colorGray, px, py, sh24, sh4, sw4 } from "../../../../../styles";
import { InvestorOverviewActionContent } from "../Actions";

declare interface IInvestorOverviewActions {
  item: ITableRowData;
  handleBuyNewFund?: (item: IInvestorAccountsData) => void;
  handleViewAccount?: (item: ITableRowData) => void;
}

export const InvestorOverviewActions: FunctionComponent<IInvestorOverviewActions> = ({
  item,
  handleBuyNewFund,
  handleViewAccount,
}: IInvestorOverviewActions) => {
  return (
    <Fragment>
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
            <InvestorOverviewActionContent
              data={item}
              onClose={hide}
              handleBuyNewFund={handleBuyNewFund}
              handleViewAccount={handleViewAccount}
            />
          );
        }}
      />
    </Fragment>
  );
};
