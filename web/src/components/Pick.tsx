import { Button } from "@mui/material";
import { removeOption } from "../utils/utils";

type PickComponentProps = {
  pick: string;
  selectedCategory: string;
  removed: boolean;
  markRemoved: () => void;
};
export const PickComponent = ({
  pick,
  selectedCategory,
  removed,
  markRemoved,
}: PickComponentProps) => {
  const removeItem = async (_: React.MouseEvent<HTMLButtonElement>) => {
    if (!pick) {
      return;
    }
    const p = pick.split(" ").join("+");
    if (await removeOption(selectedCategory, p)) {
      markRemoved();
    }
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
