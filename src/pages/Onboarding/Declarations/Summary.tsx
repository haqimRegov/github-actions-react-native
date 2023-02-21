import moment from "moment";
import React, { Fragment, FunctionComponent, useRef } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, SelectionBanner } from "../../../components";
import { Language } from "../../../constants";
import {
  EMPLOYMENT_EXEMPTIONS,
  OPTION_CRS_NO_TIN_REQUIRED,
  OPTIONS_CRS_TAX_RESIDENCY,
  OPTIONS_CRS_TIN_REASONS,
} from "../../../data/dictionary";
import { getAddress, getFatcaRequest, handleSignatory } from "../../../helpers";
import { submitClientAccount } from "../../../network-actions";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import {
  borderBottomRed1,
  flexChild,
  fs10RegGray6,
  fs12BoldBlack2,
  px,
  rowCenterVertical,
  sh16,
  sh20,
  sh24,
  sw16,
  sw24,
} from "../../../styles";
import { DeclarationDetails } from "../../../templates";
import { deleteKey, isNotEmpty, parseAmountToString } from "../../../utils";

const { DECLARATION_SUMMARY } = Language.PAGE;

interface DeclarationSummaryProps extends PersonalInfoStoreProps, OnboardingContentProps {
  navigation: IStackNavigationProp;
}

export const DeclarationSummaryComponent: FunctionComponent<DeclarationSummaryProps> = ({
  accountType,
  addOrders,
  addPersonalInfo,
  details,
  handleNextStep,
  investmentDetails,
  navigation,
  onboarding,
  personalInfo,
  setLoading,
  updateOnboarding,
}: DeclarationSummaryProps) => {
  const { joint, principal } = personalInfo;
  const { disabledSteps } = onboarding;

  const fetching = useRef<boolean>(false);
  const baseDeletedProperty: TEmploymentDetailsState[] = ["isEnabled", "isOptional", "othersOccupation"];
  const deletedExemptionProperty: TEmploymentDetailsState[] = [
    "address",
    "businessNature",
    "city",
    "country",
    "employerName",
    "postCode",
    "state",
  ];

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

  const jointId =
    jointIdType === "Passport"
      ? [joint?.personalDetails?.id?.frontPage!]
      : [joint?.personalDetails?.id?.frontPage!, joint?.personalDetails?.id?.secondPage!];

  const jointAddress = { ...joint!.addressInformation! };
  delete jointAddress.sameAddress;

  const jointFatcaRequest = accountType === "Joint" ? getFatcaRequest(joint!.declaration!.fatca!) : {};

  const jointDetails =
    accountType === "Joint"
      ? {
          clientId: details!.jointHolder?.clientId!,
          contactDetails: joint!.contactDetails,
          addressInformation: jointAddress,
          declaration: {
            crs: {
              taxResident: jointTaxResident !== -1 ? OPTIONS_CRS_TAX_RESIDENCY[jointTaxResident].label : OPTIONS_CRS_TAX_RESIDENCY[0].label, // required
              tin: jointTin,
            },
            fatca: { ...jointFatcaRequest },
          },
          // check if employment details is enabled and filled
          employmentDetails: joint!.employmentDetails!.isEnabled === true ? { ...joint!.employmentDetails } : undefined,
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

  // for joint holder
  // check if employment details is existing
  if (
    jointDetails !== undefined &&
    jointDetails.employmentDetails !== undefined &&
    jointDetails.employmentDetails.occupation !== undefined
  ) {
    // check if occupation is others
    if (jointDetails!.employmentDetails!.occupation === "Others") {
      jointDetails.employmentDetails.occupation = jointDetails.employmentDetails.othersOccupation;
    }

    // check if occupation is exempted for other details
    if (
      EMPLOYMENT_EXEMPTIONS.indexOf(jointDetails!.employmentDetails.occupation!) !== -1 &&
      jointDetails!.employmentDetails!.isOptional === false
    ) {
      jointDetails!.employmentDetails = { ...deleteKey(jointDetails!.employmentDetails!, [...deletedExemptionProperty, "grossIncome"]) };
    }
    // delete keys that are not used for submitting request
    jointDetails!.employmentDetails = { ...deleteKey(jointDetails!.employmentDetails!, [...baseDeletedProperty]) };
  }

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

  let principalEmploymentDetails: IEmploymentDetailsState | ISubmitEmploymentBase = { ...principal!.employmentDetails! };

  // for principal holder or individual
  // check if employment details is existing
  if (principalEmploymentDetails !== undefined && principalEmploymentDetails.occupation !== undefined) {
    // check if occupation is others
    if (principalEmploymentDetails.occupation === "Others") {
      principalEmploymentDetails.occupation = principalEmploymentDetails.othersOccupation;
    }

    // check if occupation is exempted for other details
    if (EMPLOYMENT_EXEMPTIONS.indexOf(principalEmploymentDetails.occupation!) !== -1 && principalEmploymentDetails!.isOptional === false) {
      principalEmploymentDetails = { ...deleteKey(principalEmploymentDetails!, [...deletedExemptionProperty]) };
    }
    // delete keys that are not used for submitting request
    principalEmploymentDetails = { ...deleteKey(principalEmploymentDetails!, [...baseDeletedProperty, "grossIncome"]) };
  }

  const principalFatcaRequest = getFatcaRequest(principal!.declaration!.fatca!);

  const principalAddress = { ...principal!.addressInformation! };
  delete principalAddress.sameAddress;

  const request: ISubmitClientAccountRequest = {
    initId: details!.initId!,
    isEtb: false,
    incomeDistribution: personalInfo.incomeDistribution!,
    signatory: accountType === "Joint" ? handleSignatory(personalInfo.signatory!) : undefined,
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
        fatca: { ...principalFatcaRequest },
      },
      epfDetails: isInvestmentEpf ? principal!.epfDetails : undefined,
      employmentDetails: principalEmploymentDetails as ISubmitEmploymentBase,
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
            employmentDetails: jointDetails.employmentDetails as ISubmitEmploymentJoint,
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

          // do not allow to click finished steps
          const newFinishedSteps: TypeOnboardingKey[] = ["RiskSummary", "Products", "PersonalInformation", "Declarations"];
          const newDisabledStep: TypeOnboardingKey[] = [
            "RiskSummary",
            "Products",
            "PersonalInformation",
            "Declarations",
            "Acknowledgement",
            "OrderSummary",
            "TermsAndConditions",
            "Signatures",
            "Payment",
          ];

          updateOnboarding({ ...onboarding, disabledSteps: newDisabledStep, finishedSteps: newFinishedSteps });

          return handleNextStep("OrderSummary");
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

  const handleEditFatca = () => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];

    // add to disabledSteps when editing
    if (updatedDisabledSteps.includes("DeclarationSummary") === false) {
      updatedDisabledSteps.push("DeclarationSummary");
    }

    // enable edit mode
    addPersonalInfo({ ...personalInfo, editMode: true });

    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });

    handleNextStep("FATCADeclaration");
  };

  const handleEditCrs = () => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];

    // add to disabledSteps when editing
    if (updatedDisabledSteps.includes("DeclarationSummary") === false) {
      updatedDisabledSteps.push("DeclarationSummary");
    }

    // enable edit mode
    addPersonalInfo({ ...personalInfo, editMode: true });

    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep("CRSDeclaration");
  };

  const principalFatcaAddress =
    isNotEmpty(principal!.addressInformation) && isNotEmpty(principal!.addressInformation!.mailingAddress)
      ? getAddress(principal!.addressInformation!.mailingAddress!)
      : undefined;

  const jointFatcaAddress =
    accountType === "Joint" && isNotEmpty(joint!.addressInformation) && isNotEmpty(joint!.addressInformation!.mailingAddress)
      ? getAddress(joint!.addressInformation!.mailingAddress!)
      : undefined;

  return (
    <View style={flexChild}>
      <ContentPage subheading={DECLARATION_SUMMARY.HEADING} subtitle={DECLARATION_SUMMARY.LABEL_SUBHEADER}>
        <View style={px(sw24)}>
          {accountType === "Joint" ? (
            <Fragment>
              <CustomSpacer space={sh16} />
              <View>
                <View style={{ ...rowCenterVertical, height: sh20 }}>
                  <Text style={fs10RegGray6}>{DECLARATION_SUMMARY.LABEL_PRINCIPAL_HOLDER}</Text>
                  <CustomSpacer isHorizontal space={sw16} />
                  <Text style={fs12BoldBlack2}>{principal?.personalDetails?.name}</Text>
                </View>
                <View style={borderBottomRed1} />
              </View>
            </Fragment>
          ) : null}
          <CustomSpacer space={sh16} />
          <DeclarationDetails
            address={principalFatcaAddress}
            declarations={["fatca", "crs"]}
            handleEditCrs={handleEditCrs}
            handleEditFatca={handleEditFatca}
            summary={personalInfo.principal?.declaration!}
          />
          {accountType === "Joint" ? (
            <View>
              <CustomSpacer space={sh24} />
              <View>
                <View style={{ ...rowCenterVertical, height: sh20 }}>
                  <Text style={fs10RegGray6}>{DECLARATION_SUMMARY.LABEL_JOINT_HOLDER}</Text>
                  <CustomSpacer isHorizontal space={sw16} />
                  <Text style={fs12BoldBlack2}>{joint?.personalDetails?.name}</Text>
                </View>
                <View style={borderBottomRed1} />
              </View>
              <CustomSpacer space={sh16} />
              <DeclarationDetails
                address={jointFatcaAddress}
                declarations={["fatca", "crs"]}
                handleEditCrs={handleEditCrs}
                handleEditFatca={handleEditFatca}
                summary={personalInfo.joint?.declaration!}
              />
            </View>
          ) : null}
        </View>
      </ContentPage>
      <CustomSpacer space={sh24} />
      <SelectionBanner
        label={DECLARATION_SUMMARY.BANNER_TITLE}
        labelSubmit={DECLARATION_SUMMARY.BUTTON_NEXT}
        submitOnPress={handleContinue}
      />
    </View>
  );
};

export const DeclarationSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(DeclarationSummaryComponent);
