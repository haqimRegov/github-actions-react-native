import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { CustomFlexSpacer, CustomSpacer, Loading, Pagination, PromptModal, RNModal, Tab } from "../../../../components";
import { DATE_OF_BIRTH_FORMAT, DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import { DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE } from "../../../../data/dictionary";
import { getProductTabType } from "../../../../helpers";
import { checkClient, clientRegister } from "../../../../network-actions";
import {
  ClientStoreProps,
  InvestorsMapDispatchToProps,
  InvestorsMapStateToProps,
  InvestorsStoreProps,
  productsInitialFilter,
} from "../../../../store";
import {
  borderBottomGray2,
  centerHV,
  colorBlack,
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
import { isNotEmpty } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { AccountListing } from "./AccountListing";
import { IInvestorAccountHeaderProps, InvestorAccountsHeader } from "./Header";
import { NewSalesPrompt } from "./NewSalesPrompt";

const { DASHBOARD_INVESTORS_LIST, INVESTOR_ACCOUNTS } = Language.PAGE;

interface InvestorOverviewProps extends InvestorsStoreProps, ClientStoreProps {
  activeTab: InvestorsTabType;
  handleRoute: (route: DashboardPageType) => void;
  isLogout: boolean;
  setActiveTab: (route: InvestorsTabType) => void;
  setScreen: (route: InvestorsPageType) => void;
}

declare interface IIdType {
  idType: TypeIDChoices;
  otherIdType?: TypeIDOther;
}

const initialJointInfo = {
  name: "",
  country: "",
  dateOfBirth: "",
  id: "",
  idType: DICTIONARY_ID_TYPE[0],
  otherIdType: DICTIONARY_ID_OTHER_TYPE[0].value,
};

export const InvestorOverviewComponent: FunctionComponent<InvestorOverviewProps> = ({
  // addAccountDetails,
  addAccountType,
  // addRiskInfo,
  addRiskScore,
  addClientDetails,
  addPersonalInfo,
  addUtFilters,
  client,
  currentInvestor,
  newSales,
  personalInfo,
  resetClientDetails,
  riskAssessment,
  updateClient,
  updateCurrentAccount,
  updateShowOpenAccount,
  updateNewSales,
  updateTransactionType,
  updateProductType,
  ...dashboardProps
}: InvestorOverviewProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const [newSalesLoading, setNewSalesLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<number>(-1);
  const [forceUpdatePrompt, setForceUpdatePrompt] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [sort, setSort] = useState<IInvestorAccountsSort[]>([{ column: "accountOpeningDate", value: "descending" }]);
  const [investorData, setInvestorData] = useState<IInvestor | undefined>(undefined);
  const [registered, setRegistered] = useState<boolean>(false);
  const [isNtb, setIsNtb] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [inputError1, setInputError1] = useState<string | undefined>(undefined);
  const fullScreenLoader = useRef<boolean>(false);
  const jointClientId = useRef<string>("");
  const { jointHolder } = client.details!;

  const jointIdType = jointHolder?.idType === "Other" ? jointHolder?.otherIdType : jointHolder?.idType;
  // const principalIdType = principalHolder?.idType === "Other" ? principalHolder?.otherIdType : principalHolder?.idType;

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
    setPrompt(true);
  };

  const handleClientRegister = async (req?: IClientRegisterRequest, item?: IInvestorAccountsData): Promise<undefined | boolean> => {
    if (newSalesLoading === false || fullScreenLoader.current === true) {
      setNewSalesLoading(true);
      fullScreenLoader.current = fullScreenLoader.current === false && req === undefined;
      const principalDob =
        investorData?.dateOfBirth && investorData.idType !== "NRIC"
          ? { dateOfBirth: moment(investorData?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) }
          : {};
      const jointDob =
        jointHolder?.dateOfBirth && jointHolder.idType !== "NRIC"
          ? { dateOfBirth: moment(jointHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) }
          : {};
      const jointInfo =
        accountType === 1
          ? {
              ...jointDob,
              id: jointHolder?.id!,
              idType: jointIdType,
              name: jointHolder?.name!,
            }
          : undefined;
      const request: IClientRegisterRequest =
        req !== undefined
          ? req
          : {
              accountType: accountType === 1 ? "Joint" : "Individual",
              isEtb: isNtb !== true,
              isNewFundPurchased: false,
              principalHolder: {
                ...principalDob,
                id: investorData?.idNumber!,
                idType: investorData!.idType,
                name: investorData?.name!,
              },
              jointHolder: jointInfo,
            };
      const clientResponse: IClientRegisterResponse = await clientRegister(request, navigation);
      setNewSalesLoading(false);
      fullScreenLoader.current = false;
      if (clientResponse !== undefined) {
        const { data, error } = clientResponse;
        if (error === null && data !== null) {
          let riskInfo: IRiskProfile | undefined;
          if (data.result.riskInfo !== undefined && data.result.riskInfo !== null) {
            if (isNtb !== true) {
              riskInfo = data.result.riskInfo;
              addRiskScore({
                ...riskAssessment,
                appetite: data.result.riskInfo.appetite,
                rangeOfReturn: data.result.riskInfo.expectedRange,
                profile: data.result.riskInfo.profile,
                type: data.result.riskInfo.type,
                fundSuggestion: "",
                netWorth: data.result.riskInfo.hnwStatus,
              });
            }
            updateNewSales({
              ...newSales,
              investorProfile: {
                ...newSales.investorProfile,
                principalClientId: investorData!.clientId,
                jointClientId: jointClientId.current,
              },
              riskInfo: riskInfo,
              accountDetails: {
                ...newSales.accountDetails,
                accountNo: item !== undefined ? item.accountNo : newSales.accountDetails.accountNo,
                fundType: item !== undefined ? getProductTabType(item.fundType) : newSales.accountDetails.fundType,
                isRecurring: item !== undefined ? item.isRecurring : newSales.accountDetails.isRecurring,
                isEpf: item !== undefined ? item.paymentMethod.toLowerCase() === "epf" : newSales.accountDetails.isEpf,
              },
            });
          }
          const resetJointInfo =
            accountType !== 1 &&
            (jointHolder?.name !== "" || jointHolder?.country !== "" || jointHolder?.dateOfBirth !== "" || jointHolder?.id !== "");
          let dataJointIdType = {};
          if (isNotEmpty(data.result.jointHolder)) {
            dataJointIdType =
              data.result.jointHolder!.idType !== "NRIC" && data.result.jointHolder!.idType !== "Passport"
                ? { idType: "Other", otherIdType: data.result.jointHolder!.idType as TypeIDOther }
                : { idType: data.result.jointHolder!.idType };
          }
          const storeJointIdType = isNotEmpty(data.result.jointHolder) ? dataJointIdType : {};
          const moreJointInfo =
            data.result.jointHolder !== undefined && data.result.jointHolder !== null
              ? {
                  clientId: data.result.jointHolder.clientId,
                  dateOfBirth: data.result.jointHolder.dateOfBirth,
                  name: data.result.jointHolder.name,
                  ...storeJointIdType,
                }
              : {};
          const storePrincipalIdType: IIdType =
            data.result.principalHolder.idType !== "NRIC" && data.result.principalHolder.idType !== "Passport"
              ? { idType: "Other", otherIdType: data.result.principalHolder.idType as TypeIDOther }
              : { idType: data.result.principalHolder.idType };
          addClientDetails({
            ...client.details,
            principalHolder: {
              ...client.details!.principalHolder,
              clientId: data.result.principalHolder.clientId,
              dateOfBirth: data.result.principalHolder.dateOfBirth,
              id: data.result.principalHolder.id,
              name: data.result.principalHolder.name,
              ...storePrincipalIdType,
            },
            jointHolder: resetJointInfo === true ? { ...initialJointInfo } : { ...jointHolder, ...moreJointInfo },
            initId: data.result.initId.toString(),
            accountHolder: accountType === 1 ? "Joint" : "Principal",
          });
          addAccountType(accountType === 1 || data.result.jointHolder !== null ? "Joint" : "Individual");
          const updatedEmailPrincipal = isNtb !== true ? { emailAddress: investorData?.email } : {};
          const updatedEmailJoint = isNtb !== true && accountType === 1 ? { emailAddress: investorData?.email } : {};
          const updatedJointInfo: IHolderInfoState =
            accountType === 1
              ? {
                  ...personalInfo.joint,
                  contactDetails: {
                    ...personalInfo.joint?.contactDetails,
                    ...updatedEmailJoint,
                  },
                  personalDetails: {
                    ...personalInfo.joint?.personalDetails,
                    dateOfBirth: moment(data.result.jointHolder!.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
                    idNumber: data.result.jointHolder!.id,
                    name: data.result.jointHolder!.name,
                    ...storeJointIdType,
                  },
                }
              : { ...personalInfo.joint };
          addPersonalInfo({
            ...personalInfo,
            principal: {
              ...personalInfo.principal,
              contactDetails: {
                ...personalInfo.principal?.contactDetails,
                ...updatedEmailPrincipal,
              },
              personalDetails: {
                ...personalInfo.principal?.personalDetails,
                dateOfBirth: moment(data.result.principalHolder.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
                idNumber: data.result.principalHolder.id,
                name: data.result.principalHolder.name,
                ...storePrincipalIdType,
              },
            },
            joint: updatedJointInfo,
          });
          jointClientId.current = "";
          if (accountType !== 1 && req === undefined) {
            setPrompt(false);
            navigation.navigate("NewSales");
            return undefined;
          }
          if (accountType === 1 && req === undefined) {
            setRegistered(true);
            return undefined;
          }
          if (req !== undefined) {
            return true;
          }
        }
        return undefined;
      }
    }
    return undefined;
  };

  const handleCheckClient = async (): Promise<boolean | string> => {
    if (newSalesLoading === false) {
      setNewSalesLoading(true);
      const request: IEtbCheckRequest = {
        country: jointHolder?.country,
        dateOfBirth:
          jointHolder?.dateOfBirth && jointHolder.idType !== "NRIC"
            ? moment(jointHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT)
            : "",
        id: jointHolder?.id,
        idType: jointIdType,
        name: jointHolder?.name?.trim(),
      };
      const clientCheck: IEtbCheckResponse = await checkClient(request, navigation);
      if (clientCheck !== undefined) {
        const { data, error } = clientCheck;
        if (error === null && data !== null) {
          setErrorMessage(undefined);
          setInputError1(undefined);
          if (data.result.message === "NTB") {
            // TODO handle NTB flow
            // return setClientType("NTB");
            setNewSalesLoading(false);
            setIsNtb(true);
            await handleClientRegister();
          }
          if (data.result.message === "ETB") {
            if (data.result.forceUpdate === false) {
              jointClientId.current = data.result.clientId!;
              updateClient({
                ...client,
                accountList: data.result.accounts!,
                details: {
                  ...client.details,
                  jointHolder: {
                    ...client.details?.jointHolder,
                    name: jointHolder!.name!.trim(),
                  },
                },
              });
              addPersonalInfo({
                ...personalInfo,
                joint: {
                  ...personalInfo.joint,
                  contactDetails: {
                    ...personalInfo.joint?.contactDetails,
                    emailAddress: data.result.emailAddress,
                  },
                },
              });
              return true;
            }
            // if (data.result.forceUpdate === true) {
            // BE is returning forceUpdate true even if the investor already finished it (supposed to be bug)
            // TODO handle redirection to InvestorOverview even if forceUpdate is false
            setPrompt(false);
            setTimeout(() => {
              setForceUpdatePrompt(true);
            }, 400);
            return false;
            // }
          }
        }
        if (error !== null) {
          return error.message;
        }
      }
      return false;
    }
    return false;
  };

  const handleForceUpdate = () => {
    if (investorData !== undefined) {
      setForceUpdatePrompt(false);
      addClientDetails({
        ...client.details,
        principalHolder: {
          ...client.details!.principalHolder,
          dateOfBirth: accountType === 1 ? jointHolder?.dateOfBirth : investorData.dateOfBirth,
          clientId: accountType === 1 ? jointHolder?.clientId : investorData.clientId,
          id: accountType === 1 ? jointHolder?.id : investorData.idNumber,
        },
        initId: accountType === 1 ? undefined : investorData.initId,
        accountHolder: investorData.accountHolder,
      });
      addPersonalInfo({
        ...personalInfo,
        principal: {
          ...personalInfo.principal,
          addressInformation: {
            ...personalInfo.principal?.addressInformation,
            mailingAddress: accountType === 1 ? undefined : investorData.address,
          },
          personalDetails: {
            ...personalInfo.principal?.personalDetails,
            dateOfBirth:
              accountType === 1
                ? moment(jointHolder!.dateOfBirth, DEFAULT_DATE_FORMAT).toDate()
                : moment(investorData.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
            name: accountType === 1 ? jointHolder?.name : investorData.name,
          },
        },
      });
      setAccountType(0);
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

  const handleBuyNewFund = async (item: IInvestorAccountsData) => {
    const updatedAccountType = item.jointName === null ? "Individual" : "Joint";
    const jointInfo =
      item.jointName !== null
        ? {
            dateOfBirth: item.dateOfBirth,
            id: item.idNumber,
            name: item.name,
          }
        : {};
    const principalInfo: IClientRegisterInfo = {
      id: item.idNumber,
      name: item.name,
    };
    const req: IClientRegisterRequest = {
      accountNo: item.accountNo,
      accountType: updatedAccountType,
      isEtb: true,
      isNewFundPurchased: true,
      principalHolder: principalInfo,
      jointHolder: jointInfo,
    };
    jointClientId.current = item.jointId;
    const forceUpdateRequired = false;

    // TODO Check for force update

    if (forceUpdateRequired === true) {
      setTimeout(() => {
        setForceUpdatePrompt(true);
      }, 400);
    } else {
      const check = await handleClientRegister(req, item);
      if (item.fundType === "UT" && item.paymentMethod === "EPF") {
        const epfFilterArray: string[] = item.paymentMethod === "EPF" ? ["Yes"] : [];
        addUtFilters({ ...productsInitialFilter, epfApproved: epfFilterArray });
      }
      updateProductType(getProductTabType(item.fundType));
      if (check === true) {
        updateTransactionType("Sales-NS");
        navigation.navigate("NewSales");
      }
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

  const content: JSX.Element = <AccountListing handleBuyNewFund={handleBuyNewFund} handleViewAccount={handleViewAccount} {...tabProps} />;

  const tableContainer: ViewStyle = {
    ...flexChild,
    backgroundColor: colorWhite._2,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
  };

  const headerData: IInvestorAccountHeaderProps = {
    email: investorData !== undefined ? investorData.email : undefined,
    emailVerified: investorData !== undefined ? investorData.isForceUpdate === false : undefined,
    handleNewSales: handleNewSalesPrompt,
    handleViewProfile: handleViewProfile,
    mobileNo: investorData !== undefined ? investorData.mobileNo : undefined,
    name: investorData !== undefined ? investorData.name : undefined,
    setScreen: dashboardProps.setScreen,
  };

  const promptLabel = `${INVESTOR_ACCOUNTS.PROMPT_LABEL} ${investorData !== undefined ? investorData.name : "-"}.`;
  const modalStyle = fullScreenLoader.current === false ? undefined : { backgroundColor: colorBlack._1_4 };

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
      <NewSalesPrompt
        errorMessage={errorMessage}
        fetching={newSalesLoading}
        handleCheckClient={handleCheckClient}
        handleClientRegister={handleClientRegister}
        inputError1={inputError1}
        investorData={investorData!}
        isNtb={isNtb}
        modalData={modalData}
        navigation={navigation}
        newAccountType={accountType}
        registered={registered}
        setAccountType={setAccountType}
        setErrorMessage={setErrorMessage}
        setInputError1={setInputError1}
        setRegistered={setRegistered}
        setVisible={setPrompt}
        visible={prompt}
      />
      <RNModal animationType="fade" style={modalStyle} visible={fullScreenLoader.current}>
        <View style={{ ...centerHV, ...fullHW }}>
          <Loading color={colorWhite._1} />
        </View>
      </RNModal>
    </Fragment>
  );
};

export const InvestorOverview = connect(InvestorsMapStateToProps, InvestorsMapDispatchToProps)(InvestorOverviewComponent);
