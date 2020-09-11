import moment from "moment";
import React, { FunctionComponent } from "react";

import { LabeledTitleProps } from "../../../components";
import { Language, PAYMENT_DATE_FORMAT } from "../../../constants";
import { DICTIONARY_ALL_ID_TYPE, OPTIONS_TAX_RESIDENCY, OPTIONS_US_BORN } from "../../../data/dictionary";
import { fsTransformNone, fsUppercase, sw200 } from "../../../styles";
import { SummaryDetails } from "./Details";

const { SUMMARY } = Language.PAGE;

interface JointProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
  summary: IHolderInfoState;
}

export const Joint: FunctionComponent<JointProps> = ({ summary }: JointProps) => {
  const { addressInformation, bankSummary, contactDetails, declaration, employmentDetails, epfDetails, personalDetails } = summary;

  const dateOfBirth = moment(personalDetails?.dateOfBirth).format(PAYMENT_DATE_FORMAT);
  const expirationDate = moment(personalDetails!.expirationDate).format(PAYMENT_DATE_FORMAT);
  const idType = typeof personalDetails!.idType! === "string" ? personalDetails!.idType! : DICTIONARY_ALL_ID_TYPE[personalDetails!.idType!];
  const isMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(idType as TypeClientID) !== 1;
  const taxResidency =
    typeof declaration!.crs.taxResident === "string" ? declaration!.crs.taxResident : OPTIONS_TAX_RESIDENCY[declaration!.crs.taxResident];
  const usBorn = typeof declaration!.fatca.usBorn === "string" ? declaration!.fatca.usBorn : OPTIONS_US_BORN[declaration!.fatca.usBorn];

  const personalDetailsSummary: LabeledTitleProps[] = [
    { label: `${idType} ${SUMMARY.LABEL_ID_NUMBER}`, title: personalDetails!.idNumber!, titleStyle: fsUppercase },
    { label: SUMMARY.LABEL_DATE_OF_BIRTH, title: dateOfBirth },
    { label: SUMMARY.LABEL_SALUTATION, title: personalDetails!.salutation },
    { label: SUMMARY.LABEL_GENDER, title: personalDetails!.gender },
    { label: SUMMARY.LABEL_NATIONALITY, title: personalDetails!.nationality },
    { label: SUMMARY.LABEL_PLACE_OF_BIRTH, title: personalDetails!.placeOfBirth, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_COUNTRY_OF_BIRTH, title: personalDetails!.countryOfBirth },
    { label: SUMMARY.LABEL_RISK_PROFILE, title: personalDetails!.riskProfile },
  ];

  let additionalInfoSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_MOTHER, title: personalDetails!.mothersMaidenName! },
    { label: SUMMARY.LABEL_MARITAL, title: personalDetails!.maritalStatus! },
    { label: SUMMARY.LABEL_EDUCATION, title: personalDetails!.educationLevel!, titleStyle: fsTransformNone },
  ];

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

  const permanentAddressSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_PERMANENT_ADDRESS, title: addressInformation!.permanentAddress.address, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_POSTCODE, title: addressInformation!.permanentAddress.postCode },
    { label: SUMMARY.LABEL_CITY, title: addressInformation!.permanentAddress.city },
    { label: SUMMARY.LABEL_STATE, title: addressInformation!.permanentAddress.state },
    { label: SUMMARY.LABEL_COUNTRY, title: addressInformation!.permanentAddress.country },
  ];

  const mailingAddressSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_MAILING_ADDRESS, title: addressInformation!.mailingAddress.address, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_POSTCODE, title: addressInformation!.mailingAddress.postCode },
    { label: SUMMARY.LABEL_CITY, title: addressInformation!.mailingAddress.city },
    { label: SUMMARY.LABEL_STATE, title: addressInformation!.mailingAddress.state },
    { label: SUMMARY.LABEL_COUNTRY, title: addressInformation!.mailingAddress.country },
  ];

  const mobileNumber = `${contactDetails!.mobileNumberCode} ${contactDetails!.mobileNumber}`;
  const homeNumber = `${contactDetails!.homeNumberCode} ${contactDetails!.homeNumber}`;
  const homeNumberSummary = { label: SUMMARY.LABEL_HOME_NUMBER, title: homeNumber };
  const officeNumber = `${contactDetails!.officeNumberCode} ${contactDetails!.officeNumber}`;
  const officeNumberSummary = { label: SUMMARY.LABEL_OFFICE_NUMBER, title: officeNumber };
  const faxNumber = `${contactDetails!.faxNumberCode} ${contactDetails!.faxNumber}`;
  const faxNumberSummary = { label: SUMMARY.LABEL_FAX_NUMBER, title: faxNumber };

  const contactDetailsSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_EMAIL, title: contactDetails!.emailAddress },
    { label: SUMMARY.LABEL_MOBILE_NUMBER, title: mobileNumber },
  ];

  if (contactDetails!.homeNumber !== undefined) {
    contactDetailsSummary.push(homeNumberSummary);
  }
  if (contactDetails!.officeNumber !== undefined) {
    contactDetailsSummary.push(officeNumberSummary);
  }
  if (contactDetails!.faxNumber !== undefined) {
    contactDetailsSummary.push(faxNumberSummary);
  }

  const epfDetailsSummary: LabeledTitleProps[] =
    epfDetails !== undefined
      ? [
          { label: SUMMARY.LABEL_EPF_NUMBER, title: epfDetails!.epfMemberNumber },
          { label: SUMMARY.LABEL_EPF_ACCOUNT, title: epfDetails!.epfAccountType },
        ]
      : [];

  const localBank: LabeledTitleProps[][] = bankSummary!.localBank.map((bank: IBankDetailsState) => {
    return [
      { label: SUMMARY.LABEL_CURRENCY, title: bank.currency.join(", "), titleStyle: fsUppercase },
      { label: SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: bank.bankAccountName },
      { label: SUMMARY.LABEL_BANK_NAME, title: bank.bankName },
      { label: SUMMARY.LABEL_BANK_ACCOUNT_NUMBER, title: bank.bankAccountNumber },
      { label: SUMMARY.LABEL_BANK_SWIFT, title: bank.bankSwiftCode ? bank.bankSwiftCode : "-" },
      { label: SUMMARY.LABEL_BANK_LOCATION, title: bank.bankLocation },
    ] as LabeledTitleProps[];
  });

  const foreignBank: LabeledTitleProps[][] =
    bankSummary!.foreignBank !== undefined
      ? bankSummary!.foreignBank.map((bank: IBankDetailsState) => {
          return [
            { label: SUMMARY.LABEL_CURRENCY, title: bank.currency.join(", "), titleStyle: fsUppercase },
            { label: SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: bank.bankAccountName },
            { label: SUMMARY.LABEL_BANK_NAME, title: bank.bankName },
            { label: SUMMARY.LABEL_BANK_ACCOUNT_NUMBER, title: bank.bankAccountNumber },
            { label: SUMMARY.LABEL_BANK_SWIFT, title: bank.bankSwiftCode ? bank.bankSwiftCode : "-" },
            { label: SUMMARY.LABEL_BANK_LOCATION, title: bank.bankLocation },
          ] as LabeledTitleProps[];
        })
      : [];

  const employmentDetailsSummary: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_OCCUPATION, title: employmentDetails!.occupation },
    { label: SUMMARY.LABEL_NATURE, title: employmentDetails!.businessNature },
    { label: SUMMARY.LABEL_MONTHLY, title: employmentDetails!.monthlyHouseholdIncome, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_GROSS, title: employmentDetails!.grossIncome!, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_EMPLOYER_NAME, title: employmentDetails!.employerName, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_EMPLOYER_ADDRESS, title: employmentDetails!.address, titleStyle: fsTransformNone },
    { label: SUMMARY.LABEL_POSTCODE, title: employmentDetails!.postCode },
    { label: SUMMARY.LABEL_CITY, title: employmentDetails!.city },
    { label: SUMMARY.LABEL_STATE, title: employmentDetails!.state },
    { label: SUMMARY.LABEL_COUNTRY, title: employmentDetails!.country },
  ];

  const tinDeclaration: LabeledTitleProps[][] = declaration!.crs.tin.map((tin: ITinState, index: number) => {
    const declaredTin = [
      { label: SUMMARY.LABEL_TIN_COUNTRY, title: tin.country },
      { label: SUMMARY.LABEL_TIN_NUMBER, title: tin.noTin ? "-" : tin.tinNumber },
    ];
    const tinReason: LabeledTitleProps = { label: SUMMARY.LABEL_TIN_REASON, title: tin.reason!, titleStyle: fsTransformNone };
    if (tin.reason !== undefined && index === 0) {
      declaredTin.push(tinReason);
    }
    return declaredTin;
  });

  const declarationPartial: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_CITIZENSHIP, title: declaration!.fatca.usCitizen ? "Yes" : "No" },
    { label: SUMMARY.LABEL_US_BORN, title: declaration!.fatca.usBorn ? "Yes" : "No" },
    { label: SUMMARY.LABEL_RESIDENT, title: declaration!.crs.taxResident ? "Yes" : "No" },
    { label: SUMMARY.LABEL_CERTIFICATE, title: declaration!.fatca.certificate ? declaration!.fatca.certificate.name : "-" },
    { label: SUMMARY.LABEL_JURISDICTION, labelStyle: { width: sw200 }, title: taxResidency },
  ];

  if (usBorn === OPTIONS_US_BORN[0] && declaration!.fatca.noCertificate === true) {
    declarationPartial.splice(4, 0, {
      label: SUMMARY.LABEL_CERTIFICATE_REASON,
      title: declaration!.fatca.reason!,
      titleStyle: fsTransformNone,
    });
  }

  const declarationSummary =
    taxResidency === OPTIONS_TAX_RESIDENCY[0] ? declarationPartial : declarationPartial.concat(tinDeclaration.flat());

  return (
    <SummaryDetails
      accountHolder="Joint"
      accountType="Joint"
      additionalInfo={additionalInfoSummary}
      contactDetails={contactDetailsSummary}
      declarationDetails={declarationSummary}
      employmentDetails={employmentDetailsSummary}
      epfDetails={epfDetailsSummary}
      foreignBankDetails={foreignBank}
      localBankDetails={localBank}
      mailingAddress={mailingAddressSummary}
      name={personalDetails!.name}
      permanentAddress={permanentAddressSummary}
      personalDetails={personalDetailsSummary}
    />
  );
};
