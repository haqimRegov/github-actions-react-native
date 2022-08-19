import React, { Fragment, FunctionComponent, MutableRefObject } from "react";

import { CustomSpacer, UploadWithModal } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_ALL_ID_TYPE } from "../../../data/dictionary";
import { sh16 } from "../../../styles";

const { IDENTITY_CONFIRMATION } = Language.PAGE;

interface UploadIDProps {
  backError?: string;
  backPage: FileBase64 | undefined;
  frontError: string | undefined;
  frontPage: FileBase64 | undefined;
  idType: TypeClientID;
  onPressCamera: () => void;
  onPressPicker: () => void;
  setBackPage: (value: FileBase64 | undefined) => void;
  setFrontPage: (value: FileBase64 | undefined) => void;
  uploadRef?: MutableRefObject<IUploadDocumentRef | undefined>;
}
export const UploadID: FunctionComponent<UploadIDProps> = ({
  backError,
  backPage,
  frontError,
  frontPage,
  idType,
  onPressCamera,
  onPressPicker,
  setBackPage,
  setFrontPage,
  uploadRef,
}: UploadIDProps) => {
  const extractedIdType = typeof idType === "string" ? idType : DICTIONARY_ALL_ID_TYPE[idType];
  const isMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(extractedIdType) !== 1;

  let firstLabel = `${idType} (${IDENTITY_CONFIRMATION.LABEL_FRONT_NEW})`;
  let secondLabel = `${idType} (${IDENTITY_CONFIRMATION.LABEL_BACK_NEW})`;

  if (extractedIdType !== "NRIC" && extractedIdType !== "Passport") {
    firstLabel = `${idType} ${IDENTITY_CONFIRMATION.LABEL_ID} (${IDENTITY_CONFIRMATION.LABEL_FRONT_NEW})`;
    secondLabel = `${idType} ${IDENTITY_CONFIRMATION.LABEL_ID} (${IDENTITY_CONFIRMATION.LABEL_BACK_NEW})`;
  }

  if (!isMalaysian) {
    firstLabel = IDENTITY_CONFIRMATION.NEW_SALES_LABEL_DATA_PASSPORT;
  }

  const handleFirstUpload = (uploaded: FileBase64) => {
    setFrontPage(uploaded);
  };

  const handleSecondUpload = (uploaded: FileBase64) => {
    setBackPage(uploaded);
  };

  return (
    <Fragment>
      <UploadWithModal
        errorMessage={frontError}
        features={["camera", "gallery"]}
        label={firstLabel}
        onPressCamera={onPressCamera}
        onPressPicker={onPressPicker}
        onSuccess={handleFirstUpload}
        ref={uploadRef}
        setValue={setFrontPage}
        value={frontPage}
      />
      {idType === "Passport" ? null : (
        <Fragment>
          <CustomSpacer space={sh16} />
          <UploadWithModal
            errorMessage={backError}
            features={["camera", "gallery"]}
            label={secondLabel}
            onPressCamera={onPressCamera}
            onPressPicker={onPressPicker}
            onSuccess={handleSecondUpload}
            setValue={setBackPage}
            value={backPage}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
