import React, { Fragment } from "react";
import { Text, View } from "react-native";

import { LocalAssets } from "../../../../assets/LocalAssets";
import { Prompt } from "../../../../components";
import { Language } from "../../../../constants";
import { flexRow, fs16BoldBlack2, fs16RegBlack2, fsUnderline, sw360 } from "../../../../styles";

const { ADD_CLIENT } = Language.PAGE;

interface NewSalesPromptProps {
  id: string;
  idType: TypeClientIDChoices | undefined;
  name: string;
  prompt: TypeNewSalesPrompt;
}

export const NewSalesPrompt = ({ id, idType, name, prompt }: NewSalesPromptProps) => {
  const otherIdLabel = idType === "Other" ? ` ${ADD_CLIENT.LABEL_ID}` : "";
  let label = `${ADD_CLIENT.LABEL_OOPS} ${name} ${ADD_CLIENT.LABEL_CANT_CREATE}`;
  const ageLabel = prompt === "ageMinimum" ? ADD_CLIENT.LABEL_MUST_MEET : ADD_CLIENT.LABEL_EXCEED;
  let promptTitle: string | undefined = `${id} ${idType}${otherIdLabel} ${ADD_CLIENT.LABEL_HOLDER} ${ageLabel} ${ADD_CLIENT.LABEL_AGE}`;
  let content = (
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
  );
  let illustration = LocalAssets.illustration.clientWarning;
  switch (prompt) {
    case "bannedCountry":
      label = `${name} ${ADD_CLIENT.LABEL_BANNED_COUNTRY}`;
      content = <View />;
      promptTitle = ADD_CLIENT.LABEL_BANNED_COUNTRIES;
      illustration = LocalAssets.illustration.clientError;
      break;

    case "highRisk":
      label = `${name} ${ADD_CLIENT.LABEL_HIGH_RISK}`;
      content = <View />;
      promptTitle = undefined;
      break;

    default:
      break;
  }

  return (
    <Prompt illustration={illustration} label={label} title={promptTitle} titleStyle={{ ...fs16BoldBlack2, width: sw360 }}>
      {content}
    </Prompt>
  );
};
