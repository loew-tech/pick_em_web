import { useEffect, useState } from "react";

import "./home.css";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Option } from "../types/types";

export const Home = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [pick, setPick] = useState<Option | null>(null);

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

  function makePick(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

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
      <div className="cat-btns">
        <Button onClick={makePick}>Pick!</Button>
        <Button onClick={doExplore}>Explore</Button>
      </div>
    </div>
  );
};
