import moment from "moment";
import React, { FunctionComponent, useRef } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../../components";
import { Language, ONBOARDING_ROUTES } from "../../../../constants";
import {
  OPTION_CRS_NO_TIN_REQUIRED,
  OPTIONS_CRS_TAX_RESIDENCY,
  OPTIONS_CRS_TIN_REASONS,
  OPTIONS_FATCA_NO_CERTIFICATE,
} from "../../../../data/dictionary";
import { submitClientAccount } from "../../../../network-actions";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../../store";
import { borderBottomGray2, sh24 } from "../../../../styles";
import { parseAmountToString } from "../../../../utils";
import { DeclarationDetails } from "./Details";

const { DECLARATION_SUMMARY } = Language.PAGE;

interface DeclarationSummaryProps extends PersonalInfoStoreProps, OnboardingContentProps {
  navigation: IStackNavigationProp;
}

export const DeclarationSummaryComponent: FunctionComponent<DeclarationSummaryProps> = ({
  accountType,
  addOrders,
  details,
  handleNextStep,
  investmentDetails,
  navigation,
  onboarding,
  personalInfo,
  setLoading,
  updateOnboarding,
}: DeclarationSummaryProps) => {
  const { finishedSteps } = onboarding;
  const { principal, joint } = personalInfo;

  const fetching = useRef<boolean>(false);

  // TODO handle if FEA
  const isFea = 100 < 500;

  const jointIdType = details?.jointHolder?.idType === "Other" ? details?.jointHolder?.otherIdType : details?.jointHolder?.idType;
  const principalIdType =
    details?.principalHolder?.idType === "Other" ? details?.principalHolder?.otherIdType : details?.principalHolder?.idType;
  const jointExpirationDate =
    joint!.personalDetails!.expirationDate !== undefined ? moment(joint!.personalDetails!.expirationDate).valueOf() : undefined;
  const principalExpirationDate =
    principal!.personalDetails!.expirationDate !== undefined ? moment(principal!.personalDetails!.expirationDate).valueOf() : undefined;

  const principalMalaysianDetails =
    principalIdType !== "Passport"
      ? {
          bumiputera: `${principal!.personalDetails!.bumiputera === "Yes"}`,
          race: principal!.personalDetails!.race!,
        }
      : {};
  const jointMalaysianDetails =
    jointIdType !== "Passport"
      ? {
          bumiputera: `${joint!.personalDetails!.bumiputera === "Yes"}`,
          race: joint!.personalDetails!.race!,
        }
      : {};

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

  const principalTaxResident = principal!.declaration!.crs!.taxResident!;

  const principalTin = principal!.declaration!.crs!.tin!.map((multiTin) => {
    const reason = multiTin.reason !== -1 ? OPTIONS_CRS_TIN_REASONS[multiTin.reason!].label : OPTIONS_CRS_TIN_REASONS[0].label;
    const principalNoTinReason = multiTin.reason === 1 ? OPTION_CRS_NO_TIN_REQUIRED : reason;
    const principalTinReason = multiTin.reason === 2 ? multiTin.explanation! : principalNoTinReason;
    return {
      country: principalTaxResident === 0 ? undefined : multiTin.country!, // undefined if taxResident === 0
      noTin: principalTaxResident === 0 ? undefined : `${multiTin.noTin!}`, // "true" || "false", undefined if taxResident === 0
      reason: principalTaxResident === 0 || multiTin.noTin! === false ? undefined : principalTinReason, // undefined if taxResident === 0, required if noTin === true
      tinNumber: principalTaxResident === 0 || multiTin.noTin! === true ? undefined : multiTin.tinNumber!, // undefined if taxResident === 0 or noTin === true}
    };
  });

  const principalUsCitizen = principal!.declaration!.fatca!.usCitizen! === 0;
  const principalUsBorn = principal!.declaration!.fatca!.usBorn! === 0 ? "true" : "false";
  const principalCertReason =
    principal!.declaration!.fatca!.reason! === 1 ? principal!.declaration!.fatca!.explanation! : OPTIONS_FATCA_NO_CERTIFICATE[0].label;
  const principalConfirmAddress = principal!.declaration!.fatca!.confirmAddress! === 0 ? "true" : "false";

  const jointTaxResident = joint!.declaration!.crs!.taxResident!;

  const jointTin = joint!.declaration!.crs!.tin!.map((multiTin) => {
    const reason = multiTin.reason !== -1 ? OPTIONS_CRS_TIN_REASONS[multiTin.reason!].label : OPTIONS_CRS_TIN_REASONS[0].label;
    const jointNoTinReason = multiTin.reason === 1 ? OPTION_CRS_NO_TIN_REQUIRED : reason;
    const jointTinReason = multiTin.reason === 2 ? multiTin.explanation! : jointNoTinReason;
    return {
      country: jointTaxResident === 0 ? undefined : multiTin.country!, // undefined if taxResident === 0
      noTin: jointTaxResident === 0 ? undefined : `${multiTin.noTin!}`, // "true" || "false", undefined if taxResident === 0
      reason: jointTaxResident === 0 || multiTin.noTin! === false ? undefined : jointTinReason, // undefined if taxResident === 0, required if noTin === true
      tinNumber: jointTaxResident === 0 || multiTin.noTin! === true ? undefined : multiTin.tinNumber!, // undefined if taxResident === 0 or noTin === true}
    };
  });

  const jointUsCitizen = joint!.declaration!.fatca!.usCitizen! === 0;
  const jointUsBorn = joint!.declaration!.fatca!.usBorn! === 0 ? "true" : "false";
  const jointCertReason =
    joint!.declaration!.fatca!.reason! === 1 ? joint!.declaration!.fatca!.explanation! : OPTIONS_FATCA_NO_CERTIFICATE[0].label;
  const jointConfirmAddress = joint!.declaration!.fatca!.confirmAddress! === 0 ? "true" : "false";

  const jointId =
    jointIdType === "Passport"
      ? [joint?.personalDetails?.id?.frontPage!]
      : [joint?.personalDetails?.id?.frontPage!, joint?.personalDetails?.id?.secondPage!];

  const jointAddress = { ...joint!.addressInformation! };
  delete jointAddress.sameAddress;

  const jointDetails =
    accountType === "Joint"
      ? {
          clientId: details!.jointHolder?.clientId!,
          contactDetails: joint!.contactDetails,
          addressInformation: jointAddress,
          declaration: {
            crs: {
              taxResident: jointTaxResident === -1 ? OPTIONS_CRS_TAX_RESIDENCY[jointTaxResident] : OPTIONS_CRS_TAX_RESIDENCY[0].label, // required
              tin: jointTin,
            },
            fatca: {
              formW9: jointUsCitizen ? `${joint!.declaration!.fatca!.formW9!}` : undefined, // "true" || "false", required if usCitizen === true
              formW8Ben: jointUsBorn === "false" ? undefined : `${joint!.declaration!.fatca!.formW8Ben!}`, // "true" || "false", required if usCitizen === false && usBorn === true && confirmAddress === true,
              confirmAddress: jointUsBorn === "false" ? undefined : jointConfirmAddress, // "true" || "false", only required if usCitizen is false and usBorn is true
              certificate: joint!.declaration!.fatca!.certificate, // required if noCertificate === false
              noCertificate: `${joint!.declaration!.fatca!.noCertificate}`, // "true" || "false", required if certificate === undefined
              reason: joint!.declaration!.fatca!.noCertificate === true ? jointCertReason : undefined, // required if noCertificate === true
              usBorn: jointUsCitizen ? undefined : jointUsBorn, // "true" || "false", required if usCitizen === false
              usCitizen: jointUsCitizen ? "true" : "false", // "true" || "false", required
            },
            // fea: {
            //   balance: parseAmountToString(joint!.declaration!.fea!.balance!),
            //   borrowingFacility: joint!.declaration!.fea!.facility! === 0 ? "true" : "false",
            //   resident: joint!.declaration!.fea!.resident! === 0 ? "true" : "false",
            // },
          },
          employmentDetails: joint!.employmentDetails,
          personalDetails: {
            countryOfBirth: joint!.personalDetails!.countryOfBirth!,
            educationLevel:
              joint!.personalDetails!.educationLevel === "Others"
                ? joint!.personalDetails!.otherEducationLevel!
                : joint!.personalDetails!.educationLevel!,
            gender: joint!.personalDetails!.gender!,
            id: jointId,
            maritalStatus: joint!.personalDetails!.maritalStatus!,
            monthlyHouseholdIncome: joint!.personalDetails!.monthlyHouseholdIncome!,
            mothersMaidenName: joint!.personalDetails!.mothersMaidenName!,
            name: joint!.personalDetails!.name!,
            nationality: joint!.personalDetails!.nationality!,
            placeOfBirth: joint!.personalDetails!.placeOfBirth!,
            salutation: joint!.personalDetails!.salutation!,
            ...jointMalaysianDetails,
            expirationDate: jointExpirationDate,
          },
        }
      : undefined;

  const principalAddress = { ...principal!.addressInformation! };
  delete principalAddress.sameAddress;
  const jointEmploymentDetails = jointDetails !== undefined ? { ...jointDetails.employmentDetails } : undefined;

  const jointContactDetails =
    jointDetails !== undefined
      ? jointDetails
          .contactDetails!.contactNumber!.map((contact) => ({
            code: contact.code,
            label: contact.label,
            value: contact.value,
          }))
          .filter((contactNumber) => contactNumber.value !== "")
      : [];

  if (jointEmploymentDetails !== undefined) {
    delete jointEmploymentDetails.isEnabled;
  }
  const request: ISubmitClientAccountRequest = {
    initId: details!.initId!,
    isEtb: false,
    incomeDistribution: personalInfo.incomeDistribution!,
    signatory: accountType === "Joint" ? personalInfo.signatory! : undefined,
    principal: {
      clientId: details!.principalHolder!.clientId!,
      addressInformation: principalAddress as ISubmitAddressInformation,
      bankSummary:
        (principal?.personalDetails?.enableBankDetails === true && personalInfo.isAllEpf === true) || personalInfo.isAllEpf === false
          ? {
              localBank: localBank as ISubmitBank[],
              foreignBank: foreignBank as ISubmitBank[],
            }
          : {
              localBank: [] as ISubmitBank[],
              foreignBank: [] as ISubmitBank[],
            },
      contactDetails: {
        contactNumber: principal!.contactDetails!.contactNumber!.map((contact) => ({
          code: contact.code,
          label: contact.label,
          value: contact.value,
        })),
        emailAddress: principal!.contactDetails!.emailAddress!,
      },
      declaration: {
        crs: {
          taxResident:
            principalTaxResident !== -1 ? OPTIONS_CRS_TAX_RESIDENCY[principalTaxResident].label : OPTIONS_CRS_TAX_RESIDENCY[0].label, // required
          tin: principalTin,
        },
        fatca: {
          formW9: principalUsCitizen ? `${principal!.declaration!.fatca!.formW9!}` : undefined, // "true" || "false", required if usCitizen === true
          formW8Ben: principalUsBorn === "false" ? undefined : `${principal!.declaration!.fatca!.formW8Ben!}`, // "true" || "false", required if usCitizen === false && usBorn === true && confirmAddress === true,
          confirmAddress: principalUsBorn === "false" ? undefined : principalConfirmAddress, // "true" || "false", only required if usCitizen is false and usBorn is true
          certificate: principal!.declaration!.fatca!.certificate, // required if noCertificate === false
          noCertificate: `${principal!.declaration!.fatca!.noCertificate}`, // "true" || "false", required if certificate === undefined
          reason: principal!.declaration!.fatca!.noCertificate === true ? principalCertReason : undefined, // required if noCertificate === true
          usBorn: principalUsCitizen ? undefined : principalUsBorn, // "true" || "false", required if usCitizen === false
          usCitizen: principalUsCitizen ? "true" : "false", // "true" || "false", required
        },
        // fea: {
        //   balance: parseAmountToString(principal!.declaration!.fea!.balance!),
        //   borrowingFacility: principal!.declaration!.fea!.facility! === 0 ? "true" : "false",
        //   resident: principal!.declaration!.fea!.resident! === 0 ? "true" : "false",
        // },
      },
      epfDetails: isInvestmentEpf ? principal!.epfDetails : undefined,
      employmentDetails: principal!.employmentDetails! as ISubmitEmploymentBase,
      personalDetails: {
        countryOfBirth: principal!.personalDetails!.countryOfBirth!,
        educationLevel:
          principal!.personalDetails!.educationLevel === "Others"
            ? principal!.personalDetails!.otherEducationLevel!
            : principal!.personalDetails!.educationLevel!,
        gender: principal!.personalDetails!.gender!,
        id: principalId,
        maritalStatus: principal!.personalDetails!.maritalStatus!,
        monthlyHouseholdIncome: principal!.personalDetails!.monthlyHouseholdIncome!,
        mothersMaidenName: principal!.personalDetails!.mothersMaidenName!,
        name: principal!.personalDetails!.name!,
        nationality: principal!.personalDetails!.nationality!,
        placeOfBirth: principal!.personalDetails!.placeOfBirth!,
        salutation: principal!.personalDetails!.salutation!,
        ...principalMalaysianDetails,
        relationship: jointRelationship,
        expirationDate: principalExpirationDate,
      },
    },
    joint:
      jointDetails !== undefined
        ? {
            clientId: jointDetails.clientId,
            addressInformation: jointDetails.addressInformation as ISubmitAddressInformation,
            contactDetails: {
              contactNumber: jointContactDetails.length > 0 ? jointContactDetails : undefined,
              emailAddress: jointDetails.contactDetails!.emailAddress! !== "" ? jointDetails.contactDetails!.emailAddress! : undefined,
            },
            declaration: jointDetails.declaration as ISubmitDeclaration,
            employmentDetails:
              jointDetails.employmentDetails?.isEnabled === true ? (jointEmploymentDetails as ISubmitEmploymentJoint) : undefined,
            personalDetails: jointDetails.personalDetails as ISubmitPersonalDetails,
          }
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
          const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];
          updatedFinishedSteps.push("Declarations");
          const newDisabledStep: TypeOnboardingKey[] = [
            "RiskAssessment",
            "Products",
            "PersonalInformation",
            "Declarations",
            "TermsAndConditions",
            "Signatures",
            "Payment",
          ];
          updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps, disabledSteps: newDisabledStep });
          return handleNextStep(ONBOARDING_ROUTES.OrderSummary);
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

  const handleBack = () => {
    handleNextStep("FEADeclaration");
  };

  // const principalSubtitle = isFea ? DECLARATION_SUMMARY.SUBHEADING_FEA : DECLARATION_SUMMARY.SUBHEADING;
  // const jointSubtitle = isFea ? DECLARATION_SUMMARY.SUBHEADING_JOINT_FEA : DECLARATION_SUMMARY.SUBHEADING_JOINT;
  const subtitle = accountType === "Joint" ? DECLARATION_SUMMARY.SUBHEADING_JOINT : DECLARATION_SUMMARY.SUBHEADING;

  return (
    <ContentPage
      handleCancel={handleBack}
      handleContinue={handleContinue}
      labelContinue={DECLARATION_SUMMARY.BUTTON_CONFIRM}
      subheading={DECLARATION_SUMMARY.HEADING}
      subtitle={subtitle}>
      <CustomSpacer space={sh24} />
      <DeclarationDetails
        accountHolder="Principal"
        accountType={accountType}
        handleNextStep={handleNextStep}
        isFea={isFea}
        name={principal?.personalDetails!.name!}
        summary={personalInfo.principal?.declaration!}
      />
      {accountType === "Joint" ? (
        <View>
          <CustomSpacer space={sh24} />
          <View style={borderBottomGray2} />
          <CustomSpacer space={sh24} />
          <DeclarationDetails
            accountHolder="Joint"
            accountType="Joint"
            handleNextStep={handleNextStep}
            isFea={isFea}
            name={joint!.personalDetails!.name!}
            summary={joint!.declaration!}
          />
        </View>
      ) : null}
    </ContentPage>
  );
};

export const DeclarationSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(DeclarationSummaryComponent);
