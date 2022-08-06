import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { ColorCard, CustomSpacer, TextCard } from "../../components";
import { Language } from "../../constants";
import { fsTransformNone, px, sh16, sh24, sw24, sw328 } from "../../styles";
import { isNotEmpty } from "../../utils";
import { summaryColorCardStyleProps } from "../Dashboard";
import { JointDocumentHeader } from "./JointDocumentHeader";

const { DASHBOARD_DOCUMENT } = Language.PAGE;

interface DocumentsTabProps {
  documentSummary: IDocumentSummary;
  setFile: (value?: FileBase64) => void;
}

export const DocumentsTab: FunctionComponent<DocumentsTabProps> = ({ documentSummary, setFile }: DocumentsTabProps) => {
  // function to display the looped array data
  const populateData = (dataToModify: IOuterDocument) => {
    const displayedData: LabeledTitleProps[] = [];
    if (dataToModify.documents !== null) {
      dataToModify.documents.forEach((document: IInnerDocument, index) => {
        if (document.name === "-") {
          const newData: LabeledTitleProps = {
            label: document.title,
            title: document.name,
            titleStyle: fsTransformNone,
          };
          return displayedData.push(newData);
        }
        const newData: LabeledTitleProps = {
          label: document.title,
          title: document.name,
          titleStyle: fsTransformNone,
          titleIcon: document.label === "id" ? "profile-card" : "file",
          onPress: () => setFile(dataToModify.documents[index]),
        };
        return displayedData.push(newData);
      });
    }
    return displayedData;
  };

  return (
    <View style={px(sw24)}>
      {documentSummary !== null && isNotEmpty(documentSummary.softcopy) ? (
        <View>
          <CustomSpacer space={sh24} />
          <ColorCard
            {...summaryColorCardStyleProps}
            content={
              <Fragment>
                <View>
                  {documentSummary.softcopy.documents.map((softCopyData, index: number) => {
                    // function that populates the data
                    const updatedData = populateData(softCopyData);
                    return (
                      <Fragment key={index}>
                        {documentSummary.accountType !== "Individual" ? (
                          <Fragment>
                            {index === 0 ? null : <CustomSpacer space={sh16} />}
                            <JointDocumentHeader document={softCopyData} />
                          </Fragment>
                        ) : null}
                        <TextCard data={updatedData} itemStyle={{ width: sw328 }} />
                      </Fragment>
                    );
                  })}
                </View>
              </Fragment>
            }
            header={{ label: DASHBOARD_DOCUMENT.LABEL_SOFT_COPY_HEADER }}
          />
        </View>
      ) : null}
      {documentSummary !== null && isNotEmpty(documentSummary.hardcopy) ? (
        <View>
          {isNotEmpty(documentSummary.hardcopy.accDocs) && documentSummary.hardcopy.accDocs.length > 0 ? (
            <Fragment>
              <CustomSpacer space={sh24} />
              <ColorCard
                {...summaryColorCardStyleProps}
                content={
                  <Fragment>
                    {isNotEmpty(documentSummary.hardcopy.accDocs) && documentSummary.hardcopy.accDocs.length > 0 ? (
                      <Fragment>
                        {isNotEmpty(documentSummary.hardcopy.accDocs[0].documents) &&
                        documentSummary.hardcopy.accDocs[0].documents.length > 0 ? (
                          <Fragment>
                            <View>
                              {documentSummary.hardcopy.accDocs.map((accPhysicalDoc, index: number) => {
                                // function that populates the data
                                const updatedData = populateData(accPhysicalDoc);
                                return (
                                  <View key={index}>
                                    {documentSummary.accountType !== "Individual" ? (
                                      <Fragment>
                                        {index === 0 ? null : <CustomSpacer space={sh16} />}
                                        <JointDocumentHeader document={accPhysicalDoc} />
                                      </Fragment>
                                    ) : null}
                                    <TextCard data={updatedData} itemStyle={{ width: sw328 }} />
                                  </View>
                                );
                              })}
                            </View>
                          </Fragment>
                        ) : null}
                      </Fragment>
                    ) : null}
                  </Fragment>
                }
                header={{ label: DASHBOARD_DOCUMENT.LABEL_PHYSICAL_DOCUMENTS_HEADER }}
              />
            </Fragment>
          ) : null}
        </View>
      ) : null}
      {documentSummary !== null && documentSummary.accountType !== "Individual" ? <CustomSpacer space={sh16} /> : null}
    </View>
  );
};
