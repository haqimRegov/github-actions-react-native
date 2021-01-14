import moment from "moment";
import React, { FunctionComponent } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../../components";
import { Language, ONBOARDING_ROUTES } from "../../../../constants";
import { OPTIONS_CRS_TAX_RESIDENCY, OPTIONS_CRS_TIN_REASONS, OPTIONS_FATCA_NO_CERTIFICATE } from "../../../../data/dictionary";
import { submitClientAccount } from "../../../../network-actions";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../../store";
import { borderBottomBlack21, sh24 } from "../../../../styles";
import { DeclarationDetails } from "./Details";

const { DECLARATION_SUMMARY } = Language.PAGE;

interface DeclarationSummaryProps extends PersonalInfoStoreProps, OnboardingContentProps {}

export const DeclarationSummaryComponent: FunctionComponent<DeclarationSummaryProps> = ({
  accountType,
  details,
  addOrders,
  handleNextStep,
  investmentDetails,
  onboarding,
  personalInfo,
  setLoading,
  updateOnboarding,
}: DeclarationSummaryProps) => {
  const { finishedSteps } = onboarding;
  const { principal, joint } = personalInfo;
  const jointAge = moment().diff(joint?.personalDetails?.dateOfBirth, "years");

  // TODO handle if FEA
  const isFea = 100 < 500;

  const handleSetupClient = async () => {
    setLoading(true);
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
            bumiputera: `${principal!.personalDetails!.bumiputera === "Yes"}`,
            race: principal!.personalDetails!.race!,
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
        fundId: fundDetails.fundId!,
        fundingOption: investment.fundPaymentMethod!, // TODO backend to fix
        fundClass: investment.fundClass,
        fundCurrency: investment.fundCurrency!,
        investmentAmount: investment.investmentAmount!,
        isScheduled: `${investment.scheduledInvestment!}`,
        scheduledInvestmentAmount: investment.scheduledInvestmentAmount,
        salesCharge: investment.investmentSalesCharge!,
        scheduledSalesCharge: investment.scheduledSalesCharge,
      };
    });

    const localBank = principal!.bankSummary!.localBank!.map((bank) => {
      const newBank = { ...bank, bankName: bank.bankName === "Others" ? bank.otherBankName! : bank.bankName! };
      delete newBank.otherBankName;
      return newBank;
    });

    const foreignBank = principal!.bankSummary!.foreignBank!.map((bank) => {
      const newBank = { ...bank, bankName: bank.bankName === "Others" ? bank.otherBankName! : bank.bankName! };
      delete newBank.otherBankName;
      return newBank;
    });

    const principalId =
      principalIdType !== "NRIC"
        ? [principal!.personalDetails!.id!.frontPage!]
        : [principal!.personalDetails!.id!.frontPage!, principal!.personalDetails!.id!.secondPage!];

    const principalTaxResident = principal!.declaration!.crs!.taxResident!;
    const principalTinReason =
      principal!.declaration!.crs!.reason! === 2
        ? principal!.declaration!.crs!.explanation!
        : OPTIONS_CRS_TIN_REASONS[principal!.declaration!.crs!.reason!];
    const principalUsCitizen = principal!.declaration!.fatca!.usCitizen! === 0;
    const principalUsBorn = principal!.declaration!.fatca!.usBorn! === 0 ? "true" : "false";
    const principalCertReason =
      principal!.declaration!.fatca!.reason! === 1 ? principal!.declaration!.fatca!.explanation! : OPTIONS_FATCA_NO_CERTIFICATE[0];
    const principalConfirmAddress = principal!.declaration!.fatca!.confirmAddress! === 0 ? "true" : "false";

    const jointTaxResident = joint!.declaration!.crs!.taxResident!;
    const jointTinReason =
      joint!.declaration!.crs!.reason! === 2
        ? joint!.declaration!.crs!.explanation!
        : OPTIONS_CRS_TIN_REASONS[joint!.declaration!.crs!.reason!];
    const jointUsCitizen = joint!.declaration!.fatca!.usCitizen! === 0;
    const jointUsBorn = joint!.declaration!.fatca!.usBorn! === 0 ? "true" : "false";
    const jointCertReason =
      joint!.declaration!.fatca!.reason! === 1 ? joint!.declaration!.fatca!.explanation! : OPTIONS_FATCA_NO_CERTIFICATE[0];
    const jointConfirmAddress = joint!.declaration!.fatca!.confirmAddress! === 0 ? "true" : "false";

    const jointId =
      jointIdType !== "NRIC"
        ? [joint?.personalDetails?.id?.frontPage!]
        : [joint?.personalDetails?.id?.frontPage!, joint?.personalDetails?.id?.secondPage!];

    const jointDetails =
      accountType === "Joint"
        ? {
            clientId: details!.jointHolder?.clientId!,
            contactDetails: joint!.contactDetails,
            addressInformation: joint!.addressInformation! as ISubmitAddress,
            declaration: {
              crs: {
                country: jointTaxResident === 0 ? undefined : joint!.declaration!.crs!.country!, // undefined if taxResident === 0
                noTin: jointTaxResident === 0 ? undefined : `${joint!.declaration!.crs!.noTin!}`, // "true" || "false", undefined if taxResident === 0
                reason: jointTaxResident === 0 || joint!.declaration!.crs!.noTin! === false ? undefined : jointTinReason, // undefined if taxResident === 0, required if noTin === true
                taxResident: OPTIONS_CRS_TAX_RESIDENCY[jointTaxResident], // required
                tinNumber:
                  jointTaxResident === 0 || joint!.declaration!.crs!.noTin! === true ? undefined : joint!.declaration!.crs!.tinNumber!, // undefined if taxResident === 0 or noTin === true
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
              fea: {
                balance: joint!.declaration!.fea!.balance!,
                borrowingFacility: joint!.declaration!.fea!.facility! === 0 ? "true" : "false",
                resident: joint!.declaration!.fea!.resident! === 0 ? "true" : "false",
              },
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
    const newRequest = {
      incomeDistribution: personalInfo!.incomeDistribution!,
      signatory: accountType === "Joint" ? personalInfo!.signatory! : undefined,
      principal: {
        clientId: details!.principalHolder!.clientId!,
        addressInformation: principal!.addressInformation! as ISubmitAddressInformation,
        bankSummary: {
          localBank: localBank as ISubmitBank[],
          foreignBank: foreignBank as ISubmitBank[],
        },
        contactDetails: principal!.contactDetails! as ISubmitContactDetails,
        declaration: {
          crs: {
            country: principalTaxResident === 0 ? undefined : principal!.declaration!.crs!.country!, // undefined if taxResident === 0
            noTin: principalTaxResident === 0 ? undefined : `${principal!.declaration!.crs!.noTin!}`, // "true" || "false", undefined if taxResident === 0
            reason: principalTaxResident === 0 || principal!.declaration!.crs!.noTin! === false ? undefined : principalTinReason, // undefined if taxResident === 0, required if noTin === true
            taxResident: OPTIONS_CRS_TAX_RESIDENCY[principalTaxResident], // required
            tinNumber:
              principalTaxResident === 0 || principal!.declaration!.crs!.noTin! === true
                ? undefined
                : principal!.declaration!.crs!.tinNumber!, // undefined if taxResident === 0 or noTin === true
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
          fea: {
            balance: principal!.declaration!.fea!.balance!,
            borrowingFacility: principal!.declaration!.fea!.facility! === 0 ? "true" : "false",
            resident: principal!.declaration!.fea!.resident! === 0 ? "true" : "false",
          },
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
              contactDetails: jointDetails.contactDetails as ISubmitContactDetails,
              declaration: jointDetails.declaration as ISubmitDeclaration,
              employmentDetails: jointDetails.employmentDetails as ISubmitEmploymentJoint,
              personalDetails: jointDetails.personalDetails as ISubmitPersonalDetails,
            }
          : undefined,
      investments: investments,
    };

    // eslint-disable-next-line no-console
    console.log("request", newRequest);
    const response: ISubmitClientAccountResponse = await submitClientAccount(newRequest);
    setLoading(false);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        // eslint-disable-next-line no-console
        console.log("data", data);
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
        Alert.alert(`${error.message} - ${error.errorList?.join(" ")}`);
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

  const principalSubtitle = isFea ? DECLARATION_SUMMARY.SUBHEADING_FEA : DECLARATION_SUMMARY.SUBHEADING;
  const jointSubtitle = isFea ? DECLARATION_SUMMARY.SUBHEADING_JOINT_FEA : DECLARATION_SUMMARY.SUBHEADING_JOINT;
  const subtitle = accountType === "Joint" && jointAge >= 18 ? jointSubtitle : principalSubtitle;

  return (
    <ContentPage
      handleCancel={handleBack}
      handleContinue={handleContinue}
      labelContinue={DECLARATION_SUMMARY.BUTTON_CONFIRM}
      subheading={DECLARATION_SUMMARY.HEADING}
      subtitle={subtitle}>
      <CustomSpacer space={sh24} />
      <DeclarationDetails
        address={principal!.addressInformation!.permanentAddress!.address!}
        accountHolder="Principal"
        accountType={accountType}
        handleNextStep={handleNextStep}
        isFea={isFea}
        name={principal?.personalDetails!.name!}
        summary={personalInfo.principal?.declaration!}
      />
      {accountType === "Joint" && jointAge >= 18 ? (
        <View>
          <CustomSpacer space={sh24} />
          <View style={borderBottomBlack21} />
          <CustomSpacer space={sh24} />
          <DeclarationDetails
            address={joint!.addressInformation!.permanentAddress!.address!}
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
