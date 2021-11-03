import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomFlexSpacer, CustomSpacer, IconButton, NewMobileInput, OutlineButton } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_MOBILE_CODE, ERROR } from "../../../data/dictionary";
import { centerVertical, colorBlack, flexRow, px, py, sh16, sh24, sh8, sw16, sw24 } from "../../../styles";
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
      <View style={px(sw24)}>
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
            <View key={index} style={{ ...centerVertical, ...flexRow }}>
              <NewMobileInput
                data={item}
                handleContactNumber={handleContactNumber}
                keyboardType="numeric"
                label={optional === true ? `${item.label} ${PERSONAL_DETAILS.LABEL_OPTIONAL}` : undefined}
                maxLength={15}
                onBlur={onBlur}
                placeholder="12 3456 7890"
                spaceToTop={sh24}
              />
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
              const contactNumberClone = [
                ...contactNumber,
                { ...item, value: "", code: DICTIONARY_MOBILE_CODE[0].value, id: DICTIONARY_MOBILE_CODE[0].id },
              ];
              setContactNumber(contactNumberClone);
            };

            return contactNumber.some(checkName) ? null : (
              <Fragment key={index}>
                <CustomSpacer space={sh16} />
                <OutlineButton buttonType="dashed" icon="plus" onPress={handleAddNumber} text={buttonText} />
              </Fragment>
            );
          })}
        </View>
      </View>
    </View>
  );
};
