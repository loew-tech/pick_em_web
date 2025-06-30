import { ChangeEvent, ReactNode, useEffect, useState } from "react";

import "./home.css";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Selection } from "../types/types";

export const Home = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [interest, setInterest] = useState<string>("low");
  const [effort, setEffort] = useState<string>("low");
  const [pick, setPick] = useState<string | null>(null);

  const fetchCategories = async () => {
    const response = await fetch("http://127.0.0.1:5000/categories");
    if (!response.ok) {
      return;
    }
    const cats = await response.json();
    setCategories(cats);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let new_ = [...selected];
    if (event.target.checked) {
      new_.push(event.target.name);
    } else {
      new_ = new_.filter((v) => v !== event.target.name);
    }
    setSelected(new_);
  };

  function doExplore(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  const makePick = () => async (event: React.MouseEvent<HTMLButtonElement>) => {
    const response = await fetch(
      `http://127.0.0.1:5000/categories/pick?${selected
        .map((c) => `categories=${c}`)
        .join("&")}&effort=${effort}`
    );

    if (!response.ok) {
      console.warn(
        "fetching pick failed",
        categories,
        "interest",
        interest,
        "effort",
        effort
      );
    }
    const choice: Selection = await response.json();
    setPick(choice.selection);
  };

  const handleInterestChange = (
    event:
      | ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string }>
      | (Event & { target: { value: string; name: string } }),
    _: ReactNode
  ): void => {
    setInterest((event.target as any).value as string);
  };

  const handleEffortChange = (
    event:
      | ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string }>
      | (Event & { target: { value: string; name: string } }),
    _: ReactNode
  ): void => {
    setEffort(event.target.value as string);
  };

  return (
    <div className="home">
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
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel>Interest</FormLabel>
        <Select
          labelId="interest-select"
          id="interest-select"
          value={interest}
          label="interest"
          onChange={handleInterestChange}
        >
          <MenuItem value={"low"}>low</MenuItem>
          <MenuItem value={"medium"}>medium</MenuItem>
          <MenuItem value={"high"}>high</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel>Effort</FormLabel>
        <Select
          labelId="effort-select"
          id="effort-select"
          value={effort}
          label="effort"
          onChange={handleEffortChange}
        >
          <MenuItem value={"low"}>low</MenuItem>
          <MenuItem value={"medium"}>medium</MenuItem>
          <MenuItem value={"high"}>high</MenuItem>
        </Select>
      </FormControl>
      <div className="cat-btns">
        <Button onClick={makePick}>Pick!</Button>
        <Button onClick={doExplore}>Explore!</Button>
      </div>
    </div>
  );
};
