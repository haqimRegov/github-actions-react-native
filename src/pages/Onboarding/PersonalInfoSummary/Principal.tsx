import moment from "moment";
import React, { FunctionComponent } from "react";

import { LabeledTitleProps } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_ALL_ID_TYPE } from "../../../data/dictionary";
import { fsTransformNone, fsUppercase } from "../../../styles";
import { SummaryDetails } from "./Details";

const { SUMMARY } = Language.PAGE;

interface PrincipalProps {
  accountType: TypeAccountChoices;
  handleNextStep: (route: TypeOnboardingRoute) => void;
  summary: IHolderInfoState;
}

export const Principal: FunctionComponent<PrincipalProps> = ({ accountType, handleNextStep, summary }: PrincipalProps) => {
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
  const permanentAddress = Object.values(addressInformation!.permanentAddress!.address!).join(" ");
  const mailingAddress = Object.values(addressInformation!.mailingAddress!.address!).join(" ");

  const permanentAddressSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_PERMANENT_ADDRESS, title: permanentAddress, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_POSTCODE, title: addressInformation!.permanentAddress!.postCode! },
    { label: SUMMARY.LABEL_CITY, title: addressInformation!.permanentAddress!.city! },
    { label: SUMMARY.LABEL_STATE, title: addressInformation!.permanentAddress!.state! },
    { label: SUMMARY.LABEL_COUNTRY, title: addressInformation!.permanentAddress!.country! },
  ];

  const mailingAddressSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_MAILING_ADDRESS, title: mailingAddress, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_POSTCODE, title: addressInformation!.mailingAddress!.postCode! },
    { label: SUMMARY.LABEL_CITY, title: addressInformation!.mailingAddress!.city! },
    { label: SUMMARY.LABEL_STATE, title: addressInformation!.mailingAddress!.state! },
    { label: SUMMARY.LABEL_COUNTRY, title: addressInformation!.mailingAddress!.country! },
  ];

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

  const employmentAddressSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_EMPLOYER_ADDRESS, title: employmentDetails!.address!, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_POSTCODE, title: employmentDetails!.postCode! },
    { label: SUMMARY.LABEL_CITY, title: employmentDetails!.city! },
    { label: SUMMARY.LABEL_STATE, title: employmentDetails!.state! },
    { label: SUMMARY.LABEL_COUNTRY, title: employmentDetails!.country! },
  ];

  return (
    <SummaryDetails
      accountHolder="Principal"
      accountType={accountType}
      additionalInfo={additionalInfoSummary}
      contactDetails={contactDetailsSummary}
      employmentAddress={employmentAddressSummary}
      employmentDetails={employmentDetailsSummary}
      epfDetails={epfDetailsSummary}
      foreignBankDetails={foreignBank}
      handleNextStep={handleNextStep}
      localBankDetails={localBank}
      mailingAddress={mailingAddressSummary}
      name={personalDetails!.name!}
      permanentAddress={permanentAddressSummary}
      personalDetails={personalDetailsSummary}
    />
  );
};
