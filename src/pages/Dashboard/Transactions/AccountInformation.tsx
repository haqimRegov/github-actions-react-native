import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { getInvestorAccountDetails } from "../../../network-actions";
import { InvestorsMapDispatchToProps, InvestorsMapStateToProps, InvestorsStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { AccountInformation } from "../../../templates";

interface AccountInformationPageProps extends InvestorsStoreProps {
  setScreen: (route: TransactionsPageType) => void;
}

const AccountInformationComponent: FunctionComponent<AccountInformationPageProps> = ({
  currentAccount,
  setScreen,
  updateCurrentAccount,
  updateCurrentOrder,
}: AccountInformationPageProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const [accountInformation, setAccountInformation] = useState<IInvestorAccount | undefined>(undefined);

  const handleBack = () => {
    setScreen("OrderSummary");
  };

  const handleViewProfile = (clientIdToView: string) => {
    updateCurrentAccount({ ...currentAccount, clientId: clientIdToView });
    setScreen("InvestorProfile");
  };

  const handleFetch = async () => {
    const request: IInvestorAccountDetailsRequest = { clientId: currentAccount!.clientId, accountNumber: currentAccount!.accountNumber };
    const accountDetailsResponse: IInvestorAccountDetailsResponse = await getInvestorAccountDetails(request, navigation);
    if (accountDetailsResponse !== undefined) {
      const { data, error } = accountDetailsResponse;
      if (error === null && data !== null) {
        setAccountInformation(data.result);
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleViewOrderSummary = (item: IDashboardOrder) => {
    updateCurrentOrder(item);
    setScreen("OrderSummary");
  };

  useEffect(() => {
    if (accountInformation === undefined) {
      handleFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={flexChild}>
      <AccountInformation
        data={accountInformation}
        handleBack={handleBack}
        handleEdit={() => {}}
        handleViewProfile={handleViewProfile}
        orderHistory={{
          orderHistory: accountInformation !== undefined ? accountInformation.orderHistory : null,
          handleViewOrderSummary: handleViewOrderSummary,
        }}
      />
    </View>
  );
};

export const AccountInformationPage = connect(InvestorsMapStateToProps, InvestorsMapDispatchToProps)(AccountInformationComponent);
