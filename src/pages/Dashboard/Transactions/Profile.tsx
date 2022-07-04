import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { InvestorsMapDispatchToProps, InvestorsMapStateToProps, InvestorsStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { InvestorProfile } from "../../../templates";
import { INVESTOR_PROFILE_DUMMY_RESPONSE } from "../Transactions/change-request-summary-dummy";

interface InvestorProfilePageProps extends InvestorsStoreProps {
  setScreen: (route: TransactionsPageType) => void;
}

const InvestorProfileComponent: FunctionComponent<InvestorProfilePageProps> = ({
  currentInvestor,
  setScreen,
}: InvestorProfilePageProps) => {
  const [investorProfile, setInvestorProfile] = useState<IInvestorAccount | undefined>(undefined);

  const handleBack = () => {
    setScreen("OrderSummary");
  };

  const handleFetch = async () => {
    // TODO integration using currentInvestor.clientId
    // eslint-disable-next-line no-console
    console.log("InvestorProfileComponent currentInvestor", currentInvestor);
    // setLoading(true);
    // const request: IGetOrderSummaryRequest = { orderNumber: currentOrder!.orderNumber };
    // const dashboardResponse: IGetOrderSummaryResponse = await getOrderSummary(request, navigation);
    // console.log(dashboardResponse);
    // setLoading(false);
    // if (dashboardResponse !== undefined) {
    //   const { data, error } = dashboardResponse;
    //   if (error === null && data !== null) {
    //     setInvestorProfile(data.result);
    //   }
    //   if (error !== null) {
    //     setTimeout(() => {
    //       Alert.alert(error.message);
    //     }, 100);
    //   }
    // }
    setInvestorProfile(INVESTOR_PROFILE_DUMMY_RESPONSE);
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={flexChild}>
      <InvestorProfile handleBack={handleBack} handleEdit={() => {}} data={investorProfile} />
    </View>
  );
};

export const InvestorProfilePage = connect(InvestorsMapStateToProps, InvestorsMapDispatchToProps)(InvestorProfileComponent);
