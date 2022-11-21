import { isArrayNotEmpty, isNotEmpty } from "../utils";

export const getDocumentFile = (docSummary: IDocumentSummary, type: "id" | "cert", holder: TypeAccountHolder) => {
  const findCurrentInvestor =
    isNotEmpty(docSummary) && isNotEmpty(docSummary.softcopy) && isArrayNotEmpty(docSummary.softcopy.documents)
      ? docSummary.softcopy.documents
          .filter((eachOuterDoc) => isNotEmpty(eachOuterDoc.subHeader) && eachOuterDoc.subHeader.includes(holder))
          .map((eachFilteredDoc) => eachFilteredDoc)
      : [];

  const findFile = isArrayNotEmpty(findCurrentInvestor)
    ? findCurrentInvestor[0].documents.filter(
        (eachInnerDoc) =>
          isNotEmpty(eachInnerDoc.title) &&
          ((type === "id" && (eachInnerDoc.title.includes("Front") || eachInnerDoc.title.includes("Passport"))) ||
            (type === "cert" && eachInnerDoc.title.includes("Certificate of Loss of Nationality"))),
      )
    : [];

  return isArrayNotEmpty(findFile) ? findFile[0] : undefined;
};
