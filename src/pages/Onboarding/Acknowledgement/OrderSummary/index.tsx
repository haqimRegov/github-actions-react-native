import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, CustomTooltip, Dash } from "../../../../components";
import { Language } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import {
  border,
  centerVertical,
  colorBlue,
  colorGray,
  flexRow,
  flexWrap,
  fs12BoldWhite1,
  fs16RegGray6,
  fs16SemiBoldGray6,
  fs24BoldGray6,
  fs24RegGray6,
  px,
  py,
  sh16,
  sh24,
  sh56,
  sh8,
  sh88,
  shadow50Black115,
  sw1,
  sw12,
  sw24,
  sw376,
  sw4,
  sw588,
  sw7,
  sw8,
} from "../../../../styles";
import { FundOverview } from "../../../../templates";
import { formatAmount } from "../../../../utils";

interface OrderSummaryProps extends AcknowledgementStoreProps {
  handleNextStep: (route: TypeOnboardingKey) => void;
}

const { ORDER_SUMMARY } = Language.PAGE;

const OrderSummaryComponent: FunctionComponent<OrderSummaryProps> = ({
  handleNextStep,
  orders,
  onboarding,
  updateOnboarding,
}: OrderSummaryProps) => {
  const handleConfirm = () => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findTermsAndConditions = updatedDisabledSteps.indexOf("TermsAndConditions");
    if (findTermsAndConditions !== -1) {
      updatedDisabledSteps.splice(findTermsAndConditions, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep("TermsAndConditions");
  };

  const popupContent = (
    <View>
      <Text style={fs12BoldWhite1}>{ORDER_SUMMARY.INFO}</Text>
    </View>
  );
  const orderSummaryHeader: ViewStyle = { ...flexRow, ...px(sw24), zIndex: 2 };

  return (
    <ContentPage handleContinue={handleConfirm} subheading={ORDER_SUMMARY.HEADING}>
      <CustomSpacer space={sh8} />
      <View style={orderSummaryHeader}>
        <Text style={fs16SemiBoldGray6}>{ORDER_SUMMARY.SUBHEADING}</Text>
        <CustomSpacer isHorizontal={true} space={sw12} />
        <CustomTooltip arrowSize={{ width: sw12, height: sw7 }} content={popupContent} contentStyle={{ width: sw376 }} />
      </View>
      <CustomSpacer space={sh24} />
      <View style={{ ...px(sw24) }}>
        <View style={{ ...centerVertical, ...flexRow, ...border(colorBlue._4, sw1, sw8), minHeight: sh88, ...px(sw24), ...py(sh16) }}>
          <IcoMoon color={colorBlue._4} name="order-total" size={sh56} />
          <CustomSpacer isHorizontal={true} space={sw8} />
          <View>
            <View style={flexRow}>
              <Text style={fs24RegGray6}>{ORDER_SUMMARY.LABEL_GRAND_TOTAL}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <View style={{ ...flexRow, ...flexWrap, maxWidth: sw588 }}>
                {orders !== undefined &&
                  orders.grandTotal.map((totalAmount: IOrderAmount, index: number) => {
                    return (
                      <View key={index} style={{ ...centerVertical, ...flexRow }}>
                        {index !== 0 ? <Text style={{ ...fs24RegGray6, ...px(sw4) }}>+</Text> : null}
                        <Text style={{ ...fs24BoldGray6 }}>{totalAmount.currency}</Text>
                        <CustomSpacer isHorizontal={true} space={sw4} />
                        <Text style={fs24RegGray6}>{formatAmount(totalAmount.amount)}</Text>
                      </View>
                    );
                  })}
              </View>
            </View>
            {orders !== undefined && orders.grandTotalRecurring ? (
              <View style={flexRow}>
                <Text style={fs16RegGray6}>{ORDER_SUMMARY.LABEL_RECURRING}</Text>
                <CustomSpacer isHorizontal={true} space={sw4} />
                <View style={{ ...centerVertical, ...flexRow }}>
                  <Text style={fs16RegGray6}>{orders.grandTotalRecurring.currency}</Text>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <Text style={fs16RegGray6}>{formatAmount(orders.grandTotalRecurring.amount)}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <CustomSpacer space={sh24} />
      <Dash color={colorGray._3} />
      <CustomSpacer space={sh24} />
      {orders !== undefined &&
        orders.orders.map((orderSummary: IOrder, index: number) => {
          return (
            <Fragment key={index}>
              {index !== 0 ? <CustomSpacer space={sh24} /> : null}
              <View style={{ ...px(sw24), ...shadow50Black115 }}>
                <FundOverview
                  funds={orderSummary.investments}
                  createdOn={orderSummary.orderDate}
                  noBadge={true}
                  orderNumber={orderSummary.orderNumber}
                  totalInvestment={orderSummary.orderTotalAmount}
                  paymentType={orderSummary.paymentType}
                />
              </View>
            </Fragment>
          );
        })}
    </ContentPage>
  );
};

export const OrderSummary = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(OrderSummaryComponent);
