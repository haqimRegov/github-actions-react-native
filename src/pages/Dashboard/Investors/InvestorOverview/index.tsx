import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import {
  CustomFlexSpacer,
  CustomSpacer,
  IconButton,
  LabeledTitle,
  NewPromptModal,
  Pagination,
  PromptModal,
  Tab,
} from "../../../../components";
import { DATE_OF_BIRTH_FORMAT, DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import { DICTIONARY_COUNTRIES } from "../../../../data/dictionary";
import { clientRegister } from "../../../../network-actions";
import { InvestorsMapDispatchToProps, InvestorsMapStateToProps, InvestorsStoreProps } from "../../../../store";
import {
  alignFlexStart,
  border,
  borderBottomGray2,
  centerHV,
  centerVertical,
  circle,
  colorBlue,
  colorRed,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs12RegBlue5,
  fs16BoldBlue1,
  fs16RegGray5,
  fs24BoldGray6,
  fullHW,
  fullWidth,
  px,
  py,
  sh140,
  sh16,
  sh24,
  sh4,
  sh48,
  sh72,
  sh8,
  shadow12Black112,
  shadow4Blue008,
  sw1,
  sw100,
  sw2,
  sw20,
  sw212,
  sw24,
  sw26,
  sw8,
} from "../../../../styles";
import { DashboardLayout } from "../../DashboardLayout";
import { AccountListing } from "./AccountListing";
import { InvestorAccountsHeader } from "./Header";

const { DASHBOARD_INVESTORS_LIST, INVESTOR_ACCOUNTS } = Language.PAGE;

interface InvestorOverviewProps extends InvestorsStoreProps {
  activeTab: InvestorsTabType;
  handleRoute: (route: DashboardPageType) => void;
  isLogout: boolean;
  setActiveTab: (route: InvestorsTabType) => void;
  setScreen: (route: InvestorsPageType) => void;
}

export const InvestorOverviewComponent: FunctionComponent<InvestorOverviewProps> = ({
  addClientDetails,
  addPersonalInfo,
  client,
  currentInvestor,
  newSales,
  personalInfo,
  resetClientDetails,
  updateCurrentAccount,
  updateShowOpenAccount,
  updateNewSales,
  ...dashboardProps
}: InvestorOverviewProps) => {
  const navigation = useNavigation<IStackNavigationProp>();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingNewSales, setLoadingNewSales] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<number>(-1);
  const [newSalesModal, setNewSalesModal] = useState<boolean>(false);
  const [forceUpdatePrompt, setForceUpdatePrompt] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [sort, setSort] = useState<IInvestorAccountsSort[]>([{ column: "accountOpeningDate", value: "descending" }]);
  const [investorData, setInvestorData] = useState<IInvestor | undefined>(undefined);

  const modalData: LabeledTitleProps[] = [
    {
      label: INVESTOR_ACCOUNTS.LABEL_INDIVIDUAL_ACCOUNT,
      title: INVESTOR_ACCOUNTS.LABEL_INDIVIDUAL_ACCOUNT_SUB,
    },
    {
      label: INVESTOR_ACCOUNTS.LABEL_JOINT_ACCOUNT,
      title: INVESTOR_ACCOUNTS.LABEL_JOINT_ACCOUNT_SUB,
    },
  ];

  const handleNext = () => {
    if (loading === false) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (loading === false) {
      setPage(page - 1);
    }
  };

  const handleBackToInvestorList = () => {
    if (client.details?.principalHolder?.name !== "") {
      resetClientDetails();
    }
    dashboardProps.setScreen("InvestorList");
  };

  const handleCancelForceUpdate = () => {
    if (client.isForceUpdate === true) {
      updateShowOpenAccount(true);
      resetClientDetails();
      dashboardProps.handleRoute("Transactions");
    } else {
      resetClientDetails();
      handleBackToInvestorList();
    }
  };

  const handleNewSalesPrompt = () => {
    setNewSalesModal(true);
  };

  const handleNewSalesPromptCancel = () => {
    setNewSalesModal(false);
    if (accountType !== -1) {
      setAccountType(-1);
    }
  };

  const handleClientRegister = async () => {
    // TODO joint integration
    if (investorData !== undefined) {
      setLoadingNewSales(true);
      const principalDob =
        investorData.dateOfBirth && investorData.idType !== "NRIC"
          ? { dateOfBirth: moment(investorData.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) }
          : {};
      const request: IClientRegisterRequest = {
        accountType: accountType === 0 ? "Individual" : "Joint",
        isEtb: true,
        isNewFundPurchased: false,
        principalHolder: {
          ...principalDob,
          id: investorData.idNumber,
          idType: investorData.idType,
          name: investorData.name!,
        },
      };
      const clientRegisterResponse: IClientRegisterResponse = await clientRegister(request, navigation, setLoading);
      setLoadingNewSales(false);
      if (clientRegisterResponse !== undefined) {
        const { data, error } = clientRegisterResponse;
        if (error === null && data !== null) {
          const riskInfo = data.result.riskInfo !== undefined && data.result.riskInfo !== null ? data.result.riskInfo : undefined;
          // TODO add jointClientId
          updateNewSales({ ...newSales, investorProfile: { principalClientId: investorData.clientId }, riskInfo: riskInfo });
          addClientDetails({
            ...client.details,
            principalHolder: {
              ...client.details!.principalHolder,
              dateOfBirth: investorData.dateOfBirth,
              clientId: data.result.principalHolder.clientId,
              id: investorData.idNumber,
              name: investorData.name,
            },
            initId: `${data.result.initId}`,
            accountHolder: "Principal",
          });
          addPersonalInfo({
            ...personalInfo,
            principal: {
              ...personalInfo.principal,
              personalDetails: {
                ...personalInfo.principal?.personalDetails,
                dateOfBirth: moment(data.result.principalHolder.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
                expirationDate: undefined,
                idNumber: data.result.principalHolder.id,
                idType: data.result.principalHolder.idType,
                name: data.result.principalHolder.name,
                nationality: data.result.principalHolder.idType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
              },
            },
          });

          setNewSalesModal(false);
          navigation.navigate("NewSales");
        }
      }
    }
  };

  const handleNewSales = () => {
    if (accountType === 0) {
      return handleClientRegister();
    }
    setAccountType(-1);
    return setNewSalesModal(false);
  };

  const handleForceUpdate = () => {
    if (investorData !== undefined) {
      setForceUpdatePrompt(false);
      addClientDetails({
        ...client.details,
        principalHolder: {
          ...client.details!.principalHolder,
          dateOfBirth: investorData.dateOfBirth,
          clientId: investorData.clientId,
          id: investorData.idNumber,
        },
        initId: investorData.initId,
        accountHolder: investorData.accountHolder,
      });
      addPersonalInfo({
        ...personalInfo,
        principal: {
          ...personalInfo.principal,
          addressInformation: {
            ...personalInfo.principal?.addressInformation,
            mailingAddress: investorData.address,
          },
          personalDetails: {
            ...personalInfo.principal?.personalDetails,
            dateOfBirth: moment(investorData.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
            name: investorData.name,
          },
        },
      });
      navigation.navigate("ForceUpdate");
    }
  };

  const handleViewAccount = (accountToView: ICurrentAccount) => {
    updateCurrentAccount(accountToView);
    dashboardProps.setScreen("AccountInformation");
  };

  const handleViewProfile = () => {
    if (investorData !== undefined) {
      updateCurrentAccount({ accountNumber: undefined, clientId: investorData.clientId });
      dashboardProps.setScreen("InvestorProfile");
    }
  };

  const etbCheckInvestor: IInvestorData =
    client.isForceUpdate === true || client.isNewSales === true
      ? {
          clientId: "",
          idNumber: client.details?.principalHolder?.id!,
          name: "",
          email: "",
          riskTolerance: "",
          mobileNo: "",
        }
      : currentInvestor!;

  const tabProps = {
    currentInvestor: etbCheckInvestor,
    investorData,
    isFetching: loading,
    isLogout: dashboardProps.isLogout,
    navigation: navigation,
    page,
    pages,
    setForceUpdatePrompt,
    setInvestorData,
    setIsFetching: setLoading,
    setPage,
    setPages,
    setScreen: dashboardProps.setScreen,
    setSort,
    sort,
  };

  const content: JSX.Element = <AccountListing handleViewAccount={handleViewAccount} {...tabProps} />;

  const tableContainer: ViewStyle = {
    ...flexChild,
    backgroundColor: colorWhite._2,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
  };

  const headerData = {
    email: investorData !== undefined ? investorData.email : undefined,
    emailLastUpdated: investorData !== undefined ? investorData.emailLastUpdated : undefined,
    handleNewSales: handleNewSalesPrompt,
    handleViewProfile: handleViewProfile,
    mobileNo: investorData !== undefined ? investorData.mobileNo : undefined,
    mobileNoLastUpdated: investorData !== undefined ? investorData.mobileNoLastUpdated : undefined,
    name: investorData !== undefined ? investorData.name : undefined,
    setScreen: dashboardProps.setScreen,
  };

  const promptLabel = `${INVESTOR_ACCOUNTS.PROMPT_LABEL} ${investorData !== undefined ? investorData.name : "-"}.`;

  return (
    <Fragment>
      <View style={fullHW}>
        <DashboardLayout
          {...dashboardProps}
          navigation={navigation}
          hideQuickActions={true}
          titleIconOnPress={handleBackToInvestorList}
          title={DASHBOARD_INVESTORS_LIST.LABEL_INVESTOR_OVERVIEW}
          titleIcon="arrow-left">
          <View style={flexChild}>
            <CustomSpacer space={sh24} />
            <InvestorAccountsHeader {...headerData} />
            <View
              style={{
                ...flexChild,
                ...shadow12Black112,
                marginHorizontal: sw24,
                backgroundColor: colorWhite._2,
                borderRadius: sw24,
              }}>
              <CustomSpacer space={sh140} />
              <CustomSpacer space={sh16} />
              <View style={flexRow}>
                <Tab
                  badgeCount={investorData !== undefined ? investorData.totalCount : 0}
                  selected={true}
                  style={{ height: sh48 }}
                  text={INVESTOR_ACCOUNTS.LABEL_ACCOUNTS}
                />
                <View style={{ ...flexRow, ...flexChild, ...borderBottomGray2 }}>
                  <CustomFlexSpacer />
                  <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={page} totalPages={pages} />
                  <CustomSpacer isHorizontal={true} space={sw24} />
                </View>
              </View>
              <CustomSpacer space={sh16} />
              <View style={tableContainer}>{content}</View>
            </View>
          </View>
          <CustomSpacer space={sh24} />
        </DashboardLayout>
      </View>
      <PromptModal
        handleCancel={handleCancelForceUpdate}
        handleContinue={handleForceUpdate}
        illustration={LocalAssets.illustration.investorWarning}
        label={promptLabel}
        spaceToIllustration={sh24}
        title={INVESTOR_ACCOUNTS.PROMPT_TITLE}
        visible={forceUpdatePrompt}
      />
      <NewPromptModal
        contentStyle={alignFlexStart}
        primary={{
          disabled: accountType === -1,
          loading: loadingNewSales,
          onPress: handleNewSales,
          buttonStyle: { width: sw212 },
          text: INVESTOR_ACCOUNTS.BUTTON_GET_STARTED,
        }}
        secondary={{ onPress: handleNewSalesPromptCancel, buttonStyle: { width: sw212 }, text: INVESTOR_ACCOUNTS.BUTTON_CANCEL }}
        spaceToTitle={sh4}
        subtitle={INVESTOR_ACCOUNTS.NEW_SALES_PROMPT_SUBTITLE}
        subtitleStyle={fs16RegGray5}
        title={INVESTOR_ACCOUNTS.NEW_SALES_PROMPT_TITLE}
        titleStyle={fs24BoldGray6}
        visible={newSalesModal}>
        <View style={fullWidth}>
          <View>
            <CustomSpacer space={sh8} />
            {modalData.map((eachCard: LabeledTitleProps, index: number) => {
              const { label, title } = eachCard;
              const handlePress = () => {
                setAccountType(index);
              };
              const containerStyle: ViewStyle = {
                ...centerHV,
                ...border(accountType !== undefined && accountType === index ? colorBlue._1 : colorWhite._1, sw2, sw8),
                ...px(sw24),
                ...py(sh16),
                backgroundColor: accountType !== undefined && accountType === index ? colorBlue._3 : colorWhite._1,
                height: sh72,
                ...shadow4Blue008,
              };
              const iconStyle: ViewStyle = {
                ...circle(sw26, colorTransparent),
                ...border(accountType !== undefined && accountType === index ? colorRed._1 : colorBlue._1, sw1, sw100),
                ...centerHV,
                backgroundColor: accountType !== undefined && accountType === index ? colorRed._1 : colorTransparent,
              };

              const iconColor = accountType !== undefined && accountType === index ? colorWhite._1 : colorBlue._1;

              return (
                <Fragment key={index}>
                  <CustomSpacer space={sh16} />
                  <Pressable onPress={handlePress} style={containerStyle}>
                    <View style={{ ...flexRow, ...centerVertical }}>
                      <LabeledTitle label={label} labelStyle={fs16BoldBlue1} title={title} titleStyle={fs12RegBlue5} />
                      <CustomFlexSpacer />
                      <View style={iconStyle}>
                        <IconButton color={iconColor} name="check" onPress={handlePress} size={sw20} />
                      </View>
                    </View>
                  </Pressable>
                </Fragment>
              );
            })}
          </View>
        </View>
      </NewPromptModal>
    </Fragment>
  );
};

export const InvestorOverview = connect(InvestorsMapStateToProps, InvestorsMapDispatchToProps)(InvestorOverviewComponent);
