export const SAMPLE_DOCUMENTS_1: IRelatedDocuments[] = [
  {
    label: "Certificate of Loss of Nationality",
    documents: [
      {
        reference: "Certificate of Loss of Nationality",
        document: {
          name: "Form.png",
          url:
            "https://www.google.com/url?sa=i&url=http%3A%2F%2Fck5354.blogspot.com%2F2020%2F02%2Fepf-employees-contribution-from-11-to-7.html&psig=AOvVaw2iRW3sLbMYqw3OgOcqBLMl&ust=1600251953984000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjVn5z56usCFQAAAAAdAAAAABAI",
          type: "image/jpeg",
        },
      },
    ],
  },
  {
    label: "NRIC",
    documents: [
      {
        reference: "Front Page of NRIC",
      },
      {
        reference: "Back Page of NRIC",
      },
    ],
  },
];
export const SAMPLE_DOCUMENTS_2: IRelatedDocuments[] = [
  {
    label: "NRIC",
    documents: [
      {
        reference: "Front Page of NRIC",
      },
      {
        reference: "Back Page of NRIC",
      },
    ],
  },
];
export const SAMPLE_DOCUMENTS_3: IRelatedDocuments[] = [
  {
    label: "Kenanga Investment Fund",
    documents: [
      {
        reference: "Affin Hwang Account Opening Form",
        document: {
          name: "Form.png",
          url:
            "https://www.google.com/url?sa=i&url=http%3A%2F%2Fck5354.blogspot.com%2F2020%2F02%2Fepf-employees-contribution-from-11-to-7.html&psig=AOvVaw2iRW3sLbMYqw3OgOcqBLMl&ust=1600251953984000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjVn5z56usCFQAAAAAdAAAAABAI",
          type: "image/jpeg",
        },
      },
    ],
  },
  {
    label: "NRIC",
    documents: [
      {
        reference: "NRIC",
      },
    ],
  },
];

export const SAMPLE_PERSONAL_DOCUMENTS: IPersonalDocuments = {
  principal: SAMPLE_DOCUMENTS_1,
  joint: SAMPLE_DOCUMENTS_2,
};
