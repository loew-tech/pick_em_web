import { Button } from "@mui/material";
import { useState } from "react";

type PickComponentProps = {
  pick: string;
  selectedCategory: string;
};
export const PickComponent = ({
  pick,
  selectedCategory,
}: PickComponentProps) => {
  const [removed, setRemoved] = useState<boolean>(false);

  const removeItem = async (_: React.MouseEvent<HTMLButtonElement>) => {
    setRemoved(false);
    if (!pick) {
      return;
    }
    const p = pick.split(" ").join("+");
    const respsone = await fetch(
      `http://127.0.0.1:5000/categories/${selectedCategory}/remove/${p}`,
      {
        method: "DELETE",
      }
    );
    if (!respsone.ok) {
      console.warn(`Failed to remove item ${pick}`);
      return;
    }
    setRemoved(true);
  };

  return (
    <div>
      PICK
      <p>{pick}</p>
      <Button disabled={removed} onClick={removeItem}>
        {removed ? "REMOVED" : "REMOVE"}
      </Button>
    </div>
  );
};
