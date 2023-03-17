// export const SUITABILITY_ASSESSMENT: ITermsAndConditions = {
//   title: "Suitability Assessment",
//   subsection: [
//     {
//       termsList: [
//         {
//           content:
//             "The authorized distributor has explained and I have understood the features and the risks of the recommended investment. \nAll information disclosed herein is true, complete and accurate. \nI acknowledged receipt of the copy of the Product Highlights Sheet and relevant disclosure document.\nI have decided to purchase another unlisted capital market product that is not recommended by the authorized distributor",
//         },
//       ],
//     },
//   ],
// };
import { sw16, sw24, sw32, sw8 } from "../../styles";

// export const PDPA_CONSENT: ITermsAndConditions = {
//   title: "PDPA",
//   subsection: [
//     {
//       termsList: [
//         {
//           content:
//             "I/We hereby consent for Kenanga Group to deal and process my/our personal data in accordance with the Personal Data Protection Notice on pages 11 - 12 of this Account Opening & Investment Form, as may be amended or supplemented from time to time. I/We confirm that I/we have read and understood the Personal Data Protection Notice and accept the terms and conditions. (For the most current version of the Personal Data Protection Notice at all material times, please refer to the posting on https://kenanga.com.my.)",
//         },
//       ],
//     },
//   ],
// };

export const FATCA: ITermsAndConditions = {
  title: "Foreign Account Tax Compliance Act (FATCA) Declaration & Definition",
  subsection: [
    {
      heading: "Declaration",
      termsList: [
        {
          content: [
            {
              prefix: "•",
              text: "I represent and declare that the information provided above is true, accurate and complete. I understand that the term ”U.S. person(1)” means any citizen or resident of the United States, and shall include the definition below.",
            },
            {
              prefix: "•",
              text: "I hereby consent for Kenanga Group to disclose/report my information to any person, including the Inland Revenue Board of Malaysia and the regulatory authorities in accordance with the requirements of Foreign Account Tax Compliance Act 2010 (“FATCA”) as may be stipulated by applicable laws, regulations, agreement or regulatory guidelines or directives.",
            },
            {
              prefix: "•",
              text: "I hereby consent that Kenanga Group may withhold from my account(s) such amounts in accordance with the requirements of FATCA as may be stipulated by applicable laws, regulations, agreement or regulatory guidelines or directives.",
            },
            {
              prefix: "•",
              text: "If there is any change in the information provided to Kenanga Group that makes me a U.S. person or recalcitrant (person who fails to comply with reasonable requests for information to determine if this account belongs to a U.S. person), Kenanga Group has the right to terminate my account(s) and/or facilities granted to me.",
            },
            {
              prefix: "•",
              text: "I undertake to notify Kenanga Group in writing within 30 calendar days if there is a change in any information which I have provided to Kenanga Group.",
            },
          ],
        },
      ],
    },
    {
      heading: "Definition",
      termsList: [
        {
          content: [
            {
              prefix: "•",
              text: "The term U.S. person or United States person means a person described in section 7701(a)(30) of the Internal Revenue Code:",
            },
            { indentSpace: sw16, prefix: "1.", text: "a citizen or resident of the United States," },
            { indentSpace: sw16, prefix: "2.", text: "a United States partnership," },
            { indentSpace: sw16, prefix: "3.", text: "a United States corporation," },
            {
              indentSpace: sw16,
              prefix: "4.",
              text: "any estate (other than an estate the income of which, from sources without the United States which is not effectively connected with the conduct of a trade or business within the United States, is not includible in gross income under the Internal Revenue Code), and",
            },
            { indentSpace: sw16, prefix: "5.", text: "any trust if—" },
            {
              indentSpace: sw32,
              prefix: "a.",
              text: "A court within the United States is able to exercise primary supervision over the administration of the trust, and",
            },
            {
              indentSpace: sw32,
              prefix: "b.",
              text: "One or more United States persons have the authority to control all substantial decisions of the trust.",
            },
          ],
        },
      ],
    },
  ],
};
export const FATCA_NEW: ITermsAndConditions = {
  title: "Foreign Account Tax Compliance Act (FATCA) Declaration & Definition",
  subsection: [
    {
      heading: "Declaration",
      termsList: [
        {
          content: [
            {
              text: "I represent and declare that the information provided above is true, accurate and complete. I understand that the term ”U.S. person(1)” means any citizen or resident of the United States, and shall include the definition below.",
            },
            {
              text: "I hereby consent for Kenanga Group to disclose/report my information to any person, including the Inland Revenue Board of Malaysia and the regulatory authorities in accordance with the requirements of Foreign Account Tax Compliance Act 2010 (“FATCA”) as may be stipulated by applicable laws, regulations, agreement or regulatory guidelines or directives.",
            },
            {
              text: "I hereby consent that Kenanga Group may withhold from my account(s) such amounts in accordance with the requirements of FATCA as may be stipulated by applicable laws, regulations, agreement or regulatory guidelines or directives.",
            },
            {
              text: "If there is any change in the information provided to Kenanga Group that makes me a U.S. person or recalcitrant (person who fails to comply with reasonable requests for information to determine if this account belongs to a U.S. person), Kenanga Group has the right to terminate my account(s) and/or facilities granted to me.",
            },
            {
              text: "I undertake to notify Kenanga Group in writing within 30 calendar days if there is a change in any information which I have provided to Kenanga Group.",
            },
          ],
        },
      ],
    },
    {
      heading: "Definition",
      termsList: [
        {
          content: [
            {
              text: "The term U.S. person or United States person means a person described in section 7701(a)(30) of the Internal Revenue Code:",
            },
            {
              indentSpace: sw8,
              text: "1. a citizen or resident of the United States, \n2. a United States partnership, \n3. a United States corporation, \n4. any estate (other than an estate the income of which, from sources without the United States which is not effectively connected with the conduct of a trade or business \n    within the United States, is not includible in gross income under the Internal Revenue Code), and \n5. any trust if—",
            },
            {
              indentSpace: sw16,
              text: "a. A court within the United States is able to exercise primary supervision over the administration of the trust, and \nb. One or more United States persons have the authority to control all substantial decisions of the trust.",
            },
          ],
        },
      ],
    },
  ],
};

export const CRS: ITermsAndConditions = {
  title: "Common Reporting Standard (CRS) Declaration & Definitions",
  subsection: [
    {
      heading: "Declaration",
      termsList: [
        {
          content: [
            {
              prefix: "•",
              text: "I understand that the information supplied by me is covered by the whole provisions of the terms and conditions governing my relationship with Kenanga Group, setting out how Kenanga Group may use and share the information supplied by me.",
            },
            {
              prefix: "•",
              text: "I acknowledge that the information contained in this e-Form and information regarding myself and any reportable account(s) may be provided to the tax authorities of the country/jurisdiction in which this account(s) is/are maintained and exchanged with the tax authorities of another country/jurisdictions in which I may be a tax resident of, pursuant to the intergovernmental agreements to exchange financial account information.",
            },
            { prefix: "•", text: "I certify that I am the beneficial owner of all the account(s) to which this e-Form relates." },
            {
              prefix: "•",
              text: "I undertake to advise Kenanga Group within 30 days of any change in circumstances that affects the status of my tax residency or causes the information contained herein to become incorrect or incomplete and to provide Kenanga Group with a suitably updated self-certification and declaration within 30 days of such change in circumstance.",
            },
          ],
        },
      ],
    },
    {
      heading: "Definitions",
      termsList: [
        {
          label: "1. Taxpayer Identification Number(TIN)",
          content: [
            {
              text: "The term TIN means Taxpayer Identification Number or a functional equivalent in the absence of a TIN. A TIN is a unique combination of letters or numbers assigned by a jurisdiction to an individual and is used to identify the individual for the purpose of administering the tax laws of such jurisdiction. E.g. in Malaysia, the TIN will be the identification number issued by the Inland Revenue Board of Malaysia to individuals.",
            },
          ],
        },
        {
          label: "2. Malaysian Tax Resident",
          content: [
            {
              text: "For the definition of Malaysian Tax Resident, refer to the link:  http://lampiran.hasil.gov.my/pdf/pdfam/3656.pdf",
            },
          ],
        },
      ],
    },
  ],
};
export const CRS_NEW: ITermsAndConditions = {
  title: "Common Reporting Standard (CRS) Declaration & Definitions",
  subsection: [
    {
      heading: "Declaration",
      termsList: [
        {
          content: [
            // {
            //   text: "I represent and declare that I am a Malaysian and Non-Malaysian tax resident.",
            // },
            // {
            //   text: "I declare that I don't have a Tax Identification Number (TIN) due to [user selected remark will be displayed here].  ",
            // },
            {
              text: "I acknowledge that the information contained in this e-Form and information regarding myself and any reportable account(s) may be provided to the tax authorities of the country/jurisdiction in which this account(s) is/are maintained and exchanged with the tax authorities of another country/jurisdictions in which I may be a tax resident of, pursuant to the intergovernmental agreements to exchange financial account information.",
            },
            {
              text: "I certify that I am the beneficial owner of all the account(s) to which this e-Form relates.",
            },
            {
              text: "I undertake to advise Kenanga Group within 30 days of any change in circumstances that affects the status of my tax residency or causes the information contained herein to become incorrect or incomplete and to provide Kenanga Group with a suitably updated self-certification and declaration within 30 days of such change in circumstance.",
            },
          ],
        },
      ],
    },
    {
      heading: "Definitions",
      termsList: [
        {
          label: "1. Taxpayer Identification Number(TIN)",
          content: [
            {
              text: "The term TIN means Taxpayer Identification Number or a functional equivalent in the absence of a TIN. A TIN is a unique combination of letters or numbers assigned by a jurisdiction to an individual and is used to identify the individual for the purpose of administering the tax laws of such jurisdiction. E.g. in Malaysia, the TIN will be the identification number issued by the Inland Revenue Board of Malaysia to individuals.",
            },
          ],
        },
        {
          label: "2. Malaysian Tax Resident",
          content: [
            {
              text: "For the definition of Malaysian Tax Resident, refer to the link:  http://lampiran.hasil.gov.my/pdf/pdfam/3656.pdf",
            },
          ],
        },
      ],
    },
  ],
};
export const INVESTOR_UPDATE: ITermsAndConditions = {
  title: "Investor Update Terms and Conditions",
  subsection: [
    {
      heading: "Change of details/particulars through the electronic channel (E-Services)",
      termsList: [
        {
          content: [
            {
              prefix: "1.",
              text: "This request for change of my personal or account details/particulars (“Change Request”)  is based solely on my/our instructions . Kenanga Investors Berhad (KIB)  may approve or reject my/our request at its sole discretion. I/We  acknowledge the receipt of and agree to abide by the terms and conditions of KIB’s General Terms and Conditions Governing Fund Investments (“General Terms and Conditions”)  , a copy of which was provided to me/us upon the opening of my/our account with KIB.",
            },
            {
              prefix: "2.",
              text: "This Change Request will not be processed unless it has been signed by the authorized unitholder(s)/member(s) of the Unit Trust or PRS Account  opened with KIB. For changes involving joint accounts where the joint holder is a minor (Unit Trust account only) , the Change Request e-form must be signed by the principal holder .  Where the instruction for signatories is for 'Both to Sign', the Change Request e-form must be duly signed by both/all parties.",
            },
            {
              prefix: "3.",
              text: "KIB may require additional documentations to effect the changes requested. This Change Request will not be processed if the required documentations have not been received by KIB.",
            },
            {
              prefix: "4.",
              text: "KIB will not be liable for any loss incurred due to incorrect information being supplied by the unitholder(s)/member(s).",
            },
            {
              prefix: "5.",
              text: "KIB reserves the right to withhold processing of any unclear, incomplete or ambiguous requests forwarded by the unitholder(s)/ member(s).",
            },
            {
              prefix: "6.",
              text: "The responsibility of ensuring that the Change Request has been received and acted upon by KIB will lie with the unitholder(s)/ member(s).",
            },
            {
              prefix: "7.",
              text: "Unitholder(s)/member(s) can check and confirm that the Change Request has been acted upon by checking the unitholder(s)/ member(s) profile on KenEasy KIB's customer online account portal (accessible through https://www.kenangainvestors.com.my).",
            },
            {
              prefix: "8.",
              text: "Where this Change Request form is signed on behalf of the unitholder(s)/member(s), the signatory warrants that he/she has authority to do so, that the information contained herein is correct in all respects and he/she indemnifies KIB against any and all damages and/or loss arising from such event.",
            },
            {
              prefix: "9.",
              text: "KIB shall not be liable or responsible, for any reason, in the event that the signatory to this is not duly authorised and the signatory indemnifies KIB against any and all damages and/or loss arising from such event.",
            },
            {
              prefix: "10.",
              text: "KIB will not be liable for any damages or losses of whatsoever nature arising out of KIB's failure to action this instruction due to occurrences beyond the control of KIB.",
            },
            {
              prefix: "11.",
              text: "Copies of all required  documentation must accompany this Change Request Form. KIB will not be obliged to process this form until it has received the required documentation.",
            },
            {
              prefix: "12.",
              text: "KIB will not be liable for any loss or damage of whatsoever nature arising from the inability of KIB to process his form due to the fact that the requirements of of any applicable law have not been complied with.",
            },
            {
              prefix: "13.",
              text: "The unitholder(s)/member(s) indemnifies and holds KIB harmless against any loss or damage which the unitholder(s)/member(s) may suffer as a result of any commission or omission by KIB.",
            },
          ],
        },
      ],
    },
    {
      heading: "For any issuance and delivery of documents by way of electronic means (e-statement):",
      termsList: [
        {
          content: [
            {
              prefix: "1.",
              text: "I/We consent and authorize Kenanga Group and its authorized officer to issue and deliver documents (including statements and correspondences) and any other notices by way of electronic means or online devices to me/we from time to time through email when the service is made available. I/We hereby confirm that this consent shall be valid for an indefinite period until revoked by me/us in writing or via electronic means and received and acknowledged by me. I/We hereby acknowledge that Kenanga Group may cancel the email delivery service without providing any reasons and/or prior notices to me/us.",
            },
            {
              prefix: "2.",
              text: "I/We acknowledge, accept and assume the risk associated with the transfer of documents/information by way of electronic means or online devices and/or delivery, including but not limited to delays or failure in the transmission due to breakdown or failure of transmission or traffic congestion of communications or any other cause(s) beyond Kenanga Group’s control or anticipation and/or inherent risks in receiving such documents by way of electronic means or online devices. I/We will not dispute or challenge the validity, enforceability or admissibility of any documents issued and delivered by way of electronic means.",
            },
            {
              prefix: "3.",
              text: "I understand that if I agree to receive statements, i.e. confirmation advice, statement of accounts, interim/annual report and any other statement by email, I understand that no such statements will be generated and sent to me if there are no transactions in my account during the defined issuance period of these statements.",
            },
            {
              prefix: "4.",
              text: "Kenanga Group shall not be liable for any direct, indirect, special, incidental or consequential loss or damage that may arise in respect of the disclosure and/or delivery of this e-statement through your email address provided to Kenanga Group.",
            },
            {
              prefix: "5.",
              text: "The e-statement is free of charge. Kenanga Group reserves the right at its sole discretion to impose charges for e-statements in the future.",
            },
            {
              prefix: "6.",
              text: "Kenanga Group does not warrant the timelines, security, confidentiality or availability in the transmission of the e-statements to the designated email address.",
            },
            {
              prefix: "7.",
              text: "You may terminate this e-statement at any time by contacting Kenanga Group at 1-800-88-3737 or email to https://investorservices@kenanga.com.my",
            },
            {
              prefix: "8.",
              text: "Kenanga Group may advertise its products and services through estatement from time to time.",
            },
            {
              prefix: "9.",
              text: "Kenanga Group will use its best endeavours to ensure the security of the e-statement services. Kenanga Group shall not be liable in any manner for any disruption, unavailability of this service, communication, electrical or network failure that may result in the e-statements being incomplete, unavailable, for delayed in transmission.",
            },
            {
              prefix: "10.",
              text: "I acknowledge that the use of and the transmission of information via email and/or the internet may not be secured. I also acknowledge that the information transmitted may be liable to error, viruses, interruption, delay, interception, modification or amendment by unauthorized persons. I further acknowledge that the transmission may be disrupted, interrupted, delayed or incorrect. Therefore, I will not hold Kenanga Group responsible for any errors, viruses, delays, inaccuracies, losses and damages whatsoever arising from or in connection with the use of e-statement service (including but not limited to any interception, modification or amendment, disruption, interruption, delay or inaccuracy of email or internet transmission or other communication equipment or facilities). For the avoidance of doubt, Kenanga Group shall not be responsible for any losses suffered, whether direct, indirect, consequential or special loss, even if Kenanga Group had been advised of the same.",
            },
            {
              prefix: "11.",
              text: "In the event of systems failure, I/we consent to receive documents via post, fax or such other means as Kenanga Group deems fit and appropriate.",
            },
            {
              prefix: "12.",
              text: "I/We acknowledge that any documents sent to my/our email address provided to Kenanga Group herein by way of electronic means shall be deemed to be duly served on me/us on the day such communication by email was made.",
            },
            {
              prefix: "13.",
              text: "I/We shall assume all responsibilities or liabilities whatsoever for any direct or consequential losses arising from or in connection with Kenanga Group acting in accordance with my/our authorisation. I/We further agree to indemnify Kenanga Group against all actions, claims, demands, damages costs, charges and expenses which Kenanga Group may sustain, incur and be liable for as a result of or in consequence of or in connection with Kenanga Group acting in accordance with this authorisation.",
            },
          ],
        },
      ],
    },
  ],
};

// export const FEA: ITermsAndConditions = {
//   title: "FEA Declaration",
//   subsection: [
//     {
//       heading: "PART I: Declaration And Undertaking On Domestic Ringgit Borrowing\n(applicable to Resident only)",
//       termsList: [
//         {
//           content:
//             "I agree that Kenanga Group may suspend my account from trading in securities/derivatives quoted in foreign currency(ies) without any notice given to me should the accumulated gross purchase value for a calendar year transacted in my trading account approaches, equals or exceeds the FEA Rules limit imposed by BNM and I shall not hold Kenanga Group liable in any way for any losses incurred or suffered by me arising from the suspension of trading in foreign securities/derivatives.\n\nI further declare that I am fully aware of the exchange control regulations imposed by BNM and agree that it is my responsibility to ensure that my investment(s) at all times shall be maintained within the limit imposed by BNM from time to time. \n\nDeclaration of Exposure in Foreign Securities/Derivatives (in R.M. or in equivalent) for the current calendar year-to-date:\n* Remaining balance for investment RM 10,000.00.\n\nIn the event there are changes to the circumstance and/or details contained in this declaration and undertaking, I undertake to update Kenanga Group of the changes immediately, failing which Kenanga Group may proceed to take all necessary actions deemed fit without reference to me.",
//         },
//       ],
//     },
//     {
//       heading:
//         "PART II: Declaration For Investment In Foreign Currency Assets Onshore And Investment Abroad For Own Account\n(This section is applicable to a Resident with Domestic Ringgit Borrowing only)",
//       termsList: [
//         {
//           content:
//             "I hereby acknowledge and confirm that I shall comply with the FEA Rules when performing Investment Abroad and such rules and regulations as may be imposed by BNM from time to time.\n\nI hereby confirm that the total sum of my investment abroad/ foreign currency asset onshore which I will transact with Kenanga Group and any other licensed onshore bank, shall be within the prescribed FEA Rules and limits. I will inform Kenanga Group.\n\nI hereby undertake to provide a copy of the BNM’s approval to Kenanga Group as reference for any transaction, trade, settlement or operation requiring BNM’s approval and/or for transactions that exceed the limit prescribed under the FEA Rules. I acknowledge and agree that Kenanga Group reserves the right not to proceed or continue with my transaction, trade, settlement or operation if I fail to provide such approval to Kenanga Group within the time period prescribed by Kenanga Group.",
//         },
//       ],
//     },
//   ],
// };

export const UTAndAMP: ITermsAndConditions = {
  title: "UT & AMP Product Terms and Conditions",
  subsection: [
    {
      heading: "Agreement, Declarations and Signatures",
      termsList: [
        {
          content: [
            {
              prefix: "•",
              text: "I/We acknowledge that I/we have received, read and understood the relevant Product Highlights Sheet(s), Prospectus(es)/Information Memorandum(s) for the fund(s) or products recommended to me/us for my/our investment, the Terms and Conditions on this e-Form and I/we undertake to be bound by them for my/our initial and subsequent transactions with the Manager, Kenanga Investors Berhad (“KIB”).",
            },
            {
              prefix: "•",
              text: "I/We acknowledge that I/we have received, read and understood the relevant Product Highlights Sheet(s), Prospectus(es)/Information Memorandum(s) for the fund(s) or products recommended to me/us for my/our investment, the Terms and Conditions on this e-Form and I/we undertake to be bound by them for my/our initial and subsequent transactions with the Manager, Kenanga Investors Berhad (“KIB”).",
            },
            {
              prefix: "•",
              text: "I/We undertake to be bound by the provisions of the documents constituting the fund(s) or products subscribed to as if was/we were a party thereto.",
            },
            {
              prefix: "•",
              text: "I am/We are 18 years and above as the date of this application. Copy/copies of my/our NRIC/passport/Other ID is/are enclosed or have been provided to the Manager through its representative.",
            },
            {
              prefix: "•",
              text: "I/We do declare and represent that as the date hereof, I/we am/are not an undischarged bankrupt, nor has any petition for bankruptcy been filed against me/us.",
            },
            {
              prefix: "•",
              text: "I/We declare that I am/we are neither engaged in any unlawful activity nor are my/our monies obtained from any illegal source or related to any illegal activity.",
            },
            {
              prefix: "•",
              text: "I/We undertake that I am/we are aware of the fees and charges that I/we will incur directly or indirectly when investing in the fund(s) or products.",
            },
            {
              prefix: "•",
              text: "I/We declare that I am/we are in compliance and undertake that I/we will comply with all applicable laws and regulations.",
            },
            {
              prefix: "•",
              text: "I/We undertake to provide the Manager with all information as it may require for the purpose of and in connection with completing the Account Opening & Investment e-Form, including but not limited to my/our information on the financial position, condition, or prospect.",
            },
            {
              prefix: "•",
              text: "I/We acknowledge that I/we shall keep the Manager informed of any change of my/our particulars as stated in this Account Opening & Investment e-Form and/or of any material facts that will, directly or indirectly, affect my/our financial position(s), condition(s) or prospect(s).",
            },
            {
              prefix: "•",
              text:
                // eslint-disable-next-line quotes
                'I/We undertake to provide such information and documents as the Manager may reasonably require for the purpose of due diligence/enhanced due diligence as required under the Anti-Money Laundering, Anti-Terrorism Financing and Proceeds of Unlawful Activities Act ("AMLATPUAA").',
            },
            {
              prefix: "•",
              text: "I/We hereby declare and acknowledge that I/we have sole legal and proprietary right overall monies accompanying this application.",
            },
            {
              prefix: "•",
              text: "I/We hereby agree to indemnify the Manager against all actions, suits, proceedings, claims, damages and losses which may be suffered by the Manager as a result of any inaccuracy of the declarations herein.",
            },
            {
              prefix: "•",
              text: "I/We acknowledge that all fees and charges payable to the Manager and the Trustee (as identified in the Product Highlights Sheet(s), Prospectus(es)/Information Memorandum(s) ) are subject to the applicable sales taxes as may be imposed by the government or other authorities from time to time.",
            },
            {
              prefix: "•",
              text: "I /We understand that Kenanga Group may at its absolute discretion approve the opening of my/our account at any of Kenanga Group's branches or reject my/our application without assigning any reason whatever.",
            },
            {
              prefix: "•",
              text: "I/ We acknowledge that the Manager reserves the right to close my/our investment account should I/we maintained a zero balance in my/our account for more than 12 consecutive calendar months.",
            },
            {
              prefix: "•",
              text: "I/We agree that my/our information and/or documents relating to me/us may be made available, without limitation to KIB's employees, third-party service providers, advisers, custodian/ sub-custodian's advisers, Kenanga Group of Companies (consists of Kenanga Investment Bank Berhad and its group of companies including subsidiaries, branches and related companies), Bursa Malaysia Securities Berhad, Bursa Derivatives, Bursa Depository, Bursa Clearing, Securities Commission, foreign exchanges and/or all relevant and applicable authorities/regulators including, but not limited to, for the purpose of information for credit, reference and marketing purposes and to facilitate the provision of services by KIB to me/us. I/We shall not hold KIB liable for any inadvertent disclosure of any of my/our information and/or documents, whether inadvertently disclosed by KIB or any third party appointed by KIB.",
            },
            {
              prefix: "•",
              text: "I/We hereby consent for Kenanga Group to deal and process my/our personal data in accordance with the Personal Data Protection Notice in the Account Opening & Investment e-Form, as may be amended or supplemented from time to time. I/We confirm that I/we have read and understood the Personal Data Protection Notice and accept the terms and conditions.",
            },
            {
              prefix: "•",
              text: "Subject to any applicable regulations/laws, by providing my email address and handphone number to Kenanga Group, I have consented to receive communications and/or information from Kenanga Group relating to my investment via email and/or SMS. Notices delivered via email and/or SMS to me are deemed sent and received on the date such email and/or are sent.",
            },
            { prefix: "•", text: "For any issuance and delivery of documents by way of electronic means (e-statement):" },
            {
              indentSpace: sw24,
              prefix: "1.",
              text: "I/We consent and authorize Kenanga Group and its authorized officer to issue and deliver documents (including statements and correspondences) and any other notices by way of electronic means or online devices to me/we from time to time through email when the service is made available. I/We hereby confirm that this consent shall be valid for an indefinite period until revoked by me/us in writing or via electronic means and received and acknowledged by me. I/We hereby acknowledge that Kenanga Group may cancel the email delivery service without providing any reasons and/or prior notices to me/us.",
            },
            {
              indentSpace: sw24,
              prefix: "2.",
              text: "I/We acknowledge, accept and assume the risk associated with the transfer of documents/information by way of electronic means or online devices and/or delivery, including but not limited to delays or failure in the transmission due to breakdown or failure of transmission or traffic congestion of communications or any other cause(s) beyond Kenanga Group’s control or anticipation and/or inherent risks in receiving such documents by way of electronic means or online devices. I/We will not dispute or challenge the validity, enforceability or admissibility of any documents issued and delivered by way of electronic means.",
            },
            {
              indentSpace: sw24,
              prefix: "3.",
              text: "I understand that if I agree to receive statements, i.e. confirmation advice, statement of accounts, interim/annual report and any other statement by email, I understand that no such statements will be generated and sent to me if there are no transactions in my account during the defined issuance period of these statements.",
            },
            {
              indentSpace: sw24,
              prefix: "4.",
              text: "Kenanga Group shall not be liable for any direct, indirect, special, incidental or consequential loss or damage that may arise in respect of the disclosure and/or delivery of this e-statement through your email address provided to Kenanga Group.",
            },
            {
              indentSpace: sw24,
              prefix: "5.",
              text: "The e-statement is free of charge. Kenanga Group reserves the right at its sole discretion to impose charges for e-statements in the future.",
            },
            {
              indentSpace: sw24,
              prefix: "6.",
              text: "Kenanga Group does not warrant the timelines, security, confidentiality or availability in the transmission of the e-statements to the designated email address.",
            },
            {
              indentSpace: sw24,
              prefix: "7.",
              text: "You may terminate this e-statement at any time by contacting Kenanga Group at 1-800-88-3737 or email to investorservices@kenanga.com.my",
            },
            {
              indentSpace: sw24,
              prefix: "8.",
              text: "Kenanga Group may advertise its products and services through e-statement from time to time.",
            },
            {
              indentSpace: sw24,
              prefix: "9.",
              text: "Kenanga Group will use its best endeavours to ensure the security of the e-statement services. Kenanga Group shall not be liable in any manner for any disruption, unavailability of this service, communication, electrical or network failure that may result in the e-statements being incomplete, unavailable, for delayed in transmission.",
            },
            {
              indentSpace: sw24,
              prefix: "10.",
              text: "I acknowledge that the use of and the transmission of information via email and/or the internet may not be secured. I also acknowledge that the information transmitted may be liable to error, viruses, interruption, delay, interception, modification or amendment by unauthorised persons. I further acknowledge that the transmission may be disrupted, interrupted, delayed or incorrect. Therefore, I will not hold Kenanga Group responsible for any errors, viruses, delays, inaccuracies, losses and damages whatsoever arising from or in connection with the use of e-statement service (including but not limited to any interception, modification or amendment, disruption, interruption, delay or inaccuracy of email or internet transmission or other communication equipment or facilities). For the avoidance of doubt, Kenanga Group shall not be responsible for any losses suffered, whether direct, indirect, consequential or special loss, even if Kenanga Group had been advised of the same.",
            },
            {
              indentSpace: sw24,
              prefix: "11.",
              text: "In the event of systems failure, I/we consent to receive documents via post, fax or such other means as Kenanga Group deems fit and appropriate.",
            },
            {
              indentSpace: sw24,
              prefix: "12.",
              text: "I/We acknowledge that any documents sent to my/our email address provided to Kenanga Group herein by way of electronic means shall be deemed to be duly served on me/us on the day such communication by email was made.",
            },
            {
              indentSpace: sw24,
              prefix: "13.",
              text: "I/we shall assume all responsibilities or liabilities whatsoever for any direct or consequential losses arising from or in connection with Kenanga Group acting in accordance with my/our authorisation. I/We further agree to indemnify Kenanga Group against all actions, claims, demands, damages costs, charges and expenses which Kenanga Group may sustain, incur and be liable for as a result of or in consequence of or in connection with Kenanga Group acting in accordance with this authorisation.",
            },
          ],
        },
      ],
    },
    {
      heading: "For KENANGA AMP Plus Service",
      termsList: [
        {
          content: [
            {
              text: "I/We acknowledge that I/we have read and understood the Terms and Conditions of the Kenanga AMP Plus service and I/we undertake to abide with the provisions of the same. I/We confirm that I/we aware of the fees and charges that I/we will incur directly or indirectly when investing in Kenanga AMP Plus service.",
            },
          ],
        },
      ],
    },
    {
      heading: "For KIB-IUTA Platform",
      termsList: [
        {
          content: [
            {
              text: "I/We acknowledge that I/we have read and understood the Terms and Conditions Relating To The Third Party Funds and I/we undertake to abide with the provisions of the same. I/We confirm that I/we aware of the fees and charges that I/we will incur directly or indirectly for when investing in KIB-IUTA Platform.",
            },
          ],
        },
      ],
    },
    {
      heading: "For Joint Application Only",
      termsList: [
        {
          content: [
            {
              text: "In the absence of written explicit instructions, I/we acknowledge that instruction must be given by both of us.",
            },
          ],
        },
      ],
    },
  ],
};

export const PRS: ITermsAndConditions = {
  title: "PRS Product Terms and Conditions",
  subsection: [
    {
      heading: "Agreement, Declarations and Signatures",
      termsList: [
        {
          content: [
            {
              prefix: "•",
              text: "I/We acknowledge that I/we have received, read and understood the relevant Product Highlights Sheet(s), Disclosure Document(s) for the fund(s) or products recommended to me/us for my/our investment, the Terms and Conditions on this e-Form and I/we undertake to be bound by them for my/our initial and subsequent transactions with the Manager, Kenanga Investors Berhad (“KIB”).",
            },
            {
              prefix: "•",
              text: "I/We undertake to be bound by the provisions of the documents constituting the fund(s) or products subscribed to as if I was/we were a party thereto.",
            },
            {
              prefix: "•",
              text: "I am/We are 18 years and above as the date of this application. Copy/copies of my/our NRIC/passport/Other ID is/are enclosed or have been provided to the Manager through its representative.",
            },
            {
              prefix: "•",
              text: "I/We do declare and represent that as the date hereof, I/we am/are not an undischarged bankrupt, nor has any petition for bankruptcy been filed against me/us.",
            },
            {
              prefix: "•",
              text: "I/We declare that I am/we are neither engaged in any unlawful activity nor are my/our monies obtained from any illegal source or related to any illegal activity.",
            },
            {
              prefix: "•",
              text: "I/We undertake that I am/we are aware of the fees and charges that I/we will incur directly or indirectly when investing in the fund(s) or products.",
            },
            {
              prefix: "•",
              text: "I/We declare that I am/we are in compliance and undertake that I/we will comply with all applicable laws and regulations.",
            },
            {
              prefix: "•",
              text: "I/We undertake to provide the Manager with all information as it may require for the purpose of and in connection with completing the Account Opening & Investment e-Form, including but not limited to my/our information on the financial position, condition, or prospect.",
            },
            {
              prefix: "•",
              text: "I/We acknowledge that I/we shall keep the Manager informed of any change of my/our particulars as stated in this Account Opening & Investment e-Form and/or of any material facts that will, directly or indirectly, affect my/our financial position(s), condition(s) or prospect(s).",
            },
            {
              prefix: "•",
              text:
                // eslint-disable-next-line quotes
                'I/We undertake to provide such information and documents as the Manager may reasonably require for the purpose of due diligence/enhanced due diligence as required under the Anti-Money Laundering, Anti-Terrorism Financing and Proceeds of Unlawful Activities Act ("AMLATPUAA").',
            },
            {
              prefix: "•",
              text: "I/We hereby declare and acknowledge that I/we have sole legal and proprietary right overall monies accompanying this application.",
            },
            {
              prefix: "•",
              text: "I/We hereby agree to indemnify the Manager against all actions, suits, proceedings, claims, damages and losses which may be suffered by the Manager as a result of any inaccuracy of the declarations herein.",
            },
            {
              prefix: "•",
              text: "I/We acknowledge that all fees and charges payable to the Manager and the Trustee (as identified in the Product Highlights Sheet(s), Disclosure Document(s) ) are subject to the applicable sales taxes as may be imposed by the government or other authorities from time to time.",
            },
            {
              prefix: "•",
              text: "I /We understand that Kenanga Group may at its absolute discretion approve the opening of my/our account at any of Kenanga Group's branches or reject my/our application without assigning any reason whatever.",
            },
            {
              prefix: "•",
              text: "I/ We acknowledge that the Manager reserves the right to close my/our investment account should I/we maintained a zero balance in my/our account for more than 12 consecutive calendar months.",
            },
            {
              prefix: "•",
              text: "I/We agree that my/our information and/ or documents relating to me/us may be made available, without limitation to KIB's employees, third-party service providers, advisers, custodian/ sub-custodian's advisers, Kenanga Group of Companies (consists of Kenanga Investment Bank Berhad and its group of companies including subsidiaries, branches and related companies), Bursa Malaysia Securities Berhad, Bursa Derivatives, Bursa Depository, Bursa Clearing, Securities Commission, foreign exchanges and/ or all relevant and applicable authorities/regulators including, but not limited to, for the purpose of information for credit, reference and marketing purposes and to facilitate the provision of services by KIB to me/us. I/We shall not hold KIB liable for any inadvertent disclosure of any of my/our information and/or documents, whether inadvertently disclosed by KIB or any third party appointed by KIB.",
            },
            {
              prefix: "•",
              text: "I/We hereby consent for Kenanga Group to deal and process my/our personal data in accordance with the Personal Data Protection Notice in the Account Opening & Investment e-Form, as may be amended or supplemented from time to time. I/We confirm that I/we have read and understood the Personal Data Protection Notice and accept the terms and conditions.",
            },
            {
              prefix: "•",
              text: "Subject to any applicable regulations/laws, by providing my email address and handphone number to Kenanga Group, I have consented to receive communications and/or information from Kenanga Group relating to my investment via email and/or SMS. Notices delivered via email and/or SMS to me are deemed sent and received on the date such email and/or are sent.",
            },
            { prefix: "•", text: "For any issuance and delivery of documents by way of electronic means (e-statement) :" },
            {
              indentSpace: sw24,
              prefix: "a.",
              text: "I/We consent and authorize Kenanga Group and its authorized officer to issue and deliver documents (including statements and correspondences) and any other notices by way of electronic means or online devices to me/we from time to time through email when the service is made available. I/We hereby confirm that this consent shall be valid for an indefinite period until revoked by me/us in writing or via electronic means and received and acknowledged by me. I/We hereby acknowledge that Kenanga Group may cancel the email delivery service without providing any reasons and/or prior notices to me/us.",
            },
            {
              indentSpace: sw24,
              prefix: "b.",
              text: "I/We acknowledge, accept and assume the risk associated with the transfer of documents/information by way of electronic means or online devices and/or delivery, including but not limited to delays or failure in the transmission due to breakdown or failure of transmission or traffic congestion of communications or any other cause(s) beyond Kenanga Group’s control or anticipation and/or inherent risks in receiving such documents by way of electronic means or online devices. I/We will not dispute or challenge the validity, enforceability or admissibility of any documents issued and delivered by way of electronic means.",
            },
            {
              indentSpace: sw24,
              prefix: "c.",
              text: "I understand that if I agree to receive statements, i.e. confirmation advice, statement of accounts, interim/annual report and any other statement by email, I understand that no such statements will be generated and sent to me if there are no transactions in my account during the defined issuance period of these statements.",
            },
            {
              indentSpace: sw24,
              prefix: "d.",
              text: "Kenanga Group shall not be liable for any direct, indirect, special, incidental or consequential loss or damage that may arise in respect of the disclosure and/or delivery of this e-statement through your email address provided to Kenanga Group.",
            },
            {
              indentSpace: sw24,
              prefix: "e.",
              text: "The e-statement is free of charge. Kenanga Group reserves the right at its sole discretion to impose charges for e-statements in the future.",
            },
            {
              indentSpace: sw24,
              prefix: "f.",
              text: "Kenanga Group does not warrant the timelines, security, confidentiality or availability in the transmission of the e-statements to the designated email address.",
            },
            {
              indentSpace: sw24,
              prefix: "g.",
              text: "You may terminate this e-statement at any time by contacting Kenanga Group at 1-800-88-3737 or email to investorservices@kenanga.com.my",
            },
            {
              indentSpace: sw24,
              prefix: "h.",
              text: "Kenanga Group may advertise its products and services through e-statement from time to time.",
            },
            {
              indentSpace: sw24,
              prefix: "i.",
              text: "Kenanga Group will use its best endeavours to ensure the security of the e-statement services. Kenanga Group shall not be liable in any manner for any disruption, unavailability of this service, communication, electrical or network failure that may result in the e-statements being incomplete, unavailable, for delayed in transmission.",
            },
            {
              indentSpace: sw24,
              prefix: "j.",
              text: "I acknowledge that the use of and the transmission of information via email and/or the internet may not be secured. I also acknowledge that the information transmitted may be liable to error, viruses, interruption, delay, interception, modification or amendment by unauthorised persons. I further acknowledge that the transmission may be disrupted, interrupted, delayed or incorrect. Therefore, I will not hold Kenanga Group responsible for any errors, viruses, delays, inaccuracies, losses and damages whatsoever arising from or in connection with the use of e-statement service (including but not limited to any interception, modification or amendment, disruption, interruption, delay or inaccuracy of email or internet transmission or other communication equipment or facilities). For the avoidance of doubt, Kenanga Group shall not be responsible for any losses suffered, whether the direct, indirect, consequential or special loss, even if Kenanga Group had been advised of the same.",
            },
            {
              indentSpace: sw24,
              prefix: "k.",
              text: "In the event of systems failure, I/we consent to receive documents via post, fax or such other means as Kenanga Group deems fit and appropriate.",
            },
            {
              indentSpace: sw24,
              prefix: "l.",
              text: "I/We acknowledge that any documents sent to my/our email address provided to Kenanga Group herein by way of electronic means shall be deemed to be duly served on me/us on the day such communication by email was made.",
            },
            {
              indentSpace: sw24,
              prefix: "m.",
              text: "I/We shall assume all responsibilities or liabilities whatsoever for any direct or consequential losses arising from or in connection with Kenanga Group acting in accordance with my/our authorisation. I/We further agree to indemnify Kenanga Group against all actions, claims, demands, damages costs, charges and expenses which Kenanga Group may sustain, incur and be liable for as a result of or in consequence of or in connection with Kenanga Group acting in accordance with this authorisation.",
            },
          ],
        },
      ],
    },
    {
      heading: "Private Pension Administrator Malaysia (PPA)",
      termsList: [
        {
          content: [
            {
              prefix: "•",
              text: "I acknowledge that I have received, read and understood the Disclosure Document(s) for the Fund(s) to be invested in, Supplementary Disclosure Document(s) if any, and the terms and conditions stipulated in (i) KIB's website (www.kenangainvestors.com.my); (ii) the PPA's website (www.ppa.my); and (iii) the terms and conditions of this e-form and I undertake to be bound by them for my initial and subsequent transactions with the PRS Provider. I acknowledge that the same has been explained to me by my Provider and/or registered PRS consultant.",
            },
            {
              prefix: "•",
              text: "I declare that the particulars given herein are true, correct and complete and that I have not withheld any material facts or information which may influence the acceptance of this application.",
            },
            {
              prefix: "•",
              text: "I am aware of the fees and charges that will be incurred by me directly or indirectly when investing in the PRS fund(s). I declare that I have not been convicted by any court for any criminal offence, whether within or outside Malaysia.",
            },
            {
              prefix: "•",
              text: "I declare that I have not been convicted by any court for any criminal offence, whether within or outside Malaysia.",
            },
            {
              prefix: "•",
              text: "I agree to contact Kenanga Investors Berhad at 1-800-88-3737 or email ​investorservices@kenanga.com.my​ or access the investors portal, KenEasy at h​ttps://www.kenangainvestors.com.my/KenEasy/KIB.Application.Web/​ for a copy of my latest statement.",
            },
          ],
        },
      ],
    },
    {
      heading: "About Private Pension Administrator Malaysia (PPA)",
      termsList: [
        {
          content: [
            {
              text: "The Private Pension Administrator (PPA) is a body approved under section 139C of the Capital Market and Services Act 2007 to perform the function of record-keeping, administration, and customer service for members and contributions made in respect of a private retirement scheme. All PRS applicants are required to open an account with the PPA, and upon successful creation of the respective account, the PRS applicants are subsequently referred to as PPA members.",
            },
          ],
        },
      ],
    },
  ],
};

export const TermsTransactions: ITermsAccordionSection = {
  title: "Transactions Terms and Conditions",
  subsection: [
    {
      heading: "Terms and Conditions for Transactions",
      termsList: [
        {
          content: [
            {
              text: "Please read these notes before completing the Transaction E-Form as you are bound by them. You must read and understand the contents of the relevant Product Highlights Sheet(s), Disclosure Document(s), Prospectus(es), Replacement / Supplementary Prospectus(es) (if any), Information Memorandum(s), Replacement / Supplementary Information Memorandum (if any), before completing the Transaction E-Form. A copy of the Deed will be made available to you upon request. Please check that the Unit Trust Consultant and/or PRS Consultant servicing you has a valid authorisation and registration card. This form should not be circulated unless accompanied by the Prospectus / Disclosure Document",
            },
          ],
        },
        {
          label: "Units Pricing",
          content: [
            {
              text: "Units will be transacted based on forward pricing prevailing at the time the request is received by Kenanga Investors Berhad. Units will be credited on the closing Net Asset Value (NAV) price of the day.",
            },
          ],
        },
        {
          label: "Switching, Transfer, Redemption, Withdrawal",
          content: [
            {
              text: "Please refer to the relevant Product Highlights Sheet(s), Disclosure Document(s), Prospectus(es), Replacement / Supplementary Prospectus(es) (if any), Information Memorandum(s), Replacement / Supplementary Information Memorandum (if any) for switching, redemption and transfer.",
            },
          ],
        },
        {
          label: "Rights of Kenanga Investors Berhad",
          content: [
            {
              text: "Kenanga Investors Berhad reserves the right to accept and reject any application in whole or in part thereof without assigning any reason in respect thereof, without compensation to the investor/member and the duly completed Transaction Form received by Kenanga Investors Berhad are deemed irrevocable by the unit holder/member.",
            },
          ],
        },
        {
          label: "Loan Financing Statement",
          content: [
            {
              text: "Investing in an investment scheme with borrowed money is more risky than investing with your own savings. You should assess if loan financing is suitable for you in line of your objectives, attitude to risk and financial circumstances. You should be aware of the risks which would include the following:",
            },
            {
              prefix: "1.",
              text: "The higher the margin of financing (that is, the amount of money you borrow for every Ringgit of your own money that you put in as deposit or down payment) the greater the potential for loses as well as gains.",
            },
            {
              prefix: "2.",
              text: "You should assess whether you have the ability to service the repayments on the proposed loan. If your loan is a variable rate loan and if interest rate rises, your total repayment amount will be increased.",
            },
            {
              prefix: "3.",
              text: "If unit prices fall beyond a certain level, you may be asked to provide additional acceptable collateral or pay additional amount on top of your normal instalments. If you fail to comply within the prescribed time, your units may be sold towards the settlement of your loan.",
            },
            {
              prefix: "4.",
              text: "Returns on investment are not guaranteed and may not be earned evenly over time. This means that there may be some years where returns are high and other years where losses incurred instead. Whether you eventually realise a gain or incur loss may be affected by the timing of the sale of your units. The value of units may fall just when you want your money back even though the investment may have done well in the past.",
            },
            {
              text: "This brief statement cannot disclose all the risks and other aspects of loan financing. You should therefore study the terms and conditions before you decide to take the loan. If you have doubts in respect of any aspect of this Risk Disclosure Statement or the terms of the loan financing, you should consult the institution offering the loan.",
            },
          ],
        },
      ],
    },
    {
      heading: "Declarations and Signatures",
      subHeading: "(Transactions through the OMNI channel (E-Services))",
      termsList: [
        {
          content: [
            {
              prefix: "•",
              text: "This transaction is based solely on my/our instructions. Kenanga Investors Berhad (KIB) may approve or reject my/our request at its sole discretion. I/We acknowledge the receipt of and agree to abide by the terms and conditions of KIB’s General Terms and Conditions Governing Fund Investments (“General Terms and Conditions”), a copy of which was provided to me/us upon the opening of my/our account with KIB.",
            },
            {
              prefix: "•",
              text: "I/We acknowledge that I/we have received, read and understood the relevant Product Highlights Sheet(s), Disclosure Document(s), Prospectus(es) / Information Memorandum(s) for the fund(s) recommended to me/us for my/our investment, I/we undertake to be bound by them for my/our initial and subsequent transactions with KIB.",
            },
            {
              prefix: "•",
              text: "I/We undertake to be bound by the provisions of the documents constituting the fund(s) subscribed to as if I was/we were a party thereto.",
            },
            {
              prefix: "•",
              text: "I am/We are 18 years and above as the date of this transaction. Copy/copies of my/our NRIC/passport/Other ID is/are enclosed or have been provided to KIB through its representative.",
            },
            {
              prefix: "•",
              text: "I/We do declare and represent that as the date hereof, I/we am/are not an undischarged bankrupt nor has any petition for bankruptcy been filed against me/us.",
            },
            {
              prefix: "•",
              text: "I/We declare that I am/we are neither engaged in any unlawful activity nor are my/our monies obtained from any illegal source or related to any illegal activity.",
            },
            {
              prefix: "•",
              text: "I/We undertake that I am/we are aware of the fees and charges that I/we will incur directly or indirectly when investing in the fund(s).",
            },
            {
              prefix: "•",
              text: "I/We declare that I am/we are in compliance and undertake that I/we will comply with all applicable laws and regulations.",
            },
            {
              prefix: "•",
              text: "I/We undertake to provide such information and documents as KIB may reasonably require for the purpose of due diligence/enhanced due diligence as required under the Anti-Money Laundering, Anti-Terrorism Financing and Proceeds of Unlawful Activities Act 2001 (“AMLATPUAA”).",
            },
            {
              prefix: "•",
              text: "I/We hereby declare and acknowledge that I/we have sole legal and proprietary right over all monies accompanying this application.",
            },
            {
              prefix: "•",
              text: "I/We understand that KIB may at its absolute discretion approve or reject my/our application without assigning any reason whatever.",
            },
            {
              prefix: "•",
              text: "I/We hereby agree to indemnify KIB against all actions, suits, proceedings, claims, damages and losses which may be suffered by KIB as a result of any inaccuracy of the declarations herein.",
            },
            {
              prefix: "•",
              text: "I/We acknowledge that all fees and charges payable to KIB and the Fund Trustee ( as defined in the Disclosure Documents) are subject to goods and services tax as may be imposed by the government or other authorities from time to time.",
            },
            {
              prefix: "•",
              text: "I/We agree that my/our information and/or documents relating to me/us may be made available, without limitation to KIB’s employees, third party service providers, agents, advisers, custodian/ subcustodian’s agents or advisers, Kenanga Group of Companies (consists of Kenanga Investment Bank Berhad and its group of companies including subsidiaries, branches and related companies), Bursa Malaysia Securities Berhad, Bursa Derivatives, Bursa Depository, Bursa Clearing, Securities Commission, foreign exchanges and/or all relevant and applicable authorities/regulators including, but not limited to, for the purpose of information for credit, reference and marketing purposes and to facilitate the provision of services by KIB to me/us.",
            },
            {
              prefix: "•",
              text: "I/We agree that my/our personal data and information shall be governed by the Terms and Conditions set out in the Kenanga Group of Companies's Personal Data Protection Notice highlighted in the General Terms and Conditions, as may be amended or supplemented from time to time. I/We hereby acknowledge that I/we have been notified and that I/we have read and understood such Personal Data Protection Notice and accepts the terms and conditions herein.",
            },
          ],
        },
      ],
    },
    {
      heading: "For KENANGA AMP Plus Service",
      termsList: [
        {
          content: [
            {
              text: "I/We acknowledge that I/we have read and understood the Terms and Conditions of the Kenanga AMP Plus service  provided in the General Terms and Conditions and I/we undertake to abide with the provisions of the same. I/We confirm that I/we aware of the fees and charges that I/we will incur directly or indirectly when investing in Kenanga AMP Plus service.",
            },
          ],
        },
      ],
    },
    {
      heading: "For KIB-IUTA Platform",
      termsList: [
        {
          content: [
            {
              text: "I/We acknowledge that I/we have read and understood the Terms and Conditions Relating To The Third Party Funds  provided in the General Terms and Conditions and I/we undertake to abide with the provisions of the same. I/We confirm that I/we aware of the fees and charges that I/we will incur directly or indirectly for when investing in Unit Trust products offered by KIB.",
            },
          ],
        },
      ],
    },
    {
      heading: "For any issuance and delivery of documents by way of electronic means (e-statement):",
      termsList: [
        {
          content: [
            {
              prefix: "1.",
              text: "I/We consent and authorize Kenanga Group and its authorized officer to issue and deliver documents (including statements and correspondences) and any other notices by way of electronic means or online devices to me/we from time to time through email when the service is made available. I/We hereby confirm that this consent shall be valid for an indefinite period until revoked by me/us in writing or via electronic means and received and acknowledged by me. I/We hereby acknowledge that Kenanga Group may cancel the email delivery service without providing any reasons and/or prior notices to me/us.",
            },
            {
              prefix: "2.",
              text: "I/We acknowledge, accept and assume the risk associated with the transfer of documents/information by way of electronic means or online devices and/or delivery, including but not limited to delays or failure in the transmission due to breakdown or failure of transmission or traffic congestion of communications or any other cause(s) beyond Kenanga Group’s control or anticipation and/or inherent risks in receiving such documents by way of electronic means or online devices. I/We will not dispute or challenge the validity, enforceability or admissibility of any documents issued and delivered by way of electronic means.",
            },
            {
              prefix: "3.",
              text: "I understand that if I agree to receive statements, i.e. confirmation advice, statement of accounts, interim/annual report and any other statement by email, I understand that no such statements will be generated and sent to me if there are no transactions in my account during the defined issuance period of these statements.",
            },
            {
              prefix: "4.",
              text: "Kenanga Group shall not be liable for any direct, indirect, special, incidental or consequential loss or damage that may arise in respect of the disclosure and/or delivery of this e-statement through your email address provided to Kenanga Group.",
            },
            {
              prefix: "5.",
              text: "The e-statement is free of charge. Kenanga Group reserves the right at its sole discretion to impose charges for e-statements in the future.",
            },
            {
              prefix: "6.",
              text: "Kenanga Group does not warrant the timelines, security, confidentiality or availability in the transmission of the e-statements to the designated email address.",
            },
            {
              prefix: "7.",
              text: "You may terminate this e-statement at any time by contacting Kenanga Group at 1-800-88-3737 or email to investorservices@kenanga.com.my",
            },
            {
              prefix: "8.",
              text: "Kenanga Group may advertise its products and services through estatement from time to time.",
            },
            {
              prefix: "9.",
              text: "Kenanga Group will use its best endeavours to ensure the security of the e-statement services. Kenanga Group shall not be liable in any manner for any disruption, unavailability of this service, communication, electrical or network failure that may result in the e-statements being incomplete, unavailable, for delayed in transmission.",
            },
            {
              prefix: "10.",
              text: "I acknowledge that the use of and the transmission of information via email and/or the internet may not be secured. I also acknowledge that the information transmitted may be liable to error, viruses, interruption, delay, interception, modification or amendment by unauthorized persons. I further acknowledge that the transmission may be disrupted, interrupted, delayed or incorrect. Therefore, I will not hold Kenanga Group responsible for any errors, viruses, delays, inaccuracies, losses and damages whatsoever arising from or in connection with the use of e-statement service (including but not limited to any interception, modification or amendment, disruption, interruption, delay or inaccuracy of email or internet transmission or other communication equipment or facilities). For the avoidance of doubt, Kenanga Group shall not be responsible for any losses suffered, whether direct, indirect, consequential or special loss, even if Kenanga Group had been advised of the same.",
            },
            {
              prefix: "11.",
              text: "In the event of systems failure, I/we consent to receive documents via post, fax or such other means as Kenanga Group deems fit and appropriate.",
            },
            {
              prefix: "12.",
              text: "I/We acknowledge that any documents sent to my/our email address provided to Kenanga Group herein by way of electronic means shall be deemed to be duly served on me/us on the day such communication by email was made.",
            },
            {
              prefix: "13.",
              text: "I/We shall assume all responsibilities or liabilities whatsoever for any direct or consequential losses arising from or in connection with Kenanga Group acting in accordance with my/our authorisation. I/We further agree to indemnify Kenanga Group against all actions, claims, demands, damages costs, charges and expenses which Kenanga Group may sustain, incur and be liable for as a result of or in consequence of or in connection with Kenanga Group acting in accordance with this authorisation.",
            },
          ],
        },
      ],
    },
  ],
};

export const TermsAndConditionsList = [FATCA, CRS, UTAndAMP, PRS];
