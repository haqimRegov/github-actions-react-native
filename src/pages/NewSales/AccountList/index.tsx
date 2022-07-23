import React, { Fragment, FunctionComponent, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, LabeledTitle, Loading, RNModal } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE } from "../../../data/dictionary";
import { getProductTabType } from "../../../helpers";
import { clientRegister } from "../../../network-actions";
import { NewSalesMapDispatchToProps, NewSalesMapStateToProps, NewSalesStoreProps, productsInitialFilter } from "../../../store";
import {
  centerHV,
  colorBlack,
  colorWhite,
  flexRow,
  flexWrap,
  fs16RegGray5,
  fs18BoldGray6,
  fullHW,
  px,
  sh24,
  sh4,
  sw24,
} from "../../../styles";
import { AccountCard } from "../../../templates/Cards";
import { isNotEmpty } from "../../../utils";
import { defaultContentProps } from "../Content";

const { ACCOUNT_LIST } = Language.PAGE;

declare interface IAccountListProps extends NewSalesContentProps, NewSalesStoreProps {
  navigation: IStackNavigationProp;
  route: string;
}

const AccountListComponent: FunctionComponent<IAccountListProps> = ({
  // addRiskInfo,
  addAccountType,
  addClientDetails,
  addRiskScore,
  addUtFilters,
  client,
  handleNextStep,
  navigation,
  newSales,
  riskScore,
  updateNewSales,
  updateProductType,
}: IAccountListProps) => {
  const { disabledSteps, finishedSteps } = newSales;
  const { accountList, accountType, details } = client;
  const { principalHolder, jointHolder } = details!;
  const [loading, setLoading] = useState<boolean>(false);

  const handleClientRegister = async (eachAccount: IAccountList) => {
    if (loading === false) {
      setLoading(true);
      const request: IClientRegisterRequest = {
        accountNo: eachAccount.accountNo,
        accountType: accountType,
        isEtb: true,
        isNewFundPurchased: true,
        principalHolder: {
          id: principalHolder?.id!,
          name: principalHolder?.name!,
        },
      };
      const clientResponse: IClientRegisterResponse = await clientRegister(request, navigation);
      setLoading(false);
      if (clientResponse !== undefined) {
        const { data, error } = clientResponse;
        if (error === null && data !== null) {
          let riskInfo: IRiskProfile | undefined;
          if (data.result.riskInfo !== undefined && data.result.riskInfo !== null) {
            riskInfo = data.result.riskInfo;
            addRiskScore({
              ...riskScore,
              appetite: data.result.riskInfo.appetite,
              rangeOfReturn: data.result.riskInfo.expectedRange,
              profile: data.result.riskInfo.profile,
              type: data.result.riskInfo.type,
              fundSuggestion: "",
              netWorth: "",
            });
          }
          const resetJointInfo =
            accountType === "Individual" &&
            (jointHolder?.name !== "" || jointHolder?.country !== "" || jointHolder?.dateOfBirth !== "" || jointHolder?.id !== "");
          const initialJointInfo = {
            name: "",
            country: "",
            dateOfBirth: "",
            id: "",
            idType: DICTIONARY_ID_TYPE[0],
            otherIdType: DICTIONARY_ID_OTHER_TYPE[0].value,
          };
          const moreJointInfo = isNotEmpty(data.result.jointHolder)
            ? {
                clientId: data.result.jointHolder!.clientId,
                dateOfBirth: data.result.jointHolder!.dateOfBirth,
                id: data.result.jointHolder!.id,
                name: data.result.jointHolder!.name,
              }
            : {};
          addClientDetails({
            ...details,
            principalHolder: {
              ...principalHolder,
              clientId: data.result.principalHolder.clientId,
              dateOfBirth: data.result.principalHolder.dateOfBirth,
              id: data.result.principalHolder.id,
              name: data.result.principalHolder.name,
            },
            jointHolder: resetJointInfo === true ? { ...initialJointInfo } : { ...jointHolder, ...moreJointInfo },
            initId: `${data.result.initId}`,
          });
          addAccountType(data.result.jointHolder !== null ? "Joint" : "Individual");
          const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];
          const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];
          updatedFinishedSteps.push("AccountList");
          const findAccountList = disabledSteps.indexOf("AccountList");
          if (findAccountList !== -1) {
            updatedDisabledSteps.splice(findAccountList, 1);
          }
          const findRisk = disabledSteps.indexOf("RiskProfile");
          if (findRisk !== -1) {
            updatedDisabledSteps.splice(findRisk, 1);
          }
          if (eachAccount.fundType === "UT" && eachAccount.paymentMethod === "EPF") {
            const epfFilterArray: string[] = eachAccount.paymentMethod === "EPF" ? ["Yes"] : [];
            addUtFilters({ ...productsInitialFilter, epfApproved: epfFilterArray });
            updateProductType(getProductTabType(eachAccount.fundType));
          }
          updateNewSales({
            ...newSales,
            finishedSteps: updatedFinishedSteps,
            disabledSteps: updatedDisabledSteps,
            investorProfile: {
              ...newSales.investorProfile,
              principalClientId: data.result.principalHolder!.clientId,
              jointClientId: data.result.jointHolder !== null ? data.result.jointHolder!.clientId : undefined,
            },
            riskInfo: riskInfo,
            accountDetails: {
              ...newSales.accountDetails,
              accountNo: eachAccount.accountNo,
              fundType: getProductTabType(eachAccount.fundType),
              isEpf: eachAccount.paymentMethod.toLowerCase() === "epf",
              isRecurring: eachAccount.isRecurring,
            },
          });
          handleNextStep("RiskProfile");
        } else if (error !== undefined) {
          Alert.alert(error?.message);
        }
      }
    }
  };

  const header = `${ACCOUNT_LIST.LABEL_WELCOME_BACK} ${client.details?.principalHolder?.name}`;
  const modalStyle = loading === false ? undefined : { backgroundColor: colorBlack._1_4 };
  return (
    <View>
      <ContentPage {...defaultContentProps} subheading={header}>
        <Fragment>
          <CustomSpacer space={sh24} />
          <View style={px(sw24)}>
            <LabeledTitle
              label={ACCOUNT_LIST.LABEL_HEADING}
              labelStyle={fs18BoldGray6}
              spaceToLabel={sh4}
              title={ACCOUNT_LIST.LABEL_SUBHEADING}
              titleStyle={fs16RegGray5}
            />
            <CustomSpacer space={sh24} />
            <View style={{ ...flexRow, ...flexWrap }}>
              {accountList.map((eachAccount: IAccountList, index: number) => {
                const handleSelectAccount = async () => {
                  await handleClientRegister(eachAccount);
                };
                return (
                  <Fragment key={index}>
                    {index % 2 !== 0 ? <CustomSpacer isHorizontal={true} space={sw24} /> : null}
                    <AccountCard data={eachAccount} handlePress={handleSelectAccount} />
                  </Fragment>
                );
              })}
            </View>
          </View>
        </Fragment>
      </ContentPage>
      <RNModal animationType="fade" style={modalStyle} visible={loading}>
        <View style={{ ...centerHV, ...fullHW }}>
          <Loading color={colorWhite._1} />
        </View>
      </RNModal>
    </View>
  );
};

export const AccountList = connect(NewSalesMapStateToProps, NewSalesMapDispatchToProps)(AccountListComponent);
