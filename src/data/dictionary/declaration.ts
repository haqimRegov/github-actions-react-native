import { Language } from "../../constants";
import { sh16 } from "../../styles";

const { DECLARATIONS } = Language.PAGE;

export const OPTIONS_FATCA_NO_CERTIFICATE: ICheckBoxWithSubLabel[] = [
  { label: DECLARATIONS.LABEL_REASON_LOST },
  { label: DECLARATIONS.LABEL_REASON_OTHER },
];

export const OPTIONS_FEA_FACILITY: ICheckBoxWithSubLabel[] = [
  { label: DECLARATIONS.LABEL_FEA_DOMESTICS },
  { label: DECLARATIONS.LABEL_FEA_NON_DOMESTICS },
];

export const OPTIONS_CRS_TAX_RESIDENCY: ICheckBoxWithSubLabel[] = [
  { label: DECLARATIONS.OPTION_MALAYSIAN_TAX },
  { label: DECLARATIONS.OPTION_MALAYSIAN_NON_TAX },
  { label: DECLARATIONS.OPTION_NON_MALAYSIAN },
];

export const OPTIONS_CRS_TIN_REASONS: ICheckBoxWithSubLabel[] = [
  { label: DECLARATIONS.OPTION_NO_TIN_COUNTRY, labelStyle: { lineHeight: sh16 } },
  { label: DECLARATIONS.OPTION_NO_TIN_REQUIRED, labelStyle: { lineHeight: sh16 } },
  { label: DECLARATIONS.OPTION_NO_TIN_OTHER, labelStyle: { lineHeight: sh16 } },
];

export const OPTION_CRS_NO_TIN_REQUIRED: string = DECLARATIONS.OPTION_NO_TIN_REQUIRED_ACTUAL;
