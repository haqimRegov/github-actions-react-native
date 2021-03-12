import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";
import { Alert, Text, View } from "react-native";

import { CustomSpacer, Dash, FileViewer, LabeledTitleProps, TextCard } from "../../../../../components";
import { Language, PAYMENT_DATE_FORMAT } from "../../../../../constants";
import { DICTIONARY_RECURRING_CURRENCY } from "../../../../../data/dictionary";
import { IcoMoon } from "../../../../../icons";
import {
  borderBottomGray4,
  centerVertical,
  colorBlue,
  colorRed,
  flexRow,
  fs12BoldBlack2,
  fs12BoldBlue2,
  fs18BoldBlack2,
  fsTransformNone,
  px,
  sh16,
  sh24,
  sh32,
  sh8,
  sw16,
  sw2,
  sw24,
  sw64,
  sw8,
} from "../../../../../styles";

const { DASHBOARD_ORDER_DETAILS } = Language.PAGE;

declare interface OrderDetailsProps {
  data: IDashboardOrderSummary;
  isScheduled: boolean;
}

export const OrderDetails: FunctionComponent<OrderDetailsProps> = ({ data, isScheduled }: OrderDetailsProps) => {
  const [file, setFile] = useState<FileBase64>();
  const { transactionDetails, investmentSummary, paymentSummary, orderNumber, totalInvestment } = data;

  const handleCloseViewer = () => {
    setFile(undefined);
  };

  const totalInvestmentAmount = totalInvestment
    .map(({ amount, currency }, index) => {
      const plus = index === 0 ? "" : " + ";
      return `${plus} ${currency} ${amount}`;
    })
    .join(", ");

  const transactionSummaryDetails: LabeledTitleProps[] = [
    { label: DASHBOARD_ORDER_DETAILS.LABEL_ORDER_NUMBER, title: orderNumber, titleStyle: fsTransformNone },
    {
      label: DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_DATE,
      title: moment(transactionDetails.registrationDate, "x").format(PAYMENT_DATE_FORMAT),
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
      subtitle: transactionDetails.accountNo || "-",
    },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_PROCESSING, title: transactionDetails.kibProcessingBranch },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_TOTAL_INVESTMENT, title: totalInvestmentAmount, titleStyle: fsTransformNone },
  ];

  const handleEdit = () => {
    Alert.alert("payment edit route");
  };

  return (
    <Fragment>
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextCard data={transactionSummaryDetails} spaceBetweenItem={sw64} />
      </View>
      <CustomSpacer space={sh16} />
      <Dash />
      <Fragment>
        <CustomSpacer space={sh32} />
        <View style={px(sw24)}>
          {investmentSummary.map((investment: IOrderSummaryInvestment, index: number) => {
            const amountLabel =
              isScheduled === true ? DASHBOARD_ORDER_DETAILS.LABEL_INITIAL_AMOUNT : DASHBOARD_ORDER_DETAILS.LABEL_INVESTMENT_AMOUNT;
            const fundDetails: LabeledTitleProps[] = [
              { label: DASHBOARD_ORDER_DETAILS.LABEL_FUND_CODE, title: investment.fundCode, titleStyle: fsTransformNone },
              { label: DASHBOARD_ORDER_DETAILS.LABEL_SALES_CHARGE, title: investment.salesCharge },
              { label: amountLabel, title: `${investment.fundCurrency} ${investment.investmentAmount}`, titleStyle: fsTransformNone },
              { label: DASHBOARD_ORDER_DETAILS.LABEL_PRODUCT_TYPE, title: investment.productType, titleStyle: fsTransformNone },
              { label: DASHBOARD_ORDER_DETAILS.LABEL_FUNDING_OPTION, title: investment.accountFund, titleStyle: fsTransformNone },
              { label: DASHBOARD_ORDER_DETAILS.LABEL_TYPE, title: investment.investmentType },
              { label: DASHBOARD_ORDER_DETAILS.LABEL_DISTRIBUTION, title: investment.distributionInstruction || "-" },
              { label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING, title: investment.recurring },
            ];

            if (investment.fundClass !== null && investment.fundClass !== "" && investment.fundClass !== undefined) {
              fundDetails.splice(1, 0, { label: DASHBOARD_ORDER_DETAILS.LABEL_FUND_CLASS, title: investment.fundClass });
            }

            if (investment.feaTagged !== null) {
              fundDetails.splice(-3, 0, { label: DASHBOARD_ORDER_DETAILS.LABEL_FEA, title: investment.feaTagged });
            }

            if (isScheduled === true) {
              fundDetails.splice(
                -1,
                1,
                {
                  label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_AMOUNT,
                  title: `${DICTIONARY_RECURRING_CURRENCY} ${investment.investmentAmount}`,
                  titleStyle: fsTransformNone,
                },
                { label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_SALES_CHARGE, title: investment.salesCharge },
              );
            }

            return (
              <Fragment key={index}>
                <View style={{ ...flexRow, borderLeftColor: colorRed._2, borderLeftWidth: sw2 }}>
                  <CustomSpacer isHorizontal={true} space={sw8} />
                  <IcoMoon color={colorBlue._2} name="order" onPress={handleEdit} size={sw24} />
                  <CustomSpacer isHorizontal={true} space={sw8} />
                  <Text style={{ ...fs18BoldBlack2, lineHeight: sh24 }}>{investment.fundName}</Text>
                </View>
                <Text style={fs12BoldBlack2}>{investment.utmc}</Text>
                <CustomSpacer space={sh24} />
                <TextCard data={fundDetails} spaceBetweenItem={sw64} />
              </Fragment>
            );
          })}
        </View>
      </Fragment>
      {paymentSummary !== undefined && paymentSummary !== null && paymentSummary.length > 0 ? (
        <Fragment>
          <CustomSpacer space={sh16} />
          <Dash />
          <View style={px(sw24)}>
            {paymentSummary.map((payment: IOrderSummaryPayment, index: number) => {
              const label = `${DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT} ${index + 1}`;

              const handleFile = () => {
                setFile(payment.proofOfPayment);
              };

              const paymentDetails: LabeledTitleProps[] = [];

              if (payment.paymentMethod === "EPF") {
                paymentDetails.push(
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_METHOD, title: `${payment.paymentMethod}`, titleStyle: fsTransformNone },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_EPF_ACCOUNT, title: payment.epfAccountNumber! },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_EPF_REFERENCE, title: payment.epfReferenceNo! },
                );
              }

              if (payment.paymentMethod === "Recurring") {
                paymentDetails.push(
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_METHOD, title: `${payment.paymentMethod}`, titleStyle: fsTransformNone },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_TYPE, title: `${payment.recurringType}`, titleStyle: fsTransformNone },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_ACCOUNT_NAME,
                    title: `${payment.bankAccountName}`,
                    titleStyle: fsTransformNone,
                  },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_ACCOUNT_NUMBER, title: `${payment.bankAccountNumber}` },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_BANK, title: `${payment.recurringBank}`, titleStyle: fsTransformNone },
                  { label: DASHBOARD_ORDER_DETAILS.LABEL_FREQUENCY, title: `${payment.frequency}`, titleStyle: fsTransformNone },
                );
              }

              if (payment.paymentMethod === "Online Banking") {
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
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_DATE,
                    title: `${moment(payment.transactionDate, "x").format(PAYMENT_DATE_FORMAT)}`,
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_KIB_ACCOUNT,
                    title: `${payment.kibBankName || "-"}`,
                    titleStyle: fsTransformNone,
                    subtitle: `${payment.kibBankAccountNumber || "-"}`,
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
                    title: `${moment(payment.transactionDate, "x").format(PAYMENT_DATE_FORMAT)}`,
                  },
                  {
                    label: DASHBOARD_ORDER_DETAILS.LABEL_KIB_ACCOUNT,
                    title: `${payment.kibBankName || "-"}`,
                    titleStyle: fsTransformNone,
                    subtitle: `${payment.kibBankAccountNumber || "-"}`,
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
                  <CustomSpacer space={sh32} />
                  <View style={{ ...flexRow, ...centerVertical }}>
                    <IcoMoon color={colorBlue._2} name="file" size={sw24} />
                    <CustomSpacer isHorizontal={true} space={sw16} />
                    <Text style={fs12BoldBlue2}>{label}</Text>
                  </View>
                  <CustomSpacer space={sh16} />
                  <View style={borderBottomGray4} />
                  <CustomSpacer space={sh16} />
                  <TextCard data={paymentDetails} spaceBetweenItem={sw64} />
                </Fragment>
              );
            })}
          </View>
        </Fragment>
      ) : null}
      <CustomSpacer space={sh8} />
      {file !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="url" value={file} visible={file !== undefined} />
      ) : null}
    </Fragment>
  );
};
