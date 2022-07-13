import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer } from "../../../components";
import { getInvestorAccountDetails } from "../../../network-actions";
import { InvestorsMapDispatchToProps, InvestorsMapStateToProps, InvestorsStoreProps } from "../../../store";
import { flexChild, sh32 } from "../../../styles";
import { InvestorProfile } from "../../../templates";

interface InvestorProfilePageProps extends InvestorsStoreProps {
  clientId: string;
  setPage: (index: number) => void;
}

const InvestorProfileComponent: FunctionComponent<InvestorProfilePageProps> = ({ clientId, setPage }: InvestorProfilePageProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const [investorProfile, setInvestorProfile] = useState<IInvestorAccount | undefined>(undefined);

  const handleBack = () => {
    setPage(0);
  };

  const handleFetch = async () => {
    const request: IInvestorAccountDetailsRequest = { clientId: clientId };
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

    return undefined;
  };

  useEffect(() => {
    if (investorProfile === undefined) {
      handleFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={flexChild}>
      <CustomSpacer space={sh32} />
      <InvestorProfile handleBack={handleBack} data={investorProfile} />
    </View>
  );
};

export const InvestorProfilePage = connect(InvestorsMapStateToProps, InvestorsMapDispatchToProps)(InvestorProfileComponent);
