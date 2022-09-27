import moment from "moment";
import React, { FunctionComponent } from "react";

import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_ALL_ID_TYPE } from "../../../data/dictionary";
import { fsTransformNone, fsUppercase } from "../../../styles";
import { SummaryDetails } from "./Details";

const { SUMMARY } = Language.PAGE;

interface PrincipalProps {
  accountType: TypeAccountChoices;
  handleNextStep: (route: TypeOnboardingKey) => void;
  isAllEpf: boolean;
  summary: IHolderInfoState;
}

export const Principal: FunctionComponent<PrincipalProps> = ({ accountType, handleNextStep, isAllEpf, summary }: PrincipalProps) => {
  const { addressInformation, bankSummary, contactDetails, employmentDetails, epfDetails, personalDetails } = summary;

  const dateOfBirth = moment(personalDetails!.dateOfBirth).format(DEFAULT_DATE_FORMAT);
  const expirationDate = moment(personalDetails!.expirationDate).format(DEFAULT_DATE_FORMAT);
  const idType = typeof personalDetails!.idType! === "string" ? personalDetails!.idType : DICTIONARY_ALL_ID_TYPE[personalDetails!.idType!];
  const isMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(idType as TypeClientID) !== 1;

  const personalDetailsSummary: LabeledTitleProps[] = [
    { label: `${idType} ${SUMMARY.LABEL_ID_NUMBER}`, title: personalDetails!.idNumber!, titleStyle: fsUppercase },
    { label: SUMMARY.LABEL_DATE_OF_BIRTH, title: dateOfBirth },
    { label: SUMMARY.LABEL_SALUTATION, title: personalDetails!.salutation! },
    { label: SUMMARY.LABEL_GENDER, title: personalDetails!.gender! },
    { label: SUMMARY.LABEL_NATIONALITY, title: personalDetails!.nationality! },
    { label: SUMMARY.LABEL_PLACE_OF_BIRTH, title: personalDetails!.placeOfBirth!, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_COUNTRY_OF_BIRTH, title: personalDetails!.countryOfBirth! },
    { label: SUMMARY.LABEL_RISK_PROFILE, title: personalDetails!.riskProfile! },
  ];

  let additionalInfoSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_MOTHER, title: personalDetails!.mothersMaidenName! },
    { label: SUMMARY.LABEL_MARITAL, title: personalDetails!.maritalStatus! },
    { label: SUMMARY.LABEL_EDUCATION, title: personalDetails!.educationLevel!, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_MONTHLY, title: personalDetails!.monthlyHouseholdIncome!, titleStyle: fsTransformNone },
  ];

  const jointInfoSummary = [{ label: SUMMARY.LABEL_RELATIONSHIP, title: personalDetails!.relationship! }];

  const nonMalaysianDetails = [{ label: SUMMARY.LABEL_EXPIRATION, title: expirationDate }];
  const malaysianDetails: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_RACE, title: personalDetails!.race! },
    { label: SUMMARY.LABEL_BUMIPUTERA, title: personalDetails!.bumiputera! },
  ];

  if (isMalaysian) {
    additionalInfoSummary = [...malaysianDetails, ...additionalInfoSummary];
  } else {
    personalDetailsSummary.splice(5, 0, nonMalaysianDetails[0]);
  }

  if (accountType === "Joint") {
    additionalInfoSummary.push(jointInfoSummary[0]);
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

  let contactDetailsSummary: LabeledTitleProps[] = [{ label: SUMMARY.LABEL_EMAIL, title: contactDetails!.emailAddress! }];

  const otherContactDetails: LabeledTitleProps[] = contactDetails?.contactNumber!.map((contactNumber: IContactNumberState) => {
    return { label: contactNumber.label, title: `${contactNumber.code} ${contactNumber.value}` };
  })!;

  contactDetailsSummary = contactDetailsSummary.concat(otherContactDetails);

  const epfDetailsSummary: LabeledTitleProps[] =
    epfDetails !== undefined && epfDetails.epfAccountType !== "" && epfDetails.epfMemberNumber !== ""
      ? [
          { label: SUMMARY.LABEL_EPF_NUMBER, title: epfDetails.epfMemberNumber! },
          { label: SUMMARY.LABEL_EPF_ACCOUNT, title: epfDetails.epfAccountType! },
        ]
      : [];

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
      { label: SUMMARY.LABEL_BANK_SWIFT, title: bank.bankSwiftCode ? bank.bankSwiftCode : "-" },
      { label: SUMMARY.LABEL_BANK_LOCATION, title: bank.bankLocation },
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
            { label: SUMMARY.LABEL_BANK_SWIFT, title: bank.bankSwiftCode ? bank.bankSwiftCode : "-" },
            { label: SUMMARY.LABEL_BANK_LOCATION, title: bank.bankLocation },
          ] as LabeledTitleProps[];
        })
      : [];

  const employmentDetailsSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_OCCUPATION, title: employmentDetails!.occupation! },
    { label: SUMMARY.LABEL_NATURE, title: employmentDetails!.businessNature! },
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
      employmentAddress={employmentAddressSummary}
      employmentDetails={employmentDetailsSummary}
      epfDetails={epfDetailsSummary}
      foreignBankDetails={personalDetails?.enableBankDetails === false && isAllEpf === true ? [] : foreignBank}
      handleNextStep={handleNextStep}
      localBankDetails={personalDetails?.enableBankDetails === false && isAllEpf === true ? [] : localBank}
      mailingAddress={mailingAddressSummary}
      name={personalDetails!.name!}
      permanentAddress={permanentAddressSummary}
      personalDetails={personalDetailsSummary}
    />
  );
};
