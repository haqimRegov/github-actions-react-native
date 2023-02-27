import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { Language } from "../../constants";
import { px, sh32, sw24 } from "../../styles";
import { SummaryColorCard } from "./SummaryColorCard";

const { DASHBOARD_ACCOUNT_TAB, INVESTOR_PROFILE } = Language.PAGE;
declare interface EPFProfileTabProps {
  data: IDashboardOrderSummary;
}

export const EPFProfileTab: FunctionComponent<EPFProfileTabProps> = ({ data }: EPFProfileTabProps) => {
  const { profile } = data;
  const [principal] = profile;

  const epfDetailsSummary: LabeledTitleProps[] = [
    { label: INVESTOR_PROFILE.LABEL_EPF_NUMBER, title: principal?.epfDetails?.epfMemberNumber || "-" },
    { label: INVESTOR_PROFILE.LABEL_EPF_ACCOUNT, title: principal?.epfDetails?.epfAccountType || "-" },
  ];

  return (
    <View style={px(sw24)}>
      <SummaryColorCard data={epfDetailsSummary} headerTitle={DASHBOARD_ACCOUNT_TAB.TITLE_EPF_DETAILS} spaceToTop={sh32} />
    </View>
  );
};
