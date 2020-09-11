import React, { Fragment, useEffect, useState } from "react";
import { Alert, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomPopup, CustomSpacer } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { IcoMoon } from "../../icons";
import { SAMPLE_ORDER_SUMMARY } from "../../mocks";
import { OrderSummaryMapDispatchToProps, OrderSummaryMapStateToProps, OrderSummaryStoreProps } from "../../store/Acknowledgement";
import { borderBottomBlack21, flexRow, fs16SemiBoldBlack2, px, sh24, sh8, shadow5, sw12, sw24 } from "../../styles";
import { OrderDetails } from "./Order/OrderDetails";

interface OrderSummaryProps extends OrderSummaryStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

const { ORDER_SUMMARY } = Language.PAGE;

const OrderSummaryContent = ({ handleNextStep, addOrders }: OrderSummaryProps) => {
  const [data, setData] = useState<IOrderSummary[]>([]);

  const handleConfirm = () => {
    addOrders(data);
    handleNextStep(ONBOARDING_ROUTES.TermsAndConditions);
  };

  useEffect(() => {
    setData(SAMPLE_ORDER_SUMMARY);
  }, []);

  const handleBack = () => {
    Alert.alert("reset");
  };

  const orderSummaryHeader: ViewStyle = { ...flexRow, ...px(sw24), zIndex: 2 };

  return (
    <ContentPage
      handleCancel={handleBack}
      handleContinue={handleConfirm}
      labelContinue={ORDER_SUMMARY.BUTTON_CONFIRM}
      subheading={ORDER_SUMMARY.LABEL_ACKNOWLEDGEMENT}>
      <CustomSpacer space={sh8} />
      <View style={orderSummaryHeader}>
        <Text style={fs16SemiBoldBlack2}>{ORDER_SUMMARY.LABEL_ORDER_SUMMARY}</Text>
        <CustomSpacer isHorizontal={true} space={sw12} />
        <CustomPopup direction="right" popupText={ORDER_SUMMARY.POPUP_ORDER_SUMMARY}>
          <IcoMoon name="info" size={sw24} />
        </CustomPopup>
      </View>
      <CustomSpacer space={sh24} />
      {data.map((orderSummary: IOrderSummary, index: number) => {
        return (
          <Fragment key={index}>
            {index !== 0 ? (
              <Fragment>
                <CustomSpacer space={sh24} />
                <View style={borderBottomBlack21} />
                <CustomSpacer space={sh24} />
              </Fragment>
            ) : null}
            <View style={{ ...px(sw24), ...shadow5 }} key={index}>
              <OrderDetails orderSummary={orderSummary} />
            </View>
          </Fragment>
        );
      })}
    </ContentPage>
  );
};

export const OrderSummary = connect(OrderSummaryMapStateToProps, OrderSummaryMapDispatchToProps)(OrderSummaryContent);
