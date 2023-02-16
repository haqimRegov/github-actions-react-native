import React, { FunctionComponent } from "react";
import { Dimensions, View } from "react-native";

import { AccountHeader, BaseColorCardProps, BaseTextCardProps, CustomSpacer, FileViewer } from "../../../components";
import { Language } from "../../../constants";
import { border, colorGray, colorWhite, fsTransformNone, px, sh16, sh24, sh8, shadow12Blue110, sw1, sw24 } from "../../../styles";
import { SummaryColorCard } from "../../../templates";

const { SUMMARY } = Language.PAGE;

interface SummaryDetailsProps {
  accountHolder: TypeAccountHolder;
  accountType: TypeAccountChoices;
  additionalInfo: LabeledTitleProps[];
  contactDetails: LabeledTitleProps[];
  emailSection: LabeledTitleProps[];
  employmentAddress: LabeledTitleProps[];
  employmentDetails: LabeledTitleProps[];
  epfDetails?: LabeledTitleProps[];
  foreignBankDetails: LabeledTitleProps[][];
  handleCloseViewer?: () => void;
  handleEdit: (route: TypeOnboardingKey) => void;
  isMalaysian: boolean;
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
  emailSection,
  employmentAddress,
  employmentDetails,
  epfDetails,
  foreignBankDetails,
  handleCloseViewer,
  handleEdit,
  isMalaysian,
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
    handleEdit("IdentityVerification");
  };

  const handleEditContact = () => {
    handleEdit("ContactDetails");
  };

  const handleEditOtherDetails = () => {
    handleEdit("AdditionalDetails");
  };

  const handleEditEmploymentDetails = () => {
    handleEdit("EmploymentDetails");
  };

  const personalDetailsInfo: LabeledTitleProps[] = personalDetails.slice(0, isMalaysian === true ? 3 : 5);
  const personalDetailsItem: LabeledTitleProps[] = personalDetails.slice(isMalaysian === true ? -9 : -8);

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
      <CustomSpacer space={sh24} />
      {accountType === "Individual" ? null : <AccountHeader title={headerTitle} subtitle={name} />}
      <SummaryColorCard
        headerTitle={SUMMARY.TITLE_IDENTIFICATION}
        data={personalDetailsInfo}
        section={[personalDetailsSection]}
        textCardProps={textCardProps}
        colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditPersonalDetails } }}
      />
      <SummaryColorCard
        headerTitle={SUMMARY.TITLE_EMAIL}
        data={emailSection}
        spaceToTop={sh16}
        textCardProps={textCardProps}
        colorCardProps={{ ...colorCardProps, headerIcon: { disabled: true, name: "pencil", onPress: () => {} } }}
      />
      <SummaryColorCard
        headerTitle={SUMMARY.TITLE_CONTACT}
        data={contactDetails}
        spaceToTop={sh16}
        textCardProps={textCardProps}
        colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditContact } }}
      />
      <SummaryColorCard
        headerTitle={SUMMARY.LABEL_PERMANENT_ADDRESS}
        data={permanentAddress}
        spaceToTop={sh16}
        textCardProps={textCardProps}
        colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditPersonalDetails } }}
      />
      <SummaryColorCard
        headerTitle={SUMMARY.LABEL_MAILING_ADDRESS}
        data={mailingAddress}
        spaceToTop={sh16}
        textCardProps={textCardProps}
        colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditPersonalDetails } }}
      />
      {epfDetails !== undefined && epfDetails.length !== 0 ? (
        <SummaryColorCard
          headerTitle={SUMMARY.TITLE_EPF}
          data={epfDetails}
          spaceToTop={sh16}
          textCardProps={textCardProps}
          colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditPersonalDetails } }}
        />
      ) : null}
      {employmentDetails.length > 0 ? (
        <SummaryColorCard
          headerTitle={SUMMARY.TITLE_EMPLOYMENT}
          data={employmentDetails}
          section={[employmentDetailsSection]}
          spaceToTop={sh16}
          textCardProps={textCardProps}
          colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditEmploymentDetails } }}
        />
      ) : null}
      {(accountType === "Joint" && accountHolder === "Joint") ||
      (accountType === "Joint" && accountHolder === "Principal") ||
      (localBankDetails.length === 0 && foreignBankDetails.length === 0) ? null : (
        <SummaryColorCard
          headerTitle={SUMMARY.TITLE_ACCOUNT}
          data={additionalInfo}
          section={[accountDetailsBank, accountDetailsForeignBank]}
          spaceToTop={sh16}
          textCardProps={textCardProps}
          colorCardProps={{ ...colorCardProps, headerIcon: { name: "pencil", onPress: handleEditOtherDetails } }}
        />
      )}
      {viewFile !== undefined && handleCloseViewer !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="base64" value={viewFile} visible={viewFile !== undefined} />
      ) : null}
    </View>
  );
};
