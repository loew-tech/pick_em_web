import { Button, TextField } from "@mui/material";
import { Option, OptionWithCatName } from "../types/types";
import { ChangeEvent, ReactNode, useState } from "react";
import { FilterDropdown } from "./FilterDropdown";
import { addOption, removeOption } from "../utils/utils";

type EditItemProps = {
  option?: OptionWithCatName;
  setEditing: (b: boolean) => void;
};
export const EditItem = ({ option, setEditing }: EditItemProps) => {
  const [newOption, setNewOption] = useState<Option>({
    name: "",
    effort: "low",
    interest: "low",
  });
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

  const removeItem = () => {
    if (!option) {
      return;
    }
    removeOption(option.category, option!.name);
    setEditing(false);
  };

  const addItem = () => {
    if (!cat || !newOption.name) {
      return;
    }
    addOption(cat, newOption);
    setEditing(false);
  };

  return (
    <>
      {option ? (
        <>
          <h3>option.category</h3>
          <p>option.name</p>
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
          <Button onClick={removeItem}>REMOVE</Button>
        ) : (
          <Button disabled={!(cat && newOption)} onClick={addItem}>
            ADD
          </Button>
        )}
      </div>
    </>
  );
};
