declare type TQuestionType = "dropdown" | "options" | "optionWithInputs";

declare type TInputTypes = "checkbox" | "multiline" | "inputtext" | "radiobutton" | "dropdown" | "label" | "textarea";

declare type TCasePage = "EDD Case" | "Profile";

declare interface ICheckBoxWithSubLabel {
  label: string;
  labelStyle?: import("react-native").TextStyle;
  value?: string;
  subLabel?: string;
  subLabelStyle?: import("react-native").TextStyle;
}

declare interface ILabeledTitleWithFile {
  label: string;
  data: string | FileBase64[] | string[];
  isMulti?: boolean;
}

declare interface IQuestionDataWithoutDocument {
  checkboxToggle?: boolean;
  answer?: string;
  optionIndex?: number;
  hasRemark?: boolean;
  hasDoc?: boolean;
  hasSub?: boolean;
  remark?: string;
  subSection?: {
    value?: string;
    [key: string]: any;
  };
}

declare interface IOptionField {
  autoHide?: boolean;
  description?: string;
  hasDoc?: boolean;
  hasRemark?: boolean;
  id: string;
  key?: string;
  multiSelection?: boolean;
  optionIndex?: number;
  options?: IOptionField[];
  parent?: string[];
  title?: string;
  info?: string;
  type: TInputTypes;
  values?: string[];
  valuesDescription?: string[];
}

declare interface IPreviousData {
  title: string;
  label?: string;
  description?: string;
  multiSelect?: boolean;
  data?: ILabeledTitleWithFile[];
}

declare interface IQuestionData extends IQuestionDataWithoutDocument {
  document?: FileBase64;
}

declare interface IQuestionDataRequest extends IQuestionDataWithoutDocument {
  document?: FileBase64[];
}

declare interface IQuestionDataWithHide {
  autoHide: boolean;
  answers: IQuestionData[];
}

declare interface IEDDQuestion {
  id: string;
  title: string;
  description?: string;
  data?: IQuestionDataWithHide;
  options?: IOptionField[];
  previousData?: IPreviousData[];
}

declare interface IEDDViewQuestion {
  title: string;
  id: string | null;
  description: string | null;
  previousData: IPreviousData[];
}

declare interface IEDDResponseTitle {
  user: string;
  time: string;
  status: string;
}

declare interface IEDDViewResponse {
  questions: IEDDViewQuestion[];
  amlaTitle: IEDDResponseTitle;
  userTitle: IEDDResponseTitle;
}

declare interface IEDDViewCase {
  responses?: IEDDViewResponse[];
  profile?: IOrderSummaryProfile;
}

declare interface IEDDResponse {
  questions: IEDDQuestion[];
  additionalQuestions?: IEDDQuestion[];
  amlaTitle: IEDDResponseTitle;
  userTitle?: IEDDResponseTitle;
}

declare interface IEDDCase {
  responses?: IEDDResponse[];
  profile?: IOrderSummaryProfile;
}
