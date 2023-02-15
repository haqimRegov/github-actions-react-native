import moment from "moment";
import React, { FunctionComponent } from "react";

import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_ALL_ID_TYPE } from "../../../data/dictionary";
import { fsTransformNone, fsUppercase } from "../../../styles";
import { SummaryDetails } from "./Details";

const { SUMMARY } = Language.PAGE;

interface PrincipalProps {
  accountType: TypeAccountChoices;
  handleCloseViewer?: () => void;
  handleNextStep: (route: TypeOnboardingKey) => void;
  isAllEpf: boolean;
  setViewFile?: (value: FileBase64) => void;
  summary: IHolderInfoState;
  viewFile?: FileBase64 | undefined;
}

export const Principal: FunctionComponent<PrincipalProps> = ({
  accountType,
  handleCloseViewer,
  handleNextStep,
  isAllEpf,
  setViewFile,
  summary,
  viewFile,
}: PrincipalProps) => {
  const { addressInformation, bankSummary, contactDetails, employmentDetails, epfDetails, incomeDistribution, personalDetails } = summary;

  const dateOfBirth = moment(personalDetails!.dateOfBirth).format(DEFAULT_DATE_FORMAT);
  const expirationDate = moment(personalDetails!.expirationDate).format(DEFAULT_DATE_FORMAT);
  const idType = typeof personalDetails!.idType! === "string" ? personalDetails!.idType : DICTIONARY_ALL_ID_TYPE[personalDetails!.idType!];
  const isMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(idType as TypeClientID) !== 1;

  const handleOpenViewer = () => {
    if (setViewFile !== undefined) {
      setViewFile(personalDetails!.id!.frontPage!);
    }
  };

  const principalEducation =
    personalDetails!.educationLevel! !== "Others" ? personalDetails!.educationLevel! : personalDetails!.otherEducationLevel!;
  const personalDetailsSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_FULL_NAME, title: personalDetails!.name! },
    {
      label: `${idType} ${SUMMARY.LABEL_ID_NUMBER}`,
      onPress: handleOpenViewer,
      title: personalDetails!.idNumber!,
      titleIcon: "tax-card",
      titleStyle: fsUppercase,
    },
    { label: SUMMARY.LABEL_DATE_OF_BIRTH, title: dateOfBirth },
    { label: SUMMARY.LABEL_SALUTATION, title: personalDetails!.salutation! },
    { label: SUMMARY.LABEL_GENDER, title: personalDetails!.gender! },
    { label: SUMMARY.LABEL_PLACE_OF_BIRTH, title: personalDetails!.placeOfBirth!, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_COUNTRY_OF_BIRTH, title: personalDetails!.countryOfBirth! },
    { label: SUMMARY.LABEL_MOTHER, title: personalDetails!.mothersMaidenName! },
    { label: SUMMARY.LABEL_MARITAL, title: personalDetails!.maritalStatus! },
    { label: SUMMARY.LABEL_EDUCATION, title: principalEducation },
  ];

  const malaysianDetails = [
    { label: SUMMARY.LABEL_RACE, title: personalDetails!.race! },
    { label: SUMMARY.LABEL_BUMIPUTERA, title: personalDetails!.bumiputera! },
  ];

  const nonMalaysianDetails = [
    { label: SUMMARY.LABEL_COUNTRY_ISSUANCE, title: personalDetails!.countryOfIssuance },
    { label: SUMMARY.LABEL_EXPIRATION, title: expirationDate },
  ];

  if (!isMalaysian) {
    personalDetailsSummary.splice(3, 0, ...nonMalaysianDetails);
    personalDetailsSummary.splice(-3, 0, { label: SUMMARY.LABEL_NATIONALITY, title: personalDetails!.nationality });
  } else {
    personalDetailsSummary.splice(7, 0, ...malaysianDetails);
  }

  const permanentAddressLabel =
    addressInformation!.permanentAddress!.address!.line2 !== undefined || addressInformation!.permanentAddress!.address!.line3 !== undefined
      ? `${SUMMARY.LABEL_PERMANENT_ADDRESS} 1`
      : SUMMARY.LABEL_PERMANENT_ADDRESS;

  const permanentAddressSummary: LabeledTitleProps[] = [
    { label: permanentAddressLabel, title: addressInformation!.permanentAddress!.address!.line1!, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_POSTCODE, title: addressInformation!.permanentAddress!.postCode! },
    { label: SUMMARY.LABEL_CITY, title: addressInformation!.permanentAddress!.city! },
    { label: SUMMARY.LABEL_STATE, title: addressInformation!.permanentAddress!.state! },
    { label: SUMMARY.LABEL_COUNTRY, title: addressInformation!.permanentAddress!.country! },
  ];

  if (addressInformation!.permanentAddress!.address!.line2 !== undefined) {
    permanentAddressSummary.splice(1, 0, {
      label: `${SUMMARY.LABEL_PERMANENT_ADDRESS} 2`,
      title: addressInformation!.permanentAddress!.address!.line2,
      titleStyle: fsTransformNone,
    });
  }

  if (addressInformation!.permanentAddress!.address!.line3 !== undefined) {
    const index = addressInformation!.permanentAddress!.address!.line2 !== undefined ? 2 : 1;
    permanentAddressSummary.splice(index, 0, {
      label: `${SUMMARY.LABEL_PERMANENT_ADDRESS} 3`,
      title: addressInformation!.permanentAddress!.address!.line3,
      titleStyle: fsTransformNone,
    });
  }

  const mailingAddressLabel =
    addressInformation!.mailingAddress!.address!.line2 !== undefined || addressInformation!.mailingAddress!.address!.line3 !== undefined
      ? `${SUMMARY.LABEL_MAILING_ADDRESS} 1`
      : SUMMARY.LABEL_MAILING_ADDRESS;

  const mailingAddressSummary: LabeledTitleProps[] = [
    { label: mailingAddressLabel, title: addressInformation!.mailingAddress!.address!.line1!, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_POSTCODE, title: addressInformation!.mailingAddress!.postCode! },
    { label: SUMMARY.LABEL_CITY, title: addressInformation!.mailingAddress!.city! },
    { label: SUMMARY.LABEL_STATE, title: addressInformation!.mailingAddress!.state! },
    { label: SUMMARY.LABEL_COUNTRY, title: addressInformation!.mailingAddress!.country! },
  ];

  if (addressInformation!.mailingAddress!.address!.line2 !== undefined) {
    mailingAddressSummary.splice(1, 0, {
      label: `${SUMMARY.LABEL_MAILING_ADDRESS} 2`,
      title: addressInformation!.mailingAddress!.address!.line2,
      titleStyle: fsTransformNone,
    });
  }

  if (addressInformation!.mailingAddress!.address!.line3 !== undefined) {
    const index = addressInformation!.mailingAddress!.address!.line2 !== undefined ? 2 : 1;
    mailingAddressSummary.splice(index, 0, {
      label: `${SUMMARY.LABEL_MAILING_ADDRESS} 3`,
      title: addressInformation!.mailingAddress!.address!.line3,
      titleStyle: fsTransformNone,
    });
  }

  const contactDetailsSummary: LabeledTitleProps[] = contactDetails?.contactNumber!.map((contactNumber: IContactNumberState) => {
    return { label: contactNumber.label, title: contactNumber.value !== "" ? `${contactNumber.code} ${contactNumber.value}` : "-" };
  })!;

  const emailSummary: LabeledTitleProps[] = [{ label: SUMMARY.LABEL_EMAIL, title: contactDetails!.emailAddress! || "-" }];

  const epfDetailsSummary: LabeledTitleProps[] =
    epfDetails !== undefined && epfDetails.epfAccountType !== "" && epfDetails.epfMemberNumber !== ""
      ? [
          { label: SUMMARY.LABEL_EPF_NUMBER, title: epfDetails.epfMemberNumber! },
          { label: SUMMARY.LABEL_EPF_ACCOUNT, title: epfDetails.epfAccountType! },
        ]
      : [];

  const additionalInfoSummary: LabeledTitleProps[] = [{ label: SUMMARY.LABEL_INCOME_DISTRIBUTION, title: incomeDistribution }];

  const localBank: LabeledTitleProps[][] = bankSummary!.localBank!.map((bank: IBankDetailsState) => {
    const bankAccountName =
      bank.combinedBankAccountName !== "" && bank.combinedBankAccountName !== undefined
        ? bank.combinedBankAccountName
        : bank.bankAccountName;

    return [
      { label: SUMMARY.LABEL_CURRENCY, title: bank.currency!.join(", "), titleStyle: fsUppercase },
      { label: SUMMARY.LABEL_BANK_NAME, title: bank.bankName },
      { label: SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: bankAccountName },
      { label: SUMMARY.LABEL_BANK_ACCOUNT_NUMBER, title: bank.bankAccountNumber },
      { label: SUMMARY.LABEL_BANK_LOCATION, title: bank.bankLocation },
      { label: SUMMARY.LABEL_BANK_SWIFT, title: bank.bankSwiftCode ? bank.bankSwiftCode : "-" },
    ] as LabeledTitleProps[];
  });

  const foreignBank: LabeledTitleProps[][] =
    bankSummary!.foreignBank !== undefined
      ? bankSummary!.foreignBank.map((bank: IBankDetailsState) => {
          const bankAccountName =
            bank.combinedBankAccountName !== "" && bank.combinedBankAccountName !== undefined
              ? bank.combinedBankAccountName
              : bank.bankAccountName;

          return [
            { label: SUMMARY.LABEL_CURRENCY, title: bank.currency!.join(", "), titleStyle: fsUppercase },
            { label: SUMMARY.LABEL_BANK_NAME, title: bank.bankName },
            { label: SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: bankAccountName },
            { label: SUMMARY.LABEL_BANK_ACCOUNT_NUMBER, title: bank.bankAccountNumber },
            { label: SUMMARY.LABEL_BANK_LOCATION, title: bank.bankLocation },
            { label: SUMMARY.LABEL_BANK_SWIFT, title: bank.bankSwiftCode ? bank.bankSwiftCode : "-" },
          ] as LabeledTitleProps[];
        })
      : [];

  const occupationTitle =
    employmentDetails!.occupation! !== "Others" ? employmentDetails!.occupation! : employmentDetails!.othersOccupation!;
  const employmentDetailsSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_OCCUPATION, title: occupationTitle },
    { label: SUMMARY.LABEL_NATURE, title: employmentDetails!.businessNature! },
    { label: SUMMARY.LABEL_GROSS, title: employmentDetails!.grossIncome, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_MONTHLY, title: personalDetails!.monthlyHouseholdIncome!, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_EMPLOYER_NAME, title: employmentDetails!.employerName!, titleStyle: fsTransformNone },
  ];

  const employmentAddressLabel =
    employmentDetails!.address!.line2 !== undefined || employmentDetails!.address!.line3 !== undefined
      ? `${SUMMARY.LABEL_EMPLOYER_ADDRESS} 1`
      : SUMMARY.LABEL_EMPLOYER_ADDRESS;

  const employmentAddressSummary: LabeledTitleProps[] = [
    { label: employmentAddressLabel, title: employmentDetails!.address!.line1!, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_POSTCODE, title: employmentDetails!.postCode! },
    { label: SUMMARY.LABEL_CITY, title: employmentDetails!.city! },
    { label: SUMMARY.LABEL_STATE, title: employmentDetails!.state! },
    { label: SUMMARY.LABEL_COUNTRY, title: employmentDetails!.country! },
  ];

  if (employmentDetails!.address!.line2 !== undefined) {
    employmentAddressSummary.splice(1, 0, {
      label: `${SUMMARY.LABEL_EMPLOYER_ADDRESS} 2`,
      title: employmentDetails!.address!.line2,
      titleStyle: fsTransformNone,
    });
  }

  if (employmentDetails!.address!.line3 !== undefined) {
    const index = employmentDetails!.address!.line2 !== undefined ? 2 : 1;
    employmentAddressSummary.splice(index, 0, {
      label: `${SUMMARY.LABEL_EMPLOYER_ADDRESS} 3`,
      title: employmentDetails!.address!.line3,
      titleStyle: fsTransformNone,
    });
  }

  return (
    <SummaryDetails
      accountHolder="Principal"
      accountType={accountType}
      additionalInfo={additionalInfoSummary}
      contactDetails={contactDetailsSummary}
      emailSection={emailSummary}
      employmentAddress={employmentAddressSummary}
      employmentDetails={employmentDetailsSummary}
      epfDetails={epfDetailsSummary}
      foreignBankDetails={personalDetails?.enableBankDetails === false && isAllEpf === true ? [] : foreignBank}
      handleCloseViewer={handleCloseViewer}
      handleNextStep={handleNextStep}
      isMalaysian={isMalaysian}
      localBankDetails={personalDetails?.enableBankDetails === false && isAllEpf === true ? [] : localBank}
      mailingAddress={mailingAddressSummary}
      name={personalDetails!.name!}
      permanentAddress={permanentAddressSummary}
      personalDetails={personalDetailsSummary}
      viewFile={viewFile}
    />
  );
};
