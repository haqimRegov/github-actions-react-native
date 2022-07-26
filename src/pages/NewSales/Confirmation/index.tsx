import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, FlatList, Keyboard, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import {
  BasicModal,
  ConfirmationModal,
  CustomFlexSpacer,
  CustomSpacer,
  CustomToast,
  LabeledTitle,
  Loading,
  NewPrompt,
  SafeAreaPage,
  SelectionBanner,
} from "../../../components";
import { Language } from "../../../constants";
import { useDelete } from "../../../hooks";
import { IcoMoon } from "../../../icons";
import { getEtbAccountList, submitClientAccountTransactions } from "../../../network-actions";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../store";
import {
  alignSelfStart,
  border,
  borderBottomBlue4,
  centerHV,
  centerVertical,
  colorBlack,
  colorBlue,
  colorGray,
  colorTransparent,
  colorWhite,
  flexChild,
  flexCol,
  flexRow,
  fs10RegGray5,
  fs14BoldBlack2,
  fs14BoldBlue1,
  fs14RegGray5,
  fs16BoldBlack2,
  fs16BoldGray6,
  fs16RegGray5,
  fs16RegGray6,
  fs18BoldGray6,
  fs24BoldGray6,
  fullHW,
  fullWidth,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh124,
  sh16,
  sh24,
  sh4,
  sh40,
  shadow4Blue008,
  sw1,
  sw16,
  sw212,
  sw24,
  sw32,
  sw4,
  sw8,
  sw96,
} from "../../../styles";
import { isNotEmpty, parseAmountToString } from "../../../utils";
import { Investment } from "./Investment";

const { ACTION_BUTTONS, INVESTMENT } = Language.PAGE;

export interface ProductConfirmationProps extends ProductsStoreProps, NewSalesContentProps {
  handleNextStep: (step: TypeNewSalesRoute) => void;
  navigation: IStackNavigationProp;
  route: string;
}

export const ProductConfirmationComponent: FunctionComponent<ProductConfirmationProps> = ({
  accountDetails,
  accountType,
  addOrders,
  addInvestmentDetails: setInvestmentDetails,
  addPersonalInfo,
  addSelectedFund: setSelectedFund,
  client,
  global,
  handleNextStep,
  investmentDetails,
  navigation,
  newSales,
  selectedFunds,
  updateNewSales,
}: ProductConfirmationProps) => {
  const { agent: agentCategory, isMultiUtmc: multiUtmc } = global;
  const { disabledSteps, finishedSteps } = newSales;
  // const principalClientAge = moment().diff(moment(details!.principalHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "months");
  const withEpf = true;
  const flatListRef = useRef<FlatList | null>(null);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);
  const [duplicatePrompt, setDuplicatePrompt] = useState<boolean>(false);
  const [accountListLoader, setAccountListLoader] = useState<boolean>(false);
  const [etbAccountList, setEtbAccountList] = useState<IEtbAccountDescription[]>([]);
  const [deleteCount, setDeleteCount, tempData, setTempData] = useDelete<IProductSales[]>(investmentDetails!, setInvestmentDetails);
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleScrollToFund = () => {
    const findIndex = isNotEmpty(investmentDetails)
      ? investmentDetails!.findIndex(
          (eachInvestment: IProductSales) => eachInvestment.allowEpf === true && eachInvestment.investment.fundPaymentMethod === "EPF",
        )
      : -1;
    if (flatListRef.current !== null && findIndex !== -1) {
      flatListRef.current?.scrollToIndex({ animated: true, index: findIndex, viewPosition: 0 });
    }
  };

  // let isInvestmentEpf = false;
  const investments = investmentDetails!.map(({ fundDetails, investment }) => {
    // if (investment.fundPaymentMethod === "EPF") {
    //   isInvestmentEpf = true;
    // }
    return {
      fundId: investment.fundId!,
      fundingOption: investment.fundPaymentMethod, // TODO backend to fix
      fundClass: investment.fundClass !== "No Class" ? investment.fundClass : "",
      fundCurrency: investment.fundCurrency!,
      investmentAmount: parseAmountToString(investment.investmentAmount),
      isScheduled: `${investment.scheduledInvestment}`,
      scheduledInvestmentAmount: investment.scheduledInvestmentAmount
        ? parseAmountToString(investment.scheduledInvestmentAmount)
        : undefined,
      salesCharge: investment.investmentSalesCharge,
      scheduledSalesCharge: investment.scheduledSalesCharge,
      prsType: fundDetails.prsType,
    };
  });

  const handleUndoDelete = () => {
    const updatedProducts = investmentDetails!.map((eachInvestment: IProductSales) => eachInvestment.fundDetails);
    setSelectedFund(updatedProducts);
    setTempData(investmentDetails!);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleDeleteLastFund = () => {
    setSelectedFund([]);
    setInvestmentDetails([]);
  };

  const handleBackToListing = () => {
    handleNextStep("ProductsList");
  };

  const handleNavigation = () => {
    const epfInvestments = investmentDetails!
      .filter(({ investment }) => investment.fundPaymentMethod === "EPF")
      .map((epfInvestment) => epfInvestment.fundDetails.isSyariah);
    const epfShariah = epfInvestments.includes("Yes");
    const allEpf = epfInvestments.length === investmentDetails!.length;
    const epfObject =
      epfInvestments.length > 0 ? { epfInvestment: true, epfShariah: epfShariah } : { epfInvestment: false, epfShariah: epfShariah };
    addPersonalInfo({ ...epfObject, editPersonal: false, isAllEpf: allEpf });
    const checkNextStep: TypeNewSalesRoute =
      client.isNewFundPurchase === true || newSales.accountDetails.accountNo !== "" ? "OrderPreview" : "IdentityVerification";
    handleNextStep(checkNextStep);
    const updatedFinishedSteps: TypeNewSalesKey[] = disabledSteps.includes("IdentityVerification")
      ? ["RiskProfile", "RiskAssessment", "Products", "ProductsList", "ProductsConfirmation", "AccountList"]
      : [...finishedSteps, "Products", "ProductsList", "ProductsConfirmation"];
    const newFundPurchaseDisable: TypeNewSalesKey[] =
      client.isNewFundPurchase === true || newSales.accountDetails.accountNo !== ""
        ? ["RiskProfile", "RiskAssessment", "Products", "ProductsList", "ProductsConfirmation", "AccountList"]
        : ["OrderPreview"];
    const updatedDisabledSteps: TypeNewSalesKey[] = disabledSteps.includes("IdentityVerification")
      ? [
          "IdentityVerification",
          "AdditionalDetails",
          "Summary",
          "Acknowledgement",
          "TermsAndConditions",
          "Signatures",
          "Payment",
          ...newFundPurchaseDisable,
        ]
      : [...disabledSteps, ...newFundPurchaseDisable];
    updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
  };

  const handleSetupClient = async () => {
    const request: ISubmitClientAccountTransactionsRequest = {
      initId: client.details?.initId!,
      accountNo: newSales.accountDetails.accountNo,
      investments: investments,
    };
    const response: ISubmitClientAccountResponse = await submitClientAccountTransactions(request, navigation);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        addOrders(data.result);
        return;
      }

      if (error !== null) {
        const errorList = error.errorList?.join("\n");
        setTimeout(() => {
          Alert.alert(error.message, errorList);
        }, 150);
      }
    }
  };

  const handleCheckAccounts = async () => {
    setAccountListLoader(true);
    setDuplicatePrompt(true);
    const checkJoint = accountType === "Joint" ? { joint: { clientId: client.details?.jointHolder?.clientId! } } : {};
    const request: IEtbAccountListRequest = {
      initId: client.details?.initId!,
      principal: {
        clientId: client.details?.principalHolder!.clientId!,
      },
      isEtb: true,
      investments: investments,
      ...checkJoint,
    };
    const response: IEtbAccountListResponse = await getEtbAccountList(request, navigation);
    setAccountListLoader(false);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        if (data.result.etbAccountList.length > 0) {
          setEtbAccountList(data.result.etbAccountList);
        } else {
          handleNavigation();
        }
        return;
      }

      if (error !== null) {
        const errorList = error.errorList?.join("\n");
        setTimeout(() => {
          Alert.alert(error.message, errorList);
        }, 150);
      }
    }
  };

  const handleCancelPrompt = () => {
    setDuplicatePrompt(false);
    setAccountListLoader(false);
  };

  const handleConfirmPrompt = () => {
    setDuplicatePrompt(false);
    setAccountListLoader(false);
    handleNavigation();
  };

  const handleConfirmIdentity = async () => {
    if (client.isNewFundPurchase === true || newSales.accountDetails.accountNo !== "") {
      await handleSetupClient();
      handleNavigation();
    } else {
      await handleCheckAccounts();
    }
  };

  let utCount = 0;
  let prsCount = 0;
  let ampCount = 0;
  selectedFunds.forEach((fund: IProduct) => {
    if (fund.fundType === "UT" || fund.fundType === "UTF" || fund.fundType === "WSF") {
      utCount += 1;
    } else if (fund.fundType === "PRS") {
      prsCount += 1;
    } else if (fund.fundType === "AMP") {
      ampCount += 1;
    }
  });

  const utSuffix = utCount > 0 && prsCount > 0 && ampCount > 0 ? ", " : "";
  const prsSuffix = utCount > 0 && prsCount > 0 && ampCount > 0 ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const prsPrefix = prsCount > 0 && utCount > 0 && ampCount === 0 ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const ampPrefix =
    (ampCount > 0 && utCount > 0 && prsCount === 0) || (ampCount > 0 && prsCount > 0 && utCount === 0) ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const utLabel = utCount > 0 ? `${utCount} ${INVESTMENT.LABEL_UT}` : "";
  const prsLabel = prsCount > 0 ? `${prsCount} ${INVESTMENT.LABEL_PRS}` : "";
  const ampLabel = ampCount > 0 ? `${ampCount} ${INVESTMENT.LABEL_AMP}` : "";

  const bannerText = `${utLabel}${utSuffix}${prsPrefix}${prsLabel}${prsSuffix}${ampPrefix}${ampLabel}`;

  const disableContinue = investmentDetails?.find(({ investment }) => {
    return (
      investment.investmentAmount === "" ||
      investment.investmentSalesCharge === "" ||
      (investment.scheduledInvestment === true && investment.scheduledInvestmentAmount === "") ||
      (investment.scheduledInvestment === true && investment.scheduledSalesCharge === "") ||
      investment.amountError !== undefined ||
      investment.scheduledAmountError !== undefined ||
      investment.investmentSalesChargeError !== undefined ||
      investment.scheduledSalesChargeError !== undefined
    );
  });

  useEffect(() => {
    const handleKeyboardShow = () => {
      setFixedBottomShow(false);
    };

    const handleKeyboardHide = () => {
      setFixedBottomShow(true);
    };

    const keyboardWillShow = Keyboard.addListener("keyboardWillShow", handleKeyboardShow);
    const keyboardWillHide = Keyboard.addListener("keyboardWillHide", handleKeyboardHide);
    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [setFixedBottomShow]);

  useEffect(() => {
    const updatedProducts = investmentDetails!.map((eachInvestment: IProductSales) => eachInvestment.fundDetails);
    setSelectedFund(updatedProducts);
    setTempData(investmentDetails!);
    if (investmentDetails?.length === 0) {
      handleNextStep("ProductsList");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investmentDetails]);

  useEffect(() => {
    const findEpfIndex = investmentDetails!.findIndex(
      (eachNewInvestment: IProductSales) => eachNewInvestment.investment.fundPaymentMethod === "EPF",
    );
    const updatedInvestmentDetails: IProductSales[] = investmentDetails!.map((eachDetails: IProductSales) => {
      const checkData =
        findEpfIndex !== -1 ? eachDetails.fundDetails.issuingHouse === investmentDetails![findEpfIndex].fundDetails.issuingHouse : true;
      const checkMultipleUtmc = multiUtmc === true && eachDetails.fundDetails.isEpf ? true : checkData;
      const checkEpf = accountDetails.isEpf === true ? "EPF" : "Cash";
      const checkNewFundPurchase = accountDetails.isEpf !== undefined ? checkEpf : eachDetails.investment.fundPaymentMethod;
      const checkFundPaymentMethod = checkMultipleUtmc === false ? "Cash" : checkNewFundPurchase;
      return {
        ...eachDetails,
        allowEpf: checkMultipleUtmc,
        investment: {
          ...eachDetails.investment,
          fundPaymentMethod: checkFundPaymentMethod,
        },
      };
    });
    setInvestmentDetails(updatedInvestmentDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastFundName = tempData !== undefined && tempData.length > 0 && tempData !== undefined ? tempData[0].fundDetails.fundName : "";

  return (
    <Fragment>
      <SafeAreaPage>
        <View style={{ ...px(sw16), ...flexChild }}>
          <FlatList
            data={tempData}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item: IProductSales) => item.fundDetails.fundCode}
            ListHeaderComponent={
              <View style={px(sw8)}>
                <CustomSpacer space={sh40} />
                <LabeledTitle
                  label={INVESTMENT.HEADING}
                  labelStyle={fs18BoldGray6}
                  spaceToLabel={sh4}
                  title={INVESTMENT.SUBHEADING}
                  titleStyle={fs14RegGray5}
                />
                {multiUtmc === false ? <Text style={fs16RegGray5}>{INVESTMENT.LABEL_MULTIPLE_UTMC}</Text> : null}
                <CustomSpacer space={sh24} />
              </View>
            }
            ListFooterComponent={<CustomSpacer space={sh124} />}
            ref={flatListRef}
            renderItem={({ item, index }) => {
              const { fundName, issuingHouse } = item.fundDetails;
              // const type = prsType === "prsDefault" ? "PRS DEFAULT" : fundType;
              const newData = tempData !== undefined ? [...tempData] : [];

              const handleDelete = () => {
                if (tempData !== undefined && tempData.length > 1) {
                  let updatedDetails = [...tempData];
                  updatedDetails.splice(index, 1);
                  if (multiUtmc === false) {
                    const findEpfIndex = updatedDetails.findIndex(
                      (eachNewData: IProductSales) => eachNewData.investment.fundPaymentMethod === "EPF",
                    );
                    updatedDetails = updatedDetails.map((eachData) => {
                      return {
                        ...eachData,
                        allowEpf:
                          findEpfIndex !== -1 ? eachData.fundDetails.issuingHouse === newData[findEpfIndex].fundDetails.issuingHouse : true,
                      };
                    });
                  }
                  setTempData(updatedDetails);
                  const updatedProducts = updatedDetails.map((eachTempInvestment: IProductSales) => eachTempInvestment.fundDetails);
                  setSelectedFund(updatedProducts);
                  setDeleteCount(deleteCount + 1);
                } else {
                  setShowModal(true);
                }
              };

              const updateData = (updatedData: IProductSales) => {
                newData[index] = updatedData;
                let data: IProductSales[] = [...newData];
                if (multiUtmc === false) {
                  const findEpfIndex = newData.findIndex(
                    (eachNewData: IProductSales) => eachNewData.investment.fundPaymentMethod === "EPF",
                  );
                  data = newData.map((eachData) => {
                    return {
                      ...eachData,
                      allowEpf:
                        findEpfIndex !== -1 ? eachData.fundDetails.issuingHouse === newData[findEpfIndex].fundDetails.issuingHouse : true,
                    };
                  });
                }
                setInvestmentDetails(data);
              };

              const checkIndex = investmentDetails!.findIndex(
                (eachInvestment: IProductSales) => eachInvestment.fundDetails.issuingHouse === issuingHouse,
              );

              const container: ViewStyle = {
                ...flexChild,
                ...shadow4Blue008,
                borderColor: colorGray._2,
                borderWidth: sw1,
                backgroundColor: colorWhite._1,
                borderRadius: sw8,
                marginHorizontal: sw8,
              };

              return (
                <Fragment key={index}>
                  {index === 0 ? null : <CustomSpacer space={sh24} />}
                  {index <= checkIndex ? (
                    <Fragment>
                      <View style={{ ...flexRow, ...centerVertical, ...px(sw8) }}>
                        <IcoMoon name="house" size={sw16} color={colorBlack._2} />
                        <CustomSpacer isHorizontal={true} space={sw8} />
                        <Text style={fs16BoldBlack2}>{item.fundDetails.issuingHouse}</Text>
                        <CustomSpacer isHorizontal={true} space={sw16} />
                        <View style={flexChild}>
                          <View style={borderBottomBlue4} />
                        </View>
                      </View>
                      <CustomSpacer space={sh16} />
                    </Fragment>
                  ) : null}
                  <View style={container}>
                    <View
                      style={{
                        ...px(sw32),
                        ...py(sh12),
                        backgroundColor: colorBlue._3,
                        borderTopLeftRadius: sw8,
                        borderTopRightRadius: sw8,
                      }}>
                      <View style={rowCenterVertical}>
                        <Text style={fs14BoldBlack2}>{fundName}</Text>
                        <CustomFlexSpacer />
                        <IcoMoon name="trash" color={colorBlue._1} onPress={handleDelete} size={sw24} suppressHighlighting={true} />
                      </View>
                    </View>
                    <CustomSpacer space={sh16} />
                    <Investment
                      accountDetails={accountDetails}
                      accountType={accountType}
                      agentCategory={agentCategory!.category!}
                      data={item}
                      handleScrollToFund={handleScrollToFund}
                      setData={updateData}
                      withEpf={withEpf}
                    />
                  </View>
                </Fragment>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <CustomToast count={deleteCount} isDeleteToast={true} onPress={handleUndoDelete} setCount={setDeleteCount} />
        {fixedBottomShow === true && selectedFunds.length !== 0 ? (
          <View style={flexCol}>
            <SelectionBanner
              bottomContent={
                <View style={flexRow}>
                  <Text style={fs16BoldGray6}>{bannerText}</Text>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <Text style={fs16RegGray6}>{INVESTMENT.LABEL_SELECTED}</Text>
                </View>
              }
              cancelOnPress={handleBackToListing}
              continueDisabled={disableContinue !== undefined}
              labelCancel={INVESTMENT.BUTTON_CANCEL}
              labelSubmit={INVESTMENT.BUTTON_NEXT}
              submitOnPress={handleConfirmIdentity}
              label={INVESTMENT.HEADING}
            />
          </View>
        ) : null}
      </SafeAreaPage>
      <ConfirmationModal
        handleCancel={handleCancelDelete}
        handleContinue={handleDeleteLastFund}
        labelCancel={ACTION_BUTTONS.BUTTON_CANCEL}
        labelContinue={ACTION_BUTTONS.BUTTON_DELETE}
        title={`${ACTION_BUTTONS.BUTTON_DELETE} ${lastFundName}`}
        visible={showModal}>
        <View>
          <Text style={fs16RegGray6}>{INVESTMENT.DELETE_MODAL_LINE_1}</Text>
          <CustomSpacer space={sh16} />
          <Text style={fs16RegGray6}>{INVESTMENT.DELETE_MODAL_LINE_2}</Text>
        </View>
      </ConfirmationModal>
      <BasicModal backdropOpacity={0.65} visible={duplicatePrompt}>
        <View style={{ ...centerHV, ...fullHW }}>
          {accountListLoader === false ? (
            <NewPrompt
              primary={{ buttonStyle: { width: sw212 }, onPress: handleConfirmPrompt, text: INVESTMENT.BUTTON_CONFIRM }}
              secondary={{ buttonStyle: { width: sw212 }, onPress: handleCancelPrompt }}
              spaceToTitle={sh4}
              subtitle={INVESTMENT.LABEL_DUPLICATE_PROMPT_SUBTITLE}
              subtitleStyle={{ ...fs16RegGray5, ...alignSelfStart }}
              title={INVESTMENT.LABEL_DUPLICATE_PROMPT_TITLE}
              titleStyle={{ ...fs24BoldGray6, ...alignSelfStart }}>
              <View style={fullWidth}>
                <CustomSpacer space={sh24} />
                <View style={border(colorBlue._3, sw1, sw8)}>
                  {etbAccountList
                    .filter((eachAccount: IEtbAccountDescription) => eachAccount.accountNumber !== null)
                    .map((eachDuplicateAccount: IEtbAccountDescription, index: number) => {
                      const containerStyle: ViewStyle = {
                        ...px(sw24),
                        ...py(sh12),
                        ...rowCenterVertical,
                        backgroundColor: colorWhite._1,
                        borderBottomColor: index === etbAccountList.length - 1 ? colorTransparent : colorBlue._3,
                        borderBottomWidth: index === etbAccountList.length - 1 ? 0 : sw1,
                        borderTopLeftRadius: index === 0 ? sw8 : 0,
                        borderTopRightRadius: index === 0 ? sw8 : 0,
                        borderBottomLeftRadius: index === etbAccountList.length - 1 ? sw8 : 0,
                        borderBottomRightRadius: index === etbAccountList.length - 1 ? sw8 : 0,
                      };
                      return (
                        <View key={index} style={containerStyle}>
                          <IcoMoon color={colorBlue._1} name="duplicate-account" size={sw16} />
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Text style={{ ...fs14BoldBlue1, width: sw96 }}>{eachDuplicateAccount.accountNumber}</Text>
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Text style={fs10RegGray5}>{eachDuplicateAccount.description}</Text>
                        </View>
                      );
                    })}
                </View>
              </View>
            </NewPrompt>
          ) : (
            <View style={{ ...centerHV, ...fullHW }}>
              <Loading color={colorWhite._1} />
            </View>
          )}
        </View>
      </BasicModal>
    </Fragment>
  );
};

export const ProductConfirmation = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(ProductConfirmationComponent);
