import { Category, Option, Selection } from "../types/types";

const BASE_URI = "http://127.0.0.1:5000/categories";

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(BASE_URI);
  if (!response.ok) {
    const data = await response.json();
    console.warn("failed to fetch categories", response.status, data);
  }
  return response.json();
};

export const explore = async (selected: string[]): Promise<Category[]> => {
  const categories: Category[] = await Promise.all(
    selected.map(async (c) => {
      const response = await fetch(`${BASE_URI}/${c}`);
      if (!response.ok) {
        console.warn(`failed to retrieve options for categories ${c}`);
        return null;
      }
      const data = await response.json();
      return data;
    })
  );
  return categories;
};

export const makePick = async (
  effort: string,
  interest: string,
  selected: string[]
): Promise<Selection | null> => {
  const response = await fetch(
    `http://127.0.0.1:5000/categories/pick?${selected
      .map((c) => `categories=${c}`)
      .join("&")}&effort=${effort}&interest=${interest}`
  );

  if (!response.ok) {
    console.warn(
      "fetching pick failed",
      selected,
      "interest",
      interest,
      "effort",
      effort
    );
    return null;
  }
  return response.json();
};

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

export const updateOption = async (
  category: string,
  option: Option
): Promise<boolean> => {
  const respsone = await fetch(
    `http://127.0.0.1:5000/categories/${category}/edit/${option.name}`,
    {
      method: "PUT",
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
    console.warn(`Failed to update item ${option.name} to ${category}`);
    return false;
  }
  return true;
};
