import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";
import { View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { CustomFlexSpacer, CustomSpacer, Pagination, PromptModal, Tab } from "../../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import { InvestorsMapDispatchToProps, InvestorsMapStateToProps, InvestorsStoreProps } from "../../../../store";
import {
  borderBottomGray2,
  colorWhite,
  flexChild,
  flexRow,
  fullHW,
  sh140,
  sh16,
  sh24,
  sh48,
  shadow12Black112,
  sw24,
} from "../../../../styles";
import { DashboardLayout } from "../../DashboardLayout";
import { AccountListing } from "./AccountListing";
import { InvestorAccountsHeader } from "./Header";

const { DASHBOARD_INVESTORS_LIST, INVESTOR_ACCOUNTS } = Language.PAGE;

interface InvestorOverviewProps extends InvestorsStoreProps {
  activeTab: InvestorsTabType;
  isLogout: boolean;
  setActiveTab: (route: InvestorsTabType) => void;
  setScreen: (route: InvestorsPageType) => void;
}

const initialData: IInvestor = {
  email: "",
  emailLastUpdated: "",
  isForceUpdate: false,
  investorDetails: [],
  mobileNo: "",
  mobileNoLastUpdated: "",
  name: "",
  totalCount: 0,
};

export const InvestorOverviewComponent: FunctionComponent<InvestorOverviewProps> = ({
  addClientDetails,
  addPersonalInfo,
  client,
  currentInvestor,
  personalInfo,
  resetClientDetails,
  updateCurrentAccount,
  ...dashboardProps
}: InvestorOverviewProps) => {
  // eslint-disable-next-line no-console
  console.log("InvestorOverview currentInvestor", currentInvestor);

  const navigation = useNavigation<IStackNavigationProp>();

  const [loading, setLoading] = useState<boolean>(false);
  const [forceUpdatePrompt, setForceUpdatePrompt] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [sort, setSort] = useState<IInvestorAccountsSort[]>([{ column: "accountOpeningDate", value: "descending" }]);
  const [investorData, setInvestorData] = useState<IInvestor>(initialData);

  const { name, email, emailLastUpdated, mobileNo, mobileNoLastUpdated } = investorData;

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
    dashboardProps.setScreen("InvestorList");
  };

  const handleCancelForceUpdate = () => {
    if (forceUpdatePrompt === true) {
      resetClientDetails();
      setForceUpdatePrompt(false);
    }

    handleBackToInvestorList();
  };

  const handleForceUpdate = () => {
    setForceUpdatePrompt(false);
    addClientDetails({
      ...client.details,
      principalHolder: {
        ...client.details!.principalHolder,
        dateOfBirth: investorData.investorDetails[0].dateOfBirth,
        clientId: investorData.investorDetails[0].clientId,
        id: investorData.investorDetails[0].idNumber,
      },
      initId: investorData.investorDetails[0].initId,
      accountHolder: investorData.investorDetails[0].accountHolder,
    });
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        addressInformation: {
          ...personalInfo.principal?.addressInformation,
          mailingAddress: investorData.investorDetails[0].address,
          permanentAddress: investorData.investorDetails[0].address,
        },
        personalDetails: {
          ...personalInfo.principal?.personalDetails,
          dateOfBirth: moment(investorData.investorDetails[0].dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
          name: investorData.name,
        },
      },
    });
    navigation.navigate("ForceUpdate");
  };

  const handleViewAccount = (accountToView: IInvestorAccountsData) => {
    updateCurrentAccount(accountToView);
    dashboardProps.setScreen("AccountInformation");
  };

  const etbCheckInvestor: IInvestorData =
    client.isForceUpdate === true
      ? {
          clientId: client.details?.principalHolder?.clientId!,
          idNumber: client.details?.principalHolder?.id!,
          name: client.details?.principalHolder?.name!,
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
    email,
    emailLastUpdated,
    mobileNo,
    mobileNoLastUpdated,
    name,
    setScreen: dashboardProps.setScreen,
  };

  const promptLabel = `${INVESTOR_ACCOUNTS.PROMPT_LABEL} ${etbCheckInvestor.name}.`;

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
                  badgeCount={investorData!.totalCount}
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
    </Fragment>
  );
};

export const InvestorOverview = connect(InvestorsMapStateToProps, InvestorsMapDispatchToProps)(InvestorOverviewComponent);
