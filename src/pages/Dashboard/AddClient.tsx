import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  ConfirmationModal,
  CustomDropdown,
  CustomSpacer,
  CustomTextInput,
  LabeledTitle,
  RadioButtonGroup,
  TextSpaceArea,
} from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE } from "../../data/dictionary";
import { verifyClient } from "../../network-actions";
import { ClientMapStateToProps, ClientStoreProps, ClintMapDispatchToProps } from "../../store";
import { fs16BoldBlack1, fs24BoldBlack2, fs40BoldBlack2, sh16, sh24, sh32, sh8, sw218, sw56 } from "../../styles";

const { ADD_CLIENT } = Language.PAGE;

interface AddClientProps extends ClientStoreProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  setVisible: (visibility: boolean) => void;
  visible: boolean;
}

const AddClientComponent = (props: AddClientProps) => {
  const { navigation, setVisible, visible } = props;
  const clientDetails = props.details;

  const [radioIDType, setRadioIDType] = useState<string>(DICTIONARY_ID_TYPE[0]);
  const [inputOtherIDType, setInputOtherIDType] = useState<string>(DICTIONARY_ID_OTHER_TYPE[0].value);
  const [inputClientName, setInputClientName] = useState<string>("");
  const [inputClientID, setInputClientID] = useState<string>("");
  const [inputClientDOB, setInputClientDOB] = useState<string>("");

  const handleCancel = () => {
    return clientDetails !== undefined ? props.resetClientDetails() : setVisible(false);
  };

  const handleContinue = () => {
    const selectedIDType = radioIDType === "Other" ? inputOtherIDType : radioIDType;
    const IDType = selectedIDType as TypeClientID;
    verifyClient(props, { id: inputClientID, idType: IDType, name: inputClientName });
    if (clientDetails !== undefined || radioIDType !== "NRIC") {
      setVisible(false);

      return navigation.navigate("Onboarding");
    }

    return false;
  };

  const ADD_CLIENT_HEADING = clientDetails !== undefined ? ADD_CLIENT.DETAILS_TITLE : ADD_CLIENT.HEADING;
  const BUTTON_LABEL = clientDetails !== undefined ? ADD_CLIENT.BUTTON_CONFIRM : ADD_CLIENT.BUTTON_STARTED;
  const LABEL_ID_DYNAMIC = radioIDType !== "Other" ? radioIDType : ADD_CLIENT.LABEL_ID;
  const LABEL_NAME = `${ADD_CLIENT.LABEL_NAME} ${LABEL_ID_DYNAMIC}`;
  const LABEL_ID = `${LABEL_ID_DYNAMIC} ${ADD_CLIENT.LABEL_NUMBER}`;
  const spaceToContent = clientDetails === undefined ? sh8 : sh32;
  const titleStyle = clientDetails !== undefined ? {} : fs40BoldBlack2;

  const continueDisabled =
    radioIDType === "NRIC"
      ? inputClientName === "" || inputClientID === ""
      : inputClientName === "" || inputClientID === "" || inputClientDOB === "";

  useEffect(() => {
    setInputClientName("");
    setInputClientID("");
    setInputClientDOB("");
  }, [radioIDType]);

  return (
    <ConfirmationModal
      cancelButtonStyle={{ width: sw218 }}
      continueButtonStyle={{ width: sw218 }}
      continueDisabled={continueDisabled}
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      labelContinue={BUTTON_LABEL}
      spaceToContent={spaceToContent}
      title={ADD_CLIENT_HEADING}
      titleStyle={titleStyle}
      visible={visible}>
      <Fragment>
        {clientDetails === undefined ? (
          <Fragment>
            <TextSpaceArea spaceToBottom={sh32} style={fs24BoldBlack2} text={ADD_CLIENT.SUBHEADING} />
            <TextSpaceArea spaceToBottom={sh16} text={ADD_CLIENT.LABEL_SELECT_ID_TYPE} />
            <RadioButtonGroup
              direction="row"
              labels={DICTIONARY_ID_TYPE}
              selected={radioIDType}
              setSelected={setRadioIDType}
              space={sw56}
            />
            {radioIDType !== "Other" ? null : (
              <Fragment>
                <CustomSpacer space={sh32} />
                <CustomDropdown
                  data={DICTIONARY_ID_OTHER_TYPE}
                  handleChange={setInputOtherIDType}
                  label={ADD_CLIENT.LABEL_ID_TYPE}
                  value={inputOtherIDType}
                />
              </Fragment>
            )}
            <CustomTextInput label={LABEL_NAME} onChangeText={setInputClientName} spaceToTop={sh32} value={inputClientName} />
            <CustomTextInput label={LABEL_ID} onChangeText={setInputClientID} spaceToTop={sh32} value={inputClientID} />
            {radioIDType === "NRIC" ? null : (
              <CustomTextInput
                label={ADD_CLIENT.LABEL_DOB}
                onChangeText={setInputClientDOB}
                rightIcon="calendar"
                spaceToTop={sh32}
                value={inputClientDOB}
              />
            )}
          </Fragment>
        ) : (
          <Fragment>
            <LabeledTitle
              label={ADD_CLIENT.DETAILS_LABEL_NAME}
              spaceToLabel={sh8}
              spaceToBottom={sh24}
              title={clientDetails.name}
              titleStyle={fs16BoldBlack1}
            />
            <LabeledTitle
              label={radioIDType}
              spaceToLabel={sh8}
              spaceToBottom={sh24}
              title={clientDetails.id}
              titleStyle={fs16BoldBlack1}
            />
            <LabeledTitle
              label={ADD_CLIENT.DETAILS_LABEL_GENDER}
              spaceToLabel={sh8}
              spaceToBottom={sh24}
              title={clientDetails.gender}
              titleStyle={fs16BoldBlack1}
            />
            <LabeledTitle
              label={ADD_CLIENT.DETAILS_LABEL_DOB}
              spaceToLabel={sh8}
              title={clientDetails.dateOfBirth}
              titleStyle={fs16BoldBlack1}
            />
          </Fragment>
        )}
      </Fragment>
    </ConfirmationModal>
  );
};

export const AddClient = connect(ClientMapStateToProps, ClintMapDispatchToProps)(AddClientComponent);
