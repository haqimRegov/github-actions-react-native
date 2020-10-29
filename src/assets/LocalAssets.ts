import paper from "./getting_started/document.png";
import documents from "./getting_started/papers.png";
import illustrationLoginError from "./illustration_login_error/illustration_login_error.png";
import kenanga from "./kenanga/kenanga.png";
import logoAims from "./logo_aims/logo_aims.png";
import logoKenanga from "./logo_kenanga/logo_kenanga.png";
import logoKenangaInvestors from "./logo_kenanga_investors/logo_kenanga_investors.png";
import onboardingPeople from "./onboarding_people/onboarding_people.png";
import riskAssessmentGraph1 from "./risk_assessment_graph_1/risk_assessment_graph_1.png";
import riskAssessmentGraph2 from "./risk_assessment_graph_2/risk_assessment_graph_2.png";
import uploadSuccess from "./upload_success/upload_success.png";

export const LocalAssets = {
  addClient: {
    documents: documents,
    paper: paper,
  },
  graph: {
    risk_assessment_graph_1: riskAssessmentGraph1,
    risk_assessment_graph_2: riskAssessmentGraph2,
  },
  illustration: {
    login_error: illustrationLoginError,
  },
  login: {
    background: kenanga,
  },
  logo: {
    aims: logoAims,
    kenanga: logoKenanga,
    kenanga_investors: logoKenangaInvestors,
  },
  onboarding: {
    people: onboardingPeople,
  },
  uploadSuccess: {
    uploadSuccess: uploadSuccess,
  },
};
