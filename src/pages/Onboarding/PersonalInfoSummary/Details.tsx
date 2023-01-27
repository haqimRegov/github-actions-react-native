import React, { FunctionComponent } from "react";
import { Dimensions, Text, View } from "react-native";

import { BaseColorCardProps, BaseTextCardProps, CustomSpacer, Dash, FileViewer } from "../../../components";
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
  px,
  sh1,
  sh24,
  sh26,
  sh4,
  sh8,
  shadow12Blue110,
  sw1,
  sw16,
  sw24,
} from "../../../styles";
import { SummaryColorCard } from "../../../templates";

const { SUMMARY } = Language.PAGE;

interface SummaryDetailsProps {
  accountHolder: TypeAccountHolder;
  accountType: TypeAccountChoices;
  additionalInfo: LabeledTitleProps[];
  contactDetails: LabeledTitleProps[];
  employmentAddress: LabeledTitleProps[];
  employmentDetails: LabeledTitleProps[];
  epfDetails?: LabeledTitleProps[];
  foreignBankDetails: LabeledTitleProps[][];
  handleCloseViewer?: () => void;
  handleNextStep: (route: TypeOnboardingKey) => void;
  localBankDetails: LabeledTitleProps[][];
  mailingAddress: LabeledTitleProps[];
  name: string;
  permanentAddress: LabeledTitleProps[];
  personalDetails: LabeledTitleProps[];
  viewFile?: FileBase64 | undefined;
}

export const SummaryDetails: FunctionComponent<SummaryDetailsProps> = ({
  accountHolder,
  accountType,
  additionalInfo,
  contactDetails,
  employmentAddress,
  employmentDetails,
  epfDetails,
  foreignBankDetails,
  handleCloseViewer,
  handleNextStep,
  localBankDetails,
  mailingAddress,
  name,
  permanentAddress,
  personalDetails,
  viewFile,
}: SummaryDetailsProps) => {
  const { width } = Dimensions.get("window");

  const headerTitle = accountHolder === "Principal" ? SUMMARY.TITLE_PRINCIPAL : SUMMARY.TITLE_JOINT;

  const handleEditPersonalDetails = () => {
    handleNextStep("IdentityVerification");
  };

  const handleEditOtherDetails = () => {
    handleNextStep("PersonalDetails");
  };

  const handleEditEmploymentDetails = () => {
    handleNextStep("EmploymentDetails");
  };

  const personalDetailsInfo: LabeledTitleProps[] =
    personalDetails.length > 12 ? [...personalDetails.slice(0, 5)] : [...personalDetails.slice(0, 3)];
  const personalDetailsItem: LabeledTitleProps[] =
    personalDetails.length > 12 ? [...personalDetails.slice(5)] : [...personalDetails.slice(3)];
  const personalDetailsSection = {
    iconName: "account",
    text: SUMMARY.TITLE_PERSONAL,
    data: [personalDetailsItem],
  };
  const employmentDetailsSection = {
    iconName: "location",
    text: SUMMARY.LABEL_EMPLOYMENT_ADDRESS,
    data: [employmentAddress],
  };
  const accountDetailsBank = {
    iconName: "bank-new",
    text: SUMMARY.SUBTITLE_LOCAL_BANK,
    data: [...localBankDetails],
  };
  const accountDetailsForeignBank = {
    iconName: "bank-new",
    text: SUMMARY.SUBTITLE_FOREIGN_BANK,
    data: [...foreignBankDetails],
  };

  const textCardProps: BaseTextCardProps = {
    itemsPerGroup: 3,
    spaceBetweenItem: width < 1080 ? 28 : 30,
    titleStyle: fsTransformNone,
    itemStyle: {},
  };
  const colorCardProps: BaseColorCardProps = {
    containerStyle: shadow12Blue110,
    contentStyle: { ...border(colorGray._2, sw1), ...px(sw24), paddingBottom: sh8 },
    headerStyle: { backgroundColor: colorWhite._1, ...shadow12Blue110, ...px(sw24) },
  };

  return (
    <View style={px(sw24)}>
      {accountType === "Individual" ? null : (
        <View style={{ marginTop: sh26 }}>
          <View style={{ ...flexRow, paddingBottom: sh4, borderBottomColor: colorRed._1, borderBottomWidth: sw1 }}>
            <Text style={fs10RegGray6}>{headerTitle}</Text>
            <CustomSpacer space={sw16} isHorizontal={true} />
            <Text style={fs12BoldBlack2}>{name}</Text>
          </View>
          <Dash color={colorRed._2} thickness={sh1} gap={0} />
        </View>
      )}
      <SummaryColorCard
        headerTitle={SUMMARY.TITLE_IDENTIFICATION}
        data={personalDetailsInfo}
        spaceToTop={sh24}
        section={[personalDetailsSection]}
        textCardProps={textCardProps}
        colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditPersonalDetails } }}
      />
      <SummaryColorCard
        headerTitle={SUMMARY.TITLE_CONTACT}
        data={contactDetails}
        spaceToTop={sh24}
        textCardProps={textCardProps}
        colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditOtherDetails } }}
      />
      <SummaryColorCard
        headerTitle={SUMMARY.LABEL_PERMANENT_ADDRESS}
        data={permanentAddress}
        spaceToTop={sh24}
        textCardProps={textCardProps}
        colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditPersonalDetails } }}
      />
      <SummaryColorCard
        headerTitle={SUMMARY.LABEL_MAILING_ADDRESS}
        data={mailingAddress}
        spaceToTop={sh24}
        textCardProps={textCardProps}
        colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditPersonalDetails } }}
      />
      {epfDetails !== undefined && epfDetails.length !== 0 ? (
        <SummaryColorCard
          headerTitle={SUMMARY.TITLE_EPF}
          data={epfDetails}
          spaceToTop={sh24}
          textCardProps={textCardProps}
          colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditOtherDetails } }}
        />
      ) : null}
      {(accountType === "Joint" && accountHolder === "Joint") ||
      (accountType === "Joint" && accountHolder === "Principal") ||
      (localBankDetails.length === 0 && foreignBankDetails.length === 0) ? null : (
        <SummaryColorCard
          headerTitle={SUMMARY.TITLE_ACCOUNT}
          data={additionalInfo}
          section={[accountDetailsBank, accountDetailsForeignBank]}
          spaceToTop={sh24}
          textCardProps={textCardProps}
          colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditOtherDetails } }}
        />
      )}
      {employmentDetails.length > 0 ? (
        <SummaryColorCard
          headerTitle={SUMMARY.TITLE_EMPLOYMENT}
          data={employmentDetails}
          section={[employmentDetailsSection]}
          spaceToTop={sh24}
          textCardProps={textCardProps}
          colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditEmploymentDetails } }}
        />
      ) : null}
      {viewFile !== undefined && handleCloseViewer !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="base64" value={viewFile} visible={viewFile !== undefined} />
      ) : null}
    </View>
  );
};
