import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";

import { CustomSpacer, IInfoStackData, InfoStack, TextSpaceArea } from "../../../../components";
import { DEFAULT_DATE_FORMAT, FULL_DATE_FORMAT, Language } from "../../../../constants";
import { fs24BoldGray6, sh24, sh8 } from "../../../../styles";
import { isNotEmpty, titleCaseString } from "../../../../utils";

const { ADD_CLIENT } = Language.PAGE;

interface NewSalesSummaryProps {
  accountType: TypeAccountChoices;
  jointHolder?: IClientBasicInfo;
  principalHolder: IClientBasicInfo;
}

export const NewSalesSummary: FunctionComponent<NewSalesSummaryProps> = ({
  accountType,
  principalHolder,
  jointHolder,
}: NewSalesSummaryProps) => {
  const subheading = accountType === "Individual" ? ADD_CLIENT.LABEL_VERIFY_INDIVIDUAL : ADD_CLIENT.LABEL_VERIFY_JOINT;
  const checkIdType = (data: IClientBasicInfo) => {
    const otherIdType = isNotEmpty(data.otherIdType) ? titleCaseString(data.otherIdType!) : data.otherIdType;
    const idType = isNotEmpty(data.idType) && data.idType !== "NRIC" ? titleCaseString(data.idType!) : data.idType;

    return data.idType === "Other"
      ? `${otherIdType} ${ADD_CLIENT.LABEL_ID} ${ADD_CLIENT.LABEL_NUMBER}`
      : `${idType} ${ADD_CLIENT.LABEL_NUMBER}`;
  };

  const principalSummary = [
    { label: ADD_CLIENT.LABEL_NAME, value: principalHolder.name! },
    { label: checkIdType(principalHolder), value: principalHolder.id! },
    { label: ADD_CLIENT.DETAILS_LABEL_DOB, value: moment(principalHolder.dateOfBirth, DEFAULT_DATE_FORMAT).format(FULL_DATE_FORMAT) },
  ];

  if (principalHolder.idType! === "Passport") {
    principalSummary.push({
      label: ADD_CLIENT.LABEL_COUNTRY,
      value: principalHolder.country!,
    });
  }

  let jointSummary: IInfoStackData[] = [];

  if (accountType === "Joint" && jointHolder !== undefined) {
    jointSummary = [
      { label: ADD_CLIENT.LABEL_NAME, value: jointHolder.name! },
      { label: checkIdType(jointHolder), value: jointHolder.id! },
      { label: ADD_CLIENT.DETAILS_LABEL_DOB, value: moment(jointHolder.dateOfBirth, DEFAULT_DATE_FORMAT).format(FULL_DATE_FORMAT) },
    ];

    if (jointHolder.idType! === "Passport") {
      jointSummary.push({
        label: ADD_CLIENT.LABEL_COUNTRY,
        value: jointHolder.country!,
      });
    }
  }

  const principalTitle =
    accountType === "Joint" ? `${ADD_CLIENT.DETAILS_LABEL_NAME_PRINCIPAL} ${ADD_CLIENT.LABEL_HOLDER}` : ADD_CLIENT.SUMMARY_INDIVIDUAL;
  const jointTitle = accountType === "Joint" ? `${ADD_CLIENT.DETAILS_LABEL_NAME_JOINT} ${ADD_CLIENT.LABEL_HOLDER}` : undefined;

  const principalBadge = "New Investor"; // TODO isEtb check
  const jointBadge = "New Investor"; // TODO isEtb check

  return (
    <Fragment>
      <TextSpaceArea spaceToBottom={sh24} style={fs24BoldGray6} text={subheading} />
      <InfoStack data={principalSummary} title={principalTitle} titleBadge={principalBadge} />
      {accountType === "Joint" ? (
        <Fragment>
          <CustomSpacer space={sh8} />
          <InfoStack data={jointSummary} title={jointTitle} titleBadge={jointBadge} />
        </Fragment>
      ) : null}
    </Fragment>
  );
};
