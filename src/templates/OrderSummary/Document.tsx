import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { ColorCard, CustomFlexSpacer, CustomSpacer, TextCard } from "../../components";
import { Language } from "../../constants";
import { borderBottomRed1, flexRow, fsTransformNone, px, sh16, sh24, sw16, sw24, sw32, sw328, sw56, sw8 } from "../../styles";
import { isNotEmpty } from "../../utils";
import { summaryColorCardStyleProps } from "../Dashboard";

const { DASHBOARD_DOCUMENT } = Language.PAGE;

declare interface IDocumentsProps {
  data: IDashboardOrderSummary;
  setFile: (value?: FileBase64) => void;
}

export const Document: FunctionComponent<IDocumentsProps> = ({ data, setFile }: IDocumentsProps) => {
  const { documentSummary } = data;

  const headerStyle: ViewStyle = {
    ...borderBottomRed1,
    ...flexRow,
    marginRight: sw56,
    marginLeft: sw32,
  };

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
                            <CustomSpacer space={sw16} />
                            <View style={headerStyle}>
                              <View style={{ marginBottom: sw8 }}>
                                <Text>{softCopyData.mainHeader}</Text>
                              </View>
                              <CustomFlexSpacer />
                              <View>
                                <Text>{softCopyData.subHeader}</Text>
                              </View>
                            </View>
                          </Fragment>
                        ) : null}
                        <TextCard data={updatedData} itemStyle={{ width: sw328 }} />
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
          <CustomSpacer space={sh24} />
          {(isNotEmpty(documentSummary.hardcopy.utmcDocs) && documentSummary.hardcopy.utmcDocs.length > 0) ||
          (isNotEmpty(documentSummary.hardcopy.accDocs) && documentSummary.hardcopy.accDocs.length > 0) ? (
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
                              {isNotEmpty(products.documents.length) && products.documents.length > 0 ? (
                                <TextCard data={updatedData} itemStyle={{ width: sw328 }} />
                              ) : null}
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
                                    <View style={headerStyle}>
                                      <View style={{ marginBottom: sw8 }}>
                                        <Text>{accPhysicalDoc.mainHeader}</Text>
                                      </View>
                                      <CustomFlexSpacer />
                                      <View>
                                        <Text>{accPhysicalDoc.subHeader}</Text>
                                      </View>
                                      <CustomSpacer space={sh16} />
                                    </View>
                                  ) : null}
                                  {documentSummary.accountType !== "Individual" ? <CustomSpacer space={sh16} /> : null}
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
          ) : null}
        </View>
      ) : null}
      {documentSummary.accountType !== "Individual" ? <CustomSpacer space={sh16} /> : null}
    </View>
  );
};
