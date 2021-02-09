import React, { Fragment, FunctionComponent } from "react";
import { Text } from "react-native";

import { LocalAssets } from "../../../../assets/LocalAssets";
import { Prompt } from "../../../../components";
import { Language } from "../../../../constants";
import { fs12SemiBoldBlack2, fs16BoldBlack2, sw452 } from "../../../../styles";

const { ADD_CLIENT } = Language.PAGE;

interface NewSalesPromptProps {
  id: string;
  idType: TypeClientIDChoices | undefined;
  name: string;
  prompt: TypeNewSalesPrompt;
}

export const NewSalesPrompt: FunctionComponent<NewSalesPromptProps> = ({ name, prompt }: NewSalesPromptProps) => {
  let label = `${ADD_CLIENT.LABEL_OOPS} ${name} ${ADD_CLIENT.LABEL_CANT_CREATE}`;
  let promptTitle: string | undefined = ADD_CLIENT.PROMPT_TITLE;
  let illustration = LocalAssets.illustration.clientWarning;
  switch (prompt) {
    case "bannedCountry":
      label = `${name} ${ADD_CLIENT.LABEL_BANNED_COUNTRY}`;
      promptTitle = ADD_CLIENT.LABEL_BANNED_COUNTRIES;
      illustration = LocalAssets.illustration.clientError;
      break;

    case "highRisk":
      label = `${name} ${ADD_CLIENT.LABEL_HIGH_RISK}`;
      promptTitle = undefined;
      break;

    default:
      break;
  }

  return (
    <Prompt illustration={illustration} label={label} title={promptTitle} titleStyle={{ ...fs16BoldBlack2, width: sw452 }}>
      <Fragment>
        {prompt === "bannedCountry" || prompt === "highRisk" ? null : <Text style={fs12SemiBoldBlack2}>{ADD_CLIENT.PROMPT_SUBTITLE}</Text>}
      </Fragment>
    </Prompt>
  );
};
