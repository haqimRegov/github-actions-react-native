import React, { Fragment, FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { centerHV, colorWhite, fullHeight, fullHW, sh16, sw212 } from "../../styles";
import { SubmissionSummaryCollapsible } from "../../templates";
import { CustomSpacer, Loading, NewPrompt, NewPromptProps, SubmissionSummaryPrompt, SubmissionSummaryPromptProps } from "../Views";
import { BasicModal } from "./Basic";

type TPromptType = "summary" | "success";

interface SubmissionSummaryModalProps {
  data?: ISubmissionSummaryOrder[];
  prompt: NewPromptProps;
  promptType: TPromptType;
  summary: SubmissionSummaryPromptProps;
  visible: boolean;
}

export const SubmissionSummaryModal: FunctionComponent<SubmissionSummaryModalProps> = ({
  data,
  prompt,
  promptType,
  summary,
  visible,
}: SubmissionSummaryModalProps) => {
  const buttonWidth: ViewStyle = { width: sw212 };

  return (
    <BasicModal backdropOpacity={0.65} visible={visible}>
      <View style={{ ...centerHV, ...fullHW }}>
        {data === undefined ? (
          <Loading color={colorWhite._1} style={fullHeight} />
        ) : (
          <Fragment>
            {promptType === "summary" ? (
              <SubmissionSummaryPrompt {...summary}>
                <View>
                  <CustomSpacer space={sh16} />
                  <SubmissionSummaryCollapsible data={data} />
                </View>
              </SubmissionSummaryPrompt>
            ) : (
              <NewPrompt
                {...prompt}
                primary={
                  prompt.primary !== undefined
                    ? { ...prompt.primary, buttonStyle: { ...buttonWidth, ...prompt.primary.buttonStyle } }
                    : prompt.primary
                }
              />
            )}
          </Fragment>
        )}
      </View>
    </BasicModal>
  );
};
