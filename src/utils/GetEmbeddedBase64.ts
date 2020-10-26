export const GetEmbeddedBase64 = (fileBase64: FileBase64) => {
  return `data:${fileBase64.type};base64,${fileBase64.base64}`;
};
