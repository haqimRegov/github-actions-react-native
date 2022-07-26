import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, UploadWithModal } from "../../../../components";
import { Language } from "../../../../constants/language";
import { FILTER_ISSUING_HOUSE } from "../../../../data/dictionary";
import { IcoMoon } from "../../../../icons";
import { borderBottomBlue5, colorBlack, flexChild, fs14BoldBlack2, rowCenterVertical, sh32, sh8, sw16, sw8 } from "../../../../styles";
import { isEmpty } from "../../../../utils";

const { UPLOAD_DOCUMENTS } = Language.PAGE;

interface DocumentListProps {
  data: ISoftCopyDocument[];
  header?: JSX.Element;
  headerSpace?: boolean;
  setData: (value: ISoftCopyDocument[]) => void;
}

export const DocumentList: FunctionComponent<DocumentListProps> = ({ data, header, headerSpace, setData }: DocumentListProps) => {
  return (
    <Fragment>
      {data !== undefined &&
        data !== null &&
        data.length > 0 &&
        data.map((relatedDocuments: ISoftCopyDocument, index: number) => {
          return (
            <View key={index}>
              {index === 0 ? null : <CustomSpacer space={sh32} />}
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
                        <CustomSpacer isHorizontal={true} space={sw16} />
                        <View style={{ ...borderBottomBlue5, ...flexChild }} />
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
