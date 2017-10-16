
export type Item = {
  kind: string;
  displayName(): string;
  clone(): Item;
};

export type SelectableItem = {
  canSelect(): boolean;
  selected(): boolean;
};

export type DataBound = {
  
};