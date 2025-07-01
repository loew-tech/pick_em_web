export type Option = {
  name: string;
  interest?: string;
  effort?: string;
};

export type Selection = {
  selection: string;
};

export type Category = {
  name: string;
  choices: Option[];
};
