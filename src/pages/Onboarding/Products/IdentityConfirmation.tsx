import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Image, ImageStyle, ScrollView, View, ViewStyle } from "react-native";

import { BasicModal, ConfirmationModal, CustomFlexSpacer, CustomSpacer, LabeledTitle, RoundedButton, UploadV2 } from "../../../components";
import { Language, ONBOARDING_ROUTES } from "../../../constants";
import { IcoMoon } from "../../../icons";
import { SAMPLE_CLIENT } from "../../../mocks";
import {
  centerHV,
  colorTransparent,
  colorWhite,
  flexChild,
  flexGrow,
  flexRow,
  fs12BoldWhite1,
  fs16BoldBlack1,
  fs16RegBlack2,
  fs24BoldBlack2,
  fullHW,
  fullWidth,
  px,
  sh24,
  sh32,
  sh40,
  sh500,
  sh56,
  sh8,
  sw24,
  sw40,
  sw750,
} from "../../../styles";

const { IDENTITY_CONFIRMATION } = Language.PAGE;

const BYTE_TO_MEGABYTE = 1048576;

const SAMPLE_ID_TYPE = "NRIC";

type IdType = "NRIC" | "Passport" | "Other";
type uploadType = "First" | "Second";

interface IdentityConfirmationProps {
  handleNextStep: (route: string) => void;
}

export const IdentityConfirmation: FunctionComponent<IdentityConfirmationProps> = ({ handleNextStep }: IdentityConfirmationProps) => {
  const [confirmDetails, setConfirmDetails] = useState<uploadType | undefined>(undefined);
  const [idType, setIdType] = useState<IdType | undefined>(undefined);
  const [frontPage, setFrontPage] = useState<FileBase64 | undefined>(undefined);
  const [secondPage, setSecondPage] = useState<FileBase64 | undefined>(undefined);
  const [viewImage, setViewImage] = useState<FileBase64 | undefined>(undefined);

  const buttonDisabled = frontPage === undefined || secondPage === undefined;

  const handleContinue = () => {
    if (frontPage !== undefined && secondPage !== undefined) {
      handleNextStep(ONBOARDING_ROUTES.Address);
    }
  };

  const handleConfirm = () => {
    setConfirmDetails(undefined);
  };

  const handleCloseImage = () => {
    setViewImage(undefined);
  };

  const handleCancel = () => {
    if (confirmDetails === "First") {
      setFrontPage(undefined);
    }
    if (confirmDetails === "Second") {
      setSecondPage(undefined);
    }

    return setConfirmDetails(undefined);
  };

  const handleViewFirst = () => {
    setViewImage(frontPage);
  };

  const handleViewSecond = () => {
    setViewImage(secondPage);
  };

  const handleFirstUpload = (uploaded: FileBase64) => {
    setFrontPage(uploaded);
    setConfirmDetails("First");
  };

  const handleSecondUpload = (uploaded: FileBase64) => {
    setSecondPage(uploaded);
    setConfirmDetails("Second");
  };

  let firstLabel = IDENTITY_CONFIRMATION.LABEL_FRONT_NRIC;
  let secondLabel = IDENTITY_CONFIRMATION.LABEL_BACK_NRIC;

  if (idType === "Passport") {
    firstLabel = IDENTITY_CONFIRMATION.LABEL_DATA_PASSPORT;
    secondLabel = IDENTITY_CONFIRMATION.LABEL_VISA_PASSPORT;
  }

  if (idType === "Other") {
    firstLabel = IDENTITY_CONFIRMATION.LABEL_FRONT_OTHER;
    secondLabel = IDENTITY_CONFIRMATION.LABEL_BACK_OTHER;
  }

  const title = `${IDENTITY_CONFIRMATION.SUBHEADING} ${SAMPLE_ID_TYPE}`;
  const fileSize = viewImage !== undefined ? `${(viewImage.size / BYTE_TO_MEGABYTE).toFixed(2).toString()}MB` : "";

  const viewImageHeader: ViewStyle = { ...flexRow, ...fullWidth, ...px(sw40), left: 0, position: "absolute", top: 40 };
  const imageStyle: ImageStyle = { height: sh500, resizeMode: "contain", width: sw750 };

  useEffect(() => {
    setIdType(SAMPLE_ID_TYPE);
  }, []);

  return (
    <Fragment>
      <ScrollView bounces={false} contentContainerStyle={flexGrow}>
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
          <UploadV2 label={firstLabel} onPress={handleViewFirst} onSuccess={handleFirstUpload} setValue={setFrontPage} value={frontPage} />
          {idType === "Other" ? null : (
            <Fragment>
              <CustomSpacer space={sh8} />
              <UploadV2
                label={secondLabel}
                onPress={handleViewSecond}
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
      </ScrollView>
      <ConfirmationModal
        handleCancel={handleCancel}
        handleContinue={handleConfirm}
        labelContinue={IDENTITY_CONFIRMATION.BUTTON_CONFIRM}
        title={IDENTITY_CONFIRMATION.CONFIRM_MODAL_TITLE}
        visible={confirmDetails !== undefined}>
        <Fragment>
          <LabeledTitle label={IDENTITY_CONFIRMATION.CONFIRM_MODAL_LABEL_NAME} title={SAMPLE_CLIENT.name} titleStyle={fs16BoldBlack1} />
          <CustomSpacer space={sh24} />
          <LabeledTitle label={idType as string} title={SAMPLE_CLIENT.id} titleStyle={fs16BoldBlack1} />
          <CustomSpacer space={sh24} />
          <LabeledTitle label={IDENTITY_CONFIRMATION.CONFIRM_MODAL_LABEL_GENDER} title={SAMPLE_CLIENT.gender} titleStyle={fs16BoldBlack1} />
          <CustomSpacer space={sh24} />
          <LabeledTitle
            label={IDENTITY_CONFIRMATION.CONFIRM_MODAL_LABEL_DOB}
            title={SAMPLE_CLIENT.dateOfBirth}
            titleStyle={fs16BoldBlack1}
          />
        </Fragment>
      </ConfirmationModal>
      <BasicModal backdropOpacity={0.85} visible={viewImage !== undefined}>
        <Fragment>
          {viewImage === undefined ? null : (
            <View style={{ ...fullHW, ...centerHV, backgroundColor: colorTransparent }}>
              <View style={viewImageHeader}>
                <LabeledTitle label={viewImage.name} labelStyle={fs12BoldWhite1} title={fileSize} titleStyle={fs12BoldWhite1} />
                <CustomFlexSpacer />
                <IcoMoon color={colorWhite._1} name="close" onPress={handleCloseImage} size={sh24} />
              </View>
              <Image source={{ uri: viewImage.path }} style={imageStyle} />
            </View>
          )}
        </Fragment>
      </BasicModal>
    </Fragment>
  );
};
