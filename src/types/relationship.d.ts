declare type TypeRelationship = "Parent" | "Spouse" | "Child" | "Sibling" | "Relative" | "Others";

declare type TypeRelationshipValue = { value: TypeRelationship };
declare type TypeRelationshipLabelValue = { label: string; value: TypeRelationship };
