import React, { Fragment, FunctionComponent } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { MenuPopup } from "../../../../../components";
import { IcoMoon } from "../../../../../icons";
import { colorGray, px, py, sh24, sh4, sw4 } from "../../../../../styles";
import { isNotEmpty } from "../../../../../utils";
import { InvestorOverviewActionContent } from "../Actions";

declare interface IInvestorOverviewActions {
  investorData?: IInvestor;
  item: ITableRowData;
  handleSales?: (item: IInvestorAccountsData) => void;
  handleViewAccount?: (item: ITableRowData) => void;
}

export const InvestorOverviewActions: FunctionComponent<IInvestorOverviewActions> = ({
  investorData,
  item,
  handleSales,
  handleViewAccount,
}: IInvestorOverviewActions) => {
  const handleView = () => {
    if (handleViewAccount !== undefined) {
      handleViewAccount(item);
    }
  };
  return (
    <Fragment>
      <MenuPopup
        RenderButton={({ show }) => {
          return (
            <TouchableWithoutFeedback onPress={show}>
              <View style={{ ...px(sw4), ...py(sh4) }}>
                {isNotEmpty(investorData) &&
                investorData?.isForceUpdate === true &&
                investorData!.accountHolder === "Joint" &&
                investorData!.isMinor === true ? (
                  <IcoMoon color={colorGray._6} name="eye-show" onPress={handleView} size={sh24} />
                ) : (
                  <IcoMoon color={colorGray._6} name="action-menu" size={sh24} />
                )}
              </View>
            </TouchableWithoutFeedback>
          );
        }}
        RenderContent={({ hide }) => {
          return (
            <InvestorOverviewActionContent data={item} onClose={hide} handleSales={handleSales} handleViewAccount={handleViewAccount} />
          );
        }}
      />
    </Fragment>
  );
};
