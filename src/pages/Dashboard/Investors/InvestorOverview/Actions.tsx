import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { IconText } from "../../../../components";
import { Language } from "../../../../constants";
import { borderBottomGray2, fs12BoldBlue1, px, sh48, sw16, sw200, sw8 } from "../../../../styles";

const { INVESTOR_ACCOUNTS } = Language.PAGE;

interface InvestorOverviewActionContentProps extends ITableOptions {
  handleBuyNewFund?: (item: IInvestorAccountsData) => void;
  handleViewAccount?: (item: ITableRowData) => void;
}

export const InvestorOverviewActionContent: FunctionComponent<InvestorOverviewActionContentProps> = ({
  data,
  handleBuyNewFund,
  handleViewAccount,
  onClose,
}: InvestorOverviewActionContentProps) => {
  const handleBuy = () => {
    if (handleBuyNewFund !== undefined) {
      handleBuyNewFund(data.rawData as unknown as IInvestorAccountsData);
    }
    onClose();
  };

  const handleView = () => {
    if (handleViewAccount !== undefined) {
      handleViewAccount(data);
    }
  };

  const itemStyle: ViewStyle = {
    ...borderBottomGray2,
    ...fs12BoldBlue1,
    ...px(sw16),
    height: sh48,
    width: sw200,
  };

  return (
    <View style={{ borderRadius: sw8 }}>
      <IconText name="eye-show" onPress={handleView} style={itemStyle} text={INVESTOR_ACCOUNTS.LABEL_VIEW_DETAILS} />
      <IconText name="buy-new-fund" onPress={handleBuy} style={itemStyle} text={INVESTOR_ACCOUNTS.LABEL_SALES} />
    </View>
  );
};
