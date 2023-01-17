import React, { FunctionComponent } from "react";
import { Dimensions, Text, View } from "react-native";

import { CustomSpacer, Dash } from "../../../components";
import { Language } from "../../../constants";
import {
  border,
  colorGray,
  colorRed,
  colorWhite,
  flexRow,
  fs10RegGray6,
  fs12BoldBlack2,
  fsTransformNone,
  fsUppercase,
  px,
  sh1,
  sh24,
  sh6,
  sh8,
  shadow12Blue110,
  sw1,
  sw16,
  sw24,
} from "../../../styles";
import { SummaryColorCard } from "../../../templates";

const { SUMMARY } = Language.PAGE;

interface SummaryJointDetailsProps {
  handleNextStep: (route: TypeOnboardingKey) => void;
  jointDetails: LabeledTitleProps[];
  jointName: string;
  principalName: string;
  summary?: IHolderInfoState;
}

export const SummaryJointDetails: FunctionComponent<SummaryJointDetailsProps> = ({
  handleNextStep,
  principalName,
  jointName,
  jointDetails,
  summary,
}: SummaryJointDetailsProps) => {
  const handleEditOtherDetails = () => {
    handleNextStep("PersonalDetails");
  };

  const { bankSummary } = summary;

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
      { label: SUMMARY.LABEL_BANK_LOCATION, title: bank.bankLocation },
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

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, marginBottom: sh6 }}>
        <Text style={fs10RegGray6}>{SUMMARY.TITLE_JOINT_ACCOUNT}</Text>
        <CustomSpacer space={sw16} isHorizontal={true} />
        <Text style={fs12BoldBlack2}>{`${principalName} & ${jointName}`}</Text>
      </View>
      <Dash color={colorRed._2} thickness={sh1} gap={0} />
      <SummaryColorCard
        headerTitle={SUMMARY.TITLE_ACCOUNT}
        data={jointDetails}
        section={[accountDetailsBank, accountDetailsForeignBank]}
        spaceToTop={sh24}
        textCardProps={textCardProps}
        colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditOtherDetails } }}
      />
    </View>
  );
};
