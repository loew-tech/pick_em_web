import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type NewCategoryModalProps = {
  addNewCategory: (newCat: string) => boolean;
};
export const NewCategoryModal = ({ addNewCategory }: NewCategoryModalProps) => {
  const [newCategory, setNewCategory] = useState<string>("");
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [repeatedCatErr, setRepeatedCatErr] = useState<boolean>(false);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewCategory(event.target.value);
  };

  const handleSubmit = () => {
    if (addNewCategory(newCategory)) {
      handleClose();
    }
    setRepeatedCatErr(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter New Category
        </Typography>
        <TextField
          id="outlined-basic"
          placeholder="enter category"
          onChange={handleCategoryChange}
        ></TextField>
        <Button onClick={handleSubmit}>submit</Button>
      </Box>
    </Modal>
  );
};
