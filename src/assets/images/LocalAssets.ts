import backgroundLoginSit from "./background_login_sit/background_login_sit.png";
import backgroundLoginStg from "./background_login_stg/background_login_stg.png";
import backgroundLoginUat from "./background_login_uat/background_login_uat.png";
import { COUNTRY_FLAG } from "./country_flag";
import iconWarning from "./icon_warning_filled/icon_warning_filled.png";
import illustrationAccountsEmpty from "./illustration_accounts_empty/illustration_accounts_empty.png";
import illustrationClientError from "./illustration_client_error/illustration_client_error.png";
import illustrationClientWarning from "./illustration_client_warning/illustration_client_warning.png";
import illustrationEDDEmpty from "./illustration_edd_empty/illustration_edd_empty.png";
import illustrationEDDSubmitted from "./illustration_edd_submitted/illustration_edd_submitted.png";
import illustrationEmailVerified from "./illustration_email_verified/illustration_email_verified.png";
import illustrationGlobalError from "./illustration_global_error/illustration_global_error.png";
import illustrationHardcopySuccess from "./illustration_hardcopy_success/illustration_hardcopy_success.png";
import illustrationInboxEmpty from "./illustration_inbox_empty/illustration_inbox_empty.png";
import illustrationInvestorWarning from "./illustration_investor_warning/illustration_investor_warning.png";
import illustrationInvestorsEmpty from "./illustration_investors_empty/illustration_investors_empty.png";
import illustrationLoginError from "./illustration_login_error/illustration_login_error.png";
import illustrationMinorSales from "./illustration_minor_sales/Illustration_minor_sales.png";
import illustrationNoResults from "./illustration_no_results/illustration_no_results.png";
import illustrationOrderReceived from "./illustration_order_received/illustration_order_received.png";
import illustrationOrderSaved from "./illustration_order_saved/illustration_order_saved.png";
import illustrationPasswordUpdated from "./illustration_password_updated/illustration_password_updated.png";
import illustrationProfileSuccess from "./illustration_profile_success/illustration_profile_success.png";
import illustrationReceiptSuccess from "./illustration_receipt_success/illustration_receipt_success.png";
import illustrationSessionExpired from "./illustration_session_expired/illustration_session_expired.png";
import kenangaBrandLogo from "./kenanga_brand_logo/kenanga_brand_logo.png";
import kenangaFooter from "./kenanga_footer/kenanga_footer.png";
import kenangaTower from "./kenanga_tower/kenanga_tower.png";
import logoAims from "./logo_aims/logo_aims.png";
import riskAssessmentGraph1 from "./risk_assessment_graph_1/risk_assessment_graph_1.png";
import riskAssessmentGraph2 from "./risk_assessment_graph_2/risk_assessment_graph_2.png";
import tooltipAddSign from "./tooltip_add_sign/tooltip_add_sign.png";
import tooltipFilter from "./tooltip_filter/tooltip_filter.png";
import tooltipProceed from "./tooltip_proceed/tooltip_proceed.png";

export const LocalAssets = {
  flag: {
    ...COUNTRY_FLAG,
  },
  graph: {
    risk_assessment_graph_1: riskAssessmentGraph1,
    risk_assessment_graph_2: riskAssessmentGraph2,
  },
  icon: {
    iconWarning: iconWarning,
  },
  illustration: {
    accountsEmpty: illustrationAccountsEmpty,
    clientError: illustrationClientError,
    clientWarning: illustrationClientWarning,
    emailVerified: illustrationEmailVerified,
    eddEmpty: illustrationEDDEmpty,
    eddSubmitted: illustrationEDDSubmitted,
    hardcopySuccess: illustrationHardcopySuccess,
    inboxEmpty: illustrationInboxEmpty,
    investorsEmpty: illustrationInvestorsEmpty,
    investorWarning: illustrationInvestorWarning,
    globalError: illustrationGlobalError,
    loginError: illustrationLoginError,
    minorSales: illustrationMinorSales,
    noResults: illustrationNoResults,
    orderReceived: illustrationOrderReceived,
    orderSaved: illustrationOrderSaved,
    passwordUpdated: illustrationPasswordUpdated,
    profileSuccess: illustrationProfileSuccess,
    receiptSuccess: illustrationReceiptSuccess,
    sessionExpired: illustrationSessionExpired,
  },
  login: {
    background: {
      prod: kenangaTower,
      staging: backgroundLoginStg,
      uat: backgroundLoginUat,
      sit: backgroundLoginSit,
    },
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
