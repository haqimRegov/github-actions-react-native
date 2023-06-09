import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { CustomSpacer, CustomTextInput, NewDatePicker, NewDropdown, RadioButtonGroup, TextSpaceArea } from "../../../../components";
import { DEFAULT_DATE_FORMAT, Language, NRIC_AGE_FORMAT } from "../../../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE, ERROR } from "../../../../data/dictionary";
import { findDOBFromNric } from "../../../../helpers";
import { disabledOpacity5, fs16RegGray5, sh120, sh136, sh24, sh4, sw440, sw64, sw72 } from "../../../../styles";
import { isNonNumber, isNumber } from "../../../../utils";

const { ADD_CLIENT } = Language.PAGE;

interface NewSalesDetailsProps {
  clientInfo: IClientBasicInfo;
  clientType?: TypeClient | "";
  ageErrorMessage?: string;
  errorMessage: string | undefined;
  holderToFill: "jointHolder" | "principalHolder";
  inputError1: string | undefined;
  setAccountType?: (value: string) => void;
  setClientInfo: (value: IClientBasicInfo) => void;
  setAgeErrorMessage: (value: string | undefined) => void;
  setErrorMessage: (value: string | undefined) => void;
  setInputError1: (value: string | undefined) => void;
  subHeading?: string;
  subHeadingStyle?: TextStyle;
}

export const NewSalesDetails: FunctionComponent<NewSalesDetailsProps> = ({
  clientInfo,
  clientType,
  ageErrorMessage,
  errorMessage,
  holderToFill,
  inputError1,
  setClientInfo,
  setAgeErrorMessage,
  setErrorMessage,
  setInputError1,
  subHeading,
  subHeadingStyle,
}: NewSalesDetailsProps) => {
  const { country, dateOfBirth, id, idType, otherIdType, name } = clientInfo;
  const title = holderToFill === "principalHolder" ? ADD_CLIENT.SUBHEADING : ADD_CLIENT.SUBHEADING_JOINT;
  const checkSubheading = clientType !== "" ? title : ADD_CLIENT.SUBHEADING;
  const subheading = subHeading !== undefined ? subHeading : checkSubheading;
  const keyboardType = idType === "NRIC" ? "numeric" : "default";
  const idMaxLength = idType === "NRIC" ? 12 : undefined;
  const LABEL_ID_DYNAMIC = idType !== "Other" ? idType : `${otherIdType} ${ADD_CLIENT.LABEL_ID}`;
  const LABEL_NAME = `${ADD_CLIENT.LABEL_NAME} (${ADD_CLIENT.LABEL_NAME_AS_PER} ${LABEL_ID_DYNAMIC})`;
  const LABEL_ID = `${LABEL_ID_DYNAMIC} ${ADD_CLIENT.LABEL_NUMBER}`;

  const setInputIdType = (value: TypeIDChoices) => {
    setAgeErrorMessage(undefined);
    setErrorMessage(undefined);
    setInputError1(undefined);
    setClientInfo({ ...clientInfo, idType: value, name: "", id: "", country: "", dateOfBirth: "", isEtb: false });
  };
  const setInputOtherIdType = (value: TypeIDOther) => setClientInfo({ ...clientInfo, otherIdType: value });
  const setInputCountry = (value: string) => setClientInfo({ ...clientInfo, country: value });
  const setInputName = (value: string) => setClientInfo({ ...clientInfo, name: value });

  const setInputIdNumber = (value: string) => {
    if ((idType === "NRIC" && isNumber(value)) || idType !== "NRIC" || value === "") {
      if (idType === "NRIC") {
        const checkYears = moment().diff(moment(findDOBFromNric(value), NRIC_AGE_FORMAT).format(DEFAULT_DATE_FORMAT), "years");
        if (checkYears < 18 && holderToFill === "principalHolder") {
          setErrorMessage(ADD_CLIENT.LABEL_PRINCIPAL_UNDER_18);
        } else {
          setErrorMessage(undefined);
        }
      }
      setClientInfo({ ...clientInfo, id: value.toUpperCase() });
    }
  };

  const setInputDateOfBirth = (value?: Date) => {
    setClientInfo({ ...clientInfo, dateOfBirth: moment(value).format(DEFAULT_DATE_FORMAT) });
  };

  const handleOtherIdType = (value: string) => {
    setInputOtherIdType(value as TypeIDOther);
  };

  const handleIdType = (value: string) => {
    setInputIdType(value as TypeIDChoices);
  };

  const checkName = () => {
    setInputError1(isNonNumber(name!) === false ? ERROR.INVALID_NAME : undefined);
  };

  const hideInput = clientType !== "" && holderToFill === "principalHolder";
  const disabledStyle: ViewStyle = hideInput ? disabledOpacity5 : {};
  const dateValue = dateOfBirth !== "" ? moment(dateOfBirth, DEFAULT_DATE_FORMAT).toDate() : undefined;
  const maximumPrincipalDob = holderToFill === "principalHolder" ? moment().subtract(18, "years").toDate() : new Date();

  return (
    <View>
      <Fragment>
        <TextSpaceArea style={{ ...fs16RegGray5, ...subHeadingStyle }} text={subheading} />
        {hideInput ? null : (
          <Fragment>
            <RadioButtonGroup
              direction="row"
              label={ADD_CLIENT.LABEL_SELECT_ID_TYPE}
              options={DICTIONARY_ID_TYPE}
              optionStyle={{ minWidth: sw72 }}
              selected={idType!}
              setSelected={handleIdType}
              space={sw64}
              spaceToTop={sh24}
            />
          </Fragment>
        )}
        {idType !== "Other" || hideInput ? null : (
          <Fragment>
            <CustomSpacer space={sh24} />
            <NewDropdown
              handleChange={handleOtherIdType}
              items={DICTIONARY_ID_OTHER_TYPE}
              label={ADD_CLIENT.LABEL_ID_TYPE}
              value={otherIdType!}
              viewStyle={{ width: sw440 }}
            />
          </Fragment>
        )}
        <CustomTextInput
          autoCapitalize="words"
          disabled={clientType !== "" && holderToFill === "principalHolder"}
          error={inputError1}
          label={LABEL_NAME}
          onChangeText={setInputName}
          onBlur={checkName}
          spaceToBottom={sh24}
          spaceToTop={sh24}
          value={name}
          viewStyle={{ width: sw440 }}
        />
        <CustomTextInput
          autoCapitalize="characters"
          disabled={clientType !== "" && holderToFill === "principalHolder"}
          error={errorMessage}
          keyboardType={keyboardType}
          label={LABEL_ID}
          maxLength={idMaxLength}
          onChangeText={setInputIdNumber}
          value={id}
          viewStyle={{ width: sw440 }}
        />
        {idType === "NRIC" ? null : (
          <Fragment>
            <TextSpaceArea spaceToBottom={sh4} spaceToTop={sh24} style={disabledStyle} text={ADD_CLIENT.LABEL_DOB} />
            <NewDatePicker
              buttonStyle={{ width: sw440 }}
              disabled={clientType !== "" && holderToFill === "principalHolder"}
              error={ageErrorMessage}
              datePickerStyle={{ height: sh120 }}
              maximumDate={maximumPrincipalDob}
              mode="date"
              setValue={setInputDateOfBirth}
              value={dateValue}
              viewStyle={{ width: sw440 }}
            />
          </Fragment>
        )}
        {idType === "Passport" ? (
          <NewDropdown
            disabled={clientType !== "" && holderToFill === "principalHolder"}
            items={DICTIONARY_COUNTRIES}
            handleChange={setInputCountry}
            label={ADD_CLIENT.LABEL_COUNTRY}
            spaceToTop={sh24}
            style={{ height: sh136 }}
            value={country || ""}
            viewStyle={{ width: sw440 }}
          />
        ) : null}
      </Fragment>
    </View>
  );
};
