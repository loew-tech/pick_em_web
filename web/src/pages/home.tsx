import { ChangeEvent, ReactNode, useEffect, useState } from "react";

import "./home.css";

import { Button } from "@mui/material";
import { Category, Option } from "../types/types";
import { OptionsComponent } from "../components/Options";
import { FilterDropdown } from "../components/FilterDropdown";
import { PickComponent } from "../components/Pick";
import { CategorySelect } from "../components/CategorySelect";
import { EditItem } from "../components/Edit";
import { explore, fetchCategories, makePick } from "../utils/utils";

export const Home = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [interest, setInterest] = useState<string>("low");
  const [effort, setEffort] = useState<string>("low");
  const [pick, setPick] = useState<string | null>(null);
  const [pickErr, setPickErr] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [options, setOptions] = useState<Category[]>([]);
  const [removed, setRemoved] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<string | null>(null);
  const [editOption, setEditOption] = useState<Option | null>(null);

  const getCategories = async () => {
    const cats = await fetchCategories();
    setCategories(cats);
  };

  useEffect(() => {
    getCategories();
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
    const cats = await explore(selected.length ? selected : categories);
    setOptions(cats.filter((cat) => cat !== null));
  };

  const markRemoved = () => {
    setRemoved(true);
    getCategories();
  };

  const getPick = async (_: React.MouseEvent<HTMLButtonElement>) => {
    setOptions([]);
    setRemoved(false);
    const choice = await makePick(effort, interest, selected);
    if (!choice) {
      setPickErr(true);
      return;
    }
    setPick(choice.selection);
    setSelectedCategory(choice.category);
  };

  const initEditing = (category: string, choice: Option) => {
    setEditCategory(category);
    setEditOption(choice);
    setEditing(true);
  };

  const exitEditing = () => {
    setSelected([]);
    setOptions([]);
    setPick(null);
    setEditCategory(null);
    setEditOption(null);
    setEditing(false);
    getCategories();
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

  if (editing) {
    return (
      <div className="home">
        <EditItem
          option={editOption}
          category={editCategory}
          categories={categories}
          exitEditing={exitEditing}
        />
      </div>
    );
  }

  return (
    <div className="home">
      {pickErr && (
        <p className="error-msg">An error occured attempting to make pick</p>
      )}
      <CategorySelect categories={categories} handleChange={handleChange} />
      <FilterDropdown title="interest" handleChange={handleInterestChange} />
      <FilterDropdown title="effort" handleChange={handleEffortChange} />
      <div className="cat-btns">
        <Button onClick={getPick}>Pick!</Button>
        <Button onClick={doExplore}>Explore!</Button>
        <Button onClick={() => setEditing(true)}>Edit!</Button>
      </div>
      {pick ? (
        <PickComponent
          pick={pick}
          selectedCategory={selectedCategory}
          removed={removed}
          markRemoved={markRemoved}
        />
      ) : null}
      {options.length ? (
        <OptionsComponent options={options} initEditing={initEditing} />
      ) : null}
    </div>
  );
};
