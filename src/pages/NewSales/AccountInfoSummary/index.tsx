import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { FileViewer, SelectionBanner } from "../../../components";
import { Language } from "../../../constants";
import { handleSignatory } from "../../../helpers";
import { submitClientAccount } from "../../../network-actions";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { parseAmountToString } from "../../../utils";
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
  const [currentProfile, setCurrentProfile] = useState<TypeAccountHolder>("Principal");
  const [page, setPage] = useState<number>(0);
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

  const localBank = principal!.bankSummary!.localBank!.map((bank) => {
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

  const foreignBank = principal!.bankSummary!.foreignBank!.map((bank) => {
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

  const request: ISubmitClientAccountRequest = {
    initId: details!.initId!,
    isEtb: true,
    incomeDistribution: personalInfo.incomeDistribution!,
    signatory: accountType === "Joint" ? handleSignatory(personalInfo.signatory!) : undefined,
    principal: {
      clientId: details!.principalHolder!.clientId!,
      bankSummary: { localBank: localBank as ISubmitBank[], foreignBank: foreignBank as ISubmitBank[] },
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

  const handleSetupClient = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const response: ISubmitClientAccountResponse = await submitClientAccount(request, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          addOrders(data.result);
          const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];
          updatedFinishedSteps.push("Summary", "AccountInformation");
          const newDisabledStep: TypeNewSalesKey[] = [
            "RiskProfile",
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
          return handleNextStep("OrderPreview");
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
    handleSetupClient();
  };

  const clientId =
    currentProfile === "Principal" ? newSales!.investorProfile!.principalClientId! : newSales!.investorProfile!.jointClientId!;

  let content = (
    <NewSalesAccountSummary handleNextStep={handleNextStep} setCurrentProfile={setCurrentProfile} setFile={setFile} setPage={setPage} />
  );
  if (page === 1) {
    content = <InvestorProfilePage clientId={clientId} setPage={setPage} />;
  }
  const checkAccountType =
    accountType === "Individual" ? NEW_SALES_SUMMARY.LABEL_ACCOUNT_SUMMARY_INDIVIDUAL : NEW_SALES_SUMMARY.LABEL_ACCOUNT_SUMMARY_JOINT;
  return (
    <Fragment>
      <View style={flexChild}>
        {content}
        {page === 1 ? null : (
          <SelectionBanner label={checkAccountType} submitOnPress={handleContinue} labelSubmit={NEW_SALES_SUMMARY.BUTTON_CONTINUE} />
        )}
      </View>
      {file !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="base64" value={file} visible={file !== undefined} />
      ) : null}
    </Fragment>
  );
};

export const AdditionalInfoSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(AccountInfoSummaryComponent);
