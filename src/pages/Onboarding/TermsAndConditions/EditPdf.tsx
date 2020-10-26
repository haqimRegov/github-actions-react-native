import { Buffer } from "buffer";
import moment from "moment";
import { PDFDocument } from "pdf-lib/cjs";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Dimensions, GestureResponderEvent, Platform, ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";
import { connect } from "react-redux";

import { CustomSpacer, SignatureModal } from "../../../components";
import { Base64 } from "../../../constants";
import { Language } from "../../../constants/language";
import { IcoMoon } from "../../../icons";
import { ClientMapDispatchToProps, ClientMapStateToProps } from "../../../store";
import {
  centerVertical,
  colorBlack,
  flexChild,
  flexGrow,
  flexRow,
  fs24BoldBlack2,
  px,
  sh100,
  sh155,
  sh1600,
  sh220,
  sh370,
  sh4,
  sh40,
  sh56,
  sh800,
  sh90,
  sw180,
  sw20,
  sw200,
  sw24,
  sw245,
  sw275,
  sw470,
  sw595,
  sw8,
} from "../../../styles";
import { GetEmbeddedBase64 } from "../../../utils";
import { SignatureProps } from "./Signature";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

export const EditPdfComponent: FunctionComponent<SignatureProps> = ({
  accountType,
  currentPdf,
  pdfList,
  setCurrentPdf,
  setPage,
  setPdfList,
}: SignatureProps) => {
  const [adviserSignature, setAdviserSignature] = useState<string>("");
  const [clientSignature, setClientSignature] = useState<string>("");
  const [jointSignature, setJointSignature] = useState<string>("");
  const [numberOfPdfPages, setNumberOfPdfPages] = useState<number>(1);
  const [showSignPdf, setShowSignPdf] = useState<boolean>(false);
  const [signer, setSigner] = useState<0 | 1 | 2>();
  const [signaturePosition, setSignaturePosition] = useState({ page: -1, x: 0, y: 0 });

  const modifyPdf = async (value: string) => {
    if (value !== "" && currentPdf !== undefined) {
      const dataUri = GetEmbeddedBase64(currentPdf.pdf);
      const loadPdf = await PDFDocument.load(dataUri);
      const whiteImage = await loadPdf.embedPng(Base64.background.white);
      const signatureImage = await loadPdf.embedPng(value);
      const pages = loadPdf.getPages();
      const selectedPage = pages[signaturePosition.page];
      const { height } = selectedPage.getSize();
      const positionX = signaturePosition.x.toString();
      const positionY = signaturePosition.y.toString();
      const offsetX = parseInt(positionX, 10);
      const offsetY = parseInt(positionY, 10);
      selectedPage.drawImage(whiteImage, {
        height: sh40,
        opacity: 1,
        width: sw180,
        x: offsetX,
        y: height - offsetY,
      });
      if (Platform.OS === "ios") {
        selectedPage.drawImage(signatureImage, {
          height: sh40,
          width: sw180,
          x: offsetX,
          y: height - offsetY,
        });
      } else {
        selectedPage.drawImage(signatureImage, {
          height: sh100,
          width: sw200,
          x: (selectedPage.getWidth() * signaturePosition.x) / Dimensions.get("window").width,
          y: selectedPage.getHeight() - (selectedPage.getHeight() * signaturePosition.y) / Dimensions.get("window").height - 25,
        });
      }
      const pdfBytes = await loadPdf.save();
      const pdfBase64 = Buffer.from(pdfBytes).toString("base64");
      const selectedPdf = {
        base64: pdfBase64,
        date: moment().toString(),
        name: currentPdf.pdf.name,
        type: "application/pdf",
      };
      setCurrentPdf({ ...currentPdf, pdf: selectedPdf });
    }
  };

  const handlePosition = (e: GestureResponderEvent) => {
    const { locationY, locationX } = e.nativeEvent;
    const positionY = locationY - (numberOfPdfPages - 1) * 800;
    if (positionY > sh90 && positionY < sh220) {
      if (locationX < sw245) {
        setSignaturePosition({ page: numberOfPdfPages - 1, x: sw20, y: sh155 });
        setSigner(0);
      } else if (locationX > sw245 && locationX < sw470) {
        setSignaturePosition({ page: numberOfPdfPages - 1, x: sw275, y: sh155 });
        setSigner(1);
      }
      setShowSignPdf(true);
    } else if (locationX < sw245 && positionY > sh220 && positionY < sh370) {
      setSignaturePosition({ page: numberOfPdfPages - 1, x: 20, y: 300 });
      setSigner(2);
      setShowSignPdf(true);
    }
  };

  const handleBack = async () => {
    const orderNo = currentPdf.pdf.name.slice(0, -4);
    const accountTypeCheck = accountType === "Joint" ? jointSignature !== "" : true;
    const newData: PdfWithSignature = {
      orderNo: orderNo,
      pdf: currentPdf.pdf,
      clientSignature: clientSignature !== "" ? clientSignature : pdfList[currentPdf.index].clientSignature,
      adviserSignature: adviserSignature !== "" ? adviserSignature : pdfList[currentPdf.index].adviserSignature,
    };
    if (accountTypeCheck) {
      newData.jointSignature = jointSignature !== "" ? jointSignature : pdfList[currentPdf.index].jointSignature;
    }
    if (pdfList !== undefined) {
      const dataClone = [...pdfList];
      dataClone[currentPdf.index] = newData;
      setPdfList(dataClone);
    } else {
      setPdfList([newData]);
    }
    setPage(1);
  };

  const handleConfirm = () => {
    if (showSignPdf === true) {
      setTimeout(() => {
        setShowSignPdf(false);
      }, 1000);
    } else {
      setShowSignPdf(true);
    }
  };

  const handleClose = () => {
    setShowSignPdf(false);
  };

  const handleSignature = (value: string) => {
    if (signer === 0) {
      setAdviserSignature(value);
    } else if (signer === 1) {
      setClientSignature(value);
    } else if (signer === 2) {
      setJointSignature(value);
    }
    modifyPdf(value);
  };

  let signerLabel = "";
  let signatureToDisplay = "";
  if (signer !== undefined) {
    switch (signer) {
      case 0:
        signerLabel = TERMS_AND_CONDITIONS.LABEL_ADVISER_SIGNATURE;
        signatureToDisplay = adviserSignature;
        break;
      case 1:
        signerLabel = TERMS_AND_CONDITIONS.LABEL_CLIENT_SIGNATURE;
        signatureToDisplay = clientSignature;
        break;
      case 2:
        signerLabel = TERMS_AND_CONDITIONS.LABEL_JOINT_SIGNATURE;
        signatureToDisplay = jointSignature;
        break;
      default:
        signerLabel = TERMS_AND_CONDITIONS.LABEL_ADVISER_SIGNATURE;
        break;
    }
  }

  const pdfViewContainer: ViewStyle = { ...px(sw8), width: sw595, height: numberOfPdfPages * sh800 };
  const pdfContainer: ViewStyle = { height: numberOfPdfPages * sh1600 }; // To display the page number correctly in the viewer

  useEffect(() => {
    const calculatePages = async () => {
      if (currentPdf !== undefined) {
        const dataUri = GetEmbeddedBase64(currentPdf.pdf);
        const loadPdf = await PDFDocument.load(dataUri);
        const pages = loadPdf.getPages().length;
        setNumberOfPdfPages(pages);
      }
    };

    calculatePages();
  }, [currentPdf]);

  return (
    <View style={flexChild}>
      <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps={"handled"}>
        <CustomSpacer space={sh56} />
        <View style={px(sw24)}>
          <View style={{ ...centerVertical, ...flexRow }}>
            <IcoMoon color={colorBlack._1} name="arrow-left" onPress={handleBack} size={sw24} />
            <CustomSpacer isHorizontal={true} space={sw20} />
            <Text style={fs24BoldBlack2}>{currentPdf?.pdf.name}</Text>
          </View>
        </View>
        <CustomSpacer space={sh4} />
        <TouchableWithoutFeedback onPress={handlePosition}>
          <View style={pdfViewContainer}>
            <View pointerEvents="none">
              <PDFView fadeInDuration={350} style={pdfContainer} resource={currentPdf.pdf.base64!} resourceType={"base64"} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <SignatureModal
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        handleSignature={handleSignature}
        signature={signatureToDisplay}
        title={signerLabel}
        visible={showSignPdf}
      />
    </View>
  );
};

export const EditPdf = connect(ClientMapStateToProps, ClientMapDispatchToProps)(EditPdfComponent);
