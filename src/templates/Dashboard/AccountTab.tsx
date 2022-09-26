import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { ColorCard, CustomSpacer, TextCard } from "../../components";
import { Language } from "../../constants";
import { handleSignatoryFromBE } from "../../helpers";
import { IcoMoon } from "../../icons";
import {
  borderBottomBlue4,
  colorBlue,
  flexChild,
  flexRow,
  fs16BoldBlue1,
  fsTransformNone,
  fsUppercase,
  px,
  rowCenterVertical,
  sh16,
  sh24,
  sh32,
  sw16,
  sw24,
  sw328,
  sw64,
  sw8,
} from "../../styles";
import { isArrayNotEmpty, isNotEmpty } from "../../utils";
import { SummaryColorCard, summaryColorCardStyleProps } from "./SummaryColorCard";

interface AccountTabProps {
  data: IDashboardOrderSummary;
  // setFile: (value?: FileBase64) => void;
}

const { DASHBOARD_ACCOUNT_TAB, DASHBOARD_PROFILE } = Language.PAGE;

export const AccountTab: FunctionComponent<AccountTabProps> = ({ data }: AccountTabProps) => {
  const { profile, investmentSummary, riskInfo, transactionDetails } = data;
  const principal = profile[0];
  const { addressInformation } = principal;

  const accountSettings: LabeledTitleProps[] = [];
  // TODO. double check on the if statement
  if (investmentSummary !== null && investmentSummary[0] !== null) {
    accountSettings.push({
      label: DASHBOARD_ACCOUNT_TAB.LABEL_INCOME_DISTRIBUTION,
      title: investmentSummary[0].distributionInstruction,
      titleStyle: fsTransformNone,
    });
  }

  if (transactionDetails.accountType === "Joint") {
    accountSettings.push(
      {
        label: DASHBOARD_ACCOUNT_TAB.LABEL_RELATIONSHIP,
        title: principal?.personalDetails?.relationship || "-",
        titleStyle: fsTransformNone,
      },
      {
        label: DASHBOARD_ACCOUNT_TAB.LABEL_AUTHORISED_SIGNATORY,
        title: isNotEmpty(transactionDetails.accountOperationMode) ? handleSignatoryFromBE(transactionDetails.accountOperationMode!) : "-",
        titleStyle: fsTransformNone,
      },
    );
  }

  const riskDetails: LabeledTitleProps[] = [];
  if (riskInfo !== null) {
    riskDetails.push(
      { label: DASHBOARD_ACCOUNT_TAB.LABEL_RISK_APPETITE, title: riskInfo.appetite, titleStyle: fsTransformNone },
      { label: DASHBOARD_ACCOUNT_TAB.LABEL_EXPECTED_RANGE_OF_RETURN, title: riskInfo.expectedRange, titleStyle: fsTransformNone },
      { label: DASHBOARD_ACCOUNT_TAB.LABEL_TYPE, title: riskInfo.type, titleStyle: fsTransformNone },
      { label: DASHBOARD_ACCOUNT_TAB.LABEL_RISK_PROFILE, title: riskInfo.profile, titleStyle: fsTransformNone },
    );
  }

  const correspondenceAddressSummary: LabeledTitleProps[] = [];
  if (isNotEmpty(addressInformation)) {
    if (isNotEmpty(addressInformation.mailingAddress)) {
      if (isNotEmpty(addressInformation.mailingAddress.address)) {
        const mailingAddressLabel =
          isNotEmpty(addressInformation!.mailingAddress!.address!.line2) ||
          isNotEmpty(addressInformation!.mailingAddress!.address!.line3) ||
          isNotEmpty(addressInformation!.mailingAddress!.address!.line4)
            ? `${DASHBOARD_ACCOUNT_TAB.LABEL_CORRESPONDENCE_ADDRESS} 1`
            : DASHBOARD_ACCOUNT_TAB.LABEL_CORRESPONDENCE_ADDRESS;

        correspondenceAddressSummary.push({
          label: mailingAddressLabel,
          title: addressInformation!.mailingAddress!.address!.line1 || "-",
          titleStyle: fsTransformNone,
        });

        if (isNotEmpty(addressInformation!.mailingAddress!.address!.line2)) {
          correspondenceAddressSummary.push({
            label: `${DASHBOARD_ACCOUNT_TAB.LABEL_CORRESPONDENCE_ADDRESS} 2`,
            title: addressInformation!.mailingAddress!.address!.line2 || "-",
            titleStyle: fsTransformNone,
          });
        }

        if (isNotEmpty(addressInformation!.mailingAddress!.address!.line3)) {
          correspondenceAddressSummary.push({
            label: `${DASHBOARD_ACCOUNT_TAB.LABEL_CORRESPONDENCE_ADDRESS} 3`,
            title: addressInformation!.mailingAddress!.address!.line3! || "-",
            titleStyle: fsTransformNone,
          });
        }

        if (isNotEmpty(addressInformation!.mailingAddress!.address!.line4)) {
          correspondenceAddressSummary.push({
            label: `${DASHBOARD_ACCOUNT_TAB.LABEL_CORRESPONDENCE_ADDRESS} 4`,
            title: addressInformation!.mailingAddress!.address!.line4! || "-",
            titleStyle: fsTransformNone,
          });
        }
      }
      correspondenceAddressSummary.push(
        { label: DASHBOARD_ACCOUNT_TAB.LABEL_POSTCODE, title: addressInformation!.mailingAddress!.postCode! },
        { label: DASHBOARD_ACCOUNT_TAB.LABEL_CITY, title: addressInformation!.mailingAddress!.city! },
        { label: DASHBOARD_ACCOUNT_TAB.LABEL_STATE, title: addressInformation!.mailingAddress!.state! },
        { label: DASHBOARD_ACCOUNT_TAB.LABEL_COUNTRY, title: addressInformation!.mailingAddress!.country! },
      );
    }
  }

  return (
    <Fragment>
      <View style={px(sw24)}>
        {isArrayNotEmpty(correspondenceAddressSummary) ? (
          <SummaryColorCard
            data={correspondenceAddressSummary}
            headerTitle={DASHBOARD_ACCOUNT_TAB.CARD_TITLE_CORRESPONDENCE_ADDRESS}
            spaceToTop={sh24}
          />
        ) : null}
        {isNotEmpty(principal.bankInformation) &&
        (isNotEmpty(principal.bankInformation?.localBank) || isNotEmpty(principal.bankInformation?.foreignBank)) &&
        (isArrayNotEmpty(principal.bankInformation?.localBank) || isArrayNotEmpty(principal.bankInformation?.foreignBank)) ? (
          <Fragment>
            <CustomSpacer space={sh24} />

            <ColorCard
              {...summaryColorCardStyleProps}
              content={
                <Fragment>
                  <View>
                    {principal.bankInformation?.localBank.map((bank, numberIndex) => {
                      const label = `${DASHBOARD_PROFILE.SUBTITLE_LOCAL_BANK}`;

                      const localBankDetails: LabeledTitleProps[] = [
                        { label: DASHBOARD_ACCOUNT_TAB.LABEL_CURRENCY, title: bank.currency.toString(), titleStyle: fsTransformNone },
                        { label: DASHBOARD_ACCOUNT_TAB.LABEL_BANK_NAME, title: bank.bankName, titleStyle: fsTransformNone },
                        {
                          label: DASHBOARD_ACCOUNT_TAB.LABEL_ACCOUNT_HOLDER_NAME,
                          title: bank.bankAccountName,
                          titleStyle: fsTransformNone,
                        },
                        {
                          label: DASHBOARD_ACCOUNT_TAB.LABEL_BANK_ACCOUNT_NUMBER,
                          title: bank.bankAccountNumber,
                          titleStyle: fsTransformNone,
                        },
                        {
                          label: DASHBOARD_ACCOUNT_TAB.LABEL_BANK_SWIFT_CODE,
                          title: bank.bankSwiftCode || "-",
                          titleStyle: fsUppercase,
                        },
                      ];

                      return (
                        <Fragment key={numberIndex}>
                          <View style={flexRow}>
                            <IcoMoon color={colorBlue._1} name="bank-new" size={sw24} />
                            <CustomSpacer isHorizontal={true} space={sw8} />
                            <View style={flexChild}>
                              <View style={rowCenterVertical}>
                                <Text style={fs16BoldBlue1}>{label}</Text>
                                <CustomSpacer isHorizontal={true} space={sw16} />
                                <View style={flexChild}>
                                  <View style={borderBottomBlue4} />
                                </View>
                              </View>
                            </View>
                          </View>
                          <CustomSpacer space={sh16} />
                          <TextCard data={localBankDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                        </Fragment>
                      );
                    })}
                    {principal.bankInformation?.foreignBank !== null ? (
                      <Fragment>
                        {principal.bankInformation?.foreignBank.map((bank, numberIndex) => {
                          const label = `${DASHBOARD_PROFILE.SUBTITLE_FOREIGN_BANK} ${
                            principal.bankInformation?.foreignBank?.length! > 1 ? numberIndex + 1 : ""
                          }`;

                          const foreignBankDetails: LabeledTitleProps[] = [
                            {
                              label: DASHBOARD_ACCOUNT_TAB.LABEL_CURRENCY,
                              title: bank.currency.toString(),
                              titleStyle: fsTransformNone,
                            },
                            { label: DASHBOARD_ACCOUNT_TAB.LABEL_BANK_NAME, title: bank.bankName, titleStyle: fsTransformNone },
                            {
                              label: DASHBOARD_ACCOUNT_TAB.LABEL_ACCOUNT_HOLDER_NAME,
                              title: bank.bankAccountName,
                              titleStyle: fsTransformNone,
                            },
                            {
                              label: DASHBOARD_ACCOUNT_TAB.LABEL_BANK_ACCOUNT_NUMBER,
                              title: bank.bankAccountNumber,
                              titleStyle: fsTransformNone,
                            },
                          ];
                          // bank location
                          if (bank.bankLocation !== null && isNotEmpty(bank.bankLocation)) {
                            foreignBankDetails.push({
                              label: DASHBOARD_ACCOUNT_TAB.LABEL_LOCATION,
                              title: bank.bankLocation,
                              titleStyle: fsTransformNone,
                            });
                          }
                          // swift code
                          if (bank.bankSwiftCode !== null && isNotEmpty(bank.bankSwiftCode) && bank.bankSwiftCode !== "") {
                            foreignBankDetails.push({
                              label: DASHBOARD_ACCOUNT_TAB.LABEL_BANK_SWIFT_CODE,
                              title: bank.bankSwiftCode,
                              titleStyle: fsUppercase,
                            });
                          }
                          return (
                            <Fragment key={numberIndex}>
                              {numberIndex === 0 ? <CustomSpacer space={sh16} /> : null}
                              <View style={flexRow}>
                                <IcoMoon color={colorBlue._1} name="bank-new" size={sw24} />
                                <CustomSpacer isHorizontal={true} space={sw8} />
                                <View style={flexChild}>
                                  <View style={rowCenterVertical}>
                                    <Text style={fs16BoldBlue1}>{label}</Text>
                                    <CustomSpacer isHorizontal={true} space={sw16} />
                                    <View style={flexChild}>
                                      <View style={borderBottomBlue4} />
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <CustomSpacer space={sh16} />
                              <TextCard data={foreignBankDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                            </Fragment>
                          );
                        })}
                      </Fragment>
                    ) : null}
                  </View>
                </Fragment>
              }
              header={{ ...summaryColorCardStyleProps.header, label: DASHBOARD_ACCOUNT_TAB.TITLE_BANKING_DETAILS }}
            />
          </Fragment>
        ) : null}
        {investmentSummary !== null && investmentSummary[0] !== null ? (
          <SummaryColorCard data={accountSettings} headerTitle={DASHBOARD_ACCOUNT_TAB.TITLE_ACCOUNT_DETAILS} spaceToTop={sh32} />
        ) : null}
      </View>
    </Fragment>
  );
};
