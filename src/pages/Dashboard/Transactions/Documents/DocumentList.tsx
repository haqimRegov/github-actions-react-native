import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, CustomTooltip, UploadWithModal } from "../../../../components";
import { Language } from "../../../../constants/language";
import { FILTER_ISSUING_HOUSE } from "../../../../data/dictionary";
import { IcoMoon } from "../../../../icons";
import {
  colorBlack,
  flexRow,
  fs12RegWhite1,
  fs14BoldBlack2,
  rowCenterVertical,
  sh16,
  sh18,
  sh6,
  sh8,
  sh96,
  sw10,
  sw16,
  sw18,
  sw280,
  sw317,
  sw4,
  sw8,
} from "../../../../styles";
import { isEmpty } from "../../../../utils";

const { UPLOAD_DOCUMENTS, UPLOAD_HARD_COPY_DOCUMENTS } = Language.PAGE;

interface DocumentListProps {
  data: ISoftCopyDocument[];
  header?: JSX.Element;
  headerSpace?: boolean;
  setData: (value: ISoftCopyDocument[]) => void;
}

export const DocumentList: FunctionComponent<DocumentListProps> = ({ data, header, headerSpace, setData }: DocumentListProps) => {
  const popupInfo = [UPLOAD_HARD_COPY_DOCUMENTS.CONTENT_HARDCOPY_INFO_1, UPLOAD_HARD_COPY_DOCUMENTS.CONTENT_HARDCOPY_INFO_2];
  const popupContent = (
    <View>
      {popupInfo.map((eachContent: string, index: number) => (
        <View key={index} style={flexRow}>
          <Text style={fs12RegWhite1}>•</Text>
          <CustomSpacer isHorizontal={true} space={sw4} />
          <Text style={{ ...fs12RegWhite1, maxWidth: sw280 }}>{eachContent}</Text>
        </View>
      ))}
    </View>
  );
  return (
    <Fragment>
      {data !== undefined &&
        data !== null &&
        data.length > 0 &&
        data.map((relatedDocuments: ISoftCopyDocument, index: number) => {
          return (
            <View key={index}>
              {index === 0 ? null : <CustomSpacer space={sh16} />}
              {relatedDocuments.docs.map((document: ISoftCopyFile | undefined, documentIndex: number) => {
                const handleProof = (file: DocumentFileBase64 | undefined) => {
                  const updatedData = [...data];
                  const newValue = document !== undefined && document.title ? { title: document.title } : undefined;
                  const actualNewValue =
                    file === undefined ? newValue : { ...file, title: document?.title, isEditable: document?.isEditable };
                  updatedData[index].docs[documentIndex] = actualNewValue;
                  setData(updatedData);
                };
                const label = document !== undefined ? document.title : "Upload File";
                const actualValue: ISoftCopyFile | undefined =
                  document !== undefined && ((document.url !== undefined && document.url !== null) || document.path !== undefined)
                    ? document
                    : undefined;
                const checkName = relatedDocuments.name === "NRIC" ? UPLOAD_DOCUMENTS.LABEL_INVESTORS_ID : relatedDocuments.name;
                const checkIfUtmc = FILTER_ISSUING_HOUSE.findIndex((eachUtmc) => eachUtmc.value === relatedDocuments.name);
                const checkHeader =
                  header !== undefined ? (
                    header
                  ) : (
                    <Fragment>
                      <View style={rowCenterVertical}>
                        {checkIfUtmc !== -1 ? (
                          <Fragment>
                            <IcoMoon name="house" size={sw16} color={colorBlack._2} />
                            <CustomSpacer isHorizontal={true} space={sw8} />
                          </Fragment>
                        ) : null}
                        <Text style={fs14BoldBlack2}>{checkName}</Text>
                        {checkIfUtmc !== -1 ? (
                          <Fragment>
                            <CustomSpacer isHorizontal={true} space={sw8} />
                            <CustomTooltip
                              arrowSize={{ width: sw10, height: sh6 }}
                              content={popupContent}
                              contentStyle={{ width: sw317, height: sh96 }}
                              infoStyle={{ width: sw18, height: sh18 }}
                              theme="dark"
                            />
                          </Fragment>
                        ) : null}
                      </View>
                      <CustomSpacer space={sh8} />
                    </Fragment>
                  );

                const checkHeaderSpace = headerSpace === false ? null : <CustomSpacer space={sh8} />;
                const checkDisabled = !(isEmpty(document?.isEditable) || document?.isEditable === true);
                return (
                  <Fragment key={documentIndex}>
                    {documentIndex === 0 ? checkHeader : checkHeaderSpace}
                    <UploadWithModal
                      disabled={checkDisabled}
                      features={["camera", "gallery", "file"]}
                      label={label}
                      onSuccess={handleProof}
                      setValue={handleProof}
                      value={actualValue as FileBase64}
                    />
                  </Fragment>
                );
              })}
            </View>
          );
        })}
    </Fragment>
  );
};
