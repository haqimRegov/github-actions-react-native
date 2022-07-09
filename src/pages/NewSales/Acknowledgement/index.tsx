import React, { useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { RiskMapDispatchToProps, RiskMapStateToProps } from "../../../store";
import { flexChild } from "../../../styles";
import { OrderPreview } from "./OrderPreview";
import { TermsAndConditions } from "./TermsAndConditions";

interface NewSalesProps extends NewSalesContentProps {
  navigation: IStackNavigationProp;
  route: string;
}

export const NewSalesAcknowledgmentComponent = (props: NewSalesProps) => {
  const [page, setPage] = useState<IAcknowledgementPage>("OrderPreview");
  let content = <OrderPreview {...props} setPage={setPage} />;
  if (page === "TermsAndConditions") {
    content = <TermsAndConditions {...props} />;
  }
  return <View style={flexChild}>{content}</View>;
};

export const NewSalesAcknowledgment = connect(RiskMapStateToProps, RiskMapDispatchToProps)(NewSalesAcknowledgmentComponent);
