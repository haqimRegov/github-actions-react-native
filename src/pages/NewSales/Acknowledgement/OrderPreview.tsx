import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, CustomTooltip, SelectionBanner } from "../../../components";
import { Language } from "../../../constants";
import { IcoMoon } from "../../../icons";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import {
  borderLeftGray3,
  centerVertical,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  flexWrap,
  fs12BoldGray6,
  fs12RegWhite1,
  fs14RegGray5,
  fs16BoldGray6,
  fs16RegGray6,
  fs18BoldBlack2,
  fs20BoldBlack2,
  px,
  py,
  rowCenterVertical,
  sh128,
  sh16,
  sh18,
  sh24,
  sh40,
  sh6,
  sh72,
  sh8,
  sw10,
  sw16,
  sw18,
  sw24,
  sw317,
  sw4,
  sw588,
} from "../../../styles";
import { FundOverview } from "../../../templates";
import { formatAmount, isNotEmpty } from "../../../utils";

const { ORDER_SUMMARY } = Language.PAGE;

declare interface IOrderPreviewProps extends NewSalesContentProps, AcknowledgementStoreProps {}

export const OrderSummaryComponent: FunctionComponent<IOrderPreviewProps> = ({
  handleNextStep,
  newSales,
  orders,
  updateNewSales,
}: IOrderPreviewProps) => {
  const handleConfirm = () => {
    const updatedDisabledSteps: TypeNewSalesKey[] = [...newSales.disabledSteps];
    const findTermsAndConditions = updatedDisabledSteps.indexOf("TermsAndConditions");
    if (findTermsAndConditions !== -1) {
      updatedDisabledSteps.splice(findTermsAndConditions, 1);
    }
    updateNewSales({ ...newSales, disabledSteps: updatedDisabledSteps });
    handleNextStep("TermsAndConditions");
  };

  const popupContent = (
    <View>
      <Text style={fs12RegWhite1}>{ORDER_SUMMARY.INFO_NEW}</Text>
    </View>
  );
  const orderSummaryHeader: ViewStyle = { ...rowCenterVertical, ...px(sw24), zIndex: 2 };
  const topStatusStyle: ViewStyle = {
    ...rowCenterVertical,
    ...px(sw24),
    ...py(sh16),
    backgroundColor: colorWhite._1,
    borderRadius: sh8,
    minHeight: sh72,
  };

  const topStatusRecurringStyle: ViewStyle = { marginLeft: "auto", ...flexRow };
  const bannerSubtitle = `${orders!.orders.length} ${orders!.orders.length > 1 ? ORDER_SUMMARY.LABEL_ORDERS : ORDER_SUMMARY.LABEL_ORDER}`;

  return (
    <View style={flexChild}>
      <ContentPage subheading={ORDER_SUMMARY.HEADING_NEW} spaceToBottom={sh72}>
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
        <View style={{ ...px(sw24) }}>
          <View style={topStatusStyle}>
            <IcoMoon color={colorBlue._1} name="order" size={sh40} />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View>
              <Text style={fs12BoldGray6}>{ORDER_SUMMARY.LABEL_GRAND_TOTAL}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <View style={{ ...flexRow, ...flexWrap, maxWidth: sw588 }}>
                {orders !== undefined ? (
                  <Fragment>
                    {orders.grandTotal !== undefined ? (
                      <Fragment>
                        {orders.grandTotal.map((totalAmount: IOrderAmount, index: number) => {
                          return (
                            <View key={index} style={{ ...centerVertical, ...flexRow }}>
                              {index !== 0 ? <Text style={{ ...fs18BoldBlack2, ...px(sw4) }}>+</Text> : null}
                              <Text style={fs18BoldBlack2}>{totalAmount.currency}</Text>
                              <CustomSpacer isHorizontal={true} space={sw4} />
                              <Text style={fs18BoldBlack2}>{formatAmount(totalAmount.amount)}</Text>
                            </View>
                          );
                        })}
                      </Fragment>
                    ) : (
                      <Text style={fs18BoldBlack2}>-</Text>
                    )}
                  </Fragment>
                ) : null}
              </View>
            </View>
            {orders !== undefined && orders.grandTotalRecurring ? (
              <View style={topStatusRecurringStyle}>
                <View style={borderLeftGray3} />
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
                <View style={px(sw24)}>
                  <FundOverview
                    funds={orderSummary.investments}
                    createdOn={orderSummary.orderDate}
                    noBadge={true}
                    orderNumber={orderSummary.orderNumber}
                    totalInvestment={orderSummary.orderTotalAmount}
                    transactionType={newSales.transactionType}
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

export const OrderPreview = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(OrderSummaryComponent);
