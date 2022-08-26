import moment from "moment";
import React, { Fragment, useRef, useState } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

import { ActionButtons, CustomSpacer, RNModal } from "../../../../components";
import { DATE_OF_BIRTH_FORMAT, DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import {
  DICTIONARY_COUNTRIES,
  DICTIONARY_ID_OTHER_TYPE,
  DICTIONARY_ID_TYPE,
  DICTIONARY_PLACE_OF_BIRTH,
  ERROR_CODE,
} from "../../../../data/dictionary";
import { checkClient, clientRegister } from "../../../../network-actions";
import { ClientMapDispatchToProps, ClientMapStateToProps, ClientStoreProps } from "../../../../store";
import {
  centerHV,
  colorBlue,
  colorWhite,
  flexGrow,
  flexRowCC,
  fs24BoldBlue1,
  fs36BoldBlack2,
  fullHW,
  px,
  sh48,
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
  navigation: IStackNavigationProp;
  setPage?: (page: DashboardPageType) => void;
  setVisible: (visibility: boolean) => void;
  visible: boolean;
}

const NewSalesComponent = ({
  accountType,
  addAccountType,
  addClientDetails,
  addClientForceUpdate,
  addJointInfo,
  addPersonalInfo,
  addPrincipalInfo,
  client,
  details,
  navigation,
  personalInfo,
  resetClientDetails,
  setPage,
  setVisible,
  showOpenAccount,
  updateClient,
  updateShowOpenAccount,
  updateTransactionType,
  visible,
}: NewSalesProps) => {
  const fetching = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [clientType, setClientType] = useState<TypeClient | "">("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [ageErrorMessage, setAgeErrorMessage] = useState<string | undefined>(undefined);
  const [inputError1, setInputError1] = useState<string | undefined>(undefined);
  const [registered, setRegistered] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<TypeNewSalesPrompt>(undefined);
  const [holderToFill, setHolderToFill] = useState<"principalHolder" | "jointHolder">("principalHolder");
  const { jointHolder, principalHolder } = details!;
  const { dateOfBirth, id, idType, name, country } = details![holderToFill]!;

  const BUTTON_LABEL_UNREGISTERED = clientType !== "" ? ADD_CLIENT.BUTTON_PROCEED : ADD_CLIENT.BUTTON_STARTED;
  const BUTTON_CONTINUE_PROMPT = prompt === "bannedCountry" ? ADD_CLIENT.BUTTON_BACK : ADD_CLIENT.BUTTON_ADD;
  const BUTTON_LABEL_PROMPT = prompt !== undefined ? BUTTON_CONTINUE_PROMPT : BUTTON_LABEL_UNREGISTERED;
  const BUTTON_LABEL = registered === true ? ADD_CLIENT.BUTTON_CONFIRM : BUTTON_LABEL_PROMPT;
  const jointIdType = jointHolder?.idType === "Other" ? jointHolder?.otherIdType : jointHolder?.idType;
  const principalIdType = principalHolder?.idType === "Other" ? principalHolder?.otherIdType : principalHolder?.idType;
  const titleStyle: TextStyle = registered === true ? {} : fs36BoldBlack2;

  const setClientInfo = (info: IClientBasicInfo) =>
    holderToFill === "principalHolder" ? addPrincipalInfo({ ...principalHolder, ...info }) : addJointInfo({ ...jointHolder, ...info });
  const setAccountType = (type: string) => addAccountType(type as TypeAccountChoices);

  let continueDisabled = true;

  switch (idType) {
    case "NRIC":
      continueDisabled = name === "" || id === "" || inputError1 !== undefined;
      break;
    case "Passport":
      continueDisabled = name === "" || id === "" || dateOfBirth === "" || inputError1 !== undefined || country === "";
      break;
    case "Other":
      continueDisabled = name === "" || id === "" || inputError1 !== undefined || dateOfBirth === "";
      break;
    default:
      continueDisabled = name === "" || id === "" || inputError1 !== undefined;
      break;
  }

  const handleReset = () => {
    setClientType("");
    setHolderToFill("principalHolder");
    setInputError1(undefined);
    setAgeErrorMessage(undefined);
    setErrorMessage(undefined);
    resetClientDetails();
    if (showOpenAccount === true) {
      updateShowOpenAccount(false);
    }
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
    const principalClientIdType = principalHolder?.idType === "Other" ? principalHolder.otherIdType : principalIdType;
    const jointClientIdType = jointHolder?.idType === "Other" ? jointHolder.otherIdType : jointIdType;
    const principalFilteredPlace = DICTIONARY_PLACE_OF_BIRTH.filter((code) => code.code === principalHolder?.id!.substr(6, 2));
    const jointFilteredPlace = DICTIONARY_PLACE_OF_BIRTH.filter((code) => code.code === jointHolder?.id!.substr(6, 2));
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
              name: jointHolder?.name!.trim(),
              nationality: jointHolder?.idType === "Passport" ? "" : DICTIONARY_COUNTRIES[0].value,
              placeOfBirth: jointPlaceOfBirth,
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
          placeOfBirth: principalPlaceOfBirth,
        },
      },
      joint: jointDetails,
    });
    setVisible(false);
    navigation.navigate("Onboarding");
  };

  const handleCheckClient = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const request: IEtbCheckRequest = {
        country: principalHolder?.country,
        dateOfBirth:
          principalHolder?.dateOfBirth && principalHolder.idType !== "NRIC"
            ? moment(principalHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT)
            : "",
        id: principalHolder?.id,
        idType: principalIdType,
        name: principalHolder?.name?.trim(),
      };
      const clientCheck: IEtbCheckResponse = await checkClient(request, navigation, setLoading);
      setLoading(false);
      fetching.current = false;
      if (clientCheck !== undefined) {
        const { data, error } = clientCheck;
        if (error === null && data !== null) {
          setAgeErrorMessage(undefined);
          setErrorMessage(undefined);
          setInputError1(undefined);
          if (data.result.message === "NTB") {
            return setClientType("NTB");
          }
          if (data.result.message === "ETB" && setPage !== undefined) {
            setClientType("ETB");
            setVisible(false);
            if (data.result.forceUpdate === false) {
              updateClient({
                ...client,
                accountList: data.result.accounts!,
                details: {
                  ...client.details,
                  principalHolder: {
                    ...client.details?.principalHolder,
                    name: principalHolder!.name!.trim(),
                    id: principalHolder?.id,
                  },
                },
              });
              if (client.isNewFundPurchase === true) {
                addPersonalInfo({
                  ...personalInfo,
                  principal: {
                    ...personalInfo.principal,
                    contactDetails: {
                      ...personalInfo.principal?.contactDetails,
                      emailAddress: data.result.emailAddress,
                    },
                  },
                });
                updateTransactionType("Sales-NS");
                return navigation.navigate("NewSales");
              }
              updateTransactionType("Sales-AO");
              return setPage("Investors");
            }
            if (data.result.forceUpdate === true) {
              addClientForceUpdate(true);
              return setPage("Investors");
            }
          }
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
    }
    return undefined;
  };

  const handleClientRegister = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const principalDob =
        principalHolder?.dateOfBirth && principalHolder.idType !== "NRIC"
          ? { dateOfBirth: moment(principalHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) }
          : {};
      const jointDob =
        jointHolder?.dateOfBirth && jointHolder.idType !== "NRIC"
          ? { dateOfBirth: moment(jointHolder?.dateOfBirth, DEFAULT_DATE_FORMAT).format(DATE_OF_BIRTH_FORMAT) }
          : {};
      const jointInfo =
        accountType === "Individual"
          ? undefined
          : {
              ...jointDob,
              id: jointHolder?.id!,
              idType: jointIdType,
              name: jointHolder?.name!,
            };
      const request: IClientRegisterRequest = {
        accountType: accountType,
        isEtb: false,
        isNewFundPurchased: false,
        principalHolder: {
          ...principalDob,
          id: principalHolder?.id!,
          idType: principalIdType,
          name: principalHolder?.name!,
        },
        jointHolder: jointInfo,
      };
      const clientResponse: IClientRegisterResponse = await clientRegister(request, navigation, setLoading);
      setLoading(false);
      fetching.current = false;
      if (clientResponse !== undefined) {
        const { data, error } = clientResponse;
        if (error === null && data !== null) {
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
          const moreJointInfo =
            data.result.jointHolder !== undefined && data.result.jointHolder !== null
              ? {
                  clientId: data.result.jointHolder.clientId,
                  dateOfBirth: data.result.jointHolder.dateOfBirth,
                  id: data.result.jointHolder.id,
                  name: data.result.jointHolder.name,
                }
              : {};
          setAgeErrorMessage(undefined);
          setErrorMessage(undefined);
          setInputError1(undefined);
          addClientDetails({
            ...details,
            principalHolder: {
              ...principalHolder,
              dateOfBirth: data.result.principalHolder.dateOfBirth,
              clientId: data.result.principalHolder.clientId,
            },
            jointHolder: resetJointInfo === true ? { ...initialJointInfo } : { ...jointHolder, ...moreJointInfo },
            initId: `${data.result.initId}`,
          });
          return setRegistered(true);
        }
        if (
          error !== null &&
          principalIdType !== "NRIC" &&
          (error.errorCode === ERROR_CODE.clientAgeMinimum || error.errorCode === ERROR_CODE.clientAgeMaximum)
        ) {
          setAgeErrorMessage(error?.message);
        } else {
          setErrorMessage(error?.message);
        }
      }
    }
    return undefined;
  };

  const handleContinue = () => {
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
    backgroundColor: colorBlue._2,
    borderRadius: sw5,
    width: sw565,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw10,
    borderBottomRightRadius: sw10,
    height: sh96,
  };

  return (
    <RNModal animationType="fade" visible={visible}>
      <KeyboardAwareScrollView bounces={false} extraHeight={8} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
        <View style={{ ...centerHV, ...fullHW }}>
          <View style={modalContainer}>
            {prompt !== undefined ? (
              <NewSalesPrompt id={id!} idType={principalIdType} name={name!} prompt={prompt} />
            ) : (
              <View style={px(sw56)}>
                <CustomSpacer space={registered === true ? sh56 : sh48} />
                {registered === false ? (
                  <Fragment>
                    <Text style={{ ...fs24BoldBlue1, ...titleStyle }}>{ADD_CLIENT.HEADING}</Text>
                    <NewSalesDetails
                      accountType={accountType}
                      clientInfo={details![holderToFill]!}
                      clientType={clientType}
                      ageErrorMessage={ageErrorMessage}
                      errorMessage={errorMessage}
                      holderToFill={holderToFill}
                      inputError1={inputError1}
                      setAccountType={setAccountType}
                      setClientInfo={setClientInfo}
                      setAgeErrorMessage={setAgeErrorMessage}
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
              continueLoading={loading}
              continueDisabled={continueDisabled}
              handleCancel={prompt === "bannedCountry" ? undefined : handleCancel}
              handleContinue={handleContinue}
              labelContinue={BUTTON_LABEL}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </RNModal>
  );
};

export const NewSales = connect(ClientMapStateToProps, ClientMapDispatchToProps)(NewSalesComponent);
