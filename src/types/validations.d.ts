declare interface IIDVerificationValidations {
  name: string | undefined;
  permanentPostCode: string | undefined;
  mailingPostCode: string | undefined;
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
