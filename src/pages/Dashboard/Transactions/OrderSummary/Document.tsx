import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, TextCard } from "../../../../components";
import { Language } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
import {
  autoWidth,
  borderBottomBlue3,
  borderBottomBlue5,
  borderBottomRed1,
  colorBlue,
  flexChild,
  flexRow,
  fs18BoldBlack2,
  fs20BoldBlue1,
  fs24BoldBlue1,
  fsTransformNone,
  px,
  rowCenterVertical,
  sh16,
  sh18,
  sh24,
  sw16,
  sw24,
  sw32,
  sw36,
  sw40,
  sw56,
  sw64,
  sw8,
} from "../../../../styles";
import { isNotEmpty, titleCaseString } from "../../../../utils";

const { DASHBOARD_DOCUMENT } = Language.PAGE;

declare interface IDocumentsProps {
  data: IDashboardOrderSummary;
  setFile: (value?: FileBase64) => void;
}

export const Document: FunctionComponent<IDocumentsProps> = ({ data, setFile }: IDocumentsProps) => {
  const { documentSummary } = data;

  // styling
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
    <Fragment>
      {/* softcopy section  */}
      {isNotEmpty(documentSummary.softcopy) ? (
        <View style={px(sw24)}>
          <CustomSpacer space={sh24} />

          {/* soft copy header  */}
          <Text style={{ ...fs24BoldBlue1 }}>{DASHBOARD_DOCUMENT.LABEL_SOFT_COPY_HEADER}</Text>

          {/* softcopy view  */}
          <View>
            {/* softcopy data insert array  */}
            {documentSummary.softcopy.documents.map((softCopyData, index: number) => {
              // function that populates the data
              const updatedData = populateData(softCopyData);
              return (
                <Fragment key={index}>
                  {/* subheader with red underline */}
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
                  <CustomSpacer space={sh16} />

                  {/* displaying the text card */}
                  <View style={px(sw32)}>
                    <TextCard data={updatedData} spaceBetweenItem={sw64} />
                  </View>
                </Fragment>
              );
            })}
          </View>
        </View>
      ) : null}
      <CustomSpacer space={sw24} />

      {/* grey border  */}
      <View style={borderBottomBlue3} />

      {/* Physical document section  */}
      {isNotEmpty(documentSummary.hardcopy) ? (
        <View style={px(sw24)}>
          <CustomSpacer space={sh24} />
          {(isNotEmpty(documentSummary.hardcopy.utmcDocs) && documentSummary.hardcopy.utmcDocs.length > 0) ||
          (isNotEmpty(documentSummary.hardcopy.accDocs) && documentSummary.hardcopy.accDocs.length > 0) ? (
            <Fragment>
              <Text style={{ ...fs24BoldBlue1 }}>{DASHBOARD_DOCUMENT.LABEL_PHYSICAL_DOCUMENTS_HEADER}</Text>
            </Fragment>
          ) : null}

          {/* product info  */}
          {isNotEmpty(documentSummary.hardcopy.utmcDocs) && documentSummary.hardcopy.utmcDocs.length > 0 ? (
            <Fragment>
              <CustomSpacer space={sh18} />
              <View>
                {/* loop array of data */}
                {documentSummary.hardcopy.utmcDocs.map((products, index: number) => {
                  // function that populates the data
                  const updatedData = populateData(products);
                  return (
                    // display product chosen
                    <Fragment key={index}>
                      {isNotEmpty(products.documents.length) && products.documents.length > 0 ? (
                        <Fragment>
                          {index === 0 ? null : <CustomSpacer space={sh16} />}
                          <View style={flexRow}>
                            <CustomSpacer isHorizontal={true} space={sw8} />
                            <IcoMoon color={colorBlue._1} name="house" size={sw24} />
                            <CustomSpacer isHorizontal={true} space={sw8} />
                            <View style={flexChild}>
                              <View style={rowCenterVertical}>
                                <Text style={fs18BoldBlack2}>{titleCaseString(products.mainHeader)}</Text>
                                <CustomSpacer isHorizontal={true} space={sw16} />
                                <View style={flexChild}>
                                  <View style={borderBottomBlue5} />
                                </View>
                              </View>
                            </View>
                          </View>
                          <CustomSpacer space={sh24} />
                          <View style={px(sw40)}>
                            <TextCard data={updatedData} spaceBetweenItem={sw64} />
                          </View>
                        </Fragment>
                      ) : null}
                    </Fragment>
                  );
                })}
              </View>
            </Fragment>
          ) : null}

          {/* account details  */}
          {/* checking if accDocs exist  */}
          {isNotEmpty(documentSummary.hardcopy.accDocs) && documentSummary.hardcopy.accDocs.length > 0 ? (
            <Fragment>
              {/* checking if there are hardcopy documents  */}
              {isNotEmpty(documentSummary.hardcopy.accDocs[0].documents) && documentSummary.hardcopy.accDocs[0].documents.length > 0 ? (
                <Fragment>
                  <CustomSpacer space={sh16} />
                  <View style={flexRow}>
                    <CustomSpacer isHorizontal={true} space={sw8} />
                    <IcoMoon color={colorBlue._1} name="account" size={sw24} />
                    <CustomSpacer isHorizontal={true} space={sw8} />
                    <View style={flexChild}>
                      <View style={rowCenterVertical}>
                        <Text style={fs20BoldBlue1}>{DASHBOARD_DOCUMENT.LABEL_SUBHEADER_ACCOUNT}</Text>
                        <CustomSpacer isHorizontal={true} space={sw16} />
                        <View style={flexChild}>
                          <View style={borderBottomBlue5} />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View>
                    {/* principal account header for when joint account is active  */}
                    {documentSummary.hardcopy.accDocs.map((accPhysicalDoc, index: number) => {
                      // function that populates the data
                      const updatedData = populateData(accPhysicalDoc);
                      return (
                        <View key={index}>
                          <CustomSpacer space={sh24} />

                          {/* subheader with red underline  */}
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

                          {/* displaying the text card  */}
                          <View style={px(sw36)}>
                            {documentSummary.accountType !== "Individual" ? <CustomSpacer space={sh16} /> : null}
                            <TextCard data={updatedData} spaceBetweenItem={sw32} itemStyle={autoWidth} />
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </Fragment>
              ) : null}
            </Fragment>
          ) : null}
        </View>
      ) : null}
      {documentSummary.accountType !== "Individual" ? <CustomSpacer space={sh16} /> : null}
    </Fragment>
  );
};
