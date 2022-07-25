import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { ColorCard, CustomSpacer, TextCard } from "../../components";
import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  borderBottomBlue4,
  colorBlue,
  flexChild,
  flexRow,
  fs18BoldBlack2,
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
import { isNotEmpty } from "../../utils";
import { SummaryColorCard, summaryColorCardStyleProps } from "./SummaryColorCard";

interface AccountTabProps {
  data: IDashboardOrderSummary;
  // setFile: (value?: FileBase64) => void;
}

const { DASHBOARD_ACCOUNT_TAB, DASHBOARD_PROFILE } = Language.PAGE;

export const AccountTab: FunctionComponent<AccountTabProps> = ({ data }: AccountTabProps) => {
  const { profile, investmentSummary, riskInfo } = data;
  const principal = profile[0];

  const accountSettings: LabeledTitleProps[] = [];
  // TODO. double check on the if statement
  if (investmentSummary !== null && investmentSummary[0] !== null) {
    accountSettings.push({
      label: DASHBOARD_ACCOUNT_TAB.LABEL_INCOME_DISTRIBUTION,
      title: investmentSummary[0].distributionInstruction,
      titleStyle: fsTransformNone,
    });
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

  return (
    <Fragment>
      <View style={px(sw24)}>
        {isNotEmpty(principal.bankInformation) && isNotEmpty(principal.bankInformation?.localBank) ? (
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
                                <Text style={fs18BoldBlack2}>{label}</Text>
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
                                    <Text style={fs18BoldBlack2}>{label}</Text>
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
          <SummaryColorCard data={accountSettings} headerTitle={DASHBOARD_ACCOUNT_TAB.TITLE_ACCOUNT_SETTINGS} spaceToTop={sh32} />
        ) : null}
      </View>
    </Fragment>
  );
};
