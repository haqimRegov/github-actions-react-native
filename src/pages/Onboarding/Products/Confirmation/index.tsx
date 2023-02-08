import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, Text, View, ViewStyle } from "react-native";

import {
  ConfirmationModal,
  CustomFlexSpacer,
  CustomSpacer,
  CustomToast,
  defaultContentProps,
  LabeledTitle,
  SafeAreaPage,
} from "../../../../components";
import { Language } from "../../../../constants";
import { useDelete } from "../../../../hooks";
import { IcoMoon } from "../../../../icons";
import {
  borderBottomBlue4,
  centerVertical,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  fs10BoldGray6,
  fs16BoldBlack2,
  fs16RegGray5,
  fs16RegGray6,
  fs18BoldGray6,
  fs24BoldGray6,
  px,
  sh120,
  sh16,
  sh24,
  sh32,
  sh4,
  sh40,
  shadow4Blue116,
  sw16,
  sw24,
  sw8,
} from "../../../../styles";
import { Investment } from "./Investment";

const { ACTION_BUTTONS, INVESTMENT } = Language.PAGE;

export interface ProductConfirmationProps {
  accountType: TypeAccountChoices;
  agentCategory: TypeAgentCategory;
  investmentDetails: IProductSales[];
  multiUtmc?: boolean;
  selectedFunds: IProduct[];
  setFixedBottomShow: (toggle: boolean) => void;
  setInvestmentDetails: (fundSales: IProductSales[]) => void;
  setPage: (page: number) => void;
  setSelectedFund: (fund: IProduct[]) => void;
  withEpf: boolean;
}

export const ProductConfirmation: FunctionComponent<ProductConfirmationProps> = ({
  accountType,
  agentCategory,
  investmentDetails,
  multiUtmc,
  setFixedBottomShow,
  setInvestmentDetails,
  setPage,
  setSelectedFund,
  withEpf,
}: ProductConfirmationProps) => {
  const flatListRef = useRef<FlatList | null>(null);
  const [deleteCount, setDeleteCount, tempData, setTempData] = useDelete<IProductSales[]>(investmentDetails, setInvestmentDetails);
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleScrollToFund = () => {
    const findIndex = investmentDetails.findIndex(
      (eachInvestment: IProductSales) => eachInvestment.allowEpf === true && eachInvestment.investment.fundPaymentMethod === "EPF",
    );
    if (flatListRef.current !== null && findIndex !== -1) {
      flatListRef.current?.scrollToIndex({ animated: true, index: findIndex, viewPosition: 0 });
    }
  };

  const handleUndoDelete = () => {
    const updatedProducts = investmentDetails.map((eachInvestment: IProductSales) => eachInvestment.fundDetails);
    setSelectedFund(updatedProducts);
    setTempData(investmentDetails);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleDeleteLastFund = () => {
    setSelectedFund([]);
    setInvestmentDetails([]);
    setPage(0);
  };

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
    const updatedProducts = investmentDetails.map((eachInvestment: IProductSales) => eachInvestment.fundDetails);
    setSelectedFund(updatedProducts);
    setTempData(investmentDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investmentDetails]);

  useEffect(() => {
    const findEpfIndex = investmentDetails.findIndex(
      (eachNewInvestment: IProductSales) => eachNewInvestment.investment.fundPaymentMethod === "EPF",
    );
    const updatedInvestmentDetails: IProductSales[] = investmentDetails.map((eachDetails: IProductSales) => {
      const checkData =
        findEpfIndex !== -1 ? eachDetails.fundDetails.issuingHouse === investmentDetails[findEpfIndex].fundDetails.issuingHouse : true;
      const checkMultipleUtmc = multiUtmc === true && eachDetails.fundDetails.isEpf ? true : checkData;
      const checkFundPaymentMethod = checkMultipleUtmc === false ? "Cash" : eachDetails.investment.fundPaymentMethod;
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
    <SafeAreaPage>
      <View style={px(sw16)}>
        <FlatList
          data={tempData}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item: IProductSales) => item.fundDetails.fundCode}
          ListHeaderComponent={
            <Fragment>
              <View style={px(sw8)}>
                <CustomSpacer space={defaultContentProps.spaceToTop!} />
                <LabeledTitle
                  label={INVESTMENT.HEADING}
                  labelStyle={fs18BoldGray6}
                  spaceToLabel={sh4}
                  title={INVESTMENT.SUBHEADING}
                  titleStyle={fs16RegGray5}
                />
                {multiUtmc === false ? <Text style={fs16RegGray5}>{INVESTMENT.LABEL_MULTIPLE_UTMC}</Text> : null}
                <CustomSpacer space={sh24} />
              </View>
            </Fragment>
          }
          ListFooterComponent={<CustomSpacer space={sh120} />}
          ref={flatListRef}
          renderItem={({ item, index }) => {
            const { fundType, fundName, issuingHouse, prsType } = item.fundDetails;
            const type = prsType === "prsDefault" ? "PRS DEFAULT" : fundType;
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
                const findEpfIndex = newData.findIndex((eachNewData: IProductSales) => eachNewData.investment.fundPaymentMethod === "EPF");
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

            const checkIndex = investmentDetails.findIndex(
              (eachInvestment: IProductSales) => eachInvestment.fundDetails.issuingHouse === issuingHouse,
            );

            const container: ViewStyle = {
              ...flexChild,
              ...shadow4Blue116,
              backgroundColor: colorWhite._1,
              borderRadius: sw8,
              marginHorizontal: sw8,
            };

            return (
              <Fragment key={index}>
                {index === 0 ? null : <CustomSpacer space={sh24} />}
                {index <= checkIndex ? (
                  <Fragment>
                    {index !== 0 ? <CustomSpacer space={sh40} /> : null}
                    <View style={{ ...flexRow, ...centerVertical, ...px(sw8) }}>
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
                  <View style={{ ...px(sw24), backgroundColor: colorBlue._3, borderTopLeftRadius: sw8, borderTopRightRadius: sw8 }}>
                    <CustomSpacer space={sh16} />
                    <View style={{ ...centerVertical, ...flexRow }}>
                      <View>
                        <Text style={fs10BoldGray6}>{type}</Text>
                        <CustomSpacer space={sh4} />
                        <Text style={fs24BoldGray6}>{fundName}</Text>
                      </View>
                      <CustomFlexSpacer />
                      <IcoMoon name="trash" color={colorBlue._1} onPress={handleDelete} size={sh32} suppressHighlighting={true} />
                    </View>
                    <CustomSpacer space={sh16} />
                  </View>
                  <CustomSpacer space={sh24} />
                  <Investment
                    accountType={accountType}
                    agentCategory={agentCategory}
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
    </SafeAreaPage>
  );
};
