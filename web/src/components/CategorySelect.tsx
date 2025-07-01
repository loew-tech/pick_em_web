import { Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material";

type CategorySelectProps = {
  categories: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};
export const CategorySelect = ({ categories, handleChange }: CategorySelectProps) => {
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormGroup>
        {categories.map((c) => {
          return (
            <FormControlLabel
              key={c}
              control={<Checkbox onChange={handleChange} name={c} />}
              label={c}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};
