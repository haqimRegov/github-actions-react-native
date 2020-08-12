import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";

import { CustomFlexSpacer, CustomSpacer, LabeledTitle, RoundedButton, SafeAreaPage, UploadWithModal } from "../../../components";
import { Language } from "../../../constants";
import { SAMPLE_CLIENT } from "../../../mocks";
import { flexChild, fs16RegBlack2, fs24BoldBlack2, px, sh32, sh40, sh56, sh8, sw24 } from "../../../styles";
import { IDVerification } from "./IDVerification";

const { IDENTITY_CONFIRMATION } = Language.PAGE;

const SAMPLE_ID_TYPE = "NRIC";

type IdType = "NRIC" | "Passport" | "Other";

interface IdentityConfirmationProps {
  handleNextStep: (route: string) => void;
}

export const IdentityConfirmation: FunctionComponent<IdentityConfirmationProps> = ({ handleNextStep }: IdentityConfirmationProps) => {
  const [idType, setIdType] = useState<IdType | undefined>(undefined);
  const [frontPage, setFrontPage] = useState<FileBase64 | undefined>(undefined);
  const [secondPage, setSecondPage] = useState<FileBase64 | undefined>(undefined);
  const [page, setPage] = useState<number>(0);

  const buttonDisabled = frontPage === undefined || secondPage === undefined;

  const handleContinue = () => {
    if (frontPage !== undefined && secondPage !== undefined) {
      setPage(1);
    }
  };

  const handleFirstUpload = (uploaded: FileBase64) => {
    setFrontPage(uploaded);
  };

  const handleSecondUpload = (uploaded: FileBase64) => {
    setSecondPage(uploaded);
  };

  let firstLabel = IDENTITY_CONFIRMATION.LABEL_FRONT_NRIC;
  let secondLabel = IDENTITY_CONFIRMATION.LABEL_BACK_NRIC;

  if (idType === "Passport") {
    firstLabel = IDENTITY_CONFIRMATION.LABEL_DATA_PASSPORT;
  }

  if (idType === "Other") {
    firstLabel = IDENTITY_CONFIRMATION.LABEL_FRONT_OTHER;
    secondLabel = IDENTITY_CONFIRMATION.LABEL_BACK_OTHER;
  }

  const title = `${IDENTITY_CONFIRMATION.SUBHEADING} ${SAMPLE_ID_TYPE}`;

  useEffect(() => {
    setIdType(SAMPLE_ID_TYPE);
  }, []);

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
            <RoundedButton disabled={buttonDisabled} onPress={handleContinue} text={IDENTITY_CONFIRMATION.BUTTON_CONTINUE} />
            <CustomSpacer space={sh56} />
          </View>
        </SafeAreaPage>
      ) : (
        <IDVerification isPassport={SAMPLE_CLIENT.isPassport} handleNextStep={handleNextStep} />
      )}
    </Fragment>
  );
};
