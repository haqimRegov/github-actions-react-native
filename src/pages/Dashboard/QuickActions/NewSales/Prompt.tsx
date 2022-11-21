import React, { Fragment, FunctionComponent } from "react";
import { Text } from "react-native";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { Prompt } from "../../../../components";
import { Language } from "../../../../constants";
import { fs12RegGray6, sw452 } from "../../../../styles";

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
    <Prompt illustration={illustration} label={label} title={promptTitle} titleStyle={{ width: sw452 }}>
      <Fragment>{prompt === "bannedCountry" ? null : <Text style={fs12RegGray6}>{ADD_CLIENT.PROMPT_SUBTITLE}</Text>}</Fragment>
    </Prompt>
  );
};
