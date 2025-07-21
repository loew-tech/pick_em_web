import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ReactNode, useState } from "react";

import { SelectChangeEvent } from "@mui/material/Select";

type FilterDropdownProps = {
  title: string;
  initVal?: string | null;
  handleChange: (event: SelectChangeEvent, child: ReactNode) => void;
};

export const FilterDropdown = ({
  title,
  initVal,
  handleChange,
}: FilterDropdownProps) => {
  const [val, setVal] = useState<string>(initVal ?? "low");

  const toTitleCase = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const onChange = (event: SelectChangeEvent, child: ReactNode) => {
    setVal(event.target.value as string);
    handleChange(event, child);
  };

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel>{toTitleCase(title)}</FormLabel>
      <Select
        labelId={`${title}-select`}
        id={`${title}-select`}
        value={val}
        label={title}
        onChange={onChange}
      >
        <MenuItem value={"low"}>low</MenuItem>
        <MenuItem value={"medium"}>medium</MenuItem>
        <MenuItem value={"high"}>high</MenuItem>
      </Select>
    </FormControl>
  );
};
