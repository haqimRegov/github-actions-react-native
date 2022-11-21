import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { DICTIONARY_PASSWORD } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  circleBorder,
  colorGray,
  colorGreen,
  colorWhite,
  flexRow,
  fs12RegGray5,
  sh12,
  sh4,
  sw1,
  sw16,
  sw8,
} from "../../styles";
import { CustomSpacer } from "./Spacer";

interface PasswordValidationProps {
  password: string;
}

export const PasswordValidation: FunctionComponent<PasswordValidationProps> = ({ password }: PasswordValidationProps) => {
  return (
    <View>
      {DICTIONARY_PASSWORD.map(({ label, validation }, index: number) => {
        const valid = validation.test(password);
        const iconColor = valid ? colorWhite._1 : colorGray._6;
        const iconBorder = valid ? colorGreen._1 : colorGray._6;
        const iconBackground = valid ? colorGreen._1 : colorWhite._1;
        return (
          <Fragment key={index}>
            <CustomSpacer space={sh4} />
            <View style={{ ...centerVertical, ...flexRow }}>
              <View style={{ ...centerHV, height: sw16, width: sw16 }}>
                <View style={{ ...centerHV, ...circleBorder(sw16, sw1, iconBorder, iconBackground) }}>
                  <IcoMoon color={iconColor} name="check-v2" size={sh12} />
                </View>
              </View>
              <CustomSpacer isHorizontal={true} space={sw8} />
              <Text style={fs12RegGray5}>{label}</Text>
            </View>
          </Fragment>
        );
      })}
    </View>
  );
};
