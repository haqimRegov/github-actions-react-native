import moment from "moment";
import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { AccountHeader, ContentPage, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_COUNTRIES, ERROR_CODE } from "../../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { px, sh40, sh56, sw24 } from "../../../styles";
import { OCRUtils, splitString } from "../../../utils";
import { IDVerification } from "./IDVerification";
import { ImageReview } from "./ImageReview";
import { UploadID } from "./UploadID";

const { IDENTITY_CONFIRMATION } = Language.PAGE;

type TypeUploader = "camera-joint" | "camera-principal" | "gallery-joint" | "gallery-principal";

interface IdentityConfirmationProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const IdentityConfirmationComponent: FunctionComponent<IdentityConfirmationProps> = ({
  accountType,
  addPersonalInfo,
  details,
  handleNextStep,
  personalInfo,
}: IdentityConfirmationProps) => {
  // TODO issue in dropdown and keyboard avoiding view
  const defaultPage = personalInfo.editPersonal === true ? 1 : 0;
  const [page, setPage] = useState<number>(defaultPage);
  const [uploadType, setUploadType] = useState<TypeUploader | undefined>(undefined);
  const [reviewImage, setReviewImage] = useState<FileBase64 | undefined>(undefined);
  const [principalFrontError, setPrincipalFrontError] = useState<string | undefined>(undefined);
  const [principalBackError, setPrincipalBackError] = useState<string | undefined>(undefined);
  const [jointFrontError, setJointFrontError] = useState<string | undefined>(undefined);
  const [jointBackError, setJointBackError] = useState<string | undefined>(undefined);
  const principalUploadRef = useRef<IUploadDocumentRef>();
  const jointUploadRef = useRef<IUploadDocumentRef>();

  const { principalHolder, jointHolder } = details!;
  const { principal, joint } = personalInfo;
  const principalFrontPage = principal!.personalDetails!.id!.frontPage;
  const principalBackPage = principal!.personalDetails!.id!.secondPage;
  const jointFrontPage = joint!.personalDetails!.id!.frontPage;
  const jointSecondPage = joint!.personalDetails!.id!.secondPage;
  const principalIdType = principalHolder!.idType!;
  const jointIdType = jointHolder!.idType!;
  const principalClientIdType = principalIdType === "Other" ? principalHolder!.otherIdType : principalIdType;
  const jointClientIdType = jointIdType === "Other" ? jointHolder!.otherIdType : jointIdType;

  const principalTitle =
    principalIdType !== "Passport" && principalIdType !== "NRIC"
      ? `${principalIdType} ${IDENTITY_CONFIRMATION.LABEL_ID}`
      : `${principalIdType}`;
  const defaultPrincipalTitle = `${IDENTITY_CONFIRMATION.SUBHEADING} ${principalTitle}`;
  const defaultSubtitle = accountType === "Joint" ? IDENTITY_CONFIRMATION.JOINT_SUBHEADING : defaultPrincipalTitle;

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

  const jointMyKad =
    accountType === "Joint" && jointClientIdType === "NRIC"
      ? moment().diff(personalInfo.joint!.personalDetails!.dateOfBirth, "years") >= 12
      : true;

  let buttonDisabled = false;
  if (accountType === "Individual" || accountType === "Joint") {
    buttonDisabled = principalClientIdType !== "Passport" && !individualNRIC;
    if (!buttonDisabled) {
      buttonDisabled = principalClientIdType === "Passport" && !individualPass;
    }
  }
  if (accountType === "Joint" && !buttonDisabled) {
    buttonDisabled = jointClientIdType !== "Passport" && !jointNRIC;
    if (!buttonDisabled) {
      buttonDisabled = jointClientIdType === "Passport" && !jointPass;
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
    addPersonalInfo({
      ...personalInfo,
      principal: { ...principal, personalDetails: { ...principal!.personalDetails, id: { ...value } } },
    });

  const handleJointDetails = (value: IClientIDState) =>
    addPersonalInfo({
      ...personalInfo,
      joint: {
        ...joint,
        personalDetails: { ...joint!.personalDetails, id: { ...value } },
      },
    });

  const handleBackToUpload = () => {
    setPage(0);
  };

  const handleContinue = () => {
    const principalMailingAddress =
      joint?.addressInformation?.sameAddress === true
        ? personalInfo.principal!.addressInformation?.mailingAddress!
        : joint?.addressInformation?.mailingAddress;
    setPage(1);
    if (accountType === "Joint") {
      addPersonalInfo({
        ...personalInfo,
        joint: { ...joint, addressInformation: { ...joint!.addressInformation, mailingAddress: { ...principalMailingAddress } } },
      });
    }
  };

  const handleClientInfo = (clientInfo: IHolderInfoState, file: FileBase64 | undefined, mykad: IOCRNricData) => {
    const [line1, line2, line3] = splitString(mykad.address || "", 100);
    const newClientInfo: IHolderInfoState = {
      ...clientInfo,
      personalDetails: {
        ...clientInfo.personalDetails,
        id: {
          ...clientInfo.personalDetails?.id,
          frontPage: file,
        },
      },
      addressInformation: {
        ...clientInfo.addressInformation!,
        sameAddress: true,
        mailingAddress: {
          address: { line1: line1 || "", line2: line2, line3: line3 },
          city: mykad.city || "",
          country: mykad.country || "",
          postCode: mykad.postCode || "",
          state: mykad.state || "",
        },
        permanentAddress: {
          address: { line1: line1 || "", line2: line2, line3: line3 },
          city: mykad.city || "",
          country: mykad.country || "",
          postCode: mykad.postCode || "",
          state: mykad.state || "",
        },
      },
    };
    return newClientInfo;
  };

  const handlePrincipalFrontPage = async (uploaded?: FileBase64) => {
    let principalInfo: IHolderInfoState = handleClientInfo(principal!, uploaded, {
      country: principalClientIdType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
    });
    if (uploaded !== undefined && principalClientIdType === "NRIC") {
      const mykad: IOCRNricData = await OCRUtils.mykadFront(uploaded.path!);
      if ("error" in mykad && mykad.error !== undefined) {
        if (mykad.error.code === ERROR_CODE.invalidNricData) {
          setReviewImage(uploaded);
          setPrincipalFrontError(undefined);
        } else {
          setReviewImage(undefined);
          setPrincipalFrontError(mykad.error.message);
        }
      } else {
        principalInfo = handleClientInfo(principal!, uploaded, mykad);
        setReviewImage(undefined);
        setPrincipalFrontError(undefined);
      }
    }
    addPersonalInfo({ ...personalInfo, principal: principalInfo });
  };

  const handlePrincipalBackPage = async (uploaded?: FileBase64) => {
    setPrincipalBackError(undefined);
    if (uploaded !== undefined && principalClientIdType === "NRIC") {
      const mykadBack: IOCRNricData = await OCRUtils.mykadBack(uploaded.path!);
      if ("error" in mykadBack && mykadBack.error !== undefined) {
        setPrincipalBackError(mykadBack.error.message);
      } else {
        setPrincipalBackError(undefined);
      }
    }
    handlePrincipalDetails({ ...principal!.personalDetails!.id!, secondPage: uploaded });
  };

  const handleJointFrontPage = async (uploaded?: FileBase64) => {
    let jointInfo: IHolderInfoState = handleClientInfo(joint!, uploaded, {
      country: jointClientIdType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
    });
    if (uploaded !== undefined && jointMyKad === true && jointClientIdType === "NRIC") {
      const mykad: IOCRNricData = await OCRUtils.mykadFront(uploaded.path!);
      if ("error" in mykad && mykad.error !== undefined) {
        if (mykad.error.code === ERROR_CODE.invalidNricData) {
          setReviewImage(uploaded);
          setJointFrontError(undefined);
        } else {
          setJointFrontError(mykad.error.message);
        }
      } else {
        jointInfo = handleClientInfo(joint!, uploaded, mykad);
        setReviewImage(undefined);
        setJointFrontError(undefined);
      }
    }
    addPersonalInfo({ ...personalInfo, joint: jointInfo });
  };

  const handleJointBackPage = async (uploaded?: FileBase64) => {
    setJointBackError(undefined);
    if (uploaded !== undefined && jointClientIdType === "NRIC" && jointMyKad === true) {
      const mykadBack: IOCRNricData = await OCRUtils.mykadBack(uploaded.path!);
      if ("error" in mykadBack && mykadBack.error !== undefined) {
        setJointBackError(mykadBack.error.message);
      } else {
        setJointBackError(undefined);
      }
    }
    handleJointDetails({ ...joint!.personalDetails!.id!, secondPage: uploaded });
  };

  const handleBack = () => {
    handleNextStep("ProductRecommendation");
  };

  return (
    <Fragment>
      {page === 0 ? (
        <ContentPage
          continueDisabled={buttonDisabled}
          handleCancel={handleBack}
          handleContinue={handleContinue}
          labelCancel={IDENTITY_CONFIRMATION.BUTTON_BACK}
          subheading={IDENTITY_CONFIRMATION.HEADING}
          subtitle={defaultSubtitle}>
          <View style={px(sw24)}>
            <CustomSpacer space={sh40} />
            {accountType === "Joint" ? (
              <AccountHeader subtitle={IDENTITY_CONFIRMATION.LABEL_PRINCIPAL} title={principalHolder!.name!} />
            ) : null}
            <UploadID
              backError={principalBackError}
              backPage={principalBackPage}
              frontError={principalFrontError}
              frontPage={principalFrontPage}
              idType={principalClientIdType!}
              onPressCamera={handleCameraPrincipal}
              onPressPicker={handlePickerPrincipal}
              setBackPage={handlePrincipalBackPage}
              setFrontPage={handlePrincipalFrontPage}
              uploadRef={principalUploadRef}
            />
          </View>
          {accountType === "Individual" ? null : (
            <Fragment>
              <CustomSpacer space={sh56} />
              <View style={px(sw24)}>
                {accountType === "Joint" ? <AccountHeader subtitle={IDENTITY_CONFIRMATION.LABEL_JOINT} title={jointHolder!.name!} /> : null}
                <UploadID
                  backError={jointBackError}
                  backPage={jointSecondPage}
                  frontError={jointFrontError}
                  frontPage={jointFrontPage}
                  idType={jointClientIdType!}
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
        <IDVerification handleBack={handleBackToUpload} handleNextStep={handleNextStep} />
      )}
      <ImageReview handleProceed={handleProceed} handleReupload={handleReupload} image={reviewImage} visible={reviewImage !== undefined} />
    </Fragment>
  );
};

export const IdentityConfirmation = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(IdentityConfirmationComponent);
