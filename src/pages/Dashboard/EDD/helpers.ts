import { Storage } from "aws-amplify";
import { Alert } from "react-native";
import RNFetchBlob from "rn-fetch-blob";

import { deleteKey } from "../../../utils";
import { IKey } from "./NewCase";

const Blob: IPolyfillBlob = RNFetchBlob.polyfill.Blob as IPolyfillBlob;

const handleS3Upload = async (responseToSubmit: IEDDResponse, caseId: string, reRouteCount: number) => {
  const dataToSubmit = responseToSubmit.questions.map(async (question: IEDDQuestion) => {
    const { data, id, title } = question;
    const { answers } = data!;
    const promises = answers.map(async (answer: IQuestionData) => {
      const { hasDoc, document } = answer;
      if (hasDoc === true && document !== undefined) {
        const path = `edd/${caseId}/${reRouteCount}/document/${document!.name}`;
        // Cannot upload the base64. So, using the path to get file and convert it to blob.
        const documentObject = document.type !== "application/pdf" ? await fetch(document!.path!) : undefined;
        let pdfObject: Response | undefined;
        if (documentObject === undefined) {
          const blobObject = await Blob.build(document.base64, { type: "application/pdf;base64" });
          const pdfPath = blobObject.getRNFetchBlobRef();
          pdfObject = await fetch(pdfPath);
        }
        const documentBlob =
          documentObject === undefined && pdfObject !== undefined ? await pdfObject.blob() : await documentObject!.blob();
        const params = {
          contentType: document!.type,
          level: "public",
          // If not specified, the upload will go by default inside a public directory.
          customPrefix: {
            public: "",
          },
        };
        const upload = await Storage.put(path, documentBlob, params)
          .then((result) => {
            return result;
          })
          .catch((error) => Alert.alert(error.message));
        return upload;
      }
      return false;
    });
    const promiseResolved: IKey[] = (await Promise.all(promises)) as IKey[];
    const tempAnswers: IQuestionDataRequest[] = [];
    answers.forEach((tempAnswer: IQuestionData, tempIndex: number) => {
      const { hasDoc } = tempAnswer;
      const updatedTempAnswer: IQuestionData = deleteKey(tempAnswer, ["checkboxToggle"]);
      const { document } = updatedTempAnswer;
      const checkHasSub = "subSection" in tempAnswer ? { hasSub: true } : {};
      if (hasDoc === true) {
        const deleteUnwanted: FileBase64 = deleteKey(document!, ["base64", "path"]) as FileBase64;
        tempAnswers.push({ ...updatedTempAnswer, document: [{ ...deleteUnwanted, url: promiseResolved[tempIndex].key }], ...checkHasSub });
      } else {
        const deleteDocument = deleteKey(updatedTempAnswer, ["document"]);
        tempAnswers.push({ ...deleteDocument, ...checkHasSub });
      }
    });
    // Additional question does not have id. So we need to send the title as per backend.
    return { question: id !== null ? id : title, answers: tempAnswers };
  });
  return Promise.all(dataToSubmit);
};

export const handleDataToSubmit = async (responseToSubmit: IEDDResponse, caseId: string, reRerouteCount: number) => {
  const resolvedDataToSubmit = await handleS3Upload(responseToSubmit, caseId, reRerouteCount);
  const defaultAnswers: IAnswer[] = [...resolvedDataToSubmit];
  const additionalAnswers: IAnswer[] = [];
  const allAnswers: IAnswer[] = [];
  const formattedAdditionalData: IAnswerStringified[] = [];
  const formattedAnswers: IAnswerStringified[] = [];
  responseToSubmit.questions.forEach((eachQuestion: IEDDQuestion, eachQuestionIndex: number) => {
    const { title, id } = eachQuestion;

    if (title === defaultAnswers[eachQuestionIndex].question || defaultAnswers[eachQuestionIndex].question === undefined) {
      additionalAnswers.push({ question: title, answers: defaultAnswers[eachQuestionIndex].answers });
    } else {
      allAnswers.push({ question: id, answers: defaultAnswers[eachQuestionIndex].answers });
    }
  });
  const filteredAnswers: IAnswer[] = allAnswers.filter((answerToFilter: IAnswer) => answerToFilter.answers.length > 0);
  const filteredAdditionalAnswers: IAnswer[] = additionalAnswers.filter((answerToFilter: IAnswer) => answerToFilter.answers.length > 0);
  filteredAnswers.forEach((answer: IAnswer) => {
    const { question, answers } = answer;
    formattedAnswers.push({ question: question, answers: JSON.stringify(answers) });
  });
  if (filteredAdditionalAnswers.length > 0) {
    filteredAdditionalAnswers.forEach((additional: IAnswer) => {
      const { question, answers } = additional;
      formattedAdditionalData.push({
        question: question,
        answers: JSON.stringify([{ ...answers[0], answer: null }]),
      });
    });
  }
  return { formattedAnswers, formattedAdditionalData };
};
