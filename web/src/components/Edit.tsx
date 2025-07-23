import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Option } from "../types/types";
import { ChangeEvent, ReactNode, useState } from "react";
import { FilterDropdown } from "./FilterDropdown";
import { addOption, removeOption, updateOption } from "../utils/utils";

enum ACTIONS {
  UPDATE,
  REMOVE,
  ADD,
}

type EditItemProps = {
  option?: Option | null;
  category?: string | null;
  categories: string[];
  exitEditing: () => void;
};
export const EditItem = ({
  option,
  category,
  categories,
  exitEditing,
}: EditItemProps) => {
  const [newOption, setNewOption] = useState<Option>(
    option ?? {
      name: "",
      effort: "low",
      interest: "low",
    }
  );
  const [cat, setCat] = useState<string>(category ?? "");
  const [dropdownCat, setDropdownCat] = useState<string>("");
  const [editErr, setEditErr] = useState<boolean>(false);

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

  const handleEffortChange = (
    event:
      | ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string }>
      | (Event & { target: { value: string; name: string } }),
    _: ReactNode
  ) => {
    setNewOption({ ...newOption, effort: event.target.value } as Option);
  };

  const handleDropdownSelect = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string }>
      | (Event & { target: { value: string; name: string } })
      | (Event & { target: { value: null; name: string } }),
    _: ReactNode
  ) => {
    const val = event.target.value as string;
    setDropdownCat(val);
    setCat(val);
  };

  const takeEditAction = async (action: ACTIONS) => {
    if (!cat || !newOption || !newOption.name) {
      return;
    }

    let ok = false;
    switch (action) {
      case ACTIONS.UPDATE:
        ok = await updateOption(cat, newOption);
        break;
      case ACTIONS.REMOVE:
        ok = await removeOption(cat, newOption.name);
        break;
      case ACTIONS.ADD:
        ok = await addOption(cat, newOption);
        break;
    }

    if (!ok) {
      setEditErr(true);
      return;
    }
    exitEditing();
  };

  return (
    <>
      {editErr && (
        <p className="error-msg">An error occured attempting to submit edit</p>
      )}
      {option ? (
        <>
          <h3>{category}</h3>
          <p>{option.name}</p>
        </>
      ) : (
        <>
          <InputLabel id="simple-select-label">
            Select Existing Cateogory
          </InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={dropdownCat}
            label="Age"
            onChange={handleDropdownSelect}
          >
            {categories.map((c) => (
              <MenuItem value={c}>{c}</MenuItem>
            ))}
          </Select>
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
            <Button onClick={() => takeEditAction(ACTIONS.REMOVE)}>
              REMOVE
            </Button>
            <Button onClick={() => takeEditAction(ACTIONS.UPDATE)}>
              UPDATE
            </Button>
          </>
        ) : (
          <Button
            disabled={!(cat && newOption)}
            onClick={() => takeEditAction(ACTIONS.ADD)}
          >
            ADD
          </Button>
        )}
        <Button onClick={exitEditing}>Cancel</Button>
      </div>
    </>
  );
};
