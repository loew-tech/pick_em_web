import { Button, TextField } from "@mui/material";
import { Option } from "../types/types";
import { ChangeEvent, ReactNode, useState } from "react";
import { FilterDropdown } from "./FilterDropdown";
import { addOption, removeOption, updateOption } from "../utils/utils";

type EditItemProps = {
  option?: Option | null;
  category?: string | null;
  exitEditing: () => void;
};
export const EditItem = ({ option, category, exitEditing }: EditItemProps) => {
  const [newOption, setNewOption] = useState<Option>(
    option ?? {
      name: "",
      effort: "low",
      interest: "low",
    }
  );
  const [cat, setCat] = useState<string>("");

  const handleCategoryChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCat(event.target.value);
  };

  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewOption({ ...newOption, name: event.target.value });
  };

  const handleInterestChange = (
    event:
      | ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string }>
      | (Event & { target: { value: string; name: string } }),
    _: ReactNode
  ) => {
    setNewOption({ ...newOption, interest: event.target.value } as Option);
  };

  function handleEffortChange(
    event:
      | ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string }>
      | (Event & { target: { value: string; name: string } }),
    _: ReactNode
  ): void {
    setNewOption({ ...newOption, effort: event.target.value } as Option);
  }

  const removeItem = async () => {
    if (!newOption || !category) {
      return;
    }
    await removeOption(category, newOption.name);
    exitEditing();
  };

  const addItem = async () => {
    if (!cat || !newOption.name) {
      return;
    }
    await addOption(cat, newOption);
    exitEditing();
  };

  const updateItem = async () => {
    if (!category || !newOption || !newOption.name) {
      return;
    }
    await updateOption(category, newOption);
    exitEditing();
  };

  console.log(typeof category, category);

  return (
    <>
      {option ? (
        <>
          <h3>{category}</h3>
          <p>{option.name}</p>
        </>
      ) : (
        <>
          <TextField
            id="outlined-basic"
            placeholder="enter category"
            onChange={handleCategoryChange}
          ></TextField>
          <TextField
            id="outlined-basic"
            placeholder="enter name"
            onChange={handleNameChange}
          ></TextField>
        </>
      )}
      <FilterDropdown
        title="interest"
        handleChange={handleInterestChange}
        initVal={option?.interest}
      />
      <FilterDropdown
        title="effort"
        handleChange={handleEffortChange}
        initVal={option?.effort}
      />
      <div className="cat-btns">
        {option ? (
          <>
            <Button onClick={removeItem}>REMOVE</Button>
            <Button onClick={updateItem}>UPDATE</Button>
          </>
        ) : (
          <Button disabled={!(cat && newOption)} onClick={addItem}>
            ADD
          </Button>
        )}
        <Button onClick={exitEditing}>Cancel</Button>
      </div>
    </>
  );
};
