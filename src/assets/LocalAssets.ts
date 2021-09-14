import { COUNTRY_FLAG } from "./images/country_flag";
import illustrationClientError from "./images/illustration_client_error/illustration_client_error.png";
import illustrationClientWarning from "./images/illustration_client_warning/illustration_client_warning.png";
import illustrationEmailVerified from "./images/illustration_email_verified/illustration_email_verified.png";
import illustrationHardcopySuccess from "./images/illustration_hardcopy_success/illustration_hardcopy_success.png";
import illustrationInboxEmpty from "./images/illustration_inbox_empty/illustration_inbox_empty.png";
import illustrationLoginError from "./images/illustration_login_error/illustration_login_error.png";
import illustrationNoResults from "./images/illustration_no_results/illustration_no_results.png";
import illustrationOrderReceived from "./images/illustration_order_received/illustration_order_received.png";
import illustrationOrderSaved from "./images/illustration_order_saved/illustration_order_saved.png";
import illustrationProfileSuccess from "./images/illustration_profile_success/illustration_profile_success.png";
import illustrationReceiptSuccess from "./images/illustration_receipt_success/illustration_receipt_success.png";
import illustrationSessionExpired from "./images/illustration_session_expired/illustration_session_expired.png";
import kenangaBrandLogo from "./images/kenanga_brand_logo/kenanga_brand_logo.png";
import kenangaFooter from "./images/kenanga_footer/kenanga_footer.png";
import kenangaTower from "./images/kenanga_tower/kenanga_tower.png";
import logoAims from "./images/logo_aims/logo_aims.png";
import riskAssessmentGraph1 from "./images/risk_assessment_graph_1/risk_assessment_graph_1.png";
import riskAssessmentGraph2 from "./images/risk_assessment_graph_2/risk_assessment_graph_2.png";
import tooltipAddSign from "./images/tooltip_add_sign/tooltip_add_sign.png";
import tooltipFilter from "./images/tooltip_filter/tooltip_filter.png";
import tooltipProceed from "./images/tooltip_proceed/tooltip_proceed.png";

export const LocalAssets = {
  flag: {
    ...COUNTRY_FLAG,
  },
  graph: {
    risk_assessment_graph_1: riskAssessmentGraph1,
    risk_assessment_graph_2: riskAssessmentGraph2,
  },
  illustration: {
    clientError: illustrationClientError,
    clientWarning: illustrationClientWarning,
    emailVerified: illustrationEmailVerified,
    hardcopySuccess: illustrationHardcopySuccess,
    inboxEmpty: illustrationInboxEmpty,
    loginError: illustrationLoginError,
    noResults: illustrationNoResults,
    orderReceived: illustrationOrderReceived,
    orderSaved: illustrationOrderSaved,
    profileSuccess: illustrationProfileSuccess,
    receiptSuccess: illustrationReceiptSuccess,
    sessionExpired: illustrationSessionExpired,
  },
  login: {
    background: kenangaTower,
  },
  logo: {
    aims: logoAims,
    kenangaBrand: kenangaBrandLogo,
  },
  splash: {
    footer: kenangaFooter,
  },
  tooltip: {
    addSign: tooltipAddSign,
    filter: tooltipFilter,
    proceed: tooltipProceed,
  },
};
