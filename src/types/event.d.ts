declare type EventType = "isMultiUtmc";

declare interface IEvent {
  checkbox: string;
  description: string;
  eventName: EventType;
  header: string;
  headerDescription: string;
  primaryButton: string;
  s3Path: string;
  secondaryButton: string;
}
