import fontkit from "@pdf-lib/fontkit";
import { Buffer } from "buffer";
import moment from "moment";
import { PDFDocument, rgb } from "pdf-lib/cjs";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Dimensions, GestureResponderEvent, Platform, ScrollView } from "react-native";

import { Base64, Language } from "../../constants";
import { ReactFileSystem } from "../../integrations";
import { NewSalesState } from "../../store";
import { sh180, sh460, sh740, sw400 } from "../../styles";
import { GetEmbeddedBase64 } from "../../utils";
import { PdfViewTemplate, Signer } from "./EditPDFView";

const { PERSONAL_DETAILS, TERMS_AND_CONDITIONS } = Language.PAGE;

const signPosition = {
  adviser: { x: 20, y: 225 },
  principal: { x: 310, y: 225 },
  joint: { x: 20, y: 445 },
};

interface EditPdfProps {
  accountType: TypeAccountChoices;
  currentTransactionType?: TTransactionType;
  editReceipt: IOnboardingReceiptState | undefined;
  newSales: NewSalesState;
  pageWidth: number;
  personalInfo: IPersonalInfoState;
  receipts?: IOnboardingReceiptState[];
  setEditReceipt: (pdf: IOnboardingReceiptState | undefined) => void;
  updateReceipts: (receipts: IOnboardingReceiptState[]) => void;
}

export const EditPdf: FunctionComponent<EditPdfProps> = ({
  accountType,
  currentTransactionType,
  editReceipt,
  newSales,
  pageWidth,
  personalInfo,
  receipts,
  setEditReceipt,
  updateReceipts,
}: EditPdfProps) => {
  const [adviserSignature, setAdviserSignature] = useState<string>(
    editReceipt!.adviserSignature !== undefined ? editReceipt!.adviserSignature.base64! : "",
  );
  const [principalSignature, setPrincipalSignature] = useState<string>(
    editReceipt!.principalSignature !== undefined ? editReceipt!.principalSignature.base64! : "",
  );
  const [jointSignature, setJointSignature] = useState<string>(
    editReceipt!.jointSignature !== undefined ? editReceipt!.jointSignature.base64! : "",
  );
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [showSignPdf, setShowSignPdf] = useState<boolean>(false);
  const [signer, setSigner] = useState<Signer>(undefined);
  const [scrollRef, setScrollRef] = useState<ScrollView | null>(null);
  const { signatory } = personalInfo;
  const { accountDetails, transactionType } = newSales;
  const { accountNo, authorisedSignatory } = accountDetails;

  const updatedSignatory = accountNo !== "" ? authorisedSignatory : signatory;
  const updatedTransactionType = transactionType !== undefined ? transactionType : currentTransactionType;

  const modifyPdf = async (value: string) => {
    if (editReceipt !== undefined && signer !== undefined) {
      const dataUri = GetEmbeddedBase64(editReceipt.signedPdf!);
      const loadPdf = await PDFDocument.load(dataUri);
      const fileData = await ReactFileSystem.readFileMainBundle("NunitoSans-Bold.ttf");
      loadPdf.registerFontkit(fontkit);
      const customFont = await loadPdf.embedFont(fileData);
      const textHeight = customFont.heightAtSize(6);
      const whiteImage = await loadPdf.embedPng(Base64.background.white);
      const base64Value = `data:image/png;base64,${value}`;
      const signatureImage = value !== "" ? await loadPdf.embedPng(base64Value) : undefined;
      const pages = loadPdf.getPages();
      const selectedPage = pages[0];
      const { height } = selectedPage.getSize();
      const whiteBGConfig = {
        height: 60,
        opacity: 1,
        width: 240,
        x: signPosition[signer].x,
        y: height - signPosition[signer].y,
      };
      const textPosition = { x: 0, y: 0 };
      if (signer === "adviser") {
        if (principalSignature === "") {
          textPosition.x = signPosition.principal.x;
          textPosition.y = signPosition.principal.y;
        } else if (
          (accountType === "Joint" && jointSignature === "" && updatedTransactionType !== "Sales") ||
          (jointSignature === "" &&
            updatedTransactionType === "Sales" &&
            accountType === "Joint" &&
            updatedSignatory !== PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL &&
            updatedSignatory !== PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL_NEW)
        ) {
          textPosition.x = signPosition.joint.x;
          textPosition.y = signPosition.joint.y;
        }
      } else if (signer === "principal") {
        if (adviserSignature === "") {
          textPosition.x = signPosition.adviser.x;
          textPosition.y = signPosition.adviser.y;
        } else if (
          (accountType === "Joint" && jointSignature === "" && updatedTransactionType !== "Sales") ||
          (jointSignature === "" &&
            updatedTransactionType === "Sales" &&
            accountType === "Joint" &&
            updatedSignatory !== PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL &&
            updatedSignatory !== PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL_NEW)
        ) {
          textPosition.x = signPosition.joint.x;
          textPosition.y = signPosition.joint.y;
        }
      } else if (signer === "joint") {
        if (adviserSignature === "") {
          textPosition.x = signPosition.adviser.x;
          textPosition.y = signPosition.adviser.y;
        } else if (principalSignature === "") {
          textPosition.x = signPosition.principal.x;
          textPosition.y = signPosition.principal.y;
        }
      }

      selectedPage.moveTo(textPosition.x + 80, height - textPosition.y + 40);
      selectedPage.drawImage(whiteImage, whiteBGConfig);
      selectedPage.drawImage(whiteImage, {
        ...whiteBGConfig,
        x: textPosition.x,
        y: height - textPosition.y,
      });

      const svgPath = [
        "M772.378 753.020h-487.099c-31.605 0-57.306-25.702-57.306-57.306s25.702-57.306 57.306-57.306h57.306c15.816 0 28.653-12.834 28.653-28.651s-12.837-28.655-28.653-28.655h-57.306c-63.209 0-114.612 51.405-114.612 114.611 0 63.211 51.403 114.611 114.612 114.611h487.099c15.817 0 28.655-12.834 28.655-28.651s-12.838-28.655-28.655-28.655z",
        "M821.312 245.708c-42.752-42.693-112.32-42.75-155.157 0l-43.84 43.84c-0.542 0.459-1.203 0.631-1.715 1.146-0.516 0.516-0.691 1.175-1.148 1.719l-147.017 147.016c-28.309 28.369-43.9 66.074-43.9 106.163v64.179c0 15.817 12.838 28.655 28.655 28.655h64.183c40.085 0 77.79-15.586 106.214-43.925l193.694-193.694c42.722-42.75 42.722-112.349 0.030-155.099zM587.102 553.954c-17.562 17.51-40.917 27.166-65.728 27.166h-35.533v-35.529c0-24.815 9.655-48.166 27.136-65.702l128.162-128.166 74.099 74.096-128.137 128.135zM780.766 360.291l-25.011 25.014-74.099-74.096 24.986-24.985c20.429-20.401 53.696-20.372 74.095 0 20.403 20.429 20.403 53.666 0.030 74.067z",
      ];
      selectedPage.drawSvgPath(svgPath[0], { color: rgb(0, 0.537, 0.925), scale: 0.015 });
      selectedPage.drawSvgPath(svgPath[1], { color: rgb(0, 0.537, 0.925), scale: 0.015 });
      selectedPage.drawText(TERMS_AND_CONDITIONS.LABEL_SIGN_NOW, {
        x: textPosition.x + 100,
        y: height - textPosition.y + 30,
        size: textHeight,
        font: customFont,
        color: rgb(0, 0.537, 0.925),
      });
      if (signatureImage !== undefined) {
        if (Platform.OS === "ios") {
          selectedPage.drawImage(signatureImage, {
            height: 60,
            width: 240,
            x: signPosition[signer].x,
            y: height - signPosition[signer].y,
          });
        } else {
          selectedPage.drawImage(signatureImage, {
            height: 100,
            width: 200,
            x: (selectedPage.getWidth() * signPosition[signer].x) / Dimensions.get("window").width,
            y: selectedPage.getHeight() - (selectedPage.getHeight() * signPosition[signer].y) / Dimensions.get("window").height - 25,
          });
        }
      }
      const pdfBytes = await loadPdf.save();
      const pdfBase64 = Buffer.from(pdfBytes).toString("base64");
      const selectedPdf: FileBase64 = {
        base64: pdfBase64,
        date: `${moment().valueOf()}`,
        name: editReceipt.name!,
        type: "application/pdf",
      };

      setEditReceipt({ ...editReceipt, signedPdf: selectedPdf });
    }
  };

  const calculatePosition = (locationX?: number, positionY?: number) => {
    let coordinateX = 0;
    let coordinateY = 0;
    if (locationX !== undefined && positionY !== undefined) {
      coordinateX = locationX;
      coordinateY = positionY;
    }
    if (coordinateY > sh180 && coordinateY <= sh460) {
      if (coordinateX <= sw400 && coordinateX > 0) {
        setSigner("adviser");
      } else if (coordinateX > sw400) {
        setSigner("principal");
      }
      setShowSignPdf(true);
    } else if (coordinateX <= sw400 && coordinateY > sh460 && coordinateY < sh740 && accountType === "Joint") {
      if (
        updatedSignatory === PERSONAL_DETAILS.OPTION_CONTROL_EITHER ||
        updatedSignatory === PERSONAL_DETAILS.OPTION_CONTROL_EITHER_NEW ||
        updatedSignatory !== PERSONAL_DETAILS.OPTION_CONTROL_BOTH ||
        updatedSignatory === PERSONAL_DETAILS.OPTION_CONTROL_BOTH_NEW
      ) {
        setSigner("joint");
        setShowSignPdf(true);
      }
    }
  };

  const handlePosition = (e: GestureResponderEvent) => {
    const { locationY, locationX } = e.nativeEvent;
    calculatePosition(locationX, locationY);
  };

  const handleBack = async () => {
    setEditReceipt(undefined);
  };

  const handleConfirm = () => {
    if (showSignPdf === true) {
      setTimeout(() => {
        if (signer === "adviser") {
          if (principalSignature === "") {
            setSigner("principal");
          } else if (
            (accountType === "Joint" && jointSignature === "" && updatedTransactionType !== "Sales" && principalSignature !== "") ||
            (jointSignature === "" &&
              updatedTransactionType === "Sales" &&
              accountType === "Joint" &&
              (updatedSignatory !== PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL ||
                updatedSignatory !== PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL_NEW) &&
              principalSignature !== "")
          ) {
            setSigner("joint");
          } else {
            setShowSignPdf(false);
          }
        } else if (signer === "principal") {
          if (adviserSignature === "") {
            setSigner("adviser");
          } else if (
            (accountType === "Joint" && jointSignature === "" && updatedTransactionType !== "Sales" && adviserSignature !== "") ||
            (jointSignature === "" &&
              updatedTransactionType === "Sales" &&
              accountType === "Joint" &&
              updatedSignatory !== PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL &&
              updatedSignatory !== PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL_NEW &&
              adviserSignature !== "")
          ) {
            setSigner("joint");
          } else {
            setShowSignPdf(false);
          }
        } else if (signer === "joint") {
          if (adviserSignature === "") {
            setSigner("adviser");
          } else if (principalSignature === "") {
            setSigner("principal");
          } else {
            setShowSignPdf(false);
          }
        }
      }, 500);
    } else {
      setShowSignPdf(true);
    }
  };

  const handleClose = () => {
    setShowSignPdf(false);
  };

  const handleSignature = async (value: string) => {
    if (signer === "adviser") {
      setAdviserSignature(value);
    } else if (signer === "principal") {
      setPrincipalSignature(value);
    } else if (signer === "joint") {
      setJointSignature(value);
    }
    modifyPdf(value);
  };

  const handleScroll = () => {
    if (scrollRef !== null) {
      scrollRef.scrollToEnd();
      if (signer === undefined) {
        if (adviserSignature === "") {
          setSigner("adviser");
        } else if (principalSignature === "") {
          setSigner("principal");
        } else {
          setSigner("joint");
        }
      } else {
        setTimeout(() => {
          setShowSignPdf(true);
        }, 500);
      }
    }
  };

  const handleSave = () => {
    setPageLoading(true);
    setTimeout(() => {
      const updatedReceipts = [...receipts!];
      const receiptIndex = updatedReceipts.findIndex((receipt) => receipt.orderNumber === editReceipt!.orderNumber);
      const adviser = {
        base64: adviserSignature,
        date: `${moment().valueOf()}`,
        name: "AdviserSignature.png",
        type: "image/png",
      };
      const principal = {
        base64: principalSignature,
        date: `${moment().valueOf()}`,
        name: "PrincipalSignature.png",
        type: "image/png",
      };
      const joint =
        accountType === "Individual"
          ? undefined
          : {
              base64: jointSignature,
              date: `${moment().valueOf()}`,
              name: "JointSignature.png",
              type: "image/png",
            };
      updatedReceipts[receiptIndex] = {
        ...updatedReceipts[receiptIndex],
        signedPdf: editReceipt!.signedPdf,
        adviserSignature: adviser,
        principalSignature: principal,
        jointSignature: joint,
        completed: true,
      };
      updateReceipts(updatedReceipts);
      setEditReceipt(undefined);
      setPageLoading(false);
    }, 500);
  };

  const jointAge = accountType === "Joint" ? moment().diff(personalInfo.joint!.personalDetails!.dateOfBirth, "years") : undefined;
  const checkJointSignature = jointAge !== undefined && jointAge >= 18 ? jointSignature !== "" : true;
  const checkSignatory = () => {
    switch (updatedSignatory) {
      case PERSONAL_DETAILS.OPTION_CONTROL_BOTH_NEW:
      case PERSONAL_DETAILS.OPTION_CONTROL_BOTH:
        return adviserSignature !== "" && principalSignature !== "" && checkJointSignature === true;

      case PERSONAL_DETAILS.OPTION_CONTROL_EITHER_NEW:
      case PERSONAL_DETAILS.OPTION_CONTROL_EITHER:
        return accountNo !== ""
          ? adviserSignature !== "" && (principalSignature !== "" || checkJointSignature === true)
          : adviserSignature !== "" && principalSignature !== "" && checkJointSignature === true;

      case PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL_NEW:
      case PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL: {
        const checkSign =
          accountNo !== ""
            ? adviserSignature !== "" && principalSignature !== ""
            : adviserSignature !== "" && principalSignature !== "" && checkJointSignature === true;
        return accountType === "Individual" ? adviserSignature !== "" && principalSignature !== "" : checkSign;
      }

      default:
        return adviserSignature !== "" && principalSignature !== "";
    }
  };

  const completed = checkSignatory();

  useEffect(() => {
    if (signer !== undefined) {
      setTimeout(() => {
        calculatePosition();
        setShowSignPdf(true);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);

  useEffect(() => {
    if (scrollRef !== null && completed === true) {
      setTimeout(() => {
        scrollRef.scrollToEnd();
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  return (
    <PdfViewTemplate
      accountType={accountType}
      adviserSignature={adviserSignature}
      completed={completed}
      editReceipt={editReceipt}
      pageWidth={pageWidth}
      principalSignature={principalSignature}
      jointAge={jointAge}
      jointSignature={jointSignature}
      showSignPdf={showSignPdf}
      signer={signer}
      handleScroll={handleScroll}
      handleBack={handleBack}
      handleSave={handleSave}
      handleSignature={handleSignature}
      handleClose={handleClose}
      handleConfirm={handleConfirm}
      handlePosition={handlePosition}
      pageLoading={pageLoading}
      setScrollRef={setScrollRef}
      transactionType={updatedTransactionType}
    />
  );
};
