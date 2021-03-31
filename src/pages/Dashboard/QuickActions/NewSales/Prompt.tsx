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
  const label =
    prompt === "bannedCountry"
      ? `${name} ${ADD_CLIENT.LABEL_BANNED_COUNTRY}`
      : `${ADD_CLIENT.LABEL_OOPS} ${name} ${ADD_CLIENT.LABEL_CANT_CREATE}`;
  const promptTitle: string | undefined = prompt === "bannedCountry" ? ADD_CLIENT.LABEL_BANNED_COUNTRIES : ADD_CLIENT.PROMPT_TITLE;
  const illustration = prompt === "bannedCountry" ? LocalAssets.illustration.clientError : LocalAssets.illustration.clientWarning;

  return (
    <Prompt illustration={illustration} label={label} title={promptTitle} titleStyle={{ ...fs16BoldBlack2, width: sw452 }}>
      <Fragment>{prompt === "bannedCountry" ? null : <Text style={fs12SemiBoldBlack2}>{ADD_CLIENT.PROMPT_SUBTITLE}</Text>}</Fragment>
    </Prompt>
  );
};
