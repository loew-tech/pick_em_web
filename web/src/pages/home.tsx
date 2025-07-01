import { ChangeEvent, ReactNode, useEffect, useState } from "react";

import "./home.css";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Category, Selection } from "../types/types";

export const Home = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [interest, setInterest] = useState<string>("low");
  const [effort, setEffort] = useState<string>("low");
  const [pick, setPick] = useState<string | null>(null);
  const [options, setOptions] = useState<Category[]>([]);

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

  const doExplore = async (_: React.MouseEvent<HTMLButtonElement>) => {
    setPick(null);
    console.log("categories", categories);
    let cats: Category[] = [];
    await categories.forEach(async (c) => {
      console.log("c", c);
      const resposne = await fetch(`http://127.0.0.1:5000/categories/${c}`);
      if (!resposne.ok) {
        return;
      }
      const data = await resposne.json();
      cats.push(data);
      console.log("cats", cats);
    });
    setOptions(cats);
  };

  const getPick = async (_: React.MouseEvent<HTMLButtonElement>) => {
    // setOptions([]);
    console.log("picking");
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
        <Button onClick={getPick}>Pick!</Button>
        <Button onClick={doExplore}>Explore!</Button>
      </div>
      {pick ? (
        <div>
          PICK
          <p>{pick}</p>
        </div>
      ) : null}
      {options.length ? (
        <div className="options-wrapper">
          <h2>Options</h2>
          {options.map((o) => (
            <div key={o.name}>
              <h3>{o.name}</h3>
              <div className="options-grid">
                {o.choices.map((c, i) => (
                  <div className="option-card" key={`${i}-${c.name}`}>
                    <h4>{c.name}</h4>
                    <ul>
                      <li>Interest: {c.interest ?? "?"}</li>
                      <li>Effort: {c.effort ?? "?"}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
