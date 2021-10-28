declare type TQuestionType = "dropdown" | "options" | "optionWithInputs";

declare type TInputTypes = "checkbox" | "multiline" | "inputtext" | "radiobutton" | "dropdown" | "label" | "textarea" | "reroute";

declare type TCasePage = "EDD Case" | "Profile";

declare type TInputType = "number" | "amount" | "alphanumeric";

declare interface ICheckBoxWithSubLabel {
  label: string;
  labelStyle?: import("react-native").TextStyle;
  subLabel?: string;
  subLabelStyle?: import("react-native").TextStyle;
  value?: string;
}
declare interface IInputFormat {
  type: TInputType;
  limit?: number;
}

declare interface ILabeledTitleWithFile {
  data: string | FileBase64[] | string[];
  isMulti?: boolean;
  label: string;
}

declare interface IQuestionDataWithoutDocument {
  answer?: string;
  checkboxToggle?: boolean;
  hasDoc?: boolean;
  hasRemark?: boolean;
  hasSub?: boolean;
  optionIndex?: number;
  remark?: string;
  subSection?: {
    value?: string;
    [key: string]: any;
  };
}

declare interface IOptionField {
  autoHide?: boolean;
  description?: string;
  format?: IInputFormat;
  hasDoc?: boolean;
  hasRemark?: boolean;
  id: string;
  info?: string;
  key?: string;
  multiSelection?: boolean;
  optionIndex?: number;
  options?: IOptionField[];
  parent?: string[];
  title?: string;
  type: TInputTypes;
  values?: string[];
  valuesDescription?: string[];
}

declare interface IPreviousData {
  data?: ILabeledTitleWithFile[];
  description?: string;
  label?: string;
  multiSelect?: boolean;
  title: string;
}

declare interface IQuestionData extends IQuestionDataWithoutDocument {
  document?: FileBase64;
}

declare interface IQuestionDataRequest extends IQuestionDataWithoutDocument {
  document?: FileBase64[];
}

declare interface IQuestionDataWithHide {
  answers: IQuestionData[];
  autoHide: boolean;
}

declare interface IEDDQuestion {
  data?: IQuestionDataWithHide;
  description?: string;
  id: string;
  options?: IOptionField[];
  previousData?: IPreviousData[];
  title: string;
}

declare interface IEDDViewQuestion {
  description: string | null;
  id: string | null;
  previousData: IPreviousData[];
  title: string;
}

declare interface IEDDResponseTitle {
  status: string;
  time: string;
  user: string;
}

declare interface IEDDViewResponse {
  amlaTitle: IEDDResponseTitle;
  questions: IEDDViewQuestion[];
  userTitle: IEDDResponseTitle;
}

declare interface IEDDViewCase {
  profile?: IOrderSummaryProfile;
  responses?: IEDDViewResponse[];
}

declare interface IEDDResponse {
  additionalQuestions?: IEDDQuestion[];
  amlaTitle: IEDDResponseTitle;
  questions: IEDDQuestion[];
  userTitle?: IEDDResponseTitle;
}

declare interface IEDDCase {
  profile?: IOrderSummaryProfile;
  responses?: IEDDResponse[];
}
