declare interface IPolyfillBlob {
  build: (data: any, cType: any) => Promise<IPolyfillBlob>;
  close: () => Promise<void>;
  getRNFetchBlobRef: () => string;
  markAsDerived: () => void;
  onCreated: (fn: () => void) => IPolyfillBlob;
  readBlob: (encoding: string) => Promise<any>;
  slice: (start?: number, end?: number, contentType?: string) => IPolyfillBlob;
}
