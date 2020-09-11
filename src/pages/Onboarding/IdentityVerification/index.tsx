import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, LabeledTitle, RoundedButton, SafeAreaPage, UploadWithModal } from "../../../components";
import { Language } from "../../../constants";
import { ClientStoreProps, PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { flexChild, fs16RegBlack2, fs24BoldBlack2, px, sh32, sh40, sh56, sh8, sw24 } from "../../../styles";
import { IDVerification } from "./IDVerification";

const { IDENTITY_CONFIRMATION } = Language.PAGE;

interface IdentityConfirmationProps extends PersonalInfoStoreProps, ClientStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}
const IdentityConfirmationComponent: FunctionComponent<IdentityConfirmationProps> = ({
  addClientDetails,
  addPersonalInfo,
  details,
  personalInfo,
  riskScore,
  handleNextStep,
}: IdentityConfirmationProps) => {
  const { idType } = details!;
  const [frontPage, setFrontPage] = useState<FileBase64 | undefined>(undefined);
  const [secondPage, setSecondPage] = useState<FileBase64 | undefined>(undefined);
  const [page, setPage] = useState<number>(0);

  // const buttonDisabled = frontPage === undefined || secondPage === undefined;

  const handleContinue = () => {
    // if (frontPage !== undefined && secondPage !== undefined) {
    setPage(1);
    // }
  };

  const handleFirstUpload = (uploaded: FileBase64) => {
    setFrontPage(uploaded);
  };

  const handleSecondUpload = (uploaded: FileBase64) => {
    setSecondPage(uploaded);
  };

  let firstLabel = `${IDENTITY_CONFIRMATION.LABEL_FRONT} ${idType}`;
  let secondLabel = `${IDENTITY_CONFIRMATION.LABEL_BACK} ${idType}`;
  const defaultTitle = `${IDENTITY_CONFIRMATION.SUBHEADING} ${idType}`;
  const title = idType !== "Passport" ? `${defaultTitle} ${IDENTITY_CONFIRMATION.LABEL_ID}` : `${defaultTitle}`;

  if (idType === "Passport") {
    firstLabel = IDENTITY_CONFIRMATION.LABEL_DATA_PASSPORT;
  }

  if (idType !== "NRIC" && idType !== "Passport") {
    firstLabel = `${IDENTITY_CONFIRMATION.LABEL_FRONT} ${idType} ${IDENTITY_CONFIRMATION.LABEL_ID}`;
    secondLabel = `${IDENTITY_CONFIRMATION.LABEL_BACK} ${idType} ${IDENTITY_CONFIRMATION.LABEL_ID}`;
  }

  return (
    <Fragment>
      {page === 0 ? (
        <SafeAreaPage>
          <View style={{ ...flexChild, ...px(sw24) }}>
            <CustomSpacer space={sh32} />
            <LabeledTitle
              label={IDENTITY_CONFIRMATION.HEADING}
              labelStyle={fs24BoldBlack2}
              spaceToLabel={sh8}
              title={title}
              titleStyle={fs16RegBlack2}
            />
            <CustomSpacer space={sh40} />
            <UploadWithModal
              features={["camera", "gallery"]}
              label={firstLabel}
              onSuccess={handleFirstUpload}
              setValue={setFrontPage}
              value={frontPage}
            />
            {idType === "Passport" ? null : (
              <Fragment>
                <CustomSpacer space={sh8} />
                <UploadWithModal
                  features={["camera", "gallery"]}
                  label={secondLabel}
                  onSuccess={handleSecondUpload}
                  setValue={setSecondPage}
                  value={secondPage}
                />
              </Fragment>
            )}
            <CustomFlexSpacer />
            <RoundedButton onPress={handleContinue} text={IDENTITY_CONFIRMATION.BUTTON_CONTINUE} />
            <CustomSpacer space={sh56} />
          </View>
        </SafeAreaPage>
      ) : (
        <IDVerification
          addClientDetails={addClientDetails}
          addPersonalInfo={addPersonalInfo}
          details={details!}
          handleNextStep={handleNextStep}
          personalInfo={personalInfo}
          riskScore={riskScore}
        />
      )}
    </Fragment>
  );
};

export const IdentityConfirmation = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(IdentityConfirmationComponent);
