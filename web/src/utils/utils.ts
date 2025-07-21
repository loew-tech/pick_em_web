import { Option } from "../types/types";

export const removeOption = async (
  category: string,
  pick: string
): Promise<boolean> => {
  const respsone = await fetch(
    `http://127.0.0.1:5000/categories/${category}/remove/${pick}`,
    {
      method: "DELETE",
    }
  );
  if (!respsone.ok) {
    console.warn(`Failed to remove item ${pick} from ${category}`);
    return false;
  }
  return true;
};

export const addOption = async (
  category: string,
  option: Option
): Promise<boolean> => {
  const respsone = await fetch(
    `http://127.0.0.1:5000/categories/${category}/add/${option.name}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        effort: option.effort,
        interest: option.interest,
      }),
    }
  );
  if (!respsone.ok) {
    console.warn(`Failed to add item ${option.name} to ${category}`);
    return false;
  }
  return true;
};
