import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomFlexSpacer, CustomSpacer, CustomTextInput, IconButton, OutlineButton } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_MOBILE_CODE, ERROR } from "../../../data/dictionary";
import { centerVertical, colorBlack, colorBlue, flexRow, fs12BoldBlue2, px, py, sh16, sh24, sh8, sw16, sw24 } from "../../../styles";
import { isNumber } from "../../../utils";

const { PERSONAL_DETAILS } = Language.PAGE;

interface ContactDetailsProps {
  contactNumber: IContactNumberState[];
  setContactNumber: (input: IContactNumberState[]) => void;
}

interface IContactNumberLabel {
  label: string;
  type: TypePhoneNumber;
}

const allLabels: IContactNumberLabel[] = [
  {
    label: PERSONAL_DETAILS.LABEL_MOBILE_NUMBER,
    type: "mobile",
  },
  {
    label: PERSONAL_DETAILS.LABEL_HOME_NUMBER,
    type: "home",
  },
  {
    label: PERSONAL_DETAILS.LABEL_OFFICE_NUMBER,
    type: "office",
  },
  {
    label: PERSONAL_DETAILS.LABEL_FAX_NUMBER,
    type: "fax",
  },
];

export const ContactDetails: FunctionComponent<ContactDetailsProps> = ({ contactNumber, setContactNumber }: ContactDetailsProps) => {
  return (
    <View>
      <View style={px(sw24)}>
        {contactNumber.map((item: IContactNumber, index: number) => {
          const handleRemoveNumber = () => {
            const updatedNumber = [...contactNumber];
            updatedNumber.splice(updatedNumber.indexOf(item), 1);
            setContactNumber(updatedNumber);
          };

          const handleChangeNumber = (input: string) => {
            const updatedNumber = [...contactNumber];
            updatedNumber[index].value = input;
            setContactNumber(updatedNumber);
          };

          const checkNumber = () => {
            const updatedNumber = [...contactNumber];
            updatedNumber[index].error = isNumber(item.value) === false ? ERROR.INVALID_NUMBER : undefined;
            setContactNumber(updatedNumber);
          };

          return (
            <View key={index} style={{ ...centerVertical, ...flexRow }}>
              <View>
                <CustomTextInput
                  error={item.error}
                  inputPrefix={item.code}
                  keyboardType="numeric"
                  label={item.label}
                  onBlur={checkNumber}
                  onChangeText={handleChangeNumber}
                  placeholder="12 3456 7890"
                  spaceToTop={sh24}
                  value={item.value}
                />
              </View>
              <CustomSpacer isHorizontal={true} space={sw16} />
              {index === 0 ? null : (
                <View>
                  <CustomFlexSpacer />
                  <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveNumber} size={sh24} style={py(sh8)} />
                  {item.error !== undefined ? <CustomSpacer space={sh24} /> : null}
                </View>
              )}
              <CustomFlexSpacer />
            </View>
          );
        })}
        <View>
          {allLabels.map((item: IContactNumberLabel, index: number) => {
            const buttonText = `${PERSONAL_DETAILS.BUTTON_ADD} ${item.label}`;
            const checkName = (element: IContactNumber) => element.label === item.label;

            const handleAddNumber = () => {
              const contactNumberClone = [...contactNumber, { ...item, value: "", code: DICTIONARY_MOBILE_CODE[0].value }];
              setContactNumber(contactNumberClone);
            };

            return contactNumber.some(checkName) ? null : (
              <Fragment key={index}>
                <CustomSpacer space={sh16} />
                <OutlineButton
                  buttonType="dashed"
                  color={colorBlue._2}
                  icon="plus"
                  onPress={handleAddNumber}
                  text={buttonText}
                  textStyle={fs12BoldBlue2}
                />
              </Fragment>
            );
          })}
        </View>
      </View>
    </View>
  );
};
