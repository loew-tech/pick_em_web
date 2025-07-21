export type Option = {
  name: string;
  interest?: string;
  effort?: string;
};

export type OptionWithCatName = {
  name: string;
  category: string;
  interest?: string;
  effort?: string;
};

export type Selection = {
  selection: string;
  category: string;
};

export type Category = {
  name: string;
  choices: Option[];
};
