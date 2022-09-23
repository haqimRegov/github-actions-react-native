import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { Alert, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { CustomFlexSpacer, CustomSpacer, Loading, Pagination, PromptModal, RNModal, Tab } from "../../../../components";
import { DATE_OF_BIRTH_FORMAT, DEFAULT_DATE_FORMAT, Language, NRIC_AGE_FORMAT } from "../../../../constants";
import { DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE } from "../../../../data/dictionary";
import { findDOBFromNric, getAddress, getProductTabType, handleSignatoryFromBE } from "../../../../helpers";
import { checkClient, clientRegister } from "../../../../network-actions";
import { InvestorsMapDispatchToProps, InvestorsMapStateToProps, InvestorsStoreProps, NewSalesState } from "../../../../store";
import {
  borderBottomGray2,
  centerHV,
  colorBlack,
  colorWhite,
  flexChild,
  flexRow,
  fullHW,
  sh16,
  sh24,
  sh48,
  shadow12Black112,
  sw24,
} from "../../../../styles";
import { isArrayNotEmpty, isNotEmpty } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { AccountListing } from "./AccountListing";
import { IInvestorAccountHeaderProps, InvestorAccountsHeader } from "./Header";
import { InvestorSalesPrompt } from "./InvestorSalesPrompt";

const { DASHBOARD_INVESTORS_LIST, INVESTOR_ACCOUNTS } = Language.PAGE;

interface InvestorOverviewProps extends InvestorsStoreProps {
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

declare interface IEtbCheckData extends IEtbCheckResult {
  id: string;
  idType?: string;
  name: string;
  dateOfBirth?: string;
}

const initialJointInfo = {
  name: "",
  country: "",
  dateOfBirth: "",
  id: "",
  idType: DICTIONARY_ID_TYPE[0],
  otherIdType: DICTIONARY_ID_OTHER_TYPE[0].value,
};

const InvestorOverviewComponent: FunctionComponent<InvestorOverviewProps> = ({
  // addAccountDetails,
  addAccountType,
  addRiskScore,
  addClientDetails,
  addPersonalInfo,
  addPrsDefaultFilters,
  addUtFilters,
  client,
  currentInvestor,
  forceUpdate,
  investors,
  newSales,
  personalInfo,
  resetClientDetails,
  riskAssessment,
  updateClient,
  updateCurrentAccount,
  updateCurrentInvestor,
  updateForceUpdate,
  updateInvestors,
  updateShowOpenAccount,
  updateNewSales,
  updateTransactionType,
  updateProductType,
  updateForceUpdateDeclarations,
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
  const [ageErrorMessage, setAgeErrorMessage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [inputError1, setInputError1] = useState<string | undefined>(undefined);
  const [otherInvestorData, setOtherInvestorData] = useState<IEtbCheckData | undefined>(undefined);
  const fullScreenLoader = useRef<boolean>(false);
  const jointClientId = useRef<string>("");
  const jointEmailRef = useRef<string>("");

  const { details, directToAccountOpening, isForceUpdate, isNewSales } = client;
  const { jointHolder, principalHolder } = details!;

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
    if (principalHolder?.name !== "") {
      resetClientDetails();
    }
    dashboardProps.setScreen("InvestorList");
  };

  const handleCancelForceUpdate = () => {
    if (isForceUpdate === true) {
      updateShowOpenAccount(true);
      updateForceUpdateDeclarations([]);
      resetClientDetails();
      dashboardProps.handleRoute("Transactions");
    } else {
      resetClientDetails();
      handleBackToInvestorList();
    }
  };

  const handleAccountOpening = () => {
    setPrompt(true);
  };

  const handleClientRegister = async (
    req?: IClientRegisterRequest,
    item?: IInvestorAccountsData,
    ntb?: boolean,
  ): Promise<undefined | boolean> => {
    if (newSalesLoading === false || fullScreenLoader.current === true) {
      setNewSalesLoading(true);
      fullScreenLoader.current = fullScreenLoader.current === false && req === undefined;

      const isAccountOpening = req === undefined && item === undefined;
      let principalEmail: string | undefined = investorData?.email;
      let jointEmail: string | undefined;
      const principalDob =
        investorData?.dateOfBirth && investorData.idType !== "NRIC"
          ? { dateOfBirth: moment(investorData?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) }
          : {};

      const request: IClientRegisterRequest = {
        accountNo: isAccountOpening === false && item !== undefined ? item.accountNo : undefined,
        accountType: accountType === 1 ? "Joint" : "Individual",
        isEtb: ntb === undefined || ntb !== true,
        isNewFundPurchased: false,
        principalHolder: {
          ...principalDob,
          id: investorData?.idNumber!,
          idType: investorData!.idType,
          name: investorData?.name!,
        },
        jointHolder: undefined,
      };

      if (isAccountOpening === true) {
        if (accountType === 1) {
          // Joint Account Opening, this is always the Joint Holder (the other investor)
          const jointHolderDob =
            jointHolder?.dateOfBirth && jointHolder.idType !== "NRIC"
              ? { dateOfBirth: moment(jointHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) }
              : {};

          const jointHolderIdType = jointHolder?.idType === "Other" ? jointHolder?.otherIdType : jointHolder?.idType;

          request.jointHolder =
            accountType === 1
              ? {
                  ...jointHolderDob,
                  id: jointHolder?.id!,
                  idType: jointHolderIdType as TypeClientID,
                  name: jointHolder?.name!,
                }
              : undefined;

          jointEmail = jointEmailRef.current;
        }
      } else if (isAccountOpening === false && item !== undefined) {
        const isJointAccount = isNotEmpty(item.jointName);

        request.isNewFundPurchased = true;

        if (isJointAccount === true) {
          if (item.accountHolder === "Joint") {
            // Current Investor is the Joint Holder of the Account
            request.jointHolder = { ...request.principalHolder };

            jointEmail = principalEmail;

            const accountPrincipalDob =
              item.dateOfBirth && item.idType !== "NRIC"
                ? { dateOfBirth: moment(item.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) }
                : {};

            request.principalHolder = {
              ...accountPrincipalDob,
              id: item.idNumber,
              idType: item.idType as TypeClientID,
              name: item.name!,
            };

            principalEmail = item.email;
          } else {
            // Current Investor is the Principal Holder of the Account
            const accountJointDob =
              item.jointDateOfBirth && item.jointIdType !== "NRIC"
                ? { dateOfBirth: moment(item.jointDateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) }
                : {};

            request.jointHolder = {
              ...accountJointDob,
              id: item.jointIdNumber,
              idType: item.jointIdType as TypeClientID,
              name: item.jointName!,
            };

            jointEmail = item.jointEmail;
          }
        }
      }

      const clientResponse: IClientRegisterResponse = await clientRegister(request, navigation);
      setNewSalesLoading(false);
      fullScreenLoader.current = false;

      if (clientResponse !== undefined) {
        const { data, error } = clientResponse;
        if (error === null && data !== null) {
          const checkEmptyPaymentFund = isNotEmpty(item) && (item!.paymentMethod === null || item!.fundType === null);
          if (checkEmptyPaymentFund === true) {
            Alert.alert("Payment Method and/or Fund Type is null");
            return undefined;
          }

          let riskInfo: IRiskProfile | undefined;
          if (isNtb !== true && isNotEmpty(data.result.riskInfo)) {
            riskInfo = { ...data.result.riskInfo! };
            addRiskScore({
              ...riskAssessment,
              appetite: data.result.riskInfo!.appetite,
              rangeOfReturn: data.result.riskInfo!.expectedRange,
              profile: data.result.riskInfo!.profile,
              type: data.result.riskInfo!.type,
              fundSuggestion: "",
              netWorth: data.result.riskInfo!.hnwStatus,
            });
          }

          const updatedNewSales: NewSalesState = {
            ...newSales,
            investorProfile: {
              ...newSales.investorProfile,
              principalClientId: investorData!.clientId,
              jointClientId: jointClientId.current,
            },
            riskInfo: { ...newSales.riskInfo, ...riskInfo },
          };

          if (isAccountOpening === false && item !== undefined) {
            const fundType = getProductTabType(item.fundType);
            const checkAmp = item.fundType === "AMP" ? { ampDetails: item.ampDetails } : {};

            updatedNewSales.accountDetails = {
              ...newSales.accountDetails,
              accountNo: item.accountNo,
              authorisedSignatory:
                item.authorisedSignatory !== null ? handleSignatoryFromBE(item.authorisedSignatory) : "Principal Applicant",
              fundType: fundType,
              isRecurring: item.isRecurring,
              isEpf: item.paymentMethod.toLowerCase() === "epf",
              isSyariah: fundType === "prsDefault" ? item.isSyariah : false,
              ...checkAmp,
            };
          }
          updateNewSales(updatedNewSales);

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
                  id: data.result.jointHolder.id,
                  name: data.result.jointHolder.name,
                  ...storeJointIdType,
                }
              : {};
          const storePrincipalIdType: IIdType =
            data.result.principalHolder.idType !== "NRIC" && data.result.principalHolder.idType !== "Passport"
              ? { idType: "Other", otherIdType: data.result.principalHolder.idType as TypeIDOther }
              : { idType: data.result.principalHolder.idType };
          addClientDetails({
            ...details,
            principalHolder: {
              ...details!.principalHolder,
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
          const updatedJointInfo: IHolderInfoState =
            accountType === 1 || data.result.jointHolder !== null
              ? {
                  ...personalInfo.joint,
                  contactDetails: {
                    ...personalInfo.joint?.contactDetails,
                    emailAddress: jointEmail,
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

          const checkEpf =
            item !== undefined && item.paymentMethod === "EPF" && isNotEmpty(item.epfDetails)
              ? { epfDetails: { ...item.epfDetails! } }
              : {};

          addPersonalInfo({
            ...personalInfo,
            principal: {
              ...personalInfo.principal,
              contactDetails: {
                ...personalInfo.principal?.contactDetails,
                emailAddress: principalEmail,
              },
              personalDetails: {
                ...personalInfo.principal?.personalDetails,
                dateOfBirth: moment(data.result.principalHolder.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
                idNumber: data.result.principalHolder.id,
                name: data.result.principalHolder.name,
                ...storePrincipalIdType,
              },
              ...checkEpf,
            },
            joint: updatedJointInfo,
          });
          jointClientId.current = "";
          jointEmailRef.current = "";
          if (accountType !== 1 && req === undefined) {
            setPrompt(false);
            updateInvestors({ ...investors, backToInvestorOverview: true });
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
        if (error !== null) {
          const errorList = error.errorList?.join("\n");
          setTimeout(() => {
            Alert.alert(error.message, errorList);
          }, 150);
        }
        return undefined;
      }
    }
    return undefined;
  };

  const handleCheckClient = async (req?: IEtbCheckRequest, currentInvestorHolder?: TypeAccountHolder): Promise<boolean | string> => {
    if (newSalesLoading === false) {
      setNewSalesLoading(true);
      // If req and currentInvestorHolder is undefined, then it's AO
      const isAccountOpening = req === undefined && currentInvestorHolder === undefined;
      const request: IEtbCheckRequest =
        req === undefined
          ? {
              country: jointHolder?.country,
              dateOfBirth:
                jointHolder?.dateOfBirth && jointHolder.idType !== "NRIC"
                  ? moment(jointHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT)
                  : "",
              id: jointHolder?.id,
              idType: jointIdType,
              name: jointHolder?.name?.trim(),
            }
          : {
              dateOfBirth:
                req.dateOfBirth && req.idType !== "NRIC" ? moment(req.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) : "",
              id: req.id,
              idType: req.idType as TypeClientID,
              name: req.name,
            };
      const clientCheck: IEtbCheckResponse = await checkClient(request, navigation);
      // This is for AO, clientCheck is always for Joint Holder
      if (clientCheck !== undefined) {
        const { data, error } = clientCheck;
        if (error === null && data !== null) {
          setErrorMessage(undefined);
          setInputError1(undefined);
          if (data.result.message === "NTB") {
            // TODO handle NTB flow
            // return setClientType("NTB");
            setIsNtb(true);
            await handleClientRegister(undefined, undefined, true);
          }
          if (data.result.message === "ETB") {
            if (data.result.forceUpdate === false) {
              jointClientId.current = data.result.clientId!;
              // This is only for Sales
              const checkClientHolder =
                currentInvestorHolder === "Principal"
                  ? {
                      principalHolder: {
                        ...principalHolder,
                        name: investorData!.name!.trim(),
                      },
                    }
                  : {
                      jointHolder: {
                        ...jointHolder,
                        name: jointHolder!.name!.trim(),
                      },
                    };
              if (isAccountOpening === true) {
                jointEmailRef.current = data.result.emailAddress;
              }

              updateClient({
                ...client,
                accountList: data.result.accounts!,
                details: {
                  ...details,
                  ...checkClientHolder,
                },
              });

              return true;
            }
            // This is for Force Update
            const nricDOB =
              jointHolder?.dateOfBirth === "" && jointHolder.idType === "NRIC"
                ? moment(findDOBFromNric(jointHolder.id), NRIC_AGE_FORMAT).format(DEFAULT_DATE_FORMAT)
                : jointHolder?.dateOfBirth;

            // This is for Force Update
            setOtherInvestorData({
              ...data.result,
              dateOfBirth: req !== undefined ? req.dateOfBirth : nricDOB,
              name: req !== undefined ? req.name! : jointHolder!.name!,
              id: req !== undefined ? req.id! : jointHolder!.id!,
            });
            setPrompt(false);
            setTimeout(() => {
              setForceUpdatePrompt(true);
            }, 400);
            return false;

            // }
          }
        }
        if (error !== null) {
          setNewSalesLoading(false);
          Alert.alert(error.message);
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
        ...details,
        principalHolder: {
          ...details!.principalHolder,
          dateOfBirth: otherInvestorData !== undefined ? otherInvestorData?.dateOfBirth! : investorData.dateOfBirth,
          clientId: otherInvestorData !== undefined ? otherInvestorData!.clientId : investorData.clientId,
          id: otherInvestorData !== undefined ? otherInvestorData?.id : investorData.idNumber,
          name: otherInvestorData !== undefined ? otherInvestorData?.name : investorData.name,
        },
        initId: otherInvestorData !== undefined ? otherInvestorData?.initId : investorData.initId,
        accountHolder: investorData.accountHolder,
      });
      addPersonalInfo({
        ...personalInfo,
        principal: {
          ...personalInfo.principal,
          personalDetails: {
            ...personalInfo.principal?.personalDetails,
            dateOfBirth:
              otherInvestorData !== undefined
                ? moment(otherInvestorData!.dateOfBirth, DEFAULT_DATE_FORMAT).toDate()
                : moment(investorData.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
            name: otherInvestorData !== undefined ? otherInvestorData?.name : investorData.name,
          },
        },
      });
      const checkDeclarations =
        isNotEmpty(otherInvestorData) && isArrayNotEmpty(otherInvestorData!.declarationRequired)
          ? otherInvestorData!.declarationRequired
          : [];
      const checkInvestorDeclarations = isArrayNotEmpty(investorData.declarationRequired) ? investorData.declarationRequired : [];
      const declarationToUse = isArrayNotEmpty(checkDeclarations) ? checkDeclarations : checkInvestorDeclarations;

      let fatcaAddress = isNotEmpty(investorData) && isNotEmpty(investorData!.address) ? getAddress(investorData!.address) : undefined;
      if (otherInvestorData !== undefined && isNotEmpty(otherInvestorData.address)) {
        fatcaAddress = getAddress(otherInvestorData!.address!);
      }

      updateForceUpdate({ ...forceUpdate, address: fatcaAddress, declarations: declarationToUse });
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

  const handleSales = async (item: IInvestorAccountsData) => {
    const updatedAccountType = item.jointName === null ? "Individual" : "Joint";
    const jointInfo =
      item.jointName !== null
        ? {
            dateOfBirth: item.jointDateOfBirth,
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
    let checkForceUpdateETB: string | boolean = false;
    if (item.jointName !== null) {
      const clientCheckRequest: IEtbCheckRequest = {
        // dateOfBirth: item.accountHolder === "Principal" ? item.dateOfBirth : item.jointDateOfBirth,
        idType: item.accountHolder === "Principal" ? (item.jointIdType as TypeClientID) : (item.idType as TypeClientID),
        id: item.accountHolder === "Principal" ? item.jointIdNumber : item.idNumber,
        name: item.accountHolder === "Principal" ? item.jointName : item.name,
      };
      if (item.accountHolder === "Principal" && item.jointIdType !== "NRIC") {
        clientCheckRequest.dateOfBirth = item.jointDateOfBirth;
      } else if (item.accountHolder === "Joint" && item.idType !== "NRIC") {
        clientCheckRequest.dateOfBirth = item.dateOfBirth;
      }
      checkForceUpdateETB = await handleCheckClient(clientCheckRequest, item.accountHolder);
    }

    if (typeof checkForceUpdateETB === "string") {
      Alert.alert(checkForceUpdateETB);
    } else if (checkForceUpdateETB === true || (checkForceUpdateETB === false && item.jointName === null)) {
      const check = await handleClientRegister(req, item);
      if (item.fundType === "UT" && item.paymentMethod === "EPF") {
        const epfFilterArray: string[] = item.paymentMethod === "EPF" ? ["Yes"] : [];
        addUtFilters({
          fundCurrency: [],
          fundType: [],
          issuingHouse: [],
          riskCategory: [],
          shariahApproved: [],
          conventional: [],
          epfApproved: epfFilterArray,
        });
      }
      if (getProductTabType(item.fundType) === "prsDefault") {
        const syariahConventional = item.isSyariah === true ? { shariahApproved: ["Yes"] } : { shariahApproved: ["No"] };
        addPrsDefaultFilters({
          epfApproved: [],
          fundCurrency: [],
          fundType: [],
          issuingHouse: [],
          riskCategory: [],
          conventional: [],
          ...syariahConventional,
        });
      }
      updateProductType(getProductTabType(item.fundType));
      if (check === true) {
        updateTransactionType("Sales-NS");
        updateInvestors({ ...investors, backToInvestorOverview: true });
        navigation.navigate("NewSales");
      }
    }
  };

  const etbCheckInvestor: IInvestorData =
    isForceUpdate === true || isNewSales === true || directToAccountOpening === true
      ? {
          clientId: "",
          idNumber: principalHolder?.id!,
          name: "",
          email: "",
          riskTolerance: "",
          mobileNo: "",
        }
      : currentInvestor!;

  const tabProps = {
    currentInvestor: etbCheckInvestor,
    directToAccountOpening,
    investorData,
    isFetching: loading,
    isLogout: dashboardProps.isLogout,
    navigation: navigation,
    page,
    pages,
    setForceUpdatePrompt,
    setPrompt,
    setInvestorData,
    setIsFetching: setLoading,
    setPage,
    setPages,
    setScreen: dashboardProps.setScreen,
    setSort,
    sort,
    updateForceUpdateDeclarations,
  };

  const content: JSX.Element = (
    <AccountListing
      handleSales={handleSales}
      handleViewAccount={handleViewAccount}
      updateCurrentInvestor={updateCurrentInvestor}
      {...tabProps}
    />
  );

  const tableContainer: ViewStyle = {
    ...flexChild,
    backgroundColor: colorWhite._2,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
  };

  const headerData: IInvestorAccountHeaderProps = {
    email: investorData !== undefined ? investorData.email : undefined,
    emailVerified: investorData !== undefined ? investorData.isForceUpdate === false : undefined,
    handleAccountOpening: handleAccountOpening,
    handleViewProfile: handleViewProfile,
    mobileNo: investorData !== undefined ? investorData.mobileNo : undefined,
    name: investorData !== undefined ? investorData.name : undefined,
    setScreen: dashboardProps.setScreen,
  };

  const checkInvestorName = investorData !== undefined ? investorData.name : "-";
  const checkName = investorData !== undefined && otherInvestorData !== undefined ? otherInvestorData.name : checkInvestorName;
  const promptLabel = `${INVESTOR_ACCOUNTS.PROMPT_LABEL} ${checkName}.`;
  const modalStyle = fullScreenLoader.current === false ? undefined : { backgroundColor: colorBlack._1_4 };
  const checkDirectToAccountOpening = isForceUpdate === true ? INVESTOR_ACCOUNTS.BUTTON_GO_BACK : INVESTOR_ACCOUNTS.BUTTON_CANCEL;

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
            <View
              style={{
                ...flexChild,
                ...shadow12Black112,
                marginHorizontal: sw24,
                backgroundColor: colorWhite._2,
                borderRadius: sw24,
              }}>
              <InvestorAccountsHeader {...headerData} />

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
        labelCancel={checkDirectToAccountOpening}
        spaceToIllustration={sh24}
        title={INVESTOR_ACCOUNTS.PROMPT_TITLE}
        visible={forceUpdatePrompt}
      />
      <InvestorSalesPrompt
        ageErrorMessage={ageErrorMessage}
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
        setAgeErrorMessage={setAgeErrorMessage}
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
