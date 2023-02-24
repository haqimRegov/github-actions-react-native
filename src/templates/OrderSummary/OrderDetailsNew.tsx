import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { ColorCard, CustomSpacer, IconText, TableBadge, TextCard } from "../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../constants";
import { getDocumentFile, getProductType } from "../../helpers";
import { IcoMoon } from "../../icons";
import {
  border,
  borderBottomBlue2,
  borderBottomBlue3,
  borderBottomBlue4,
  borderBottomBlue5,
  centerHV,
  centerVertical,
  colorBlue,
  flexChild,
  flexRow,
  fs10RegBlue9,
  fs12BoldGray5,
  fs12RegGray5,
  fs14BoldBlue1,
  fs14BoldGray5,
  fs14RegGray6,
  fs16BoldBlack2,
  fs16BoldBlue1,
  fsTransformNone,
  px,
  rowCenterVertical,
  sh12,
  sh16,
  sh17,
  sh24,
  sh32,
  sh8,
  sw05,
  sw12,
  sw16,
  sw170,
  sw20,
  sw24,
  sw32,
  sw328,
  sw360,
  sw4,
  sw64,
  sw8,
} from "../../styles";
import { getStructuredInvestorProfile, isNotEmpty, titleCaseString } from "../../utils";
import { SummaryColorCard, summaryColorCardStyleProps } from "../Dashboard";

const { DASHBOARD_ORDER_DETAILS } = Language.PAGE;

declare interface OrderDetailsProps {
  data: IDashboardOrderSummary;
  handleViewAccountDetails: (account: ICurrentAccount) => void;
  isScheduled: boolean;
  setFile: (value?: FileBase64) => void;
  transactionType?: string;
}

export const OrderDetailsNew: FunctionComponent<OrderDetailsProps> = ({
  data,
  handleViewAccountDetails,
  isScheduled,
  setFile,
  transactionType,
}: OrderDetailsProps) => {
  const { documentSummary, transactionDetails, investmentSummary, paymentSummary, orderNumber, totalInvestment, profile, riskInfo } = data;
  const investor = profile[0];
  const jointInvestor = profile.length > 1 ? profile[1] : undefined;
  const { declaration } = investor;

  const profileToStructure: IInvestorAccount = {
    accountDetails: null,
    addressInformation: investor.addressInformation,
    bankInformation: null,
    contactDetails: investor.contactDetails,
    declaration: investor.declaration,
    documentSummary: null,
    employmentInformation: investor.employmentInformation,
    epfDetails: investor.epfDetails,
    orderHistory: null,
    personalDetails: investor.personalDetails,
    investorOverview: [
      {
        clientId: investor.clientId!,
        name: investor.name,
        idNumber: investor.idNumber,
        idType: investor.idType,
        riskProfile: investor.personalDetails.riskProfile,
      },
    ],
  };

  const { contactDetails, declarations } = getStructuredInvestorProfile(profileToStructure);

  const { crs, crsTin, fatca } = declarations;

  const totalInvestmentAmount =
    totalInvestment !== null
      ? totalInvestment
          .map(({ amount, currency }, index) => {
            const plus = index === 0 ? "" : " + ";
            return `${plus}${currency} ${amount}`;
          })
          .join("")
      : "";

  const epfAccount: LabeledTitleProps[] = [];
  if (paymentSummary !== null && paymentSummary !== undefined && paymentSummary.length > 0 && paymentSummary[0].paymentMethod === "EPF") {
    epfAccount.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_EPF_ACCOUNT, title: paymentSummary[0].epfAccountNumber! });
  }

  const orderDetails: LabeledTitleProps[] = [
    { label: DASHBOARD_ORDER_DETAILS.LABEL_ORDER_NUMBER, title: orderNumber, titleStyle: fsTransformNone },
    {
      label: DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_DATE,
      title: moment(transactionDetails.registrationDate, "x").format(DEFAULT_DATE_FORMAT),
    },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_TYPE, title: transactionType, titleStyle: fsTransformNone },
    {
      label: DASHBOARD_ORDER_DETAILS.LABEL_SERVICING,
      title: transactionDetails.servicingAdviserName,
      titleStyle: fsTransformNone,
      subtitle: transactionDetails.servicingAdviserCode,
    },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_PROCESSING, title: transactionDetails.kibProcessingBranch, titleStyle: fsTransformNone },
  ];

  if (transactionType === "Sales-AO" || transactionType === "Sales") {
    orderDetails.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_CONSENT, title: "Yes", titleStyle: fsTransformNone });
  }

  const riskAssessmentDetails: LabeledTitleProps[] = isNotEmpty(riskInfo)
    ? [
        {
          label: DASHBOARD_ORDER_DETAILS.LABEL_RISK_APPETITE,
          title: riskInfo!.appetite || "-",
          titleStyle: fsTransformNone,
        },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_EXPECTED_RANGE, title: riskInfo!.expectedRange || "-", titleStyle: fsTransformNone },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_RISK_TYPE, title: riskInfo!.type || "-", titleStyle: fsTransformNone },
        {
          label: DASHBOARD_ORDER_DETAILS.LABEL_RISK_PROFILE,
          title: riskInfo!.profile || "-",
          titleStyle: fsTransformNone,
        },
      ]
    : [];

  const crsSection: ISummaryColorCardSection = {
    iconName: "tax-card",
    text: DASHBOARD_ORDER_DETAILS.LABEL_TAXPAYER,
    textWithCount: true,
    data: crsTin,
  };

  const moreOrderDetails: LabeledTitleProps[] = [
    { label: DASHBOARD_ORDER_DETAILS.LABEL_ACCOUNT_TYPE, title: transactionDetails.accountType, titleStyle: fsTransformNone },
  ];

  let totalAmountLabel = DASHBOARD_ORDER_DETAILS.LABEL_TOTAL_INVESTMENT;

  if (transactionType === "Sales") {
    totalAmountLabel = DASHBOARD_ORDER_DETAILS.LABEL_TOTAL_SALES;
  }

  if (isScheduled) {
    totalAmountLabel = DASHBOARD_ORDER_DETAILS.LABEL_TOTAL_RECURRING;
  }

  const totalInvestmentDetails: LabeledTitleProps[] = [
    { label: totalAmountLabel, title: totalInvestmentAmount, titleStyle: fsTransformNone },
  ];

  const accountNumberDetail: LabeledTitleProps[] = [{ label: DASHBOARD_ORDER_DETAILS.LABEL_ACCOUNT_NUMBER, title: "-" }];

  const tagStyle: ViewStyle = {
    ...px(sw4),
    ...border(colorBlue._9, sw05, sw4),
    ...centerHV,
    height: sh17,
  };

  return (
    <Fragment>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        {(isNotEmpty(investor.isEtb) || isNotEmpty(jointInvestor?.isEtb)) && (investor.isEtb === true || jointInvestor?.isEtb) ? (
          <Fragment>
            <ColorCard
              {...summaryColorCardStyleProps}
              content={
                <Fragment>
                  {profile.map((details, profileIndex: number) => {
                    const id = getDocumentFile(documentSummary, "id", profileIndex === 0 ? "Principal" : "Joint");

                    const handleViewId = () => {
                      if (id !== undefined) {
                        setFile(id);
                      }
                    };

                    const investorOverview: LabeledTitleProps[] = [
                      { label: DASHBOARD_ORDER_DETAILS.LABEL_INVESTOR_NAME, title: details.name, titleStyle: fsTransformNone },
                      {
                        label: `${DASHBOARD_ORDER_DETAILS.LABEL_INVESTOR} ${details.idType}`,
                        onPress: handleViewId,
                        title: details.idNumber,
                        titleStyle: fsTransformNone,
                        titleIcon: id !== undefined ? "profile-card" : undefined,
                      },
                    ];

                    if (isNotEmpty(details.personalDetails.riskProfile)) {
                      investorOverview.push({
                        label: DASHBOARD_ORDER_DETAILS.LABEL_RISK_PROFILE,
                        title: details.personalDetails.riskProfile,
                        titleStyle: fsTransformNone,
                      });
                    }

                    const pillPrincipal =
                      investor.isEtb === false ? (
                        <Fragment>
                          <CustomSpacer isHorizontal={true} space={sw12} />
                          <TableBadge
                            text={DASHBOARD_ORDER_DETAILS.LABEL_NEW_INVESTOR}
                            color="primary"
                            textStyle={{ ...fs10RegBlue9, lineHeight: sh12 }}
                          />
                          <CustomSpacer isHorizontal={true} space={sw20} />
                        </Fragment>
                      ) : (
                        <CustomSpacer isHorizontal={true} space={sw16} />
                      );
                    const pillJoint =
                      jointInvestor !== undefined && jointInvestor.isEtb === false ? (
                        <Fragment>
                          <CustomSpacer isHorizontal={true} space={sw12} />
                          <TableBadge
                            text={DASHBOARD_ORDER_DETAILS.LABEL_NEW_INVESTOR}
                            color="primary"
                            textStyle={{ ...fs10RegBlue9, lineHeight: sh12 }}
                          />
                          <CustomSpacer isHorizontal={true} space={sw20} />
                        </Fragment>
                      ) : (
                        <CustomSpacer isHorizontal={true} space={sw16} />
                      );

                    return (
                      <Fragment key={profileIndex}>
                        {transactionDetails.accountType === "Joint" ? (
                          <Fragment>
                            <View style={flexChild}>
                              <View style={rowCenterVertical}>
                                <IcoMoon name={profileIndex !== 0 ? "account-joint" : "account"} size={sh24} color={colorBlue._1} />
                                <CustomSpacer isHorizontal={true} space={sw8} />
                                <Text style={fs16BoldBlack2}>
                                  {profileIndex === 0 ? DASHBOARD_ORDER_DETAILS.SECTION_PRINCIPAL : DASHBOARD_ORDER_DETAILS.SECTION_JOINT}
                                </Text>
                                {profileIndex !== 0 ? pillJoint : pillPrincipal}
                                <View style={{ ...borderBottomBlue4, ...flexChild }} />
                              </View>
                            </View>
                            <CustomSpacer space={sh8} />
                          </Fragment>
                        ) : null}
                        <TextCard data={investorOverview} itemStyle={{ width: sw328 }} />
                        {transactionDetails.accountType === "Joint" ? <CustomSpacer space={sh16} /> : null}
                      </Fragment>
                    );
                  })}
                </Fragment>
              }
              header={{ ...summaryColorCardStyleProps.header, label: DASHBOARD_ORDER_DETAILS.TITLE_INVESTOR_OVERVIEW }}
            />
            <CustomSpacer space={sh32} />
          </Fragment>
        ) : null}

        <ColorCard
          {...summaryColorCardStyleProps}
          content={
            <View>
              <TextCard data={orderDetails} itemStyle={{ width: sw328 }} />
              <View style={borderBottomBlue2} />
              <CustomSpacer space={sh16} />
              <View style={flexRow}>
                <View>
                  {transactionDetails.accountNumber[0] !== null ? (
                    <Fragment>
                      <View style={flexRow}>
                        <View>
                          <Text style={fs12BoldGray5}>{DASHBOARD_ORDER_DETAILS.LABEL_ACCOUNT_NUMBER}</Text>
                          {typeof transactionDetails.accountNumber === "string" ? null : (
                            <Fragment>
                              {transactionDetails.accountNumber.map((acctNo: string, index: number) => {
                                const handleViewDetails = () => {
                                  handleViewAccountDetails({ accountNumber: acctNo, clientId: investor.clientId! });
                                };
                                return (
                                  <View key={index}>
                                    <View style={rowCenterVertical}>
                                      <Text style={fs16BoldBlack2}>{acctNo}</Text>
                                      <CustomSpacer isHorizontal={true} space={sw8} />
                                      <IconText
                                        color={colorBlue._8}
                                        iconPosition="right"
                                        name="arrow-right"
                                        onPress={handleViewDetails}
                                        spaceBetween={sw4}
                                        text={DASHBOARD_ORDER_DETAILS.LINK_VIEW_DETAILS}
                                      />
                                      <CustomSpacer isHorizontal={true} space={sw170} />
                                    </View>
                                  </View>
                                );
                              })}
                            </Fragment>
                          )}
                          <CustomSpacer space={sh16} />
                        </View>
                      </View>
                    </Fragment>
                  ) : (
                    <TextCard data={accountNumberDetail} itemStyle={{ width: sw360 }} />
                  )}
                </View>
                <View>
                  {transactionType !== "CR" ? (
                    <Fragment>
                      <TextCard data={moreOrderDetails} itemStyle={{ width: sw328 }} />
                    </Fragment>
                  ) : null}
                </View>
              </View>
              {transactionType !== "CR" ? (
                <Fragment>
                  <TextCard data={totalInvestmentDetails} itemStyle={{ width: sw328 }} />
                </Fragment>
              ) : null}
            </View>
          }
          header={{ ...summaryColorCardStyleProps.header, label: DASHBOARD_ORDER_DETAILS.TITLE_ORDER_DETAILS }}
        />
        {investmentSummary !== null && investmentSummary !== undefined ? (
          <Fragment>
            <CustomSpacer space={sh32} />
            <ColorCard
              {...summaryColorCardStyleProps}
              content={
                <Fragment>
                  {investmentSummary.map((investment: IOrderSummaryInvestment, index: number) => {
                    const { isTopup } = investment;
                    const fundDetails: LabeledTitleProps[] = [
                      { label: DASHBOARD_ORDER_DETAILS.LABEL_FUND_CODE, title: investment.fundCode, titleStyle: fsTransformNone },

                      {
                        label: DASHBOARD_ORDER_DETAILS.LABEL_PRODUCT_TYPE,
                        title: getProductType(investment.fundType),
                        titleStyle: fsTransformNone,
                      },

                      { label: DASHBOARD_ORDER_DETAILS.LABEL_TYPE, title: investment.investmentType },
                      {
                        label: DASHBOARD_ORDER_DETAILS.LABEL_FUND_CLASS,
                        title: investment.fundClass || "-",
                        titleStyle: fsTransformNone,
                      },
                      {
                        label: DASHBOARD_ORDER_DETAILS.LABEL_FUND_CURRENCY,
                        title: investment.fundCurrency,
                        titleStyle: fsTransformNone,
                      },
                    ];

                    if (investment.fundType === "AMP") {
                      fundDetails.push({
                        label: DASHBOARD_ORDER_DETAILS.LABEL_LANDING_FUND,
                        title: investment.landingFund || "-",
                        titleStyle: fsTransformNone,
                      });
                    }

                    // if (investment.isFea !== null) {
                    //   fundDetails.splice(-3, 0, { label: DASHBOARD_ORDER_DETAILS.LABEL_FEA, title: investment.isFea });
                    // }

                    const investmentDetails: LabeledTitleProps[] = [
                      {
                        label: DASHBOARD_ORDER_DETAILS.LABEL_FUNDING_OPTION,
                        title: investment.fundingOption,
                        titleStyle: fsTransformNone,
                      },
                      {
                        label: DASHBOARD_ORDER_DETAILS.LABEL_SALES_CHARGE,
                        title: isScheduled ? investment.scheduledSalesCharge : investment.salesCharge,
                        titleStyle: fsTransformNone,
                      },
                      {
                        label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_TERM,
                        title:
                          isScheduled === true ? DASHBOARD_ORDER_DETAILS.LABEL_TERM_RECURRING : DASHBOARD_ORDER_DETAILS.LABEL_TERM_ONE_TIME,
                        titleStyle: fsTransformNone,
                      },
                    ];

                    if (isTopup !== true) {
                      investmentDetails.push({
                        label: DASHBOARD_ORDER_DETAILS.LABEL_DISTRIBUTION,
                        title: investment.distributionInstruction || "-",
                        titleStyle: fsTransformNone,
                      });
                    }

                    // if (isScheduled === true) {
                    //   investmentDetails.splice(
                    //     1,
                    //     0,
                    //     {
                    //       label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_AMOUNT,
                    //       title: `${DICTIONARY_RECURRING_CURRENCY} ${investment.scheduledInvestmentAmount}`,
                    //       titleStyle: fsTransformNone,
                    //     },
                    //     { label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_SALES_CHARGE, title: investment.scheduledSalesCharge },
                    //   );
                    // }

                    const amountLabel = `${investment.fundCurrency} ${
                      isScheduled ? investment.scheduledInvestmentAmount : investment.investmentAmount
                    }`;

                    return (
                      <Fragment key={index}>
                        {index === 0 ? null : <CustomSpacer space={sh16} />}
                        <View style={flexRow}>
                          <IcoMoon color={colorBlue._1} name="fund" size={sw24} />
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <View style={{ ...rowCenterVertical, ...flexChild }}>
                            <View>
                              <View style={rowCenterVertical}>
                                <Text style={fs16BoldBlue1}>{investment.fundName}</Text>
                                {isNotEmpty(isTopup) && isTopup === false ? (
                                  <Fragment>
                                    <CustomSpacer isHorizontal={true} space={sw8} />
                                    <View style={tagStyle}>
                                      <Text style={fs10RegBlue9}>{DASHBOARD_ORDER_DETAILS.LABEL_NEW_FUND}</Text>
                                    </View>
                                  </Fragment>
                                ) : null}
                              </View>
                            </View>
                            <CustomSpacer isHorizontal={true} space={sw16} />
                            <View style={{ ...borderBottomBlue5, ...flexChild }} />
                            <CustomSpacer isHorizontal space={sh16} />
                            <Text style={fs14BoldBlue1}>{amountLabel}</Text>
                          </View>
                        </View>
                        <View style={flexRow}>
                          <CustomSpacer isHorizontal={true} space={sw32} />
                          <Text style={fs12RegGray5}>{investment.fundIssuer}</Text>
                        </View>
                        <CustomSpacer space={sh12} />
                        {/* subheading fund info  */}
                        <View style={flexChild}>
                          <View style={rowCenterVertical}>
                            <IcoMoon color={colorBlue._1} name="fund-facts" size={sh16} />
                            <CustomSpacer isHorizontal={true} space={sw8} />
                            <Text style={fs14BoldGray5}>{DASHBOARD_ORDER_DETAILS.SUBHEADING_FUND_INFORMATION}</Text>
                            <CustomSpacer isHorizontal={true} space={sw16} />
                            <View style={flexChild}>
                              <View style={borderBottomBlue3} />
                            </View>
                          </View>
                        </View>
                        <CustomSpacer space={sh8} />
                        <TextCard data={fundDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />

                        {/* subheading investment info  */}
                        <View style={flexChild}>
                          <View style={rowCenterVertical}>
                            <IcoMoon name="transaction-info" size={sh16} />
                            <CustomSpacer isHorizontal={true} space={sw8} />
                            <Text style={fs14BoldGray5}>{DASHBOARD_ORDER_DETAILS.SUBHEADING_INVESTMENT}</Text>
                            <CustomSpacer isHorizontal={true} space={sw16} />
                            <View style={flexChild}>
                              <View style={borderBottomBlue3} />
                            </View>
                          </View>
                        </View>
                        <CustomSpacer space={sh8} />
                        <TextCard data={investmentDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                      </Fragment>
                    );
                  })}
                </Fragment>
              }
              header={{ ...summaryColorCardStyleProps.header, label: DASHBOARD_ORDER_DETAILS.TITLE_INVESTMENT_SUMMARY }}
            />
          </Fragment>
        ) : null}
        {paymentSummary !== undefined && paymentSummary !== null && paymentSummary.length > 0 ? (
          <Fragment>
            <CustomSpacer space={sh32} />
            <ColorCard
              {...summaryColorCardStyleProps}
              content={
                <Fragment>
                  {isNotEmpty(paymentSummary[0].epfAccountNumber) ? <TextCard data={epfAccount} /> : null}
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
                        // {
                        //   label: DASHBOARD_ORDER_DETAILS.LABEL_AMOUNT,
                        //   title: `${payment.fundCurrency} ${payment.investmentAmount}`,
                        //   titleStyle: fsTransformNone,
                        // },
                        { label: DASHBOARD_ORDER_DETAILS.LABEL_EPF_REFERENCE, title: payment.epfReferenceNo! },
                      );
                    }

                    if (payment.paymentMethod === "Recurring") {
                      paymentDetails.push(
                        {
                          label: DASHBOARD_ORDER_DETAILS.LABEL_TOTAL_RECURRING,
                          title: `${totalInvestmentAmount}`,
                          titleStyle: fsTransformNone,
                        },
                        {
                          label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_METHOD,
                          title: `${payment.paymentMethod}`,
                          titleStyle: fsTransformNone,
                        },
                        {
                          label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_TYPE,
                          title: `${payment.recurringType}`,
                          titleStyle: fsTransformNone,
                        },
                        {
                          label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_ACCOUNT_NAME,
                          title: `${payment.bankAccountName}`,
                          titleStyle: fsTransformNone,
                          subtitle: payment.isCombined === true ? "Combined" : undefined,
                          subtitleStyle: fs14RegGray6,
                        },
                        { label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_ACCOUNT_NUMBER, title: `${payment.bankAccountNumber}` },
                        {
                          label: DASHBOARD_ORDER_DETAILS.LABEL_RECURRING_BANK,
                          title: `${payment.recurringBank}`,
                          titleStyle: fsTransformNone,
                        },
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
                        {
                          label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_METHOD,
                          title: `${payment.paymentMethod}`,
                          titleStyle: fsTransformNone,
                        },
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
                        // {
                        //   label: DASHBOARD_ORDER_DETAILS.LABEL_AMOUNT,
                        //   title: `${payment.fundCurrency} ${payment.investmentAmount}`,
                        //   titleStyle: fsTransformNone,
                        // },
                        {
                          label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_METHOD,
                          title: `${payment.paymentMethod}`,
                          titleStyle: fsTransformNone,
                        },
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
                        // {
                        //   label: DASHBOARD_ORDER_DETAILS.LABEL_AMOUNT,
                        //   title: `${payment.fundCurrency} ${payment.investmentAmount}`,
                        //   titleStyle: fsTransformNone,
                        // },
                        {
                          label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_METHOD,
                          title: `${payment.paymentMethod}`,
                          titleStyle: fsTransformNone,
                        },
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
                        <View style={{ ...flexRow, ...centerVertical }}>
                          <IcoMoon color={colorBlue._1} name="payment" size={sw24} />
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          {payment.paymentMethod === "EPF" ? (
                            <Fragment>
                              <Text style={fs16BoldBlue1}>{titleCaseString(paymentLabel!)}</Text>
                              <CustomSpacer isHorizontal={true} space={sw16} />
                              <View style={flexChild}>
                                <View style={borderBottomBlue5} />
                              </View>
                              <CustomSpacer isHorizontal={true} space={sw16} />
                              {isNotEmpty(payment.fundCurrency && payment.investmentAmount) ? (
                                <View>
                                  <Text style={fs14BoldBlue1}>{`${payment.fundCurrency} ${payment.investmentAmount}`}</Text>
                                </View>
                              ) : null}
                            </Fragment>
                          ) : (
                            <View style={flexChild}>
                              <View style={rowCenterVertical}>
                                <Text style={fs16BoldBlue1}>{titleCaseString(paymentLabel!)}</Text>
                                <CustomSpacer isHorizontal={true} space={sw16} />
                                <View style={flexChild}>
                                  <View style={borderBottomBlue4} />
                                </View>
                                <CustomSpacer isHorizontal={true} space={sw16} />
                                {isNotEmpty(payment.fundCurrency && payment.investmentAmount) ? (
                                  <View>
                                    <Text style={fs14BoldBlue1}>{`${payment.fundCurrency} ${payment.investmentAmount}`}</Text>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          )}
                        </View>
                        <View style={flexRow}>
                          <CustomSpacer isHorizontal={true} space={sw32} />
                          <Text style={fs12RegGray5}>{surplusLabel}</Text>
                        </View>

                        {isNotEmpty(payment.surplusNote) ? <CustomSpacer space={sh16} /> : null}
                        <View>
                          <TextCard data={paymentDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                        </View>
                        {isNotEmpty(paymentSummary) && paymentSummary.length > 1 ? <CustomSpacer space={sh24} /> : null}
                      </Fragment>
                    );
                  })}
                </Fragment>
              }
              header={{ ...summaryColorCardStyleProps.header, label: DASHBOARD_ORDER_DETAILS.TITLE_PAYMENT_SUMMARY }}
            />
          </Fragment>
        ) : null}
        {transactionType !== "CR" && isNotEmpty(riskInfo) ? (
          <SummaryColorCard data={riskAssessmentDetails} headerTitle={DASHBOARD_ORDER_DETAILS.TITLE_RISK_ASSESSMENT} spaceToTop={sh32} />
        ) : null}

        {transactionType !== "Sales-AO" && transactionType !== "Sales" ? (
          <Fragment>
            <SummaryColorCard data={contactDetails} headerTitle={DASHBOARD_ORDER_DETAILS.TITLE_CONTACT} spaceToTop={sh32} />
            {isNotEmpty(riskInfo) ? (
              <SummaryColorCard
                data={riskAssessmentDetails}
                headerTitle={DASHBOARD_ORDER_DETAILS.TITLE_RISK_ASSESSMENT}
                spaceToTop={sh32}
              />
            ) : null}
            {declaration !== null && declaration.fatca !== null ? (
              <SummaryColorCard data={fatca} headerTitle={DASHBOARD_ORDER_DETAILS.TITLE_FATCA} spaceToTop={sh32} />
            ) : null}
            {declaration !== null && declaration.crs !== null ? (
              <SummaryColorCard data={crs} headerTitle={DASHBOARD_ORDER_DETAILS.TITLE_CRS} spaceToTop={sh32} section={[crsSection]} />
            ) : null}
          </Fragment>
        ) : null}
      </View>
    </Fragment>
  );
};
