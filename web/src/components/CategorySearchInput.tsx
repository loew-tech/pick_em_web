import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  TextField,
} from "@mui/material";
import { SyntheticEvent } from "react";

type CategorySearchInputProps = {
  categories: string[];
  setCat: (s: string) => void;
  addCat: (s: string) => void;
};
export const CategorySearchInput = ({
  categories,
  setCat,
  addCat,
}: CategorySearchInputProps) => {
  const handleCategoryChange = (
    _: SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason,
    __: AutocompleteChangeDetails<string> | undefined
  ) => {
    if (reason === "selectOption") {
      setCat(value ?? "");
    } else addCat(value?.trim() ?? "");
  };

  const handleInputChange = (
    _: SyntheticEvent<Element, Event>,
    value: string,
    __: AutocompleteInputChangeReason
  ) => {
    setCat(value.trim());
  };

  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      options={categories}
      renderInput={(params) => <TextField {...params} label="Enter Category" />}
      blurOnSelect
      onChange={handleCategoryChange}
      onInputChange={handleInputChange}
    />
  );
};
