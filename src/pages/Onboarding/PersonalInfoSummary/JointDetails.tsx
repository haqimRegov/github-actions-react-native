import React, { FunctionComponent } from "react";
import { Dimensions, View } from "react-native";

import { AccountHeader, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { border, colorGray, colorWhite, fsTransformNone, fsUppercase, px, sh24, sh8, shadow12Blue110, sw1, sw24 } from "../../../styles";
import { SummaryColorCard } from "../../../templates";

const { SUMMARY } = Language.PAGE;

interface SummaryJointDetailsProps {
  handleNextStep: (route: TypeOnboardingKey) => void;
  personalInfo?: IPersonalInfoState;
}

export const SummaryJointDetails: FunctionComponent<SummaryJointDetailsProps> = ({
  handleNextStep,
  personalInfo,
}: SummaryJointDetailsProps) => {
  const { incomeDistribution, joint, principal, signatory } = personalInfo!;
  const { bankSummary } = principal!;

  const handleEditOtherDetails = () => {
    handleNextStep("AdditionalDetails");
  };

  const { width } = Dimensions.get("window");
  const textCardProps = { itemsPerGroup: 3, spaceBetweenItem: width < 1080 ? 20 : 22, titleStyle: fsTransformNone, itemStyle: {} };
  const colorCardProps = {
    containerStyle: shadow12Blue110,
    contentStyle: { ...border(colorGray._2, sw1), ...px(sw24), paddingBottom: sh8 },
    headerStyle: { backgroundColor: colorWhite._1, ...shadow12Blue110, ...px(sw24) },
  };

  const localBank: LabeledTitleProps[][] = bankSummary!.localBank!.map((bank: IBankDetailsState) => {
    const bankAccountName =
      bank.combinedBankAccountName !== "" && bank.combinedBankAccountName !== undefined
        ? bank.combinedBankAccountName
        : bank.bankAccountName;

    return [
      { label: SUMMARY.LABEL_CURRENCY, title: bank.currency!.join(", "), titleStyle: fsUppercase },
      { label: SUMMARY.LABEL_BANK_NAME, title: bank.bankName },
      { label: SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: bankAccountName },
      { label: SUMMARY.LABEL_BANK_ACCOUNT_NUMBER, title: bank.bankAccountNumber },
      // { label: SUMMARY.LABEL_BANK_LOCATION, title: bank.bankLocation },
      { label: SUMMARY.LABEL_BANK_SWIFT, title: bank.bankSwiftCode ? bank.bankSwiftCode : "-" },
    ] as LabeledTitleProps[];
  });

  const foreignBank: LabeledTitleProps[][] =
    bankSummary!.foreignBank !== undefined
      ? bankSummary!.foreignBank.map((bank: IBankDetailsState) => {
          const bankAccountName =
            bank.combinedBankAccountName !== "" && bank.combinedBankAccountName !== undefined
              ? bank.combinedBankAccountName
              : bank.bankAccountName;

          return [
            { label: SUMMARY.LABEL_CURRENCY, title: bank.currency!.join(", "), titleStyle: fsUppercase },
            { label: SUMMARY.LABEL_BANK_NAME, title: bank.bankName },
            { label: SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: bankAccountName },
            { label: SUMMARY.LABEL_BANK_ACCOUNT_NUMBER, title: bank.bankAccountNumber },
            { label: SUMMARY.LABEL_BANK_LOCATION, title: bank.bankLocation },
            { label: SUMMARY.LABEL_BANK_SWIFT, title: bank.bankSwiftCode ? bank.bankSwiftCode : "-" },
          ] as LabeledTitleProps[];
        })
      : [];

  const accountDetailsBank = {
    iconName: "bank-new",
    text: SUMMARY.SUBTITLE_LOCAL_BANK,
    data: [...localBank],
  };
  const accountDetailsForeignBank = {
    iconName: "bank-new",
    text: SUMMARY.SUBTITLE_FOREIGN_BANK,
    data: [...foreignBank],
  };

  const relationship =
    principal?.personalDetails?.relationship !== "Others"
      ? principal?.personalDetails?.relationship
      : principal?.personalDetails?.otherRelationship;

  const jointDetails: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_DISTRIBUTION, title: incomeDistribution! },
    { label: SUMMARY.LABEL_SIGNATORY, title: signatory! },
    { label: SUMMARY.LABEL_RELATIONSHIP, title: relationship },
  ];

  const names = `${principal!.personalDetails!.name!} ${SUMMARY.LABEL_AND} ${joint!.personalDetails!.name!}`;
  const subtitleLabel = `${SUMMARY.LABEL_PRINCIPAL} ${SUMMARY.LABEL_AND} ${SUMMARY.LABEL_JOINT}`;

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <AccountHeader title={subtitleLabel} subtitle={names} />
      <SummaryColorCard
        headerTitle={SUMMARY.TITLE_ACCOUNT}
        data={jointDetails}
        section={[accountDetailsBank, accountDetailsForeignBank]}
        textCardProps={textCardProps}
        colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditOtherDetails } }}
      />
    </View>
  );
};
