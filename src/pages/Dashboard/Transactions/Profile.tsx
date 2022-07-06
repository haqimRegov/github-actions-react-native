import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { getInvestorAccountDetails } from "../../../network-actions";
import { InvestorsMapDispatchToProps, InvestorsMapStateToProps, InvestorsStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { InvestorProfile } from "../../../templates";

interface InvestorProfilePageProps extends InvestorsStoreProps {
  setScreen: (route: TransactionsPageType) => void;
}

const InvestorProfileComponent: FunctionComponent<InvestorProfilePageProps> = ({ currentAccount, setScreen }: InvestorProfilePageProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const [investorProfile, setInvestorProfile] = useState<IInvestorAccount | undefined>(undefined);

  const handleBack = () => {
    setScreen(currentAccount?.accountNumber !== undefined ? "AccountInformation" : "OrderSummary");
  };

  const handleFetch = async () => {
    const request: IInvestorAccountDetailsRequest = { clientId: currentAccount!.clientId };
    const accountDetailsResponse: IInvestorAccountDetailsResponse = await getInvestorAccountDetails(request, navigation);
    if (accountDetailsResponse !== undefined) {
      const { data, error } = accountDetailsResponse;
      if (error === null && data !== null) {
        setInvestorProfile(data.result);
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (investorProfile === undefined) {
      handleFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={flexChild}>
      <InvestorProfile handleBack={handleBack} handleEdit={() => {}} data={investorProfile} />
    </View>
  );
};

export const InvestorProfilePage = connect(InvestorsMapStateToProps, InvestorsMapDispatchToProps)(InvestorProfileComponent);
