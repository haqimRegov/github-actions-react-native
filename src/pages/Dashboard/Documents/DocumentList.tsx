import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, TextSpaceArea, UploadWithModal } from "../../../components";
import { fs12BoldBlack2, sh32, sh8 } from "../../../styles";

interface DocumentListProps {
  data: IRelatedDocuments[];
  setData: (value: IRelatedDocuments[]) => void;
}

export const DocumentList: FunctionComponent<DocumentListProps> = ({ data, setData }: DocumentListProps) => {
  return (
    <Fragment>
      {data.map((relatedDocuments: IRelatedDocuments, index: number) => {
        return (
          <View key={index}>
            {index === 0 ? null : <CustomSpacer space={sh32} />}
            <TextSpaceArea style={fs12BoldBlack2} text={relatedDocuments.label} />
            {relatedDocuments.documents.map(({ document, reference }: IDocument, documentIndex: number) => {
              const resourceType = document?.url !== undefined ? "url" : "file";
              const handleProof = (file: FileBase64 | undefined) => {
                const updatedData = [...data];
                updatedData[index].documents[documentIndex].document = file;
                setData(updatedData);
              };
              return (
                <Fragment key={documentIndex}>
                  {documentIndex === 0 ? null : <CustomSpacer space={sh8} />}
                  <UploadWithModal
                    features={["camera", "file", "gallery"]}
                    label={reference}
                    onSuccess={handleProof}
                    resourceType={resourceType}
                    setValue={handleProof}
                    value={document!}
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
