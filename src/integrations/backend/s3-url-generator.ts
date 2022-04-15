import moment from "moment";
import { v1 as uuidv1 } from "uuid";

import { HARDCOPY_DATE_TIME_FORMAT } from "../../constants";
import { camelCaseString } from "../../utils";

const payment = (clientId: string, orderNumber: string, paymentType: TypePaymentType, paymentMethod: TypePaymentMethod, mime: string) => {
  const ext = mime !== undefined ? mime.substring(mime.lastIndexOf("/") + 1) : "";
  const uuid = uuidv1();

  return `clients/${clientId}/${orderNumber}/POP/${paymentType.toUpperCase()}/${camelCaseString(paymentMethod)}_${uuid}.${ext}`;
};

const hardcopy = (clientId: string, orderNumber: string, labelName: string, documentName: string, mime: string) => {
  const ext = mime.substring(mime.lastIndexOf("/") + 1);
  const cleanDocumentName = camelCaseString(documentName).replace("_", "");
  const cleanLabelName = camelCaseString(labelName).replace("_", "");

  return `clients/${clientId}/${orderNumber}/HARDCOPY/${cleanLabelName}_${cleanDocumentName}-${moment().format(
    HARDCOPY_DATE_TIME_FORMAT,
  )}.${ext}`;
};

const hardcopyAccount = (clientId: string, orderNumber: string, accountHolder: TypeAccountHolder, documentName: string, mime: string) => {
  const ext = mime.substring(mime.lastIndexOf("/") + 1);
  const cleanDocumentName = camelCaseString(documentName).replace("_", "");
  const checkAccountHolder = accountHolder === "Principal" ? "_principal" : "_joint";

  return `clients/${clientId}/${orderNumber}/HARDCOPY/account_${cleanDocumentName}${checkAccountHolder}-${moment().format(
    HARDCOPY_DATE_TIME_FORMAT,
  )}.${ext}`;
};

const document = (clientId: string, type: string, mime: string) => {
  const ext = mime.substring(mime.lastIndexOf("/") + 1);

  return `clients/${clientId}/IDENTIFICATION/${type}-${moment().format(HARDCOPY_DATE_TIME_FORMAT)}.${ext}`;
};

export const S3UrlGenerator = { document, hardcopy, hardcopyAccount, payment };
