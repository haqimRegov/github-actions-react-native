import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { getInvestorAccountDetails } from "../../network-actions";
import { flexChild } from "../../styles";
import { AccountInformation } from "../../templates";

interface AccountInformationPageProps {
  accountNo: string;
  clientId: string;
  setClientId: (id: string) => void;
  setCurrentOrder: (order: IDashboardOrder) => void;
  setScreen: (page: TRiskProfilePages) => void;
}

export const NewSalesAccountInformation: FunctionComponent<AccountInformationPageProps> = ({
  accountNo,
  clientId,
  setClientId,
  setCurrentOrder,
  setScreen,
}: AccountInformationPageProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const [accountInformation, setAccountInformation] = useState<IInvestorAccount | undefined>(undefined);

  const handleBack = () => {
    console.log("enter");
    setClientId("");
    setScreen("accountSummary");
  };

  const handleViewProfile = (clientIdToView: string) => {
    setClientId(clientIdToView);
    setScreen("profile");
  };

  const handleFetch = async () => {
    const request: IInvestorAccountDetailsRequest = { clientId: clientId, accountNumber: accountNo };
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
    setCurrentOrder(item);
    setScreen("orderSummary");
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
        noEdit={true}
        orderHistory={{
          orderHistory: accountInformation !== undefined ? accountInformation.orderHistory : null,
          handleViewOrderSummary: handleViewOrderSummary,
        }}
      />
    </View>
  );
};
