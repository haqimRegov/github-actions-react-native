import cloneDeep from "lodash.clonedeep";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, FlatList, Keyboard, ScrollView, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import {
  BasicModal,
  ConfirmationModal,
  CustomFlexSpacer,
  CustomSpacer,
  CustomToast,
  CustomTooltip,
  Loading,
  NewPrompt,
  SafeAreaPage,
  TextSpaceArea,
} from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_CURRENCY, DICTIONARY_EPF_AGE } from "../../../data/dictionary";
import { useDelete } from "../../../hooks";
import { IcoMoon } from "../../../icons";
import { getAllBanksInAccount, getEtbAccountList, submitClientAccountTransactions } from "../../../network-actions";
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
  flexGrow,
  flexRow,
  fs10RegGray5,
  fs12RegGray5,
  fs12RegWhite1,
  fs14BoldBlack2,
  fs14BoldBlue1,
  fs14RegGray5,
  fs16RegGray5,
  fs16RegGray6,
  fs18BoldGray6,
  fs24BoldGray6,
  fullHW,
  fullWidth,
  px,
  py,
  rowCenterVertical,
  sh11,
  sh12,
  sh120,
  sh16,
  sh20,
  sh24,
  sh240,
  sh4,
  sh40,
  sh6,
  shadow4Blue008,
  sw1,
  sw10,
  sw100,
  sw14,
  sw16,
  sw212,
  sw24,
  sw240,
  sw32,
  sw4,
  sw760,
  sw8,
  sw96,
} from "../../../styles";
import { Investment, ProductsBanner } from "../../../templates";
import { isArrayNotEmpty, isNotEmpty, parseAmountToString } from "../../../utils";

const { ACTION_BUTTONS, INVESTMENT, PERSONAL_DETAILS } = Language.PAGE;

export interface ProductConfirmationProps extends ProductsStoreProps, NewSalesContentProps {
  handleNextStep: (step: TypeNewSalesRoute) => void;
  navigation: IStackNavigationProp;
  route: string;
}

export const ProductConfirmationComponent: FunctionComponent<ProductConfirmationProps> = ({
  accountDetails,
  accountType,
  addBankDetails,
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
  personalInfo,
  selectedFunds,
  updateNewSales,
}: ProductConfirmationProps) => {
  const { agent: agentCategory, isMultiUtmc: multiUtmc } = global;
  const { disabledSteps, finishedSteps, transactionType } = newSales;
  const { accountNo, ampDetails, isEpf } = accountDetails;
  const { details } = client;
  const principalClientAge = moment().diff(moment(details!.principalHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "months");
  const withEpf = accountType === "Individual" && principalClientAge < DICTIONARY_EPF_AGE;
  const flatListRef = useRef<FlatList | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);
  const [duplicatePrompt, setDuplicatePrompt] = useState<boolean>(false);
  const [etbAccountList, setEtbAccountList] = useState<IEtbAccountDescription[]>([]);
  const [deleteCount, setDeleteCount, tempData, setTempData] = useDelete<IProductSales[]>(investmentDetails!, setInvestmentDetails);
  const [showModal, setShowModal] = useState<boolean>(false);
  const checkAMP: TypeNewSalesRoute = ampDetails !== undefined ? "RiskSummary" : "ProductsList";

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
  const investments = investmentDetails!.map(({ fundDetails, investment, isNewFund }) => {
    // if (investment.fundPaymentMethod === "EPF") {
    //   isInvestmentEpf = true;
    // }
    return {
      fundId: investment.fundId!,
      fundingOption: investment.fundPaymentMethod, // TODO backend to fix
      fundClass: investment.fundClass !== "No Class" ? investment.fundClass : "",
      fundCurrency: investment.fundCurrency!,
      investmentAmount: investment.investmentAmount !== "" ? parseAmountToString(investment.investmentAmount) : "",
      isScheduled: `${investment.scheduledInvestment}`,
      scheduledInvestmentAmount: investment.scheduledInvestmentAmount
        ? parseAmountToString(investment.scheduledInvestmentAmount)
        : undefined,
      salesCharge: investment.investmentAmount !== "" ? investment.investmentSalesCharge : "",
      scheduledSalesCharge: investment.scheduledSalesCharge,
      prsType: fundDetails.prsType,
      isTopup: !isNewFund,
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
    if (checkAMP === "ProductsList") {
      const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];

      // add to disabledSteps
      if (updatedDisabledSteps.includes("ProductsConfirmation") === false) {
        updatedDisabledSteps.push("ProductsConfirmation");
      }

      updateNewSales({ ...newSales, disabledSteps: updatedDisabledSteps });
    }

    handleNextStep(checkAMP);
  };

  const handleNavigation = (allBanks?: IGetAllBanksResult) => {
    const epfInvestments = investmentDetails!.filter(({ investment }) => investment.fundPaymentMethod === "EPF");
    const epfInvestmentsShariah = epfInvestments.map((epfInvestment) => epfInvestment.fundDetails.isSyariah);
    const epfShariah = epfInvestmentsShariah.includes("Yes");
    const allEpf = epfInvestments.length === investmentDetails!.length;
    const isSalesFromQuickActions = client.isNewFundPurchase === true || accountNo !== "";
    const epfObject =
      epfInvestments.length > 0 ? { epfInvestment: true, epfShariah: epfShariah } : { epfInvestment: false, epfShariah: epfShariah };

    // dynamically reset EPF details when the Funding Option was changed
    const resetEpfDetails =
      epfInvestments.length === 0
        ? {
            epfDetails: {
              epfAccountType: "Conventional",
              epfMemberNumber: "",
            },
          }
        : {};

    let investmentCurrencies: string[] = [];
    investmentCurrencies = investmentDetails!.map(({ investment }) => investment.fundCurrency!);
    let currentCurrencies: string[] = [];
    let foreignBank: IBankDetailsState[] = [];
    let localBank: IBankDetailsState[] = [];
    if (allBanks !== undefined) {
      localBank = [...allBanks.localBank];
      foreignBank = isArrayNotEmpty(allBanks.foreignBank) ? [...allBanks.foreignBank!] : [];
      currentCurrencies = [
        ...foreignBank!
          .map((eachBank: IBankDetailsState) => eachBank.currency)
          .map((currency) => {
            return currency;
          })
          .flat(),
        ...localBank!
          .map((eachBank: IBankDetailsState) => eachBank.currency)
          .map((currency) => {
            return currency;
          })
          .flat(),
      ] as string[];
    }
    const remainingCurrencies = investmentCurrencies.filter(
      (eachInvestmentCurrency: string) => !currentCurrencies.includes(eachInvestmentCurrency),
    );
    const isNeedAdditionalBankCurrency = remainingCurrencies.length > 0;

    let filterLocalBankDetails: IBankDetailsState[] = [];
    let filterForeignBankDetails: IBankDetailsState[] = [];
    if (transactionType === "Sales-AO") {
      // dynamically reset local bank details when the selectedFunds was changed
      filterLocalBankDetails = personalInfo
        .principal!.bankSummary!.localBank!.map((eachBank) => ({
          ...eachBank,
          currency: eachBank.currency!.filter((eachCurrency) => investmentCurrencies.includes(eachCurrency)),
          bankAccountName: accountType === "Individual" ? details?.principalHolder!.name : "",
        }))
        .filter((eachLocalBank) => eachLocalBank.currency.length > 0);

      // dynamically reset foreign bank details when the selectedFunds was changed
      filterForeignBankDetails =
        personalInfo.principal!.bankSummary!.foreignBank!.length > 0
          ? personalInfo
              .principal!.bankSummary!.foreignBank!.map((eachBank) => ({
                ...eachBank,
                currency: eachBank.currency!.filter((eachCurrency) => investmentCurrencies.includes(eachCurrency)),
                bankAccountName: accountType === "Individual" ? details?.principalHolder!.name : "",
              }))
              .filter((eachForeignBank) => eachForeignBank.currency.length > 0)
          : [];
    } else if (transactionType === "Sales" && isNeedAdditionalBankCurrency === true) {
      filterLocalBankDetails = localBank;
      filterForeignBankDetails = isArrayNotEmpty(foreignBank) ? [...foreignBank] : [];
    }

    const initialLocalBank =
      filterLocalBankDetails.length > 0
        ? filterLocalBankDetails
        : [
            {
              bankAccountName: accountType === "Individual" ? details?.principalHolder?.name : "",
              bankAccountNumber: "",
              bankName: "",
              bankSwiftCode: "",
              currency: [DICTIONARY_CURRENCY[0].value],
              otherBankName: "",
            },
          ];

    const fundsWithPayout = investmentDetails!.filter(({ fundDetails, investment }) => {
      return (
        (fundDetails.fundType !== "PRS" && investment.fundPaymentMethod !== "EPF") ||
        (investment.fundPaymentMethod === "Cash" && fundDetails.fundType !== "PRS")
      );
    });

    const checkPayout =
      fundsWithPayout.length === 0
        ? { incomeDistribution: PERSONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST, signatory: PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL_NEW }
        : { signatory: PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL_NEW };

    addPersonalInfo({
      ...personalInfo,
      ...epfObject,
      editPersonal: false,
      isAllEpf: allEpf,
      ...checkPayout,
      principal: {
        ...personalInfo.principal,
        ...resetEpfDetails,
        bankSummary: { localBank: initialLocalBank, foreignBank: filterForeignBankDetails },
      },
    });

    // combined New Fund and AO
    const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];

    // add to finishedSteps
    if (updatedFinishedSteps.includes("Products") === false) {
      updatedFinishedSteps.push("Products");
    }
    if (updatedFinishedSteps.includes("ProductsConfirmation") === false) {
      updatedFinishedSteps.push("ProductsConfirmation");
    }

    // if (riskAssessment.isRiskUpdated === true) {
    //   updatedFinishedSteps.push("RiskAssessment");
    // }

    // route to Acknowledgement
    const disabledStepsInAcknowledgement: TypeNewSalesKey[] = [
      "AccountList",
      "RiskSummary",
      "Products",
      "AccountInformation",
      "Acknowledgement",
      "OrderPreview",
      "TermsAndConditions",
      "Signatures",
      "Payment",
    ];

    const updatedDisabledStepsSalesWithBank: TypeNewSalesKey[] =
      isNeedAdditionalBankCurrency === true
        ? [
            // "AccountList",
            // "RiskSummary",
            "RiskAssessment",
            // "Products",
            "ProductsList",
            // "ProductsConfirmation",
            // "AccountInformation",
            "IdentityVerification",
            "AdditionalDetails",
            "Summary",
            "Acknowledgement",
            "OrderPreview",
            "TermsAndConditions",
            "Signatures",
            "Payment",
          ]
        : [...disabledStepsInAcknowledgement];

    const updatedDisabledSteps: TypeNewSalesKey[] =
      isSalesFromQuickActions === true && isNeedAdditionalBankCurrency === false
        ? [...disabledStepsInAcknowledgement]
        : updatedDisabledStepsSalesWithBank;

    // TODO update "AdditionalDetails" steps when bank resets
    updateNewSales({
      ...newSales,
      disabledSteps: updatedDisabledSteps,
      finishedSteps: updatedFinishedSteps,
      accountDetails: {
        ...newSales.accountDetails,
        isBankDetailsRequired: isNeedAdditionalBankCurrency,
        bankDetails: cloneDeep(allBanks),
      },
    });

    const checkNextStepForSales: TypeNewSalesKey = isNeedAdditionalBankCurrency === true ? "AdditionalDetails" : "OrderPreview";
    const checkNextStep: TypeNewSalesKey = isSalesFromQuickActions === true ? checkNextStepForSales : "IdentityVerification";

    handleNextStep(checkNextStep);
  };

  const handleSetupClient = async () => {
    const request: ISubmitClientAccountTransactionsRequest = {
      initId: client.details?.initId!,
      accountNo: accountNo,
      investments: investments,
    };
    const response: ISubmitClientAccountResponse = await submitClientAccountTransactions(request, navigation);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        addOrders(data.result);
      }

      if (error !== null) {
        const errorList = error.errorList?.join("\n");
        setTimeout(() => {
          Alert.alert(error.message, errorList);
        }, 150);
        return error;
      }
    }
    return undefined;
  };

  const handleCheckAccounts = async () => {
    setLoader(true);
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
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        if (data.result.etbAccountList.length > 0) {
          setDuplicatePrompt(true);
          setLoader(false);
          setEtbAccountList(data.result.etbAccountList);
        } else {
          setLoader(false);
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

  const handleCheckBanks = async () => {
    const request: IGetAllBanksRequest = {
      accountNo: accountNo,
    };
    const response: IGetAllBanksResponse = await getAllBanksInAccount(request, navigation);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        addBankDetails(response?.data?.result!);
        return response.data?.result;
      }
      if (error !== null) {
        const errorList = error.errorList?.join("\n");
        setTimeout(() => {
          Alert.alert(error.message, errorList);
        }, 150);
      }
    }
    return undefined;
  };

  const handleCancelPrompt = () => {
    setDuplicatePrompt(false);
  };

  const handleConfirmPrompt = () => {
    setDuplicatePrompt(false);
    handleNavigation();
  };

  const handleConfirmIdentity = async () => {
    if (transactionType === "Sales") {
      setLoader(true);
      const allBanks: IGetAllBanksResult | undefined = await handleCheckBanks();
      const submitTransactionResponse = await handleSetupClient();
      setLoader(false);
      if (submitTransactionResponse === undefined) {
        handleNavigation(allBanks);
      }
    } else {
      await handleCheckAccounts();
    }
  };

  const recurringContentOptions = [INVESTMENT.LABEL_RECURRING_CONTENT_1, INVESTMENT.LABEL_RECURRING_CONTENT_2];

  const disableContinue = investmentDetails?.find(({ investment, isNewFund }) => {
    return (
      (isNewFund === true && investment.investmentAmount === "") ||
      (isNewFund === false && investment.isTopup === true && investment.investmentAmount === "") ||
      (isNewFund === true && investment.investmentSalesCharge === "") ||
      (isNewFund === false && investment.isTopup === true && investment.investmentSalesCharge === "") ||
      (isNewFund === false && investment.scheduledInvestment === false && investment.isTopup === false) ||
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
      handleNextStep(checkAMP);
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
      const checkEpf = isEpf === true ? "EPF" : "Cash";
      const checkNewFundPurchase = isEpf !== undefined ? checkEpf : eachDetails.investment.fundPaymentMethod;
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
  const checkRecurring = investmentDetails
    ?.map((eachInvestment: IProductSales) => eachInvestment.investment.scheduledInvestment)
    .includes(true);
  const checkHeading = accountNo !== "" ? INVESTMENT.HEADING_NEW_SALES : INVESTMENT.HEADING;

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
                <TextSpaceArea text={checkHeading} style={fs18BoldGray6} spaceToBottom={sh4} spaceToTop={sh40} />
                <View style={rowCenterVertical}>
                  <TextSpaceArea text={INVESTMENT.SUBHEADING} style={fs14RegGray5} />
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  {multiUtmc === false && transactionType === "Sales-AO" ? (
                    <CustomTooltip
                      arrowSize={{ width: sw10, height: sh6 }}
                      content={<Text style={fs12RegWhite1}>{INVESTMENT.LABEL_MULTIPLE_UTMC}</Text>}
                      contentStyle={{ width: sw240 }}
                      theme="dark"
                    />
                  ) : null}
                </View>
                <CustomSpacer space={sh24} />
              </View>
            }
            ListFooterComponent={
              <Fragment>
                {checkRecurring === true ? (
                  <Fragment>
                    <CustomSpacer space={sh24} />
                    <View style={{ ...border(colorBlue._9, sw1, sw8), ...px(sw24), ...py(sh16), marginLeft: sw8, marginRight: sw8 }}>
                      <View style={flexRow}>
                        <View style={{ ...centerHV, height: sh20 }}>
                          <View style={{ width: sw14, height: sw14, ...centerHV, borderRadius: sw100, backgroundColor: colorBlue._1 }}>
                            <Text style={{ fontSize: sh11, color: colorWhite._1 }}>i</Text>
                          </View>
                        </View>
                        <CustomSpacer isHorizontal={true} space={sw8} />
                        <View>
                          <Text style={fs14BoldBlack2}>{INVESTMENT.LABEL_RECURRING_CONTENT_TITLE}</Text>
                          <CustomSpacer space={sh4} />
                          {recurringContentOptions.map((eachContent: string, eachIndex: number) => {
                            return (
                              <View key={eachIndex} style={{ ...flexRow, maxWidth: sw760 }}>
                                <CustomSpacer isHorizontal={true} space={sw4} />
                                <Text style={fs12RegGray5}>{eachIndex + 1}. </Text>
                                <Text style={fs12RegGray5}>{eachContent} </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </Fragment>
                ) : null}
                <CustomSpacer space={sh120} />
              </Fragment>
            }
            ref={flatListRef}
            renderItem={({ item, index }) => {
              const { fundName, fundType, issuingHouse } = item.fundDetails;
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
                        <Text style={fs14BoldBlack2}>{item.fundDetails.issuingHouse}</Text>
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
                        {fundType.toLowerCase() === "amp" && accountNo !== "" ? null : (
                          <IcoMoon name="trash" color={colorBlue._1} onPress={handleDelete} size={sw24} suppressHighlighting={true} />
                        )}
                      </View>
                    </View>
                    <CustomSpacer space={sh16} />
                    <Investment
                      accountDetails={accountDetails}
                      accountType={accountType!}
                      agentCategory={agentCategory!.category!}
                      data={item}
                      handleScrollToFund={handleScrollToFund}
                      setData={updateData}
                      transactionType={transactionType}
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
          <ProductsBanner
            cancelOnPress={handleBackToListing}
            continueDisabled={disableContinue !== undefined}
            selectedFunds={selectedFunds}
            labelSubmit={INVESTMENT.BUTTON_NEXT}
            submitOnPress={handleConfirmIdentity}
            label={INVESTMENT.LABEL_SUMMARY}
          />
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
      <BasicModal backdropOpacity={0.65} visible={duplicatePrompt || loader}>
        {loader === true ? (
          <View style={{ ...centerHV, ...fullHW }}>
            <Loading color={colorWhite._1} />
          </View>
        ) : (
          <View style={{ ...centerHV, ...fullHW }}>
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
                <View style={{ maxHeight: sh240 }}>
                  <ScrollView bounces={false} contentContainerStyle={flexGrow} showsVerticalScrollIndicator={false}>
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
                  </ScrollView>
                </View>
              </View>
            </NewPrompt>
          </View>
        )}
      </BasicModal>
    </Fragment>
  );
};

export const ProductConfirmation = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(ProductConfirmationComponent);
