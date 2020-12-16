import React, { Fragment } from "react";
import { Text, View } from "react-native";

import { LocalAssets } from "../../../../assets/LocalAssets";
import { Prompt } from "../../../../components";
import { Language } from "../../../../constants";
import { flexRow, fs16BoldBlack2, fs16RegBlack2, fsUnderline } from "../../../../styles";

const { ADD_CLIENT } = Language.PAGE;

interface NewSalesPromptProps {
  id: string;
  idType: TypeClientIDChoices | undefined;
  name: string;
  prompt: "ageMinimum" | "ageMaximum" | undefined;
}

export const NewSalesPrompt = ({ id, idType, name, prompt }: NewSalesPromptProps) => {
  const otherIdLabel = idType === "Other" ? ` ${ADD_CLIENT.LABEL_ID}` : "";
  const clientMinimumAgeLabel = `${ADD_CLIENT.LABEL_OOPS} ${name} ${ADD_CLIENT.LABEL_CANT_CREATE}`;

  const ageLabel = prompt === "ageMinimum" ? ADD_CLIENT.LABEL_MUST_MEET : ADD_CLIENT.LABEL_EXCEED;
  const promptTitle = `${id} ${idType}${otherIdLabel} ${ADD_CLIENT.LABEL_HOLDER} ${ageLabel} ${ADD_CLIENT.LABEL_AGE}`;

  return (
    <Prompt
      illustration={LocalAssets.illustration.clientWarning}
      label={clientMinimumAgeLabel}
      title={promptTitle}
      titleStyle={fs16BoldBlack2}>
      <Fragment>
        <View style={flexRow}>
          <Text style={fs16RegBlack2}>{`${ADD_CLIENT.LABEL_CLICK} `}</Text>
          <Text style={{ ...fs16RegBlack2, ...fsUnderline }}>{ADD_CLIENT.LABEL_CANCEL}</Text>
          <Text style={fs16RegBlack2}>{` ${ADD_CLIENT.LABEL_OR}`}</Text>
        </View>
        <View style={flexRow}>
          <Text style={fs16RegBlack2}>{`${ADD_CLIENT.LABEL_CLICK} `}</Text>
          <Text style={{ ...fs16RegBlack2, ...fsUnderline }}>{ADD_CLIENT.LABEL_ADD_DIFFERENT}</Text>
        </View>
      </Fragment>
    </Prompt>
  );
};
