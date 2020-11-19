import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { AdvancedDropdown, ContentPage, CustomSpacer, LabeledTitle, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_ALL_ID, DICTIONARY_ALL_ID_TYPE, DICTIONARY_COUNTRIES, ERROR_CODE_OCR } from "../../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { borderBottomGray4, fs10BoldBlack2, fs16RegBlack2, fs24BoldBlack2, px, sh24, sh32, sh40, sh8, sw24 } from "../../../styles";
import { OCRUtils } from "../../../utils";
import { IDVerification } from "./IDVerification";
import { ImageReview } from "./ImageReview";
import { UploadID } from "./UploadID";

const { IDENTITY_CONFIRMATION } = Language.PAGE;

type TypeUploader = "camera-joint" | "camera-principal" | "gallery-joint" | "gallery-principal";

interface IdentityConfirmationProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const IdentityConfirmationComponent: FunctionComponent<IdentityConfirmationProps> = ({
  accountType,
  addClientDetails,
  addPersonalInfo,
  details,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
  riskScore,
}: IdentityConfirmationProps) => {
  // TODO issue in dropdown and keyboard avoiding view
  const defaultPage = personalInfo.editMode === true ? 1 : 0;
  const [page, setPage] = useState<number>(defaultPage);
  const [uploadType, setUploadType] = useState<TypeUploader | undefined>(undefined);
  const [reviewImage, setReviewImage] = useState<FileBase64 | undefined>(undefined);
  const [principalFrontError, setPrincipalFrontError] = useState<string | undefined>(undefined);
  const [principalBackError, setPrincipalBackError] = useState<string | undefined>(undefined);
  const [jointFrontError, setJointFrontError] = useState<string | undefined>(undefined);
  const [jointBackError, setJointBackError] = useState<string | undefined>(undefined);
  const principalUploadRef = useRef<IUploadDocumentRef>();
  const jointUploadRef = useRef<IUploadDocumentRef>();

  const { idType, otherIdType } = details!;
  const { principal, joint } = personalInfo;
  const principalFrontPage = principal!.personalDetails!.id!.frontPage;
  const principalBackPage = principal!.personalDetails!.id!.secondPage;
  const jointFrontPage = joint!.personalDetails!.id!.frontPage;
  const jointSecondPage = joint!.personalDetails!.id!.secondPage;
  const inputJointIdType = joint!.personalDetails!.idType!;
  const clientIdType = idType === "Other" ? otherIdType : idType;
  const extractedIdType = typeof clientIdType! === "string" ? clientIdType! : DICTIONARY_ALL_ID_TYPE[clientIdType!];
  const isPrincipalMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(extractedIdType as TypeClientID) !== 1;

  const principalTitle = idType !== "Passport" && idType !== "NRIC" ? `${idType} ${IDENTITY_CONFIRMATION.LABEL_ID}` : `${idType}`;
  const defaultPrincipalTitle = `${IDENTITY_CONFIRMATION.SUBHEADING} ${principalTitle}`;

  const jointTitle =
    inputJointIdType !== "Passport" && inputJointIdType !== "NRIC"
      ? `${inputJointIdType} ${IDENTITY_CONFIRMATION.LABEL_ID}`
      : `${inputJointIdType}`;
  const defaultJointTitle = `${IDENTITY_CONFIRMATION.SUBHEADING} ${jointTitle}`;

  const individualNRIC =
    principalFrontPage?.path !== undefined &&
    principalBackPage?.path !== undefined &&
    principalFrontError === undefined &&
    principalBackError === undefined;
  const individualPass = principalFrontPage?.path !== undefined && principalFrontError === undefined;
  const jointNRIC =
    jointFrontPage?.path !== undefined &&
    jointSecondPage?.path !== undefined &&
    jointFrontError === undefined &&
    jointBackError === undefined;
  const jointPass = jointFrontPage?.path !== undefined && jointFrontError === undefined;

  let buttonDisabled = false;
  if (accountType === "Individual" || accountType === "Joint") {
    buttonDisabled = clientIdType === "NRIC" && !individualNRIC;
    if (!buttonDisabled) {
      buttonDisabled = clientIdType === "Passport" && !individualPass;
    }
  }
  if (accountType === "Joint" && !buttonDisabled) {
    buttonDisabled = clientIdType === "NRIC" && !jointNRIC;
    if (!buttonDisabled) {
      buttonDisabled = clientIdType === "Passport" && !jointPass;
    }
  }

  const handleReupload = () => {
    if (uploadType === "camera-joint" && jointUploadRef.current !== undefined) {
      return jointUploadRef.current.handleOpenCamera();
    }
    if (uploadType === "camera-principal" && principalUploadRef.current !== undefined) {
      return principalUploadRef.current.handleOpenCamera();
    }
    if (uploadType === "gallery-principal" && principalUploadRef.current !== undefined) {
      return principalUploadRef.current.handleOpenPicker();
    }
    if (uploadType === "gallery-joint" && jointUploadRef.current !== undefined) {
      return jointUploadRef.current.handleOpenPicker();
    }
    return null;
  };

  const handleCameraPrincipal = () => setUploadType("camera-principal");
  const handlePickerPrincipal = () => setUploadType("gallery-principal");
  const handleCameraJoint = () => setUploadType("camera-joint");
  const handlePickerJoint = () => setUploadType("gallery-joint");
  const handleProceed = () => setReviewImage(undefined);

  const handlePrincipalDetails = (value: IClientIDState) =>
    addPersonalInfo({ ...personalInfo, principal: { ...principal, personalDetails: { ...principal!.personalDetails, id: { ...value } } } });

  const handleJointDetails = (value: IClientIDState) =>
    addPersonalInfo({ ...personalInfo, joint: { ...joint, personalDetails: { ...joint!.personalDetails, id: { ...value } } } });

  const setInputJointIdType = (value: string) =>
    addPersonalInfo({ ...personalInfo, joint: { ...joint!, personalDetails: { ...joint!.personalDetails, idType: value } } });

  const handleContinue = () => {
    const principalMailingAddress = personalInfo.principal!.addressInformation?.mailingAddress!;
    setPage(1);
    if (accountType === "Joint") {
      addPersonalInfo({
        ...personalInfo,
        joint: { ...joint, addressInformation: { ...joint!.addressInformation, mailingAddress: { ...principalMailingAddress } } },
      });
    }
  };

  const handlePrincipalFrontPage = async (uploaded?: FileBase64) => {
    if (uploaded !== undefined && clientIdType === DICTIONARY_ALL_ID[0].value) {
      const mykad: IOCRNricData = await OCRUtils.mykadFront(uploaded.path!);
      if ("error" in mykad && mykad.error !== undefined) {
        if (mykad.error?.code === ERROR_CODE_OCR.invalidNricData) {
          setReviewImage(uploaded);
          setPrincipalFrontError(undefined);
        } else {
          setPrincipalFrontError(mykad.error?.message);
        }
      } else {
        const principalInfo: IHolderInfoState = {
          ...principal,
          personalDetails: {
            ...principal?.personalDetails,
            gender: mykad.gender!,
            id: {
              ...principal?.personalDetails?.id,
              frontPage: uploaded,
            },
            nationality: isPrincipalMalaysian ? DICTIONARY_COUNTRIES[133].value : "",
            placeOfBirth: mykad.placeOfBirth,
          },
          addressInformation: {
            mailingAddress: {
              address: mykad.address || "",
              city: mykad.city || "",
              country: mykad.country || "",
              postCode: mykad.postCode || "",
              state: mykad.state || "",
            },
            permanentAddress: {
              address: mykad.address || "",
              city: mykad.city || "",
              country: mykad.country || "",
              postCode: mykad.postCode || "",
              state: mykad.state || "",
            },
          },
        };
        setReviewImage(undefined);
        setPrincipalFrontError(undefined);
        return addPersonalInfo({ ...personalInfo, principal: principalInfo });
      }
    }

    return handlePrincipalDetails({ ...principal!.personalDetails?.id!, frontPage: uploaded });
  };

  const handlePrincipalBackPage = async (uploaded?: FileBase64) => {
    if (uploaded !== undefined) {
      const mykadBack: IOCRNricData = await OCRUtils.mykadBack(uploaded.path!);
      if ("error" in mykadBack && mykadBack.error !== undefined) {
        setPrincipalBackError(mykadBack.error?.message);
      } else {
        setPrincipalBackError(undefined);
      }
    }
    return handlePrincipalDetails({ ...principal!.personalDetails?.id!, secondPage: uploaded });
  };

  const handleJointFrontPage = async (uploaded?: FileBase64) => {
    const jointIdType = joint!.personalDetails?.idType;
    if (uploaded !== undefined && jointIdType === DICTIONARY_ALL_ID[0].value) {
      const mykad: IOCRNricData = await OCRUtils.mykadFront(uploaded.path!);
      if ("error" in mykad && mykad.error !== undefined) {
        if (mykad.error?.code === ERROR_CODE_OCR.invalidNricData) {
          setReviewImage(uploaded);
          setJointFrontError(undefined);
        } else {
          setJointFrontError(mykad.error?.message);
        }
      } else {
        const isJointMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(jointIdType as TypeClientID) !== 1;
        const jointInfo: IHolderInfoState = {
          ...joint,
          personalDetails: {
            ...joint?.personalDetails,
            gender: mykad.gender!,
            id: {
              ...joint?.personalDetails?.id,
              frontPage: uploaded,
            },
            nationality: isJointMalaysian ? DICTIONARY_COUNTRIES[133].value : "",
            placeOfBirth: mykad.placeOfBirth,
          },
          addressInformation: {
            mailingAddress: {
              address: mykad.address || "",
              city: mykad.city || "",
              country: mykad.country || "",
              postCode: mykad.postCode || "",
              state: mykad.state || "",
            },
            permanentAddress: {
              address: mykad.address || "",
              city: mykad.city || "",
              country: mykad.country || "",
              postCode: mykad.postCode || "",
              state: mykad.state || "",
            },
          },
        };
        setReviewImage(undefined);
        setJointFrontError(undefined);
        return addPersonalInfo({ ...personalInfo, joint: jointInfo });
      }
    }

    return handleJointDetails({ ...joint!.personalDetails?.id!, frontPage: uploaded });
  };

  const handleJointBackPage = async (uploaded?: FileBase64) => {
    if (uploaded !== undefined) {
      const mykadBack: IOCRNricData = await OCRUtils.mykadBack(uploaded.path!);
      if ("error" in mykadBack && mykadBack.error !== undefined) {
        setJointBackError(mykadBack.error?.message);
      } else {
        setJointBackError(undefined);
      }
    }
    return handleJointDetails({ ...joint!.personalDetails?.id!, secondPage: uploaded });
  };

  return (
    <Fragment>
      {page === 0 ? (
        <ContentPage
          continueDisabled={buttonDisabled}
          handleCancel={handleCancelOnboarding!}
          handleContinue={handleContinue}
          subheading={IDENTITY_CONFIRMATION.HEADING}
          subtitle={defaultPrincipalTitle}>
          <View style={px(sw24)}>
            <CustomSpacer space={sh40} />
            <UploadID
              backError={principalBackError}
              backPage={principalBackPage}
              frontError={principalFrontError}
              frontPage={principalFrontPage}
              idType={clientIdType as TypeClientID}
              onPressCamera={handleCameraPrincipal}
              onPressPicker={handlePickerPrincipal}
              setBackPage={handlePrincipalBackPage}
              setFrontPage={handlePrincipalFrontPage}
              uploadRef={principalUploadRef}
            />
            <CustomSpacer space={sh32} />
          </View>
          {accountType === "Individual" ? null : (
            <Fragment>
              <View style={borderBottomGray4} />
              <CustomSpacer space={sh32} />
              <View style={px(sw24)}>
                <TextSpaceArea spaceToBottom={sh8} style={fs10BoldBlack2} text={IDENTITY_CONFIRMATION.LABEL_JOINT} />
                <LabeledTitle
                  label={IDENTITY_CONFIRMATION.HEADING}
                  labelStyle={fs24BoldBlack2}
                  spaceToLabel={sh8}
                  spaceToBottom={sh24}
                  title={defaultJointTitle}
                  titleStyle={fs16RegBlack2}
                />
                <AdvancedDropdown
                  handleChange={setInputJointIdType}
                  items={DICTIONARY_ALL_ID}
                  label={IDENTITY_CONFIRMATION.LABEL_ID_TYPE}
                  value={inputJointIdType}
                />
                <CustomSpacer space={sh24} />
                <UploadID
                  backError={jointBackError}
                  backPage={jointSecondPage}
                  frontError={jointFrontError}
                  frontPage={jointFrontPage}
                  idType={inputJointIdType as TypeClientID}
                  onPressCamera={handleCameraJoint}
                  onPressPicker={handlePickerJoint}
                  setBackPage={handleJointBackPage}
                  setFrontPage={handleJointFrontPage}
                  uploadRef={jointUploadRef}
                />
              </View>
            </Fragment>
          )}
        </ContentPage>
      ) : (
        <IDVerification
          accountType={accountType}
          addClientDetails={addClientDetails}
          addPersonalInfo={addPersonalInfo}
          details={details!}
          handleCancelOnboarding={handleCancelOnboarding!}
          handleNextStep={handleNextStep}
          personalInfo={personalInfo}
          riskScore={riskScore}
        />
      )}
      <ImageReview handleProceed={handleProceed} handleReupload={handleReupload} image={reviewImage} visible={reviewImage !== undefined} />
    </Fragment>
  );
};

export const IdentityConfirmation = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(IdentityConfirmationComponent);
