import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, TextSpaceArea, UploadWithModal } from "../../../../components";
import { Language } from "../../../../constants/language";
import { fs12BoldGray6, sh32, sh8 } from "../../../../styles";
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
                const checkHeader =
                  header !== undefined ? header : <TextSpaceArea spaceToBottom={sh8} style={fs12BoldGray6} text={checkName} />;
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
