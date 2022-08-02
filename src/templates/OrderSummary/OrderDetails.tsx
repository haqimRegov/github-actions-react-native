import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, TextCard, TextSpaceArea } from "../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../constants";
import { DICTIONARY_RECURRING_CURRENCY } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import {
  borderBottomBlue3,
  borderBottomBlue5,
  centerVertical,
  colorBlue,
  flexChild,
  flexRow,
  fs12RegGray5,
  fs14RegGray6,
  fs18BoldBlack2,
  fs18BoldBlue1,
  fsTransformNone,
  px,
  rowCenterVertical,
  sh16,
  sh24,
  sh32,
  sh8,
  sw16,
  sw24,
  sw32,
  sw328,
  sw64,
  sw8,
} from "../../styles";
import { isNotEmpty, titleCaseString } from "../../utils";

const { DASHBOARD_ORDER_DETAILS, DASHBOARD_PROFILE } = Language.PAGE;

declare interface OrderDetailsProps {
  data: IDashboardOrderSummary;
  isScheduled: boolean;
  setFile: (value?: FileBase64) => void;
}

export const OrderDetails: FunctionComponent<OrderDetailsProps> = ({ data, isScheduled, setFile }: OrderDetailsProps) => {
  const { transactionDetails, investmentSummary, paymentSummary, orderNumber, totalInvestment } = data;
  const totalInvestmentAmount =
    totalInvestment !== null
      ? totalInvestment
          .map(({ amount, currency }, index) => {
            const plus = index === 0 ? "" : " + ";
            return `${plus}${currency} ${amount}`;
          })
          .join("")
      : "";

  const transactionSummaryDetails: LabeledTitleProps[] = [
    { label: DASHBOARD_ORDER_DETAILS.LABEL_ORDER_NUMBER, title: orderNumber, titleStyle: fsTransformNone },
    {
      label: DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_DATE,
      title: moment(transactionDetails.registrationDate, "x").format(DEFAULT_DATE_FORMAT),
    },
    {
      label: DASHBOARD_ORDER_DETAILS.LABEL_SERVICING,
      title: transactionDetails.servicingAdviserName,
      subtitle: transactionDetails.servicingAdviserCode !== null ? transactionDetails.servicingAdviserCode : undefined,
      titleStyle: fsTransformNone,
    },
    {
      label: DASHBOARD_ORDER_DETAILS.LABEL_ACCOUNT_TYPE_AND_NUMBER,
      title: transactionDetails.accountType,
      subtitle:
        transactionDetails.accountNumber !== null && transactionDetails.accountNumber.length > 0
          ? transactionDetails.accountNumber[0]
          : "-",
    },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_PROCESSING, title: transactionDetails.kibProcessingBranch, titleStyle: fsTransformNone },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_TOTAL_INVESTMENT, title: totalInvestmentAmount, titleStyle: fsTransformNone },
  ];

  const epfHeader: LabeledTitleProps[] = [];
  if (paymentSummary !== null && paymentSummary !== undefined && paymentSummary.length > 0 && paymentSummary[0].paymentMethod === "EPF") {
    epfHeader.push(
      {
        label: DASHBOARD_ORDER_DETAILS.LABEL_EPF_ACCOUNT,
        title: paymentSummary[0].epfAccountNumber!,
        titleStyle: fsTransformNone,
      },
      {
        label: DASHBOARD_ORDER_DETAILS.LABEL_REMARKS,
        title: paymentSummary[0].remark !== null && paymentSummary[0].remark !== undefined ? paymentSummary[0].remark : "-",
        titleStyle: fsTransformNone,
      },
    );
  }

  return (
    <Fragment>
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldBlue1} text={DASHBOARD_ORDER_DETAILS.TITLE_SALES} />
        <View style={px(sw32)}>
          <TextCard data={transactionSummaryDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
        </View>
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomBlue3} />
      <Fragment>
        <View style={px(sw24)}>
          <TextSpaceArea
            spaceToBottom={sh16}
            spaceToTop={sh32}
            style={fs18BoldBlue1}
            text={DASHBOARD_ORDER_DETAILS.TITLE_INVESTMENT_SUMMARY}
          />
          {investmentSummary !== null && investmentSummary !== undefined ? (
            <Fragment>
              {investmentSummary.map((investment: IOrderSummaryInvestment, index: number) => {
                const amountLabel = DASHBOARD_ORDER_DETAILS.LABEL_INVESTMENT_AMOUNT;
                const fundDetails: LabeledTitleProps[] = [
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_FUND_CODE, title: investment.fundCode, titleStyle: fsTransformNone },
                  { label: amountLabel, title: `${investment.fundCurrency} ${investment.investmentAmount}`, titleStyle: fsTransformNone },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_SALES_CHARGE, title: investment.salesCharge },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_PRODUCT_TYPE, title: investment.fundType, titleStyle: fsTransformNone },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_FUNDING_OPTION, title: investment.fundingOption, titleStyle: fsTransformNone },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_TYPE, title: investment.investmentType },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_DISTRIBUTION, title: investment.distributionInstruction || "-" },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING, title: investment.recurring },
                ];

                if (investment.fundClass !== null && investment.fundClass !== "" && investment.fundClass !== undefined) {
                  fundDetails.splice(1, 0, {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_FUND_CLASS,
                    title: investment.fundClass,
                    titleStyle: fsTransformNone,
                  });
                }

                // if (investment.isFea !== null) {
                //   fundDetails.splice(-3, 0, { label: DASHBOARD_ORDER_DETAILS.LABEL_FEA, title: investment.isFea });
                // }

                if (isScheduled === true) {
                  fundDetails.splice(
                    1,
                    2,
                    {
                      label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_AMOUNT,
                      title: `${DICTIONARY_RECURRING_CURRENCY} ${investment.scheduledInvestmentAmount}`,
                      titleStyle: fsTransformNone,
                    },
                    { label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_SALES_CHARGE, title: investment.scheduledSalesCharge },
                  );
                }

                return (
                  <Fragment key={index}>
                    {index === 0 ? null : <CustomSpacer space={sh16} />}
                    <View style={flexRow}>
                      <IcoMoon color={colorBlue._1} name="fund" size={sw24} />
                      <CustomSpacer isHorizontal={true} space={sw8} />
                      <View style={flexChild}>
                        <View style={rowCenterVertical}>
                          <Text style={fs18BoldBlack2}>{investment.fundName}</Text>
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          <View style={flexChild}>
                            <View style={borderBottomBlue5} />
                          </View>
                        </View>
                        <Text style={fs12RegGray5}>{investment.fundIssuer}</Text>
                      </View>
                    </View>
                    <CustomSpacer space={sh24} />
                    <View style={px(sw32)}>
                      <TextCard data={fundDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                    </View>
                  </Fragment>
                );
              })}
            </Fragment>
          ) : null}
        </View>
      </Fragment>
      {paymentSummary !== undefined && paymentSummary !== null && paymentSummary.length > 0 ? (
        <Fragment>
          <CustomSpacer space={sh16} />
          <View style={borderBottomBlue3} />
          <View style={px(sw24)}>
            <TextSpaceArea spaceToTop={sh32} style={fs18BoldBlue1} text={DASHBOARD_ORDER_DETAILS.TITLE_PAYMENT_SUMMARY} />
            {paymentSummary[0].paymentMethod === "EPF" ? (
              <Fragment>
                <CustomSpacer space={sh16} />
                <Text style={fs18BoldBlack2}>{DASHBOARD_PROFILE.TITLE_EPF_DETAILS}</Text>
                <CustomSpacer space={sh16} />
                <View style={px(sw32)}>
                  <TextCard data={epfHeader} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                </View>
              </Fragment>
            ) : null}
            {paymentSummary.map((payment: IOrderSummaryPayment, index: number) => {
              const surplusLabel = payment.surplusNote !== null ? payment.surplusNote : "";
              const paymentNormalLabel =
                payment.paymentMethod !== "Recurring"
                  ? `${DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT} ${index + 1}`
                  : DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_DETAILS;
              const paymentLabel = payment.paymentMethod === "EPF" ? payment.utmc : paymentNormalLabel;

              const handleFile = () => {
                setFile(payment.proofOfPayment);
              };

              const paymentDetails: LabeledTitleProps[] = [];

              if (payment.paymentMethod === "EPF") {
                paymentDetails.push(
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_AMOUNT,
                    title: `${payment.fundCurrency} ${payment.investmentAmount}`,
                    titleStyle: fsTransformNone,
                  },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_EPF_REFERENCE, title: payment.epfReferenceNo! },
                );
              }

              if (payment.paymentMethod === "Recurring") {
                paymentDetails.push(
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_TOTAL_RECURRING, title: `${totalInvestmentAmount}`, titleStyle: fsTransformNone },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_METHOD, title: `${payment.paymentMethod}`, titleStyle: fsTransformNone },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_TYPE, title: `${payment.recurringType}`, titleStyle: fsTransformNone },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_ACCOUNT_NAME,
                    title: `${payment.bankAccountName}`,
                    titleStyle: fsTransformNone,
                    subtitle: payment.isCombined === true ? "Combined" : undefined,
                    subtitleStyle: fs14RegGray6,
                  },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_ACCOUNT_NUMBER, title: `${payment.bankAccountNumber}` },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_BANK, title: `${payment.recurringBank}`, titleStyle: fsTransformNone },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_FREQUENCY, title: `${payment.frequency}`, titleStyle: fsTransformNone },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_REMARKS,
                    title: payment.remark !== null && payment.remark !== undefined ? payment.remark : "-",
                    titleStyle: fsTransformNone,
                  },
                );
              }

              if (payment.paymentMethod === "Online Banking / TT / ATM") {
                paymentDetails.push(
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_METHOD, title: `${payment.paymentMethod}`, titleStyle: fsTransformNone },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_NAME,
                    title: `${payment.bankName}`,
                    titleStyle: fsTransformNone,
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_REFERENCE_NUMBER,
                    title: `${payment.referenceNumber}`,
                    titleStyle: fsTransformNone,
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_DATE,
                    title: `${moment(payment.transactionDate, "x").format(DEFAULT_DATE_FORMAT)}`,
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_KIB_ACCOUNT,
                    title: `${payment.kibBankName || "-"}`,
                    titleStyle: fsTransformNone,
                    subtitle: `${payment.kibBankAccountNumber || "-"}`,
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_KIB_CURRENCY,
                    title: `${payment.fundCurrency || "-"}`,
                    titleStyle: fsTransformNone,
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_PROOF,
                    title: `${payment.proofOfPayment?.name}`,
                    titleStyle: fsTransformNone,
                    onPress: handleFile,
                    titleIcon: "file",
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_REMARKS,
                    title: payment.remark !== null && payment.remark !== undefined ? payment.remark : "-",
                    titleStyle: fsTransformNone,
                  },
                );
              }

              if (payment.paymentMethod === "Cheque") {
                paymentDetails.push(
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_AMOUNT,
                    title: `${payment.fundCurrency} ${payment.investmentAmount}`,
                    titleStyle: fsTransformNone,
                  },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_METHOD, title: `${payment.paymentMethod}`, titleStyle: fsTransformNone },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_NAME,
                    title: `${payment.bankName}`,
                    titleStyle: fsTransformNone,
                  },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_CHEQUE_NO, title: `${payment.checkNumber}` },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_DATE,
                    title: `${moment(payment.transactionDate, "x").format(DEFAULT_DATE_FORMAT)}`,
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_KIB_ACCOUNT,
                    title: `${payment.kibBankName || "-"}`,
                    titleStyle: fsTransformNone,
                    subtitle: `${payment.kibBankAccountNumber || "-"}`,
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_KIB_CURRENCY,
                    title: `${payment.fundCurrency || "-"}`,
                    titleStyle: fsTransformNone,
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_PROOF,
                    title: `${payment.proofOfPayment?.name}`,
                    titleStyle: fsTransformNone,
                    onPress: handleFile,
                    titleIcon: "file",
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_REMARKS,
                    title: payment.remark !== null && payment.remark !== undefined ? payment.remark : "-",
                    titleStyle: fsTransformNone,
                  },
                );
              }

              if (payment.paymentMethod === "Client Trust Account (CTA)") {
                paymentDetails.push(
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_AMOUNT,
                    title: `${payment.fundCurrency} ${payment.investmentAmount}`,
                    titleStyle: fsTransformNone,
                  },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_METHOD, title: `${payment.paymentMethod}`, titleStyle: fsTransformNone },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_CLIENT_NAME, title: `${payment.clientName}`, titleStyle: fsTransformNone },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_CLIENT_TRUST, title: `${payment.clientTrustAccountNumber}` },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_PROOF,
                    title: `${payment.proofOfPayment?.name}`,
                    titleStyle: fsTransformNone,
                    onPress: handleFile,
                    titleIcon: "file",
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_REMARKS,
                    title: payment.remark !== null && payment.remark !== undefined ? payment.remark : "-",
                    titleStyle: fsTransformNone,
                  },
                );
              }

              return (
                <Fragment key={index}>
                  <CustomSpacer space={sh16} />
                  <View style={{ ...flexRow, ...centerVertical }}>
                    <IcoMoon color={colorBlue._1} name="payment" size={sw24} />
                    <CustomSpacer isHorizontal={true} space={sw8} />
                    {payment.paymentMethod === "EPF" ? (
                      <Fragment>
                        <Text style={fs18BoldBlack2}>{titleCaseString(paymentLabel!)}</Text>
                        <CustomSpacer isHorizontal={true} space={sw16} />
                        <View style={flexChild}>
                          <View style={borderBottomBlue5} />
                        </View>
                      </Fragment>
                    ) : (
                      <View style={flexChild}>
                        <View style={rowCenterVertical}>
                          <Text style={fs18BoldBlack2}>{titleCaseString(paymentLabel!)}</Text>
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          <View style={flexChild}>
                            <View style={borderBottomBlue5} />
                          </View>
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          {isNotEmpty(payment.fundCurrency && payment.investmentAmount) ? (
                            <View>
                              <Text style={fs18BoldBlack2}>{`${payment.fundCurrency} ${payment.investmentAmount}`}</Text>
                            </View>
                          ) : null}
                        </View>
                      </View>
                    )}
                    <CustomSpacer isHorizontal={true} space={sw8} />
                    <Text style={fs12RegGray5}>{surplusLabel}</Text>
                  </View>
                  <CustomSpacer space={sh16} />
                  <View style={px(sw32)}>
                    <TextCard data={paymentDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                  </View>
                </Fragment>
              );
            })}
          </View>
        </Fragment>
      ) : null}
      <CustomSpacer space={sh8} />
    </Fragment>
  );
};
