import React, { Fragment, FunctionComponent } from "react";
import { Dimensions, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ColorCard, ContentPage, CustomButton, CustomFlexSpacer, CustomSpacer, IconButton, TextCard } from "../../../components";
import { Language } from "../../../constants";
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
  fs10RegGray6,
  fs12BoldGray5,
  fs16BoldBlack2,
  fs16BoldBlue1,
  fsTransformNone,
  fsUppercase,
  noBorder,
  px,
  rowCenterVertical,
  sh12,
  sh16,
  sh24,
  sh40,
  sh72,
  sh8,
  sw1,
  sw16,
  sw20,
  sw216,
  sw228,
  sw239,
  sw24,
  sw32,
  sw40,
  sw8,
} from "../../../styles";
import { isNotEmpty } from "../../../utils";
import { defaultContentProps } from "../Content";

const { NEW_SALES_SUMMARY } = Language.PAGE;

interface NewSalesSummaryProps extends PersonalInfoStoreProps {
  handleNextStep: (route: TypeNewSalesRoute) => void;
  setCurrentProfile: (holder: TypeAccountHolder) => void;
  setFile: (file: FileBase64 | undefined) => void;
  setPage: (index: number) => void;
}

const NewSalesAccountSummaryComponent: FunctionComponent<NewSalesSummaryProps> = ({
  accountType,
  client,
  details,
  handleNextStep,
  personalInfo,
  riskScore,
  setCurrentProfile,
  setFile,
  setPage,
}: NewSalesSummaryProps) => {
  const { width } = Dimensions.get("window");
  const { principalHolder, jointHolder } = details!;
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

  const handleEditIdentification = () => {
    handleNextStep("IdentityVerification");
  };

  const handleEditInfo = () => {
    handleNextStep("AdditionalDetails");
  };

  const handlePrincipalProfile = () => {
    setCurrentProfile("Principal");
    setPage(1);
  };

  const handleJointProfile = () => {
    setCurrentProfile("Joint");
    setPage(1);
  };

  const idVerificationPrincipal: LabeledTitleProps[] = [
    {
      label: handleIdLabel(principalHolder!.idType!, "front", undefined),
      onPress: () => setFile(personalInfo.principal?.personalDetails?.id?.frontPage),
      title: personalInfo.principal?.personalDetails?.id?.frontPage?.name,
      titleNumberOfLines: 1,
      titleIcon: "tax-card",
      titleStyle: fsTransformNone,
    },
  ];

  if (principalHolder!.idType! !== "Passport") {
    idVerificationPrincipal.push({
      label: handleIdLabel(principalHolder!.idType!, "back", undefined),
      onPress: () => setFile(personalInfo.principal?.personalDetails?.id?.secondPage),
      title: personalInfo.principal?.personalDetails?.id?.secondPage?.name,
      titleIcon: "tax-card",
      titleNumberOfLines: 1,
      titleStyle: fsTransformNone,
    });
  }
  const idVerificationJoint = [
    {
      label: handleIdLabel(jointHolder!.idType!, "front", undefined),
      onPress: () => setFile(personalInfo.joint?.personalDetails?.id?.frontPage),
      title: personalInfo.joint?.personalDetails?.id?.frontPage?.name,
      titleIcon: "tax-card",
      titleNumberOfLines: 1,
      titleStyle: fsTransformNone,
    },
  ];
  if (personalInfo.joint?.personalDetails?.idType !== "Passport") {
    idVerificationJoint.push({
      label: handleIdLabel(jointHolder!.idType!, "back", undefined),
      onPress: () => setFile(personalInfo.joint?.personalDetails?.id?.secondPage),
      title: personalInfo.joint?.personalDetails?.id?.secondPage?.name,
      titleIcon: "tax-card",
      titleNumberOfLines: 1,
      titleStyle: fsTransformNone,
    });
  }

  const localBankDetails: LabeledTitleProps[][] = [];
  if (bankSummary !== null && bankSummary !== undefined && bankSummary.localBank !== null) {
    bankSummary.localBank!.forEach((bank) => {
      const newData: LabeledTitleProps[] = [
        { label: NEW_SALES_SUMMARY.LABEL_CURRENCY, title: bank.currency!.join(", "), titleStyle: fsUppercase },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_NAME, title: bank.bankName },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: bank.bankAccountName },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_ACCOUNT_NO, title: bank.bankAccountNumber },
      ];

      if (bank.bankSwiftCode !== null && bank.bankSwiftCode !== "") {
        newData.push({ label: NEW_SALES_SUMMARY.LABEL_BANK_SWIFT, title: bank.bankSwiftCode, titleStyle: fsTransformNone });
      }
      return localBankDetails.push(newData);
    });
  }

  const foreignBankDetails: LabeledTitleProps[][] = [];
  if (bankSummary !== null && bankSummary !== undefined && bankSummary.foreignBank !== null) {
    bankSummary.foreignBank!.forEach((bank) => {
      const newData: LabeledTitleProps[] = [
        { label: NEW_SALES_SUMMARY.LABEL_CURRENCY, title: bank.currency!.join(", "), titleStyle: fsUppercase },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_NAME, title: bank.bankName },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: bank.bankAccountName, titleStyle: fsTransformNone },
        { label: NEW_SALES_SUMMARY.LABEL_BANK_ACCOUNT_NO, title: bank.bankAccountNumber },
      ];

      if (bank.bankLocation !== null) {
        newData.push({ label: NEW_SALES_SUMMARY.LABEL_BANK_LOCATION, title: bank.bankLocation });
      }
      if (bank.bankSwiftCode !== null && bank.bankSwiftCode !== "") {
        newData.push({ label: NEW_SALES_SUMMARY.LABEL_BANK_SWIFT, title: bank.bankSwiftCode, titleStyle: fsTransformNone });
      }
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
    accountSettings.splice(-1, 0, {
      label: NEW_SALES_SUMMARY.LABEL_SIGNATURE,
      title: signatory!,
    });
  }

  const checkLabel = client.accountType === "Joint" ? NEW_SALES_SUMMARY.LABEL_PRINCIPAL_PROFILE : NEW_SALES_SUMMARY.LABEL_INVESTOR_PROFILE;

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
    spaceBetweenItem: width < 1080 ? 30 : 32,
    titleStyle: fs16BoldBlack2,
  };

  return (
    <ContentPage
      {...defaultContentProps}
      spaceToBottom={sh72}
      sideElement={
        <View>
          <CustomSpacer space={sh40} />
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
          content={<TextCard data={accountDetails} itemsPerGroup={3} spaceBetweenItem={sw32} itemStyle={{ width: sw239 }} />}
          contentStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorBlue._3, ...px(sw24), paddingBottom: sh8 }}
          customHeader={
            <View style={rowCenterVertical}>
              <CustomSpacer isHorizontal={true} space={sw24} />
              <View style={flexRow}>
                <Text style={fs10RegGray6}>{`${accountType} ${NEW_SALES_SUMMARY.LABEL_ACCOUNT}`}</Text>
                <CustomSpacer isHorizontal={true} space={sw16} />
                {/* TOMS ID  */}
                {/* <Text style={fs12BoldBlack2}>-</Text> */}
              </View>
            </View>
          }
          header="custom"
          headerStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorBlue._3, ...px(0), borderBottomColor: colorRed._1 }}
        />
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

        {epfDetailsSummary.length > 0 ? (
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
              {isAllEpf === true && isNotEmpty(enableBankDetails) && enableBankDetails === false ? null : (
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
              )}
              {foreignBankDetails.map((bank, numberIndex) => {
                const label = `${NEW_SALES_SUMMARY.LABEL_FOREIGN_BANK} ${foreignBankDetails.length > 1 ? numberIndex + 1 : ""}`;
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
                    <TextCard data={bank} {...textCardProps} />
                  </Fragment>
                );
              })}
              {isAllEpf === true && isNotEmpty(enableBankDetails) && enableBankDetails === false ? null : <CustomSpacer space={sh8} />}
              <View style={flexRow}>
                <IcoMoon color={colorBlue._1} name="account-settings" size={sw24} />
                <CustomSpacer isHorizontal={true} space={sw8} />
                <View style={flexChild}>
                  <View style={rowCenterVertical}>
                    <Text style={fs16BoldBlack2}>{NEW_SALES_SUMMARY.LABEL_ACCOUNT_SETTINGS}</Text>
                    <CustomSpacer isHorizontal={true} space={sw16} />
                    <View style={flexChild}>
                      <View style={borderBottomBlue4} />
                    </View>
                  </View>
                </View>
              </View>
              <CustomSpacer space={sh16} />
              <TextCard data={accountSettings} {...textCardProps} />
            </Fragment>
          }
          contentStyle={{ ...border(colorGray._2, sw1), ...px(sw24), paddingBottom: sh8, paddingTop: sh24 }}
          customHeader={
            <View style={{ ...rowCenterVertical, ...px(sw24) }}>
              <Text style={fs16BoldBlue1}>{NEW_SALES_SUMMARY.LABEL_ACCOUNT_DETAILS}</Text>
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
