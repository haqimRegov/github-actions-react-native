import moment from "moment";
import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { ColorCard, ContentPage, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_COUNTRIES, ERROR_CODE } from "../../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import {
  centerVertical,
  colorRed,
  flexRow,
  fs10RegGray6,
  fs12BoldBlack2,
  fs16BoldBlack2,
  px,
  rowCenterVertical,
  sh24,
  sh4,
  sw1,
  sw12,
  sw24,
} from "../../../styles";
import { OCRUtils, splitString } from "../../../utils";
import { ImageReview } from "../../Onboarding/IdentityVerification/ImageReview";
import { UploadID } from "./UploadID";

const { IDENTITY_CONFIRMATION } = Language.PAGE;

type TypeUploader = "camera-joint" | "camera-principal" | "gallery-joint" | "gallery-principal";

interface IdentityConfirmationProps extends PersonalInfoStoreProps, NewSalesContentProps {
  navigation: IStackNavigationProp;
  route: string;
}

const IdentityConfirmationComponent: FunctionComponent<IdentityConfirmationProps> = ({
  accountType,
  addPersonalInfo,
  details,
  handleNextStep,
  newSales,
  personalInfo,
  updateNewSales,
}: IdentityConfirmationProps) => {
  const { disabledSteps, finishedSteps } = newSales;
  const { principalHolder, jointHolder } = details!;
  const { editMode, principal, joint } = personalInfo;
  // TODO issue in dropdown and keyboard avoiding view
  const [uploadType, setUploadType] = useState<TypeUploader | undefined>(undefined);
  const [reviewImage, setReviewImage] = useState<FileBase64 | undefined>(undefined);
  const [principalFrontError, setPrincipalFrontError] = useState<string | undefined>(undefined);
  const [principalBackError, setPrincipalBackError] = useState<string | undefined>(undefined);
  const [jointFrontError, setJointFrontError] = useState<string | undefined>(undefined);
  const [jointBackError, setJointBackError] = useState<string | undefined>(undefined);
  const principalUploadRef = useRef<IUploadDocumentRef>();
  const jointUploadRef = useRef<IUploadDocumentRef>();
  const principalFrontPage = principal!.personalDetails!.id!.frontPage;
  const principalBackPage = principal!.personalDetails!.id!.secondPage;
  const jointFrontPage = joint!.personalDetails!.id!.frontPage;
  const jointSecondPage = joint!.personalDetails!.id!.secondPage;
  const principalIdType = principalHolder!.idType!;
  const jointIdType = jointHolder!.idType!;
  const principalClientIdType = principalIdType === "Other" ? principalHolder!.otherIdType : principalIdType;
  const jointClientIdType = jointIdType === "Other" ? jointHolder!.otherIdType : jointIdType;

  // const principalTitle =
  //   principalIdType !== "Passport" && principalIdType !== "NRIC"
  //     ? `${principalIdType} ${IDENTITY_CONFIRMATION.LABEL_ID}`
  //     : `${principalIdType}`;
  // const defaultPrincipalTitle = `${IDENTITY_CONFIRMATION.SUBHEADING} ${principalTitle}`;
  // const defaultSubtitle = accountType === "Joint" ? IDENTITY_CONFIRMATION.JOINT_SUBHEADING : defaultPrincipalTitle;

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

  const handleContinue = () => {
    const principalMailingAddress =
      joint?.addressInformation?.sameAddress === true
        ? personalInfo.principal!.addressInformation?.mailingAddress!
        : joint?.addressInformation?.mailingAddress;
    if (accountType === "Joint") {
      addPersonalInfo({
        ...personalInfo,
        joint: { ...joint, addressInformation: { ...joint!.addressInformation, mailingAddress: { ...principalMailingAddress } } },
      });
    }

    const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];

    // add to finishedSteps
    if (updatedFinishedSteps.includes("IdentityVerification") === false) {
      updatedFinishedSteps.push("IdentityVerification");
    }

    // remove in disabledSteps if edit mode
    if (editMode === true) {
      const findSummary = updatedDisabledSteps.indexOf("Summary");

      if (findSummary !== -1) {
        updatedDisabledSteps.splice(findSummary, 1);
      }
      addPersonalInfo({ ...personalInfo, editMode: false });
    }

    updateNewSales({
      ...newSales,
      disabledSteps: updatedDisabledSteps,
      finishedSteps: updatedFinishedSteps,
      toast: { ...newSales.toast, toastVisible: true },
    });

    const route: TypeNewSalesKey = editMode === true ? "Summary" : "AdditionalDetails";
    handleNextStep(route);
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
    handleNextStep("ProductsConfirmation");
  };

  const checkJointIdType = principalIdType === "Other" ? `${jointClientIdType} ${IDENTITY_CONFIRMATION.LABEL_ID}` : jointIdType;
  const jointCardHeader =
    accountType === "Joint"
      ? `${IDENTITY_CONFIRMATION.LABEL_UPLOAD} ${IDENTITY_CONFIRMATION.LABEL_JOINT_HOLDER}'s ${checkJointIdType}`
      : `${IDENTITY_CONFIRMATION.LABEL_UPLOAD_YOUR} ${checkJointIdType}`;
  const checkPrincipalIdType = principalIdType === "Other" ? `${principalClientIdType} ${IDENTITY_CONFIRMATION.LABEL_ID}` : principalIdType;
  const principalCardHeader =
    accountType === "Joint"
      ? `${IDENTITY_CONFIRMATION.LABEL_UPLOAD} ${IDENTITY_CONFIRMATION.LABEL_PRINCIPAL_HOLDER}'s ${checkPrincipalIdType}`
      : `${IDENTITY_CONFIRMATION.LABEL_UPLOAD_YOUR} ${checkPrincipalIdType}`;

  return (
    <Fragment>
      <ContentPage
        cancelDisabled={editMode === true}
        continueDisabled={buttonDisabled}
        handleCancel={handleBack}
        handleContinue={handleContinue}
        labelContinue={IDENTITY_CONFIRMATION.BUTTON_SAVE_CONTINUE}
        subheading={IDENTITY_CONFIRMATION.NEW_SALES_HEADING}
        subtitle={IDENTITY_CONFIRMATION.NEW_SALES_SUBHEADING}>
        <View style={px(sw24)}>
          <CustomSpacer space={sh24} />
          {accountType === "Joint" ? (
            <Fragment>
              <View style={{ borderBottomColor: colorRed._1, borderBottomWidth: sw1 }}>
                <View style={{ ...flexRow, ...centerVertical }}>
                  <Text style={fs10RegGray6}>{IDENTITY_CONFIRMATION.LABEL_PRINCIPAL_HOLDER}</Text>
                  <CustomSpacer isHorizontal={true} space={sw12} />
                  <Text style={fs12BoldBlack2}>{principalHolder?.name}</Text>
                </View>
                <CustomSpacer space={sh4} />
              </View>
              <CustomSpacer space={sh24} />
            </Fragment>
          ) : null}
          <ColorCard
            header="custom"
            customHeader={
              <View style={rowCenterVertical}>
                <Text style={fs16BoldBlack2}>{principalCardHeader}</Text>
                {/* {accountType === "Joint" ? (
                  <Fragment>
                    <CustomSpacer isHorizontal={true} space={sw12} />
                    <Text style={fs12RegGray5}>{principalHolder!.name}</Text>
                    <CustomSpacer isHorizontal={true} space={sw12} />
                    <View style={flexChild}>
                      <View style={borderBottomBlue4} />
                    </View>
                  </Fragment>
                ) : null} */}
              </View>
            }
            content={
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
            }
          />
        </View>
        {accountType === "Individual" ? null : (
          <Fragment>
            <CustomSpacer space={sh24} />
            <View style={px(sw24)}>
              {accountType === "Joint" ? (
                <Fragment>
                  <View style={{ borderBottomColor: colorRed._1, borderBottomWidth: sw1 }}>
                    <View style={{ ...flexRow, ...centerVertical }}>
                      <Text style={fs10RegGray6}>{IDENTITY_CONFIRMATION.LABEL_JOINT_HOLDER}</Text>
                      <CustomSpacer isHorizontal={true} space={sw12} />
                      <Text style={fs12BoldBlack2}>{jointHolder?.name}</Text>
                    </View>
                    <CustomSpacer space={sh4} />
                  </View>
                  <CustomSpacer space={sh24} />
                </Fragment>
              ) : null}
              <ColorCard
                header="custom"
                customHeader={
                  <View style={rowCenterVertical}>
                    <Text style={fs16BoldBlack2}>{jointCardHeader}</Text>
                    {/* <CustomSpacer isHorizontal={true} space={sw12} />
                    <Text style={fs12RegGray5}>{jointHolder!.name}</Text>
                    <CustomSpacer isHorizontal={true} space={sw12} />
                    <View style={flexChild}>
                      <View style={borderBottomBlue4} />
                    </View> */}
                  </View>
                }
                content={
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
                }
              />
            </View>
          </Fragment>
        )}
      </ContentPage>
      <ImageReview handleProceed={handleProceed} handleReupload={handleReupload} image={reviewImage} visible={reviewImage !== undefined} />
    </Fragment>
  );
};

export const NewSalesIdentityConfirmation = connect(
  PersonalInfoMapStateToProps,
  PersonalInfoMapDispatchToProps,
)(IdentityConfirmationComponent);
