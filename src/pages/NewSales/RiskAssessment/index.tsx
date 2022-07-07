import React, { Component, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { NewSalesRiskAssessment } from "./RiskAssessment";
import { RiskSummary } from "./Summary";

interface NewSalesProps extends NewSalesContentProps, RiskStoreProps {
  navigation: IStackNavigationProp;
  route: string;
}

export const NewSalesRiskComponent = (props: NewSalesProps) => {
  const [page, setPage] = useState<TRiskPage>("summary");

  let content = <RiskSummary setPage={setPage} {...props} />;
  if (page === "assessment") {
    content = <NewSalesRiskAssessment {...props} setPage={setPage} />;
  }
  return <View style={flexChild}>{content}</View>;
};

export const NewSalesRisk = connect(RiskMapStateToProps, RiskMapDispatchToProps)(NewSalesRiskComponent);
