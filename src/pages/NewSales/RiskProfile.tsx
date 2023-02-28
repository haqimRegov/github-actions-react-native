import React, { Fragment, FunctionComponent, useState } from "react";
import { Image, Pressable, Text, TextStyle, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/images/LocalAssets";
import {
  ColorCard,
  ContentPage,
  CustomButton,
  CustomFlexSpacer,
  CustomSpacer,
  defaultContentProps,
  IconButton,
  SelectionBanner,
  TextCard,
  TextSpaceArea,
} from "../../components";
import { Language } from "../../constants";
import { getProductTagType } from "../../helpers";
import { usePrevious } from "../../hooks";
import { IcoMoon } from "../../icons";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import {
  autoWidth,
  border,
  borderBottomBlue4,
  centerHorizontal,
  circle,
  colorBlue,
  colorGray,
  colorRed,
  colorTransparent,
  colorWhite,
  colorYellow,
  DEVICE,
  flexChild,
  flexRow,
  fs10BoldBlue1,
  fs10BoldGray6,
  fs10RegBlue9,
  fs10RegGray5,
  fs10RegGray6,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs12RegGray5,
  fs16BoldBlue1,
  fs16BoldGray6,
  fs16RegBlack2,
  fs16RegGray6,
  fs20BoldBlack2,
  fs24BoldGray6,
  fsTransformNone,
  noBorder,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh16,
  sh2,
  sh24,
  sh4,
  sh8,
  sw05,
  sw1,
  sw120,
  sw14,
  sw16,
  sw20,
  sw228,
  sw239,
  sw24,
  sw240,
  sw32,
  sw4,
  sw40,
  sw638,
  sw8,
} from "../../styles";
import { isEmpty, isNotEmpty, titleCaseString } from "../../utils";
import { NewSalesAccountInformation } from "./AccountInformation";
import { InvestorProfilePage } from "./AccountInfoSummary/Profile";
import { scaledSpaceBetween } from "./helper";
import { NewSalesOrderSummary } from "./OrderSummary";

const { RISK_ASSESSMENT, NEW_SALES_SUMMARY } = Language.PAGE;

declare interface IRiskSummaryProps extends RiskStoreProps, NewSalesContentProps {
  aimsOpen: boolean;
  setAimsOpen: (toggle: boolean) => void;
}

const NewSalesRiskSummaryComponent: FunctionComponent<IRiskSummaryProps> = ({
  addInvestmentDetails,
  addPersonalInfo,
  client,
  details,
  handleNextStep,
  handleCancelNewSales,
  investors,
  isRiskUpdated,
  newSales,
  personalInfo,
  riskScore,
  setAimsOpen,
  updateNewSales,
}: IRiskSummaryProps) => {
  const [currentProfile, setCurrentProfile] = useState<TypeAccountHolder>("Principal");
  const [currentClientId, setCurrentClientId] = useState<string>("");
  const [currentOrder, setCurrentOrder] = useState<IDashboardOrder | undefined>(undefined);
  const [page, setPage] = useState<TRiskProfilePages>("accountSummary");
  const prevPage = usePrevious<TRiskProfilePages>(page);
  const { jointHolder, principalHolder } = details!;
  const { accountType } = client;
  const { accountDetails, disabledSteps, finishedSteps, riskInfo } = newSales;
  const { accountNo, ampDetails, fundType, isEpf } = accountDetails;
  const updatedRisk = riskInfo.appetite !== "" ? riskInfo : riskScore;
  const checkRangeOfReturn = riskInfo.expectedRange !== "" ? riskInfo.expectedRange : riskScore.rangeOfReturn;

  const checkIdType = (data: IClientBasicInfo) => {
    const otherIdType = isNotEmpty(data.otherIdType) ? titleCaseString(data.otherIdType!) : data.otherIdType;
    const idType = isNotEmpty(data.idType) && data.idType !== "NRIC" ? titleCaseString(data.idType!) : data.idType;

    return data.idType === "Other" ? `${otherIdType} ${RISK_ASSESSMENT.LABEL_ID}` : idType;
  };
  const accountDetailsArray: LabeledTitleProps[] = [
    {
      label: accountType === "Joint" ? RISK_ASSESSMENT.NEW_SALES_PRINCIPAL_NAME : RISK_ASSESSMENT.NEW_SALES_INVESTOR_NAME,
      title: principalHolder!.name,
      titleStyle: fsTransformNone,
    },
    {
      label:
        accountType === "Joint"
          ? `${RISK_ASSESSMENT.LABEL_PRINCIPAL} ${checkIdType(principalHolder!)}`
          : `${RISK_ASSESSMENT.LABEL_INVESTOR} ${checkIdType(principalHolder!)}`,
      title: principalHolder!.id,
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.NEW_SALES_RISK_CATEGORY,
      title: isNotEmpty(riskScore) && riskScore.appetite !== "" ? riskScore.appetite : "-",
      titleStyle: fsTransformNone,
    },
  ];

  if (client.accountType === "Joint") {
    accountDetailsArray.push(
      {
        label: RISK_ASSESSMENT.LABEL_JOINT_NAME,
        title: jointHolder!.name,
        titleStyle: fsTransformNone,
      },
      {
        label: `${RISK_ASSESSMENT.LABEL_JOINT} ${checkIdType(jointHolder!)}`,
        title: jointHolder!.id,
        titleStyle: fsTransformNone,
      },
    );
  }

  const riskProfileData: LabeledTitleProps[] = [
    {
      label: RISK_ASSESSMENT.PROFILE_APPETITE,
      title: isNotEmpty(updatedRisk) ? updatedRisk.appetite : "-",
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_RETURN,
      title: isNotEmpty(updatedRisk) ? checkRangeOfReturn : "-",
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_TYPE,
      title: isNotEmpty(updatedRisk) ? updatedRisk.type : "-",
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_PROFILE,
      title: isNotEmpty(updatedRisk) ? updatedRisk.profile : "-",
      titleStyle: fsTransformNone,
    },
  ];

  const handleInvest = () => {
    const initialStateArray: IProductSales[] = [];
    if (ampDetails !== undefined) {
      let newMasterClassList: IProductClasses = {};
      ampDetails.masterList.forEach((list: IProductMasterList) => {
        const dump = { class: list.class !== null ? list.class : "No Class", currency: list.currency };
        const findClassIndex = Object.keys(newMasterClassList).indexOf(dump.class);
        if (findClassIndex === -1) {
          newMasterClassList = { ...newMasterClassList, [dump.class]: [list] };
        } else {
          newMasterClassList[dump.class].push(list);
        }
        return dump;
      });
      const newState: IProductSales = {
        investment: {
          fundId: ampDetails.masterList[0].fundId,
          fundPaymentMethod: ampDetails.isEpf === "Yes" ? "EPF" : "Cash",
          investmentAmount: "",
          investmentSalesCharge: "",
          isTopup: false,
          fundCurrency: ampDetails.masterList[0].currency,
          fundClass: ampDetails.masterList[0].class !== null ? ampDetails.masterList[0].class : "No Class",
          scheduledInvestment: false,
          prsType: ampDetails.prsType,
        },
        isNewFund: false,
        fundDetails: { ...ampDetails },
        masterClassList: newMasterClassList,
      };

      initialStateArray.push(newState);
      addInvestmentDetails(initialStateArray);
    }
  };

  const handlePageContinue = () => {
    const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];

    // add to finishedSteps
    if (updatedFinishedSteps.includes("RiskSummary") === false) {
      updatedFinishedSteps.push("RiskSummary");
    }

    // remove from disabledSteps
    const findRiskSummary = updatedDisabledSteps.indexOf("RiskSummary");
    if (findRiskSummary !== -1) {
      updatedDisabledSteps.splice(findRiskSummary, 1);
    }

    // remove from disabledSteps (next step)
    const findProducts = updatedDisabledSteps.indexOf("Products");
    if (findProducts !== -1) {
      updatedDisabledSteps.splice(findProducts, 1);
    }

    // for AMP only
    const findProductsConfirmation = disabledSteps.indexOf("ProductsConfirmation");
    if (findProductsConfirmation !== -1 && accountDetails.ampDetails !== undefined) {
      updatedDisabledSteps.splice(findProductsConfirmation, 1);
    }

    if (accountDetails.ampDetails !== undefined) {
      handleInvest();
    }

    updateNewSales({ ...newSales, disabledSteps: updatedDisabledSteps, finishedSteps: updatedFinishedSteps });

    const route: TypeNewSalesRoute = accountDetails.ampDetails !== undefined ? "ProductsConfirmation" : "ProductsList";

    handleNextStep(route);
  };

  const handleEdit = () => {
    addPersonalInfo({ ...personalInfo, editMode: true });

    handleNextStep("RiskAssessment");
  };

  const handlePrincipalProfile = () => {
    setCurrentProfile("Principal");
    setPage("profile");
  };

  const ampDetailsArray: LabeledTitleProps[] = [];
  if (fundType === "amp") {
    ampDetailsArray.push(
      {
        label: RISK_ASSESSMENT.LABEL_LANDING_FUND,
        title: ampDetails?.landingFund,
      },
      {
        label: RISK_ASSESSMENT.NEW_SALES_RISK_CATEGORY,
        title: ampDetails?.riskCategory,
      },
    );
  }

  const handleJointProfile = () => {
    setCurrentProfile("Joint");
    setPage("profile");
  };

  const handleBackToInvestor = () => {
    if (handleCancelNewSales !== undefined) {
      handleCancelNewSales(investors.backToInvestorOverview);
    }
  };

  const handleAccountDetails = () => {
    setPage("accountDetails");
  };

  const handleProfilePage = (_: number) => {
    setPage("accountSummary");
  };

  const handleInvestorProfileBack = () => {
    let nextPage: TRiskProfilePages = "accountSummary";

    if (prevPage === "accountDetails") {
      nextPage = "accountDetails";
    }
    if (prevPage === "orderSummary") {
      nextPage = "orderSummary";
    }
    if (nextPage === "accountSummary") {
      setCurrentClientId("");
    }

    setPage(nextPage);
  };

  const handleAims = () => {
    setAimsOpen(true);
  };

  const accountTitle = `${client.accountType} ${RISK_ASSESSMENT.LABEL_ACCOUNT}`;

  const buttonStyle: ViewStyle = {
    ...centerHorizontal,
    ...flexRow,
    width: sw120,
    ...px(sw16),
    ...py(sh4),
    ...border(colorBlue._1, sw1, sw24),
    backgroundColor: colorWhite._1,
    borderColor: colorRed._1,
    borderWidth: sw1,
    height: sh24,
  };

  const checkEpf = isEpf === true ? "EPF" : "Cash";
  const tags = accountNo !== "" ? [getProductTagType(fundType), checkEpf] : [];
  // const checkJointHeader = accountType === "Joint" ? RISK_ASSESSMENT.NEW_SALES_HEADING_2_JOINT : RISK_ASSESSMENT.NEW_SALES_HEADING_2;
  const header = accountNo !== "" ? RISK_ASSESSMENT.NEW_SALES_HEADING_2_SALES : RISK_ASSESSMENT.NEW_SALES_HEADING_2;
  // const checkJointSubtitle = accountType === "Joint" ? RISK_ASSESSMENT.NEW_SALES_HEADING_3_JOINT : RISK_ASSESSMENT.NEW_SALES_HEADING_3;
  const subtitle = accountNo !== "" ? RISK_ASSESSMENT.NEW_SALES_HEADING_3_SALES : RISK_ASSESSMENT.NEW_SALES_HEADING_3;
  const checkAccountNo = accountNo !== "" ? accountNo : null;

  const checkLabel = client.accountType === "Joint" ? NEW_SALES_SUMMARY.LABEL_PRINCIPAL_PROFILE : NEW_SALES_SUMMARY.LABEL_INVESTOR_PROFILE;

  const containerStyle: ViewStyle = {
    ...flexRow,
    borderRadius: sw24,
    borderWidth: sw1,
    borderColor: colorBlue._1,
    height: sh24,
    maxWidth: sw228,
  };

  const profileButtonStyle: ViewStyle = {
    ...px(sw16),
    ...autoWidth,
    backgroundColor: colorTransparent,
    height: sh24,
    borderWidth: 0,
  };

  const headerStyle: TextStyle = {
    ...fs24BoldGray6,
    maxWidth: sw638,
  };

  const checkPrincipalId =
    accountDetails.accountNo !== "" ? details?.principalHolder?.clientId : newSales.investorProfile.principalClientId;
  const checkJointId = accountDetails.accountNo !== "" ? details?.jointHolder?.clientId : newSales.investorProfile.jointClientId;
  const checkCurrentProfile = currentProfile === "Principal" ? checkPrincipalId : checkJointId;
  const clientId = currentClientId !== "" ? currentClientId : checkCurrentProfile;
  const scaledSpace = DEVICE.SCREEN.WIDTH > 1080 ? scaledSpaceBetween() : sw32;

  const profileContent = (
    <ContentPage heading={RISK_ASSESSMENT.NEW_SALES_HEADING} headingStyle={headerStyle}>
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        <View style={flexRow}>
          <TextSpaceArea style={defaultContentProps.subheadingStyle} text={header} />
          <CustomFlexSpacer />
          <View style={containerStyle}>
            <CustomButton
              secondary={true}
              buttonStyle={profileButtonStyle}
              onPress={handlePrincipalProfile}
              text={checkLabel}
              textStyle={fs10BoldBlue1}
            />
            {client.accountType === "Joint" ? (
              <Fragment>
                <View style={{ borderLeftWidth: sw1, borderColor: colorBlue._1 }} />
                <CustomButton
                  secondary={true}
                  buttonStyle={profileButtonStyle}
                  onPress={handleJointProfile}
                  text={NEW_SALES_SUMMARY.LABEL_JOINT_PROFILE}
                  textStyle={fs10BoldBlue1}
                />
              </Fragment>
            ) : null}
          </View>
        </View>
        <TextSpaceArea spaceToTop={defaultContentProps.spaceToTitle} style={defaultContentProps.subtitleStyle} text={subtitle} />
      </View>
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        <ColorCard
          containerStyle={noBorder}
          content={<TextCard data={accountDetailsArray} itemsPerGroup={3} spaceBetweenItem={scaledSpace} itemStyle={{ width: sw239 }} />}
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
          headerStyle={{
            ...border(colorBlue._3, sw1),
            ...px(0),
            ...py(sh8),
            backgroundColor: colorBlue._3,
            borderBottomColor: colorRed._1,
          }}
        />
        {accountNo !== "" ? (
          <Fragment>
            <CustomSpacer space={sh24} />
            <ColorCard
              containerStyle={noBorder}
              content={
                <View>
                  <View style={flexRow}>
                    <Text style={fs16RegBlack2}>{RISK_ASSESSMENT.NEW_SALES_PRODUCT_AND_SERVICE_HINT}</Text>
                    <CustomFlexSpacer />
                    <Pressable onPress={handleAims} style={buttonStyle}>
                      <Text style={fs10BoldGray6}>{RISK_ASSESSMENT.NEW_SALES_PRODUCT_AND_SERVICE_CHECK_AIMS}</Text>
                      <CustomSpacer isHorizontal={true} space={sw8} />
                      <IcoMoon color={colorBlue._1} name="external" size={sw16} />
                    </Pressable>
                  </View>
                  {fundType === "amp" ? (
                    <Fragment>
                      <CustomSpacer space={sh24} />
                      <View style={flexRow}>
                        <IcoMoon color={colorBlue._1} name="fund" size={sw24} />
                        <CustomSpacer isHorizontal={true} space={sw8} />
                        <Text style={fs16BoldBlue1}>{ampDetails?.fundAbbr || "-"}</Text>
                        <CustomSpacer isHorizontal={true} space={sw16} />
                        <View style={{ ...flexChild, ...centerHorizontal }}>
                          <View style={borderBottomBlue4} />
                        </View>
                      </View>
                      <Text style={{ ...fs12RegGray5, paddingLeft: sw32 }}>{ampDetails?.issuingHouse || "-"}</Text>
                      <CustomSpacer space={sh12} />
                      <TextCard
                        data={ampDetailsArray}
                        itemsPerGroup={3}
                        spaceBetweenItem={sw32}
                        spaceBetweenGroup={0}
                        itemStyle={{ width: sw240 }}
                      />
                    </Fragment>
                  ) : null}
                </View>
              }
              contentStyle={{ ...border(colorBlue._3, sw1), ...px(sw24), ...py(sh24) }}
              header={{ label: RISK_ASSESSMENT.NEW_SALES_PRODUCT_AND_SERVICE, labelStyle: fs16BoldBlue1 }}
              headerStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorWhite._1, ...px(sw24), ...py(sh16) }}
            />
          </Fragment>
        ) : null}
        <CustomSpacer space={sh24} />
        <ColorCard
          containerStyle={noBorder}
          content={<TextCard data={riskProfileData} itemsPerGroup={3} spaceBetweenItem={scaledSpace} itemStyle={{ width: sw239 }} />}
          contentStyle={{ ...border(colorBlue._3, sw1), ...px(sw24), paddingBottom: sh8 }}
          customHeader={
            <View style={{ ...rowCenterVertical, ...px(sw24) }}>
              <View>
                <Text style={fs16BoldBlue1}>{RISK_ASSESSMENT.HEADING_RISK}</Text>
                {isEmpty(updatedRisk) || (isNotEmpty(updatedRisk) && updatedRisk.appetite === "") ? (
                  <Fragment>
                    <View style={rowCenterVertical}>
                      <Image source={LocalAssets.icon.iconWarning} style={{ width: sw16, height: sh16 }} />
                      <CustomSpacer isHorizontal={true} space={sw8} />
                      <Text style={{ ...fs12RegBlack2, color: colorYellow._2 }}>{RISK_ASSESSMENT.SUBHEADING_RISK_TO_PROCEED}</Text>
                    </View>
                  </Fragment>
                ) : null}
              </View>
              {isRiskUpdated === true ? (
                <Fragment>
                  <CustomSpacer isHorizontal={true} space={sw8} />
                  <View style={{ ...border(colorBlue._9, sw05, sw4), ...px(sw4) }}>
                    <Text style={fs10RegBlue9}>{RISK_ASSESSMENT.LABEL_UPDATED}</Text>
                  </View>
                </Fragment>
              ) : null}
              <CustomFlexSpacer />
              <IconButton
                color={colorBlue._1}
                name="pencil"
                onPress={handleEdit}
                size={sw20}
                style={{ ...circle(sw40, colorWhite._1) }}
                withHover={{ color: colorBlue._2 }}
              />
            </View>
          }
          headerStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorWhite._1, ...px(0) }}
          header="custom"
        />
      </View>
    </ContentPage>
  );
  let content: JSX.Element = <View />;
  if (page === "accountSummary") {
    content = profileContent;
  }
  if (page === "profile") {
    content = <InvestorProfilePage clientId={clientId!} handleBack={handleInvestorProfileBack} setPage={handleProfilePage} />;
  }
  if (page === "accountDetails") {
    content = (
      <View style={flexChild}>
        <CustomSpacer space={sh24} />
        <NewSalesAccountInformation
          accountNo={accountNo}
          clientId={clientId!}
          setClientId={setCurrentClientId}
          setCurrentOrder={setCurrentOrder}
          setScreen={setPage}
        />
      </View>
    );
  }
  if (page === "orderSummary") {
    content = (
      <View style={flexChild}>
        <CustomSpacer space={sh24} />
        <NewSalesOrderSummary
          accountNo={accountNo}
          clientId={clientId!}
          order={currentOrder!}
          setClientId={setCurrentClientId}
          setCurrentOrder={setCurrentOrder}
          setScreen={setPage}
        />
      </View>
    );
  }
  return (
    <View style={flexChild}>
      {content}
      {page === "accountSummary" ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <SelectionBanner
            cancelOnPress={handleBackToInvestor}
            continueDisabled={isEmpty(updatedRisk) || (isNotEmpty(updatedRisk) && updatedRisk.appetite === "")}
            label={RISK_ASSESSMENT.NEW_SALES_ACCOUNT_SUMMARY}
            labelStyle={fs20BoldBlack2}
            labelCancel={RISK_ASSESSMENT.BUTTON_CANCEL}
            labelSubmit={RISK_ASSESSMENT.BUTTON_NEXT}
            submitOnPress={handlePageContinue}
            bottomContent={
              isRiskUpdated === true ? (
                <Fragment>
                  <View style={flexRow}>
                    <Text style={fs16BoldGray6}>{RISK_ASSESSMENT.BANNER_RISK_ASSESSMENT}</Text>
                    <CustomSpacer isHorizontal space={sw4} />
                    <Text style={fs16RegGray6}>{RISK_ASSESSMENT.BANNER_UPDATED}</Text>
                  </View>
                </Fragment>
              ) : null
            }
          />
        </Fragment>
      ) : null}
    </View>
  );
};

export const NewSalesRiskSummary = connect(RiskMapStateToProps, RiskMapDispatchToProps)(NewSalesRiskSummaryComponent);
