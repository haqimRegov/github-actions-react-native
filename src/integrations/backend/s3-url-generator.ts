import moment from "moment";
import { v1 as uuidv1 } from "uuid";

import { HARDCOPY_DATE_TIME_FORMAT } from "../../constants";

export const payment = (
  clientId: string,
  orderNumber: string,
  paymentType: TypePaymentType,
  paymentMethod: TypePaymentMethod,
  mime: string,
) => {
  const ext = mime !== undefined ? mime.substring(mime.lastIndexOf("/") + 1) : "";
  const uuid = uuidv1();
  let method = "";
  if (paymentMethod === "Client Trust Account (CTA)") {
    method = "clientTrustAccountCta";
  } else if (paymentMethod === "Online Banking / TT / ATM") {
    method = "onlineBankingTtAtm";
  } else if (paymentMethod === "Cheque") {
    method = "cheque";
  }

  return `clients/${clientId}/${orderNumber}/POP/${paymentType.toUpperCase()}/${method}_${uuid}.${ext}`;
};

export const hardcopy = (clientId: string, orderNumber: string, labelName: string, documentName: string, mime: string) => {
  const ext = mime.substring(mime.lastIndexOf("/") + 1);

  return `clients/${clientId}/${orderNumber}/HARDCOPY/${labelName}_${documentName}-${moment().format(HARDCOPY_DATE_TIME_FORMAT)}.${ext}`;
};

export const document = (clientId: string, type: string, mime: string) => {
  const ext = mime.substring(mime.lastIndexOf("/") + 1);

  return `clients/${clientId}/IDENTIFICATION/${type}-${moment().format(HARDCOPY_DATE_TIME_FORMAT)}.${ext}`;
};

export const S3UrlGenerator = { document, hardcopy, payment };
