import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, TextSpaceArea, UploadWithModal } from "../../../../components";
import { fs12BoldBlack2, sh32, sh8 } from "../../../../styles";

interface DocumentListProps {
  data: ISoftCopyDocument[];
  setData: (value: ISoftCopyDocument[]) => void;
}

export const DocumentList: FunctionComponent<DocumentListProps> = ({ data, setData }: DocumentListProps) => {
  return (
    <Fragment>
      {data !== undefined &&
        data !== null &&
        data.length > 0 &&
        data.map((relatedDocuments: ISoftCopyDocument, index: number) => {
          return (
            <View key={index}>
              {index === 0 ? null : <CustomSpacer space={sh32} />}
              {relatedDocuments.docs.map((document: DocumentFileBase64 | undefined, documentIndex: number) => {
                const resourceType = document?.url !== undefined ? "url" : "file";
                const handleProof = (file: DocumentFileBase64 | undefined) => {
                  const updatedData = [...data];
                  const newValue = document !== undefined && document.title ? { title: document.title } : undefined;
                  const actualNewValue = file === undefined ? newValue : { ...file, title: document?.title };
                  updatedData[index].docs[documentIndex] = actualNewValue;
                  setData(updatedData);
                };
                const label = document !== undefined ? document.title : "Upload File";
                const actualValue: DocumentFileBase64 | undefined =
                  document !== undefined && ((document.url !== undefined && document.url !== null) || document.path !== undefined)
                    ? document
                    : undefined;

                return (
                  <Fragment key={documentIndex}>
                    {documentIndex === 0 ? (
                      <TextSpaceArea spaceToBottom={sh8} style={fs12BoldBlack2} text={relatedDocuments.name} />
                    ) : (
                      <CustomSpacer space={sh8} />
                    )}

                    <UploadWithModal
                      features={["camera", "file", "gallery"]}
                      label={label}
                      onSuccess={handleProof}
                      resourceType={resourceType}
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
