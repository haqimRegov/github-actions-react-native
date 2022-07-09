import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, CustomTooltip, SelectionBanner } from "../../../components";
import { Language } from "../../../constants";
import { IcoMoon } from "../../../icons";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import {
  centerVertical,
  colorBlue,
  colorGray,
  colorWhite,
  flexRow,
  flexWrap,
  fs12BoldGray6,
  fs12RegWhite1,
  fs14RegGray5,
  fs16BoldGray6,
  fs16RegGray6,
  fs18BoldBlack2,
  fs18BoldGray6,
  fs20BoldBlack2,
  px,
  py,
  sh1,
  sh100,
  sh128,
  sh16,
  sh18,
  sh24,
  sh40,
  sh8,
  sh88,
  shadow50Black115,
  sw16,
  sw18,
  sw24,
  sw317,
  sw4,
  sw588,
} from "../../../styles";
import { OrderOverviewNew } from "../../../templates";
import { formatAmount, isNotEmpty } from "../../../utils";

const { ORDER_SUMMARY } = Language.PAGE;

declare interface IOrderPreviewProps extends NewSalesContentProps, AcknowledgementStoreProps {
  handleNextStep: (step: TypeNewSalesRoute) => void;
  setPage: (page: IAcknowledgementPage) => void;
}

export const OrderSummaryComponent: FunctionComponent<IOrderPreviewProps> = ({
  handleNextStep,
  orders,
  onboarding,
  updateOnboarding,
}: IOrderPreviewProps) => {
  const handleConfirm = () => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findTermsAndConditions = updatedDisabledSteps.indexOf("TermsAndConditions");
    if (findTermsAndConditions !== -1) {
      updatedDisabledSteps.splice(findTermsAndConditions, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep("TermsAndConditions");
  };

  const handleCancel = () => {
    handleNextStep("Summary");
  };

  const popupContent = (
    <View>
      <Text style={fs12RegWhite1}>{ORDER_SUMMARY.INFO_NEW}</Text>
    </View>
  );
  const orderSummaryHeader: ViewStyle = { ...flexRow, ...px(sw24), zIndex: 2 };
  const topStatusStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    minHeight: sh88,
    ...px(sw24),
    ...py(sh16),
    backgroundColor: colorWhite._1,
    borderRadius: sh8,
  };

  const verticalLineStyle: ViewStyle = { borderWidth: sh1, borderColor: colorGray._3 };

  const topStatusRecurringStyle: ViewStyle = { marginLeft: "auto", ...flexRow };

  return (
    <Fragment>
      <ContentPage subheading={ORDER_SUMMARY.HEADING_NEW} subheadingStyle={fs18BoldGray6}>
        <View style={orderSummaryHeader}>
          <Text style={fs14RegGray5}>{ORDER_SUMMARY.SUBHEADING_NEW}</Text>
          <CustomSpacer isHorizontal={true} space={sw4} />
          <CustomTooltip
            theme="dark"
            infoStyle={{ width: sw18, height: sh18 }}
            content={popupContent}
            contentStyle={{ width: sw317, height: sh128 }}
          />
        </View>
        <CustomSpacer space={sh24} />
        <View style={{ ...px(sw24) }}>
          <View style={topStatusStyle}>
            <IcoMoon color={colorBlue._1} name="order" size={sh40} />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View>
              <Text style={fs12BoldGray6}>{ORDER_SUMMARY.LABEL_GRAND_TOTAL}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <View style={{ ...flexRow, ...flexWrap, maxWidth: sw588 }}>
                {orders !== undefined &&
                  orders.grandTotal.map((totalAmount: IOrderAmount, index: number) => {
                    return (
                      <View key={index} style={{ ...centerVertical, ...flexRow }}>
                        {index !== 0 ? <Text style={{ ...fs18BoldBlack2, ...px(sw4) }}>+</Text> : null}
                        <Text style={{ ...fs18BoldBlack2 }}>{totalAmount.currency}</Text>
                        <CustomSpacer isHorizontal={true} space={sw4} />
                        <Text style={fs18BoldBlack2}>{formatAmount(totalAmount.amount)}</Text>
                      </View>
                    );
                  })}
              </View>
            </View>
            {orders !== undefined && orders.grandTotalRecurring ? (
              <View style={topStatusRecurringStyle}>
                <View style={verticalLineStyle} />
                <CustomSpacer isHorizontal space={sw24} />
                <View>
                  <Text style={fs12BoldGray6}>{ORDER_SUMMARY.LABEL_RECURRING}</Text>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <View style={{ ...centerVertical, ...flexRow }}>
                    <Text style={fs18BoldBlack2}>{orders.grandTotalRecurring.currency}</Text>
                    <CustomSpacer isHorizontal={true} space={sw4} />
                    <Text style={fs18BoldBlack2}>{formatAmount(orders.grandTotalRecurring.amount)}</Text>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
        <CustomSpacer space={sh24} />

        {orders !== undefined &&
          orders.orders.map((orderSummary, index: number) => {
            return (
              <Fragment key={index}>
                {index !== 0 ? <CustomSpacer space={sh24} /> : null}
                <View style={{ ...px(sw24), ...shadow50Black115 }}>
                  <OrderOverviewNew
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
        buttonStyle={{ height: sh40 }}
        cancelOnPress={handleCancel}
        containerStyle={{ minHeight: sh100, borderTopLeftRadius: sh16, borderTopRightRadius: sh16 }}
        label={ORDER_SUMMARY.LABEL_ORDER_CONFIRMATION}
        bottomContent={
          <View style={flexRow}>
            {isNotEmpty(orders?.orders) ? (
              <Text style={fs16BoldGray6}>
                {orders!.orders[0].investments.length}
                {""} {orders!.orders[0].investments.length > 1 ? ORDER_SUMMARY.LABEL_ORDERS : ORDER_SUMMARY.LABEL_ORDER}
              </Text>
            ) : null}

            <CustomSpacer isHorizontal space={sw4} />
            <Text style={fs16RegGray6}>{ORDER_SUMMARY.LABEL_CREATED}</Text>
          </View>
        }
        labelStyle={fs20BoldBlack2}
        labelCancel={ORDER_SUMMARY.BUTTON_CANCEL}
        labelSubmit={ORDER_SUMMARY.BUTTON_CONFIRM}
        submitOnPress={handleConfirm}
      />
    </Fragment>
  );
};

export const OrderPreview = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(OrderSummaryComponent);
