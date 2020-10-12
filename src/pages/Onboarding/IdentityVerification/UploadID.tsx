import React, { Fragment, FunctionComponent } from "react";

import { CustomSpacer, UploadWithModal } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_ALL_ID_TYPE } from "../../../data/dictionary";
import { sh8 } from "../../../styles";

const { IDENTITY_CONFIRMATION } = Language.PAGE;

interface UploadIDProps {
  idType: TypeClientID;
  frontPage: FileBase64 | undefined;
  secondPage: FileBase64 | undefined;
  setFrontPage: (value: FileBase64 | undefined) => void;
  setSecondPage: (value: FileBase64 | undefined) => void;
}
export const UploadID: FunctionComponent<UploadIDProps> = ({
  idType,
  frontPage,
  secondPage,
  setFrontPage,
  setSecondPage,
}: UploadIDProps) => {
  const extractedIdType = typeof idType! === "string" ? idType! : DICTIONARY_ALL_ID_TYPE[idType!];
  const isMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(extractedIdType as TypeClientID) !== 1;

  const handleFirstUpload = (uploaded: FileBase64) => {
    setFrontPage(uploaded);
  };

  const handleSecondUpload = (uploaded: FileBase64) => {
    setSecondPage(uploaded);
  };

  let firstLabel = `${IDENTITY_CONFIRMATION.LABEL_FRONT} ${idType}`;
  let secondLabel = `${IDENTITY_CONFIRMATION.LABEL_BACK} ${idType}`;

  if (extractedIdType !== "NRIC" && extractedIdType !== "Passport") {
    firstLabel = `${IDENTITY_CONFIRMATION.LABEL_FRONT} ${idType} ${IDENTITY_CONFIRMATION.LABEL_ID}`;
    secondLabel = `${IDENTITY_CONFIRMATION.LABEL_BACK} ${idType} ${IDENTITY_CONFIRMATION.LABEL_ID}`;
  }

  if (!isMalaysian) {
    firstLabel = IDENTITY_CONFIRMATION.LABEL_DATA_PASSPORT;
  }

  return (
    <Fragment>
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
    </Fragment>
  );
};
