import moment from "moment";

export const SAMPLE_CLIENT: IClientIDDetails = {
  address: "",
  city: "",
  country: "",
  dateOfBirth: "14 August 1988",
  gender: "",
  id: "888 88 888",
  isPassport: true,
  name: "",
  postCode: "",
  salutation: "",
  state: "",
};

export const SAMPLE_CLIENT_2: IClientDetails = {
  address: "F-7-15, Block B, Lucky Gardens, Jalan Telawi, Bangsar, Kuala Lumpur, 46001",
  dateOfBirth: "14 August 1988",
  gender: "Male",
  id: "123456789012",
  idType: "NRIC",
  name: "Edgar Constantine",
  postCode: "46001",
};

export const SAMPLE_CLIENT_3: IClientDetails = {
  address: "B-7-3A, Block B West, Menara Pj8, 46050 Petaling Jaya, Selangor",
  dateOfBirth: "04 January 1998",
  gender: "Male",
  id: "010419981234",
  idType: "NRIC",
  name: "Aldrin Castro",
  postCode: "46050",
};

export const SAMPLE_CLIENT_4: IClientDetailsState = {
  clientId: "123",
  dateOfBirth: moment().subtract(23, "years").toDate(),
  idNumber: "EC7742123",
  idType: "Passport",
  gender: "Male",
  permanentAddress: {
    address: "B-7-3A, Block B West, Menara Pj8",
    postCode: "46050",
    city: "Petaling Jaya",
    country: "Malaysia",
    state: "Selangor",
  },
  mailingAddress: {
    address: "B-7-3A, Block B West, Menara Pj8",
    postCode: "46050",
    city: "Petaling Jaya",
    country: "Malaysia",
    state: "Selangor",
  },
  name: "Aldrin Castro",
};

export const SAMPLE_CLIENT_5: IClientDetailsState = {
  clientId: "123",
  dateOfBirth: moment().subtract(17, "years").toDate(),
  idNumber: "98121231231",
  idType: "NRIC",
  gender: "Female",
  permanentAddress: {
    address: "A-29-13 Elements",
    postCode: "55000",
    city: "Kuala Lumpur",
    country: "Malaysia",
    state: "Kuala Lumpur",
  },
  mailingAddress: {
    address: "A-29-13 Elements",
    postCode: "55000",
    city: "Kuala Lumpur",
    country: "Malaysia",
    state: "Kuala Lumpur",
  },
  name: "Jane Constantine",
};

export const SAMPLE_CLIENTS = [SAMPLE_CLIENT_2, SAMPLE_CLIENT_3];
