import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { AccountHeader, ColorCard, ContentPage, CustomSpacer, CustomToast } from "../../../components";
import { Language } from "../../../constants";
import { IData, useUndoDelete } from "../../../hooks";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { px, sh24, sw24 } from "../../../styles";
import { BankDetails } from "../../../templates";
import { checkBankValidation, checkLocalBankPartial, getInitialBankState, isNotEmpty } from "../../../utils";
import { AccountDetails } from "./AccountDetails";
import { JointRelationship } from "./JointRelationship";

const { ADDITIONAL_DETAILS } = Language.PAGE;
interface AdditionalDetailsProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const AdditionalDetailsComponent: FunctionComponent<AdditionalDetailsProps> = ({
  accountType,
  addPersonalInfo,
  details,
  handleNextStep,
  investmentDetails,
  onboarding,
  personalInfo,
  productSales,
  updateOnboarding,
  updateOnboardingToast,
}: AdditionalDetailsProps) => {
  const { disabledSteps, finishedSteps } = onboarding;
  const { editMode, principal, isAllEpf } = personalInfo;
  const { bankSummary } = principal!;
  const { localBank, foreignBank } = bankSummary!;
  const personalDetails = principal?.personalDetails;
  const { enableBankDetails } = personalDetails!;

  const investmentCurrencies = productSales!.map(({ investment }) =>
    investment.fundCurrency !== undefined ? investment.fundCurrency : "",
  );
  const checkOtherRelationship =
    principal!.personalDetails?.relationship === "Others"
      ? principal!.personalDetails?.otherRelationship !== ""
      : principal!.personalDetails?.relationship !== "";
  const checkRelationship = accountType === "Individual" ? true : checkOtherRelationship;

  const checkLocalBankEpf =
    isAllEpf === true
      ? checkBankValidation(localBank!, "local") === true && checkLocalBankPartial(localBank!)
      : checkBankValidation(localBank!, "local") === true;

  const handleSubmit = () => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];
    // add to finishedSteps
    if (updatedFinishedSteps.includes("EmploymentDetails") === false) {
      updatedFinishedSteps.push("EmploymentDetails");
    }

    // add to finishedSteps
    if (updatedFinishedSteps.includes("AdditionalDetails") === false) {
      updatedFinishedSteps.push("AdditionalDetails");
    }

    // remove from disabledSteps (next step)
    const findPersonalInfoSummary = updatedDisabledSteps.indexOf("PersonalInfoSummary");
    if (findPersonalInfoSummary !== -1) {
      updatedDisabledSteps.splice(findPersonalInfoSummary, 1);
    }

    // remove in disabledSteps if edit mode
    if (editMode === true) {
      addPersonalInfo({ ...personalInfo, editMode: false });
    }

    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps, finishedSteps: updatedFinishedSteps });

    handleNextStep("PersonalInfoSummary");
  };

  const handlePrincipalBankDetails = (value: IBankSummaryState) => {
    addPersonalInfo({ principal: { bankSummary: { ...bankSummary, ...value } } });
  };
  const handlePrincipalPersonalDetails = (value: IPersonalDetailsState) => {
    addPersonalInfo({ principal: { personalDetails: { ...principal!.personalDetails, ...value } } });
  };

  const handleEnable = (toggle: boolean | undefined) => {
    handlePrincipalPersonalDetails({ ...personalDetails, enableBankDetails: toggle });
    const bankSummaryState: IBankSummaryState = {
      localBank: [{ ...getInitialBankState("local", details?.principalHolder!.name) }],
      foreignBank: [],
    };
    handlePrincipalBankDetails(bankSummaryState);
  };

  const setLocalBank = (value: IBankDetailsState[]) => {
    handlePrincipalBankDetails({ localBank: value });
  };
  const setForeignBank = (value: IBankDetailsState[]) => {
    handlePrincipalBankDetails({ foreignBank: value });
  };

  const handlePersonalInfo = (value: IPersonalInfoState) => {
    addPersonalInfo({ ...personalInfo, ...value });
  };

  const handleBack = () => {
    handleNextStep("EmploymentDetails");
  };

  const handleToast = (text?: string | undefined) => {
    updateOnboardingToast(text);
  };

  const handleBankSummary = (updatedBankSummary: IBankSummaryState) => {
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        bankSummary: {
          ...bankSummary,
          ...updatedBankSummary,
        },
      },
    });
  };

  const handleUpdateTempData = (value: IData<IBankDetailsState>[] | undefined) => {
    // last item item added will be the first item to undo, LIFO
    if (value !== undefined) {
      const updatedForeignBank = foreignBank !== undefined ? [...foreignBank] : [];
      value.reverse().forEach((item) => {
        updatedForeignBank.splice(item.index, 0, item.deletedData);
      });
      setForeignBank(updatedForeignBank);
    }
  };

  const [deleteCount, setDeleteCount, tempData, setTempData, handleUndoDelete] = useUndoDelete<IBankDetailsState>(handleUpdateTempData);
  const useDeleteData = {
    deleteCount: deleteCount,
    setDeleteCount: setDeleteCount,
    setTempData: setTempData,
    tempData: tempData,
  };

  const accountNames = [{ label: details!.principalHolder!.name!, value: details!.principalHolder!.name! }];

  if (accountType === "Joint") {
    accountNames.push(
      { label: details!.jointHolder!.name!, value: details!.jointHolder!.name! },
      { label: ADDITIONAL_DETAILS.OPTION_COMBINED, value: ADDITIONAL_DETAILS.OPTION_COMBINED },
    );
  }

  const nonMyrCurrencies = investmentCurrencies.filter((currency) => currency !== "MYR");
  const selectedNonMyrCurrencies = isNotEmpty(foreignBank)
    ? [
        ...foreignBank!
          .map((eachBank: IBankDetailsState) => eachBank.currency)
          .map((currency) => {
            const updatedArray = [...currency!].filter((each) => each !== "MYR");
            return updatedArray;
          })
          .flat(),
        ...localBank!
          .map((eachBank: IBankDetailsState) => eachBank.currency)
          .map((currency) => {
            const updatedArray = [...currency!].filter((each) => each !== "MYR");
            return updatedArray;
          })
          .flat(),
      ]
    : [];
  const checkCurrencyRemaining = nonMyrCurrencies.filter((eachCurrency: string) => !selectedNonMyrCurrencies.includes(eachCurrency));
  const buttonDisabled =
    accountType === "Individual"
      ? checkLocalBankEpf || checkBankValidation(foreignBank!, "foreign") === true || checkCurrencyRemaining.length > 0
      : checkBankValidation(localBank!, "local") === true ||
        checkBankValidation(foreignBank!, "foreign") === true ||
        checkRelationship === false ||
        checkCurrencyRemaining.length > 0;
  const names =
    accountType === "Joint"
      ? `${personalInfo.principal!.personalDetails!.name!} ${ADDITIONAL_DETAILS.LABEL_AND} ${personalInfo.joint!.personalDetails!.name!}`
      : "";
  const subtitleLabel = `${ADDITIONAL_DETAILS.LABEL_PRINCIPAL} ${ADDITIONAL_DETAILS.LABEL_AND} ${ADDITIONAL_DETAILS.LABEL_JOINT}`;

  return (
    <Fragment>
      <ContentPage
        cancelDisabled={editMode === true}
        continueDisabled={buttonDisabled}
        handleCancel={editMode === true ? undefined : handleBack}
        handleContinue={handleSubmit}
        subheading={ADDITIONAL_DETAILS.HEADING_ADDITIONAL_DETAILS}
        subtitle={ADDITIONAL_DETAILS.SUBHEADING_ADDITIONAL_DETAILS}
        spaceToTitle={0}>
        <View style={px(sw24)}>
          <CustomSpacer space={sh24} />
          {accountType === "Individual" ? null : <AccountHeader title={subtitleLabel} subtitle={names} />}
          <AccountDetails
            accountType={accountType!}
            investmentDetails={investmentDetails!}
            personalInfo={personalInfo}
            setPersonalInfo={handlePersonalInfo}
          />
          {accountType === "Joint" ? (
            <Fragment>
              <CustomSpacer space={sh24} />
              <ColorCard
                content={
                  <Fragment>
                    <JointRelationship personalDetails={personalDetails!} setPersonalDetails={handlePrincipalPersonalDetails} />
                  </Fragment>
                }
                header={{ label: ADDITIONAL_DETAILS.LABEL_HEADER_JOINT_RELATIONSHIP }}
              />
            </Fragment>
          ) : null}
          <CustomSpacer space={sh24} />
          <BankDetails
            accountType={accountType!}
            bankSummary={bankSummary!}
            useDeleteData={useDeleteData}
            details={details!}
            enableBank={enableBankDetails!}
            foreignBankDetails={foreignBank!}
            handleBankSummary={handleBankSummary}
            investmentCurrencies={investmentCurrencies}
            isAllEpf={isAllEpf || false}
            handleEnableLocalBank={handleEnable}
            localBankDetails={localBank!}
            handleToast={handleToast}
            setForeignBankDetails={setForeignBank}
            setLocalBankDetails={setLocalBank}
          />
        </View>
      </ContentPage>
      <CustomToast
        count={deleteCount}
        deleteText={ADDITIONAL_DETAILS.LABEL_BANK_DELETED}
        isDeleteToast={true}
        onPress={handleUndoDelete}
        setCount={setDeleteCount}
      />
    </Fragment>
  );
};

export const AdditionalDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(AdditionalDetailsComponent);
