import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, CustomTooltip, SelectionBanner } from "../../../../components";
import { Language } from "../../../../constants";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import {
  flexChild,
  flexRow,
  fs12BoldWhite1,
  fs14RegGray5,
  fs16BoldGray6,
  fs16RegGray6,
  fs20BoldBlack2,
  px,
  rowCenterVertical,
  sh128,
  sh18,
  sh24,
  sh4,
  sh6,
  sh72,
  sw10,
  sw18,
  sw24,
  sw317,
  sw4,
} from "../../../../styles";
import { FundOverview, GrandTotal } from "../../../../templates";
import { isNotEmpty } from "../../../../utils";

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
  const orderSummaryHeader: ViewStyle = { ...rowCenterVertical, ...px(sw24), zIndex: 2 };

  const bannerSubtitle = `${orders!.orders.length} ${orders!.orders.length > 1 ? ORDER_SUMMARY.LABEL_ORDERS : ORDER_SUMMARY.LABEL_ORDER}`;

  return (
    <View style={flexChild}>
      <ContentPage subheading={ORDER_SUMMARY.HEADING_NEW} spaceToBottom={sh72}>
        <CustomSpacer space={sh4} />
        <View style={orderSummaryHeader}>
          <Text style={fs14RegGray5}>{ORDER_SUMMARY.SUBHEADING_NEW}</Text>
          <CustomSpacer isHorizontal={true} space={sw4} />
          <CustomTooltip
            arrowSize={{ width: sw10, height: sh6 }}
            content={popupContent}
            contentStyle={{ width: sw317, height: sh128 }}
            infoStyle={{ width: sw18, height: sh18 }}
            theme="dark"
          />
        </View>
        <CustomSpacer space={sh24} />
        <GrandTotal grandTotal={orders?.grandTotal!} grandTotalRecurring={orders?.grandTotalRecurring} />
        <CustomSpacer space={sh24} />
        {orders !== undefined &&
          orders.orders.map((orderSummary, index: number) => {
            return (
              <Fragment key={index}>
                {index !== 0 ? <CustomSpacer space={sh24} /> : null}
                <View style={px(sw24)}>
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
      <SelectionBanner
        label={ORDER_SUMMARY.LABEL_ORDER_CONFIRMATION}
        bottomContent={
          <View style={flexRow}>
            {isNotEmpty(orders?.orders) ? <Text style={fs16BoldGray6}>{bannerSubtitle}</Text> : null}
            <CustomSpacer isHorizontal space={sw4} />
            <Text style={fs16RegGray6}>{ORDER_SUMMARY.LABEL_CREATED}</Text>
          </View>
        }
        labelStyle={fs20BoldBlack2}
        labelCancel={ORDER_SUMMARY.BUTTON_CANCEL}
        labelSubmit={ORDER_SUMMARY.BUTTON_CONTINUE}
        submitOnPress={handleConfirm}
      />
    </View>
  );
};

export const OrderSummary = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(OrderSummaryComponent);
