import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { JointDocumentHeader, summaryColorCardStyleProps } from ".";
import { ColorCard, CustomSpacer, TextCard } from "../../components";
import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  borderBottomBlue4,
  colorBlue,
  flexChild,
  fs16BoldBlack2,
  fsTransformNone,
  px,
  rowCenterVertical,
  sh16,
  sh20,
  sh24,
  sh32,
  sh8,
  sw16,
  sw24,
  sw328,
  sw8,
} from "../../styles";
import { isNotEmpty } from "../../utils";

const { DASHBOARD_DOCUMENT } = Language.PAGE;

interface DocumentsTabNewProps {
  documentSummary: IDocumentSummary;
  setFile: (value?: FileBase64) => void;
}

export const DocumentsTabNew: FunctionComponent<DocumentsTabNewProps> = ({ documentSummary, setFile }: DocumentsTabNewProps) => {
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
      {isNotEmpty(documentSummary.softcopy) ? (
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
                            <JointDocumentHeader document={softCopyData} />
                          </Fragment>
                        ) : null}
                        <TextCard data={updatedData} itemStyle={{ width: sw328 }} />
                        <CustomSpacer space={sh16} />
                      </Fragment>
                    );
                  })}
                </View>
              </Fragment>
            }
            header={{ ...summaryColorCardStyleProps.header, label: DASHBOARD_DOCUMENT.LABEL_SOFT_COPY_HEADER }}
          />
        </View>
      ) : null}
      {isNotEmpty(documentSummary.hardcopy) ? (
        <View>
          {(isNotEmpty(documentSummary.hardcopy.utmcDocs) && documentSummary.hardcopy.utmcDocs.length > 0) ||
          (isNotEmpty(documentSummary.hardcopy.accDocs) && documentSummary.hardcopy.accDocs.length > 0) ? (
            <Fragment>
              <CustomSpacer space={sh24} />
              <ColorCard
                {...summaryColorCardStyleProps}
                content={
                  <Fragment>
                    {isNotEmpty(documentSummary.hardcopy.utmcDocs) && documentSummary.hardcopy.utmcDocs.length > 0 ? (
                      <Fragment>
                        <View>
                          {documentSummary.hardcopy.utmcDocs.map((products, index: number) => {
                            // function that populates the data
                            const updatedData = populateData(products);
                            return (
                              <Fragment key={index}>
                                <View style={flexChild}>
                                  <View style={rowCenterVertical}>
                                    <IcoMoon name="house" size={sh20} color={colorBlue._1} />
                                    <CustomSpacer isHorizontal={true} space={sw8} />
                                    <Text style={fs16BoldBlack2}>{products.mainHeader}</Text>
                                    <CustomSpacer isHorizontal={true} space={sw16} />
                                    <View style={flexChild}>
                                      <View style={borderBottomBlue4} />
                                    </View>
                                  </View>
                                </View>
                                <CustomSpacer space={sh8} />
                                {isNotEmpty(products.documents.length) && products.documents.length > 0 ? (
                                  <TextCard data={updatedData} itemStyle={{ width: sw328 }} />
                                ) : null}
                                <CustomSpacer space={sh32} />
                              </Fragment>
                            );
                          })}
                        </View>
                      </Fragment>
                    ) : null}
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
                header={{ ...summaryColorCardStyleProps.header, label: DASHBOARD_DOCUMENT.LABEL_PHYSICAL_DOCUMENTS_HEADER }}
              />
            </Fragment>
          ) : null}
        </View>
      ) : null}
      {documentSummary.accountType !== "Individual" ? <CustomSpacer space={sh16} /> : null}
    </View>
  );
};
