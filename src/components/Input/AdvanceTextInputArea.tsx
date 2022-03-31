import React, { FunctionComponent, useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorGray,
  colorGreen,
  colorWhite,
  flexRow,
  sh16,
  sw1,
  sw16,
  sw24,
  sw32,
} from "../../styles";
import { OutlineButton } from "../Touchables/OutlineButton";
import { CustomSpacer } from "../Views/Spacer";
import { TextInputMultiline, TextInputMultilineProps } from "./TextInputMultiline";

const { TEXT_INPUT_AREA } = Language.PAGE;

interface AdvanceTextInputAreaProps extends TextInputMultilineProps {
  handleContinue: (value: string) => void;
  handleSave: (value: boolean) => void;
  saved: boolean;
}
export const AdvanceTextInputArea: FunctionComponent<AdvanceTextInputAreaProps> = ({
  handleContinue,
  handleSave,
  placeholder,
  saved,
  value,
}: AdvanceTextInputAreaProps) => {
  const [input, setInput] = useState<string>("");
  const [showCheck, setShowCheck] = useState<boolean>(false);

  const handlePressSave = () => {
    if (input !== value) {
      setShowCheck(true);
      handleContinue(input);
      setTimeout(() => {
        setShowCheck(false);
      }, 1000);
    }
  };

  const handleInput = (text: string) => {
    if (saved === true) {
      handleSave(false);
    }
    setInput(text);
  };

  const defaultColor = input === "" && input === value ? colorGray._4 : colorGray._6;
  const color = input !== value ? colorBlue._8 : defaultColor;
  const borderColor = input !== value ? colorBlue._8 : colorGray._4;
  const defaultText = input === "" && input === value ? TEXT_INPUT_AREA.BUTTON_ADD : TEXT_INPUT_AREA.BUTTON_SAVED;
  const buttonText = input !== value ? TEXT_INPUT_AREA.BUTTON_CONTINUE : defaultText;

  const outlineStyle: ViewStyle = { borderColor: borderColor };

  useEffect(() => {
    if (value !== undefined) {
      setInput(value);
    }
  }, [value]);

  return (
    <View>
      <TextInputMultiline maxLength={255} onChangeText={handleInput} placeholder={placeholder} value={input} />
      <CustomSpacer space={sh16} />
      <View style={{ ...flexRow, ...centerVertical }}>
        <OutlineButton buttonStyle={outlineStyle} onPress={handlePressSave} text={buttonText} textStyle={{ color: color }} />
        <CustomSpacer isHorizontal={true} space={sw16} />
        {showCheck === true ? (
          <View style={{ ...centerHV, ...circleBorder(sw32, sw1, colorGreen._1, colorGreen._1) }}>
            <IcoMoon name="success" size={sw24} color={colorWhite._1} />
          </View>
        ) : null}
      </View>
    </View>
  );
};
