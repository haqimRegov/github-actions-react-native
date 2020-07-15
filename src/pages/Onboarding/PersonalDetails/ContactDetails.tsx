import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import {
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  IconButton,
  IconText,
  RadioButtonGroup,
  TextSpaceArea,
} from "../../../components";
import { Language } from "../../../constants";
import {
  centerVertical,
  circleBorder,
  colorBlue,
  flexRow,
  px,
  sh24,
  sh4,
  sh40,
  sh8,
  sw05,
  sw12,
  sw14,
  sw16,
  sw24,
  sw32,
} from "../../../styles";

const { CONTACT_DETAILS } = Language.PAGE;

interface IContactDetailsProps {
  contactNumber: IContactNumber[];
  inputEmailAddress: string;
  inputRace: string;
  inputBumiputera: string;
  setContactNumber: (input: IContactNumber[]) => void;
  setInputEmailAddress: (input: string) => void;
  setInputRace: (input: string) => void;
  setInputBumiputera: (input: string) => void;
}

interface IContactNumberLabel {
  label: string;
  type: TypePhoneNumber;
}

const allLabels: IContactNumberLabel[] = [
  {
    label: CONTACT_DETAILS.LABEL_MOBILE_NUMBER,
    type: "mobile",
  },
  {
    label: CONTACT_DETAILS.LABEL_HOME_NUMBER,
    type: "home",
  },
  {
    label: CONTACT_DETAILS.LABEL_OFFICE_NUMBER,
    type: "office",
  },
  {
    label: CONTACT_DETAILS.LABEL_FAX_NUMBER,
    type: "fax",
  },
];

export const ContactDetails: FunctionComponent<IContactDetailsProps> = ({
  contactNumber,
  inputEmailAddress,
  inputRace,
  inputBumiputera,
  setContactNumber,
  setInputEmailAddress,
  setInputRace,
  setInputBumiputera,
}: IContactDetailsProps) => {
  return (
    <View style={px(sw24)}>
      {contactNumber.map((item: IContactNumber, index: number) => {
        const handleRemoveNumber = () => {
          const updatedNumber = [...contactNumber];
          updatedNumber.splice(updatedNumber.indexOf(item), 1);
          setContactNumber(updatedNumber);
        };

        const handleChangeText = (input: string) => {
          const updatedNumber = [...contactNumber];
          updatedNumber[index].value = input;
          setContactNumber(updatedNumber);
        };

        return (
          <View key={index} style={{ ...centerVertical, ...flexRow }}>
            <CustomTextInput
              keyboardType="phone-pad"
              label={item.label}
              onChangeText={handleChangeText}
              spaceToTop={sh24}
              value={item.value}
            />
            <CustomSpacer isHorizontal={true} space={sw16} />
            {index === 0 ? null : (
              <View>
                <CustomFlexSpacer />
                <IconButton
                  color={colorBlue._1}
                  name="close"
                  onPress={handleRemoveNumber}
                  size={sw12}
                  style={circleBorder(sw32, sw05, colorBlue._1)}
                />
                <CustomSpacer space={sh4} />
              </View>
            )}
          </View>
        );
      })}
      <View style={px(sw14)}>
        {allLabels.map((item: IContactNumberLabel, index: number) => {
          const buttonText = `${CONTACT_DETAILS.BUTTON_ADD} ${item.label}`;
          const checkName = (element: IContactNumber) => element.label === item.label;

          const handleAddNumber = () => {
            const contactNumberClone = [...contactNumber, { ...item, value: "" }];
            setContactNumber(contactNumberClone);
          };

          return contactNumber.some(checkName) ? null : (
            <Fragment key={index}>
              <CustomSpacer space={sh8} />
              <IconText name="plus" onPress={handleAddNumber} text={buttonText} />
            </Fragment>
          );
        })}
      </View>
      <CustomTextInput
        keyboardType="email-address"
        label={CONTACT_DETAILS.LABEL_EMAIL}
        onChangeText={setInputEmailAddress}
        spaceToTop={sh24}
        value={inputEmailAddress}
      />
      <CustomTextInput label={CONTACT_DETAILS.LABEL_RACE} onChangeText={setInputRace} spaceToTop={sh24} value={inputRace} />
      <View style={flexRow}>
        <CustomSpacer isHorizontal={true} space={sw12} />
        <View>
          <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh24} text={CONTACT_DETAILS.LABEL_BUMIPUTERA} />
          <RadioButtonGroup
            direction="row"
            labels={[CONTACT_DETAILS.OPTION_BUMIPUTERA_YES, CONTACT_DETAILS.OPTION_BUMIPUTERA_NO]}
            selected={inputBumiputera}
            setSelected={setInputBumiputera}
            space={sh40}
          />
        </View>
      </View>
    </View>
  );
};
