declare type TypeMalaysiaBank =
  | "Affin Bank Berhad"
  | "Alliance Bank Malaysia Berhad"
  | "AmBank (M) Berhad"
  | "BNP Paribas Malaysia Berhad"
  | "Bangkok Bank Berhad"
  | "Bank of America Malaysia Berhad"
  | "Bank of China (Malaysia) Berhad"
  | "CIMB Bank Berhad"
  | "China Construction Bank (Malaysia) Berhad"
  | "Citibank Berhad"
  | "Deutsche Bank (Malaysia) Berhad"
  | "HSBC Bank Malaysia Berhad"
  | "Hong Leong Bank Berhad"
  | "India International Bank (Malaysia) Berhad"
  | "Industrial and Commercial Bank of China (Malaysia) Berhad"
  | "J.P. Morgan Chase Bank Berhad"
  | "MUFG Bank (Malaysia) Berhad"
  | "Malayan Banking Berhad"
  | "Mizuho Bank (Malaysia) Berhad"
  | "OCBC Bank (Malaysia) Berhad"
  | "Public Bank Berhad"
  | "RHB Bank Berhad"
  | "Standard Chartered Bank Malaysia Berhad"
  | "Sumitomo Mitsui Banking Corporation Malaysia Berhad"
  | "The Bank of Nova Scotia Berhad"
  | "United Overseas Bank (Malaysia) Bhd."
  | "Others";

declare type TypeMalaysiaState =
  | "Johor"
  | "Sabah"
  | "Sarawak"
  | "Selangor"
  | "Terengganu"
  | "Kuala Lumpur"
  | "Labuan"
  | "Putrajaya"
  | "Kedah"
  | "Kelantan"
  | "Melaka"
  | "Negeri Sembilan"
  | "Pahang"
  | "Pulau Pinang"
  | "Perak"
  | "Perlis";

declare type TypeMalaysiaBankValue = { value: TypeMalaysiaBank };
declare type TypeMalaysiaBankLabelValue = { label: string; value: TypeMalaysiaBank };

declare type TypeMalaysiaStateValue = { value: TypeMalaysiaState };
declare type TypeMalaysiaStateLabelValue = { label: string; value: TypeMalaysiaState };

declare type TypeMalaysiaRace = "Malay" | "Chinese" | "Indian" | "Others";
declare type TypeMalaysiaRaceValue = { value: TypeMalaysiaRace };
declare type TypeMalaysiaRaceLabelValue = { label: string; value: TypeMalaysiaRace };
