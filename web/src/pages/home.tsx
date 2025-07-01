import { ChangeEvent, ReactNode, useEffect, useState } from "react";

import "./home.css";

import { Button } from "@mui/material";
import { Category, Selection } from "../types/types";
import { OptionsComponent } from "../components/Options";
import { FilterDropdown } from "../components/FilterDropdown";
import { PickComponent } from "../components/Pick";
import { CategorySelect } from "../components/CategorySelect";

export const Home = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [interest, setInterest] = useState<string>("low");
  const [effort, setEffort] = useState<string>("low");
  const [pick, setPick] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
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
    const cats: Category[] = await Promise.all(
      selected.map(async (c) => {
        const response = await fetch(`http://127.0.0.1:5000/categories/${c}`);
        if (!response.ok) {
          return null;
        }
        const data = await response.json();
        return data;
      })
    );
    setOptions(cats.filter((cat): cat is Category => cat !== null));
  };

  const getPick = async (_: React.MouseEvent<HTMLButtonElement>) => {
    setOptions([]);
    const response = await fetch(
      `http://127.0.0.1:5000/categories/pick?${selected
        .map((c) => `categories=${c}`)
        .join("&")}&effort=${effort}&interest=${interest}`
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
    setSelectedCategory(choice.category);
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
      <CategorySelect categories={categories} handleChange={handleChange} />
      <FilterDropdown title="interest" handleChange={handleInterestChange} />
      <FilterDropdown title="effort" handleChange={handleEffortChange} />
      <div className="cat-btns">
        <Button onClick={getPick}>Pick!</Button>
        <Button onClick={doExplore}>Explore!</Button>
      </div>
      {pick ? (
        <PickComponent pick={pick} selectedCategory={selectedCategory} />
      ) : null}
      {options.length ? <OptionsComponent options={options} /> : null}
    </div>
  );
};
