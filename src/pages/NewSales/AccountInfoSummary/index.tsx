import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, FileViewer, SelectionBanner } from "../../../components";
import { Language } from "../../../constants";
import { handleSignatory } from "../../../helpers";
import { usePrevious } from "../../../hooks";
import { submitClientAccount } from "../../../network-actions";
import { addBankSummary } from "../../../network-actions/new-sales/AddBankSummary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { flexChild, sh24 } from "../../../styles";
import { parseAmountToString } from "../../../utils";
import { NewSalesAccountInformation } from "../AccountInformation";
import { NewSalesOrderSummary } from "../OrderSummary";
import { InvestorProfilePage } from "./Profile";
import { NewSalesAccountSummary } from "./Summary";

const { NEW_SALES_SUMMARY } = Language.PAGE;

interface AccountInfoSummaryProps extends PersonalInfoStoreProps, NewSalesContentProps {}

const AccountInfoSummaryComponent: FunctionComponent<AccountInfoSummaryProps> = ({
  accountType,
  addOrders,
  details,
  handleNextStep,
  investmentDetails,
  newSales,
  personalInfo,
  setLoading,
  updateNewSales,
}: AccountInfoSummaryProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { accountDetails, transactionType } = newSales;
  const { accountNo, bankDetails } = accountDetails;
  const [page, setPage] = useState<TRiskProfilePages>("accountSummary");
  const [currentProfile, setCurrentProfile] = useState<TypeAccountHolder>("Principal");
  const [currentClientId, setCurrentClientId] = useState<string>("");
  const [currentOrder, setCurrentOrder] = useState<IDashboardOrder | undefined>(undefined);
  const prevPage = usePrevious<TRiskProfilePages>(page);
  // const [page, setPage] = useState<number>(0);
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);

  const handleCloseViewer = () => {
    setFile(undefined);
  };

  const { finishedSteps } = newSales;
  const { principal, joint } = personalInfo;

  const fetching = useRef<boolean>(false);

  const jointIdType = details?.jointHolder?.idType === "Other" ? details?.jointHolder?.otherIdType : details?.jointHolder?.idType;
  const principalIdType =
    details?.principalHolder?.idType === "Other" ? details?.principalHolder?.otherIdType : details?.principalHolder?.idType;
  const jointExpirationDate =
    joint!.personalDetails!.expirationDate !== undefined ? moment(joint!.personalDetails!.expirationDate).valueOf() : undefined;
  const principalExpirationDate =
    principal!.personalDetails!.expirationDate !== undefined ? moment(principal!.personalDetails!.expirationDate).valueOf() : undefined;

  const relationship =
    principal!.personalDetails!.relationship === "Others"
      ? principal!.personalDetails!.otherRelationship!
      : principal!.personalDetails!.relationship!;

  const jointRelationship = accountType === "Joint" ? relationship : undefined;

  let isInvestmentEpf = false;

  const investments = investmentDetails!.map(({ fundDetails, investment }) => {
    if (investment.fundPaymentMethod === "EPF") {
      isInvestmentEpf = true;
    }
    return {
      fundId: investment.fundId!,
      fundingOption: investment.fundPaymentMethod, // TODO backend to fix
      fundClass: investment.fundClass !== "No Class" ? investment.fundClass : "",
      fundCurrency: investment.fundCurrency!,
      investmentAmount: parseAmountToString(investment.investmentAmount),
      isScheduled: `${investment.scheduledInvestment}`,
      scheduledInvestmentAmount: investment.scheduledInvestmentAmount
        ? parseAmountToString(investment.scheduledInvestmentAmount)
        : undefined,
      salesCharge: investment.investmentSalesCharge,
      scheduledSalesCharge: investment.scheduledSalesCharge,
      prsType: fundDetails.prsType,
    };
  });

  const localBank: IBankDetailsState[] = principal!.bankSummary!.localBank!.map((bank) => {
    const bankAccountName =
      bank.combinedBankAccountName !== "" && bank.combinedBankAccountName !== undefined
        ? bank.combinedBankAccountName
        : bank.bankAccountName;

    const newBank = {
      ...bank,
      bankAccountName: bankAccountName,
      bankName: bank.bankName === "Others" ? bank.otherBankName! : bank.bankName!,
    };
    delete newBank.combinedBankAccountName;
    delete newBank.otherBankName;
    return newBank;
  });

  const foreignBank: IBankDetailsState[] = principal!.bankSummary!.foreignBank!.map((bank) => {
    const bankAccountName =
      bank.combinedBankAccountName !== "" && bank.combinedBankAccountName !== undefined
        ? bank.combinedBankAccountName
        : bank.bankAccountName;
    const newBank = {
      ...bank,
      bankAccountName: bankAccountName,
      bankName: bank.bankName === "Others" ? bank.otherBankName! : bank.bankName!,
    };
    delete newBank.combinedBankAccountName;
    delete newBank.otherBankName;
    return newBank;
  });

  const principalId =
    principalIdType === "Passport"
      ? [principal!.personalDetails!.id!.frontPage!]
      : [principal!.personalDetails!.id!.frontPage!, principal!.personalDetails!.id!.secondPage!];

  const jointId =
    jointIdType === "Passport"
      ? [joint?.personalDetails?.id?.frontPage!]
      : [joint?.personalDetails?.id?.frontPage!, joint?.personalDetails?.id?.secondPage!];

  const jointDetails =
    accountType === "Joint"
      ? {
          clientId: details!.jointHolder?.clientId!,
          contactDetails: joint!.contactDetails,
          addressInformation: undefined,
          personalDetails: { id: jointId, name: joint!.personalDetails!.name!, expirationDate: jointExpirationDate },
        }
      : undefined;

  const setupClientRequest: ISubmitClientAccountRequest = {
    initId: details!.initId!,
    isEtb: true,
    incomeDistribution: personalInfo.incomeDistribution!,
    signatory: accountType === "Joint" ? handleSignatory(personalInfo.signatory!) : undefined,
    principal: {
      clientId: details!.principalHolder!.clientId!,
      bankSummary:
        (principal?.personalDetails?.enableBankDetails === true && personalInfo.isAllEpf === true) || personalInfo.isAllEpf === false
          ? { localBank: localBank as ISubmitBank[], foreignBank: foreignBank as ISubmitBank[] }
          : { localBank: [], foreignBank: [] },
      epfDetails: isInvestmentEpf ? principal!.epfDetails : undefined,
      personalDetails: {
        id: principalId,
        name: principal!.personalDetails!.name!,
        relationship: jointRelationship,
        expirationDate: principalExpirationDate,
      },
    },
    joint:
      jointDetails !== undefined
        ? { clientId: jointDetails.clientId, personalDetails: jointDetails.personalDetails as ISubmitPersonalDetails }
        : undefined,
    investments: investments,
  };

  const filteredLocalBank =
    bankDetails !== undefined
      ? localBank.filter((eachLocalBank: IBankDetailsState, localIndex: number) => {
          if (bankDetails.localBank!.length - 1 >= localIndex) {
            return (
              eachLocalBank.currency!.length !== bankDetails.localBank![localIndex].currency!.length ||
              eachLocalBank.bankSwiftCode !== bankDetails.localBank![localIndex].bankSwiftCode
            );
          }
          return true;
        })
      : localBank;

  const filteredForeignBank =
    bankDetails !== undefined
      ? foreignBank.filter((eachForeignBank: IBankDetailsState, foreignIndex: number) => {
          if (bankDetails.foreignBank!.length - 1 >= foreignIndex) {
            return (
              eachForeignBank.currency!.length !== bankDetails.foreignBank![foreignIndex].currency!.length ||
              eachForeignBank.bankSwiftCode !== bankDetails.foreignBank![foreignIndex].bankSwiftCode
            );
          }
          return true;
        })
      : foreignBank;
  const addBankSummaryRequest: IBankSummaryRequest = {
    accountNo: accountNo,
    initId: details!.initId!,
    clientId: details?.principalHolder?.clientId!,
    banks: {
      localBank: filteredLocalBank,
      foreignBank: filteredForeignBank,
    },
  };

  const handleNavigation = () => {
    const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];
    updatedFinishedSteps.push("Summary", "AccountInformation");
    const newDisabledStep: TypeNewSalesKey[] = [
      "RiskSummary",
      "Products",
      "AccountInformation",
      "IdentityVerification",
      "AdditionalDetails",
      "Summary",
      "Signatures",
      "TermsAndConditions",
      "Payment",
    ];
    updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps, disabledSteps: newDisabledStep });
    handleNextStep("OrderPreview");
  };

  const handleAddBankSummary = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const response: IBankSummaryResponse = await addBankSummary(addBankSummaryRequest, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          handleNavigation();
        }

        if (error !== null) {
          const errorList = error.errorList?.join("\n");
          setTimeout(() => {
            Alert.alert(error.message, errorList);
          }, 150);
        }
      }
    }
    return null;
  };

  const handleSetupClient = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const response: ISubmitClientAccountResponse = await submitClientAccount(setupClientRequest, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          addOrders(data.result);
          handleNavigation();
        }

        if (error !== null) {
          const errorList = error.errorList?.join("\n");
          setTimeout(() => {
            Alert.alert(error.message, errorList);
          }, 150);
        }
      }
    }
    return null;
  };

  const handleContinue = () => {
    if (transactionType === "Sales-AO") {
      handleSetupClient();
    } else {
      handleAddBankSummary();
    }
  };

  const handleProfilePage = () => {
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

  const checkPrincipalId =
    accountDetails.accountNo !== "" ? details?.principalHolder?.clientId : newSales.investorProfile.principalClientId;
  const checkJointId = accountDetails.accountNo !== "" ? details?.jointHolder?.clientId : newSales.investorProfile.jointClientId;
  const checkCurrentProfile = currentProfile === "Principal" ? checkPrincipalId : checkJointId;
  const clientId = currentClientId !== "" ? currentClientId : checkCurrentProfile;

  let content = (
    <NewSalesAccountSummary handleNextStep={handleNextStep} setCurrentProfile={setCurrentProfile} setFile={setFile} setPage={setPage} />
  );
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
  const checkAccountType =
    accountType === "Individual" ? NEW_SALES_SUMMARY.LABEL_ACCOUNT_SUMMARY_INDIVIDUAL : NEW_SALES_SUMMARY.LABEL_ACCOUNT_SUMMARY_JOINT;
  return (
    <Fragment>
      <View style={flexChild}>
        {content}
        {page === "accountSummary" ? (
          <SelectionBanner label={checkAccountType} submitOnPress={handleContinue} labelSubmit={NEW_SALES_SUMMARY.BUTTON_CONTINUE} />
        ) : null}
      </View>
      {file !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="base64" value={file} visible={file !== undefined} />
      ) : null}
    </Fragment>
  );
};

export const AdditionalInfoSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(AccountInfoSummaryComponent);
