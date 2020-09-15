declare interface IDocument {
  reference: string;
  document?: FileBase64;
}

declare interface IRelatedDocuments {
  label: string;
  documents: IDocument[];
}

declare interface IPersonalDocuments {
  principal?: IRelatedDocuments[];
  joint?: IRelatedDocuments[];
}
