import { OPTIONS_FATCA_NO_CERTIFICATE } from "../data/dictionary";

export const getFatcaRequest = (fatca: IFatcaState) => {
  const principalUsCitizen = fatca.usCitizen! === 0;
  const principalUsBorn = fatca.usBorn! === 0 ? "true" : "false";
  const principalCertReason = fatca.reason! === 1 ? fatca.explanation! : OPTIONS_FATCA_NO_CERTIFICATE[0].label;
  const principalConfirmAddress = fatca.confirmAddress! === 0 ? "true" : "false";

  const usBornRequest = principalUsCitizen === true ? {} : { usBorn: principalUsBorn };
  const confirmAddressRequest = principalUsBorn === "false" ? {} : { confirmAddress: principalConfirmAddress };
  const formW8BenRequest = principalUsBorn === "false" || principalConfirmAddress === "false" ? {} : { formW8Ben: `${fatca.formW8Ben!}` };
  const noCertificateRequest = principalUsBorn === "true" ? { noCertificate: `${fatca.noCertificate}` } : {};
  const noCertificateReasonRequest = principalUsBorn === "true" && fatca.noCertificate === true ? { reason: principalCertReason } : {};
  const certificateRequest = principalUsBorn === "true" && fatca.certificate !== undefined ? { certificate: fatca.certificate } : {};

  return {
    usCitizen: principalUsCitizen === true ? "true" : "false",
    formW9: principalUsCitizen === true ? "true" : "false",
    ...usBornRequest,
    ...confirmAddressRequest,
    ...formW8BenRequest,
    ...noCertificateRequest,
    ...certificateRequest,
    ...noCertificateReasonRequest,
  };
};
