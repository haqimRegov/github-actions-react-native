import illustrationClientError from "./illustration_client_error/illustration_client_error.png";
import illustrationClientWarning from "./illustration_client_warning/illustration_client_warning.png";
import illustrationEmailVerified from "./illustration_email_verified/illustration_email_verified.png";
import illustrationHardcopySuccess from "./illustration_hardcopy_success/illustration_hardcopy_success.png";
import illustrationInboxEmpty from "./illustration_inbox_empty/illustration_inbox_empty.png";
import illustrationLoginError from "./illustration_login_error/illustration_login_error.png";
import illustrationNoResults from "./illustration_no_results/illustration_no_results.png";
import illustrationOrderReceived from "./illustration_order_received/illustration_order_received.png";
import illustrationProfileSuccess from "./illustration_profile_success/illustration_profile_success.png";
import illustrationSubmissionSummary from "./illustration_submission_success/illustration_submission_success.png";
import illustrationTransactionsEmpty from "./illustration_transactions_empty/illustration_transactions_empty.png";
import illustrationUploadSuccess from "./illustration_upload_success/illustration_upload_success.png";
import kenanga from "./kenanga/kenanga.png";
import logoAims from "./logo_aims/logo_aims.png";
import logoKenangaInvestors from "./logo_kenanga_investors/logo_kenanga_investors.png";
import riskAssessmentGraph1 from "./risk_assessment_graph_1/risk_assessment_graph_1.png";
import riskAssessmentGraph2 from "./risk_assessment_graph_2/risk_assessment_graph_2.png";

export const LocalAssets = {
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
    profileSuccess: illustrationProfileSuccess,
    submissionSummary: illustrationSubmissionSummary,
    transactionsEmpty: illustrationTransactionsEmpty,
    uploadSuccess: illustrationUploadSuccess,
  },
  login: {
    background: kenanga,
  },
  logo: {
    aims: logoAims,
    kenanga: logoKenangaInvestors,
  },
};
