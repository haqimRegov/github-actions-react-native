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
import { generateCorrespondingAddress, isArrayNotEmpty, isNotEmpty } from "../../utils";
import { SummaryColorCard, summaryColorCardStyleProps } from "./SummaryColorCard";

interface AccountTabProps {
  data: IDashboardOrderSummary;
  transactionType?: string | undefined;
  // setFile: (value?: FileBase64) => void;
}

const { DASHBOARD_ACCOUNT_TAB, DASHBOARD_PROFILE } = Language.PAGE;

export const AccountTab: FunctionComponent<AccountTabProps> = ({ data, transactionType }: AccountTabProps) => {
  const { profile, investmentSummary, transactionDetails } = data;
  const [principal, joint] = profile;

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
        label: DASHBOARD_ACCOUNT_TAB.LABEL_AUTHORISED_SIGNATORY,
        title: isNotEmpty(transactionDetails.accountOperationMode) ? handleSignatoryFromBE(transactionDetails.accountOperationMode!) : "-",
        titleStyle: fsTransformNone,
      },
      {
        label: DASHBOARD_ACCOUNT_TAB.LABEL_RELATIONSHIP,
        title: principal?.personalDetails?.relationship || "-",
        titleStyle: fsTransformNone,
      },
    );
  }

  const principalMailingAddress = isNotEmpty(principal?.addressInformation)
    ? generateCorrespondingAddress(principal.addressInformation)
    : [];
  const jointMailingAddress = isNotEmpty(joint?.addressInformation) ? generateCorrespondingAddress(joint.addressInformation) : [];

  const sectionData: ISummaryColorCardSection[] = [];
  if (joint !== undefined && isNotEmpty(principal.isEtb) && principal.isEtb === false) {
    sectionData.push({
      iconName: "account",
      text: DASHBOARD_ACCOUNT_TAB.LABEL_PRINCIPAL_HOLDER,
      subtitle: principal.name,
      data: [principalMailingAddress],
    });
  }
  if (joint !== undefined && isNotEmpty(joint.isEtb) && joint.isEtb === false) {
    sectionData.push({
      iconName: "account-joint",
      text: DASHBOARD_ACCOUNT_TAB.LABEL_JOINT_HOLDER,
      subtitle: joint.name,
      data: [jointMailingAddress],
    });
  }

  const correspondenceAddressSummary: LabeledTitleProps[] = isNotEmpty(joint) ? [] : principalMailingAddress;
  const correspondenceAddressSection = isNotEmpty(joint) ? sectionData : undefined;

  return (
    <Fragment>
      <View style={px(sw24)}>
        {transactionType !== "Sales" &&
        (isArrayNotEmpty(correspondenceAddressSummary) || correspondenceAddressSection !== undefined) &&
        (isNotEmpty(principal.isEtb) || (joint !== undefined && isNotEmpty(joint.isEtb))) &&
        (principal.isEtb === false || (joint !== undefined && joint.isEtb === false)) ? (
          <SummaryColorCard
            data={correspondenceAddressSummary}
            section={correspondenceAddressSection}
            headerTitle={DASHBOARD_ACCOUNT_TAB.CARD_TITLE_CORRESPONDENCE_ADDRESS}
            spaceToTop={sh24}
          />
        ) : null}
        {investmentSummary !== null && isArrayNotEmpty(investmentSummary) && investmentSummary[0] !== null ? (
          <SummaryColorCard data={accountSettings} headerTitle={DASHBOARD_ACCOUNT_TAB.TITLE_ACCOUNT_SETTINGS} spaceToTop={sh32} />
        ) : null}
        {isNotEmpty(principal.bankInformation) &&
        (isNotEmpty(principal.bankInformation?.localBank) || isNotEmpty(principal.bankInformation?.foreignBank)) &&
        (isArrayNotEmpty(principal.bankInformation?.localBank) || isArrayNotEmpty(principal.bankInformation?.foreignBank)) ? (
          <Fragment>
            <CustomSpacer space={sh32} />
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
                            {
                              label: DASHBOARD_ACCOUNT_TAB.LABEL_BANK_SWIFT_CODE,
                              title: bank.bankSwiftCode || "-",
                              titleStyle: fsUppercase,
                            },
                            {
                              label: DASHBOARD_ACCOUNT_TAB.LABEL_LOCATION,
                              title: bank.bankLocation || "-",
                              titleStyle: fsTransformNone,
                            },
                          ];

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
      </View>
    </Fragment>
  );
};
