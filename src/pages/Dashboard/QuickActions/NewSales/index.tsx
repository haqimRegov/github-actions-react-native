import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { Alert, Text, TextStyle, View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

import { ActionButtons, CustomSpacer, RNModal } from "../../../../components";
import { DATE_OF_BIRTH_FORMAT, DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_PLACE_OF_BIRTH, ERROR_CODE } from "../../../../data/dictionary";
import { checkClient, clientRegister } from "../../../../network-actions";
import { ClientMapDispatchToProps, ClientMapStateToProps, ClientStoreProps } from "../../../../store";
import {
  centerHV,
  colorWhite,
  flexGrow,
  flexRowCC,
  fs24BoldBlack1,
  fs40BoldBlack2,
  fullHW,
  px,
  sh40,
  sh56,
  sh96,
  sw10,
  sw218,
  sw5,
  sw56,
  sw565,
} from "../../../../styles";
import { NewSalesDetails } from "./Details";
import { NewSalesPrompt } from "./Prompt";
import { NewSalesSummary } from "./Summary";

const { ADD_CLIENT } = Language.PAGE;

interface NewSalesProps extends ClientStoreProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  setVisible: (visibility: boolean) => void;
  visible: boolean;
}

const NewSalesComponent = ({
  accountType,
  addAccountType,
  addClientDetails,
  addJointInfo,
  addPersonalInfo,
  addPrincipalInfo,
  agent,
  details,
  navigation,
  personalInfo,
  resetClientDetails,
  setVisible,
  visible,
}: NewSalesProps) => {
  const [clientType, setClientType] = useState<TypeClient | "">("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [inputError1, setInputError1] = useState<string | undefined>(undefined);
  const [registered, setRegistered] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<TypeNewSalesPrompt>(undefined);
  const [holderToFill, setHolderToFill] = useState<"principalHolder" | "jointHolder">("principalHolder");
  const { jointHolder, principalHolder } = details!;
  const { dateOfBirth, id, idType, name } = details![holderToFill]!;

  const BUTTON_LABEL_UNREGISTERED = clientType !== "" ? ADD_CLIENT.BUTTON_PROCEED : ADD_CLIENT.BUTTON_STARTED;
  const BUTTON_COUNTRY_PROMPT = prompt === "highRisk" ? "Continue to New Sales" : "Back to Dashboard";
  const BUTTON_CONTINUE_PROMPT = prompt === "highRisk" || prompt === "bannedCountry" ? BUTTON_COUNTRY_PROMPT : ADD_CLIENT.BUTTON_ADD;
  const BUTTON_LABEL_PROMPT = prompt !== undefined ? BUTTON_CONTINUE_PROMPT : BUTTON_LABEL_UNREGISTERED;
  const BUTTON_LABEL = registered === true ? ADD_CLIENT.BUTTON_CONFIRM : BUTTON_LABEL_PROMPT;
  const jointIdType = jointHolder?.idType === "Other" ? jointHolder?.otherIdType : jointHolder?.idType;
  const principalIdType = principalHolder?.idType === "Other" ? principalHolder?.otherIdType : principalHolder?.idType;
  const titleStyle: TextStyle = registered === true ? {} : { ...fs40BoldBlack2, lineHeight: sh40 };

  const setClientInfo = (info: IClientBasicInfo) =>
    holderToFill === "principalHolder" ? addPrincipalInfo({ ...principalHolder, ...info }) : addJointInfo({ ...jointHolder, ...info });
  const setAccountType = (type: string) => addAccountType(type as TypeAccountChoices);

  const continueDisabled =
    idType === "NRIC"
      ? name === "" || id === "" || inputError1 !== undefined
      : name === "" || id === "" || dateOfBirth === undefined || inputError1 !== undefined;

  const handleReset = () => {
    setClientType("");
    setHolderToFill("principalHolder");
    setInputError1(undefined);
    setErrorMessage(undefined);
    resetClientDetails();
    setPrompt(undefined);
  };

  const handleCancelNewSales = () => {
    setVisible(false);
    handleReset();
  };

  const handleCancel = () => {
    if (prompt !== undefined) {
      handleCancelNewSales();
    } else if (registered === true) {
      setRegistered(false);
    } else if (clientType !== "" && holderToFill === "jointHolder") {
      setHolderToFill("principalHolder");
    } else if (clientType !== "" && holderToFill === "principalHolder") {
      setClientType("");
      addAccountType("Individual");
    } else {
      handleCancelNewSales();
    }
  };

  const handleNavigation = () => {
    const principalClientIdType = principalHolder?.idType === "Other" ? principalHolder!.otherIdType : principalIdType;
    const jointClientIdType = jointHolder?.idType === "Other" ? jointHolder!.otherIdType : jointIdType;
    const principalFilteredPlace = DICTIONARY_PLACE_OF_BIRTH.filter((code) => code.code === principalHolder?.id!.substr(7, 2));
    const jointFilteredPlace = DICTIONARY_PLACE_OF_BIRTH.filter((code) => code.code === jointHolder?.id!.substr(7, 2));
    const principalPlaceOfBirth =
      principalHolder?.idType === "NRIC" && principalFilteredPlace.length !== 0 ? principalFilteredPlace[0].location : "";
    const jointPlaceOfBirth =
      accountType === "Joint" && jointHolder?.idType === "NRIC" && jointFilteredPlace.length !== 0 ? jointFilteredPlace[0].location : "";
    const jointDetails =
      accountType === "Individual"
        ? { ...personalInfo.joint! }
        : {
            ...personalInfo.joint,
            personalDetails: {
              ...personalInfo.joint?.personalDetails,
              countryOfBirth: jointHolder?.idType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
              dateOfBirth: moment(jointHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
              expirationDate: undefined,
              idNumber: jointHolder?.id,
              idType: jointClientIdType,
              name: jointHolder?.name,
              nationality: jointHolder?.idType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
              placeOfBirth: principalPlaceOfBirth,
            },
          };
    addPersonalInfo({
      ...personalInfo,
      principal: {
        ...personalInfo.principal,
        personalDetails: {
          ...personalInfo.principal?.personalDetails,
          countryOfBirth: principalHolder?.idType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
          dateOfBirth: moment(principalHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
          expirationDate: undefined,
          idNumber: principalHolder?.id,
          idType: principalClientIdType,
          name: principalHolder?.name,
          nationality: principalHolder?.idType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
          placeOfBirth: jointPlaceOfBirth,
        },
      },
      joint: jointDetails,
    });
    setVisible(false);
    navigation.navigate("Onboarding");
  };

  const handleCheckClient = async () => {
    const req = {
      agentId: agent?.id!,
      principalHolder: {
        country: principalHolder?.country,
        dateOfBirth: principalHolder?.dateOfBirth,
        id: principalHolder?.id,
        idType: principalIdType,
        name: principalHolder?.name,
      },
    };
    // eslint-disable-next-line no-console
    console.log("etbCheck request", req);
    const clientCheck: IEtbCheckResponse = await checkClient(req);
    if (clientCheck !== undefined) {
      const { data, error } = clientCheck;
      if (error === null && data !== null) {
        setErrorMessage(undefined);
        setInputError1(undefined);
        if (data.result.message === "NTB") {
          if (data.result.highRisk === true) {
            return setPrompt("highRisk");
          }
          return setClientType("NTB");
        }
        setTimeout(() => {
          return Alert.alert("Client is ETB");
        }, 100);
      }
      if (error !== null) {
        if (error?.errorCode === ERROR_CODE.clientAgeMinimum) {
          return setPrompt("ageMinimum");
        }
        if (error?.errorCode === ERROR_CODE.clientAgeMaximum) {
          return setPrompt("ageMaximum");
        }
        if (error?.errorCode === ERROR_CODE.clientBannedCountry) {
          return setPrompt("bannedCountry");
        }
        return setErrorMessage(error.message);
      }
    }
    return undefined;
  };

  const handleClientRegister = async () => {
    const jointInfo =
      accountType === "Individual"
        ? undefined
        : {
            dateOfBirth: jointHolder?.dateOfBirth!,
            id: jointHolder?.id!,
            idType: jointIdType,
            name: jointHolder?.name!,
          };
    const req: IClientRegisterRequest = {
      agentId: agent?.id!,
      accountType: accountType,
      principalHolder: {
        dateOfBirth: principalHolder?.dateOfBirth!,
        id: principalHolder?.id!,
        idType: principalIdType,
        name: principalHolder?.name!,
      },
      jointHolder: jointInfo,
    };
    // eslint-disable-next-line no-console
    console.log("clientRegister request", req);
    const client: IClientRegisterResponse = await clientRegister(req);
    if (client !== undefined) {
      const { data, error } = client;
      if (error === null && data !== null) {
        const moreJointInfo =
          data.result.jointHolder !== undefined && data.result.jointHolder !== null
            ? {
                dateOfBirth: moment(data.result.jointHolder.dateOfBirth, DATE_OF_BIRTH_FORMAT).format(DEFAULT_DATE_FORMAT),
                clientId: data.result.jointHolder.clientId,
              }
            : {};
        setErrorMessage(undefined);
        setInputError1(undefined);
        addClientDetails({
          ...details,
          principalHolder: {
            ...principalHolder,
            dateOfBirth: moment(data.result.principalHolder.dateOfBirth, DATE_OF_BIRTH_FORMAT).format(DEFAULT_DATE_FORMAT),
            clientId: data.result.principalHolder.clientId,
          },
          jointHolder: { ...jointHolder, ...moreJointInfo },
        });
        return setRegistered(true);
      }
      setErrorMessage(error?.message);
    }
    return undefined;
  };

  const handleContinue = () => {
    if (prompt === "highRisk") {
      setClientType("NTB");
      return setPrompt(undefined);
    }
    if (prompt === "bannedCountry") {
      return handleCancelNewSales();
    }
    if (prompt !== undefined) {
      return handleReset();
    }
    if (registered === true) {
      return handleNavigation();
    }

    if (clientType === "NTB") {
      if (accountType === "Joint" && holderToFill === "principalHolder") {
        return setHolderToFill("jointHolder");
      }
      return handleClientRegister();
    }
    return handleCheckClient();
  };

  const modalContainer: ViewStyle = {
    backgroundColor: colorWhite._4,
    borderRadius: sw5,
    width: sw565,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._2,
    borderBottomLeftRadius: sw10,
    borderBottomRightRadius: sw10,
    height: sh96,
  };

  return (
    <RNModal animationType="fade" visible={visible}>
      <KeyboardAwareScrollView bounces={false} contentContainerStyle={flexGrow}>
        <View style={{ ...centerHV, ...fullHW }}>
          <View style={modalContainer}>
            {prompt !== undefined ? (
              <NewSalesPrompt id={id!} idType={principalIdType} name={name!} prompt={prompt} />
            ) : (
              <View style={px(sw56)}>
                <CustomSpacer space={registered === true ? sh56 : sh40} />
                {registered === false ? (
                  <Fragment>
                    <Text style={{ ...fs24BoldBlack1, ...titleStyle }}>{ADD_CLIENT.HEADING}</Text>
                    <NewSalesDetails
                      accountType={accountType}
                      clientInfo={details![holderToFill]!}
                      clientType={clientType}
                      errorMessage={errorMessage}
                      holderToFill={holderToFill}
                      inputError1={inputError1}
                      setAccountType={setAccountType}
                      setClientInfo={setClientInfo}
                      setErrorMessage={setErrorMessage}
                      setInputError1={setInputError1}
                    />
                  </Fragment>
                ) : (
                  <NewSalesSummary accountType={accountType} jointHolder={jointHolder} principalHolder={principalHolder!} />
                )}
                <CustomSpacer space={sh56} />
              </View>
            )}
            <ActionButtons
              buttonContainerStyle={buttonContainer}
              cancelButtonStyle={{ width: sw218 }}
              continueButtonStyle={{ width: sw218 }}
              continueDisabled={continueDisabled}
              handleCancel={prompt === "bannedCountry" ? undefined : handleCancel}
              handleContinue={handleContinue}
              labelCancel={prompt === "highRisk" ? "Back to Dashboard" : undefined}
              labelContinue={BUTTON_LABEL}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </RNModal>
  );
};

export const NewSales = connect(ClientMapStateToProps, ClientMapDispatchToProps)(NewSalesComponent);
