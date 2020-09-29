import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { DICTIONARY_PASSWORD } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  circleBorder,
  colorBlack,
  colorGreen,
  colorWhite,
  flexRow,
  fs12SemiBoldBlack2,
  sh16,
  sh8,
  sw1,
  sw11,
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
        const iconColor = valid ? colorWhite._1 : colorBlack._2;
        const iconBorder = valid ? colorGreen._1 : colorBlack._2;
        const iconBackground = valid ? colorGreen._1 : colorWhite._1;
        return (
          <Fragment key={index}>
            <CustomSpacer space={sh8} />
            <View style={{ ...centerVertical, ...flexRow }}>
              <View style={{ ...centerHV, height: sw16, width: sw16 }}>
                <View style={{ ...centerHV, ...circleBorder(sw11, sw1, iconBorder, iconBackground) }}>
                  <IcoMoon color={iconColor} name="check-v2" size={sh8} />
                </View>
              </View>
              <CustomSpacer isHorizontal={true} space={sw8} />
              <Text style={{ ...fs12SemiBoldBlack2, lineHeight: sh16 }}>{label}</Text>
            </View>
          </Fragment>
        );
      })}
    </View>
  );
};
