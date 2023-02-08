import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomFlexSpacer, CustomSpacer, IconButton, NewMobileInput, OutlineButton } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_MOBILE_CODE, ERROR } from "../../../data/dictionary";
import { borderBottomGray2, colorBlack, flexRow, py, sh12, sh16, sh24, sw16 } from "../../../styles";
import { isNumber } from "../../../utils";

const { PERSONAL_DETAILS } = Language.PAGE;

interface ContactDetailsProps {
  contactNumber: IContactNumberState[];
  optional: boolean;
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

export const ContactDetails: FunctionComponent<ContactDetailsProps> = ({
  contactNumber,
  optional,
  setContactNumber,
}: ContactDetailsProps) => {
  return (
    <View>
      {contactNumber.map((item: IContactNumber, index: number) => {
        const onBlur = () => {
          const updatedNumber = [...contactNumber];
          if (isNumber(updatedNumber[index].value) === true || updatedNumber[index].value === "") {
            const errorCheck = updatedNumber[index].value === "" ? ERROR.INVALID_NUMBER : undefined;
            updatedNumber[index].error = optional === false ? errorCheck : undefined;
          }
          setContactNumber(updatedNumber);
        };

        const handleRemoveNumber = () => {
          const updatedNumber = [...contactNumber];
          updatedNumber.splice(updatedNumber.indexOf(item), 1);
          setContactNumber(updatedNumber);
        };

        const handleContactNumber = (data: IContactNumber) => {
          const updatedNumber = [...contactNumber];
          updatedNumber[index] = data;
          updatedNumber[index].error = data.value === "" && optional === true ? undefined : data.error;
          setContactNumber(updatedNumber);
        };

        return (
          <Fragment key={index}>
            {index !== 0 ? <CustomSpacer space={sh16} /> : null}
            <View style={flexRow}>
              <NewMobileInput
                data={item}
                handleContactNumber={handleContactNumber}
                keyboardType="numeric"
                label={optional === true ? `${item.label} ${PERSONAL_DETAILS.LABEL_OPTIONAL}` : undefined}
                maxLength={15}
                onBlur={onBlur}
                placeholder="12 3456 7890"
              />
              <CustomSpacer isHorizontal={true} space={sw16} />
              {index === 0 ? null : (
                <View>
                  <CustomFlexSpacer />
                  <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveNumber} size={sh24} style={py(sh12)} />
                  {item.error !== undefined ? <CustomSpacer space={sh24} /> : null}
                </View>
              )}
              <CustomFlexSpacer />
            </View>
          </Fragment>
        );
      })}
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray2} />
      <CustomSpacer space={sh16} />
      <View style={flexRow}>
        {allLabels.map((item: IContactNumberLabel, labelIndex: number) => {
          console.log("item", item);
          const buttonText = `${PERSONAL_DETAILS.BUTTON_ADD} ${item.label}`;
          const checkName = (element: IContactNumber) => element.label === item.label;

          const handleAddNumber = () => {
            const contactNumberClone = [
              ...contactNumber,
              { ...item, value: "", code: DICTIONARY_MOBILE_CODE[0].value, id: DICTIONARY_MOBILE_CODE[0].id },
            ];
            setContactNumber(contactNumberClone);
          };

          return contactNumber.some(checkName) ? null : (
            <Fragment key={labelIndex}>
              <OutlineButton buttonType="dashed" icon="plus" onPress={handleAddNumber} text={buttonText} />
              <CustomSpacer isHorizontal={true} space={sw16} />
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};
