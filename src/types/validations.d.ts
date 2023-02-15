declare interface IIDVerificationValidations {
  name?: string;
  permanentPostCode?: string;
  mailingPostCode?: string;
  mothersName?: string;
  epfNumber?: string;
}

declare interface IIDVerificationPageValidation {
  principal: IIDVerificationValidations;
  joint: IIDVerificationValidations;
}

declare interface IPersonalDetailsValidations {
  epfNumber: string | undefined;
  mothersName: string | undefined;
}

declare interface IPersonalDetailsPageValidation {
  principal: IPersonalDetailsValidations;
  joint: IPersonalDetailsValidations;
}

declare interface IEmploymentDetailsValidations {
  postCode: string | undefined;
}

declare interface IEmploymentDetailsPageValidation {
  principal: IEmploymentDetailsValidations;
  joint: IEmploymentDetailsValidations;
}
