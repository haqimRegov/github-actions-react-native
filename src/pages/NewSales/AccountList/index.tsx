import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../assets/images/LocalAssets";
import { ContentPage, CustomSpacer, LabeledTitle, Loading, PromptModal, RNModal } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE } from "../../../data/dictionary";
import { getAddress, getProductTabType } from "../../../helpers";
import { checkClient, clientRegister } from "../../../network-actions";
import { NewSalesMapDispatchToProps, NewSalesMapStateToProps, NewSalesStoreProps } from "../../../store";
import {
  centerHV,
  colorBlack,
  colorWhite,
  flexRow,
  flexWrap,
  fs16RegGray5,
  fs18BoldGray6,
  fullHW,
  px,
  sh24,
  sh4,
  sw24,
} from "../../../styles";
import { AccountCard } from "../../../templates/Cards";
import { isArrayNotEmpty, isNotEmpty } from "../../../utils";
import { defaultContentProps } from "../Content";

const { ACCOUNT_LIST, INVESTOR_ACCOUNTS } = Language.PAGE;

declare interface IAccountListProps extends NewSalesContentProps, NewSalesStoreProps {
  navigation: IStackNavigationProp;
  route: string;
}
declare interface IEtbCheckData extends IEtbCheckResult {
  address: IAddressState;
  id: string;
  name: string;
}

const AccountListComponent: FunctionComponent<IAccountListProps> = ({
  // addRiskInfo,
  addAccountType,
  addRiskScore,
  addClientDetails,
  addPersonalInfo,
  addPrsDefaultFilters,
  addUtFilters,
  client,
  forceUpdate,
  newSales,
  personalInfo,
  handleNextStep,
  navigation,
  riskScore,
  updateForceUpdate,
  updateNewSales,
  updateProductType,
}: IAccountListProps) => {
  const { disabledSteps, finishedSteps } = newSales;
  const { accountList, accountType, details } = client;
  const { principalHolder, jointHolder } = details!;
  const [loading, setLoading] = useState<boolean>(false);
  const [forceUpdatePrompt, setForceUpdatePrompt] = useState<boolean>(false);
  const [clientCheckData, setClientCheckData] = useState<IEtbCheckData | undefined>(undefined);

  const handleCheckClient = async (account: IAccountList): Promise<boolean | string> => {
    if (loading === false) {
      setLoading(true);
      const checkIdType = account.accountHolder === "Principal" ? account.jointIdType : account.idType!;
      const checkDOB =
        checkIdType !== "NRIC"
          ? { dateOfBirth: account.accountHolder === "Principal" ? account.jointDateOfBirth : account.dateOfBirth }
          : {};
      const request: IEtbCheckRequest = {
        id: account.accountHolder === "Principal" ? account.jointIdNumber : account.idNumber,
        idType: checkIdType,
        name: account.accountHolder === "Principal" ? account.name! : account.jointName!,
        ...checkDOB,
      };
      const clientCheck: IEtbCheckResponse = await checkClient(request, navigation);
      if (clientCheck !== undefined) {
        const { data, error } = clientCheck;
        if (data !== null && (data.result.forceUpdate === true || data.result.message === "NTB")) {
          setLoading(false);
        }
        if (error === null && data !== null) {
          if (data.result.message === "NTB") {
            Alert.alert("Client is NTB");
            return false;
          }
          if (data.result.message === "ETB") {
            if (data.result.forceUpdate === false) {
              return false;
            }
            setClientCheckData({
              ...data.result,
              dateOfBirth: account.accountHolder === "Principal" ? account.jointDateOfBirth : account.dateOfBirth,
              name: account.accountHolder === "Principal" ? account.jointName : account.name,
              id: account.accountHolder === "Principal" ? account.jointIdNumber : account.jointIdNumber,
            });
            setTimeout(() => {
              setForceUpdatePrompt(true);
            }, 400);
            return true;

            // }
          }
        }
        if (error !== null) {
          setLoading(false);
          return error.message;
        }
      }
      return false;
    }
    return false;
  };

  const handleForceUpdate = () => {
    if (clientCheckData !== undefined) {
      setForceUpdatePrompt(false);
      addClientDetails({
        ...details,
        principalHolder: {
          ...details!.principalHolder,
          dateOfBirth: clientCheckData?.dateOfBirth!,
          clientId: clientCheckData!.clientId,
          id: clientCheckData?.id,
          name: clientCheckData?.name,
        },
        initId: clientCheckData?.initId,
        accountHolder: clientCheckData?.accountHolder,
      });
      addPersonalInfo({
        ...personalInfo,
        principal: {
          ...personalInfo.principal,
          personalDetails: {
            ...personalInfo.principal?.personalDetails,
            dateOfBirth: moment(clientCheckData!.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
            name: clientCheckData?.name,
          },
          contactDetails: {
            ...personalInfo.principal?.contactDetails,
            emailAddress: "",
          },
        },
      });
      const checkDeclarations =
        isNotEmpty(clientCheckData) && isArrayNotEmpty(clientCheckData!.declarationRequired) ? clientCheckData!.declarationRequired : [];
      const checkInvestorDeclarations = isArrayNotEmpty(clientCheckData.declarationRequired) ? clientCheckData.declarationRequired : [];
      const declarationToUse = isArrayNotEmpty(checkDeclarations) ? checkDeclarations : checkInvestorDeclarations;

      let fatcaAddress =
        isNotEmpty(clientCheckData) && isNotEmpty(clientCheckData!.address) ? getAddress(clientCheckData!.address) : undefined;
      if (clientCheckData !== undefined && isNotEmpty(clientCheckData.address)) {
        fatcaAddress = getAddress(clientCheckData!.address!);
      }

      updateForceUpdate({ ...forceUpdate, address: fatcaAddress, declarations: declarationToUse });
      navigation.navigate("ForceUpdate");
    }
  };

  const handleClientRegister = async (eachAccount: IAccountList) => {
    if (loading === false) {
      setLoading(true);
      const request: IClientRegisterRequest = {
        accountNo: eachAccount.accountNo,
        accountType: accountType,
        isEtb: true,
        isNewFundPurchased: true,
        principalHolder: {
          id: principalHolder?.id!,
          name: principalHolder?.name!,
        },
      };
      const clientResponse: IClientRegisterResponse = await clientRegister(request, navigation);
      setLoading(false);
      if (clientResponse !== undefined) {
        const { data, error } = clientResponse;
        if (error === null && data !== null) {
          let riskInfo: IRiskProfile | undefined;
          if (data.result.riskInfo !== undefined && data.result.riskInfo !== null) {
            riskInfo = data.result.riskInfo;
            addRiskScore({
              ...riskScore,
              appetite: data.result.riskInfo.appetite,
              rangeOfReturn: data.result.riskInfo.expectedRange,
              profile: data.result.riskInfo.profile,
              type: data.result.riskInfo.type,
              fundSuggestion: "",
              netWorth: "",
            });
          }
          const resetJointInfo = eachAccount.jointName === null;
          let dataJointIdType = {};
          if (isNotEmpty(data.result.jointHolder)) {
            dataJointIdType =
              data.result.jointHolder!.idType !== "NRIC" && data.result.jointHolder!.idType !== "Passport"
                ? { idType: "Other", otherIdType: data.result.jointHolder!.idType as TypeIDOther }
                : { idType: data.result.jointHolder!.idType };
          }
          const storeJointIdType = isNotEmpty(data.result.jointHolder) ? dataJointIdType : {};
          const storePrincipalIdType =
            data.result.principalHolder.idType !== "NRIC" && data.result.principalHolder.idType !== "Passport"
              ? { idType: "Other", otherIdType: data.result.principalHolder.idType as TypeIDOther }
              : { idType: data.result.principalHolder.idType };
          const initialJointInfo = {
            name: "",
            country: "",
            dateOfBirth: "",
            id: "",
            idType: DICTIONARY_ID_TYPE[0],
            otherIdType: DICTIONARY_ID_OTHER_TYPE[0].value,
          };
          const moreJointInfo = isNotEmpty(data.result.jointHolder)
            ? {
                clientId: data.result.jointHolder!.clientId,
                dateOfBirth: data.result.jointHolder!.dateOfBirth,
                id: data.result.jointHolder!.id,
                name: data.result.jointHolder!.name,
              }
            : {};
          addClientDetails({
            ...details,
            principalHolder: {
              ...principalHolder,
              clientId: data.result.principalHolder.clientId,
              dateOfBirth: data.result.principalHolder.dateOfBirth,
              id: data.result.principalHolder.id,
              name: data.result.principalHolder.name,
            },
            jointHolder: resetJointInfo === true ? { ...initialJointInfo } : { ...jointHolder, ...moreJointInfo },
            initId: `${data.result.initId}`,
            accountHolder: eachAccount.accountHolder,
          });
          const updatedJointInfo: IHolderInfoState =
            data.result.jointHolder !== null
              ? {
                  ...personalInfo.joint,
                  contactDetails: {
                    ...personalInfo.joint?.contactDetails,
                    emailAddress: eachAccount.jointEmail,
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
            eachAccount.paymentMethod === "EPF" && isNotEmpty(eachAccount.epfDetails) ? { epfDetails: { ...eachAccount.epfDetails } } : {};

          addPersonalInfo({
            ...personalInfo,
            principal: {
              ...personalInfo.principal,
              contactDetails: {
                ...personalInfo.principal?.contactDetails,
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
          addAccountType(data.result.jointHolder !== null ? "Joint" : "Individual");
          const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];
          const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];
          updatedFinishedSteps.push("AccountList");
          const findAccountList = disabledSteps.indexOf("AccountList");
          if (findAccountList !== -1) {
            updatedDisabledSteps.splice(findAccountList, 1);
          }
          const findRisk = disabledSteps.indexOf("RiskSummary");
          if (findRisk !== -1) {
            updatedDisabledSteps.splice(findRisk, 1);
          }
          if (eachAccount.fundType === "UT" && eachAccount.paymentMethod === "EPF") {
            const epfFilterArray: string[] = eachAccount.paymentMethod === "EPF" ? ["Yes"] : [];
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
          if (getProductTabType(eachAccount.fundType) === "prsDefault") {
            const syariahConventional = eachAccount.isSyariah === true ? { shariahApproved: ["Yes"] } : { shariahApproved: ["No"] };
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
          const fundType = getProductTabType(eachAccount.fundType);
          const checkAmp = eachAccount.fundType === "AMP" ? { ampDetails: eachAccount.ampDetails } : {};
          updateProductType(fundType);
          updateNewSales({
            ...newSales,
            finishedSteps: updatedFinishedSteps,
            disabledSteps: updatedDisabledSteps,
            investorProfile: {
              ...newSales.investorProfile,
              principalClientId: data.result.principalHolder!.clientId,
              jointClientId: data.result.jointHolder !== null ? data.result.jointHolder!.clientId : undefined,
            },
            riskInfo: riskInfo,
            accountDetails: {
              ...newSales.accountDetails,
              accountNo: eachAccount.accountNo,
              fundType: fundType,
              isEpf: eachAccount.paymentMethod.toLowerCase() === "epf",
              isRecurring: eachAccount.isRecurring,
              isSyariah: fundType === "prsDefault" ? eachAccount.isSyariah : false,
              ...checkAmp,
            },
          });
          handleNextStep("RiskSummary");
        } else if (error !== undefined) {
          Alert.alert(error?.message);
        }
      }
    }
  };

  const handleCancelForceUpdate = () => {
    setForceUpdatePrompt(false);
  };

  const modalStyle = loading === false ? undefined : { backgroundColor: colorBlack._1_4 };
  const promptLabel = clientCheckData !== undefined ? `${INVESTOR_ACCOUNTS.PROMPT_LABEL} ${clientCheckData.name}.` : "";
  return (
    <View>
      <ContentPage {...defaultContentProps} subheading={ACCOUNT_LIST.LABEL_WELCOME_BACK}>
        <Fragment>
          <CustomSpacer space={sh24} />
          <View style={px(sw24)}>
            <LabeledTitle
              label={ACCOUNT_LIST.LABEL_HEADING}
              labelStyle={fs18BoldGray6}
              spaceToLabel={sh4}
              title={ACCOUNT_LIST.LABEL_SUBHEADING}
              titleStyle={fs16RegGray5}
            />
            <CustomSpacer space={sh24} />
            <View style={{ ...flexRow, ...flexWrap }}>
              {accountList.map((eachAccount: IAccountList, index: number) => {
                const handleSelectAccount = async () => {
                  let checkEtbLegacy: string | boolean = false;
                  if (eachAccount.jointName !== null) {
                    checkEtbLegacy = await handleCheckClient(eachAccount);
                  }
                  if (typeof checkEtbLegacy === "string") {
                    Alert.alert(checkEtbLegacy);
                  }
                  if (checkEtbLegacy === false) {
                    await handleClientRegister(eachAccount);
                  }
                };
                return (
                  <Fragment key={index}>
                    {index % 2 !== 0 ? <CustomSpacer isHorizontal={true} space={sw24} /> : null}
                    <AccountCard data={eachAccount} handlePress={handleSelectAccount} />
                  </Fragment>
                );
              })}
            </View>
          </View>
        </Fragment>
      </ContentPage>
      <PromptModal
        handleCancel={handleCancelForceUpdate}
        handleContinue={handleForceUpdate}
        illustration={LocalAssets.illustration.investorWarning}
        label={promptLabel}
        spaceToIllustration={sh24}
        title={INVESTOR_ACCOUNTS.PROMPT_TITLE}
        visible={forceUpdatePrompt}
      />
      <RNModal animationType="fade" style={modalStyle} visible={loading}>
        <View style={{ ...centerHV, ...fullHW }}>
          <Loading color={colorWhite._1} />
        </View>
      </RNModal>
    </View>
  );
};

export const AccountList = connect(NewSalesMapStateToProps, NewSalesMapDispatchToProps)(AccountListComponent);
