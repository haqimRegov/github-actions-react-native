import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View } from "react-native";

import { ColorCard, CustomSpacer, CustomTextInput, RadioButtonGroup } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_EPF_TYPE_CONVENTIONAL, DICTIONARY_EPF_TYPE_SHARIAH } from "../../data/dictionary";
import { borderBottomGray2, fs12RegWhite1, sh16, sw148 } from "../../styles";

const { PERSONAL_DETAILS } = Language.PAGE;

interface EPFDetailsProps {
  inputEpfNumber: string;
  inputEpfType: string;
  epfNumberError: string | undefined;
  epfShariah: boolean;
  onBlurEpfNumber: () => void;
  setInputEpfNumber: (input: string) => void;
  setInputEpfType: (input: string) => void;
}

export const EPFDetails: FunctionComponent<EPFDetailsProps> = ({
  inputEpfNumber,
  inputEpfType,
  epfNumberError,
  epfShariah,
  onBlurEpfNumber,
  setInputEpfNumber,
  setInputEpfType,
}: EPFDetailsProps) => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const handleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  useEffect(() => {
    if ((epfShariah === false || epfShariah === undefined) && inputEpfType === "Shariah") {
      setInputEpfType("Conventional");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epfShariah]);

  return (
    <Fragment>
      <ColorCard
        header={{ label: PERSONAL_DETAILS.LABEL_EPF_DETAILS }}
        content={
          <Fragment>
            <CustomTextInput
              error={epfNumberError}
              keyboardType="numeric"
              label={PERSONAL_DETAILS.LABEL_EPF_MEMBER_NUMBER}
              onBlur={onBlurEpfNumber}
              onChangeText={setInputEpfNumber}
              value={inputEpfNumber}
            />
            <CustomSpacer space={sh16} />
            <View style={borderBottomGray2} />
            <RadioButtonGroup
              direction="row"
              disabledIndex={epfShariah === true ? undefined : [1]}
              disabledTooltip={true}
              label={PERSONAL_DETAILS.LABEL_EPF_TYPE}
              options={[DICTIONARY_EPF_TYPE_CONVENTIONAL.value, DICTIONARY_EPF_TYPE_SHARIAH.value]}
              selected={inputEpfType}
              setSelected={setInputEpfType}
              showTooltip={tooltipVisible}
              setShowTooltip={handleTooltip}
              spaceToTop={sh16}
              tooltipContent={
                <View>
                  <Text style={fs12RegWhite1}>{PERSONAL_DETAILS.TOOLTIP_EPF}</Text>
                </View>
              }
              tooltipContentStyle={{ width: sw148 }}
            />
          </Fragment>
        }
      />
    </Fragment>
  );
};
