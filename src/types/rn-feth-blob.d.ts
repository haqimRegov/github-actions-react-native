declare interface IPolyfillBlob {
  build: (data: unknown, cType: unknown) => Promise<IPolyfillBlob>;
  close: () => Promise<void>;
  getRNFetchBlobRef: () => string;
  markAsDerived: () => void;
  onCreated: (fn: () => void) => IPolyfillBlob;
  readBlob: (encoding: string) => Promise<unknown>;
  slice: (start?: number, end?: number, contentType?: string) => IPolyfillBlob;
}
