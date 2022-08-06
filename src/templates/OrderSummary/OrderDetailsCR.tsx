import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { ColorCard, CustomSpacer, IconText, TextCard } from "../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../constants";
import {
  colorBlue,
  fs12BoldGray5,
  fs16BoldBlack2,
  fsTransformNone,
  px,
  rowCenterVertical,
  sh16,
  sh24,
  sh32,
  sw24,
  sw328,
  sw4,
  sw8,
} from "../../styles";
import { getStructuredInvestorProfile } from "../../utils";
import { SummaryColorCard, summaryColorCardStyleProps } from "../Dashboard";

const { DASHBOARD_ORDER_DETAILS } = Language.PAGE;

declare interface OrderDetailsCRProps {
  data: IDashboardOrderSummary;
  handleViewAccountDetails: (account: ICurrentAccount) => void;
}

export const OrderDetailsCR: FunctionComponent<OrderDetailsCRProps> = ({ data, handleViewAccountDetails }: OrderDetailsCRProps) => {
  const { orderNumber, profile, riskInfo, transactionDetails } = data;
  const investor = profile[0];
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

  const investorOverview: LabeledTitleProps[] = [
    { label: DASHBOARD_ORDER_DETAILS.LABEL_INVESTOR_NAME, title: investor.name, titleStyle: fsTransformNone },
    {
      label: `${DASHBOARD_ORDER_DETAILS.LABEL_INVESTOR} ${investor.idType}`,
      title: investor.idNumber,
      titleStyle: fsTransformNone,
    },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_RISK_PROFILE, title: investor.personalDetails.riskProfile, titleStyle: fsTransformNone },
  ];

  const orderDetails: LabeledTitleProps[] = [
    { label: DASHBOARD_ORDER_DETAILS.LABEL_ORDER_NUMBER, title: orderNumber, titleStyle: fsTransformNone },
    {
      label: DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_DATE,
      title: moment(transactionDetails.registrationDate, "x").format(DEFAULT_DATE_FORMAT),
    },
    {
      label: DASHBOARD_ORDER_DETAILS.LABEL_SERVICING,
      title: transactionDetails.servicingAdviserName,
      subtitle: transactionDetails.servicingAdviserCode,
    },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_PROCESSING, title: transactionDetails.kibProcessingBranch, titleStyle: fsTransformNone },
  ];

  const riskAssessmentDetails: LabeledTitleProps[] = [
    {
      label: DASHBOARD_ORDER_DETAILS.LABEL_RISK_APPETITE,
      title: riskInfo!.appetite,
      titleStyle: fsTransformNone,
    },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_EXPECTED_RANGE, title: riskInfo!.expectedRange, titleStyle: fsTransformNone },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_RISK_TYPE, title: riskInfo!.type, titleStyle: fsTransformNone },
    {
      label: DASHBOARD_ORDER_DETAILS.LABEL_RISK_PROFILE,
      title: riskInfo!.profile,
      titleStyle: fsTransformNone,
    },
  ];

  const crsSection: ISummaryColorCardSection = {
    iconName: "tax-card",
    text: DASHBOARD_ORDER_DETAILS.LABEL_TAXPAYER,
    textWithCount: true,
    data: crsTin,
  };

  return (
    <View style={px(sw24)}>
      <SummaryColorCard data={investorOverview} headerTitle={DASHBOARD_ORDER_DETAILS.TITLE_INVESTOR_OVERVIEW} spaceToTop={sh24} />
      <CustomSpacer space={sh24} />
      <ColorCard
        {...summaryColorCardStyleProps}
        content={
          <View>
            <TextCard data={orderDetails} itemStyle={{ width: sw328 }} />
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
                      </View>
                    </View>
                  );
                })}
              </Fragment>
            )}
            <CustomSpacer space={sh16} />
          </View>
        }
        header={{ ...summaryColorCardStyleProps.header, label: DASHBOARD_ORDER_DETAILS.TITLE_ORDER_DETAILS }}
      />
      <SummaryColorCard data={contactDetails} headerTitle={DASHBOARD_ORDER_DETAILS.TITLE_CONTACT} spaceToTop={sh32} />
      <SummaryColorCard data={riskAssessmentDetails} headerTitle={DASHBOARD_ORDER_DETAILS.TITLE_RISK_ASSESSMENT} spaceToTop={sh32} />
      {declaration !== null && declaration.fatca !== null ? (
        <SummaryColorCard data={fatca} headerTitle={DASHBOARD_ORDER_DETAILS.TITLE_FATCA} spaceToTop={sh32} />
      ) : null}
      {declaration !== null && declaration.crs !== null ? (
        <SummaryColorCard data={crs} headerTitle={DASHBOARD_ORDER_DETAILS.TITLE_CRS} spaceToTop={sh32} section={crsSection} />
      ) : null}
    </View>
  );
};
