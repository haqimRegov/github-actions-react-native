import React, { Fragment, ReactNode } from "react";
import { ViewStyle } from "react-native";

import { CustomSpacer, TitleAndSub, AnswerContent } from "../../components";
import { sh16 } from "../../styles";

export interface QuestionProps {
  title: string;
  subtitle: string;
  containerStyle?: ViewStyle;
  children: ReactNode;
}

export const Question = ({ children, title, subtitle, containerStyle }: QuestionProps) => {
  return (
    <Fragment>
      <TitleAndSub title={title} subtitle={subtitle} />
      <CustomSpacer space={sh16} />
      <AnswerContent containerStyle={containerStyle}>{children}</AnswerContent>
    </Fragment>
  );
};
