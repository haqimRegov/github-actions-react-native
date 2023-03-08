import React, { Fragment, FunctionComponent } from "react";
import { Dimensions, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import {
  ColorCard,
  ContentPage,
  CustomButton,
  CustomFlexSpacer,
  CustomSpacer,
  defaultContentProps,
  IconButton,
  TextCard,
} from "../../../components";
import { Language } from "../../../constants";
import { getProductTagType } from "../../../helpers";
import { IcoMoon } from "../../../icons";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import {
  autoWidth,
  border,
  borderBottomBlue4,
  circle,
  colorBlue,
  colorGray,
  colorRed,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs10BoldBlue1,
  fs10RegBlue9,
  fs10RegGray5,
  fs10RegGray6,
  fs12BoldBlack2,
  fs12BoldGray5,
  fs16BoldBlack2,
  fs16BoldBlue1,
  fsTransformNone,
  fsUppercase,
  noBorder,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh16,
  sh2,
  sh24,
  sh72,
  sh8,
  sw05,
  sw1,
  sw14,
  sw16,
  sw20,
  sw216,
  sw228,
  sw239,
  sw24,
  sw30,
  sw32,
  sw4,
  sw40,
  sw8,
} from "../../../styles";
import { isArrayNotEmpty, isNotEmpty } from "../../../utils";

const { NEW_SALES_SUMMARY, RISK_ASSESSMENT } = Language.PAGE;

interface NewSalesSummaryProps extends PersonalInfoStoreProps {
  handleNextStep: (route: TypeNewSalesRoute) => void;
  setCurrentProfile: (holder: TypeAccountHolder) => void;
  setFile: (file: FileBase64 | undefined) => void;
  setPage: (index: TRiskProfilePages) => void;
}

const NewSalesAccountSummaryComponent: FunctionComponent<NewSalesSummaryProps> = ({
  accountType,
  addPersonalInfo,
  client,
  details,
  handleNextStep,
  newSales,
  personalInfo,
  riskScore,
  setCurrentProfile,
  setFile,
  setPage,
  updateNewSales,
}: NewSalesSummaryProps) => {
  const { width } = Dimensions.get("window");
  const { principalHolder, jointHolder } = details!;
  const { accountDetails: currentAccountDetails, disabledSteps, transactionType } = newSales;
  const { accountNo, bankDetails, fundType, isEpf } = currentAccountDetails;
  const { incomeDistribution, isAllEpf, principal, signatory } = personalInfo;
  const { bankSummary, epfDetails, personalDetails } = principal!;
  const { enableBankDetails } = personalDetails!;

  const checkIdType = (data: IClientBasicInfo) => {
    return data.idType === "Other" ? `${data.otherIdType} ${NEW_SALES_SUMMARY.LABEL_ID}` : data.idType;
  };
  const accountDetails: LabeledTitleProps[] = [
    {
      label: accountType === "Joint" ? NEW_SALES_SUMMARY.LABEL_PRINCIPAL_NAME : NEW_SALES_SUMMARY.LABEL_INVESTOR_NAME,
      title: principalHolder!.name,
      titleStyle: fsTransformNone,
    },
    {
      label:
        accountType === "Joint"
          ? `${NEW_SALES_SUMMARY.LABEL_PRINCIPAL} ${checkIdType(principalHolder!)}`
          : `${NEW_SALES_SUMMARY.LABEL_INVESTOR} ${checkIdType(principalHolder!)}`,
      title: principalHolder!.id,
      titleStyle: fsTransformNone,
    },
    {
      label: NEW_SALES_SUMMARY.LABEL_RISK_CATEGORY,
      title: isNotEmpty(riskScore) && riskScore.appetite !== "" ? riskScore.appetite : "-",
      titleStyle: fsTransformNone,
    },
  ];

  if (client.accountType === "Joint") {
    accountDetails.push(
      {
        label: NEW_SALES_SUMMARY.LABEL_JOINT_NAME,
        title: jointHolder!.name,
        titleStyle: fsTransformNone,
      },
      {
        label: `${NEW_SALES_SUMMARY.LABEL_JOINT} ${checkIdType(jointHolder!)}`,
        title: jointHolder!.id,
        titleStyle: fsTransformNone,
      },
    );
  }

  const handleIdLabel = (idType: TypeIDChoices, index: "front" | "back", otherId?: TypeIDOther): string => {
    switch (idType) {
      case "NRIC":
        return index === "front" ? `${idType} (${NEW_SALES_SUMMARY.LABEL_FRONT})` : `${idType} (${NEW_SALES_SUMMARY.LABEL_BACK})`;
      case "Passport":
        return idType;
      case "Other":
        return index === "front"
          ? `${otherId} ${NEW_SALES_SUMMARY.LABEL_ID} (${NEW_SALES_SUMMARY.LABEL_FRONT})`
          : `${otherId} ${NEW_SALES_SUMMARY.LABEL_ID} (${NEW_SALES_SUMMARY.LABEL_BACK})`;
      default:
        return index === "front" ? `${idType} (${NEW_SALES_SUMMARY.LABEL_FRONT})` : `${idType} (${NEW_SALES_SUMMARY.LABEL_BACK})`;
    }
  };

  const handleEdit = (value: TypeNewSalesKey) => {
    const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];

    // add to disabledSteps when editing
    if (updatedDisabledSteps.includes("Summary") === false) {
      updatedDisabledSteps.push("Summary");
    }

    // enable edit mode
    addPersonalInfo({ ...personalInfo, editMode: true });

    updateNewSales({ ...newSales, disabledSteps: updatedDisabledSteps });

    handleNextStep(value);
  };

  const handleEditIdentification = () => {
    handleEdit("IdentityVerification");
  };

  const handleEditInfo = () => {
    handleEdit("AdditionalDetails");
  };

  const handlePrincipalProfile = () => {
    setCurrentProfile("Principal");
    setPage("profile");
  };

  const handleJointProfile = () => {
    setCurrentProfile("Joint");
    setPage("profile");
  };

  const handleAccountDetails = () => {
    setPage("accountDetails");
  };

  const idVerificationPrincipal: LabeledTitleProps[] = [
    {
      label: handleIdLabel(principalHolder!.idType!, "front", principalHolder?.otherIdType),
      onPress: () => setFile(personalInfo.principal?.personalDetails?.id?.frontPage),
      title: personalInfo.principal?.personalDetails?.id?.frontPage?.name,
      titleNumberOfLines: 1,
      titleIcon: "tax-card",
      titleStyle: fsTransformNone,
    },
  ];

  if (principalHolder!.idType! !== "Passport") {
    idVerificationPrincipal.push({
      label: handleIdLabel(principalHolder!.idType!, "back", principalHolder?.otherIdType),
      onPress: () => setFile(personalInfo.principal?.personalDetails?.id?.secondPage),
      title: personalInfo.principal?.personalDetails?.id?.secondPage?.name,
      titleIcon: "tax-card",
      titleNumberOfLines: 1,
      titleStyle: fsTransformNone,
    });
  }
  const idVerificationJoint = [
    {
      label: handleIdLabel(jointHolder!.idType!, "front", jointHolder?.otherIdType),
      onPress: () => setFile(personalInfo.joint?.personalDetails?.id?.frontPage),
      title: personalInfo.joint?.personalDetails?.id?.frontPage?.name,
      titleIcon: "tax-card",
      titleNumberOfLines: 1,
      titleStyle: fsTransformNone,
    },
  ];
  if (personalInfo.joint?.personalDetails?.idType !== "Passport") {
    idVerificationJoint.push({
      label: handleIdLabel(jointHolder!.idType!, "back", jointHolder?.otherIdType),
      onPress: () => setFile(personalInfo.joint?.personalDetails?.id?.secondPage),
      title: personalInfo.joint?.personalDetails?.id?.secondPage?.name,
      titleIcon: "tax-card",
      titleNumberOfLines: 1,
      titleStyle: fsTransformNone,
    });
  }

  const localBankDetails: LabeledTitleProps[][] = [];
  if (bankSummary !== null && bankSummary !== undefined && bankSummary.localBank !== null) {
    bankSummary.localBank!.forEach((bank: IBankDetailsState, bankIndex: number) => {
      const bankAccountName =
        bank.combinedBankAccountName !== "" && bank.combinedBankAccountName !== undefined
          ? bank.combinedBankAccountName
          : bank.bankAccountName;
      const checkNewCurrency =
        bankDetails !== undefined && bankDetails.localBank!.length - 1 >= bankIndex
          ? bankDetails.localBank![bankIndex].currency?.length !== bank.currency?.length
          : false;
      const checkNewSwift =
        bankDetails !== undefined && bankDetails.localBank!.length - 1 >= bankIndex
          ? bankDetails.localBank![bankIndex].bankSwiftCode !== bank.bankSwiftCode
          : false;
      const checkCurrencyUpdated: Partial<LabeledTitleProps> =
        checkNewCurrency === true ? { headerSideText: NEW_SALES_SUMMARY.LABEL_UPDATED } : {};
      const checkSwiftUpdated: Partial<LabeledTitleProps> =
        checkNewSwift === true ? { headerSideText: NEW_SALES_SUMMARY.LABEL_UPDATED } : {};
      const updatedAccountName = bank.bankName !== "" ? bankAccountName : "-";
      const bankCurrency = bank.bankName !== "" ? bank.currency!.join(", ") : "-";
      const newData: LabeledTitleProps[] = [
        { label: NEW_SALES_SUMMARY.LABEL_CURRENCY, title: bankCurrency, titleStyle: fsUppercase, ...checkCurrencyUpdated },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_NAME, title: bank.bankName },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: updatedAccountName },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_ACCOUNT_NO, title: bank.bankAccountNumber },
        {
          label: NEW_SALES_SUMMARY.LABEL_BANK_SWIFT,
          title: isNotEmpty(bank.bankSwiftCode) && bank.bankSwiftCode !== "" ? bank.bankSwiftCode : "-",
          titleStyle: fsTransformNone,
          ...checkSwiftUpdated,
        },
      ];

      return localBankDetails.push(newData);
    });
  }

  const foreignBankDetails: LabeledTitleProps[][] = [];
  if (bankSummary !== null && bankSummary !== undefined && bankSummary.foreignBank !== null) {
    bankSummary.foreignBank!.forEach((bank: IBankDetailsState, bankIndex: number) => {
      const checkNewCurrency =
        bankDetails !== undefined && bankDetails.foreignBank!.length - 1 >= bankIndex
          ? bankDetails.foreignBank![bankIndex].currency?.length !== bank.currency?.length
          : false;
      const checkNewSwift =
        bankDetails !== undefined && bankDetails.foreignBank!.length - 1 >= bankIndex
          ? bankDetails.foreignBank![bankIndex].bankSwiftCode !== bank.bankSwiftCode
          : false;
      const checkCurrencyUpdated: Partial<LabeledTitleProps> =
        checkNewCurrency === true ? { headerSideText: NEW_SALES_SUMMARY.LABEL_UPDATED } : {};
      const checkSwiftUpdated: Partial<LabeledTitleProps> =
        checkNewSwift === true ? { headerSideText: NEW_SALES_SUMMARY.LABEL_UPDATED } : {};
      const newData: LabeledTitleProps[] = [
        { label: NEW_SALES_SUMMARY.LABEL_CURRENCY, title: bank.currency!.join(", "), titleStyle: fsUppercase, ...checkCurrencyUpdated },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_NAME, title: bank.bankName },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: bank.bankAccountName, titleStyle: fsTransformNone },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_ACCOUNT_NO, title: bank.bankAccountNumber },
        {
          label: NEW_SALES_SUMMARY.LABEL_BANK_SWIFT,
          title: isNotEmpty(bank.bankSwiftCode) && bank.bankSwiftCode !== "" ? bank.bankSwiftCode : "-",
          titleStyle: fsTransformNone,
          ...checkSwiftUpdated,
        },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_LOCATION, title: bank.bankLocation },
      ];

      return foreignBankDetails.push(newData);
    });
  }

  const epfDetailsSummary: LabeledTitleProps[] =
    epfDetails !== undefined && epfDetails.epfAccountType !== "" && epfDetails.epfMemberNumber !== ""
      ? [
          { label: NEW_SALES_SUMMARY.LABEL_EPF_MEMBER_NUMBER, title: epfDetails.epfMemberNumber! },
          { label: NEW_SALES_SUMMARY.LABEL_EPF_ACCOUNT, title: epfDetails.epfAccountType! },
        ]
      : [];

  const accountSettings: LabeledTitleProps[] = [
    {
      label: NEW_SALES_SUMMARY.LABEL_INCOME_DISTRIBUTION,
      title: incomeDistribution,
    },
  ];

  if (client.accountType === "Joint") {
    accountSettings.push(
      {
        label: NEW_SALES_SUMMARY.LABEL_RELATIONSHIP,
        title: principal?.personalDetails?.relationship || "-",
      },
      {
        label: NEW_SALES_SUMMARY.LABEL_SIGNATURE,
        title: signatory || "-",
      },
    );
  }

  const checkLabel = client.accountType === "Joint" ? NEW_SALES_SUMMARY.LABEL_PRINCIPAL_PROFILE : NEW_SALES_SUMMARY.LABEL_INVESTOR_PROFILE;
  const checkEpf = isEpf === true ? "EPF" : "Cash";
  const tags = accountNo !== "" ? [getProductTagType(fundType), checkEpf] : [];
  const checkAccountNo = accountNo !== "" ? accountNo : null;
  const accountTitle = `${client.accountType} ${RISK_ASSESSMENT.LABEL_ACCOUNT}`;

  const containerStyle: ViewStyle = {
    ...flexRow,
    borderRadius: sw24,
    borderWidth: sw1,
    borderColor: colorBlue._1,
    height: sh24,
    maxWidth: sw228,
  };

  const buttonStyle: ViewStyle = { ...px(sw16), ...autoWidth, backgroundColor: colorTransparent, height: sh24, borderWidth: 0 };

  const textCardProps = {
    itemsPerGroup: 3,
    itemStyle: { width: sw239 },
    labelStyle: fs12BoldGray5,
    spaceBetweenItem: width < 1080 || width > 1080 ? sw30 : sw32,
    titleStyle: fs16BoldBlack2,
  };

  const checkAccountDetailsHeader =
    transactionType === "Sales-AO" ? NEW_SALES_SUMMARY.LABEL_ACCOUNT_DETAILS : NEW_SALES_SUMMARY.LABEL_BANK_DETAILS;

  return (
    <ContentPage
      spaceToBottom={sh72}
      sideElement={
        <View>
          <CustomSpacer space={defaultContentProps.spaceToTop!} />
          <View style={containerStyle}>
            <CustomButton
              secondary={true}
              buttonStyle={buttonStyle}
              onPress={handlePrincipalProfile}
              text={checkLabel}
              textStyle={fs10BoldBlue1}
            />
            {client.accountType === "Joint" ? (
              <Fragment>
                <View style={{ borderLeftWidth: sw1, borderColor: colorBlue._1 }} />
                <CustomButton
                  secondary={true}
                  buttonStyle={buttonStyle}
                  onPress={handleJointProfile}
                  text={NEW_SALES_SUMMARY.LABEL_JOINT_PROFILE}
                  textStyle={fs10BoldBlue1}
                />
              </Fragment>
            ) : null}
          </View>
        </View>
      }
      subheading={NEW_SALES_SUMMARY.LABEL_HEADER}
      subtitle={NEW_SALES_SUMMARY.LABEL_SUBHEADER}>
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        <ColorCard
          containerStyle={noBorder}
          content={<TextCard data={accountDetails} {...textCardProps} />}
          contentStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorBlue._3, ...px(sw24), paddingBottom: sh8 }}
          customHeader={
            <View style={{ ...rowCenterVertical, ...px(sw24) }}>
              <Text style={fs10RegGray6}>{accountTitle}</Text>
              <CustomSpacer isHorizontal={true} space={sw16} />
              <Text style={fs12BoldBlack2}>{checkAccountNo}</Text>
              {accountNo !== "" ? (
                <TouchableWithoutFeedback onPress={handleAccountDetails}>
                  <View style={rowCenterVertical}>
                    <CustomSpacer isHorizontal={true} space={sw16} />
                    <Text style={fs12BoldBlack2}>{RISK_ASSESSMENT.LABEL_VIEW_ACCOUNT_DETAILS}</Text>
                    <CustomSpacer isHorizontal={true} space={sw4} />
                    <IcoMoon color={colorBlue._1} name="arrow-right" size={sw14} />
                  </View>
                </TouchableWithoutFeedback>
              ) : null}
              <CustomFlexSpacer />
              {tags.length > 0
                ? tags.map((eachTag: string, tagIndex: number) => {
                    const tagStyle: ViewStyle = {
                      ...px(sw4),
                      ...py(sh2),
                      backgroundColor: colorGray._1,
                      borderColor: colorGray._5,
                      borderWidth: sw05,
                      borderRadius: sw4,
                    };
                    return (
                      <Fragment key={tagIndex}>
                        {tagIndex !== 0 ? <CustomSpacer isHorizontal={true} space={sw8} /> : null}
                        <View key={tagIndex} style={tagStyle}>
                          <Text style={fs10RegGray5}>{eachTag}</Text>
                        </View>
                      </Fragment>
                    );
                  })
                : null}
            </View>
          }
          header="custom"
          headerStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorBlue._3, ...px(0), borderBottomColor: colorRed._1 }}
        />
        {transactionType === "Sales-AO" ? (
          <Fragment>
            <CustomSpacer space={sh24} />
            <ColorCard
              containerStyle={noBorder}
              content={
                <Fragment>
                  {client.accountType === "Joint" ? (
                    <Fragment>
                      <View style={rowCenterVertical}>
                        <IcoMoon name="account" size={sw20} color={colorBlue._1} />
                        <CustomSpacer isHorizontal={true} space={sw8} />
                        <Text style={fs16BoldBlack2}>{NEW_SALES_SUMMARY.LABEL_PRINCIPAL_HOLDER}</Text>
                        <CustomSpacer isHorizontal={true} space={sw16} />
                        <View style={flexChild}>
                          <View style={borderBottomBlue4} />
                        </View>
                      </View>
                      <CustomSpacer space={sh12} />
                      <TextCard data={idVerificationPrincipal} spaceBetweenItem={sw32} titleStyle={{ maxWidth: sw216 }} />
                      <CustomSpacer space={sh24} />
                      <View style={rowCenterVertical}>
                        <IcoMoon name="account-joint" size={sw20} color={colorBlue._1} />
                        <CustomSpacer isHorizontal={true} space={sw8} />
                        <Text style={fs16BoldBlack2}>{NEW_SALES_SUMMARY.LABEL_JOINT_HOLDER}</Text>
                        <CustomSpacer isHorizontal={true} space={sw16} />
                        <View style={flexChild}>
                          <View style={borderBottomBlue4} />
                        </View>
                      </View>
                      <CustomSpacer space={sh12} />

                      <TextCard data={idVerificationJoint} spaceBetweenItem={sw32} titleStyle={{ maxWidth: sw216 }} />
                    </Fragment>
                  ) : (
                    <TextCard data={idVerificationPrincipal} spaceBetweenItem={sw32} titleStyle={{ maxWidth: sw216 }} />
                  )}
                </Fragment>
              }
              contentStyle={{ ...border(colorGray._2, sw1), ...px(sw24), paddingBottom: sh8 }}
              customHeader={
                <View style={{ ...rowCenterVertical, ...px(sw24) }}>
                  <Text style={fs16BoldBlue1}>{NEW_SALES_SUMMARY.LABEL_IDENTIFICATION}</Text>
                  <CustomFlexSpacer />
                  <IconButton
                    color={colorBlue._1}
                    name="pencil"
                    onPress={handleEditIdentification}
                    size={sw20}
                    style={{ ...circle(sw40, colorWhite._1) }}
                    withHover={{ color: colorBlue._2 }}
                  />
                </View>
              }
              headerStyle={{ ...border(colorGray._2, sw1), backgroundColor: colorWhite._1, ...px(0) }}
              header="custom"
            />
          </Fragment>
        ) : null}

        {epfDetailsSummary.length > 0 && transactionType === "Sales-AO" ? (
          <Fragment>
            <CustomSpacer space={sh24} />
            <ColorCard
              containerStyle={noBorder}
              content={<TextCard data={epfDetailsSummary} />}
              contentStyle={{ ...border(colorBlue._3, sw1), ...px(sw24), paddingBottom: sh8 }}
              customHeader={
                <View style={{ ...rowCenterVertical, ...px(sw24) }}>
                  <Text style={fs16BoldBlue1}>{NEW_SALES_SUMMARY.LABEL_EPF_DETAILS}</Text>
                  <CustomFlexSpacer />
                  <IconButton
                    color={colorBlue._1}
                    name="pencil"
                    onPress={handleEditInfo}
                    size={sw20}
                    style={{ ...circle(sw40, colorWhite._1) }}
                    withHover={{ color: colorBlue._2 }}
                  />
                </View>
              }
              header="custom"
              headerStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorWhite._1, ...px(0) }}
            />
          </Fragment>
        ) : null}
        <CustomSpacer space={sh24} />
        <ColorCard
          containerStyle={noBorder}
          content={
            <Fragment>
              {transactionType === "Sales-AO" ? (
                <Fragment>
                  <TextCard data={accountSettings} {...textCardProps} />
                  <CustomSpacer space={sh8} />
                </Fragment>
              ) : null}
              {isArrayNotEmpty(localBankDetails) ? (
                <Fragment>
                  {localBankDetails.map((bank, numberIndex) => {
                    const label = `${NEW_SALES_SUMMARY.LABEL_LOCAL_BANK}`;
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
                        <TextCard data={bank} {...textCardProps} />
                      </Fragment>
                    );
                  })}
                </Fragment>
              ) : null}
              {isArrayNotEmpty(foreignBankDetails)
                ? foreignBankDetails.map((bank, numberIndex) => {
                    const label = `${NEW_SALES_SUMMARY.LABEL_FOREIGN_BANK} ${foreignBankDetails.length > 1 ? numberIndex + 1 : ""}`;
                    const checkNewForeignBank = bankDetails !== undefined && bankDetails!.foreignBank!.length - 1 < numberIndex;
                    return (
                      <Fragment key={numberIndex}>
                        {numberIndex === 0 ? <CustomSpacer space={sh16} /> : null}
                        <View style={flexRow}>
                          <IcoMoon color={colorBlue._1} name="bank-new" size={sw24} />
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <View style={flexChild}>
                            <View style={rowCenterVertical}>
                              <Text style={fs16BoldBlue1}>{label}</Text>
                              {checkNewForeignBank === true ? (
                                <Fragment>
                                  <CustomSpacer isHorizontal={true} space={sw8} />
                                  <View style={{ ...border(colorBlue._9, sw05, sw4), ...px(sw4) }}>
                                    <Text style={fs10RegBlue9}>{NEW_SALES_SUMMARY.LABEL_UPDATED}</Text>
                                  </View>
                                </Fragment>
                              ) : null}
                              <CustomSpacer isHorizontal={true} space={sw16} />
                              <View style={flexChild}>
                                <View style={borderBottomBlue4} />
                              </View>
                            </View>
                          </View>
                        </View>
                        <CustomSpacer space={sh16} />
                        <TextCard data={bank} {...textCardProps} />
                      </Fragment>
                    );
                  })
                : null}
              {isAllEpf === true && isNotEmpty(enableBankDetails) && enableBankDetails === false ? null : <CustomSpacer space={sh8} />}
            </Fragment>
          }
          contentStyle={{ ...border(colorGray._2, sw1), ...px(sw24), paddingBottom: sh8, paddingTop: sh24 }}
          customHeader={
            <View style={{ ...rowCenterVertical, ...px(sw24) }}>
              <Text style={fs16BoldBlue1}>{checkAccountDetailsHeader}</Text>
              <CustomFlexSpacer />
              <IconButton
                color={colorBlue._1}
                name="pencil"
                onPress={handleEditInfo}
                size={sw20}
                style={{ ...circle(sw40, colorWhite._1) }}
                withHover={{ color: colorBlue._2 }}
              />
            </View>
          }
          headerStyle={{ ...border(colorGray._2, sw1), backgroundColor: colorWhite._1, ...px(0) }}
          header="custom"
        />
      </View>
    </ContentPage>
  );
};

export const NewSalesAccountSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(NewSalesAccountSummaryComponent);
